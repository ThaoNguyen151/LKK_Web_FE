import { useLayoutEffect } from 'react'
import { cn } from '@utils'

const ACTIVITIES_REVEAL_ANIMS = [
  'activities-anim-enter-up',
  'activities-anim-enter-down',
  'activities-anim-exit-up',
  'activities-anim-exit-down',
  'is-inview',
]

/**
 * Vào view: ≥ 30% HOẶC ≥ ~40px lộ (khối mô tả dài không phải chờ lướt nửa đoạn).
 * Thoát: gần như ra hết — tránh giật mép.
 */
const ACTIVITIES_REVEAL_ENTER_RATIO = 0.3
const ACTIVITIES_REVEAL_ENTER_MIN_PX = 40
const ACTIVITIES_REVEAL_EXIT_RATIO = 0.04
const ACTIVITIES_REVEAL_EXIT_MAX_PX = 8
const ACTIVITIES_REVEAL_THRESHOLDS = Array.from(
  { length: 21 },
  (_, i) => i / 20
)

/**
 * @param {HTMLElement} slot
 * @returns {HTMLElement}
 */
function getActivitiesRevealTarget(slot) {
  const inner = slot.querySelector('.activities-mobile-reveal')
  return inner instanceof HTMLElement ? inner : slot
}

/**
 * @param {IntersectionObserverEntry} entry
 */
function shouldEnterReveal(entry) {
  if (!entry.isIntersecting) return false
  const visibleH = entry.intersectionRect?.height ?? 0
  return (
    entry.intersectionRatio >= ACTIVITIES_REVEAL_ENTER_RATIO ||
    visibleH >= ACTIVITIES_REVEAL_ENTER_MIN_PX
  )
}

/**
 * @param {IntersectionObserverEntry} entry
 */
function shouldExitReveal(entry) {
  if (!entry.isIntersecting) return true
  const visibleH = entry.intersectionRect?.height ?? 0
  return (
    entry.intersectionRatio <= ACTIVITIES_REVEAL_EXIT_RATIO &&
    visibleH <= ACTIVITIES_REVEAL_EXIT_MAX_PX
  )
}

/**
 * Scroll reveal 2 chiều cho hoạt động mobile (riêng, không đụng home).
 * Observe slot cố định; animate phần trong — tránh IO đảo do translate.
 * @param {import('react').RefObject<HTMLElement | null>} rootRef
 * @param {string | number} observeKey
 */
export function useActivitiesMobileReveal(rootRef, observeKey) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const slots = /** @type {HTMLElement[]} */ (
      Array.from(root.querySelectorAll('[data-activities-reveal]'))
    )
    if (slots.length === 0) return undefined

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      slots.forEach(slot => {
        const el = getActivitiesRevealTarget(slot)
        el.classList.remove(...ACTIVITIES_REVEAL_ANIMS)
        el.classList.add('is-inview')
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return undefined
    }

    /** @type {'forward' | 'reverse'} */
    let scrollDir = 'forward'
    let lastScrollTop = root.scrollTop
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
      const el = getActivitiesRevealTarget(slot)
      el.classList.remove(...ACTIVITIES_REVEAL_ANIMS)
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
      const fallbackTimer = window.setTimeout(unlock, 900)

      if (inView) {
        el.classList.add(
          direction === 'forward'
            ? 'activities-anim-enter-up'
            : 'activities-anim-enter-down',
          'is-inview'
        )
      } else {
        el.classList.add(
          direction === 'forward'
            ? 'activities-anim-exit-up'
            : 'activities-anim-exit-down'
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
      const top = root.scrollTop
      const delta = top - lastScrollTop
      if (Math.abs(delta) > 2) {
        scrollDir = delta > 0 ? 'forward' : 'reverse'
      }
      lastScrollTop = top
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
        root,
        threshold: ACTIVITIES_REVEAL_THRESHOLDS,
        // Không cắt margin dưới — khối dài hiện ngay khi vừa lướt tới
        rootMargin: '0px 0px 0px 0px',
      }
    )

    root.addEventListener('scroll', onScroll, { passive: true })

    const rootRect = root.getBoundingClientRect()
    slots.forEach(slot => {
      observer.observe(slot)
      const rect = slot.getBoundingClientRect()
      const overlap =
        Math.min(rect.bottom, rootRect.bottom) -
        Math.max(rect.top, rootRect.top)
      const visibleH = Math.max(0, overlap)
      const ratio = rect.height > 0 ? visibleH / rect.height : 0
      if (
        ratio >= ACTIVITIES_REVEAL_ENTER_RATIO ||
        visibleH >= ACTIVITIES_REVEAL_ENTER_MIN_PX
      ) {
        requestReveal(slot, true, 'forward')
      }
    })

    return () => {
      observer.disconnect()
      root.removeEventListener('scroll', onScroll)
    }
  }, [rootRef, observeKey])
}

/**
 * Slot layout ổn định + lớp animate bên trong.
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.revealClassName]
 */
export function ActivitiesRevealSlot({ children, className, revealClassName }) {
  return (
    <div
      data-activities-reveal
      className={cn('activities-reveal-slot', className)}
    >
      <div className={cn('activities-mobile-reveal', revealClassName)}>
        {children}
      </div>
    </div>
  )
}
