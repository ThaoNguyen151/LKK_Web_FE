import iconP from '@assets/images/subicon/iconParrow.png'
import iconW from '@assets/images/subicon/iconWarrow.png'
import { cn } from '@utils'
import { IconImg } from './IconImg'
import { ToneSwapIcon } from './ToneSwapIcon'

/**
 * Mũi tên ngang (→).
 * `textheader`: dùng cùng asset tím, tô lại gần #3d3d3d (brand-textheader).
 * @param {object} props
 * @param {'purple' | 'white' | 'textheader'} [props.tone]
 * @param {boolean} [props.swapOnGroupHover]
 * @param {string} [props.className]
 */
export function ArrowIcon({
  tone = 'purple',
  swapOnGroupHover = false,
  className,
}) {
  if (swapOnGroupHover) {
    return (
      <ToneSwapIcon purpleSrc={iconP} whiteSrc={iconW} className={className} />
    )
  }

  const isTextHeader = tone === 'textheader'

  return (
    <IconImg
      src={tone === 'white' ? iconW : iconP}
      className={cn(
        'h-4 w-4 -translate-y-px',
        // #3d3d3d ≈ black @ 24% opacity
        isTextHeader && 'brightness-0 opacity-[0.24]',
        className
      )}
    />
  )
}
