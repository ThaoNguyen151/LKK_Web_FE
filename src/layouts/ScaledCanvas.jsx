import { CANVAS_DESIGN_WIDTH } from '@/constants/breakpoints'
import { useViewportCanvas } from '@hooks'

/**
 * Desktop-only scaled canvas for complex landing pages.
 * Wrap page content designed at a fixed width; scales to fit viewport on lg+.
 */
export function ScaledCanvas({ children, className = '' }) {
  const layout = useViewportCanvas()

  return (
    <div
      className={`relative h-dvh w-full max-w-full overflow-x-hidden overflow-y-hidden bg-brand-soft ${className}`}
    >
      <div
        className="absolute top-0 left-1/2 origin-top will-change-transform"
        style={{
          width: CANVAS_DESIGN_WIDTH,
          height: layout.height,
          transform: `translateX(-50%) scale(${layout.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
