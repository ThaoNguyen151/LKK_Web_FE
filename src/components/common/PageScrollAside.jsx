import { BackToTopButton } from '@components/icon'
import { cn } from '@utils'

/**
 * Tâm lề phải = giữa cạnh phải nội dung (max-w-[1440px] − padding trang) và mép màn.
 * (100vw − min(100vw,1440px))/4 + nửa padding (px-4 / sm:px-6 / lg:px-10)
 */
export const PAGE_SCROLL_GUTTER_RIGHT = cn(
  'right-[max(0.5rem,calc((100vw-min(100vw,1440px))/4+0.5rem))]',
  'sm:right-[max(0.5rem,calc((100vw-min(100vw,1440px))/4+0.75rem))]',
  'lg:right-[max(0.5rem,calc((100vw-min(100vw,1440px))/4+1.25rem))]'
)

/**
 * @param {object} props
 * @param {boolean} props.showHint
 * @param {boolean} props.showBackTop
 * @param {() => void} props.onBackTop
 * @param {string} [props.backTopLabel]
 */
export function PageScrollAside({
  showHint,
  showBackTop,
  onBackTop,
  backTopLabel = 'Về đầu trang',
}) {
  return (
    <>
      {/* w-0 + items-center: tâm chữ/line trùng điểm gutter (tránh lệch do rotate-90) */}
      <div
        className={cn(
          'pointer-events-none fixed top-1/2 z-30 hidden w-0 -translate-y-1/2 flex-col items-center transition-opacity duration-300 sm:flex',
          PAGE_SCROLL_GUTTER_RIGHT,
          showHint ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden={!showHint}
      >
        <p className="mb-3 rotate-90 whitespace-nowrap font-body text-[11px] tracking-wide text-brand-home1/50 lg:text-xs">
          Cuộn để xem
        </p>
        <span className="mt-12 h-20 w-px shrink-0 bg-brand-home1/35 lg:mt-14 lg:h-24" />
      </div>

      <BackToTopButton
        show={showBackTop}
        onClick={onBackTop}
        label={backTopLabel}
        className={cn(
          '!right-[max(0.5rem,calc((100vw-min(100vw,1440px))/4+0.5rem))]',
          'sm:!right-[max(0.5rem,calc((100vw-min(100vw,1440px))/4+0.75rem))]',
          'lg:!right-[max(0.5rem,calc((100vw-min(100vw,1440px))/4+1.25rem))]',
          'translate-x-1/2'
        )}
      />
    </>
  )
}
