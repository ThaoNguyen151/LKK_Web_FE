import { useEffect, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { Header } from '@components/common'
import {
  BackToTopButton,
  CloseButton,
  NavChevronButton,
} from '@components/icon'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'
import { fetchLibraryImages } from './libraryData'

const SCROLL_TOP_THRESHOLD = 120
const SCROLL_BOTTOM_OFFSET = 48

/**
 * @param {object} props
 * @param {boolean} props.showHint
 * @param {boolean} props.showBackTop
 * @param {() => void} props.onBackTop
 */
function LibraryScrollAside({ showHint, showBackTop, onBackTop }) {
  return (
    <>
      <div
        className={cn(
          'pointer-events-none fixed right-2 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center transition-opacity duration-300 sm:right-4 sm:flex lg:right-2',
          showHint ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden={!showHint}
      >
        <p className="mb-3 rotate-90 whitespace-nowrap font-body text-[11px] tracking-wide text-brand-home1/50 lg:text-xs">
          Cuộn để xem
        </p>
        <span className="mt-12 h-20 w-px bg-brand-home1/35 lg:mt-14 lg:h-24" />
      </div>

      <BackToTopButton show={showBackTop} onClick={onBackTop} />
    </>
  )
}

/**
 * @param {object} props
 * @param {import('./libraryData').LibraryImage} props.item
 * @param {() => void} props.onOpen
 */
function LibraryCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-[#d4c8e8]/60 text-left transition-opacity hover:opacity-95 sm:mb-5"
    >
      <img
        src={item.src}
        alt={item.alt ?? ''}
        loading="lazy"
        className="block h-auto w-full object-cover"
      />
    </button>
  )
}

/**
 * @param {object} props
 * @param {import('./libraryData').LibraryImage | null} props.item
 * @param {() => void} props.onClose
 * @param {() => void} [props.onPrev]
 * @param {() => void} [props.onNext]
 * @param {boolean} [props.hasPrev]
 * @param {boolean} [props.hasNext]
 */
function LibraryLightbox({
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
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
    </div>
  )
}

export function Library() {
  const [items, setItems] = useState(
    /** @type {import('./libraryData').LibraryImage[]} */ ([])
  )
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const [activeIndex, setActiveIndex] = useState(
    /** @type {number | null} */ (null)
  )

  useEffect(() => {
    let cancelled = false
    fetchLibraryImages().then(list => {
      if (!cancelled) {
        setItems(list)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    root.classList.add('hide-scrollbar')
    body.classList.add('hide-scrollbar')
    return () => {
      root.classList.remove('hide-scrollbar')
      body.classList.remove('hide-scrollbar')
    }
  }, [])

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      const doc = document.documentElement
      const maxScroll = doc.scrollHeight - window.innerHeight
      setScrolled(y > SCROLL_TOP_THRESHOLD)
      setAtBottom(maxScroll <= 0 || y >= maxScroll - SCROLL_BOTTOM_OFFSET)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items.length])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeItem =
    activeIndex != null && items[activeIndex] ? items[activeIndex] : null

  return (
    <PageShell className="relative overflow-x-hidden">
      <Header variant="fixed" />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <img
          src={rectLeft}
          alt=""
          className="absolute left-0 top-[20%] h-full w-[min(40vw,420px)] opacity-70"
          aria-hidden
        />
        <img
          src={rectRight}
          alt=""
          className="absolute bottom-[10%] right-0 w-[min(35vw,380px)] opacity-70"
          aria-hidden
        />
        <img
          src={rectBottom}
          alt=""
          className="absolute bottom-0 left-1/2 w-[600px] -translate-x-[70%]"
          aria-hidden
        />
      </div>

      <LibraryScrollAside
        showHint={!atBottom}
        showBackTop={scrolled}
        onBackTop={scrollToTop}
      />

      <main className="relative z-10 pt-16 lg:pt-20">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-11">
          <div className="mb-8 sm:mb-10 sm:ml-30">
            <p className="mb-2 font-body text-[8px] leading-tight text-brand-home1/70 sm:text-[11px]">
              <a
                href={`#${ROUTES.HOME}`}
                className="font-semibold text-brand-home1 hover:underline"
              >
                Home
              </a>
              <span className="mx-1 text-brand-textheader/50">/</span>
              <span className="text-brand-textheader/50">Thư Viện</span>
            </p>
            <h1
              className="font-display text-3xl italic tracking-wide text-brand-home1 sm:text-4xl lg:text-5xl"
              style={{ WebkitTextStroke: '0.2px #5a3bc4' }}
            >
              THƯ VIỆN
            </h1>
          </div>

          {loading ? (
            <p className="font-body text-sm text-gray-500">Đang tải ảnh…</p>
          ) : items.length === 0 ? (
            <p className="font-body text-sm text-gray-500">
              Chưa có ảnh trong thư viện.
            </p>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 md:columns-3 lg:columns-4 xl:columns-5">
              {items.map((item, index) => (
                <LibraryCard
                  key={item.id}
                  item={item}
                  onOpen={() => setActiveIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <LibraryLightbox
        item={activeItem}
        onClose={() => setActiveIndex(null)}
        hasPrev={activeIndex != null && activeIndex > 0}
        hasNext={activeIndex != null && activeIndex < items.length - 1}
        onPrev={() =>
          setActiveIndex(index =>
            index != null && index > 0 ? index - 1 : index
          )
        }
        onNext={() =>
          setActiveIndex(index =>
            index != null && index < items.length - 1 ? index + 1 : index
          )
        }
      />
    </PageShell>
  )
}
