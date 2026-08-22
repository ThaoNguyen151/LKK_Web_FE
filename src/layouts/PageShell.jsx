import { cn } from '@utils'

/**
 * Standard page shell for fluid/responsive pages (mobile, tablet, content pages).
 * @param {{
 *   children: import('react').ReactNode,
 *   className?: string,
 * }} props
 */
export function PageShell({ children, className, ...rest }) {
  return (
    <div
      className={cn('min-h-dvh bg-brand-soft text-brand-textheader', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
