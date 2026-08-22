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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || 'Xem ảnh'}
      onClick={onClose}
    >
      <CloseButton
        onClick={onClose}
        className="absolute right-4 top-4 z-10 sm:right-20 sm:top-6"
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
        className="flex h-[85vh] w-[min(92vw,1400px)] items-center justify-center px-12 sm:px-16"
        onClick={event => event.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt ?? ''}
          className="h-full w-full rounded-xl object-contain shadow-2xl"
        />
      </div>
    </div>,
    document.body
  )
}
