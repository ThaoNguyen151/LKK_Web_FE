import { cn } from '@utils'

/**
 * Standard page shell for fluid/responsive pages (mobile, tablet, content pages).
 */
export function PageShell({ children, className, ...props }) {
  return (
    <div
      className={cn('min-h-dvh bg-brand-soft text-brand-textheader', className)}
      {...props}
    >
      {children}
    </div>
  )
}
