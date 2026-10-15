import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import iconPsearch from '@assets/images/subicon/iconPsearch.png'
import iconWsearch from '@assets/images/subicon/iconWsearch.png'
import iconPsort from '@assets/images/subicon/iconPsort.png'
import iconWsort from '@assets/images/subicon/iconWsort.png'
import iconTick from '@assets/images/subicon/iconPtick.png'
import { Header } from '@components/common'
import {
  ArrowIcon,
  BackToTopButton,
  CloseIcon,
  IconImg,
  IconToolButton,
  SearchIcon,
} from '@components/icon'
import { PageShell } from '@layouts'
import { cn } from '@utils'
import { LIBRARY_IMAGES } from '../library/libraryData'
import { LibraryLightbox } from '../library/LibraryLightbox'
import {
  activityCategoryPath,
  getActivityById,
  getInfoFieldsForCategory,
} from './activityData'
import {
  ACTIVITIES_MOBILE_BELOW_HEADER,
  ACTIVITIES_MOBILE_MAIN_PT,
  ActivitiesMobileBackdrop,
  ActivityCategoryBarMobile,
} from './ActivitiesMobileShared'
import { getActivityPosterSrc } from './posterData'

const DETAIL_TAB_LABELS = {
  info: 'Thông tin',
  images: 'Hình ảnh',
  video: 'Video',
}

const SCROLL_TOP_THRESHOLD = 120

/**
 * @param {string} value
 */
function formatPlayTitleValue(value) {
  const text = value?.trim() ?? ''
  if (!text) return '—'
  const sep = text.search(/[:：]/)
  if (sep < 0) return text
  const head = text.slice(0, sep).trim()
  const tail = text.slice(sep + 1).trim()
  if (!head) return text
  return (
    <>
      <span className="font-bold">{head}</span>
      {tail ? (
        <span className="font-normal">
          {text[sep]} {tail}
        </span>
      ) : (
        <span className="font-normal">{text[sep]}</span>
      )}
    </>
  )
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {boolean} [props.large]
 * @param {boolean} [props.splitPlayTitle]
 */
function InfoFieldMobile({
  label,
  value,
  large = false,
  splitPlayTitle = false,
}) {
  const trimmed = value?.trim() ?? ''
  const empty = !trimmed

  return (
    <div className="min-w-0">
      <p className="font-body text-[10px] font-semibold uppercase tracking-[1px] text-brand-home1/40">
        {label}
      </p>
      <p
        className={
          large
            ? 'mt-0.5 font-body text-[15px] uppercase font-bold leading-snug text-brand-textheader'
            : 'mt-0.5 font-body text-[13px] leading-snug text-brand-textheader'
        }
      >
        {empty
          ? 'Đang cập nhật'
          : splitPlayTitle
            ? formatPlayTitleValue(trimmed)
            : trimmed}
      </p>
    </div>
  )
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 */
function InfoPanelMobile({ item }) {
  const fields = getInfoFieldsForCategory(item.categoryId)
  const info = item.info ?? {}
  /** Mobile detail — poster ngang */
  const posterSrc = getActivityPosterSrc(item, 'landscape')
  const primaryFields = fields.filter(
    field =>
      field.primary &&
      (field.key === 'role' || Boolean(info[field.key]?.trim()))
  )
  const secondaryFields = fields.filter(field => !field.primary)

  return (
    <div className="pb-10">
      <div className="aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[#cbb8e8]">
        {posterSrc ? (
          <img
            src={posterSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <span className="mt-5 inline-flex rounded-full bg-brand-orange px-2.5 py-0.5 pt-1 font-body text-[10px] font-bold uppercase tracking-wide text-white">
        {item.badge}
      </span>

      <div className="mt-5 space-y-4">
        {primaryFields.map(field => (
          <InfoFieldMobile
            key={field.key}
            label={field.label}
            value={info[field.key] ?? ''}
            large
            splitPlayTitle={field.key === 'playTitle'}
          />
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {secondaryFields.map(field => (
          <InfoFieldMobile
            key={field.key}
            label={field.label}
            value={info[field.key] ?? ''}
          />
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-1 font-body text-[10px] font-semibold uppercase tracking-[2px] text-brand-home1/40">
          Mô tả
        </p>
        <p className="font-body text-[13px] leading-relaxed text-justify text-brand-textheader">
          {item.description?.trim() || 'Đang cập nhật'}
        </p>
      </div>
    </div>
  )
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 */
function ImagesPanelMobile({ item }) {
  const fromItem = (item.images ?? []).filter(src => Boolean(src?.trim()))
  const images = fromItem.length
    ? fromItem.map((src, index) => ({
        id: `${item.id}-img-${index}`,
        src,
        alt: item.title,
      }))
    : LIBRARY_IMAGES

  const [activeIndex, setActiveIndex] = useState(
    /** @type {number | null} */ (null)
  )
  const activeItem =
    activeIndex != null && images[activeIndex] ? images[activeIndex] : null

  const left = images.filter((_, i) => i % 2 === 0)
  const right = images.filter((_, i) => i % 2 === 1)

  /**
   * @param {{ id: string, src: string, alt?: string }[]} col
   * @param {number} indexOffset
   */
  const renderCol = (col, indexOffset) =>
    col.map((image, i) => {
      const index = indexOffset === 0 ? i * 2 : i * 2 + 1
      return (
        <button
          key={image.id}
          type="button"
          onClick={() => setActiveIndex(index)}
          className="block w-full overflow-hidden rounded-[1.15rem] border border-brand-home1/35 bg-[#d4c8e8]/50 text-left active:opacity-90"
        >
          <img
            src={image.src}
            alt={image.alt ?? item.title}
            className="block h-auto w-full max-w-full"
            loading="lazy"
            decoding="async"
          />
        </button>
      )
    })

  return (
    <>
      <div className="flex items-start gap-3 pb-10">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {renderCol(left, 0)}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {renderCol(right, 1)}
        </div>
      </div>

      <LibraryLightbox
        item={activeItem}
        onClose={() => setActiveIndex(null)}
        hasPrev={activeIndex != null && activeIndex > 0}
        hasNext={activeIndex != null && activeIndex < images.length - 1}
        onPrev={() =>
          setActiveIndex(index =>
            index != null && index > 0 ? index - 1 : index
          )
        }
        onNext={() =>
          setActiveIndex(index =>
            index != null && index < images.length - 1 ? index + 1 : index
          )
        }
      />
    </>
  )
}

/**
 * @param {string} [url]
 */
function getYoutubeThumbnailSrc(url) {
  if (!url?.trim()) return null
  try {
    const parsed = new URL(url.trim())
    let id = parsed.searchParams.get('v')
    if (!id && /youtu\.be$/i.test(parsed.hostname)) {
      id = parsed.pathname.replace(/^\//, '').split('/')[0] || null
    }
    if (!id && parsed.pathname.includes('/embed/')) {
      id = parsed.pathname.split('/embed/')[1]?.split(/[/?#]/)[0] || null
    }
    if (!id && parsed.pathname.includes('/shorts/')) {
      id = parsed.pathname.split('/shorts/')[1]?.split(/[/?#]/)[0] || null
    }
    if (!id) return null
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  } catch {
    return null
  }
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityVideoPart[]} props.parts
 * @param {string} props.value
 * @param {(id: string) => void} props.onChange
 */
function PartDropdownMobile({ parts, value, onChange }) {
  const [open, setOpen] = useState(false)
  const active = parts.find(part => part.id === value) ?? parts[0]

  if (!active) return null

  return (
    <>
      <div className="relative w-[6.5rem]">
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(prev => !prev)}
          className={cn(
            'flex w-full items-center rounded-xl border-[1.5px] bg-white/35 px-2.5 py-2.5 font-body text-[13px] font-semibold text-brand-home1 transition-colors active:opacity-90',
            open ? 'border-brand-home1' : 'border-white/80'
          )}
        >
          <span className="flex w-2/3 min-w-0 items-center justify-center truncate text-center">
            {active.label}
          </span>
          <span
            className="flex w-1/3 items-center justify-center text-right"
            aria-hidden
          >
            <svg viewBox="0 0 12 8" className="h-2.5 w-2.5 text-brand-home1">
              <path
                d="M1 1.5 6 6.5 11 1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>

      <PartSelectSheet
        open={open}
        parts={parts}
        value={active.id}
        onClose={() => setOpen(false)}
        onSelect={id => {
          onChange(id)
          setOpen(false)
        }}
      />
    </>
  )
}

/**
 * Sheet chọn phần — cùng cơ chế bottom sheet với sort.
 * @param {object} props
 * @param {boolean} props.open
 * @param {import('./activityData').ActivityVideoPart[]} props.parts
 * @param {string} props.value
 * @param {() => void} props.onClose
 * @param {(id: string) => void} props.onSelect
 */
function PartSelectSheet({ open, parts, value, onClose, onSelect }) {
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
        aria-label="Đóng chọn phần"
        className="absolute inset-0 bg-black/35"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chọn phần"
        className="relative z-10 rounded-t-[1.5rem] bg-white pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
      >
        <h2 className="text-center font-body text-[15px] font-bold text-brand-home1">
          Tùy chọn
        </h2>
        <div className="home-mobile-section mt-4">
          <ul className="home-mobile-content" role="listbox">
            {parts.map(part => {
              const selected = part.id === value
              return (
                <li key={part.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => onSelect(part.id)}
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
                      {part.label}
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
 * @param {boolean} props.open
 * @param {'desc' | 'asc'} props.value
 * @param {() => void} props.onClose
 * @param {(value: 'desc' | 'asc') => void} props.onSelect
 */
function VideoSortSheet({ open, value, onClose, onSelect }) {
  const options = [
    { value: /** @type {const} */ ('desc'), label: 'Mới nhất' },
    { value: /** @type {const} */ ('asc'), label: 'Cũ nhất' },
  ]

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
          <ul className="home-mobile-content" role="listbox">
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

const VIDEO_RECENT_KEY = 'lkk-activity-video-recent-searches'
const VIDEO_MAX_RECENT = 10

/**
 * @returns {string[]}
 */
function loadVideoRecentSearches() {
  try {
    const raw = localStorage.getItem(VIDEO_RECENT_KEY)
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
function saveVideoRecentSearches(items) {
  try {
    localStorage.setItem(VIDEO_RECENT_KEY, JSON.stringify(items))
  } catch {
    /* ignore quota */
  }
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 */
function VideoPanelMobile({ item }) {
  const parts = item.videoParts ?? []
  const hasParts = parts.length > 0
  const isFilm = item.categoryId === 'phim-anh'
  const [partId, setPartId] = useState(parts[0]?.id ?? '')
  const [searchOpen, setSearchOpen] = useState(false)
  const [draftQuery, setDraftQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [recent, setRecent] = useState(loadVideoRecentSearches)
  const [sort, setSort] = useState(/** @type {'desc' | 'asc'} */ ('desc'))
  const [sortOpen, setSortOpen] = useState(false)
  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null))

  const activePartId =
    hasParts && partId && parts.some(part => part.id === partId)
      ? partId
      : (parts[0]?.id ?? '')

  const videos = useMemo(() => {
    let list = [...(item.videos ?? [])]
    if (hasParts && activePartId) {
      list = list.filter(
        video => !video.partId || video.partId === activePartId
      )
    }
    if (appliedQuery.trim()) {
      const q = appliedQuery.trim().toLowerCase()
      list = list.filter(video => video.title.toLowerCase().includes(q))
    }
    list.sort((a, b) => {
      const ea = a.episode ?? 0
      const eb = b.episode ?? 0
      return sort === 'asc' ? ea - eb : eb - ea
    })
    return list
  }, [item.videos, hasParts, activePartId, appliedQuery, sort])

  const episodeCount = isFilm
    ? videos.reduce((max, video) => Math.max(max, video.episode ?? 0), 0) ||
      videos.length
    : videos.length

  /**
   * @param {string[]} next
   */
  const commitRecent = next => {
    setRecent(next)
    saveVideoRecentSearches(next)
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
      commitRecent(
        [q, ...recent.filter(item => item !== q)].slice(0, VIDEO_MAX_RECENT)
      )
    }
  }

  const openSearch = () => {
    setDraftQuery(appliedQuery)
    setSearchOpen(true)
    setSortOpen(false)
    requestAnimationFrame(() => inputRef.current?.focus())
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
    <div className="pb-10">
      {searchOpen ? (
        <>
          <div className="mb-4 flex items-center gap-2.5">
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
                onChange={e => setDraftQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key !== 'Enter') return
                  e.preventDefault()
                  applySearch(draftQuery)
                }}
                placeholder="Tìm kiếm"
                aria-label="Tìm kiếm video"
                className="min-w-0 flex-1 bg-transparent font-body text-[13px] leading-normal text-brand-textheader outline-none placeholder:italic placeholder:text-gray-400 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              />
              {draftQuery ? (
                <button
                  type="button"
                  aria-label="Xóa nội dung tìm kiếm"
                  onMouseDown={event => event.preventDefault()}
                  onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    setDraftQuery('')
                    inputRef.current?.focus()
                  }}
                  className="flex h-5 w-5 shrink-0 items-center justify-center"
                >
                  <CloseIcon
                    tone="purple"
                    className="!h-3.5 !w-3.5 !translate-y-0"
                  />
                </button>
              ) : null}
            </label>
            <button
              type="button"
              onClick={cancelSearch}
              className="shrink-0 px-1 font-body text-[14px] font-semibold text-brand-home1"
            >
              Hủy
            </button>
          </div>

          <div className="rounded-2xl px-0 pb-3 pt-1">
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
                    className="flex items-center gap-3 last:border-b-0"
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
                      className="flex h-8 w-8 shrink-0 items-center justify-center"
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
        </>
      ) : (
        <>
          {/* Mockup: Phần | số tập … search icon | sort icon — không ô nhập */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-4.25">
              {hasParts ? (
                <PartDropdownMobile
                  parts={parts}
                  value={activePartId}
                  onChange={setPartId}
                />
              ) : null}
              {episodeCount > 0 ? (
                <span
                  className={cn(
                    'font-body text-[12px] text-brand-textheader',
                    !hasParts &&
                      'flex w-[6.5rem] shrink-0 items-center justify-center text-center'
                  )}
                >
                  {episodeCount} tập
                </span>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <IconToolButton
                purpleSrc={iconPsearch}
                whiteSrc={iconWsearch}
                variant="activities"
                aria-label="Tìm kiếm video"
                className="h-10 w-10 shrink-0"
                iconClassName="h-4 w-4"
                active={Boolean(appliedQuery)}
                onClick={openSearch}
              />
              <IconToolButton
                purpleSrc={iconPsort}
                whiteSrc={iconWsort}
                variant="activities"
                aria-label="Sắp xếp theo"
                className="h-10 w-10 shrink-0"
                iconClassName="h-4 w-4"
                active={sortOpen}
                onClick={() => setSortOpen(true)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {videos.length === 0 ? (
              <p className="py-8 text-center font-body text-sm text-gray-500">
                {appliedQuery
                  ? 'Không tìm thấy video phù hợp.'
                  : 'Chưa có video.'}
              </p>
            ) : (
              videos.map((video, index) => {
                const thumbSrc = getYoutubeThumbnailSrc(video.url)
                return (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-mobile-glass-card flex items-stretch overflow-hidden border-[1.5px] border-white/80 bg-white/35 active:opacity-90"
                  >
                    <span
                      className={cn(
                        'relative aspect-[3/2] w-[6.5rem] shrink-0 overflow-hidden',
                        !thumbSrc &&
                          (index % 2 === 0
                            ? 'bg-brand-orange'
                            : 'bg-brand-home1')
                      )}
                      aria-hidden
                    >
                      {thumbSrc ? (
                        <img
                          src={thumbSrc}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </span>
                    <span className="flex min-w-0 flex-1 items-center gap-2 px-4 py-3.5">
                      <span className="min-w-0 flex-1 font-body text-[13px] font-semibold leading-snug text-brand-home1">
                        {video.title}
                      </span>
                      <ArrowIcon
                        tone="white"
                        className="h-3.5 w-3.5 shrink-0 brightness-0 opacity-50"
                      />
                    </span>
                  </a>
                )
              })
            )}
          </div>
        </>
      )}

      {sortOpen && !searchOpen ? (
        <VideoSortSheet
          open
          value={sort}
          onClose={() => setSortOpen(false)}
          onSelect={next => {
            setSort(next)
            setSortOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

/**
 * @param {object} props
 * @param {string} props.itemId
 * @param {string} props.categoryId
 */
export function ActivityDetailResponsive({ itemId, categoryId }) {
  const item = getActivityById(itemId)
  const contentScrollRef = useRef(/** @type {HTMLElement | null} */ (null))
  const [tabByItem, setTabByItem] = useState(
    /** @type {Record<string, 'info'|'images'|'video'>} */ ({})
  )
  const [scrolled, setScrolled] = useState(false)

  const tabs = item?.detailTabs ?? ['info', 'images']
  const requestedTab = tabByItem[itemId] ?? 'info'
  const activeTab = tabs.includes(requestedTab)
    ? requestedTab
    : (tabs[0] ?? 'info')

  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0 })
  }, [itemId, activeTab])

  useEffect(() => {
    const el = contentScrollRef.current
    if (!el) return undefined
    const update = () => {
      setScrolled(el.scrollTop > SCROLL_TOP_THRESHOLD)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [itemId, activeTab])

  if (!item) {
    return (
      <PageShell className="home-mobile-shell relative overflow-x-clip">
        <ActivitiesMobileBackdrop className="pointer-events-none fixed inset-0 z-0" />
        <Header variant="fixed" layout="mobile" />
        <main
          className={cn(
            'relative z-10 flex min-h-dvh flex-col items-center justify-center px-6',
            ACTIVITIES_MOBILE_MAIN_PT
          )}
        >
          <p className="font-body text-sm text-gray-500">
            Không tìm thấy nội dung.
          </p>
          <a
            href={`#${activityCategoryPath(categoryId)}`}
            className="mt-4 font-body text-sm font-semibold text-brand-home1"
          >
            Quay lại danh sách
          </a>
        </main>
      </PageShell>
    )
  }

  return (
    <PageShell className="relative h-dvh overflow-hidden !pb-0">
      <ActivitiesMobileBackdrop className="pointer-events-none fixed inset-0 z-0" />
      <Header variant="fixed" layout="mobile" />

      <BackToTopButton
        show={scrolled}
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
          <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-brand-home1/10">
            <div className="home-mobile-section">
              <div className="home-mobile-content flex items-center justify-center overflow-x-auto hide-scrollbar py-3">
                <div className="flex w-max items-center justify-center gap-8">
                  {tabs.map(tab => {
                    const active = tab === activeTab
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() =>
                          setTabByItem(prev => ({ ...prev, [itemId]: tab }))
                        }
                        className={cn(
                          'relative shrink-0 whitespace-nowrap pb-1 font-body text-[13px] font-semibold tracking-wide transition-colors',
                          active
                            ? "text-brand-home1 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-2/3 after:-translate-x-1/2 after:bg-brand-home1 after:content-['']"
                            : 'text-brand-textheader/50'
                        )}
                      >
                        {DETAIL_TAB_LABELS[tab]}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          ref={contentScrollRef}
          className="home-mobile-section min-h-0 flex-1 overflow-x-clip overflow-y-auto overscroll-y-contain pb-8"
        >
          <div className="home-mobile-content">
            <h1
              className="mb-5 mt-5 font-display text-[36px] italic leading-[1.05] is-revealed tracking-wide text-brand-home1"
              style={{ WebkitTextStroke: '0.2px #5a3bc4' }}
            >
              {item.title.toUpperCase()}
            </h1>

            {activeTab === 'info' ? <InfoPanelMobile item={item} /> : null}
            {activeTab === 'images' ? <ImagesPanelMobile item={item} /> : null}
            {activeTab === 'video' ? <VideoPanelMobile item={item} /> : null}
          </div>
        </section>
      </main>
    </PageShell>
  )
}
