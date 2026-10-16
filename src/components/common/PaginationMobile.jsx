import { useMemo } from 'react'
import { cn } from '@utils'

const ITEM_GLOW =
  'shadow-[0_0_10px_4px_rgba(90,59,196,0.12),0_8px_28px_rgba(90,59,196,0.28)]'

/** Số trang + mũi tên — giống web, không hover / không focus ring tím (mobile). */
const PAGE_ITEM_CLASS = cn(
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-transparent font-body text-sm transition-colors duration-150',
  'text-[#5c5c66] outline-none ring-0 [-webkit-tap-highlight-color:transparent]',
  'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
  'active:bg-white/40'
)

const PAGE_ITEM_ACTIVE_CLASS = cn(
  'bg-transparent border-white font-semibold text-brand-home1',
  ITEM_GLOW
)

/**
 * @param {object} props
 * @param {'prev' | 'next'} props.direction
 * @param {boolean} props.disabled
 * @param {() => void} props.onClick
 * @param {string} props.label
 */
function PaginationArrowMobile({ direction, disabled, onClick, label }) {
  const isPrev = direction === 'prev'

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={e => {
        onClick()
        e.currentTarget.blur()
      }}
      className={cn(
        PAGE_ITEM_CLASS,
        disabled
          ? 'cursor-default text-[#c5c5ce] active:bg-transparent active:text-[#c5c5ce]'
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
 * Phân trang tin tức mobile — layout giống web, tắt hover.
 * @param {object} props
 * @param {number} props.page
 * @param {number} props.totalPages
 * @param {(page: number) => void} props.onChange
 * @param {string} [props.className]
 * @param {string} [props.label]
 */
export function PaginationMobile({
  page,
  totalPages,
  onChange,
  className,
  label = 'Phân trang',
}) {
  const pages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    /** @type {Set<number>} */
    const set = new Set()

    if (page <= 3) {
      for (let i = 1; i <= 5; i++) set.add(i)
      set.add(totalPages)
    } else if (page >= totalPages - 2) {
      set.add(1)
      for (let i = totalPages - 4; i <= totalPages; i++) set.add(i)
    } else {
      set.add(1)
      set.add(page - 1)
      set.add(page)
      set.add(page + 1)
      set.add(totalPages)
    }

    return [...set].filter(n => n >= 1 && n <= totalPages).sort((a, b) => a - b)
  }, [page, totalPages])

  return (
    <nav
      aria-label={label}
      className={cn(
        'mt-10 flex items-center justify-center gap-1 rounded-full bg-transparent px-2 py-1.5',
        className
      )}
    >
      <PaginationArrowMobile
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
          <span key={n} className="relative contents">
            {showEllipsis ? (
              <span className="items-center justify-center px-1.5 pb-2 font-body text-sm text-[#5c5c66]">
                ...
              </span>
            ) : null}
            <button
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={e => {
                onChange(n)
                e.currentTarget.blur()
              }}
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

      <PaginationArrowMobile
        direction="next"
        label="Trang sau"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      />
    </nav>
  )
}
