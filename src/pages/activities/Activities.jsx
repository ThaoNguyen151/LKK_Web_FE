import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'
import {
  ACTIVITY_CATEGORIES,
  activityCategoryPath,
  activityDetailPath,
  getActivityItems,
  getCategoryById,
  normalizeActivityDetail,
  parseActivityRoute,
} from './activityData'
import { ActivityDetail } from './ActivityDetail'

const SCROLL_TOP_THRESHOLD = 120
const SCROLL_BOTTOM_OFFSET = 48
const GRID_EDGE_BLUR_TOP = 'h-10'
const GRID_EDGE_BLUR_BOTTOM = 'h-20'

/**
 * Nền trang + chấm trang trí (left / right / bottom).
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 */
function ActivitiesBackdrop({ className, style }) {
  return (
    <div
      className={cn('overflow-hidden bg-brand-soft', className)}
      style={style}
    >
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
  )
}

/**
 * Blur mép lưới: clone nền (có chấm) khớp viewport rồi blur + mask.
 * @param {object} props
 * @param {'top' | 'bottom'} props.edge
 * @param {boolean} props.show
 */
function GridEdgeBlur({ edge, show }) {
  const stripRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [origin, setOrigin] = useState({ top: 0, left: 0 })

  useLayoutEffect(() => {
    const update = () => {
      const rect = stripRef.current?.getBoundingClientRect()
      if (!rect) return
      setOrigin({ top: rect.top, left: rect.left })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [show, edge])

  const isTop = edge === 'top'
  const mask = isTop
    ? 'linear-gradient(to bottom, #000 0%, #000 40%, transparent 100%)'
    : 'linear-gradient(to top, #000 0%, #000 40%, transparent 100%)'

  return (
    <div
      ref={stripRef}
      className={cn(
        'pointer-events-none absolute inset-x-0 z-10 overflow-hidden transition-opacity duration-300',
        isTop ? GRID_EDGE_BLUR_TOP : GRID_EDGE_BLUR_BOTTOM,
        isTop ? 'top-0' : '-bottom-6',
        show ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
      aria-hidden
    >
      <ActivitiesBackdrop
        className={cn('absolute', isTop ? 'blur-[12px]' : 'blur-[9px]')}
        style={{
          top: -origin.top,
          left: -origin.left,
          width: '100vw',
          height: '100dvh',
        }}
      />
    </div>
  )
}

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
function SortIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d="M8 6v12M8 6l-3 3M8 6l3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 18V6M16 18l-3-3M16 18l3-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * @param {object} props
 * @param {string} [props.className]
 */
function PlayIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
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
 * @param {boolean} props.showBackTop
 * @param {() => void} props.onBackTop
 */
function ActivityScrollAside({ showBackTop, onBackTop }) {
  return (
    <button
      type="button"
      aria-label="Lên đầu danh sách"
      tabIndex={showBackTop ? 0 : -1}
      onClick={onBackTop}
      className={cn(
        'fixed bottom-6 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-home1 shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)] transition-all duration-300 hover:bg-brand-home1 hover:text-white sm:bottom-8 sm:right-5 lg:bottom-10 lg:right-6 lg:h-12 lg:w-12',
        showBackTop
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      <ChevronUpIcon className="h-5 w-5" />
    </button>
  )
}

/**
 * @param {object} props
 * @param {string} props.activeId
 * @param {'vertical' | 'horizontal'} [props.orientation]
 */
function ActivitySidebar({ activeId, orientation = 'vertical' }) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <nav
      aria-label="Danh mục hoạt động"
      className={cn(
        isHorizontal
          ? 'flex gap-2 overflow-x-auto pb-0'
          : 'flex h-full w-[7.5rem] shrink-0 flex-col items-stretch justify-between gap-0 rounded-l-[2.5rem] bg-brand-home1 px-2.5 py-6 shadow-lg sm:w-40 sm:px-3 lg:w-44 xl:w-46'
      )}
    >
      {ACTIVITY_CATEGORIES.map(cat => {
        const active = cat.id === activeId

        if (isHorizontal) {
          return (
            <a
              key={cat.id}
              href={`#${activityCategoryPath(cat.id)}`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex shrink-0 items-center gap-2 rounded-full px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-wide transition-colors sm:text-xs',
                active
                  ? "bg-brand-home1 text-white after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:w-2/3 after:-translate-x-1/2 after:rounded-full after:bg-white after:content-['']"
                  : 'bg-brand-home1/10 text-brand-home1 hover:bg-brand-home1/20'
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                  active ? 'bg-brand-orange' : 'bg-brand-home1/20'
                )}
              >
                <img
                  src={cat.icon}
                  alt=""
                  className="h-5 w-5 object-contain mix-blend-screen"
                  aria-hidden
                />
              </span>
              {cat.label}
            </a>
          )
        }

        return (
          <a
            key={cat.id}
            href={`#${activityCategoryPath(cat.id)}`}
            aria-current={active ? 'page' : undefined}
            className="group relative flex min-h-0 flex-1 flex-col items-center justify-center px-1 pt-7 pb-1 text-center"
          >
            <div className="relative flex h-[4.75rem] w-full flex-col items-center justify-end px-3 pb-3 pt-8">
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute inset-x-0 top-0 h-[4.75rem] rounded-tl-3xl rounded-br-3xl rounded-tr-none rounded-bl-none transition-all duration-200',
                  active
                    ? 'translate-y-2 bg-white/20 backdrop-blur-sm'
                    : 'translate-y-0 bg-transparent'
                )}
              />
              <span
                className={cn(
                  'absolute left-1/2 top-0 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-tl-[1.25rem] rounded-br-[1.25rem] rounded-tr-none rounded-bl-none transition-all duration-200 sm:h-16 sm:w-16',
                  active
                    ? '-translate-y-2/5 bg-brand-orange'
                    : '-translate-y-1/4 opacity-50 group-hover:-translate-y-[18%] group-hover:opacity-100'
                )}
              >
                <img
                  src={cat.icon}
                  alt=""
                  className="h-9 w-9 object-contain mix-blend-screen sm:h-10 sm:w-10"
                  aria-hidden
                />
              </span>
              <span
                className={cn(
                  'relative z-10 font-body text-[10px] uppercase leading-none tracking-wide transition-[color,opacity,font-weight] duration-200 sm:text-[11px] lg:text-xs',
                  active
                    ? 'font-semibold text-white'
                    : 'font-light text-white/50 group-hover:font-normal group-hover:text-white'
                )}
              >
                {cat.label}
              </span>
            </div>
          </a>
        )
      })}
    </nav>
  )
}

/**
 * @param {object} props
 * @param {string} props.subtitle
 */
function ActivitySubtitle({ subtitle }) {
  const sep = subtitle.indexOf(':')
  if (sep === -1) {
    return (
      <p className="font-body text-[11px] text-gray-500 sm:text-xs">
        {subtitle}
      </p>
    )
  }

  const label = subtitle.slice(0, sep + 1)
  const value = subtitle.slice(sep + 1).trim()

  return (
    <p className="font-body text-[11px] text-gray-500 sm:text-xs ">
      <span className="text-[9px] sm:text-[10px] italic">{label}</span>
      {value ? <> {value}</> : null}
    </p>
  )
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 */
function ActivityCard({ item }) {
  const detail = normalizeActivityDetail(item)
  const detailHref = `#${activityDetailPath(item.categoryId, item.id)}`
  const hasVideoTab = (detail.detailTabs ?? ['info', 'images']).includes(
    'video'
  )
  const videoHref = hasVideoTab ? `${detailHref}` : item.videoUrl || detailHref

  return (
    <article className="group relative flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(90,59,196,0.18)]">
      <div className="relative w-[42%] shrink-0 overflow-hidden bg-[#cbb8e8] sm:w-[38%]">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="h-full min-h-[7.5rem] w-full object-cover transition duration-300 group-hover:scale-105 group-hover:blur-[2px] sm:min-h-[8.5rem]"
          />
        ) : (
          <div className="h-full min-h-[7.5rem] w-full bg-[#cbb8e8] transition duration-300 group-hover:blur-[2px] sm:min-h-[8.5rem]" />
        )}
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-2 px-3 py-3 sm:gap-2.5 sm:px-4 sm:py-4">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <span className="inline-flex rounded-full bg-brand-orange px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wide text-white sm:text-[9.5px]">
            {item.badge}
          </span>
          <span className="shrink-0 font-body text-[9.5px] text-gray-400">
            {item.year}
          </span>
        </div>
        <h3 className="font-body text-sm font-bold leading-snug text-brand-home1 sm:text-base">
          {item.title}
        </h3>
        <ActivitySubtitle subtitle={item.subtitle} />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 bg-white/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 sm:gap-3">
        <a
          href={videoHref}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3 py-2 font-body text-[10px] font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-105 sm:px-4 sm:text-xs"
        >
          <PlayIcon className="h-3.5 w-3.5" />
          Xem video
        </a>
        <a
          href={detailHref}
          className="inline-flex items-center gap-1 rounded-full bg-brand-orange px-3 py-2 font-body text-[10px] font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-105 sm:px-4 sm:text-xs"
        >
          Thông tin
          <span aria-hidden>â†’</span>
        </a>
      </div>
    </article>
  )
}

/**
 * @param {object} props
 * @param {string} props.route Current hash path without `#`
 * @param {string} props.categoryId
 */
function ActivitiesList({ route, categoryId }) {
  const category = getCategoryById(categoryId)

  const [tabByCategory, setTabByCategory] = useState(
    /** @type {Record<string, string>} */ ({})
  )
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(/** @type {'desc' | 'asc'} */ ('desc'))
  const [scrolled, setScrolled] = useState(false)
  const [showTopFade, setShowTopFade] = useState(false)
  const [showBottomFade, setShowBottomFade] = useState(true)
  const gridScrollRef = useRef(/** @type {HTMLDivElement | null} */ (null))

  const tabId = tabByCategory[categoryId] ?? category.tabs[0]?.id ?? ''

  useEffect(() => {
    const expected = activityCategoryPath(categoryId)
    if (route === '/activities' || route === '/activities/') {
      const nextHash = `#${expected}`
      if (window.location.hash !== nextHash) {
        window.location.replace(nextHash)
      }
    }
  }, [route, categoryId])

  useEffect(() => {
    const el = gridScrollRef.current
    if (!el) return undefined

    const updateScrollState = () => {
      const maxScroll = el.scrollHeight - el.clientHeight
      setScrolled(el.scrollTop > SCROLL_TOP_THRESHOLD)
      setShowTopFade(el.scrollTop > 8)
      setShowBottomFade(
        maxScroll > 0 && el.scrollTop < maxScroll - SCROLL_BOTTOM_OFFSET
      )
    }

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [categoryId, tabId, query, sort])

  useEffect(() => {
    const el = gridScrollRef.current
    if (el) el.scrollTop = 0
  }, [categoryId, tabId, query, sort])

  const listItems = getActivityItems({ categoryId, tabId, query, sort })

  const scrollToTop = () => {
    gridScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectTab = /** @param {string} id */ id => {
    setTabByCategory(prev => ({ ...prev, [categoryId]: id }))
  }

  return (
    <PageShell className="relative flex h-dvh flex-col overflow-hidden">
      <Header variant="fixed" />

      <ActivitiesBackdrop className="pointer-events-none fixed inset-0 z-0" />

      <ActivityScrollAside showBackTop={scrolled} onBackTop={scrollToTop} />

      <main className="relative z-10 flex min-h-0 flex-1 flex-col pt-16 lg:pt-20">
        <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 items-stretch px-4 py-6 sm:px-6 lg:px-10">
          <div className="hidden min-h-0 shrink-0 self-stretch md:block">
            <ActivitySidebar activeId={categoryId} />
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col pl-4 sm:pl-6 lg:pl-8">
            <div className="mb-4 shrink-0 md:hidden">
              <ActivitySidebar activeId={categoryId} orientation="horizontal" />
            </div>

            <p className="mb-3 mt-5 shrink-0 font-body text-[10px] leading-tight text-brand-home1/70 sm:text-[11px]">
              <a
                href={`#${ROUTES.HOME}`}
                className="font-semibold text-brand-home1 hover:underline"
              >
                Home
              </a>
              <span className="mx-1.5 text-brand-textheader/50">/</span>
              <span className="text-brand-textheader/50">
                {category.breadcrumb}
              </span>
            </p>

            <div className="mb-6 flex shrink-0 flex-col gap-4 lg:mb-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <h1
                  className="shrink-0 font-display text-3xl italic tracking-wide text-brand-home1 sm:text-4xl lg:text-5xl"
                  style={{ WebkitTextStroke: '0.2px #5a3bc4' }}
                >
                  {category.label}
                </h1>

                <div className="hidden h-8 w-px shrink-0 self-center bg-brand-home1/25 sm:block" />

                <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-10">
                  {category.tabs.map(tab => {
                    const active = tab.id === tabId
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => selectTab(tab.id)}
                        className={cn(
                          'relative inline-flex items-center justify-center font-body text-xs font-semibold tracking-wide transition-colors sm:text-xs',
                          active
                            ? "text-brand-home1 after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-2/3 after:-translate-x-1/2 after:bg-brand-home1 after:content-['']"
                            : 'text-gray-400 hover:text-brand-home1'
                        )}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="relative z-20 flex shrink-0 items-center gap-2 sm:gap-3">
                <div className="group relative">
                  <button
                    type="button"
                    aria-label="Tìm kiếm"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-brand-home1 transition-colors group-hover:bg-brand-home1/10 group-focus-within:bg-brand-home1/10"
                  >
                    <SearchIcon className="h-5 w-5" />
                  </button>

                  <div className="invisible absolute right-0 top-full z-30 mt-1 min-w-[14rem] translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:min-w-[16rem]">
                    <div className="flex items-center overflow-hidden rounded-full border border-brand-home1/25 bg-white shadow-[0_12px_35px_rgba(90,59,196,0.18)]">
                      <input
                        type="search"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        placeholder="Tìm kiếm…"
                        className="w-full bg-transparent px-4 py-2.5 font-body text-sm text-brand-home1 outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={
                    sort === 'desc'
                      ? 'Sắp xếp năm tăng dần'
                      : 'Sắp xếp năm giảm dần'
                  }
                  onClick={() =>
                    setSort(value => (value === 'desc' ? 'asc' : 'desc'))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full text-brand-home1 transition-colors hover:bg-brand-home1/10"
                >
                  <SortIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1">
              <div
                ref={gridScrollRef}
                className="h-full overflow-y-auto overscroll-contain pr-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {listItems.length === 0 ? (
                  <p className="font-body text-sm text-gray-500">
                    Chưa có nội dung trong mục này.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:gap-6">
                    {listItems.map(item => (
                      <ActivityCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              <GridEdgeBlur edge="top" show={showTopFade} />
              <GridEdgeBlur edge="bottom" show={showBottomFade} />
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  )
}

/**
 * @param {object} props
 * @param {string} props.route Current hash path without `#`
 */
export function Activities({ route }) {
  const { categoryId, itemId } = parseActivityRoute(route)

  if (itemId) {
    return (
      <ActivityDetail
        itemId={itemId}
        categoryId={categoryId}
        sidebar={<ActivitySidebar activeId={categoryId} />}
      />
    )
  }

  return <ActivitiesList route={route} categoryId={categoryId} />
}
