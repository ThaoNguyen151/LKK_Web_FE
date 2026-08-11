import { cn } from '@utils'

/**
 * @param {object} props
 * @param {string} props.src
 * @param {string} [props.className]
 * @param {string} [props.alt]
 */
export function IconImg({ src, className, alt = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-contain', className)}
      aria-hidden={!alt}
    />
  )
}
