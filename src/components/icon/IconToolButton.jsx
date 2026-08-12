import { cn } from '@utils'
import {
  ICON_TOOL_BUTTON_ACTIVE,
  ICON_TOOL_BUTTON_VARIANTS,
  ToneSwapIcon,
} from './ToneSwapIcon'

/**
 * Nút icon Search/Sort chung 2 kiểu (activities | news).
 * @param {{
 *   purpleSrc: string
 *   whiteSrc: string
 *   variant?: 'activities' | 'news'
 *   className?: string
 *   iconClassName?: string
 *   active?: boolean
 * } & import('react').ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export function IconToolButton({
  purpleSrc,
  whiteSrc,
  variant = 'activities',
  className,
  iconClassName,
  type = 'button',
  active = false,
  ...props
}) {
  const isNews = variant === 'news'
  const key = isNews ? 'news' : 'activities'

  return (
    <button
      type={type}
      {...props}
      aria-expanded={active}
      className={cn(
        ICON_TOOL_BUTTON_VARIANTS[key],
        active && ICON_TOOL_BUTTON_ACTIVE[key],
        className
      )}
    >
      <ToneSwapIcon
        purpleSrc={purpleSrc}
        whiteSrc={whiteSrc}
        hoverTo={isNews ? 'purple' : 'white'}
        active={active}
        className={cn(
          isNews ? 'h-5 w-5 sm:h-4 sm:w-4' : 'h-3 w-3',
          iconClassName
        )}
      />
    </button>
  )
}
