import { cn } from '@utils'
import { AwardCupCluster } from './AwardCupCluster'

const VARIANTS = {
  large: {
    block: 'flex flex-col',
    title: 'shrink-0 text-[70px]',
    titleLines: 'flex flex-col gap-2',
    years: 'relative z-10 shrink-0 text-lg',
    yearsGrid: 'grid grid-cols-2 gap-x-15 gap-y-8',
    yearsStack: 'flex flex-col gap-y-8',
    cup: 'relative z-0 shrink-0 self-end',
  },
  compact: {
    block: '',
    title: 'w-full text-[38px] leading-none lg:text-[42px]',
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
 * @property {string[]} years
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
          'relative flex h-full min-h-0 flex-col overflow-hidden',
          styles.block,
          className
        )}
      >
        <h3
          className={cn(
            'shrink-0 font-display font-bold italic text-brand-home1',
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
              'absolute bottom-0 left-0 z-10 w-fit font-body text-black pb-15 px-5',
              styles.years,
              yearsClassName
            )}
          >
            {years.map((year, index) => (
              <div key={`${year}-${index}`}>{year}</div>
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
    <div className={cn('h-full', styles.block, className)}>
      <h3
        className={cn(
          'font-display font-bold italic text-brand-home1',
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
        {years.map((year, index) => (
          <div key={`${year}-${index}`}>{year}</div>
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
