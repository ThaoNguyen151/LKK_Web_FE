import iconP from '@assets/images/subicon/iconPsearch.png'
import iconW from '@assets/images/subicon/iconWsearch.png'
import { cn } from '@utils'
import { CloseIcon } from './CloseIcon'
import { IconImg } from './IconImg'
import { IconToolButton } from './IconToolButton'
import { ToneSwapIcon } from './ToneSwapIcon'

/**
 * @param {object} props
 * @param {'purple' | 'white'} [props.tone]
 * @param {boolean} [props.swapOnGroupHover]
 * @param {'white' | 'purple'} [props.hoverTo]
 * @param {string} [props.className]
 */
export function SearchIcon({
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
 * Nút tìm kiếm + thanh input (hover / focus).
 * - activities: tím → hover nền tím + trắng
 * - news: trắng → hover nền trắng + tím
 * @param {{
 *   variant?: 'activities' | 'news'
 *   value?: string
 *   onChange?: (value: string) => void
 *   placeholder?: string
 *   className?: string
 *   iconClassName?: string
 *   buttonClassName?: string
 * }} props
 */
export function SearchButton({
  variant = 'activities',
  value = '',
  onChange,
  placeholder = 'Tìm kiếm…',
  className,
  iconClassName,
  buttonClassName,
}) {
  const hasValue = Boolean(value)

  return (
    <div className={cn('group/search relative', className)}>
      <IconToolButton
        purpleSrc={iconP}
        whiteSrc={iconW}
        variant={variant}
        aria-label="Tìm kiếm"
        className={buttonClassName}
        iconClassName={iconClassName}
      />

      <div className="invisible absolute right-0 top-full z-30 mt-1 min-w-[14rem] translate-y-1 opacity-0 transition-all duration-200 group-hover/search:visible group-hover/search:translate-y-0 group-hover/search:opacity-100 group-focus-within/search:visible group-focus-within/search:translate-y-0 group-focus-within/search:opacity-100 sm:min-w-[16rem]">
        <div
          className={cn(
            'flex items-center overflow-hidden rounded-full border bg-white shadow-[0_12px_35px_rgba(90,59,196,0.18)]',
            variant === 'news' ? 'border-white/40' : 'border-brand-home1/25'
          )}
        >
          <IconImg src={iconP} className="ml-4 h-3.5 w-3.5 shrink-0" />
          <input
            type="search"
            value={value}
            onChange={event => onChange?.(event.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent px-3 py-2.5 font-body text-sm text-brand-home1 caret-black outline-none placeholder:text-gray-400 [caret-shape:3px] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />
          {hasValue ? (
            <button
              type="button"
              aria-label="Xóa nội dung"
              onClick={() => onChange?.('')}
              className="mr-4 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-70"
            >
              <CloseIcon tone="purple" className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
