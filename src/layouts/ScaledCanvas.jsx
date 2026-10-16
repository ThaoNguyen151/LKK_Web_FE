import { CANVAS_DESIGN_WIDTH } from '@/constants/breakpoints'
import { useViewportCanvas } from '@hooks'

/**
 * Desktop canvas cố định 1536px — scale full-bleed theo bề ngang viewport
 * (origin top-left, không translateX(-50%) → hết lề trắng hai bên).
 */
export function ScaledCanvas({ children, className = '' }) {
  const layout = useViewportCanvas()

  return (
    <div
      className={`relative h-dvh w-full max-w-[100vw] overflow-x-clip overflow-y-hidden bg-brand-soft ${className}`}
    >
      <div
        className="absolute top-0 left-0 origin-top-left will-change-transform"
        style={{
          width: CANVAS_DESIGN_WIDTH,
          height: layout.height,
          transform: `scale(${layout.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
