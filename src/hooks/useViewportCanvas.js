import { useLayoutEffect, useReducer } from 'react'
import {
  CANVAS_DESIGN_WIDTH,
  CANVAS_MAX_SCALE,
  CANVAS_VIEWPORT_INSET,
} from '@/constants/breakpoints'
import { getViewportMetrics, subscribeViewport } from '@utils/viewport'

export function getCanvasLayout() {
  const { width, height } = getViewportMetrics()

  const rawScale = Math.min(
    Math.max((width - CANVAS_VIEWPORT_INSET) / CANVAS_DESIGN_WIDTH, 0.01),
    CANVAS_MAX_SCALE
  )

  const scale = Math.floor(rawScale * 1000) / 1000

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
