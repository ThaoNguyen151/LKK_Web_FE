import { cn } from '@utils'
import { AwardCupCluster } from './AwardCupCluster'
import { AwardYearButton } from './AwardYearButton'

/**
 * @param {(string | { label: string, href?: string })[]} years
 */
function normalizeAwardYears(years) {
  return years.map(year => (typeof year === 'string' ? { label: year } : year))
}

const TITLE_WEIGHT = 'font-display-medium font-display italic text-brand-home1'

const VARIANTS = {
  large: {
    block: 'flex flex-col',
    title: 'shrink-0 text-[70px] pb-10',
    titleLines: 'flex flex-col gap-2',
    years: 'relative z-10 shrink-0 text-lg',
    yearsGrid: 'grid grid-cols-2 gap-x-5 gap-y-3 pb-10',
    yearsStack: 'flex flex-col gap-y-3',
    cup: 'relative z-0 shrink-0 self-end pb-6',
  },
  compact: {
    block: '',
    title: 'w-full text-[42px] leading-none',
    titleLines: 'flex flex-col gap-2',
    years: 'text-base',
    yearsGrid: '',
    stage: 'relative min-h-0 flex-1 w-full',
    cup: 'absolute bottom-0 right-0 z-0 max-h-[80%] max-w-[50%]',
  },
}

/**
 * @typedef {object} AwardBlockProps
 * @property {import('react').ReactNode | string[]} title
 * @property {(string | import('./AwardYearButton').AwardYear)[]} years
 * @property {1 | 2} [yearColumns]
 * @property {string} count
 * @property {string} cupSrc
 * @property {string} cupAlt
 * @property {'large' | 'compact'} [variant]
 * @property {string} [className]
 * @property {string} [titleClassName]
 * @property {string} [yearsClassName]
 * @property {string} [cupClassName]
 * @property {string} [cupClusterClassName]
 * @property {string} [contentClassName]
 * @property {string} [countClassName]
 */

/**
 * Gom tên giải, năm, số lượng và cup thành một cụm.
 * @param {AwardBlockProps} props
 */
export function AwardBlock({
  title,
  years,
  yearColumns = 1,
  count,
  cupSrc,
  cupAlt,
  variant = 'large',
  className,
  titleClassName,
  yearsClassName,
  cupClassName,
  cupClusterClassName,
  contentClassName,
  countClassName,
}) {
  const styles = VARIANTS[variant]
  const yearItems = normalizeAwardYears(years)
  const titleContent = Array.isArray(title)
    ? title.map((line, index) => (
        <span key={`${line}-${index}`} className="block leading-none">
          {line}
        </span>
      ))
    : title

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden',
          styles.block,
          className
        )}
      >
        <h3
          className={cn(
            'shrink-0',
            TITLE_WEIGHT,
            Array.isArray(title) && styles.titleLines,
            styles.title,
            titleClassName
          )}
        >
          {titleContent}
        </h3>

        <div className={cn(styles.stage, contentClassName)}>
          <div
            className={cn(
              'absolute bottom-0 left-0 z-10 w-fit font-body text-black pb-15 px-0',
              styles.years,
              yearsClassName
            )}
          >
            {yearItems.map((year, index) => (
              <AwardYearButton
                key={`${year.label}-${index}`}
                label={year.label}
                href={year.href}
              />
            ))}
          </div>

          <AwardCupCluster
            count={count}
            cupSrc={cupSrc}
            cupAlt={cupAlt}
            size="compact"
            className={cn(styles.cup, cupClusterClassName)}
            cupClassName={cupClassName}
            countClassName={countClassName}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('h-full min-w-0 w-full', styles.block, className)}>
      <h3
        className={cn(
          TITLE_WEIGHT,
          Array.isArray(title) && styles.titleLines,
          styles.title,
          titleClassName
        )}
      >
        {titleContent}
      </h3>

      <div
        className={cn(
          'w-fit font-body text-black',
          yearColumns === 2 ? styles.yearsGrid : styles.yearsStack,
          styles.years,
          yearsClassName
        )}
      >
        {yearItems.map((year, index) => (
          <AwardYearButton
            key={`${year.label}-${index}`}
            label={year.label}
            href={year.href}
          />
        ))}
      </div>

      <AwardCupCluster
        count={count}
        cupSrc={cupSrc}
        cupAlt={cupAlt}
        size="large"
        className={cn(styles.cup, cupClusterClassName)}
        cupClassName={cupClassName}
        countClassName={countClassName}
      />
    </div>
  )
}
