import { useEffect, useState } from 'react'
import {
  BREAKPOINTS,
  DEVICE,
  getDeviceFromWidth,
} from '@/constants/breakpoints'

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

  const width = window.innerWidth
  const device = getDeviceFromWidth(width)

  return {
    width,
    device,
    isMobile: device === DEVICE.MOBILE,
    isTablet: device === DEVICE.TABLET,
    isDesktopUp: width >= BREAKPOINTS.lg,
    isCanvasLayout: width >= BREAKPOINTS.lg,
  }
}

/**
 * Shared responsive state for all pages.
 * Prefer Tailwind classes first; use this hook when JS branching is required.
 */
export function useBreakpoint() {
  const [state, setState] = useState(getSnapshot)

  useEffect(() => {
    const handleResize = () => {
      setState(getSnapshot())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return state
}
