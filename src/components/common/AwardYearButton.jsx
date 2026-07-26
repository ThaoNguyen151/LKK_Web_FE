import { cn } from '@utils'

/**
 * @typedef {object} AwardYear
 * @property {string} label
 * @property {string} [href]
 */

const YEAR_BUTTON_CLASS =
  'cursor-pointer bg-transparent p-0 font-inherit text-inherit text-left transition-colors shrink-0 rounded-full px-4 py-1.5 text-center hover:text-brand-home1 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-home1 hover:bg-white/50 hover:text-brand-home1'

/**
 * Nút năm giải thưởng — gắn href sau khi có trang chi tiết.
 * @param {AwardYear & { className?: string }} props
 */
export function AwardYearButton({ label, href, className }) {
  if (href) {
    return (
      <a href={href} className={cn(YEAR_BUTTON_CLASS, className)}>
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={cn(YEAR_BUTTON_CLASS, className)}
      aria-label={`Xem giải năm ${label}`}
    >
      {label}
    </button>
  )
}
