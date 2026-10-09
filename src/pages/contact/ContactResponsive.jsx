import { useLayoutEffect, useRef } from 'react'
import rectFull from '@assets/Rectangle-full.png'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { cn } from '@utils'
import { ContactCard } from './ContactCard'
import { CONTACT_ITEMS } from './contactData'

const REVEAL_STAGGER_MS = 600
const REVEAL_START_MS = 100

/**
 * Nền mobile (brand-soft + chấm) — đồng bộ home/awards mobile.
 * @param {object} props
 * @param {string} [props.className]
 */
function ContactMobileBackdrop({ className }) {
  return (
    <div aria-hidden className={cn('overflow-hidden bg-brand-soft', className)}>
      <div className="absolute left-[-65px] top-[8%] flex h-[min(72vw,300px)] w-[min(52vw,210px)] items-center justify-start overflow-visible">
        <img
          src={rectFull}
          alt=""
          className="h-auto w-[min(110vw,520px)] max-w-none translate-x-[-50%] rotate-[330deg] object-contain opacity-85 pt-[80%]"
        />
      </div>
      <img
        src={rectFull}
        alt=""
        className="absolute right-0 top-[40%] h-auto w-[min(90vw,380px)] max-w-none translate-x-[50%] object-contain opacity-85"
      />
    </div>
  )
}

/** Cascade hiện từng phần khi vào trang (trang khóa scroll — không dùng IntersectionObserver). */
function useContactMobileReveal() {
  const rootRef = useRef(/** @type {HTMLElement | null} */ (null))

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const items = /** @type {HTMLElement[]} */ (
      Array.from(root.querySelectorAll('[data-contact-reveal]'))
    )
    if (items.length === 0) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      items.forEach(el => el.classList.add('is-revealed'))
      return
    }

    const timers = items.map((el, index) =>
      window.setTimeout(
        () => el.classList.add('is-revealed'),
        REVEAL_START_MS + index * REVEAL_STAGGER_MS
      )
    )

    return () => {
      timers.forEach(id => window.clearTimeout(id))
    }
  }, [])

  return rootRef
}

/** Mobile & tablet — 3 thẻ + copyright cuối, không panel tím LIÊN HỆ. */
export function ContactResponsive() {
  const rootRef = useContactMobileReveal()

  return (
    <PageShell className="home-mobile-shell relative h-dvh max-h-dvh overflow-hidden">
      <ContactMobileBackdrop className="pointer-events-none fixed inset-0 z-0" />
      <Header variant="fixed" layout="mobile" />

      <main
        ref={rootRef}
        className="relative z-10 flex h-dvh max-h-dvh flex-col overflow-hidden pt-[15%]"
      >
        {/*
          Khóa scroll ở main; bên trong overflow-visible
          để icon tròn (translate xuống dưới thẻ) không bị cắt.
        */}
        <section className="home-mobile-section flex min-h-0 flex-1 flex-col justify-center overflow-visible py-6 sm:py-8">
          <div className="home-mobile-content flex min-h-0 w-full min-w-0 flex-1 flex-col justify-center overflow-visible">
            <div className="flex min-h-0 min-w-0 flex-col justify-center gap-6 overflow-visible pb-4 sm:gap-5">
              {CONTACT_ITEMS.map(item => (
                <ContactCard key={item.id} item={item} variant="mobile" />
              ))}
            </div>

            <p
              className="home-mobile-reveal mt-8 shrink-0 text-center font-body text-[10px] font-medium uppercase leading-relaxed tracking-[0.04em] text-brand-home1/50 sm:mt-10 sm:text-[12px]"
              data-contact-reveal
            >
              <span className="block">© 2026 BẢN QUYỀN THUỘC VỀ</span>
              <span className="block">DIỄN VIÊN LÊ KHÁNH</span>
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  )
}

export const ContactMobile = ContactResponsive
