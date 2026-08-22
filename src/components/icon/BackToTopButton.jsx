import arrowP from '@assets/images/subicon/iconParrowup.png'
import arrowW from '@assets/images/subicon/iconWarrowup.png'
import { cn } from '@utils'
import { ToneSwapIcon, ICON_ROUND_BUTTON_CLASS } from './ToneSwapIcon'

/**
 * Nút cuộn lên đầu trang / đầu danh sách.
 * Hover: hiện nhãn pill bên trái (vd. “Về đầu trang”).
 * @param {object} props
 * @param {boolean} props.show
 * @param {() => void} props.onClick
 * @param {string} [props.label]
 * @param {string} [props.className]
 */
export function BackToTopButton({
  show,
  onClick,
  label = 'Về đầu trang',
  className,
}) {
  return (
    <div
      className={cn(
        'group/backtop fixed bottom-6 right-4 z-30 sm:bottom-8 sm:right-5 lg:bottom-10 lg:right-7',
        show
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
        className
      )}
    >
      <button
        type="button"
        aria-label={label}
        tabIndex={show ? 0 : -1}
        onClick={onClick}
        className={cn(
          ICON_ROUND_BUTTON_CLASS,
          'relative h-11 w-11 lg:h-12 lg:w-12'
        )}
      >
        <span
          className={cn(
            'pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2',
            'whitespace-nowrap rounded-full bg-brand-home1 px-3.5 py-2',
            'font-body text-[10px] tracking-[0.5px] text-white',
            'shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)]',
            'origin-right scale-95 opacity-0 transition-all duration-300',
            'group-hover/backtop:scale-100 group-hover/backtop:opacity-100',
            'group-focus-within/backtop:scale-100 group-focus-within/backtop:opacity-100'
          )}
          aria-hidden
        >
          {label}
        </span>
        <ToneSwapIcon
          purpleSrc={arrowP}
          whiteSrc={arrowW}
          className="h-4 w-4"
        />
      </button>
    </div>
  )
}
