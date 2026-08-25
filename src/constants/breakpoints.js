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
/** Giữ 1 — không phóng canvas > 1536px; tránh ảnh to/nhỏ khác nhau giữa các máy cùng màn */
export const CANVAS_MAX_SCALE = 1
/** Tránh tràn ngang do làm tròn sub-pixel khi zoom 110%–125% */
export const CANVAS_VIEWPORT_INSET = 2

/**
 * Ngưỡng desktop canvas — dùng px (không rem) để khớp mọi trình duyệt mobile.
 * Sync với Tailwind `lg:` (64rem ≈ 1024px @ 16px root).
 */
export const CANVAS_LAYOUT_MEDIA_QUERY = `(min-width: ${BREAKPOINTS.lg}px)`

/** Touch-primary (điện thoại) — tránh Android bật "Desktop site" vẫn load canvas. */
export const TOUCH_PRIMARY_MEDIA_QUERY = '(hover: none) and (pointer: coarse)'

/**
 * @param {number} [width] Layout viewport width (px)
 */
export function matchesCanvasLayout(width) {
  if (typeof window === 'undefined') return true

  const layoutWidth = typeof width === 'number' ? width : window.innerWidth

  if (layoutWidth < BREAKPOINTS.lg) return false

  // Phone/tablet nhỏ bật "Desktop site" — vẫn ưu tiên mobile layout
  if (
    layoutWidth < BREAKPOINTS.xl &&
    window.matchMedia(TOUCH_PRIMARY_MEDIA_QUERY).matches
  ) {
    return false
  }

  return true
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
