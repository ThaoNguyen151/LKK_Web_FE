import iconP from '@assets/images/subicon/iconPx.png'
import iconW from '@assets/images/subicon/iconWx.png'
import { cn } from '@utils'
import { IconImg } from './IconImg'
import { ToneSwapIcon } from './ToneSwapIcon'

const ICON_SIZE = 'h-6 w-6 sm:h-5 sm:w-5'

/**
 * @param {object} props
 * @param {'purple' | 'white'} [props.tone]
 * @param {boolean} [props.swapOnGroupHover] Trắng → tím khi hover (parent `group/icon`)
 * @param {string} [props.className]
 */
export function CloseIcon({
  tone = 'white',
  swapOnGroupHover = false,
  className,
}) {
  if (swapOnGroupHover) {
    return (
      <ToneSwapIcon
        purpleSrc={iconP}
        whiteSrc={iconW}
        hoverTo="purple"
        className={cn(ICON_SIZE, className)}
        imgClassName={ICON_SIZE}
      />
    )
  }

  return (
    <IconImg
      src={tone === 'white' ? iconW : iconP}
      className={cn(ICON_SIZE, '-translate-y-px', className)}
    />
  )
}
