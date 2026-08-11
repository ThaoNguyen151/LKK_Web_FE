import arrowP from '@assets/images/subicon/iconParrowup.png'
import arrowW from '@assets/images/subicon/iconWarrowup.png'
import { cn } from '@utils'
import { ToneSwapIcon, ICON_ROUND_BUTTON_CLASS } from './ToneSwapIcon'

/**
 * Nút cuộn lên đầu trang / đầu danh sách.
 * @param {object} props
 * @param {boolean} props.show
 * @param {() => void} props.onClick
 * @param {string} [props.label]
 * @param {string} [props.className]
 */
export function BackToTopButton({
  show,
  onClick,
  label = 'Lên đầu trang',
  className,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      tabIndex={show ? 0 : -1}
      onClick={onClick}
      className={cn(
        ICON_ROUND_BUTTON_CLASS,
        'fixed bottom-6 right-4 z-30 h-11 w-11 sm:bottom-8 sm:right-5 lg:bottom-10 lg:right-7 lg:h-12 lg:w-12',
        show
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
        className
      )}
    >
      <ToneSwapIcon purpleSrc={arrowP} whiteSrc={arrowW} className="h-4 w-4" />
    </button>
  )
}
