import { useLayoutEffect } from 'react'
import { cn } from '@utils'

const LIBRARY_REVEAL_ANIMS = [
  'library-anim-enter-up',
  'library-anim-enter-down',
  'library-anim-exit-up',
  'library-anim-exit-down',
  'is-inview',
]

/** Giống hình ảnh hoạt động: vào sớm theo px; tách riêng class/hook. */
const LIBRARY_REVEAL_ENTER_RATIO = 0.3
const LIBRARY_REVEAL_ENTER_MIN_PX = 40
const LIBRARY_REVEAL_EXIT_RATIO = 0.04
const LIBRARY_REVEAL_EXIT_MAX_PX = 8
const LIBRARY_REVEAL_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20)

/**
 * @param {HTMLElement} slot
 * @returns {HTMLElement}
 */
function getLibraryRevealTarget(slot) {
  const inner = slot.querySelector('.library-mobile-reveal')
  return inner instanceof HTMLElement ? inner : slot
}

/**
 * @param {IntersectionObserverEntry} entry
 */
function shouldEnterReveal(entry) {
  if (!entry.isIntersecting) return false
  const visibleH = entry.intersectionRect?.height ?? 0
  return (
    entry.intersectionRatio >= LIBRARY_REVEAL_ENTER_RATIO ||
    visibleH >= LIBRARY_REVEAL_ENTER_MIN_PX
  )
}

/**
 * @param {IntersectionObserverEntry} entry
 */
function shouldExitReveal(entry) {
  if (!entry.isIntersecting) return true
  const visibleH = entry.intersectionRect?.height ?? 0
  return (
    entry.intersectionRatio <= LIBRARY_REVEAL_EXIT_RATIO &&
    visibleH <= LIBRARY_REVEAL_EXIT_MAX_PX
  )
}

/**
 * Scroll reveal 2 chiều cho thư viện mobile (riêng — không đụng activities/home).
 * Root = viewport (page scroll).
 * @param {string | number} observeKey
 */
export function useLibraryMobileReveal(observeKey) {
  useLayoutEffect(() => {
    const slots = /** @type {HTMLElement[]} */ (
      Array.from(
        document.querySelectorAll('.library-mobile-shell [data-library-reveal]')
      )
    )
    if (slots.length === 0) return undefined

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      slots.forEach(slot => {
        const el = getLibraryRevealTarget(slot)
        el.classList.remove(...LIBRARY_REVEAL_ANIMS)
        el.classList.add('is-inview')
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return undefined
    }

    /** @type {'forward' | 'reverse'} */
    let scrollDir = 'forward'
    let lastScrollY = window.scrollY || window.pageYOffset
    /** @type {WeakMap<Element, boolean>} */
    const inViewState = new WeakMap()
    /** @type {WeakSet<Element>} */
    const animating = new WeakSet()
    /** @type {WeakMap<Element, { inView: boolean, direction: 'forward' | 'reverse' }>} */
    const pending = new WeakMap()

    /**
     * @param {HTMLElement} slot
     * @param {boolean} inView
     * @param {'forward' | 'reverse'} direction
     */
    const applyReveal = (slot, inView, direction) => {
      const el = getLibraryRevealTarget(slot)
      el.classList.remove(...LIBRARY_REVEAL_ANIMS)
      void el.offsetWidth

      animating.add(slot)
      let settled = false
      const unlock = () => {
        if (settled) return
        settled = true
        window.clearTimeout(fallbackTimer)
        animating.delete(slot)
        el.removeEventListener('animationend', unlock)

        const queued = pending.get(slot)
        if (!queued) return
        pending.delete(slot)
        if (inViewState.get(slot) === queued.inView) return
        inViewState.set(slot, queued.inView)
        applyReveal(slot, queued.inView, queued.direction)
      }
      el.addEventListener('animationend', unlock)
      // Chậm hơn activities (~1100ms enter)
      const fallbackTimer = window.setTimeout(unlock, 1200)

      if (inView) {
        el.classList.add(
          direction === 'forward'
            ? 'library-anim-enter-up'
            : 'library-anim-enter-down',
          'is-inview'
        )
      } else {
        el.classList.add(
          direction === 'forward'
            ? 'library-anim-exit-up'
            : 'library-anim-exit-down'
        )
      }
    }

    /**
     * @param {HTMLElement} slot
     * @param {boolean} next
     * @param {'forward' | 'reverse'} direction
     */
    const requestReveal = (slot, next, direction) => {
      const wasIn = inViewState.get(slot) === true
      if (wasIn === next) {
        pending.delete(slot)
        return
      }
      if (animating.has(slot)) {
        pending.set(slot, { inView: next, direction })
        return
      }
      inViewState.set(slot, next)
      applyReveal(slot, next, direction)
    }

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      const delta = y - lastScrollY
      if (Math.abs(delta) > 2) {
        scrollDir = delta > 0 ? 'forward' : 'reverse'
      }
      lastScrollY = y
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const slot = /** @type {HTMLElement} */ (entry.target)
          const wasIn = inViewState.get(slot) === true

          let next = wasIn
          if (!wasIn && shouldEnterReveal(entry)) {
            next = true
          } else if (wasIn && shouldExitReveal(entry)) {
            next = false
          } else {
            return
          }

          requestReveal(slot, next, scrollDir)
        })
      },
      {
        root: null,
        threshold: LIBRARY_REVEAL_THRESHOLDS,
        rootMargin: '0px 0px 0px 0px',
      }
    )

    window.addEventListener('scroll', onScroll, { passive: true })

    slots.forEach(slot => {
      observer.observe(slot)
      const rect = slot.getBoundingClientRect()
      const overlap =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      const visibleH = Math.max(0, overlap)
      const ratio = rect.height > 0 ? visibleH / rect.height : 0
      if (
        ratio >= LIBRARY_REVEAL_ENTER_RATIO ||
        visibleH >= LIBRARY_REVEAL_ENTER_MIN_PX
      ) {
        requestReveal(slot, true, 'forward')
      }
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [observeKey])
}

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.revealClassName]
 */
export function LibraryRevealSlot({ children, className, revealClassName }) {
  return (
    <div data-library-reveal className={cn('library-reveal-slot', className)}>
      <div className={cn('library-mobile-reveal', revealClassName)}>
        {children}
      </div>
    </div>
  )
}
