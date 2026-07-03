/**
 * Viewport metrics for ScaledCanvas.
 *
 * Trên Windows, Ctrl +/- (page zoom) làm thay đổi innerWidth/innerHeight
 * nhưng KHÔNG đổi devicePixelRatio. Canvas phải tính scale theo innerWidth
 * để khớp viewport CSS — browser zoom sẽ phóng to lại, giữ bố cục giống 100%.
 */

export function getViewportMetrics() {
  if (typeof window === 'undefined') {
    return { width: 1536, height: 864 }
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
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

  // Chrome/Edge trên Windows đôi khi không bắn resize khi Ctrl+/Ctrl-
  const ro = new ResizeObserver(listener)
  ro.observe(document.documentElement)

  let lastW = window.innerWidth
  let lastH = window.innerHeight
  const pollId = window.setInterval(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    if (w !== lastW || h !== lastH) {
      lastW = w
      lastH = h
      listener()
    }
  }, 100)

  return () => {
    window.removeEventListener('resize', listener)
    window.visualViewport?.removeEventListener('resize', listener)
    ro.disconnect()
    window.clearInterval(pollId)
  }
}
