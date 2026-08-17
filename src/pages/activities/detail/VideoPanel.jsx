import { useState } from 'react'
import { SearchIcon, SortButton } from '@components/icon'
import { cn } from '@utils'

/**
 * Panel Video — chỉ mount khi tab active; poster lazy-load.
 * @param {object} props
 * @param {import('../activityData').ActivityItem} props.item
 */
export function VideoPanel({ item }) {
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
            loading="lazy"
            decoding="async"
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
            <div className="flex items-center overflow-hidden rounded-full border border-brand-home1/20 bg-white pl-1">
              <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Tìm…"
                className="w-28 bg-transparent px-3 py-1.5 font-body text-sm text-brand-home1 outline-none placeholder:text-gray-400 sm:w-36"
              />
              <span className="flex h-8 w-8 items-center justify-center">
                <SearchIcon tone="purple" className="h-4 w-4" />
              </span>
            </div>
            <SortButton
              variant="activities"
              value={sortAsc ? 'asc' : 'desc'}
              onChange={next => setSortAsc(next === 'asc')}
              options={[
                { value: 'desc', label: 'Mới nhất' },
                { value: 'asc', label: 'Cũ nhất' },
              ]}
              buttonClassName="h-9 w-9"
              iconClassName="h-5 w-5"
            />
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
