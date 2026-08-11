import iconW from '@assets/images/subicon/iconWarrowright.png'
import { cn } from '@utils'
import { IconImg } from './IconImg'

/**
 * @param {object} props
 * @param {string} [props.className]
 */
export function ChevronRightIcon({ className }) {
  return (
    <IconImg
      src={iconW}
      className={cn('h-7 w-7 translate-x-[1px]', className)}
    />
  )
}
