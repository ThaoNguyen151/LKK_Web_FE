import { useEffect, useState } from 'react'
import {
  BREAKPOINTS,
  CANVAS_LAYOUT_MEDIA_QUERY,
  DEVICE,
  FINE_POINTER_MEDIA_QUERY,
  getDeviceFromWidth,
  matchesCanvasLayout,
} from '@/constants/breakpoints'
import { getLayoutViewportWidth, subscribeViewport } from '@utils/viewport'

function getSnapshot() {
  if (typeof window === 'undefined') {
    return {
      width: BREAKPOINTS.md,
      device: DEVICE.MOBILE,
      isMobile: true,
      isTablet: false,
      isDesktopUp: false,
      isCanvasLayout: false,
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
    const mqFine = window.matchMedia(FINE_POINTER_MEDIA_QUERY)
    mqCanvas.addEventListener('change', update)
    mqFine.addEventListener('change', update)
    const unsubscribeViewport = subscribeViewport(update)
    return () => {
      mqCanvas.removeEventListener('change', update)
      mqFine.removeEventListener('change', update)
      unsubscribeViewport()
    }
  }, [])

  return state
}
