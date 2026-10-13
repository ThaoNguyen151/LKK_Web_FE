import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CloseButton, NavChevronButton } from '@components/icon'

/**
 * @param {object} props
 * @param {{ src: string, alt?: string } | null} props.item
 * @param {() => void} props.onClose
 * @param {() => void} [props.onPrev]
 * @param {() => void} [props.onNext]
 * @param {boolean} [props.hasPrev]
 * @param {boolean} [props.hasNext]
 */
export function LibraryLightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}) {
  useEffect(() => {
    if (!item) return undefined

    const onKeyDown = /** @param {KeyboardEvent} event */ event => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && hasPrev) onPrev?.()
      if (event.key === 'ArrowRight' && hasNext) onNext?.()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext])

  if (!item) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || 'Xem ảnh'}
      onClick={onClose}
    >
      {/* Mobile: nền tối đặc — tránh khung mờ/blur ôm quanh ảnh (WebKit). Desktop giữ blur. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/70 backdrop-blur-md sm:bg-black/70 sm:backdrop-blur-md"
      />

      <CloseButton
        onClick={onClose}
        className="absolute right-4 top-[max(2.5rem,calc(env(safe-area-inset-top)+2.5rem))] z-10 sm:right-20 sm:top-6"
      />

      {hasPrev ? (
        <NavChevronButton
          direction="prev"
          label="Ảnh trước"
          onClick={event => {
            event.stopPropagation()
            onPrev?.()
          }}
          className="absolute left-3 z-10 sm:left-6"
        />
      ) : null}

      {hasNext ? (
        <NavChevronButton
          direction="next"
          label="Ảnh sau"
          onClick={event => {
            event.stopPropagation()
            onNext?.()
          }}
          className="absolute right-3 z-10 sm:right-6"
        />
      ) : null}

      <div
        className="relative z-[1] flex h-[85vh] w-[min(92vw,1400px)] items-center justify-center bg-transparent px-12 sm:px-16"
        onClick={event => event.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt ?? ''}
          className="h-full w-full bg-transparent object-contain sm:[filter:drop-shadow(0_16px_36px_rgba(0,0,0,0.4))]"
        />
      </div>
    </div>,
    document.body
  )
}
