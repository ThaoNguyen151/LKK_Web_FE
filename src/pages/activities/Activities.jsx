import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Header } from '@components/common'
import { SearchButton, SortButton } from '@components/icon'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'
import {
  ACTIVITY_CATEGORIES,
  activityCategoryPath,
  activityTabPath,
  getActivityItems,
  getCategoryById,
  parseActivityRoute,
} from './activityData'
import { ActivityCard } from './ActivityCard'
import { ActivityDetail } from './ActivityDetail'
import { ActivitiesBackdrop, GridEdgeBlur } from './ActivitiesBackdrop'
import { ActivityScrollAside } from './ActivityScrollAside'

const SCROLL_TOP_THRESHOLD = 120
const SCROLL_BOTTOM_OFFSET = 48

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
 * @param {string} props.route Current hash path without `#`
 * @param {string} props.categoryId
 * @param {string} props.tabId
 */
function ActivitiesList({ route, categoryId, tabId }) {
  const category = getCategoryById(categoryId)
  const activeTabId = category.tabs.some(tab => tab.id === tabId)
    ? tabId
    : (category.tabs[0]?.id ?? '')

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(
    /** @type {'desc' | 'asc' | 'az' | 'za'} */ ('desc')
  )
  const [scrolled, setScrolled] = useState(false)
  const [showTopFade, setShowTopFade] = useState(false)
  const [showBottomFade, setShowBottomFade] = useState(true)
  const [scrollBleed, setScrollBleed] = useState({ left: 0, right: 0 })
  const gridScrollRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const gridAreaRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const sidebarWrapRef = useRef(/** @type {HTMLDivElement | null} */ (null))

  // /activities hoặc /activities/:category → URL có tab mặc định
  useEffect(() => {
    const defaultTab = category.tabs[0]?.id
    if (!defaultTab) return

    const withTab = activityTabPath(categoryId, defaultTab)
    if (
      route === '/activities' ||
      route === '/activities/' ||
      route === activityCategoryPath(categoryId) ||
      route === `${activityCategoryPath(categoryId)}/`
    ) {
      const nextHash = `#${withTab}`
      if (window.location.hash !== nextHash) {
        window.location.replace(nextHash)
      }
    }
  }, [route, categoryId, category.tabs])

  useLayoutEffect(() => {
    const updateBleed = () => {
      const gridEl = gridAreaRef.current
      if (!gridEl) return

      const gridRect = gridEl.getBoundingClientRect()
      const right = Math.max(0, window.innerWidth - gridRect.right)

      let left = 0
      const sidebarEl = sidebarWrapRef.current
      const sidebarVisible =
        sidebarEl &&
        window.getComputedStyle(sidebarEl).display !== 'none' &&
        sidebarEl.getBoundingClientRect().width > 0

      if (sidebarVisible) {
        const sideRect = sidebarEl.getBoundingClientRect()
        left = Math.max(0, gridRect.left - sideRect.right)
      }

      setScrollBleed(prev =>
        prev.left === left && prev.right === right ? prev : { left, right }
      )
    }

    updateBleed()
    window.addEventListener('resize', updateBleed)
    return () => window.removeEventListener('resize', updateBleed)
  }, [])

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
  }, [categoryId, activeTabId, query, sort])

  useEffect(() => {
    const el = gridScrollRef.current
    if (el) el.scrollTop = 0
  }, [categoryId, activeTabId, query, sort])

  const listItems = getActivityItems({
    categoryId,
    tabId: activeTabId,
    query,
    sort,
  })

  const scrollToTop = () => {
    gridScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageShell className="relative flex h-dvh flex-col overflow-hidden">
      <Header variant="fixed" />

      <ActivitiesBackdrop className="pointer-events-none fixed inset-0 z-0" />

      <ActivityScrollAside
        showHint={showBottomFade}
        showBackTop={scrolled}
        onBackTop={scrollToTop}
      />

      <main className="relative z-10 flex min-h-0 flex-1 flex-col pt-16 lg:pt-20">
        <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 items-stretch px-4 py-6 sm:px-6 lg:px-10">
          <div
            ref={sidebarWrapRef}
            className="hidden min-h-0 shrink-0 self-stretch md:block"
          >
            <ActivitySidebar activeId={categoryId} />
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col pl-4 sm:pl-6 lg:pl-12">
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

            <div className="mb-6 flex shrink-0 flex-col gap-4 lg:mb-2 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <h1
                  className="shrink-0 font-display text-3xl italic tracking-wide text-brand-home1 sm:text-4xl lg:text-5xl"
                  style={{ WebkitTextStroke: '0.2px #5a3bc4' }}
                >
                  {category.label}
                </h1>

                <div
                  className="hidden h-12 w-px shrink-0 self-center bg-brand-home1/25 sm:block mr-3 ml-4"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgb(90, 59, 196), transparent)',
                  }}
                />

                <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-10">
                  {category.tabs.map(tab => {
                    const active = tab.id === activeTabId
                    return (
                      <a
                        key={tab.id}
                        href={`#${activityTabPath(categoryId, tab.id)}`}
                        className={cn(
                          'relative inline-flex items-center justify-center font-body text-xs font-semibold tracking-wide transition-colors sm:text-xs',
                          active
                            ? "text-brand-home1 after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-2/3 after:-translate-x-1/2 after:bg-brand-home1 after:content-['']"
                            : 'text-gray-400 hover:text-brand-home1'
                        )}
                      >
                        {tab.label}
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="relative z-20 flex shrink-0 items-center gap-2 sm:gap-3">
                <SearchButton
                  variant="activities"
                  value={query}
                  onChange={setQuery}
                />

                <SortButton
                  variant="activities"
                  value={sort}
                  onChange={setSort}
                />
              </div>
            </div>

            <div ref={gridAreaRef} className="relative min-h-0 flex-1">
              <div
                className="absolute inset-y-0 flex flex-col"
                style={{
                  left: -scrollBleed.left,
                  width: `calc(100% + ${scrollBleed.left + scrollBleed.right}px)`,
                }}
              >
                <div
                  ref={gridScrollRef}
                  className="h-full overflow-y-auto overscroll-contain pb-8 pt-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  style={{
                    paddingLeft: scrollBleed.left || undefined,
                    paddingRight: scrollBleed.right || undefined,
                  }}
                >
                  {listItems.length === 0 ? (
                    <p className="font-body text-sm text-gray-500">
                      Chưa có nội dung trong mục này.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 lg:gap-5">
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
  const { categoryId, tabId, itemId } = parseActivityRoute(route)

  if (itemId) {
    return (
      <ActivityDetail
        itemId={itemId}
        categoryId={categoryId}
        sidebar={<ActivitySidebar activeId={categoryId} />}
      />
    )
  }

  return <ActivitiesList route={route} categoryId={categoryId} tabId={tabId} />
}
