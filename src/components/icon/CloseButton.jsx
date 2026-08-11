import { cn } from '@utils'
import { CloseIcon } from './CloseIcon'
import { ICON_GHOST_BUTTON_CLASS } from './ToneSwapIcon'

/**
 * Nút đóng (X) — icon trắng, hover thành tím, không nền.
 * @param {object} props
 * @param {() => void} props.onClick
 * @param {string} [props.label]
 * @param {string} [props.className]
 */
export function CloseButton({ onClick, label = 'Đóng', className }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        ICON_GHOST_BUTTON_CLASS,
        'h-5 w-5 sm:h-10 sm:w-10',
        className
      )}
    >
      <CloseIcon tone="white" />
    </button>
  )
}
