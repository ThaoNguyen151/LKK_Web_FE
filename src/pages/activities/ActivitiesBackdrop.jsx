import { useLayoutEffect, useRef, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { cn } from '@utils'

export const GRID_EDGE_BLUR_TOP = 'h-8'
export const GRID_EDGE_BLUR_BOTTOM = 'h-13'

/**
 * Nền trang + chấm trang trí (left / right / bottom).
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 */
export function ActivitiesBackdrop({ className, style }) {
  return (
    <div
      className={cn('overflow-hidden bg-brand-soft', className)}
      style={style}
    >
      <img
        src={rectLeft}
        alt=""
        className="absolute left-0 top-[20%] h-full w-[min(40vw,420px)] opacity-70"
        aria-hidden
      />
      <img
        src={rectRight}
        alt=""
        className="absolute bottom-[10%] right-0 w-[min(35vw,380px)] opacity-70"
        aria-hidden
      />
      <img
        src={rectBottom}
        alt=""
        className="absolute bottom-0 left-1/2 w-[600px] -translate-x-[70%]"
        aria-hidden
      />
    </div>
  )
}

/**
 * Blur mép lưới: clone nền (có chấm) khớp viewport rồi blur + mask.
 * @param {object} props
 * @param {'top' | 'bottom'} props.edge
 * @param {boolean} props.show
 * @param {boolean} [props.flush] Neo sát mép khung nội dung (không lệch -bottom-6)
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 */
export function GridEdgeBlur({ edge, show, flush = false, className, style }) {
  const stripRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [origin, setOrigin] = useState({ top: 0, left: 0 })

  useLayoutEffect(() => {
    const update = () => {
      const rect = stripRef.current?.getBoundingClientRect()
      if (!rect) return
      setOrigin({ top: rect.top, left: rect.left })
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [show, edge, flush, style?.left, style?.right])

  const isTop = edge === 'top'
  const mask = isTop
    ? 'linear-gradient(to bottom, #000 0%, #000 50%, transparent 100%)'
    : 'linear-gradient(to top, #000 0%, #000 50%, transparent 100%)'

  return (
    <div
      ref={stripRef}
      className={cn(
        'pointer-events-none absolute inset-x-0 z-10 overflow-hidden transition-opacity duration-0',
        isTop ? GRID_EDGE_BLUR_TOP : GRID_EDGE_BLUR_BOTTOM,
        isTop ? 'top-0' : flush ? 'bottom-0' : '-bottom-6',
        show ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        ...style,
      }}
      aria-hidden
    >
      <ActivitiesBackdrop
        className={cn('absolute', isTop ? 'blur-[12px]' : 'blur-[9px]')}
        style={{
          top: -origin.top,
          left: -origin.left,
          width: '100vw',
          height: '100dvh',
        }}
      />
    </div>
  )
}
