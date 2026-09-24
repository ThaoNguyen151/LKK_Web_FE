import { useLayoutEffect, useRef, useState } from 'react'
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
  HOME_INTRO,
  HOME_STATS,
  SOCIAL_PROFILES,
} from './homeData'

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 */
function MobileSection({ children, className }) {
  return (
    <section
      className={cn('home-mobile-section pb-8 sm:pb-10 md:pb-12', className)}
    >
      <div className="home-mobile-content">{children}</div>
    </section>
  )
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
    <section className="relative pb-8 pt-0 sm:pb-10">
      {/*
        Stage = khung full-bleed cố định (không dịch cả khối).
        Ảnh / chữ / tag mỗi lớp absolute hoặc wrap riêng — chỉnh class tương ứng.
      */}
      <div className="home-mobile-hero-stage">
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

        {/* Tag — vị trí riêng, không phụ thuộc ảnh */}
        <div className="home-mobile-hero-tag home-mobile-hero-tag--actor">
          <Tag># DIỄN VIÊN</Tag>
        </div>
        <div className="home-mobile-hero-tag home-mobile-hero-tag--dob">
          <Tag variant="light">22/12/1981</Tag>
        </div>
        <div className="home-mobile-hero-tag home-mobile-hero-tag--artist">
          <Tag># NGHỆ SĨ</Tag>
        </div>
        <div className="home-mobile-hero-tag home-mobile-hero-tag--name">
          <Tag variant="light">LÊ KIM KHÁNH</Tag>
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
    </section>
  )
}

function TreasureSection() {
  return (
    <MobileSection className="mt-30">
      <h2 className="heading-display mb-3 ml-3 text-left leading-[1.05] sm:mb-4">
        KHO TÀNG
        <br />
        NGHỆ THUẬT
      </h2>

      <p className="mx-auto mb-6 max-w-prose text-center font-body text-[clamp(0.8125rem,3.4vw,0.9375rem)] leading-relaxed text-gray-700">
        {HOME_INTRO}
      </p>

      <div className="flex items-stretch gap-3 sm:gap-4">
        <div className="w-[42%] shrink-0 overflow-hidden rounded-2xl bg-[#e8dff5] shadow-[0_8px_24px_rgba(90,59,196,0.12)] sm:w-[44%]">
          <img
            src={imageHome2}
            alt="Lê Khánh"
            className="h-full min-h-[148px] w-full object-cover object-top sm:min-h-[170px]"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-1 sm:gap-4">
          {HOME_STATS.map(stat => (
            <div key={stat.label}>
              <div className="font-body text-[clamp(1.5rem,6vw,2rem)] leading-none">
                <span className="text-black">{stat.value}</span>
                <span className="text-brand-home1">+</span>
              </div>
              <div className="mt-0.5 font-body text-[clamp(0.625rem,2.8vw,0.75rem)] uppercase tracking-wide text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileSection>
  )
}

function AwardsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = HOME_AWARDS[activeIndex]

  return (
    <MobileSection>
      <div className="mb-4 flex justify-center gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {HOME_AWARDS.map((award, index) => (
          <button
            key={award.id}
            type="button"
            aria-label={award.title.replace('\n', ' ')}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all sm:h-13 sm:w-13',
              index === activeIndex
                ? 'bg-white shadow-[0_4px_16px_rgba(90,59,196,0.18)] ring-1 ring-brand-home1/15'
                : 'bg-white/50 opacity-75'
            )}
          >
            <img
              src={award.cup}
              alt=""
              className="h-7 w-auto object-contain sm:h-8"
            />
          </button>
        ))}
      </div>

      <div className="home-mobile-glass-card border border-white/70 bg-white/50 p-5 shadow-[0_8px_30px_rgba(90,59,196,0.14)] backdrop-blur-sm sm:p-6">
        <h3 className="font-display-medium mb-4 whitespace-pre-line text-center font-display text-[clamp(1.75rem,7vw,2.25rem)] italic leading-tight text-brand-home1">
          {active.title}
        </h3>

        <div className="flex items-end justify-between gap-3">
          <div
            className={cn(
              'grid min-w-0 gap-x-5 gap-y-2',
              active.years.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
            )}
          >
            {active.years.map(year => (
              <a
                key={year}
                href={awardYearHref(year)}
                className="font-body text-sm text-black transition-colors hover:text-brand-home1 sm:text-base"
              >
                {year}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-end gap-1">
            <span className="home-mobile-award-count font-display text-brand-cup">
              {active.count}
            </span>
            <img
              src={active.cup}
              alt=""
              className="h-14 w-auto object-contain sm:h-16"
            />
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

  return (
    <article className="home-mobile-glass-card relative overflow-visible border border-brand-home1/35 bg-white/55 shadow-[0_8px_28px_rgba(90,59,196,0.12)] backdrop-blur-sm">
      {/* Icon MXH đè mép card */}
      <div
        className={cn(
          'absolute top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2',
          iconsOnLeft ? '-left-3' : '-right-3'
        )}
      >
        {profile.links.map(
          /** @param {{ label: string, href: string, icon: string }} link */
          link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-home1 bg-white shadow-[0_4px_12px_rgba(90,59,196,0.18)] transition-colors hover:bg-brand-home1"
            >
              <img src={link.icon} alt="" className="h-4 w-4 object-contain" />
            </a>
          )
        )}
      </div>

      <div className="relative flex min-h-[160px] items-stretch overflow-hidden rounded-[inherit] sm:min-h-[175px]">
        <div className="relative min-w-0 flex-1">
          <img
            src={profile.image}
            alt=""
            className={cn(
              'absolute bottom-0 h-[90%] w-auto max-w-[62%] object-contain object-bottom',
              profile.imageSide === 'right' ? 'right-0' : 'left-0'
            )}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-20 bg-gradient-to-t from-white/90 via-white/40 to-transparent"
            aria-hidden
          />
          <p
            className={cn(
              'absolute bottom-3 z-10 whitespace-pre-line px-3 font-body text-[clamp(0.75rem,3.2vw,0.875rem)] font-bold leading-snug text-brand-home1',
              profile.imageSide === 'right'
                ? 'left-3 max-w-[52%]'
                : 'right-3 max-w-[52%] text-right'
            )}
          >
            {profile.name}
          </p>
        </div>
      </div>
    </article>
  )
}

function SocialSection() {
  return (
    <MobileSection>
      <h2 className="heading-section mb-5 text-center">MẠNG XÃ HỘI</h2>

      <div className="flex flex-col gap-5 px-1 sm:gap-6">
        {SOCIAL_PROFILES.map(profile => (
          <SocialProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </MobileSection>
  )
}

function FavoriteSection() {
  return (
    <MobileSection className="pb-8 sm:pb-10">
      <h2 className="heading-section mb-5 text-center">FAVORITE</h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {FANPAGE_DATA.map(page => (
          <a
            key={page.name}
            href={page.href}
            target="_blank"
            rel="noopener noreferrer"
            className="home-mobile-glass-card flex min-h-[11rem] flex-col border border-white/80 bg-white/60 p-3 shadow-[0_6px_24px_rgba(90,59,196,0.1)] backdrop-blur-sm transition-colors hover:border-brand-home1/40 sm:min-h-[12rem] sm:p-3.5"
          >
            <img
              src={page.avatar}
              alt={page.name.replace('\n', ' ')}
              className="mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-purple-200/60 sm:h-[4.5rem] sm:w-[4.5rem]"
            />
            <h3 className="mt-3 flex-1 whitespace-pre-line text-center font-body text-[clamp(0.625rem,2.8vw,0.75rem)] font-bold leading-snug text-brand-home1">
              {page.name}
            </h3>
            <span className="mt-3 inline-flex items-center justify-center gap-1 font-body text-[10px] font-semibold uppercase tracking-wide text-brand-orange">
              Theo dõi
              <img src={warrow} alt="" className="h-3 w-3" />
            </span>
          </a>
        ))}
      </div>
    </MobileSection>
  )
}

/** Mobile & tablet (< lg) — bố cục theo mockup. */
export function HomeResponsive() {
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
