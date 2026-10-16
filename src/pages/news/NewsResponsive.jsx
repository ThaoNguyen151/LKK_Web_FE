import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import rectFull from '@assets/Rectangle-full.png'
import iconPsort from '@assets/images/subicon/iconPsort.png'
import iconWsort from '@assets/images/subicon/iconWsort.png'
import iconTick from '@assets/images/subicon/iconPtick.png'
import { Header, PaginationMobile } from '@components/common'
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
  NEWS_ITEMS,
  filterAndSortNews,
  newsPagePath,
  parseNewsPage,
} from './newsData'
import { NewsRevealSlot, useNewsMobileReveal } from './useNewsMobileReveal'

/** @typedef {'desc' | 'asc' | 'az' | 'za'} SortValue */

const MOBILE_PAGE_SIZE = 10
const SCROLL_TOP_THRESHOLD = 120
const RECENT_STORAGE_KEY = 'lkk-news-recent-searches'
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
 * @param {string} [props.className]
 */
function NewsMobileBackdrop({ className }) {
  return (
    <div aria-hidden className={cn('overflow-hidden bg-brand-soft', className)}>
      <div className="absolute left-[-65px] top-[8%] flex h-[min(72vw,300px)] w-[min(52vw,210px)] items-center justify-start overflow-visible">
        <img
          src={rectFull}
          alt=""
          className="h-auto w-[min(110vw,520px)] max-w-none translate-x-[-50%] rotate-[330deg] object-contain opacity-85 pt-[80%]"
        />
      </div>
      <img
        src={rectFull}
        alt=""
        className="absolute right-0 top-[40%] h-auto w-[min(90vw,380px)] max-w-none translate-x-[50%] object-contain opacity-85"
      />
    </div>
  )
}

/**
 * @param {object} props
 * @param {import('./newsData').NewsItem} props.item
 */
function NewsCardMobile({ item }) {
  const body = (
    <>
      <div className="aspect-[3/2] w-full overflow-hidden bg-[#d4c8e8]">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2 px-4 py-2.5 pt-3">
        <span className="inline-flex w-fit rounded-full bg-brand-orange px-2 py-0.5 pt-1 font-body text-[9px] font-semibold uppercase tracking-wide text-white">
          {item.source}
        </span>
        <h2 className="line-clamp-3 pt-0.5 font-body text-[15px] font-bold leading-snug text-brand-home1">
          {item.title}
        </h2>
        <time className="font-body text-[10px] text-gray-400">{item.date}</time>
      </div>
    </>
  )

  const cardClass =
    'home-mobile-glass-card flex h-full flex-col overflow-hidden border-[1.5px] border-white/80 bg-white/20 backdrop-blur-sm'

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
 * Chia list thành từng hàng 2 card (reveal theo cặp).
 * @param {import('./newsData').NewsItem[]} items
 */
function chunkNewsRows(items) {
  /** @type {import('./newsData').NewsItem[][]} */
  const rows = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }
  return rows
}

/**
 * Bottom sheet sort mobile — chọn xong áp dụng ngay, tick tím, không nút X / Áp dụng.
 * @param {object} props
 * @param {boolean} props.open
 * @param {SortValue} props.value
 * @param {() => void} props.onClose
 * @param {(value: SortValue) => void} props.onSelect
 */
function NewsSortSheet({ open, value, onClose, onSelect }) {
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

        {/* Lề ngang = grid tin (home-mobile-section + content) — tick sát lề trái grid */}
        <div className="home-mobile-section mt-4">
          <ul
            className="home-mobile-content"
            role="listbox"
            aria-label="Tùy chọn sắp xếp"
          >
            {DEFAULT_SORT_OPTIONS.map(option => {
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
                    {/* Luôn giữ chỗ tick — chữ căn đều dù chọn / chưa chọn */}
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
 * Mobile — search overlay (gần đây) / Enter mới lọc grid.
 * @param {object} props
 * @param {string} [props.route]
 */
export function NewsResponsive({ route = ROUTES.NEWS }) {
  const requestedPage = parseNewsPage(route)
  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null))

  /** Đang mở panel search (ẩn grid) */
  const [searchOpen, setSearchOpen] = useState(false)
  /** Text đang gõ trong ô */
  const [draftQuery, setDraftQuery] = useState('')
  /** Query đã Enter — mới dùng để lọc grid */
  const [appliedQuery, setAppliedQuery] = useState('')
  const [recent, setRecent] = useState(loadRecentSearches)
  const [sort, setSort] = useState(/** @type {SortValue} */ ('desc'))
  const [sortOpen, setSortOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const filtered = useMemo(
    () => filterAndSortNews(NEWS_ITEMS, appliedQuery, sort),
    [appliedQuery, sort]
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / MOBILE_PAGE_SIZE))
  const safePage = Math.min(Math.max(1, requestedPage), totalPages)
  const pageItems = filtered.slice(
    (safePage - 1) * MOBILE_PAGE_SIZE,
    safePage * MOBILE_PAGE_SIZE
  )
  const pageRows = useMemo(() => chunkNewsRows(pageItems), [pageItems])

  /** Gồm số trang — đổi trang = remount + chạy lại animation như trang đầu. */
  const revealKey = [
    safePage,
    appliedQuery,
    sort,
    searchOpen ? 'search' : 'list',
    pageItems.map(item => item.id).join(','),
  ].join('|')

  useNewsMobileReveal(revealKey)

  useEffect(() => {
    const expected = newsPagePath(safePage)
    if (route !== expected && window.location.hash !== `#${expected}`) {
      window.location.replace(`#${expected}`)
    }
  }, [route, safePage])

  useEffect(() => {
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      setScrolled(y > SCROLL_TOP_THRESHOLD)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  /** @param {number} next */
  const goToPage = next => {
    if (next === safePage) return
    const path = newsPagePath(next)
    if (window.location.hash !== `#${path}`) {
      window.location.hash = path
    }
  }

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
    if (safePage !== 1) goToPage(1)
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
    <PageShell className="news-mobile-shell home-mobile-shell relative overflow-x-clip">
      <NewsMobileBackdrop className="pointer-events-none fixed inset-0 z-0" />
      <Header variant="fixed" layout="mobile" />

      <BackToTopButton
        show={scrolled && !searchOpen}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <main className="relative z-10 min-h-dvh pt-[20%]">
        <section className="home-mobile-section mobile-page-bottom pt-4 sm:pt-5">
          <div className="home-mobile-content">
            <div className="mb-6.5 flex items-center gap-2.5">
              <label className="flex min-h-10  min-w-0 flex-1 items-center gap-2 rounded-full border-[1.5px] border-brand-home1 bg-white/50 px-3.5 py-1 shadow-[0_2px_12px_rgba(90,59,196,0.06)] backdrop-blur-sm">
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
                  aria-label="Tìm kiếm tin tức"
                  className="min-w-0 flex-1 bg-transparent font-body text-[13px] leading-normal text-brand-textheader outline-none placeholder:italic placeholder:text-gray-400 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                />
                {draftQuery ? (
                  <button
                    type="button"
                    aria-label="Xóa nội dung tìm kiếm"
                    onMouseDown={event => {
                      // Giữ focus/keyboard trên iOS (tránh blur trước click)
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
                      if (safePage !== 1) goToPage(1)
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
              /* Panel tìm kiếm gần đây — ẩn grid */
              <div className="rounded-2xl px-0 pb-3 pt-3">
                <p className="font-body font-semibold text-[13px] text-brand-textheader/45">
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
            ) : (
              <>
                <div key={revealKey} className="flex flex-col gap-3">
                  {pageRows.map((row, rowIndex) => (
                    <NewsRevealSlot
                      key={`${safePage}-row-${rowIndex}-${row.map(item => item.id).join('-')}`}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {row.map((item, index) => (
                          <NewsCardMobile
                            key={`${item.id}-${index}`}
                            item={item}
                          />
                        ))}
                      </div>
                    </NewsRevealSlot>
                  ))}
                </div>

                {pageItems.length === 0 ? (
                  <p className="mt-10 text-center font-body text-sm text-gray-500">
                    Không tìm thấy tin phù hợp.
                  </p>
                ) : null}

                {totalPages > 1 ? (
                  <PaginationMobile
                    page={safePage}
                    totalPages={totalPages}
                    onChange={goToPage}
                    label="Phân trang tin tức"
                  />
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>

      {sortOpen ? (
        <NewsSortSheet
          open
          value={sort}
          onClose={() => setSortOpen(false)}
          onSelect={next => {
            setSort(next)
            setSortOpen(false)
            if (safePage !== 1) goToPage(1)
          }}
        />
      ) : null}
    </PageShell>
  )
}

export const NewsMobile = NewsResponsive
