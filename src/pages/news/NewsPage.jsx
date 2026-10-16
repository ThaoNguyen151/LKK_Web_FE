import { useEffect, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { Header, PageScrollAside, Pagination } from '@components/common'
import { SearchButton, SortButton } from '@components/icon'
import { PageShell } from '@layouts'
import { ROUTES } from '@utils'
import {
  NEWS_PAGE_SIZE,
  getNewsPage,
  newsPagePath,
  parseNewsPage,
} from './newsData'

const SCROLL_TOP_THRESHOLD = 120
const SCROLL_BOTTOM_OFFSET = 48

/**
 * @param {object} props
 * @param {import('./newsData').NewsItem} props.item
 */
function NewsCardDesktop({ item }) {
  const body = (
    <>
      {/* Khung ảnh cố định 2:3 — API sau này object-cover fill khung */}
      <div className="aspect-[3/2] w-full overflow-hidden bg-[#d4c8e8]">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <span className="inline-flex w-fit rounded-full bg-brand-orange px-2.5 py-0.5 pt-1 font-body font-semibold uppercase tracking-wide text-white sm:text-[9.5px]">
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
 * @param {string} [props.route]
 */
export function NewsDesktop({ route = ROUTES.NEWS }) {
  const requestedPage = parseNewsPage(route)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(
    /** @type {'desc' | 'asc' | 'az' | 'za'} */ ('desc')
  )
  const {
    items,
    totalPages,
    page: safePage,
  } = getNewsPage(requestedPage, NEWS_PAGE_SIZE, { query, sort })

  const [scrolled, setScrolled] = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const expected = newsPagePath(safePage)
    if (route !== expected && window.location.hash !== `#${expected}`) {
      window.location.replace(`#${expected}`)
    }
  }, [route, safePage])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [safePage, query, sort])

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
  }, [safePage, items.length, query, sort])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** @param {number} next */
  const goToPage = next => {
    if (next === safePage) return
    const path = newsPagePath(next)
    if (window.location.hash !== `#${path}`) {
      window.location.hash = path
    }
  }

  /** @param {string} next */
  const onQueryChange = next => {
    setQuery(next)
    if (safePage !== 1) goToPage(1)
  }

  /** @param {'desc' | 'asc' | 'az' | 'za'} next */
  const onSortChange = next => {
    setSort(next)
    if (safePage !== 1) goToPage(1)
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

      <PageScrollAside
        showHint={!atBottom}
        showBackTop={scrolled}
        onBackTop={scrollToTop}
      />

      <main className="relative z-10 pt-header">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-6">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-home1 px-5 pb-28 pt-5 shadow-md sm:rounded-[2rem] sm:px-8 sm:pb-36 sm:pt-6 lg:rounded-[2rem] lg:px-10 lg:pb-40 lg:pt-5">
              <p className="absolute left-8 top-5 font-body text-[8px] leading-tight text-white/50 sm:left-12 sm:top-6 sm:text-[11px] lg:left-25 lg:top-5">
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
                <SearchButton
                  variant="news"
                  value={query}
                  onChange={onQueryChange}
                />
                <SortButton
                  variant="news"
                  value={sort}
                  onChange={onSortChange}
                  className="h-8 w-8"
                />
              </div>
            </div>

            <div className="relative z-10 mx-auto -mt-20 w-[min(100%,920px)] px-3 sm:-mt-28 sm:px-4 md:w-[min(100%,1000px)] lg:-mt-32.5 lg:w-[min(92%,1150px)]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
                {items.map((item, index) => (
                  <NewsCardDesktop
                    key={`${safePage}-${item.id}-${index}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            page={safePage}
            totalPages={totalPages}
            onChange={goToPage}
            label="Phân trang tin tức"
          />
        </div>
      </main>
    </PageShell>
  )
}
