import { useEffect, useState } from 'react'
import {
  BREAKPOINTS,
  CANVAS_LAYOUT_MEDIA_QUERY,
  DEVICE,
  getDeviceFromWidth,
  matchesCanvasLayout,
  TOUCH_PRIMARY_MEDIA_QUERY,
} from '@/constants/breakpoints'
import { getLayoutViewportWidth, subscribeViewport } from '@utils/viewport'

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

  const width = getLayoutViewportWidth()
  const device = getDeviceFromWidth(width)
  const isCanvas = matchesCanvasLayout(width)

  return {
    width,
    device,
    isMobile: device === DEVICE.MOBILE,
    isTablet: device === DEVICE.TABLET,
    isDesktopUp: isCanvas,
    isCanvasLayout: isCanvas,
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
    const mqCanvas = window.matchMedia(CANVAS_LAYOUT_MEDIA_QUERY)
    const mqTouch = window.matchMedia(TOUCH_PRIMARY_MEDIA_QUERY)
    mqCanvas.addEventListener('change', update)
    mqTouch.addEventListener('change', update)
    const unsubscribeViewport = subscribeViewport(update)
    return () => {
      mqCanvas.removeEventListener('change', update)
      mqTouch.removeEventListener('change', update)
      unsubscribeViewport()
    }
  }, [])

  return state
}
