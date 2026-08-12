import iconP from '@assets/images/subicon/iconPsort.png'
import iconW from '@assets/images/subicon/iconWsort.png'
import iconTick from '@assets/images/subicon/iconPtick.png'
import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@utils'
import { IconImg } from './IconImg'
import { IconToolButton } from './IconToolButton'
import { claimIconPanel, subscribeIconPanel } from './iconPanelExclusive'
import { ICON_PANEL_CLASS, ToneSwapIcon } from './ToneSwapIcon'

/** @typedef {'desc' | 'asc' | 'az' | 'za'} SortValue */

/** @type {{ value: SortValue, label: string }[]} */
const DEFAULT_SORT_OPTIONS = [
  { value: 'desc', label: 'Mới nhất' },
  { value: 'asc', label: 'Cũ nhất' },
  { value: 'az', label: 'A - Z' },
  { value: 'za', label: 'Z - A' },
]

/**
 * @param {object} props
 * @param {'purple' | 'white'} [props.tone]
 * @param {boolean} [props.swapOnGroupHover]
 * @param {'white' | 'purple'} [props.hoverTo]
 * @param {string} [props.className]
 */
export function SortIcon({
  tone = 'purple',
  swapOnGroupHover = false,
  hoverTo = 'white',
  className,
}) {
  if (swapOnGroupHover) {
    return (
      <ToneSwapIcon
        purpleSrc={iconP}
        whiteSrc={iconW}
        hoverTo={hoverTo}
        className={className}
      />
    )
  }

  return (
    <IconImg
      src={tone === 'white' ? iconW : iconP}
      className={cn('h-3.5 w-3.5 -translate-y-px', className)}
    />
  )
}

/**
 * - activities: tím → hover nền tím + trắng
 * - news: trắng → hover nền trắng + tím
 * @param {{
 *   variant?: 'activities' | 'news'
 *   value?: SortValue
 *   onChange?: (value: SortValue) => void
 *   options?: { value: SortValue, label: string }[]
 *   className?: string
 *   iconClassName?: string
 *   buttonClassName?: string
 * }} props
 */
export function SortButton({
  variant = 'activities',
  value = 'desc',
  onChange,
  options = DEFAULT_SORT_OPTIONS,
  className,
  iconClassName,
  buttonClassName,
}) {
  const rootRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    return subscribeIconPanel(id => {
      if (id === 'sort') return
      setOpen(false)
    })
  }, [])

  useEffect(() => {
    if (!open) return

    /** @param {PointerEvent} event */
    const onPointerDown = event => {
      const target = /** @type {Node | null} */ (event.target)
      if (rootRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const openSort = () => {
    claimIconPanel('sort')
    setOpen(true)
  }

  return (
    <div
      ref={rootRef}
      className={cn('relative', className)}
      onMouseEnter={openSort}
      onMouseLeave={() => {
        if (rootRef.current?.contains(document.activeElement)) return
        setOpen(false)
      }}
    >
      <IconToolButton
        purpleSrc={iconP}
        whiteSrc={iconW}
        variant={variant}
        aria-label="Lọc / sắp xếp"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
        className={buttonClassName}
        iconClassName={iconClassName}
        active={open}
        onClick={() => {
          if (open) setOpen(false)
          else openSort()
        }}
      />

      <div
        id={panelId}
        className={cn(
          'absolute right-0 top-full z-30 mt-2 min-w-[7.5rem] transition-all duration-200',
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible pointer-events-none translate-y-1 opacity-0'
        )}
      >
        <ul
          role="listbox"
          aria-label="Tùy chọn sắp xếp"
          className={cn(ICON_PANEL_CLASS, 'px-4 py-2')}
        >
          {options.map(option => {
            const selected = option.value === value
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange?.(option.value)
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-between gap-3 py-1.5 text-left font-body text-xs text-gray-700 transition-colors hover:text-brand-home1"
                >
                  <span>{option.label}</span>
                  {selected ? (
                    <IconImg src={iconTick} className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <span className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
