import iconP from '@assets/images/subicon/iconPsearch.png'
import iconW from '@assets/images/subicon/iconWsearch.png'
import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@utils'
import { CloseIcon } from './CloseIcon'
import { IconImg } from './IconImg'
import { IconToolButton } from './IconToolButton'
import { claimIconPanel, subscribeIconPanel } from './iconPanelExclusive'
import { ICON_PANEL_CLASS, ToneSwapIcon } from './ToneSwapIcon'

/**
 * @param {object} props
 * @param {'purple' | 'white'} [props.tone]
 * @param {boolean} [props.swapOnGroupHover]
 * @param {'white' | 'purple'} [props.hoverTo]
 * @param {string} [props.className]
 */
export function SearchIcon({
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
 * Nút tìm kiếm + thanh input (hover / focus).
 * - activities: tím → hover nền tím + trắng
 * - news: trắng → hover nền trắng + tím
 * @param {{
 *   variant?: 'activities' | 'news'
 *   value?: string
 *   onChange?: (value: string) => void
 *   placeholder?: string
 *   className?: string
 *   iconClassName?: string
 *   buttonClassName?: string
 * }} props
 */
export function SearchButton({
  variant = 'activities',
  value = '',
  onChange,
  placeholder = 'Tìm kiếm…',
  className,
  iconClassName,
  buttonClassName,
}) {
  const hasValue = Boolean(value)
  const rootRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null))
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    return subscribeIconPanel(id => {
      if (id === 'search') return
      setOpen(false)
      inputRef.current?.blur()
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

  const openSearch = () => {
    claimIconPanel('search')
    setOpen(true)
  }

  const showPanel = open

  return (
    <div
      ref={rootRef}
      className={cn('relative', className)}
      onMouseEnter={openSearch}
      onMouseLeave={() => {
        if (rootRef.current?.contains(document.activeElement)) return
        setOpen(false)
      }}
    >
      <IconToolButton
        purpleSrc={iconP}
        whiteSrc={iconW}
        variant={variant}
        aria-label="Tìm kiếm"
        aria-expanded={showPanel}
        aria-controls={panelId}
        className={buttonClassName}
        iconClassName={iconClassName}
        active={showPanel}
        onClick={() => {
          openSearch()
          queueMicrotask(() => inputRef.current?.focus())
        }}
      />

      <div
        id={panelId}
        className={cn(
          'absolute right-0 top-full z-30 mt-2 min-w-[14rem] transition-all duration-200 group-hover/search:visible group-hover/search:translate-y-0 group-hover/search:opacity-100 group-focus-within/search:visible group-focus-within/search:translate-y-0 group-focus-within/search:opacity-100 sm:min-w-[16rem]',
          showPanel
            ? 'visible translate-y-0 opacity-100'
            : 'invisible pointer-events-none translate-y-1 opacity-0'
        )}
      >
        <div
          className={cn(
            ICON_PANEL_CLASS,
            'flex items-center rounded-full px-0 py-0'
          )}
        >
          <IconImg src={iconP} className="ml-3 h-3.5 w-3.5 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={value}
            onChange={event => onChange?.(event.target.value)}
            onFocus={openSearch}
            onBlur={() => {
              queueMicrotask(() => {
                if (rootRef.current?.contains(document.activeElement)) return
                setOpen(false)
              })
            }}
            placeholder={placeholder}
            className="w-full bg-transparent px-3 py-2 font-body text-xs text-black caret-black outline-none placeholder:italic placeholder:tracking-wide placeholder:text-gray-400 [caret-shape:3px] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />
          {hasValue ? (
            <button
              type="button"
              aria-label="Xóa nội dung"
              onClick={() => {
                onChange?.('')
                inputRef.current?.focus()
              }}
              className="mr-3 flex h-3 w-3 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-70"
            >
              <CloseIcon tone="purple" className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
