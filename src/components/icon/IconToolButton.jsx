import { cn } from '@utils'
import { ICON_TOOL_BUTTON_VARIANTS, ToneSwapIcon } from './ToneSwapIcon'

/**
 * Nút icon Search/Sort chung 2 kiểu (activities | news).
 * @param {{
 *   purpleSrc: string
 *   whiteSrc: string
 *   variant?: 'activities' | 'news'
 *   className?: string
 *   iconClassName?: string
 * } & import('react').ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export function IconToolButton({
  purpleSrc,
  whiteSrc,
  variant = 'activities',
  className,
  iconClassName,
  type = 'button',
  ...props
}) {
  const isNews = variant === 'news'

  return (
    <button
      type={type}
      className={cn(
        ICON_TOOL_BUTTON_VARIANTS[isNews ? 'news' : 'activities'],
        className
      )}
      {...props}
    >
      <ToneSwapIcon
        purpleSrc={purpleSrc}
        whiteSrc={whiteSrc}
        hoverTo={isNews ? 'purple' : 'white'}
        className={cn(
          isNews ? 'h-5 w-5 sm:h-4 sm:w-4' : 'h-3 w-3',
          iconClassName
        )}
      />
    </button>
  )
}
