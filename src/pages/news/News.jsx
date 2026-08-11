import { useEffect, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { Header, Pagination } from '@components/common'
import { BackToTopButton, SearchButton, SortButton } from '@components/icon'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'
import { NEWS_PAGE_SIZE, getNewsPage } from './newsData'

const SCROLL_TOP_THRESHOLD = 120
const SCROLL_BOTTOM_OFFSET = 48

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
        <p className="mb-3 -mr-2 rotate-90 whitespace-nowrap font-body text-[11px] tracking-wide text-brand-home1/50 lg:text-xs">
          Cuộn để xem
        </p>
        <span className="mt-12 -mr-2 h-20 w-px bg-brand-home1/35 lg:mt-14 lg:h-24" />
      </div>

      <BackToTopButton
        className="-mr-1"
        show={showBackTop}
        onClick={onBackTop}
      />
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
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-6">
          {/* Banner + cards: cards đè nửa lên khối tím */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-home1 px-5 pb-28 pt-5 shadow-md sm:rounded-[2rem] sm:px-8 sm:pb-36 sm:pt-6 lg:rounded-[2rem] lg:px-10 lg:pb-40 lg:pt-5">
              <p className="absolute left-8 top-5 font-body leading-tight text-[8px] text-white/50 sm:left-12 sm:top-6 sm:text-[11px] lg:left-25 lg:top-5">
                <a
                  href={`#${ROUTES.HOME}`}
                  className="text-white hover:underline"
                >
                  Home
                </a>
                <span className="mx-1.5">/</span>
                <span>Tin Tức</span>
              </p>

              <h1
                className="pointer-events-none py-6 text-center font-display text-3xl italic tracking-wide text-white sm:py-8 sm:text-4xl lg:py-6 lg:text-5xl"
                style={{ WebkitTextStroke: '0.2px white' }}
              >
                TIN TỨC
              </h1>

              <div className="absolute right-8 top-5 flex items-center gap-3 sm:right-12 sm:top-6 sm:gap-4 lg:right-25 lg:top-3.5">
                <SearchButton variant="news" />
                <SortButton variant="news" className="h-8 w-8" />
              </div>
            </div>

            <div className="relative z-10 mx-auto -mt-20 w-[min(100%,920px)] px-3 sm:-mt-28 sm:px-4 md:w-[min(100%,1000px)] lg:-mt-35 lg:w-[min(92%,1150px)]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
                {items.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            page={safePage}
            totalPages={totalPages}
            onChange={setPage}
            label="Phân trang tin tức"
          />
        </div>
      </main>
    </PageShell>
  )
}
