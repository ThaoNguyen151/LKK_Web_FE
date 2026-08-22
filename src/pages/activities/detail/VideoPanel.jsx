import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowIcon,
  ICON_PANEL_CLASS,
  SearchButton,
  SortButton,
} from '@components/icon'
import { cn } from '@utils'
import { GridEdgeBlur } from '../ActivitiesBackdrop'
import { getActivityPosterSrc } from '../posterData'

const FADE_THRESHOLD = 8
const FADE_BOTTOM_OFFSET = 48

/**
 * Lấy URL thumbnail YouTube (16:9) từ link watch / youtu.be / embed / shorts.
 * @param {string} [url]
 * @returns {string | null}
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
 * Dropdown chọn phần phim (Phần 1, Phần 2…).
 * @param {object} props
 * @param {import('../activityData').ActivityVideoPart[]} props.parts
 * @param {string} props.value
 * @param {(id: string) => void} props.onChange
 */
function PartDropdown({ parts, value, onChange }) {
  const rootRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [open, setOpen] = useState(false)
  const active = parts.find(part => part.id === value) ?? parts[0]

  useEffect(() => {
    if (!open) return undefined

    /** @param {PointerEvent} event */
    const onPointerDown = event => {
      const target = /** @type {Node | null} */ (event.target)
      if (rootRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  if (!active) return null

  return (
    <div
      ref={rootRef}
      className="relative w-fit"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        if (rootRef.current?.contains(document.activeElement)) return
        setOpen(false)
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex items-center gap-2 rounded-2xl border-2 border-white bg-white/10 px-4 py-2 font-body text-sm font-semibold text-brand-home1 transition-all duration-300 hover:border-brand-home1 hover:shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)]"
      >
        {active.label}
        <svg
          viewBox="0 0 12 8"
          className={cn(
            'h-2.5 w-2.5 text-brand-home1 transition-transform',
            open && 'rotate-180'
          )}
          aria-hidden
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* pt-2 nối hover từ nút xuống panel — không bị đóng khi di chuyển */}
      <div
        className={cn(
          'absolute left-0 top-full z-30 w-full pt-2 transition-all duration-200',
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible pointer-events-none translate-y-1 opacity-0'
        )}
      >
        <ul
          role="listbox"
          aria-label="Chọn phần"
          className={cn(ICON_PANEL_CLASS, 'w-full px-3 py-2')}
        >
          {parts.map(part => {
            const selected = part.id === active.id
            return (
              <li key={part.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(part.id)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center py-2 pl-2 text-left font-body text-sm transition-colors',
                    selected
                      ? 'font-semibold text-brand-home1'
                      : 'text-gray-700 hover:text-brand-home1'
                  )}
                >
                  {part.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/**
 * Panel Video — 2 cột giống Thông tin: poster 2:3 cố định + danh sách cuộn.
 * @param {object} props
 * @param {import('../activityData').ActivityItem} props.item
 */
export function VideoPanel({ item }) {
  const parts = item.videoParts ?? []
  const hasParts = parts.length > 0
  const isFilm = item.categoryId === 'phim-anh'
  const [partId, setPartId] = useState(parts[0]?.id ?? '')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(/** @type {'desc' | 'asc'} */ ('desc'))
  const frameRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const listScrollRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [bleed, setBleed] = useState({ left: 0, right: 0 })
  const [showTopFade, setShowTopFade] = useState(false)
  const [showBottomFade, setShowBottomFade] = useState(false)

  useLayoutEffect(() => {
    const updateBleed = () => {
      const frame = frameRef.current
      if (!frame) return
      const rect = frame.getBoundingClientRect()
      const right = Math.max(0, window.innerWidth - rect.right)
      const left = Math.max(0, Math.min(56, rect.left))
      setBleed(prev =>
        prev.left === left && prev.right === right ? prev : { left, right }
      )
    }

    updateBleed()
    window.addEventListener('resize', updateBleed)
    return () => window.removeEventListener('resize', updateBleed)
  }, [])

  const activePartId =
    hasParts && partId && parts.some(part => part.id === partId)
      ? partId
      : (parts[0]?.id ?? '')

  let videos = [...(item.videos ?? [])]
  if (hasParts && activePartId) {
    videos = videos.filter(
      video => !video.partId || video.partId === activePartId
    )
  }
  if (query.trim()) {
    const q = query.trim().toLowerCase()
    videos = videos.filter(video => video.title.toLowerCase().includes(q))
  }
  videos.sort((a, b) => {
    const ea = a.episode ?? 0
    const eb = b.episode ?? 0
    return sort === 'asc' ? ea - eb : eb - ea
  })

  const episodeCount = isFilm
    ? videos.reduce((max, video) => Math.max(max, video.episode ?? 0), 0) ||
      videos.length
    : 0
  const posterSrc = getActivityPosterSrc(item)
  const scrollKey = `${item.id}-${activePartId}-${sort}-${query}`

  useEffect(() => {
    const el = listScrollRef.current
    if (!el) return undefined

    const update = () => {
      const maxScroll = el.scrollHeight - el.clientHeight
      setShowTopFade(el.scrollTop > FADE_THRESHOLD)
      setShowBottomFade(
        maxScroll > FADE_THRESHOLD &&
          el.scrollTop < maxScroll - FADE_BOTTOM_OFFSET
      )
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [scrollKey])

  useEffect(() => {
    if (listScrollRef.current) listScrollRef.current.scrollTop = 0
  }, [scrollKey])

  return (
    <div className="relative mt-6 flex h-full min-h-0 flex-col gap-6 lg:flex-row lg:gap-12">
      <div className="flex w-full shrink-0 justify-start lg:h-full lg:w-auto lg:items-start lg:justify-start">
        <div className="aspect-[2/3] h-[min(70vh,28rem)] overflow-hidden rounded-xl bg-[#cbb8e8] sm:h-[min(72vh,32rem)] lg:h-[min(70vh,25rem)] lg:max-h-full">
          {posterSrc ? (
            <img
              src={posterSrc}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>
      </div>

      <div ref={frameRef} className="relative z-0 min-h-0 min-w-0 flex-1">
        <div
          className="absolute inset-y-0 flex flex-col pt-3 pb-5"
          style={{
            left: -bleed.left,
            width: `calc(100% + ${bleed.left + bleed.right}px)`,
            paddingLeft: bleed.left,
            paddingRight: bleed.right,
          }}
        >
          <div className="relative z-20 mb-2 flex shrink-0 flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-6">
              {hasParts ? (
                <PartDropdown
                  parts={parts}
                  value={activePartId}
                  onChange={setPartId}
                />
              ) : null}
              {episodeCount > 0 ? (
                <span className="font-body text-xs text-brand-textheader sm:text-xs">
                  {episodeCount} tập
                </span>
              ) : null}
            </div>

            <div className="relative z-20 ml-auto flex items-center gap-2 sm:gap-3">
              <SearchButton
                variant="activities"
                value={query}
                onChange={setQuery}
                placeholder="Tìm…"
              />
              <SortButton
                variant="activities"
                value={sort}
                onChange={next => setSort(next === 'asc' ? 'asc' : 'desc')}
                options={[
                  { value: 'desc', label: 'Mới nhất' },
                  { value: 'asc', label: 'Cũ nhất' },
                ]}
              />
            </div>
          </div>

          {/* Clip dọc trong khung; nở ngang khung clip để shadow 2 bên không bị cắt */}
          <div className="relative z-0 min-h-0 flex-1">
            <div
              className="absolute top-0 bottom-0 overflow-hidden"
              style={{
                left: -48,
                width: 'calc(100% + 96px)',
              }}
            >
              <div
                ref={listScrollRef}
                className="h-full overflow-y-auto hide-scrollbar"
                style={{
                  paddingTop: 14,
                  paddingBottom: 28,
                  paddingLeft: 48,
                  paddingRight: 48,
                }}
              >
                <div className="space-y-3">
                  {videos.length === 0 ? (
                    <p className="font-body text-sm text-gray-500">
                      Chưa có video.
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
                          className="group mb-5 flex items-stretch overflow-hidden rounded-2xl border-2 border-white bg-white/10 transition-all hover:border-brand-home1 hover:shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)]"
                        >
                          {/* Thumbnail 16:9 tràn mép trái / trên / dưới */}
                          <span
                            className={cn(
                              'relative aspect-video h-[3.25rem] shrink-0 self-stretch overflow-hidden sm:h-[4.0rem]',
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
                                decoding="async"
                              />
                            ) : null}
                          </span>
                          <span className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-8 sm:py-3">
                            <span className="min-w-0 flex-1 font-body text-sm font-semibold leading-snug text-brand-home1 sm:text-[15px]">
                              {video.title}
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-2 font-body text-[10px] font-bold uppercase tracking-wide text-brand-textheader/40 sm:text-[11px]">
                              Xem ngay
                              <ArrowIcon
                                tone="textheader"
                                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                              />
                            </span>
                          </span>
                        </a>
                      )
                    })
                  )}
                </div>
              </div>

              <GridEdgeBlur edge="top" show={showTopFade} />
            </div>
          </div>

          <GridEdgeBlur edge="bottom" show={showBottomFade} flush />
        </div>
      </div>
    </div>
  )
}
