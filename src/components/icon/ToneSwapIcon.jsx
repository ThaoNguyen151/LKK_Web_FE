import { cn } from '@utils'
import { IconImg } from './IconImg'

/**
 * Icon P/W chồng nhau — đổi khi parent có `group/icon` + hover, hoặc `active`.
 * @param {object} props
 * @param {string} props.purpleSrc
 * @param {string} props.whiteSrc
 * @param {string} [props.className]
 * @param {string} [props.imgClassName]
 * @param {'white' | 'purple'} [props.hoverTo]
 * @param {boolean} [props.active]
 */
export function ToneSwapIcon({
  purpleSrc,
  whiteSrc,
  className,
  imgClassName,
  hoverTo = 'white',
  active = false,
}) {
  const toPurple = hoverTo === 'purple'
  const baseSrc = toPurple ? whiteSrc : purpleSrc
  const hoverSrc = toPurple ? purpleSrc : whiteSrc

  return (
    <span className={cn('relative inline-block h-4 w-4 shrink-0', className)}>
      <IconImg
        src={baseSrc}
        className={cn(
          'absolute inset-0 m-auto h-full w-full object-contain transition-opacity duration-300',
          'group-hover/icon:opacity-0 group-aria-expanded/icon:opacity-0',
          active && 'opacity-0',
          imgClassName
        )}
      />
      <IconImg
        src={hoverSrc}
        className={cn(
          'absolute inset-0 m-auto h-full w-full object-contain opacity-0 transition-opacity duration-300',
          'group-hover/icon:opacity-100 group-aria-expanded/icon:opacity-100',
          active && '!opacity-100',
          imgClassName
        )}
      />
    </span>
  )
}

/** Class nút tròn có nền (BackToTop). */
export const ICON_ROUND_BUTTON_CLASS =
  'group/icon flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)] transition-[background-color,box-shadow,opacity,transform] duration-300 hover:bg-brand-home1 disabled:opacity-30'

/** Nút chỉ icon, nền trắng. */
export const ICON_GHOST_BUTTON_CLASS =
  'group/icon flex h-9 w-9 items-center justify-center bg-transparent transition-opacity disabled:opacity-30 hover:bg-white/20 hover:rounded-full'

/** Nền / bóng chung cho panel Search & Sort */
export const ICON_PANEL_CLASS =
  'rounded-2xl bg-white shadow-[0_12px_35px_rgba(90,59,196,0.16)]'

/**
 * Nút Search / Sort — 2 kiểu:
 * - activities: icon tím → hover nền tím + icon trắng
 * - news: icon trắng → hover nền trắng + icon tím
 */
export const ICON_TOOL_BUTTON_VARIANTS = {
  activities:
    'group/icon flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-colors duration-300 hover:bg-brand-home1 aria-expanded:bg-brand-home1',
  news: 'group/icon flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition-colors duration-300 hover:bg-white aria-expanded:bg-white',
}

export const ICON_TOOL_BUTTON_ACTIVE = {
  activities: '!bg-brand-home1',
  news: '!bg-white',
}
