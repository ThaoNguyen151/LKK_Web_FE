import { useEffect, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { Header } from '@components/common'
import { BackToTopButton } from '@components/icon'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'
import { fetchLibraryImages } from './libraryData'
import { LibraryLightbox } from './LibraryLightbox'

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
      className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-[#d4c8e8]/60 text-left transition-shadow duration-300 hover:border-1 hover:border-brand-home1 hover:shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)] sm:mb-5"
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
