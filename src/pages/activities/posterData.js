/**
 * Poster hoạt động — 2 hướng:
 * - `portrait` (dọc, ~2:3): mobile list, web detail
 * - `landscape` (ngang, ~3:2): web list, mobile detail
 *
 * Thư mục:
 * - `src/assets/poster/portrait/**`
 * - `src/assets/poster/landscape/**`
 * - `src/assets/poster/*` (legacy) → coi như portrait
 *
 * Item có thể ghi đè: `imagePortrait`, `imageLandscape`, hoặc `image` (chung).
 *
 * @typedef {'portrait' | 'landscape'} PosterOrientation
 *
 * @typedef {object} ActivityPoster
 * @property {string} id
 * @property {string} src
 * @property {PosterOrientation} orientation
 */

const portraitModules = import.meta.glob(
  '../../assets/poster/portrait/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
)

const landscapeModules = import.meta.glob(
  '../../assets/poster/landscape/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
)

/** Legacy: file nằm trực tiếp trong `assets/poster/` (không trong subfolder). */
const legacyModules = import.meta.glob(
  '../../assets/poster/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
)

/**
 * @param {Record<string, string>} modules
 * @param {PosterOrientation} orientation
 * @returns {ActivityPoster[]}
 */
function mapPosterModules(modules, orientation) {
  return Object.entries(modules)
    .sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB, undefined, { numeric: true })
    )
    .map(([path, src], index) => {
      const fileName = path.split('/').pop() ?? `poster-${index + 1}`
      const id = fileName.replace(/\.[^.]+$/, '') || String(index + 1)
      return {
        id: `${orientation}-${id}`,
        src: /** @type {string} */ (src),
        orientation,
      }
    })
}

/** @type {ActivityPoster[]} */
export const ACTIVITY_POSTERS_PORTRAIT = [
  ...mapPosterModules(
    /** @type {Record<string, string>} */ (portraitModules),
    'portrait'
  ),
  ...mapPosterModules(
    /** @type {Record<string, string>} */ (legacyModules),
    'portrait'
  ),
]

/** @type {ActivityPoster[]} */
export const ACTIVITY_POSTERS_LANDSCAPE = mapPosterModules(
  /** @type {Record<string, string>} */ (landscapeModules),
  'landscape'
)

/** @deprecated Dùng ACTIVITY_POSTERS_PORTRAIT — giữ để tương thích import cũ */
export const ACTIVITY_POSTERS = ACTIVITY_POSTERS_PORTRAIT

/**
 * @param {{ id?: string }} item
 * @param {ActivityPoster[]} pool
 */
function pickFromPool(item, pool) {
  if (pool.length === 0) return ''
  const seed = [...(item.id ?? '')].reduce(
    (sum, ch) => sum + ch.charCodeAt(0),
    0
  )
  return pool[seed % pool.length].src
}

/**
 * Poster theo hướng đặt.
 * @param {{
 *   id?: string
 *   image?: string
 *   imagePortrait?: string
 *   imageLandscape?: string
 * }} item
 * @param {PosterOrientation} [orientation='portrait']
 * @returns {string}
 */
export function getActivityPosterSrc(item, orientation = 'portrait') {
  if (orientation === 'landscape') {
    if (item.imageLandscape?.trim()) return item.imageLandscape.trim()
  } else if (item.imagePortrait?.trim()) {
    return item.imagePortrait.trim()
  }

  // `image` chung — dùng khi chưa tách dọc/ngang
  if (item.image?.trim()) return item.image.trim()

  if (orientation === 'landscape') {
    const landscape = pickFromPool(item, ACTIVITY_POSTERS_LANDSCAPE)
    if (landscape) return landscape
    return pickFromPool(item, ACTIVITY_POSTERS_PORTRAIT)
  }

  const portrait = pickFromPool(item, ACTIVITY_POSTERS_PORTRAIT)
  if (portrait) return portrait
  return pickFromPool(item, ACTIVITY_POSTERS_LANDSCAPE)
}

/**
 * Class khung poster theo hướng (object-cover trong khung).
 * @param {PosterOrientation} orientation
 */
export function posterFrameClass(orientation) {
  return orientation === 'landscape' ? 'aspect-[3/2]' : 'aspect-[2/3]'
}
