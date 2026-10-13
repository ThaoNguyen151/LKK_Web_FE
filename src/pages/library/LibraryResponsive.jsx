import { useEffect, useMemo, useState } from 'react'
import rectFull from '@assets/Rectangle-full.png'
import { Header } from '@components/common'
import { BackToTopButton } from '@components/icon'
import { PageShell } from '@layouts'
import { cn } from '@utils'
import { fetchLibraryImages } from './libraryData'
import { LibraryLightbox } from './LibraryLightbox'

const SCROLL_TOP_THRESHOLD = 120

/**
 * @param {object} props
 * @param {string} [props.className]
 */
function LibraryMobileBackdrop({ className }) {
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

/**
 * Card masonry mobile — bo góc + viền tím nhạt (theo mockup).
 * Không dùng CSS columns (WebKit hay nuốt / để trống ảnh ngang ngắn).
 * @param {object} props
 * @param {import('./libraryData').LibraryImage} props.item
 * @param {() => void} props.onOpen
 * @param {boolean} [props.priority]
 */
function LibraryCardMobile({ item, onOpen, priority = false }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="block w-full overflow-hidden rounded-[1.15rem] border border-brand-home1/35 bg-white/80 text-left shadow-[0_2px_12px_rgba(90,59,196,0.06)] transition-opacity active:opacity-90"
    >
      <img
        src={item.src}
        alt={item.alt ?? ''}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="block h-auto w-full max-w-full"
      />
    </button>
  )
}

/**
 * Chia 2 cột xen kẽ — ảnh ngang/ngắn vẫn hiện (tránh bug CSS columns trên iOS).
 * @param {import('./libraryData').LibraryImage[]} items
 */
function splitIntoColumns(items) {
  /** @type {{ item: import('./libraryData').LibraryImage, index: number }[]} */
  const left = []
  /** @type {{ item: import('./libraryData').LibraryImage, index: number }[]} */
  const right = []
  items.forEach((item, index) => {
    ;(index % 2 === 0 ? left : right).push({ item, index })
  })
  return { left, right }
}

/** Mobile — masonry 2 cột, lề = contact/home, không tiêu đề desktop. */
export function LibraryResponsive() {
  const [items, setItems] = useState(
    /** @type {import('./libraryData').LibraryImage[]} */ ([])
  )
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [activeIndex, setActiveIndex] = useState(
    /** @type {number | null} */ (null)
  )

  useEffect(() => {
    let cancelled = false
    fetchLibraryImages().then(list => {
      if (!cancelled) {
        setItems(list)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      setScrolled(y > SCROLL_TOP_THRESHOLD)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const activeItem =
    activeIndex != null && items[activeIndex] ? items[activeIndex] : null

  const columns = useMemo(() => splitIntoColumns(items), [items])

  return (
    <PageShell className="home-mobile-shell relative overflow-x-clip">
      <LibraryMobileBackdrop className="pointer-events-none fixed inset-0 z-0" />
      <Header variant="fixed" layout="mobile" />

      <BackToTopButton
        show={scrolled}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <main className="relative z-10 min-h-dvh pt-[20%]">
        <section className="home-mobile-section pb-12 pt-4 sm:pb-14 sm:pt-5">
          <div className="home-mobile-content">
            {loading ? (
              <p className="font-body text-sm text-gray-500">Đang tải ảnh…</p>
            ) : items.length === 0 ? (
              <p className="font-body text-sm text-gray-500">
                Chưa có ảnh trong thư viện.
              </p>
            ) : (
              <div className="flex items-start gap-3">
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  {columns.left.map(({ item, index }) => (
                    <LibraryCardMobile
                      key={item.id}
                      item={item}
                      priority={index < 4}
                      onOpen={() => setActiveIndex(index)}
                    />
                  ))}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  {columns.right.map(({ item, index }) => (
                    <LibraryCardMobile
                      key={item.id}
                      item={item}
                      priority={index < 4}
                      onOpen={() => setActiveIndex(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <LibraryLightbox
        item={activeItem}
        onClose={() => setActiveIndex(null)}
        hasPrev={activeIndex != null && activeIndex > 0}
        hasNext={activeIndex != null && activeIndex < items.length - 1}
        onPrev={() =>
          setActiveIndex(index =>
            index != null && index > 0 ? index - 1 : index
          )
        }
        onNext={() =>
          setActiveIndex(index =>
            index != null && index < items.length - 1 ? index + 1 : index
          )
        }
      />
    </PageShell>
  )
}

export const LibraryMobile = LibraryResponsive
