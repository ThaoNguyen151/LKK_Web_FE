import { cn } from '@utils'

const SECTION_LABELS = [
  'Giới thiệu',
  'Kho tàng nghệ thuật',
  'Giải thưởng',
  'Mạng xã hội',
]

/**
 * @param {object} props
 * @param {number} props.activeIndex
 * @param {(index: number) => void} props.onSelect
 * @param {string} [props.className]
 */
export function HomeSectionDots({ activeIndex, onSelect, className }) {
  return (
    <nav
      aria-label="Chuyển section trang chủ"
      className={cn(
        'pointer-events-auto absolute right-5 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3 lg:right-7',
        className
      )}
    >
      {SECTION_LABELS.map((label, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={label}
            type="button"
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => onSelect(index)}
            className={cn(
              'origin-center',
              isActive
                ? 'w-[2px] h-[50px] bg-brand-home1 scale-y-100'
                : 'w-[2px] h-[50px] bg-brand-home1/30 hover:bg-brand-home1/60 scale-y-100'
            )}
          />
        )
      })}
    </nav>
  )
}
