import { cn } from '@utils'

/**
 * Reusable section with shared responsive spacing.
 * Override per page via className when needed.
 * @param {{
 *   children: import('react').ReactNode,
 *   className?: string,
 *   as?: import('react').ElementType,
 *   fullHeight?: boolean,
 * }} props
 */
export function PageSection({
  children,
  className,
  as: Component = 'section',
  fullHeight = false,
  ...rest
}) {
  return (
    <Component
      className={cn(
        'page-section',
        fullHeight && 'min-h-dvh snap-start',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
