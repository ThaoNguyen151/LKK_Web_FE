import { useLayoutEffect } from 'react'
import { cn } from '@utils'

/**
 * Giống home [data-home-reveal]:
 * - Ban đầu ẩn (opacity 0)
 * - Hiện khi vào vùng nhìn thấy (đủ rộng ~2 hàng / lần)
 * - Ra khỏi vùng → ẩn lại
 * Hysteresis: vào ≥ 32%, ra ≤ 12% — tránh hiện/ẩn giật.
 */
const NEWS_ENTER_RATIO = 0.32
const NEWS_EXIT_RATIO = 0.12
const NEWS_THRESHOLDS = [0, 0.08, 0.12, 0.2, 0.32, 0.45, 0.6, 0.75, 1]
/** Vùng hiện rộng hơn (~2 hàng); cắt nhẹ mép dưới để không bung quá sớm */
const NEWS_ROOT_MARGIN = '0px 0px -8% 0px'
const NEWS_ROW_STAGGER_MS = 90

/**
 * @param {HTMLElement} slot
 * @returns {HTMLElement}
 */
function getNewsRevealTarget(slot) {
  const inner = slot.querySelector('.news-mobile-reveal')
  return inner instanceof HTMLElement ? inner : slot
}

/**
 * @param {HTMLElement} slot
 */
function hideNewsReveal(slot) {
  const el = getNewsRevealTarget(slot)
  el.classList.remove('is-revealed')
  el.style.removeProperty('transition-delay')
}

/**
 * @param {HTMLElement} slot
 * @param {boolean} show
 * @param {number} [delayMs]
 */
function setNewsRevealed(slot, show, delayMs = 0) {
  const el = getNewsRevealTarget(slot)
  if (delayMs > 0) {
    el.style.transitionDelay = `${delayMs}ms`
  } else {
    el.style.removeProperty('transition-delay')
  }
  el.classList.toggle('is-revealed', show)
}

/**
 * Reveal tin tức theo hàng (cặp card) — pattern Home, riêng news.
 * Đổi trang: ẩn hết → scroll top → IO quyết định hiện (không hiện sẵn rồi tắt).
 * @param {string | number} observeKey
 */
export function useNewsMobileReveal(observeKey) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)

    const slots = /** @type {HTMLElement[]} */ (
      Array.from(
        document.querySelectorAll('.news-mobile-shell [data-news-reveal]')
      )
    )
    if (slots.length === 0) return undefined

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Luôn bắt đầu ẩn — chỉ animation/IO mới cho hiện
    slots.forEach(hideNewsReveal)

    if (reducedMotion) {
      slots.forEach(slot => setNewsRevealed(slot, true))
      return undefined
    }

    /** @type {WeakMap<Element, boolean>} */
    const shown = new WeakMap()
    /** @type {WeakMap<Element, number>} */
    const rowIndex = new WeakMap()
    slots.forEach((slot, i) => rowIndex.set(slot, i))

    let cancelled = false
    /** @type {IntersectionObserver | null} */
    let observer = null
    let raf2 = 0
    /** Stagger hàng chỉ trong ~1s đầu sau đổi trang */
    let bootAt = 0
    /** @type {number[]} */
    const delayClearTimers = []

    /**
     * @param {HTMLElement} slot
     * @param {boolean} next
     */
    const applyShow = (slot, next) => {
      if (cancelled) return
      const was = shown.get(slot) === true
      if (was === next) return
      shown.set(slot, next)

      if (next) {
        const idx = rowIndex.get(slot) ?? 0
        const inBoot = bootAt > 0 && performance.now() - bootAt < 900
        const delay = inBoot ? idx * NEWS_ROW_STAGGER_MS : 0
        setNewsRevealed(slot, true, delay)
        if (delay > 0) {
          delayClearTimers.push(
            window.setTimeout(() => {
              if (cancelled) return
              getNewsRevealTarget(slot).style.removeProperty('transition-delay')
            }, delay + 80)
          )
        }
      } else {
        setNewsRevealed(slot, false)
      }
    }

    const startObserving = () => {
      if (cancelled) return
      window.scrollTo(0, 0)
      bootAt = performance.now()

      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const slot = /** @type {HTMLElement} */ (entry.target)
            const was = shown.get(slot) === true
            const ratio = entry.intersectionRatio

            let next = was
            if (!was && entry.isIntersecting && ratio >= NEWS_ENTER_RATIO) {
              next = true
            } else if (
              was &&
              (!entry.isIntersecting || ratio <= NEWS_EXIT_RATIO)
            ) {
              next = false
            } else {
              return
            }

            applyShow(slot, next)
          })
        },
        {
          root: null,
          threshold: NEWS_THRESHOLDS,
          rootMargin: NEWS_ROOT_MARGIN,
        }
      )

      slots.forEach(slot => {
        observer?.observe(slot)
      })
    }

    // Đợi layout sau scrollTo — đo đúng, không hiện sớm
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(startObserving)
    })

    return () => {
      cancelled = true
      window.cancelAnimationFrame(raf1)
      window.cancelAnimationFrame(raf2)
      delayClearTimers.forEach(id => window.clearTimeout(id))
      observer?.disconnect()
      slots.forEach(hideNewsReveal)
    }
  }, [observeKey])
}

/**
 * Một hàng tin (cặp 2 card) — hiện/ẩn cùng lúc.
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.revealClassName]
 */
export function NewsRevealSlot({ children, className, revealClassName }) {
  return (
    <div data-news-reveal className={cn('news-reveal-slot', className)}>
      <div className={cn('news-mobile-reveal', revealClassName)}>
        {children}
      </div>
    </div>
  )
}
