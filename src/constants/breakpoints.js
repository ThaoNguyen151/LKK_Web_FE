/**
 * Shared breakpoints — align with Tailwind defaults (mobile-first).
 * Use in JS (hooks) and keep in sync with @theme in index.css.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

/** Semantic device groups for layout decisions */
export const DEVICE = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  WIDE: 'wide',
}

export const CANVAS_DESIGN_WIDTH = 1536
export const CANVAS_MAX_VIEWPORT_WIDTH = 1920
export const CANVAS_MAX_SCALE = CANVAS_MAX_VIEWPORT_WIDTH / CANVAS_DESIGN_WIDTH
/** Tránh tràn ngang do làm tròn sub-pixel khi zoom 110%–125% */
export const CANVAS_VIEWPORT_INSET = 2

/** Sync with Tailwind `lg:` — uses rem so it matches @media (min-width: 64rem) in index.css */
export const CANVAS_LAYOUT_MEDIA_QUERY = '(min-width: 64rem)'

export function matchesCanvasLayout() {
  if (typeof window === 'undefined') return true
  return window.matchMedia(CANVAS_LAYOUT_MEDIA_QUERY).matches
}

/**
 * @param {number} width Viewport width in CSS pixels
 * @returns {string}
 */
export function getDeviceFromWidth(width) {
  if (width < BREAKPOINTS.md) return DEVICE.MOBILE
  if (width < BREAKPOINTS.lg) return DEVICE.TABLET
  if (width < BREAKPOINTS['2xl']) return DEVICE.DESKTOP
  return DEVICE.WIDE
}

/**
 * @deprecated Prefer matchesCanvasLayout() — px threshold can diverge from Tailwind rem breakpoints
 * @param {number} width Viewport width in CSS pixels
 * @returns {boolean}
 */
export function isCanvasLayout(width) {
  return width >= BREAKPOINTS.lg
}
