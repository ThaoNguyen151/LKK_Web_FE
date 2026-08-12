import { useMemo } from 'react'
import { cn } from '@utils'

const ITEM_GLOW =
  'shadow-[0_0_10px_4px_rgba(90,59,196,0.12),0_8px_28px_rgba(90,59,196,0.28)]'

/** Style chung cho số trang + mũi tên */
const PAGE_ITEM_CLASS = cn(
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-body text-sm transition-all duration-200',
  'text-[#5c5c66] hover:bg-white hover:text-brand-home1',
  'hover:shadow-[0_0_10px_4px_rgba(90,59,196,0.12),0_8px_28px_rgba(90,59,196,0.28)]'
)

const PAGE_ITEM_ACTIVE_CLASS = cn(
  'bg-transparent border border-white font-semibold text-brand-home1',
  ITEM_GLOW
)

/**
 * Mũi tên phân trang (riêng cho Pagination, không dùng NavChevronButton).
 * @param {object} props
 * @param {'prev' | 'next'} props.direction
 * @param {boolean} props.disabled
 * @param {() => void} props.onClick
 * @param {string} props.label
 */
function PaginationArrow({ direction, disabled, onClick, label }) {
  const isPrev = direction === 'prev'

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        PAGE_ITEM_CLASS,
        disabled
          ? 'cursor-default text-[#c5c5ce] hover:bg-transparent hover:text-[#c5c5ce] hover:shadow-none'
          : 'text-brand-home1'
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5">
        <path
          d={isPrev ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

/**
 * Thanh chuyển trang dùng chung.
 * @param {object} props
 * @param {number} props.page
 * @param {number} props.totalPages
 * @param {(page: number) => void} props.onChange
 * @param {string} [props.className]
 * @param {string} [props.label]
 */
export function Pagination({
  page,
  totalPages,
  onChange,
  className,
  label = 'Phân trang',
}) {
  const pages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const set = new Set([1, 2, 3, 4, 5, totalPages, page - 1, page, page + 1])
    return [...set].filter(n => n >= 1 && n <= totalPages).sort((a, b) => a - b)
  }, [page, totalPages])

  return (
    <nav
      aria-label={label}
      className={cn(
        'mt-10 flex items-center justify-center gap-1 rounded-full bg-transparent px-2 py-1.5 sm:gap-1.5',
        className
      )}
    >
      <PaginationArrow
        direction="prev"
        label="Trang trước"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      />

      {pages.map((n, index) => {
        const prev = pages[index - 1]
        const showEllipsis = prev != null && n - prev > 1
        const isActive = n === page

        return (
          <span key={n} className="contents">
            {showEllipsis ? (
              <span className="px-1.5 font-body text-sm text-[#5c5c66]">…</span>
            ) : null}
            <button
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onChange(n)}
              className={cn(
                PAGE_ITEM_CLASS,
                isActive && PAGE_ITEM_ACTIVE_CLASS
              )}
            >
              {n}
            </button>
          </span>
        )
      })}

      <PaginationArrow
        direction="next"
        label="Trang sau"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      />
    </nav>
  )
}
