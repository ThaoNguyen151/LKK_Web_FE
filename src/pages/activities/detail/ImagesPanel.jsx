import { useState } from 'react'
import { LIBRARY_IMAGES } from '../../library/libraryData'
import { LibraryLightbox } from '../../library/LibraryLightbox'

const CARD_CLASS =
  'mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-[#d4c8e8]/60 text-left shadow-[0_8px_24px_rgba(90,59,196,0.18)] transition-shadow duration-300 hover:border-1 hover:border-brand-home1 hover:shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)] sm:mb-5'

/**
 * Panel Hình ảnh — chỉ mount khi tab active; ảnh lazy-load.
 * Ưu tiên `item.images`; nếu trống thì dùng ảnh trong `assets/library`.
 * @param {object} props
 * @param {import('../activityData').ActivityItem} props.item
 */
export function ImagesPanel({ item }) {
  const fromItem = (item.images ?? []).filter(src => Boolean(src?.trim()))
  const images = fromItem.length
    ? fromItem.map((src, index) => ({
        id: `${item.id}-img-${index}`,
        src,
        alt: item.title,
      }))
    : LIBRARY_IMAGES

  const [activeIndex, setActiveIndex] = useState(
    /** @type {number | null} */ (null)
  )
  const activeItem =
    activeIndex != null && images[activeIndex] ? images[activeIndex] : null

  return (
    <>
      <div className="mb-13 columns-1 gap-4 sm:columns-2 sm:gap-5 md:columns-5">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={CARD_CLASS}
          >
            <img
              src={image.src}
              alt={image.alt ?? item.title}
              className="block h-auto w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      <LibraryLightbox
        item={activeItem}
        onClose={() => setActiveIndex(null)}
        hasPrev={activeIndex != null && activeIndex > 0}
        hasNext={activeIndex != null && activeIndex < images.length - 1}
        onPrev={() =>
          setActiveIndex(index =>
            index != null && index > 0 ? index - 1 : index
          )
        }
        onNext={() =>
          setActiveIndex(index =>
            index != null && index < images.length - 1 ? index + 1 : index
          )
        }
      />
    </>
  )
}
