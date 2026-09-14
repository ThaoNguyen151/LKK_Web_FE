import { cn } from '@utils'

/**
 * @param {string} [className]
 */
export function adminInputClass(className) {
  return cn(
    'w-full rounded-xl border border-brand-home1/15 bg-white px-3 py-2.5 font-body text-sm text-brand-textheader outline-none transition focus:border-brand-home1/40 focus:ring-2 focus:ring-brand-home1/15',
    className
  )
}
