import { cn } from '@utils'

/**
 * @typedef {object} AwardYear
 * @property {string} label
 * @property {string} [href]
 */

/** Shadow giống glow card trang Tin tức */
export const AWARD_YEAR_CLICK_SHADOW =
  'shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)]'

const YEAR_BUTTON_CLASS =
  'shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-transparent px-4 py-1.5 text-center font-body text-sm font-semibold tracking-wide text-inherit transition-all duration-200 hover:bg-white/50 hover:text-brand-home1 active:border-white active:bg-white/45 active:text-brand-home1 active:shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)] active:backdrop-blur-md focus-visible:border-white focus-visible:bg-white/45 focus-visible:text-brand-home1 focus-visible:shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)] focus-visible:backdrop-blur-md focus-visible:outline-none'

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
