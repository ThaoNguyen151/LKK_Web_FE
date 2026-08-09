/**
 * Thư viện ảnh.
 *
 * Hiện tại: tự import mọi ảnh trong `src/assets/library` (kể cả thư mục con).
 * Sau này: đổi `src` sang URL Cloudinary / S3 / Firebase (xem docs/LIBRARY_IMAGES.md).
 *
 * @typedef {object} LibraryImage
 * @property {string} id
 * @property {string} src
 * @property {string} [alt]
 */

const libraryModules = import.meta.glob(
  '../../assets/library/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  {
    eager: true,
    import: 'default',
  }
)

/**
 * Danh sách ảnh local (tự cập nhật khi thêm/xóa file trong assets/library).
 * Khi dùng CDN, thay bằng mảng URL tuyệt đối.
 *
 * @type {LibraryImage[]}
 */
export const LIBRARY_IMAGES = Object.entries(libraryModules)
  .sort(([pathA], [pathB]) =>
    pathA.localeCompare(pathB, undefined, { numeric: true })
  )
  .map(([path, src], index) => {
    const fileName = path.split('/').pop() ?? `image-${index + 1}`
    const id = fileName.replace(/\.[^.]+$/, '') || String(index + 1)
    return {
      id: `${id}-${index + 1}`,
      src: /** @type {string} */ (src),
      alt: 'Lê Khánh',
    }
  })

/**
 * Nguồn ảnh thư viện.
 * - Không có `VITE_LIBRARY_API_URL` → dùng LIBRARY_IMAGES (assets local / URL tĩnh).
 * - Có API → GET JSON `[{ id, src, alt? }]` hoặc `{ items: [...] }`.
 *
 * @returns {Promise<LibraryImage[]>}
 */
export async function fetchLibraryImages() {
  const apiUrl = import.meta.env.VITE_LIBRARY_API_URL
  if (!apiUrl) {
    return LIBRARY_IMAGES
  }

  try {
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`Library API ${res.status}`)
    const data = await res.json()
    const items = Array.isArray(data) ? data : data.items
    if (!Array.isArray(items)) return LIBRARY_IMAGES

    return items
      .map((item, index) => ({
        id: String(item.id ?? index),
        src: String(item.src ?? item.url ?? ''),
        alt: item.alt ? String(item.alt) : 'Lê Khánh',
      }))
      .filter(item => item.src)
  } catch {
    return LIBRARY_IMAGES
  }
}
