import { cn } from '@utils'
import {
  AWARD_YEAR_CLICK_SHADOW,
  AWARD_YEAR_TEXT_CLASS,
} from '@components/common'
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
              'shrink-0 rounded-full border-2 px-4 py-1.5 text-center transition-all duration-200',
              AWARD_YEAR_TEXT_CLASS,
              isActive
                ? cn(
                    'border-white bg-white/45 text-brand-home1 backdrop-blur-md',
                    AWARD_YEAR_CLICK_SHADOW
                  )
                : 'border-transparent shadow-none hover:bg-white/50 hover:text-brand-home1'
            )}
          >
            {year}
          </a>
        )
      })}
    </nav>
  )
}
