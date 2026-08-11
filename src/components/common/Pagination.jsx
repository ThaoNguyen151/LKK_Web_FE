import { useMemo } from 'react'
import { NavChevronButton } from '@components/icon'
import { cn } from '@utils'

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
        'mt-10 flex items-center justify-center gap-1 sm:gap-2',
        className
      )}
    >
      <NavChevronButton
        direction="prev"
        label="Trang trước"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      />
      {pages.map((n, index) => {
        const prev = pages[index - 1]
        const showEllipsis = prev != null && n - prev > 1
        return (
          <span key={n} className="contents">
            {showEllipsis ? (
              <span className="px-1 font-body text-sm text-gray-400">…</span>
            ) : null}
            <button
              type="button"
              aria-current={n === page ? 'page' : undefined}
              onClick={() => onChange(n)}
              className={cn(
                'flex h-9 min-w-9 items-center justify-center rounded-full px-2 font-body text-sm transition-colors',
                n === page
                  ? 'border-2 border-white bg-white/10 font-semibold backdrop-blur-sm shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)] transition-all duration-200 hover:border hover:border-brand-home1'
                  : 'text-gray-500 hover:bg-white/70 hover:text-brand-home1'
              )}
            >
              {n}
            </button>
          </span>
        )
      })}
      <NavChevronButton
        direction="next"
        label="Trang sau"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      />
    </nav>
  )
}
