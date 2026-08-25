import { cn } from '@utils'
import { activityDetailPath, normalizeActivityDetail } from './activityData'
import playIcon from '@assets/images/subicon/iconWplay.png'
import infoIcon from '@assets/images/subicon/iconWarrow.png'

/**
 * @param {object} props
 * @param {string} [props.className]
 */

/**
 * @param {object} props
 * @param {string} props.subtitle
 */
function ActivitySubtitle({ subtitle }) {
  const sep = subtitle.indexOf(':')
  if (sep === -1) {
    return (
      <p className="font-body text-[10px] text-gray-500 sm:text-[3px]">
        {subtitle}
      </p>
    )
  }

  const label = subtitle.slice(0, sep + 1)
  const value = subtitle.slice(sep + 1).trim()

  return (
    <p className="font-body text-[10px] text-gray-500 sm:text-[11px]">
      <span className="text-[9px] italic sm:text-[11px]">{label}</span>
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
    <div
      className={cn(
        'group rounded-2xl transition-shadow duration-300',
        'hover:shadow-[0_12px_40px_rgba(90,59,196,0.4)]',
        className
      )}
    >
      <article
        className={cn(
          'relative flex overflow-hidden rounded-2xl border border-white bg-white/10 backdrop-blur-[3px] transition-[border-color,box-shadow] duration-300',
          'group-hover:border-brand-home1'
        )}
      >
        {/* 3 ngang : 2 dọc — tăng nhẹ chiều cao qua width */}
        <div className="relative aspect-[3/2] w-[8.5rem] shrink-0 overflow-hidden bg-[#cbb8e8] sm:w-40 lg:w-42">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:blur-[3px] group-hover:opacity-70"
            />
          ) : (
            <div className="h-full w-full bg-[#cbb8e8] transition duration-300 group-hover:blur-[3px] group-hover:opacity-70" />
          )}
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-2 px-3 py-3 transition duration-300 group-hover:blur-[3px] group-hover:opacity-40 sm:gap-0 sm:px-8 sm:py-3">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <span className="inline-flex rounded-full bg-brand-orange px-2.5 py-0.5 pt-1 font-body text-[10px] font-bold uppercase tracking-wide text-white sm:text-[9.5px]">
              {item.badge}
            </span>
            <span className="shrink-0 font-body text-[10px] text-gray-400">
              {item.year}
            </span>
          </div>
          <h3 className="font-body text-sm pt-3.5 pb-2 font-bold leading-snug text-brand-home1 sm:text-base">
            {item.title}
          </h3>
          <ActivitySubtitle subtitle={item.subtitle} />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 bg-white/75 opacity-0 backdrop-blur-[3px] transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 sm:gap-5">
          <a
            href={videoHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3 py-3 font-body text-[10px] font-bold uppercase tracking-wide text-white transition hover:brightness-105 sm:px-5 sm:text-xs"
          >
            Xem video
            <img src={playIcon} alt="play" className="h-3.5 w-3.5" />
          </a>
          <a
            href={detailHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-3 py-3 font-body text-[10px] font-bold uppercase tracking-wide text-white transition hover:brightness-105 sm:px-5 sm:text-xs"
          >
            Thông tin
            <img src={infoIcon} alt="info" className="h-3.5 w-3.5" />
          </a>
        </div>
      </article>
    </div>
  )
}
