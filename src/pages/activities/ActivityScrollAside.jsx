import { BackToTopButton } from '@components/icon'
import { cn } from '@utils'

/**
 * @param {object} props
 * @param {boolean} props.showHint
 * @param {boolean} props.showBackTop
 * @param {() => void} props.onBackTop
 * @param {string} [props.backTopLabel]
 */
export function ActivityScrollAside({
  showHint,
  showBackTop,
  onBackTop,
  backTopLabel = 'Về đầu trang',
}) {
  return (
    <>
      <div
        className={cn(
          'pointer-events-none fixed right-2 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center transition-opacity duration-300 sm:right-4 sm:flex lg:right-[20px]',
          showHint ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden={!showHint}
      >
        <p className="mt-15 -mr-5 rotate-90 whitespace-nowrap font-body text-[11px] tracking-wide text-brand-home1/50 lg:text-xs">
          Cuộn để xem
        </p>
        <span className="mt-12 -mr-5 h-20 w-px bg-brand-home1/35 lg:mt-14 lg:h-24" />
      </div>

      <BackToTopButton
        show={showBackTop}
        onClick={onBackTop}
        label={backTopLabel}
        className="lg:right-[20px]"
      />
    </>
  )
}
