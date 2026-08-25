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

/** Desktop thật (hover + chuột) — mobile/touch luôn dùng layout responsive. */
export const FINE_POINTER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)'

/** Thiết bị cảm ứng — Android/iOS, kể cả bật "Desktop site" trên Chrome. */
export const TOUCH_PRIMARY_MEDIA_QUERY =
  '(hover: none), (pointer: coarse), (any-pointer: coarse)'

/** Chỉ desktop thật (chuột + màn rộng) mới dùng header/canvas web. */
export const DESKTOP_HEADER_MEDIA_QUERY = `(min-width: ${BREAKPOINTS.lg}px) and (hover: hover) and (pointer: fine)`

/**
 * @returns {boolean}
 */
export function isTouchPrimaryDevice() {
  if (typeof window === 'undefined') return true
  return window.matchMedia(TOUCH_PRIMARY_MEDIA_QUERY).matches
}

/**
 * @param {number} [width] Layout viewport width (px)
 * @returns {boolean}
 */
export function matchesCanvasLayout(width) {
  if (typeof window === 'undefined') return false

  // Điện thoại / tablet cảm ứng: luôn mobile, kể cả bật "Desktop site"
  if (isTouchPrimaryDevice()) return false
  if (!window.matchMedia(FINE_POINTER_MEDIA_QUERY).matches) return false

  const layoutWidth =
    typeof width === 'number'
      ? width
      : Math.min(window.innerWidth, window.screen?.width ?? window.innerWidth)

  return layoutWidth >= BREAKPOINTS.lg
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
