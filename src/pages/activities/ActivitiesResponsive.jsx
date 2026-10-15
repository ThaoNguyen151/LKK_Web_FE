import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import iconPsort from '@assets/images/subicon/iconPsort.png'
import iconWsort from '@assets/images/subicon/iconWsort.png'
import iconTick from '@assets/images/subicon/iconPtick.png'
import { Header } from '@components/common'
import {
  BackToTopButton,
  CloseIcon,
  DEFAULT_SORT_OPTIONS,
  IconImg,
  IconToolButton,
  SearchIcon,
} from '@components/icon'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'
import {
  activityCategoryPath,
  activityDetailPath,
  activityTabPath,
  getActivityItems,
  getCategoryById,
  parseActivityRoute,
} from './activityData'
import { ActivityDetailResponsive } from './ActivityDetailResponsive'
import {
  ACTIVITIES_MOBILE_BELOW_HEADER,
  ActivitiesMobileBackdrop,
  ActivityCategoryBarMobile,
} from './ActivitiesMobileShared'
import { getActivityPosterSrc } from './posterData'

/** @typedef {'desc' | 'asc' | 'az' | 'za'} SortValue */

const SCROLL_TOP_THRESHOLD = 120
const RECENT_STORAGE_KEY = 'lkk-activities-recent-searches'
const MAX_RECENT = 10

/**
 * @returns {string[]}
 */
function loadRecentSearches() {
  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed)
      ? parsed.filter(item => typeof item === 'string' && item.trim())
      : []
  } catch {
    return []
  }
}

/**
 * @param {string[]} items
 */
function saveRecentSearches(items) {
  try {
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(items))
  } catch {
    /* ignore quota */
  }
}

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {SortValue} props.value
 * @param {() => void} props.onClose
 * @param {(value: SortValue) => void} props.onSelect
 * @param {{ value: SortValue, label: string }[]} [props.options]
 */
function ActivitySortSheet({
  open,
  value,
  onClose,
  onSelect,
  options = DEFAULT_SORT_OPTIONS,
}) {
  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[180] flex flex-col justify-end">
      <button
        type="button"
        aria-label="Đóng sắp xếp theo"
        className="absolute inset-0 bg-black/35"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sắp xếp theo"
        className="relative z-10 rounded-t-[1.5rem] bg-white pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
      >
        <h2 className="text-center font-body text-[15px] font-bold text-brand-home1">
          Sắp xếp theo
        </h2>
        <div className="home-mobile-section mt-4">
          <ul
            className="home-mobile-content"
            role="listbox"
            aria-label="Tùy chọn sắp xếp"
          >
            {options.map(option => {
              const selected = option.value === value
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => onSelect(option.value)}
                    className="flex w-full items-center gap-5 border-b border-gray-100 py-3.5 text-left last:border-b-0"
                  >
                    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                      {selected ? (
                        <IconImg src={iconTick} className="h-4 w-4" />
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        'font-body text-[13px]',
                        selected
                          ? 'font-bold text-brand-home1'
                          : 'font-normal text-brand-textheader'
                      )}
                    >
                      {option.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  )
}

/**
 * @param {object} props
 * @param {string} props.subtitle
 */
function CardSubtitle({ subtitle }) {
  const sep = subtitle.indexOf(':')
  if (sep === -1) {
    return <p className="font-body text-[10px] text-gray-500">{subtitle}</p>
  }
  const label = subtitle.slice(0, sep + 1)
  const value = subtitle.slice(sep + 1).trim()
  return (
    <p className="font-body text-[10px] text-gray-500">
      <span className="italic">{label}</span>
      {value ? <span className="font-bold"> {value}</span> : null}
    </p>
  )
}

/**
 * Card list mobile — tap cả thẻ vào detail.
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 */
function ActivityCardMobile({ item }) {
  /** Mobile list — poster dọc */
  const posterSrc = getActivityPosterSrc(item, 'portrait')

  return (
    <a
      href={`#${activityDetailPath(item.categoryId, item.id)}`}
      className="home-mobile-glass-card flex overflow-hidden border-[1.5px] border-white/80 bg-white/35 backdrop-blur-sm active:opacity-90"
    >
      <div className="aspect-[3/4] w-[4.75rem] shrink-0 overflow-hidden bg-[#cbb8e8] sm:w-[5.5rem]">
        {posterSrc ? (
          <img
            src={posterSrc}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-3.5">
        <div className="flex items-start justify-between gap-2">
          <span className="inline-flex rounded-full bg-brand-orange px-2 py-0.5 pt-0.5 font-body text-[9px] font-bold uppercase tracking-wide text-white">
            {item.badge}
          </span>
          <span className="shrink-0 font-body text-[10px] text-gray-400">
            {item.year}
          </span>
        </div>
        <h3 className="mt-1 truncate font-body text-[15px] font-bold leading-snug text-brand-home1">
          {item.title}
        </h3>
        <CardSubtitle subtitle={item.subtitle} />
      </div>
    </a>
  )
}

const TAB_EDGE_FADE_WIDTH = '2.75rem'

/**
 * Tab ngang full-bleed xám — lề = trang; mask mép (trái/phải giống nhau, lộ đúng nền).
 * @param {object} props
 * @param {string} props.categoryId
 * @param {string} props.activeTabId
 * @param {{ id: string, label: string }[]} props.tabs
 */
function ActivityCategoryTabsBar({ categoryId, activeTabId, tabs }) {
  const scrollRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return undefined

    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      const x = el.scrollLeft
      setCanScrollLeft(x > 1)
      setCanScrollRight(max > 1 && x < max - 1)
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [tabs, categoryId, activeTabId])

  const maskLeft = canScrollLeft
    ? `linear-gradient(to right, transparent 0%, #000 ${TAB_EDGE_FADE_WIDTH})`
    : 'linear-gradient(#000, #000)'
  const maskRight = canScrollRight
    ? `linear-gradient(to left, transparent 0%, #000 ${TAB_EDGE_FADE_WIDTH})`
    : 'linear-gradient(#000, #000)'
  const maskImage = `${maskLeft}, ${maskRight}`

  return (
    <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-brand-home1/10">
      <div className="home-mobile-section">
        <div className="home-mobile-content py-3">
          <div
            ref={scrollRef}
            className="overflow-x-auto hide-scrollbar"
            style={{
              WebkitMaskImage: maskImage,
              maskImage,
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            <div className="flex w-max min-w-full items-center gap-9">
              {tabs.map(tab => {
                const active = tab.id === activeTabId
                return (
                  <a
                    key={tab.id}
                    href={`#${activityTabPath(categoryId, tab.id)}`}
                    className={cn(
                      'relative shrink-0 whitespace-nowrap pb-1 font-body text-[13px] font-semibold tracking-wide transition-colors',
                      active
                        ? "text-brand-home1 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-2/3 after:-translate-x-1/2 after:bg-brand-home1 after:content-['']"
                        : 'text-brand-textheader/50'
                    )}
                  >
                    {tab.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * @param {object} props
 * @param {string} props.route
 * @param {string} props.categoryId
 * @param {string} props.tabId
 */
function ActivitiesListMobile({ route, categoryId, tabId }) {
  const category = getCategoryById(categoryId)
  const activeTabId = category.tabs.some(tab => tab.id === tabId)
    ? tabId
    : (category.tabs[0]?.id ?? '')

  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null))
  const contentScrollRef = useRef(/** @type {HTMLElement | null} */ (null))
  /** Đang mở panel search (ẩn list) */
  const [searchOpen, setSearchOpen] = useState(false)
  /** Text đang gõ */
  const [draftQuery, setDraftQuery] = useState('')
  /** Query đã Enter — mới lọc list */
  const [appliedQuery, setAppliedQuery] = useState('')
  const [recent, setRecent] = useState(loadRecentSearches)
  const [sort, setSort] = useState(/** @type {SortValue} */ ('desc'))
  const [sortOpen, setSortOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  useEffect(() => {
    const el = contentScrollRef.current
    if (!el) return undefined
    const update = () => {
      setScrolled(el.scrollTop > SCROLL_TOP_THRESHOLD)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [categoryId, activeTabId, appliedQuery, sort])

  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0 })
  }, [categoryId, activeTabId, appliedQuery, sort, searchOpen])

  const listItems = useMemo(
    () =>
      getActivityItems({
        categoryId,
        tabId: activeTabId,
        query: appliedQuery,
        sort,
      }),
    [categoryId, activeTabId, appliedQuery, sort]
  )

  /**
   * @param {string[]} next
   */
  const commitRecent = next => {
    setRecent(next)
    saveRecentSearches(next)
  }

  /**
   * @param {string} term
   */
  const applySearch = term => {
    const q = term.trim()
    setDraftQuery(q)
    setAppliedQuery(q)
    setSearchOpen(false)
    if (q) {
      const next = [q, ...recent.filter(item => item !== q)].slice(
        0,
        MAX_RECENT
      )
      commitRecent(next)
    }
  }

  const openSearch = () => {
    if (searchOpen) return
    setDraftQuery(appliedQuery)
    setSearchOpen(true)
  }

  const cancelSearch = () => {
    setDraftQuery(appliedQuery)
    setSearchOpen(false)
    inputRef.current?.blur()
  }

  /**
   * @param {string} term
   */
  const removeRecent = term => {
    commitRecent(recent.filter(item => item !== term))
  }

  return (
    <PageShell className="relative h-dvh overflow-hidden !pb-0">
      <ActivitiesMobileBackdrop className="pointer-events-none fixed inset-0 z-0" />
      <Header variant="fixed" layout="mobile" />

      <BackToTopButton
        show={scrolled && !searchOpen}
        onClick={() =>
          contentScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
        }
      />

      <main
        className={cn(
          'fixed inset-x-0 bottom-0 z-10 flex flex-col overflow-hidden',
          ACTIVITIES_MOBILE_BELOW_HEADER
        )}
      >
        <div className="shrink-0">
          <ActivityCategoryBarMobile activeId={categoryId} />
          <ActivityCategoryTabsBar
            categoryId={categoryId}
            activeTabId={activeTabId}
            tabs={category.tabs}
          />
        </div>

        <section
          ref={contentScrollRef}
          className="home-mobile-section min-h-0 flex-1 overflow-x-clip overflow-y-auto overscroll-y-contain pb-12"
        >
          <div className="home-mobile-content">
            <div className="mb-5 mt-5 flex items-center gap-2.5">
              <label className="flex min-h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-brand-home1 bg-white/50 px-3.5 py-1 shadow-[0_2px_12px_rgba(90,59,196,0.06)] backdrop-blur-sm">
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                  <SearchIcon
                    tone="purple"
                    className="!h-4 !w-4 !translate-y-0"
                  />
                </span>
                <input
                  ref={inputRef}
                  type="search"
                  inputMode="search"
                  enterKeyHint="search"
                  autoCapitalize="off"
                  autoCorrect="off"
                  value={draftQuery}
                  onFocus={openSearch}
                  onChange={e => {
                    openSearch()
                    setDraftQuery(e.target.value)
                  }}
                  onKeyDown={e => {
                    if (e.key !== 'Enter') return
                    e.preventDefault()
                    applySearch(draftQuery)
                  }}
                  placeholder="Tìm kiếm"
                  aria-label="Tìm kiếm hoạt động"
                  className="min-w-0 flex-1 bg-transparent font-body text-[13px] leading-normal text-brand-textheader outline-none placeholder:italic placeholder:text-gray-400 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                />
                {draftQuery ? (
                  <button
                    type="button"
                    aria-label="Xóa nội dung tìm kiếm"
                    onMouseDown={event => {
                      event.preventDefault()
                    }}
                    onClick={event => {
                      event.preventDefault()
                      event.stopPropagation()
                      setDraftQuery('')
                      if (searchOpen) {
                        inputRef.current?.focus()
                        return
                      }
                      setAppliedQuery('')
                    }}
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-70"
                  >
                    <CloseIcon
                      tone="purple"
                      className="!h-3.5 !w-3.5 !translate-y-0"
                    />
                  </button>
                ) : null}
              </label>

              {searchOpen ? (
                <button
                  type="button"
                  onClick={cancelSearch}
                  className="shrink-0 px-1 font-body text-[14px] font-semibold text-brand-home1"
                >
                  Hủy
                </button>
              ) : (
                <IconToolButton
                  purpleSrc={iconPsort}
                  whiteSrc={iconWsort}
                  variant="activities"
                  aria-label="Sắp xếp theo"
                  aria-haspopup="dialog"
                  aria-expanded={sortOpen}
                  className="h-10 w-10 shrink-0"
                  iconClassName="h-4 w-4"
                  active={sortOpen}
                  onClick={() => setSortOpen(true)}
                />
              )}
            </div>

            {searchOpen ? (
              <div className="rounded-2xl px-0 pb-3 pt-3">
                <p className="font-body text-[13px] font-semibold text-brand-textheader/45">
                  Tìm kiếm gần đây
                </p>
                <div className="mt-2.5 h-px bg-gray-300/90" />

                {recent.length === 0 ? (
                  <p className="mt-6 text-center font-body text-[13px] text-brand-textheader/45">
                    Chưa có tìm kiếm gần đây.
                  </p>
                ) : (
                  <ul className="mt-1">
                    {recent.map(term => (
                      <li
                        key={term}
                        className="flex items-center gap-3 border-b border-transparent last:border-b-0"
                      >
                        <button
                          type="button"
                          onClick={() => applySearch(term)}
                          className="flex min-w-0 flex-1 items-center gap-3 py-3.5 text-left"
                        >
                          <SearchIcon
                            tone="purple"
                            className="!h-3.5 !w-3.5 !translate-y-0 shrink-0 brightness-0 opacity-80"
                          />
                          <span className="truncate font-body text-[14px] text-brand-textheader/45">
                            {term}
                          </span>
                        </button>
                        <button
                          type="button"
                          aria-label={`Xóa “${term}”`}
                          onClick={() => removeRecent(term)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-70"
                        >
                          <CloseIcon
                            tone="purple"
                            className="!h-3.5 !w-3.5 !translate-y-0 brightness-0 opacity-80"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : listItems.length === 0 ? (
              <p className="py-10 text-center font-body text-sm text-gray-500">
                {appliedQuery
                  ? 'Không tìm thấy nội dung phù hợp.'
                  : 'Chưa có nội dung trong mục này.'}
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {listItems.map(item => (
                  <ActivityCardMobile key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {sortOpen && !searchOpen ? (
        <ActivitySortSheet
          open
          value={sort}
          onClose={() => setSortOpen(false)}
          onSelect={next => {
            setSort(next)
            setSortOpen(false)
          }}
        />
      ) : null}
    </PageShell>
  )
}

/**
 * Mobile — list / detail.
 * @param {object} props
 * @param {string} [props.route]
 */
export function ActivitiesResponsive({ route = ROUTES.ACTIVITIES }) {
  const { categoryId, tabId, itemId } = parseActivityRoute(route)

  if (itemId) {
    return <ActivityDetailResponsive itemId={itemId} categoryId={categoryId} />
  }

  return (
    <ActivitiesListMobile route={route} categoryId={categoryId} tabId={tabId} />
  )
}

export const ActivitiesMobile = ActivitiesResponsive
