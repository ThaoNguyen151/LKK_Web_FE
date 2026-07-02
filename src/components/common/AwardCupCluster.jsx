import { cn } from '@utils'

const SIZES = {
  large: {
    wrap: 'gap-4',
    count: 'translate-y-3 text-8xl lg:text-9xl',
    cup: 'h-40 w-auto lg:h-52',
  },
  compact: {
    wrap: 'gap-0',
    count: '-mr-2 translate-y-[-8%] translate-x-[-110%] text-7xl lg:text-8xl',
    cup: 'h-32 w-auto max-h-full translate-y-[-12%] lg:h-36',
  },
}

/**
 * @param {object} props
 * @param {string} props.count
 * @param {string} props.cupSrc
 * @param {string} props.cupAlt
 * @param {'large' | 'compact'} [props.size]
 * @param {string} [props.className]
 * @param {string} [props.cupClassName]
 * @param {string} [props.countClassName]
 */
export function AwardCupCluster({
  count,
  cupSrc,
  cupAlt,
  size = 'large',
  className,
  cupClassName,
  countClassName,
}) {
  const styles = SIZES[size]

  return (
    <div
      className={cn(
        'inline-flex items-end justify-end',
        styles.wrap,
        className
      )}
    >
      <span
        className={cn(
          'font-display z-0 leading-none text-brand-cup',
          styles.count,
          countClassName
        )}
        aria-hidden
      >
        {count}
      </span>
      <img
        src={cupSrc}
        alt={cupAlt}
        className={cn(
          'relative z-10 shrink-0 object-contain',
          styles.cup,
          cupClassName
        )}
      />
    </div>
  )
}
