import { cn } from '@utils'
import { ChevronLeftIcon } from './ChevronLeftIcon'
import { ChevronRightIcon } from './ChevronRightIcon'

/**
 * Nút điều hướng trái/phải — icon trắng cố định, hover có nền tròn trắng.
 * @param {object} props
 * @param {'prev' | 'next'} props.direction
 * @param {(event: import('react').MouseEvent<HTMLButtonElement>) => void} props.onClick
 * @param {string} [props.label]
 * @param {boolean} [props.disabled]
 * @param {string} [props.className]
 */
export function NavChevronButton({
  direction,
  onClick,
  label,
  disabled = false,
  className,
}) {
  const isPrev = direction === 'prev'
  const Icon = isPrev ? ChevronLeftIcon : ChevronRightIcon

  return (
    <button
      type="button"
      aria-label={label ?? (isPrev ? 'Trước' : 'Sau')}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-full bg-transparent transition-[background-color,transform] duration-300 hover:bg-white/25 disabled:opacity-30 sm:h-13 sm:w-13',
        isPrev ? 'hover:-translate-x-1' : 'hover:translate-x-1',
        className
      )}
    >
      <Icon />
    </button>
  )
}
