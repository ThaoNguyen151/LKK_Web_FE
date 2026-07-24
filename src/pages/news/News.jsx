import { useEffect, useMemo, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'
import { NEWS_PAGE_SIZE, getNewsPage } from './newsData'

const SCROLL_TOP_THRESHOLD = 120
const SCROLL_BOTTOM_OFFSET = 48

/**
 * @param {object} props
 * @param {string} [props.className]
 */
function SearchIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * @param {object} props
 * @param {string} [props.className]
 */
function FilterIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 7h10M18 7h2" strokeLinecap="round" />
      <circle cx="16" cy="7" r="2" />
      <path d="M4 17h4M10 17h10" strokeLinecap="round" />
      <circle cx="8" cy="17" r="2" />
    </svg>
  )
}

/**
 * @param {object} props
 * @param {string} [props.className]
 */
function ChevronUpIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      aria-hidden
    >
      <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * @param {object} props
 * @param {boolean} props.showHint
 * @param {boolean} props.showBackTop
 * @param {() => void} props.onBackTop
 */
function NewsScrollAside({ showHint, showBackTop, onBackTop }) {
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

      <button
        type="button"
        aria-label="Lên đầu trang"
        tabIndex={showBackTop ? 0 : -1}
        onClick={onBackTop}
        className={cn(
          'fixed bottom-6 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-home1 shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)] transition-all duration-300 hover:bg-brand-home1 hover:text-white sm:bottom-8 sm:right-5 lg:bottom-10 lg:right-7 lg:h-12 lg:w-12',
          showBackTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        )}
      >
        <ChevronUpIcon className="h-5 w-5" />
      </button>
    </>
  )
}

/**
 * @param {object} props
 * @param {import('./newsData').NewsItem} props.item
 */
function NewsCard({ item }) {
  const body = (
    <>
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#d4c8e8]">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <span className="inline-flex w-fit rounded-full bg-brand-orange px-2 py-0.5 font-body font-semibold uppercase tracking-wide text-white sm:text-[9.5px]">
          {item.source}
        </span>
        <h2 className="line-clamp-3 pt-1 font-body text-sm font-bold leading-snug text-brand-home1 sm:text-sm">
          {item.title}
        </h2>
        <time className="mt-auto pt-1 font-body text-[10px] text-gray-400">
          {item.date}
        </time>
      </div>
    </>
  )

  const cardClass =
    'group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-white bg-white/10 backdrop-blur-sm transition-all duration-200 hover:border hover:border-brand-home1 hover:shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)]'

  if (item.href && item.href !== '#') {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {body}
      </a>
    )
  }

  return <article className={cardClass}>{body}</article>
}

/**
 * @param {object} props
 * @param {number} props.page
 * @param {number} props.totalPages
 * @param {(page: number) => void} props.onChange
 */
function NewsPagination({ page, totalPages, onChange }) {
  const pages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const set = new Set([1, 2, 3, 4, 5, totalPages, page - 1, page, page + 1])
    return [...set].filter(n => n >= 1 && n <= totalPages).sort((a, b) => a - b)
  }, [page, totalPages])

  return (
    <nav
      aria-label="Phân trang tin tức"
      className="mt-10 flex items-center justify-center gap-1 sm:gap-2"
    >
      <button
        type="button"
        aria-label="Trang trước"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full font-body text-brand-home1 transition-colors hover:bg-white disabled:opacity-30"
      >
        ‹
      </button>
      {pages.map((n, index) => {
        const prev = pages[index - 1]
        const showEllipsis = prev != null && n - prev > 1
        return (
          <span key={n} className="contents">
            {showEllipsis ? (
              <span className="px-1 font-body text-sm text-gray-400">…</span>
            ) : null}
            <button
              type="button"
              aria-current={n === page ? 'page' : undefined}
              onClick={() => onChange(n)}
              className={cn(
                'flex h-9 min-w-9 items-center justify-center rounded-full px-2 font-body text-sm transition-colors',
                n === page
                  ? 'border-2 border-white font-semibold bg-white/10 backdrop-blur-sm shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)] transition-all duration-200 hover:border hover:border-brand-home1 '
                  : 'text-gray-500 hover:bg-white/70 hover:text-brand-home1'
              )}
            >
              {n}
            </button>
          </span>
        )
      })}
      <button
        type="button"
        aria-label="Trang sau"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full font-body text-brand-home1 transition-colors hover:bg-white disabled:opacity-30"
      >
        ›
      </button>
    </nav>
  )
}

export function News() {
  const [page, setPage] = useState(1)
  const [scrolled, setScrolled] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const {
    items,
    totalPages,
    page: safePage,
  } = getNewsPage(page, NEWS_PAGE_SIZE)

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
  }, [page, items.length])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

      <NewsScrollAside
        showHint={!atBottom}
        showBackTop={scrolled}
        onBackTop={scrollToTop}
      />

      <main className="relative z-10 pt-16 lg:pt-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {/* Banner + cards: cards đè nửa lên khối tím */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-home1 px-5 pb-28 pt-5 shadow-md sm:rounded-[2rem] sm:px-8 sm:pb-36 sm:pt-6 lg:rounded-[2.5rem] lg:px-10 lg:pb-40 lg:pt-5">
              <p className="absolute left-5 top-5 font-body text-[10px] text-white/80 sm:left-8 sm:top-6 sm:text-xs lg:left-10 lg:top-11">
                <a
                  href={`#${ROUTES.HOME}`}
                  className="text-white hover:underline"
                >
                  Home
                </a>
                <span className="mx-1.5">/</span>
                <span>Tin Tức</span>
              </p>

              <h1 className="pointer-events-none py-6 text-center font-display text-3xl italic tracking-wide text-white sm:py-8 sm:text-4xl lg:py-7 lg:text-5xl">
                TIN TỨC
              </h1>

              <div className="absolute right-5 top-5 flex items-center gap-3 text-white sm:right-8 sm:top-6 sm:gap-4 lg:right-10 lg:top-10">
                <button
                  type="button"
                  aria-label="Tìm kiếm"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/15"
                >
                  <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  type="button"
                  aria-label="Lọc"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/15"
                >
                  <FilterIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>

            <div className="relative z-10 mx-auto -mt-20 w-[min(100%,920px)] px-3 sm:-mt-28 sm:px-4 md:w-[min(100%,1000px)] lg:-mt-36 lg:w-[min(92%,1150px)]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
                {items.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <NewsPagination
            page={safePage}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      </main>
    </PageShell>
  )
}
