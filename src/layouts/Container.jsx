import { cn } from '@utils'

export function Container({ children, className, ...props }) {
  return (
    <div className={cn('container mx-auto px-4 py-8', className)} {...props}>
      {children}
    </div>
  )
}
