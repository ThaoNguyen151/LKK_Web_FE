import { cn } from '@utils'

export function Container({ children, className, ...props }) {
  return (
    <div className={cn('page-container mx-auto w-full', className)} {...props}>
      {children}
    </div>
  )
}
