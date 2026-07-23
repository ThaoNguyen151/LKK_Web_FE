import { cn } from '@utils'
import { YEARS, awardYearPath } from './awardsData'

/**
 * @param {object} props
 * @param {string} props.activeYear
 * @param {string} [props.className]
 * @param {'vertical' | 'horizontal'} [props.orientation]
 */
export function AwardYearSidebar({
  activeYear,
  className,
  orientation = 'vertical',
}) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <nav
      aria-label="Năm giải thưởng"
      className={cn(
        isHorizontal
          ? 'flex gap-2 overflow-x-auto pb-1'
          : 'flex min-h-0 flex-col justify-center gap-2',
        className
      )}
    >
      {YEARS.map(year => {
        const isActive = year === activeYear

        return (
          <a
            key={year}
            href={`#${awardYearPath(year)}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5 text-center font-body text-sm font-semibold tracking-wide transition-colors',
              isActive
                ? 'border-2 border-white bg-white/45 text-brand-home1 shadow-sm backdrop-blur-md'
                : 'border-2 border-transparent text-gray-500 hover:bg-white/50 hover:text-brand-home1'
            )}
          >
            {year}
          </a>
        )
      })}
    </nav>
  )
}
