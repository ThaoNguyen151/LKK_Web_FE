import { cn } from '@utils'

export { adminInputClass } from './adminInputClass'

/**
 * @param {object} props
 * @param {string} props.label
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.hint]
 */
export function AdminField({ label, children, className, hint }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-brand-textheader/70">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-1 block font-body text-[11px] text-brand-textheader/45">
          {hint}
        </span>
      ) : null}
    </label>
  )
}

/**
 * @param {object} props
 * @param {'primary' | 'secondary' | 'danger' | 'ghost'} [props.variant]
 * @param {string} [props.className]
 * @param {import('react').ButtonHTMLAttributes<HTMLButtonElement>} [props.rest]
 */
export function AdminButton({
  variant = 'primary',
  className,
  children,
  type = 'button',
  ...rest
}) {
  const styles = {
    primary:
      'bg-brand-home1 text-white hover:bg-brand-home1/90 shadow-[0_8px_24px_rgba(90,59,196,0.2)]',
    secondary:
      'bg-white text-brand-home1 ring-1 ring-brand-home1/20 hover:bg-brand-home1/5',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-brand-textheader/70 hover:bg-black/5',
  }

  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50',
        styles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {import('react').ReactNode} props.children
 * @param {import('react').ReactNode} [props.footer]
 */
export function AdminModal({ open, onClose, title, children, footer }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Đóng"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-brand-soft shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-brand-home1/10 px-5 py-4">
          <h2 className="font-display text-2xl italic text-brand-home1">
            {title}
          </h2>
          <AdminButton variant="ghost" className="px-2 py-1" onClick={onClose}>
            ✕
          </AdminButton>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>
        {footer ? (
          <div className="flex flex-wrap justify-end gap-2 border-t border-brand-home1/10 bg-white/70 px-5 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
