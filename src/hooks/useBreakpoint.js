import { useEffect, useState } from 'react'
import {
  BREAKPOINTS,
  CANVAS_LAYOUT_MEDIA_QUERY,
  DEVICE,
  getDeviceFromWidth,
  matchesCanvasLayout,
} from '@/constants/breakpoints'
import { getViewportMetrics, subscribeViewport } from '@utils/viewport'

function getSnapshot() {
  if (typeof window === 'undefined') {
    return {
      width: BREAKPOINTS['2xl'],
      device: DEVICE.DESKTOP,
      isMobile: false,
      isTablet: false,
      isDesktopUp: true,
      isCanvasLayout: true,
    }
  }

  const { width } = getViewportMetrics()
  const device = getDeviceFromWidth(width)

  return {
    width,
    device,
    isMobile: device === DEVICE.MOBILE,
    isTablet: device === DEVICE.TABLET,
    isDesktopUp: matchesCanvasLayout(),
    isCanvasLayout: matchesCanvasLayout(),
  }
}

/**
 * Shared responsive state for all pages.
 * Prefer Tailwind classes first; use this hook when JS branching is required.
 */
export function useBreakpoint() {
  const [state, setState] = useState(getSnapshot)

  useEffect(() => {
    const update = () => setState(getSnapshot())
    const mq = window.matchMedia(CANVAS_LAYOUT_MEDIA_QUERY)
    mq.addEventListener('change', update)
    const unsubscribeViewport = subscribeViewport(update)
    return () => {
      mq.removeEventListener('change', update)
      unsubscribeViewport()
    }
  }, [])

  return state
}
