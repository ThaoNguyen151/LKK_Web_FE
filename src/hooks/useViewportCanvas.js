import { useLayoutEffect, useReducer } from 'react'
import { CANVAS_DESIGN_WIDTH } from '@/constants/breakpoints'
import { getViewportMetrics, subscribeViewport } from '@utils/viewport'

/**
 * Scale canvas 1536px full chiều ngang viewport — không letterbox trên laptop 14".
 */
export function getCanvasLayout() {
  const { width, height } = getViewportMetrics()
  const safeWidth = Math.max(width, 1)
  const scale = safeWidth / CANVAS_DESIGN_WIDTH

  return {
    scale,
    height: height / scale,
  }
}

/** Scale wrapper for pixel-perfect desktop landing pages (lg+ only). */
export function useViewportCanvas() {
  const [, rerender] = useReducer(n => n + 1, 0)

  useLayoutEffect(() => subscribeViewport(rerender), [])

  return getCanvasLayout()
}
