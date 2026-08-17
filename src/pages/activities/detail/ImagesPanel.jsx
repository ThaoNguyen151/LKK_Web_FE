/**
 * Panel Hình ảnh — chỉ mount khi tab active; ảnh lazy-load.
 * @param {object} props
 * @param {import('../activityData').ActivityItem} props.item
 */
export function ImagesPanel({ item }) {
  const images = item.images?.length ? item.images : ['', '', '', '']

  return (
    <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 md:columns-3">
      {images.map((src, index) => (
        <div
          key={`${item.id}-img-${index}`}
          className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-[#cbb8e8] sm:mb-5"
          style={{ height: `${180 + ((index * 37) % 120)}px` }}
        >
          {src ? (
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
