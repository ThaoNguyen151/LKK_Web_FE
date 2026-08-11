import iconP from '@assets/images/subicon/iconPsort.png'
import iconW from '@assets/images/subicon/iconWsort.png'
import iconTick from '@assets/images/subicon/iconPtick.png'
import { cn } from '@utils'
import { IconImg } from './IconImg'
import { IconToolButton } from './IconToolButton'
import { ToneSwapIcon } from './ToneSwapIcon'

/** @typedef {'desc' | 'asc' | 'az' | 'za'} SortValue */

/** @type {{ value: SortValue, label: string }[]} */
const DEFAULT_SORT_OPTIONS = [
  { value: 'desc', label: 'Mới nhất' },
  { value: 'asc', label: 'Cũ nhất' },
  { value: 'az', label: 'A - Z' },
  { value: 'za', label: 'Z - A' },
]

/**
 * @param {object} props
 * @param {'purple' | 'white'} [props.tone]
 * @param {boolean} [props.swapOnGroupHover]
 * @param {'white' | 'purple'} [props.hoverTo]
 * @param {string} [props.className]
 */
export function SortIcon({
  tone = 'purple',
  swapOnGroupHover = false,
  hoverTo = 'white',
  className,
}) {
  if (swapOnGroupHover) {
    return (
      <ToneSwapIcon
        purpleSrc={iconP}
        whiteSrc={iconW}
        hoverTo={hoverTo}
        className={className}
      />
    )
  }

  return (
    <IconImg
      src={tone === 'white' ? iconW : iconP}
      className={cn('h-3.5 w-3.5 -translate-y-px', className)}
    />
  )
}

/**
 * - activities: tím → hover nền tím + trắng
 * - news: trắng → hover nền trắng + tím
 * @param {{
 *   variant?: 'activities' | 'news'
 *   value?: SortValue
 *   onChange?: (value: SortValue) => void
 *   options?: { value: SortValue, label: string }[]
 *   className?: string
 *   iconClassName?: string
 *   buttonClassName?: string
 * }} props
 */
export function SortButton({
  variant = 'activities',
  value = 'desc',
  onChange,
  options = DEFAULT_SORT_OPTIONS,
  className,
  iconClassName,
  buttonClassName,
}) {
  return (
    <div className={cn('group/sort relative', className)}>
      <IconToolButton
        purpleSrc={iconP}
        whiteSrc={iconW}
        variant={variant}
        aria-label="Lọc / sắp xếp"
        aria-haspopup="listbox"
        className={buttonClassName}
        iconClassName={iconClassName}
      />

      <div className="invisible absolute right-0 top-full z-30 mt-1 min-w-[9.5rem] translate-y-1 opacity-0 transition-all duration-200 group-hover/sort:visible group-hover/sort:translate-y-0 group-hover/sort:opacity-100 group-focus-within/sort:visible group-focus-within/sort:translate-y-0 group-focus-within/sort:opacity-100">
        <ul
          role="listbox"
          aria-label="Tùy chọn sắp xếp"
          className="rounded-2xl bg-white px-4 py-3 shadow-[0_12px_35px_rgba(90,59,196,0.16)]"
        >
          {options.map(option => {
            const selected = option.value === value
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => onChange?.(option.value)}
                  className="flex w-full items-center justify-between gap-4 py-1.5 text-left font-body text-sm text-gray-700 transition-colors hover:text-brand-home1"
                >
                  <span>{option.label}</span>
                  {selected ? (
                    <IconImg src={iconTick} className="h-5 w-5 shrink-0" />
                  ) : (
                    <span className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
