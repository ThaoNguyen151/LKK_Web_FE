import { useLayoutEffect } from 'react'

const DEFAULT_THRESHOLD = [0, 0.12, 0.28]
const DEFAULT_ROOT_MARGIN = '0px 0px -12% 0px'

const REVEAL_ANIM_CLASSES = [
  'anim-enter-up',
  'anim-enter-down',
  'anim-exit-up',
  'anim-exit-down',
  'is-revealed',
]

/**
 * Stagger delay cho `.home-mobile-reveal` (`--reveal-delay` trong CSS).
 * @param {number} index
 * @param {number} [stepMs]
 * @param {number} [cap]
 * @returns {import('react').CSSProperties}
 */
export function revealDelayStyle(index, stepMs = 55, cap = 10) {
  // CSS variables không nằm trong CSSProperties typings — cast qua Record.
  return /** @type {import('react').CSSProperties} */ (
    /** @type {Record<string, string>} */ ({
      '--reveal-delay': `${Math.min(Math.max(index, 0), cap) * stepMs}ms`,
    })
  )
}

/**
 * Hiện từng `[data-reveal]` khi vào viewport.
 *
 * @param {import('react').RefObject<HTMLElement | null>} scopeRef
 *   Phần tử chứa các `[data-reveal]` (thường là lưới danh sách).
 * @param {object} [options]
 * @param {import('react').RefObject<Element | null>} [options.rootRef]
 *   IntersectionObserver root — scroll container nội bộ (Activities).
 * @param {boolean} [options.once=true]
 * @param {boolean} [options.bidirectional=false]
 *   Giống home: xuống = từ dưới lên; lên = từ trên xuống (bật/tắt khi ra/vào view).
 * @param {string} [options.rootMargin]
 * @param {number|number[]} [options.threshold]
 * @param {readonly unknown[]} [options.deps]
 *   Chạy lại khi list đổi (page / filter / tab).
 */
export function useRevealInView(scopeRef, options = {}) {
  const {
    rootRef = null,
    once = true,
    bidirectional = false,
    rootMargin = DEFAULT_ROOT_MARGIN,
    threshold = DEFAULT_THRESHOLD,
    deps = [],
  } = options

  const toggleBothWays = bidirectional || !once

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return

    const items = /** @type {HTMLElement[]} */ (
      Array.from(scope.querySelectorAll('[data-reveal]'))
    )
    if (items.length === 0) return

    items.forEach(el => {
      el.classList.remove(...REVEAL_ANIM_CLASSES)
    })

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      items.forEach(el => el.classList.add('is-revealed'))
      return
    }

    const root = rootRef?.current ?? null

    /** @type {'forward' | 'reverse'} */
    let scrollDir = 'forward'
    let lastScrollY = root
      ? /** @type {HTMLElement} */ (root).scrollTop
      : window.scrollY || window.pageYOffset

    const onScroll = () => {
      const y = root
        ? /** @type {HTMLElement} */ (root).scrollTop
        : window.scrollY || window.pageYOffset
      const delta = y - lastScrollY
      if (Math.abs(delta) > 2) {
        scrollDir = delta > 0 ? 'forward' : 'reverse'
      }
      lastScrollY = y
    }

    /**
     * @param {HTMLElement} el
     * @param {boolean} inView
     */
    const syncItem = (el, inView) => {
      if (!bidirectional) {
        el.classList.toggle('is-revealed', inView)
        return
      }

      el.classList.remove(...REVEAL_ANIM_CLASSES)
      void el.offsetWidth

      if (inView) {
        el.classList.add(
          scrollDir === 'forward' ? 'anim-enter-up' : 'anim-enter-down',
          'is-revealed'
        )
      } else {
        el.classList.add(
          scrollDir === 'forward' ? 'anim-exit-up' : 'anim-exit-down'
        )
      }
    }

    /** @type {WeakMap<Element, boolean>} */
    const inViewState = new WeakMap()

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = /** @type {HTMLElement} */ (entry.target)
          const nowInView = entry.isIntersecting
          const prev = inViewState.get(el)

          if (prev === nowInView) return
          inViewState.set(el, nowInView)

          if (!nowInView) {
            if (toggleBothWays) syncItem(el, false)
            return
          }

          syncItem(el, true)
          if (once && !bidirectional) observer.unobserve(el)
        })
      },
      { root, rootMargin, threshold }
    )

    if (bidirectional) {
      const scrollTarget = root ?? window
      scrollTarget.addEventListener('scroll', onScroll, { passive: true })
    }

    items.forEach(el => {
      observer.observe(el)
      if (!bidirectional) return

      const rect = el.getBoundingClientRect()
      const rootRect = root
        ? /** @type {HTMLElement} */ (root).getBoundingClientRect()
        : { top: 0, bottom: window.innerHeight, height: window.innerHeight }
      const visible =
        rect.top < rootRect.bottom - rootRect.height * 0.08 &&
        rect.bottom > rootRect.top + 24
      if (visible) {
        inViewState.set(el, true)
        syncItem(el, true)
      }
    })

    return () => {
      observer.disconnect()
      if (bidirectional) {
        const scrollTarget = root ?? window
        scrollTarget.removeEventListener('scroll', onScroll)
      }
    }
  }, [
    scopeRef,
    rootRef,
    once,
    bidirectional,
    rootMargin,
    threshold,
    toggleBothWays,
    ...deps,
  ])
}
