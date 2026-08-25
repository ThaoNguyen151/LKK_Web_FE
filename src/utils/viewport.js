/**
 * Viewport metrics for ScaledCanvas.
 *
 * Trên Windows, Ctrl +/- (page zoom) làm thay đổi innerWidth/innerHeight
 * nhưng KHÔNG đổi devicePixelRatio. Canvas phải tính scale theo innerWidth
 * để khớp viewport CSS — browser zoom sẽ phóng to lại, giữ bố cục giống 100%.
 */

/** Layout width — ưu tiên visualViewport (chính xác hơn trên mobile Android/iOS). */
export function getLayoutViewportWidth() {
  if (typeof window === 'undefined') return 1536

  const vv = window.visualViewport
  if (vv?.width && vv.width > 0) return Math.round(vv.width)

  return window.innerWidth
}

export function getViewportMetrics() {
  if (typeof window === 'undefined') {
    return { width: 1536, height: 864 }
  }

  const vv = window.visualViewport

  return {
    width: getLayoutViewportWidth(),
    height: Math.round(vv?.height ?? window.innerHeight),
  }
}

/** @param {() => void} listener */
export function subscribeViewport(listener) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  listener()

  window.addEventListener('resize', listener)
  window.visualViewport?.addEventListener('resize', listener)
  window.visualViewport?.addEventListener('scroll', listener)

  const ro = new ResizeObserver(listener)
  ro.observe(document.documentElement)

  let lastW = getLayoutViewportWidth()
  let lastH = getViewportMetrics().height
  const pollId = window.setInterval(() => {
    const w = getLayoutViewportWidth()
    const h = getViewportMetrics().height
    if (w !== lastW || h !== lastH) {
      lastW = w
      lastH = h
      listener()
    }
  }, 100)

  return () => {
    window.removeEventListener('resize', listener)
    window.visualViewport?.removeEventListener('resize', listener)
    window.visualViewport?.removeEventListener('scroll', listener)
    ro.disconnect()
    window.clearInterval(pollId)
  }
}
