import { cn } from '@utils'
import { activityDetailPath, normalizeActivityDetail } from './activityData'

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
    <p className="font-body text-[11px] text-gray-500 sm:text-xs">
      <span className="text-[9px] italic sm:text-[10px]">{label}</span>
      {value ? <> {value}</> : null}
    </p>
  )
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 * @param {string} [props.className]
 */
export function ActivityCard({ item, className }) {
  const detail = normalizeActivityDetail(item)
  const detailHref = `#${activityDetailPath(item.categoryId, item.id)}`
  const hasVideoTab = (detail.detailTabs ?? ['info', 'images']).includes(
    'video'
  )
  const videoHref = hasVideoTab ? detailHref : item.videoUrl || detailHref

  return (
    <article
      className={cn(
        'group relative flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(90,59,196,0.18)]',
        className
      )}
    >
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
          <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  )
}
