import { cn } from '@utils'

/**
 * Reusable section with shared responsive spacing.
 * Override per page via className when needed.
 */
export function PageSection({
  children,
  className,
  as: Component = 'section',
  fullHeight = false,
  ...props
}) {
  return (
    <Component
      className={cn(
        'page-section',
        fullHeight && 'min-h-dvh snap-start',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
