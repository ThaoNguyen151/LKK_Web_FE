import { useEffect, useState } from 'react'
import { CANVAS_DESIGN_WIDTH, CANVAS_MAX_SCALE } from '@/constants/breakpoints'

function getCanvasLayout() {
  if (typeof window === 'undefined') {
    return { scale: 1, height: 864 }
  }

  const scale = Math.min(
    window.innerWidth / CANVAS_DESIGN_WIDTH,
    CANVAS_MAX_SCALE
  )

  return {
    scale,
    height: window.innerHeight / scale,
  }
}

/** Scale wrapper for pixel-perfect desktop landing pages (lg+ only). */
export function useViewportCanvas() {
  const [layout, setLayout] = useState(getCanvasLayout)

  useEffect(() => {
    const handleResize = () => {
      setLayout(getCanvasLayout())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return layout
}
