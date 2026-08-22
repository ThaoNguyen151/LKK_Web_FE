/**
 * Poster hoạt động (tỉ lệ 2:3) — tự import từ `src/assets/poster`.
 *
 * @typedef {object} ActivityPoster
 * @property {string} id
 * @property {string} src
 */

const posterModules = import.meta.glob(
  '../../assets/poster/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  {
    eager: true,
    import: 'default',
  }
)

/** @type {ActivityPoster[]} */
export const ACTIVITY_POSTERS = Object.entries(posterModules)
  .sort(([pathA], [pathB]) =>
    pathA.localeCompare(pathB, undefined, { numeric: true })
  )
  .map(([path, src], index) => {
    const fileName = path.split('/').pop() ?? `poster-${index + 1}`
    const id = fileName.replace(/\.[^.]+$/, '') || String(index + 1)
    return {
      id,
      src: /** @type {string} */ (src),
    }
  })

/**
 * Poster cho item: ưu tiên `item.image`, không có thì lấy từ assets/poster
 * (ổn định theo `item.id`).
 * @param {{ id?: string, image?: string }} item
 * @returns {string}
 */
export function getActivityPosterSrc(item) {
  if (item.image?.trim()) return item.image
  if (ACTIVITY_POSTERS.length === 0) return ''
  const seed = [...(item.id ?? '')].reduce(
    (sum, ch) => sum + ch.charCodeAt(0),
    0
  )
  return ACTIVITY_POSTERS[seed % ACTIVITY_POSTERS.length].src
}
