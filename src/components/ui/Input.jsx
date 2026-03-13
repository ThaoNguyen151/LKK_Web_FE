import { cn } from '@utils'

export function Input({ className, type = 'text', error, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-gray-100',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
        className
      )}
      {...props}
    />
  )
}

export function Label({ children, htmlFor, className, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('mb-1 block text-sm font-medium text-gray-700', className)}
      {...props}
    >
      {children}
    </label>
  )
}

export function FormField({ label, error, children, ...props }) {
  return (
    <div className="mb-4" {...props}>
      {label && <Label>{label}</Label>}
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
