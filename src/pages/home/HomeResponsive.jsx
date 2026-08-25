import { useEffect, useState } from 'react'
import logo from '@assets/logo.png'
import imageHome1 from '@assets/image_home_1.png'
import imageHome2 from '@assets/image_home_2.png'
import imageHome4 from '@assets/image_home_4.png'
import imageTextHome1 from '@assets/images/le-khanh.png'
import warrow from '@assets/images/subicon/iconWarrow.png'
import { PageShell } from '@layouts'
import { cn, ROUTES } from '@utils'
import {
  awardYearHref,
  FANPAGE_DATA,
  HOME_AWARDS,
  HOME_INTRO,
  HOME_STATS,
  SOCIAL_PROFILES,
} from './homeData'

const NAV_LINKS = [
  { label: 'HOẠT ĐỘNG', href: ROUTES.ACTIVITIES },
  { label: 'THƯ VIỆN', href: ROUTES.LIBRARY },
  { label: 'GIẢI THƯỞNG', href: ROUTES.AWARDS },
  { label: 'TIN TỨC', href: ROUTES.NEWS },
]

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

function PurpleBlobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -left-16 top-20 h-48 w-48 rounded-full bg-brand-home1/15 blur-3xl sm:h-56 sm:w-56" />
      <div className="absolute -right-8 top-[36%] h-44 w-44 rounded-full bg-brand-home1/10 blur-3xl sm:h-52 sm:w-52" />
      <div className="absolute bottom-24 left-1/4 h-56 w-56 rounded-full bg-brand-home1/12 blur-3xl sm:h-64 sm:w-64" />
    </div>
  )
}

function MobileHomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [route, setRoute] = useState(
    () => window.location.hash.slice(1) || ROUTES.HOME
  )

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash.slice(1) || ROUTES.HOME)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <div className="home-mobile-header-spacer" aria-hidden />

      <header className="fixed left-0 right-0 top-0 z-50 bg-white/90 shadow-[0_0_10px_5px_rgba(90,59,196,0.06)] backdrop-blur-md">
        <div className="home-mobile-header-inner flex items-start justify-between pb-2">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <a href={`#${ROUTES.HOME}`} aria-label="Về trang chủ">
              <img
                src={logo}
                alt="LK Logo"
                className="h-8 w-auto sm:h-9 md:h-10"
              />
            </a>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-brand-home1 transition-colors hover:bg-purple-100 sm:h-10 sm:w-10"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(open => !open)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <span className="home-mobile-tag rounded-full bg-white font-body font-semibold tracking-wide text-brand-home1 shadow-sm ring-1 ring-brand-home1/15">
            22/12/1981
          </span>
        </div>

        {menuOpen && (
          <nav className="home-mobile-header-inner border-t border-purple-100 bg-white pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-md">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(link => {
                const active =
                  route === link.href || route.startsWith(`${link.href}/`)

                return (
                  <a
                    key={link.label}
                    href={`#${link.href}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'rounded-xl px-3 py-2.5 text-center font-body text-sm font-semibold uppercase tracking-wide transition-colors sm:text-base',
                      active
                        ? 'bg-brand-home1/10 text-brand-home1'
                        : 'text-brand-textheader/60 hover:bg-purple-50 hover:text-brand-home1'
                    )}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </nav>
        )}
      </header>
    </>
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
        'home-mobile-tag inline-block rounded-full font-body font-semibold tracking-wide',
        variant === 'orange'
          ? 'bg-brand-orange text-white'
          : 'bg-white/80 text-brand-home1 ring-1 ring-brand-home1/10',
        className
      )}
    >
      {children}
    </span>
  )
}

function HeroSection() {
  return (
    <MobileSection className="pb-6 pt-2 sm:pb-8 md:pt-4">
      <div className="relative">
        <div className="relative mx-auto w-fit max-w-full">
          <img
            src={imageHome1}
            alt="Lê Khánh"
            className="home-mobile-hero-photo mx-auto object-contain"
          />
          <div className="absolute left-0 top-[14%] sm:top-[16%]">
            <Tag># DIỄN VIÊN</Tag>
          </div>
          <div className="absolute right-0 top-[38%] sm:top-[40%]">
            <Tag># NGHỆ SĨ</Tag>
          </div>
        </div>

        <div className="relative mx-auto -mt-1 flex w-fit max-w-full flex-col items-center">
          <img
            src={imageTextHome1}
            alt="Lê Khánh"
            className="home-mobile-hero-title object-contain"
          />
          <div className="absolute right-[8%] top-[36%] sm:right-[12%] sm:top-[38%]">
            <Tag
              variant="light"
              className="max-w-[42vw] truncate sm:max-w-none"
            >
              LÊ KIM KHÁNH
            </Tag>
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-1.5 sm:mt-4 sm:gap-2">
          {[0, 1, 2, 3].map(index => (
            <span
              key={index}
              className={cn(
                'h-1.5 w-1.5 rounded-full border border-brand-home1/30 sm:h-2 sm:w-2',
                index === 0 && 'bg-brand-home1/70'
              )}
            />
          ))}
        </div>
      </div>
    </MobileSection>
  )
}

function TreasureSection() {
  return (
    <MobileSection>
      <h2 className="heading-display mb-3 text-center sm:mb-4">
        KHO TÀNG
        <br />
        NGHỆ THUẬT
      </h2>

      <p className="mx-auto mb-5 max-w-prose text-center font-body text-[clamp(0.8125rem,3.4vw,0.9375rem)] leading-relaxed text-gray-700 sm:mb-6">
        {HOME_INTRO}
      </p>

      <div className="home-mobile-glass-card border border-white/80 bg-white/55 p-2.5 shadow-[0_8px_30px_rgba(90,59,196,0.12)] backdrop-blur-sm sm:p-3">
        <div className="flex items-stretch gap-2.5 sm:gap-3">
          <div className="w-[38%] shrink-0 overflow-hidden rounded-2xl bg-[#e8dff5] sm:w-[42%]">
            <img
              src={imageHome2}
              alt="Lê Khánh"
              className="h-full min-h-[120px] w-full object-cover object-top sm:min-h-[140px] md:min-h-[160px]"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-1 sm:gap-3">
            {HOME_STATS.map(stat => (
              <div key={stat.label}>
                <div className="home-mobile-stat-value font-body">
                  <span className="text-black">{stat.value}</span>
                  <span className="text-brand-home1">+</span>
                </div>
                <div className="home-mobile-stat-label mt-0.5 font-body uppercase tracking-wide text-gray-600">
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

  return (
    <MobileSection>
      <div className="mb-3 flex justify-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mb-4 [&::-webkit-scrollbar]:hidden">
        {HOME_AWARDS.map((award, index) => (
          <button
            key={award.id}
            type="button"
            aria-label={award.title.replace('\n', ' ')}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all sm:h-12 sm:w-12',
              index === activeIndex
                ? 'bg-white shadow-[0_4px_16px_rgba(90,59,196,0.15)] ring-1 ring-brand-home1/15'
                : 'bg-white/40 opacity-80'
            )}
          >
            <img
              src={award.cup}
              alt=""
              className="h-6 w-auto object-contain sm:h-7"
            />
          </button>
        ))}
      </div>

      <div className="home-mobile-glass-card border border-white/70 bg-white/45 p-4 shadow-[0_8px_30px_rgba(90,59,196,0.14)] backdrop-blur-sm sm:p-5">
        <h3 className="font-display-medium mb-3 whitespace-pre-line text-center font-display text-[clamp(1.5rem,6vw,1.875rem)] italic leading-tight text-brand-home1 sm:mb-4">
          {active.title}
        </h3>

        <div className="flex items-end justify-between gap-2 sm:gap-3">
          <div
            className={cn(
              'grid min-w-0 gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2',
              active.years.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
            )}
          >
            {active.years.map(year => (
              <a
                key={year}
                href={awardYearHref(year)}
                className="font-body text-[clamp(0.8125rem,3.2vw,0.875rem)] text-black transition-colors hover:text-brand-home1"
              >
                {year}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-end gap-0.5 sm:gap-1">
            <span className="home-mobile-award-count font-display text-brand-cup">
              {active.count}
            </span>
            <img
              src={active.cup}
              alt=""
              className="h-12 w-auto object-contain sm:h-16"
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
    <article className="home-mobile-glass-card home-mobile-social-card overflow-hidden border border-white/80 bg-white/50 shadow-[0_8px_28px_rgba(90,59,196,0.12)] backdrop-blur-sm">
      <div className="relative flex h-full min-h-[inherit] items-stretch">
        {iconsOnLeft && (
          <div className="flex w-12 shrink-0 flex-col items-center justify-center gap-1.5 py-3 sm:w-14 sm:gap-2 sm:py-4">
            {profile.links.map(
              /** @param {{ label: string, href: string, icon: string }} link */
              link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-brand-home1/10 transition-colors hover:bg-brand-home1 sm:h-9 sm:w-9"
                >
                  <img
                    src={link.icon}
                    alt=""
                    className="h-3.5 w-3.5 object-contain sm:h-4 sm:w-4"
                  />
                </a>
              )
            )}
          </div>
        )}

        <div className="relative min-w-0 flex-1">
          <img
            src={profile.image}
            alt=""
            className={cn(
              'absolute bottom-0 h-[86%] w-auto max-w-[58%] object-contain object-bottom sm:h-[88%] sm:max-w-[62%]',
              profile.imageSide === 'right' ? 'right-0' : 'left-0'
            )}
          />
          <p
            className={cn(
              'relative z-10 whitespace-pre-line px-2 py-3 font-body text-[clamp(0.75rem,3.2vw,0.875rem)] font-bold leading-snug text-brand-home1 sm:px-3 sm:py-4',
              profile.imageSide === 'right'
                ? 'max-w-[56%] sm:max-w-[58%]'
                : 'ml-auto max-w-[56%] text-right sm:max-w-[58%]'
            )}
          >
            {profile.name}
          </p>
        </div>

        {!iconsOnLeft && (
          <div className="flex w-12 shrink-0 flex-col items-center justify-center gap-1.5 py-3 sm:w-14 sm:gap-2 sm:py-4">
            {profile.links.map(
              /** @param {{ label: string, href: string, icon: string }} link */
              link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-brand-home1/10 transition-colors hover:bg-brand-home1 sm:h-9 sm:w-9"
                >
                  <img
                    src={link.icon}
                    alt=""
                    className="h-3.5 w-3.5 object-contain sm:h-4 sm:w-4"
                  />
                </a>
              )
            )}
          </div>
        )}
      </div>
    </article>
  )
}

function SocialSection() {
  return (
    <MobileSection>
      <div className="relative">
        <img
          src={imageHome4}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-4 top-4 w-20 opacity-70 sm:-right-6 sm:top-6 sm:w-28"
        />

        <h2 className="heading-section relative z-10 mb-4 text-center sm:mb-5">
          MẠNG XÃ HỘI
        </h2>

        <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
          {SOCIAL_PROFILES.map(profile => (
            <SocialProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </MobileSection>
  )
}

function FansiteSection() {
  return (
    <MobileSection className="pb-6 sm:pb-8">
      <h2 className="heading-section mb-4 text-center sm:mb-5">FANSITE</h2>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {FANPAGE_DATA.map(page => (
          <a
            key={page.name}
            href={page.href}
            target="_blank"
            rel="noopener noreferrer"
            className="home-mobile-glass-card flex min-h-[clamp(10.5rem,42vw,12.5rem)] flex-col border border-white/80 bg-white/55 p-2.5 shadow-[0_6px_24px_rgba(90,59,196,0.1)] backdrop-blur-sm transition-colors hover:border-brand-home1/40 sm:min-h-[11.25rem] sm:p-3"
          >
            <img
              src={page.avatar}
              alt={page.name.replace('\n', ' ')}
              className="mx-auto h-14 w-14 rounded-full object-cover ring-2 ring-purple-200/60 sm:h-16 sm:w-16"
            />
            <h3 className="mt-2 flex-1 whitespace-pre-line text-center font-body text-[clamp(0.625rem,2.8vw,0.6875rem)] font-bold leading-snug text-brand-home1 sm:mt-3">
              {page.name}
            </h3>
            <span className="mt-2 inline-flex items-center justify-center gap-1 font-body text-[clamp(0.5625rem,2.5vw,0.625rem)] font-semibold uppercase text-brand-orange sm:mt-3">
              Xem thêm
              <img src={warrow} alt="" className="h-3 w-3" />
            </span>
          </a>
        ))}
      </div>
    </MobileSection>
  )
}

/** Mobile & tablet (< lg) — fluid iPhone SE → Android lớn. */
export function HomeResponsive() {
  return (
    <PageShell className="home-mobile-shell relative overflow-x-hidden">
      <PurpleBlobs />
      <MobileHomeHeader />

      <main className="relative z-10 w-full min-w-0">
        <HeroSection />
        <TreasureSection />
        <AwardsSection />
        <SocialSection />
        <FansiteSection />
      </main>
    </PageShell>
  )
}

export const HomeMobile = HomeResponsive
