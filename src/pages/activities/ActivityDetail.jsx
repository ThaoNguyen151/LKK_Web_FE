import { useEffect, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'
import {
  activityCategoryPath,
  getActivityById,
  getCategoryById,
  getInfoFieldsForCategory,
} from './activityData'

const DETAIL_TAB_LABELS = {
  info: 'Thông tin',
  images: 'Hình ảnh',
  video: 'Video',
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
 * @param {import('./activityData').ActivityItem} props.item
 * @param {import('./activityData').ActivityCategory} props.category
 * @param {'info'|'images'|'video'} props.activeTab
 * @param {(tab: 'info'|'images'|'video') => void} props.onTabChange
 */
function DetailHeader({ item, category, activeTab, onTabChange }) {
  const tabs = item.detailTabs ?? ['info', 'images']

  return (
    <div className="mb-6 shrink-0">
      <p className="mb-3 mt-5 font-body text-[10px] leading-tight text-brand-home1/70 sm:text-[11px]">
        <a
          href={`#${ROUTES.HOME}`}
          className="font-semibold text-brand-home1 hover:underline"
        >
          Home
        </a>
        <span className="mx-1.5 text-brand-textheader/50">/</span>
        <a
          href={`#${activityCategoryPath(category.id)}`}
          className="text-brand-textheader/50 hover:text-brand-home1 hover:underline"
        >
          {category.breadcrumb}
        </a>
        <span className="mx-1.5 text-brand-textheader/50">/</span>
        <span className="text-brand-textheader/50">{item.title}</span>
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <h1
          className="shrink-0 font-display text-3xl italic tracking-wide text-brand-home1 sm:text-4xl lg:text-5xl"
          style={{ WebkitTextStroke: '0.2px #5a3bc4' }}
        >
          {item.title.toUpperCase()}
        </h1>

        <div className="hidden h-8 w-px shrink-0 bg-brand-home1/25 sm:block" />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {tabs.map((tab, index) => {
            const active = tab === activeTab
            return (
              <div key={tab} className="flex items-center gap-5">
                {index > 0 ? (
                  <span className="h-4 w-px bg-brand-home1/20" aria-hidden />
                ) : null}
                <button
                  type="button"
                  onClick={() => onTabChange(tab)}
                  className={cn(
                    'relative font-body text-sm font-semibold tracking-wide transition-colors',
                    active
                      ? "text-brand-home1 after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-2/3 after:-translate-x-1/2 after:bg-brand-home1 after:content-['']"
                      : 'text-gray-400 hover:text-brand-home1'
                  )}
                >
                  {DETAIL_TAB_LABELS[tab]}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 */
function InfoPanel({ item }) {
  const fields = getInfoFieldsForCategory(item.categoryId)
  const info = item.info ?? {}

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
      <div className="min-h-[280px] overflow-hidden rounded-2xl bg-[#cbb8e8] sm:min-h-[360px] lg:min-h-[420px]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col">
        <span className="mb-5 inline-flex w-fit rounded-full bg-brand-orange px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]">
          {item.badge}
        </span>

        <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {fields.map(field => (
            <div key={field.key} className="min-w-0">
              <p className="font-body text-[10px] font-semibold uppercase tracking-wide text-brand-home1/70 sm:text-[11px]">
                {field.label}
              </p>
              <p className="mt-1 font-body text-base font-bold text-brand-home1 sm:text-lg">
                {info[field.key] || '—'}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-wide text-brand-home1/70 sm:text-[11px]">
            Mô tả
          </p>
          <p className="font-body text-sm leading-relaxed text-gray-600 sm:text-[15px]">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 */
function ImagesPanel({ item }) {
  const images = item.images?.length ? item.images : ['', '', '', '']

  return (
    <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 md:columns-3">
      {images.map((src, index) => (
        <div
          key={`${item.id}-img-${index}`}
          className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-[#cbb8e8] sm:mb-5"
          style={{ height: `${180 + ((index * 37) % 120)}px` }}
        >
          {src ? (
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 */
function VideoPanel({ item }) {
  const parts = item.videoParts ?? []
  const [partId, setPartId] = useState(parts[0]?.id ?? '')
  const [query, setQuery] = useState('')
  const [sortAsc, setSortAsc] = useState(false)

  const activePartId =
    partId && parts.some(part => part.id === partId)
      ? partId
      : (parts[0]?.id ?? '')

  let videos = [...(item.videos ?? [])]
  if (activePartId) {
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
    return sortAsc ? ea - eb : eb - ea
  })

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
      <div className="min-h-[260px] overflow-hidden rounded-2xl bg-[#cbb8e8] sm:min-h-[340px]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="flex min-h-0 flex-col">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {parts.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {parts.map(part => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setPartId(part.id)}
                  className={cn(
                    'rounded-full px-3 py-1.5 font-body text-xs font-semibold transition-colors',
                    activePartId === part.id
                      ? 'bg-brand-home1 text-white'
                      : 'bg-brand-home1/10 text-brand-home1 hover:bg-brand-home1/20'
                  )}
                >
                  {part.label}
                </button>
              ))}
            </div>
          ) : (
            <span className="font-body text-xs text-gray-400">
              Danh sách video
            </span>
          )}

          <div className="flex items-center gap-2">
            <div className="flex items-center overflow-hidden rounded-full border border-brand-home1/20 bg-white">
              <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Tìm…"
                className="w-28 bg-transparent px-3 py-1.5 font-body text-sm text-brand-home1 outline-none placeholder:text-gray-400 sm:w-36"
              />
              <span className="flex h-8 w-8 items-center justify-center text-brand-home1">
                <SearchIcon className="h-4 w-4" />
              </span>
            </div>
            <button
              type="button"
              aria-label="Sắp xếp tập"
              onClick={() => setSortAsc(value => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-brand-home1 hover:bg-brand-home1/10"
            >
              <SortIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-gray-100 bg-white/40 p-3 hide-scrollbar sm:p-4">
          {videos.length === 0 ? (
            <p className="font-body text-sm text-gray-500">Chưa có video.</p>
          ) : (
            videos.map((video, index) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-transparent bg-white/70 px-3 py-3 transition-all hover:border-brand-home1/20 hover:shadow-[0_8px_24px_rgba(90,59,196,0.12)] sm:gap-4 sm:px-4"
              >
                <span
                  className={cn(
                    'flex h-10 w-12 shrink-0 items-center justify-center rounded-lg font-body text-xs font-bold text-white sm:h-11 sm:w-14',
                    index % 2 === 0 ? 'bg-brand-orange' : 'bg-brand-home1'
                  )}
                >
                  {video.episode != null ? `T${video.episode}` : '▶'}
                </span>
                <span className="min-w-0 flex-1 font-body text-sm font-semibold text-brand-home1 sm:text-base">
                  {video.title}
                </span>
                <span className="shrink-0 font-body text-[10px] font-bold uppercase tracking-wide text-brand-home1 sm:text-xs">
                  Xem ngay →
                </span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * @param {object} props
 * @param {string} props.itemId
 * @param {string} props.categoryId
 * @param {import('react').ReactNode} [props.sidebar]
 */
export function ActivityDetail({ itemId, categoryId, sidebar }) {
  const item = getActivityById(itemId)
  const category = getCategoryById(categoryId)
  const [tabByItem, setTabByItem] = useState(
    /** @type {Record<string, 'info'|'images'|'video'>} */ ({})
  )

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

  const tabs = item?.detailTabs ?? ['info', 'images']
  const requestedTab = tabByItem[itemId] ?? 'info'
  const activeTab = tabs.includes(requestedTab)
    ? requestedTab
    : (tabs[0] ?? 'info')

  const onTabChange = /** @param {'info'|'images'|'video'} tab */ tab => {
    setTabByItem(prev => ({ ...prev, [itemId]: tab }))
  }
  if (!item) {
    return (
      <PageShell className="relative flex h-dvh flex-col overflow-hidden">
        <Header variant="fixed" />
        <main className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center pt-16 lg:pt-20">
          <p className="font-body text-sm text-gray-500">
            Không tìm thấy nội dung.
          </p>
          <a
            href={`#${activityCategoryPath(categoryId)}`}
            className="mt-4 font-body text-sm font-semibold text-brand-home1 hover:underline"
          >
            Quay lại danh sách
          </a>
        </main>
      </PageShell>
    )
  }

  return (
    <PageShell className="relative flex h-dvh flex-col overflow-hidden">
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

      <main className="relative z-10 flex min-h-0 flex-1 flex-col pt-16 lg:pt-20">
        <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 items-stretch px-4 py-6 sm:px-6 lg:px-10">
          {sidebar ? (
            <div className="hidden min-h-0 shrink-0 self-stretch md:block">
              {sidebar}
            </div>
          ) : null}

          <div className="flex min-h-0 min-w-0 flex-1 flex-col pl-4 sm:pl-6 lg:pl-8">
            <DetailHeader
              item={item}
              category={category}
              activeTab={activeTab}
              onTabChange={onTabChange}
            />

            <div className="min-h-0 flex-1 overflow-y-auto hide-scrollbar pb-6">
              {activeTab === 'info' ? <InfoPanel item={item} /> : null}
              {activeTab === 'images' ? <ImagesPanel item={item} /> : null}
              {activeTab === 'video' ? (
                <VideoPanel key={item.id} item={item} />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
