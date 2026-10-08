import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import imageHome1 from '@assets/image_home_1.png'
import imageHome2 from '@assets/image_home_2.png'
import imageTextHome1 from '@assets/images/mobile/home/textlekhanh.png'
import rectFull from '@assets/Rectangle-full.png'
import warrow from '@assets/images/subicon/iconWarrow.png'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { cn } from '@utils'
import {
  awardYearHref,
  FANPAGE_DATA,
  HOME_AWARDS,
  HOME_INTRO_LINES,
  HOME_STATS,
  SOCIAL_PROFILES,
} from './homeData'

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {number} props.sectionIndex
 * @param {string} [props.className]
 */
function MobileSection({ children, sectionIndex, className }) {
  return (
    <section
      className={cn('home-mobile-section pb-8 sm:pb-10 md:pb-12', className)}
      data-home-section={sectionIndex}
    >
      <div
        className="home-mobile-content home-section-content"
        data-home-section-content
      >
        {children}
      </div>
    </section>
  )
}

/** Scroll reveal — xuống: hiện từ dưới; lên: hiện từ trên (dùng chung CSS desktop). */
function useHomeMobileReveal() {
  useLayoutEffect(() => {
    const sections = /** @type {HTMLElement[]} */ (
      Array.from(document.querySelectorAll('[data-home-section]')).filter(el =>
        el.closest('.home-mobile-shell')
      )
    )
    if (sections.length === 0) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    /** @type {'forward' | 'reverse'} */
    let scrollDir = 'forward'
    let lastScrollY = window.scrollY || window.pageYOffset
    /** @type {Record<number, boolean>} */
    const inViewState = {}

    /**
     * @param {HTMLElement} sectionEl
     * @param {boolean} inView
     * @param {'forward' | 'reverse'} direction
     */
    const syncInView = (sectionEl, inView, direction) => {
      sectionEl.classList.toggle('home-section-inview', inView)

      const content = sectionEl.querySelector('[data-home-section-content]')
      if (!(content instanceof HTMLElement)) return

      if (reducedMotion) {
        content.classList.remove(
          'anim-enter-up',
          'anim-enter-down',
          'anim-exit-up',
          'anim-exit-down'
        )
        content.classList.add('is-inview')
        content.style.opacity = '1'
        content.style.transform = 'none'
        return
      }

      content.classList.remove(
        'anim-enter-up',
        'anim-enter-down',
        'anim-exit-up',
        'anim-exit-down',
        'is-inview'
      )
      void content.offsetWidth

      if (inView) {
        content.classList.add(
          direction === 'forward' ? 'anim-enter-up' : 'anim-enter-down',
          'is-inview'
        )
      } else {
        content.classList.add(
          direction === 'forward' ? 'anim-exit-up' : 'anim-exit-down'
        )
      }
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
          const index = Number(
            /** @type {HTMLElement} */ (entry.target).dataset.homeSection
          )
          const nowInView = entry.isIntersecting
          if (inViewState[index] !== nowInView) {
            inViewState[index] = nowInView
            syncInView(
              /** @type {HTMLElement} */ (entry.target),
              nowInView,
              scrollDir
            )
          }
        })
      },
      {
        root: null,
        threshold: [0.12, 0.22, 0.35],
        rootMargin: '0px 0px -6% 0px',
      }
    )

    window.addEventListener('scroll', onScroll, { passive: true })

    sections.forEach(section => {
      observer.observe(section)
      const rect = section.getBoundingClientRect()
      const visible = rect.top < window.innerHeight * 0.85 && rect.bottom > 48
      if (visible) {
        const index = Number(section.dataset.homeSection)
        inViewState[index] = true
        syncInView(section, true, 'forward')
      }
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}

/** Từng .home-mobile-reveal hiện khi chính nó vào viewport (không bung cả section). */
function useHomeMobileRevealItems() {
  useLayoutEffect(() => {
    const items = /** @type {HTMLElement[]} */ (
      Array.from(
        document.querySelectorAll('.home-mobile-shell [data-home-reveal]')
      )
    )
    if (items.length === 0) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      items.forEach(el => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('is-revealed', entry.isIntersecting)
        })
      },
      {
        root: null,
        threshold: [0, 0.18, 0.35],
        // Phải vào vùng giữa màn mới hiện — tránh vừa chạm mép dưới là bung hết
        rootMargin: '0px 0px -22% 0px',
      }
    )

    items.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/**
 * Nền mobile (brand-soft + chấm). Dùng fixed cho trang; absolute + offset cho blur mép ảnh.
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 */
function MobileRectBackdrop({ className, style }) {
  return (
    <div
      aria-hidden
      className={cn('overflow-hidden bg-brand-soft', className)}
      style={style}
    >
      <div className="absolute left-[-65px] top-[8%] flex h-[min(72vw,300px)] w-[min(52vw,210px)] items-center justify-start overflow-visible sm:top-[6%] sm:h-[min(62vw,340px)] sm:w-[min(46vw,230px)]">
        <img
          src={rectFull}
          alt=""
          className="h-auto w-[min(110vw,520px)] rotate-[330deg] pt-[80%] max-w-none translate-x-[-50%] object-contain opacity-85 sm:w-[min(140vw,580px)]"
        />
      </div>
      <img
        src={rectFull}
        alt=""
        className="h-auto w-[min(90vw,380px)] pt-[100%] right-0 max-w-none translate-x-[50%] object-contain opacity-85 sm:w-[min(90vw,380px)]"
      />
    </div>
  )
}

/**
 * Blur mép dưới ảnh: clone nền viewport (khớp màu + chấm), mask phớt.
 * Nằm trong photo-wrap → dịch ảnh thì dải blur đi theo, màu luôn khớp nền phía sau.
 */
function HeroPhotoFade() {
  const stripRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [origin, setOrigin] = useState({ top: 0, left: 0 })

  useLayoutEffect(() => {
    const update = () => {
      const rect = stripRef.current?.getBoundingClientRect()
      if (!rect) return
      setOrigin({ top: rect.top, left: rect.left })
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    const ro = new ResizeObserver(update)
    if (stripRef.current) ro.observe(stripRef.current)
    const parent = stripRef.current?.parentElement
    if (parent) ro.observe(parent)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
      ro.disconnect()
    }
  }, [])

  const mask = 'linear-gradient(to top, #000 0%, #000 35%, transparent 100%)'

  return (
    <div
      ref={stripRef}
      aria-hidden
      className="home-mobile-hero-photo-fade"
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    >
      <MobileRectBackdrop
        className="absolute blur-[5px]"
        style={{
          top: -origin.top,
          left: -origin.left,
          width: '100vw',
          height: '100dvh',
        }}
      />
    </div>
  )
}

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {'orange' | 'light'} [props.variant]
 * @param {string} [props.className]
 */
function Tag({ children, variant = 'orange', className }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full pt-2 px-4.5 py-2 font-body text-[12px] font-semibold tracking-wide sm:text-[12px]',
        variant === 'orange'
          ? 'bg-brand-orange text-white shadow-[0_3px_25px_rgba(90,59,196,0.25)]'
          : 'bg-white/20 text-brand-home1 shadow-[0_3px_25px_rgba(90,59,196,0.25)]',
        className
      )}
    >
      {children}
    </span>
  )
}

function HeroSection() {
  return (
    <section className="relative pb-8 pt-0 sm:pb-10" data-home-section={0}>
      {/*
        Stage = khung full-bleed cố định (không dịch cả khối).
        Ảnh / chữ / tag mỗi lớp absolute hoặc wrap riêng — chỉnh class tương ứng.
        Tag nằm ngoài home-section-content để cascade riêng (không bị opacity cha).
      */}
      <div className="home-mobile-hero-stage">
        <div className="home-section-content" data-home-section-content>
          {/* Chỉ chỉnh .home-mobile-hero-photo-wrap để dịch ảnh */}
          <div className="home-mobile-hero-photo-wrap">
            <img
              src={imageHome1}
              alt="Lê Khánh"
              className="home-mobile-hero-photo"
            />
            {/* Blur mép dưới = clone nền; theo ảnh khi dịch chuyển */}
            <HeroPhotoFade />
          </div>

          {/* Chỉ chỉnh .home-mobile-hero-title-wrap để dịch chữ */}
          <div className="home-mobile-hero-title-wrap">
            <img
              src={imageTextHome1}
              alt="Lê Khánh"
              className="home-mobile-hero-title"
            />
          </div>
        </div>

        {/* Tag — trên → dưới: dob → actor → artist → name */}
        <div className="home-mobile-hero-tag home-mobile-hero-tag--dob">
          <Tag variant="light">22/12/1981</Tag>
        </div>
        <div className="home-mobile-hero-tag home-mobile-hero-tag--actor">
          <Tag># DIỄN VIÊN</Tag>
        </div>
        <div className="home-mobile-hero-tag home-mobile-hero-tag--artist">
          <Tag># NGHỆ SĨ</Tag>
        </div>
        <div className="home-mobile-hero-tag home-mobile-hero-tag--name">
          <Tag variant="light">LÊ KIM KHÁNH</Tag>
        </div>
      </div>
    </section>
  )
}

function TreasureSection() {
  return (
    <MobileSection sectionIndex={1} className="mt-40">
      {/* Mỗi khối tự hiện khi lướt tới — không bung cả section */}
      <h2
        className="home-mobile-reveal heading-display mb-3 text-left text-[36px] leading-[1.05]"
        data-home-reveal
      >
        KHO TÀNG
        <br />
        NGHỆ THUẬT
      </h2>

      <p
        className="home-mobile-reveal mb-7 mt-5 text-left font-body text-[13px] leading-relaxed tracking-[-0.01em] text-gray-700"
        data-home-reveal
      >
        {HOME_INTRO_LINES.map(line => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      <div className="relative">
        {/* Block = đúng bề ngang khung ảnh → stats neo theo ảnh, không theo full màn */}
        <div className="home-mobile-treasure-block">
          <div
            className="home-mobile-reveal home-mobile-treasure-frame"
            data-home-reveal
          >
            <img
              src={imageHome2}
              alt="Lê Khánh"
              className="home-mobile-treasure-photo"
            />
          </div>

          <div className="home-mobile-treasure-stats">
            {HOME_STATS.map(stat => (
              <div
                key={stat.label}
                className="home-mobile-reveal rounded-2xl border border-white border-[1.5px] bg-white/20 text-center backdrop-blur-md"
                data-home-reveal
              >
                <div className="home-mobile-treasure-stat-value mb-1 font-body text-[28px] leading-none">
                  <span className="text-black">{stat.value}</span>
                  <span className="text-brand-home1">+</span>
                </div>
                <div className="home-mobile-treasure-stat-label mt-1 font-body text-[9px] uppercase tracking-wide text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileSection>
  )
}

function AwardsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = HOME_AWARDS[activeIndex]

  // Tự chuyển tab mỗi 3s; bấm tay sẽ reset chu kỳ
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex(i => (i + 1) % HOME_AWARDS.length)
    }, 3000)
    return () => window.clearInterval(id)
  }, [activeIndex])

  return (
    <MobileSection sectionIndex={2}>
      {/* mt chừa chỗ cúp nhô trên khung */}
      <div className="relative mt-40 mb-5">
        {/*
          Reveal 1: 4 nút cúp → Reveal 2: khung + nội dung chung 1 lượt.
        */}
        <div
          className="home-mobile-reveal absolute inset-x-0 top-0 z-20 flex h-[5.7rem] -translate-y-[75px] items-start justify-center gap-[20px]"
          data-home-reveal
        >
          {HOME_AWARDS.map((award, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={award.id}
                type="button"
                aria-label={award.title.replace('\n', ' ')}
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'group flex shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out',
                  isActive
                    ? 'h-[6.5rem] w-14 bg-white/80 px-2 py-3 shadow-[0_8px_22px_rgba(90,59,196,0.24)] ring-[1.5px] ring-white hover:bg-white hover:shadow-[0_10px_28px_rgba(90,59,196,0.32)]'
                    : 'h-14 w-14 bg-white/25 px-2 py-2.5 opacity-90 ring-[1.5px] ring-white hover:bg-white/55 hover:opacity-100 hover:shadow-[0_4px_14px_rgba(90,59,196,0.18)] sm:h-16 sm:w-16'
                )}
              >
                <img
                  src={award.cup}
                  alt=""
                  className={cn(
                    'w-auto origin-top object-contain transition-all duration-300 ease-out group-hover:scale-105',
                    isActive ? 'h-21' : 'h-11'
                  )}
                />
              </button>
            )
          })}
        </div>

        {/* Khung + nội dung — 1 lượt reveal */}
        <div
          className="home-mobile-reveal relative z-0 h-[22rem] overflow-hidden rounded-[1.5rem] sm:h-[26rem]"
          style={{ borderRadius: '1.5rem' }}
          data-home-reveal
        >
          <div
            className="absolute inset-0 bg-brand-home1/10 backdrop-blur-sm"
            aria-hidden
          />
          <div className="relative z-[1] flex h-full flex-col px-5 pb-6 pt-13 sm:px-7 sm:pb-4 sm:pt-12">
            <h3 className="font-display-medium h-[5rem] shrink-0 overflow-hidden whitespace-pre-line text-left font-display text-[36px] italic leading-[1.15] text-brand-home1 sm:h-[5.25rem]">
              {active.title}
            </h3>

            <div className="relative min-h-0 flex-1">
              {/* Năm — lơ lửng giữa khối nội dung */}
              <div
                className={cn(
                  'absolute left-[3%] top-[30%] grid min-w-0 -translate-y-1/2 gap-x-7 gap-y-6',
                  active.id !== 'htv' && active.years.length > 1
                    ? 'grid-cols-2'
                    : 'grid-cols-1'
                )}
              >
                {active.years.map(year => (
                  <a
                    key={year}
                    href={awardYearHref(year)}
                    className="font-body text-[13px] text-center transition-colors hover:text-brand-home1 sm:text-lg"
                  >
                    {year}
                  </a>
                ))}
              </div>

              {/* Cúp + số — Liên hoan phim/sân khấu: gap số↔cúp lớn hơn */}
              <div
                className={cn(
                  'absolute bottom-0 right-0 flex items-end',
                  active.id === 'san-khau' || active.id === 'phim-vn'
                    ? 'gap-2'
                    : 'gap-0'
                )}
              >
                <span className="home-mobile-award-count -translate-y-1 font-display text-[115px] leading-none text-brand-cup">
                  {active.count}
                </span>
                <img
                  src={active.cup}
                  alt=""
                  className="h-48 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileSection>
  )
}

/**
 * @param {object} props
 * @param {typeof SOCIAL_PROFILES[number]} props.profile
 */
function SocialProfileCard({ profile }) {
  const iconsOnLeft = profile.iconSide === 'left'
  const imageOnRight = profile.imageSide === 'right'
  // Card 1: cạnh phải tím nguyên; card 2: cạnh trái tím nguyên
  const borderOnlyGradient = iconsOnLeft
    ? 'linear-gradient(to right, #ffffff 0%, #ffffff 25%,  #5A3BC4 100%)'
    : 'linear-gradient(to right, #5A3BC4 0%, #ffffff 75%, #ffffff 100%)'

  return (
    <article
      className={cn(
        'home-mobile-reveal relative overflow-visible',
        iconsOnLeft ? 'ml-auto w-[92%]' : 'mr-auto w-[92%]'
      )}
      data-home-reveal
    >
      {/* pt cố định = phần ảnh tràn trên khung — không đổi theo độ rộng màn */}
      <div className="relative pt-[70px]">
        <div className="relative h-[230px] overflow-visible">
          {/* 3 nút đè nửa mép khung trắng */}
          <div
            className={cn(
              'absolute z-20 flex flex-col gap-2',
              iconsOnLeft
                ? 'left-0 top-[32%] -translate-x-1/2'
                : 'right-0 top-[-11%] translate-x-1/2'
            )}
          >
            {profile.links.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-brand-home1 bg-white/80 shadow-[0_4px_14px_rgba(90,59,196,0.14)] transition-colors hover:bg-brand-home1/5"
              >
                <img
                  src={link.icon}
                  alt=""
                  className="h-6 w-6 object-contain"
                />
              </a>
            ))}
          </div>

          {/* Khung: overflow + rounded 1.5rem (giống awards/treasure) */}
          <div
            className="absolute inset-0 z-0 overflow-hidden rounded-[1.5rem] shadow-[0_10px_35px_rgba(90,59,196,0.1)]"
            style={{ borderRadius: '1.5rem' }}
          >
            <div className="absolute inset-0 bg-white/15" aria-hidden />

            {/* Viền gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[4] rounded-[1.5rem]"
              style={{
                borderRadius: '1.5rem',
                padding: 1.5,
                background: borderOnlyGradient,
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />

            {/* Fade đáy cũng phải nhạt — trước từ trắng đục che mất bg-white/15 */}
            <div
              className="pointer-events-none absolute bottom-[2px] left-[2px] right-[2px] z-[7] h-24 rounded-b-[1.35rem] bg-gradient-to-t from-white/25 via-white/10 to-transparent"
              aria-hidden
            />

            <p
              className={cn(
                'absolute z-10 max-w-[80%] whitespace-pre-line px-5 font-body text-[15px] font-bold leading-snug text-brand-home1 sm:text-sm',
                imageOnRight ? 'left-0 top-4' : 'bottom-4 left-0'
              )}
            >
              {profile.name}
            </p>
          </div>

          {/* Ảnh ngoài khung clip — vẫn tràn trên */}
          <img
            src={profile.image}
            alt=""
            className={cn(
              'pointer-events-none absolute z-[6] w-auto object-contain object-bottom',
              profile.imageClassName
            )}
          />
        </div>
      </div>
    </article>
  )
}

function SocialSection() {
  return (
    <MobileSection sectionIndex={3}>
      {/* Reveal: title → từng card tuần tự khi lướt tới */}
      <h2
        className="home-mobile-reveal heading-section mb-[-5px] mt-6 text-[36px] text-center"
        data-home-reveal
      >
        MẠNG XÃ HỘI
      </h2>

      {/* gap cố định giữa 2 card — lề ngang theo home-mobile-content (= Treasure) */}
      <div className="flex flex-col gap-6">
        {SOCIAL_PROFILES.map(profile => (
          <SocialProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </MobileSection>
  )
}

function FavoriteSection() {
  return (
    <MobileSection sectionIndex={4} className="mt-10 mb-1">
      {/* Reveal: title → lưới card chung 1 lượt */}
      <h2
        className="home-mobile-reveal heading-section mb-8 text-[36px] text-center"
        data-home-reveal
      >
        FANSITE
      </h2>

      <div
        className="home-mobile-reveal grid grid-cols-2 gap-3"
        data-home-reveal
      >
        {FANPAGE_DATA.map(page => (
          <a
            key={page.name}
            href={page.href}
            target="_blank"
            rel="noopener noreferrer"
            className="home-mobile-glass-card flex min-h-[11rem] flex-col border-[1.5px] border-white/80 bg-white/20 px-2 py-4 transition-colors"
          >
            <img
              src={page.avatar}
              alt={page.name.replace('\n', ' ')}
              className="mx-auto h-20 w-20 rounded-full object-cover"
            />
            <h3
              className="mx-auto mt-3.5 w-[87%] flex-1 whitespace-pre-line text-center font-body text-[15px] font-bold leading-relaxed text-brand-home1"
              style={{ wordSpacing: '-0.08em' }}
            >
              {page.name}
            </h3>
            <span className="mt-2 inline-flex items-center justify-center gap-1 font-body text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              Theo dõi
              <img
                src={warrow}
                alt=""
                className="h-3 w-3 brightness-0 opacity-50"
              />
            </span>
          </a>
        ))}
      </div>
    </MobileSection>
  )
}

/** Mobile & tablet (< lg) — bố cục theo mockup. */
export function HomeResponsive() {
  useHomeMobileReveal()
  useHomeMobileRevealItems()

  return (
    <PageShell className="home-mobile-shell relative overflow-x-clip">
      <MobileRectBackdrop className="pointer-events-none fixed inset-0 z-0" />
      <Header variant="fixed" layout="mobile" />

      <main className="relative z-10 w-full min-w-0 pt-15">
        <HeroSection />
        <TreasureSection />
        <AwardsSection />
        <SocialSection />
        <FavoriteSection />
      </main>
    </PageShell>
  )
}

export const HomeMobile = HomeResponsive
