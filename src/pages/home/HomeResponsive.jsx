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

function PurpleBlobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-brand-home1/15 blur-3xl" />
      <div className="absolute -right-8 top-[36%] h-52 w-52 rounded-full bg-brand-home1/10 blur-3xl" />
      <div className="absolute bottom-24 left-1/4 h-64 w-64 rounded-full bg-brand-home1/12 blur-3xl" />
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

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-40 h-[72px] bg-white/90 shadow-[0_0_10px_5px_rgba(90,59,196,0.06)] backdrop-blur-md" />

      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="flex items-start justify-between px-4 pb-2 pt-3">
          <div className="flex flex-col gap-2">
            <a href={`#${ROUTES.HOME}`} aria-label="Về trang chủ">
              <img src={logo} alt="LK Logo" className="h-9 w-auto" />
            </a>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-brand-home1 transition-colors hover:bg-purple-100"
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

          <span className="rounded-full bg-white px-3 py-1.5 font-body text-[11px] font-semibold tracking-wide text-brand-home1 shadow-sm ring-1 ring-brand-home1/15">
            22/12/1981
          </span>
        </div>

        {menuOpen && (
          <nav className="border-t border-purple-100 bg-white px-4 pb-5 pt-3 shadow-md">
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
                      'rounded-xl px-3 py-2.5 text-center font-body text-sm font-semibold uppercase tracking-wide transition-colors',
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
 */
function Tag({ children, variant = 'orange' }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3.5 py-1.5 font-body text-[11px] font-semibold tracking-wide',
        variant === 'orange'
          ? 'bg-brand-orange text-white'
          : 'bg-white/80 text-brand-home1 ring-1 ring-brand-home1/10'
      )}
    >
      {children}
    </span>
  )
}

function HeroSection() {
  return (
    <section className="relative px-4 pb-8 pt-[4.5rem]">
      <div className="relative mx-auto max-w-md">
        <div className="relative">
          <img
            src={imageHome1}
            alt="Lê Khánh"
            className="mx-auto w-full max-w-[340px] object-contain"
          />
          <div className="absolute left-1 top-[16%]">
            <Tag># DIỄN VIÊN</Tag>
          </div>
          <div className="absolute right-0 top-[40%]">
            <Tag># NGHỆ SĨ</Tag>
          </div>
        </div>

        <div className="relative -mt-1 flex flex-col items-center">
          <img
            src={imageTextHome1}
            alt="Lê Khánh"
            className="w-full max-w-[290px] object-contain"
          />
          <div className="absolute right-[12%] top-[38%]">
            <Tag variant="light">LÊ KIM KHÁNH</Tag>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {[0, 1, 2, 3].map(index => (
            <span
              key={index}
              className={cn(
                'h-2 w-2 rounded-full border border-brand-home1/30',
                index === 0 && 'bg-brand-home1/70'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TreasureSection() {
  return (
    <section className="px-4 pb-8">
      <h2 className="heading-display mb-4 text-center text-[2rem] leading-tight">
        KHO TÀNG
        <br />
        NGHỆ THUẬT
      </h2>

      <p className="mx-auto mb-6 max-w-sm text-center font-body text-sm leading-relaxed text-gray-700">
        {HOME_INTRO}
      </p>

      <div className="mx-auto max-w-md rounded-3xl border border-white/80 bg-white/55 p-3 shadow-[0_8px_30px_rgba(90,59,196,0.12)] backdrop-blur-sm">
        <div className="flex items-stretch gap-3">
          <div className="w-[42%] shrink-0 overflow-hidden rounded-2xl bg-[#e8dff5]">
            <img
              src={imageHome2}
              alt="Lê Khánh"
              className="h-full min-h-[140px] w-full object-cover object-top"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-1">
            {HOME_STATS.map(stat => (
              <div key={stat.label}>
                <div className="font-body text-2xl leading-none">
                  <span className="text-black">{stat.value}</span>
                  <span className="text-brand-home1">+</span>
                </div>
                <div className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AwardsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = HOME_AWARDS[activeIndex]

  return (
    <section className="px-4 pb-10">
      <div className="mx-auto mb-4 flex max-w-md justify-center gap-2 overflow-x-auto pb-1">
        {HOME_AWARDS.map((award, index) => (
          <button
            key={award.id}
            type="button"
            aria-label={award.title.replace('\n', ' ')}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all',
              index === activeIndex
                ? 'bg-white shadow-[0_4px_16px_rgba(90,59,196,0.15)] ring-1 ring-brand-home1/15'
                : 'bg-white/40 opacity-80'
            )}
          >
            <img src={award.cup} alt="" className="h-7 w-auto object-contain" />
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/45 p-5 shadow-[0_8px_30px_rgba(90,59,196,0.14)] backdrop-blur-sm">
        <h3 className="font-display-medium mb-4 whitespace-pre-line text-center font-display text-3xl italic leading-tight text-brand-home1">
          {active.title}
        </h3>

        <div className="flex items-end justify-between gap-3">
          <div
            className={cn(
              'grid gap-x-4 gap-y-2',
              active.years.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
            )}
          >
            {active.years.map(year => (
              <a
                key={year}
                href={awardYearHref(year)}
                className="font-body text-sm text-black transition-colors hover:text-brand-home1"
              >
                {year}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-end gap-1">
            <span className="font-display text-6xl leading-none text-brand-cup">
              {active.count}
            </span>
            <img
              src={active.cup}
              alt=""
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * @param {object} props
 * @param {typeof SOCIAL_PROFILES[number]} props.profile
 */
function SocialProfileCard({ profile }) {
  const iconsOnLeft = profile.iconSide === 'left'

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/50 shadow-[0_8px_28px_rgba(90,59,196,0.12)] backdrop-blur-sm">
      <div className="relative flex min-h-[170px] items-stretch">
        {iconsOnLeft && (
          <div className="flex w-14 shrink-0 flex-col items-center justify-center gap-2 py-4">
            {profile.links.map(
              /** @param {{ label: string, href: string, icon: string }} link */
              link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-brand-home1/10 transition-colors hover:bg-brand-home1"
                >
                  <img
                    src={link.icon}
                    alt=""
                    className="h-4 w-4 object-contain"
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
              'absolute bottom-0 h-[88%] w-auto max-w-[62%] object-contain object-bottom',
              profile.imageSide === 'right' ? 'right-0' : 'left-0'
            )}
          />
          <p
            className={cn(
              'relative z-10 whitespace-pre-line px-3 py-4 font-body text-sm font-bold leading-snug text-brand-home1',
              profile.imageSide === 'right'
                ? 'max-w-[58%]'
                : 'ml-auto max-w-[58%] text-right'
            )}
          >
            {profile.name}
          </p>
        </div>

        {!iconsOnLeft && (
          <div className="flex w-14 shrink-0 flex-col items-center justify-center gap-2 py-4">
            {profile.links.map(
              /** @param {{ label: string, href: string, icon: string }} link */
              link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-brand-home1/10 transition-colors hover:bg-brand-home1"
                >
                  <img
                    src={link.icon}
                    alt=""
                    className="h-4 w-4 object-contain"
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
    <section className="px-4 pb-10">
      <div className="relative mx-auto max-w-md">
        <img
          src={imageHome4}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-6 top-6 w-28 opacity-70"
        />

        <h2 className="heading-section relative z-10 mb-5 text-center text-[1.75rem]">
          MẠNG XÃ HỘI
        </h2>

        <div className="relative z-10 flex flex-col gap-4">
          {SOCIAL_PROFILES.map(profile => (
            <SocialProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FansiteSection() {
  return (
    <section className="px-4 pb-12">
      <h2 className="heading-section mb-5 text-center text-[1.75rem]">
        FANSITE
      </h2>

      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        {FANPAGE_DATA.map(page => (
          <a
            key={page.name}
            href={page.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[180px] flex-col rounded-2xl border border-white/80 bg-white/55 p-3 shadow-[0_6px_24px_rgba(90,59,196,0.1)] backdrop-blur-sm transition-colors hover:border-brand-home1/40"
          >
            <img
              src={page.avatar}
              alt={page.name.replace('\n', ' ')}
              className="mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-purple-200/60"
            />
            <h3 className="mt-3 flex-1 whitespace-pre-line text-center font-body text-[11px] font-bold leading-snug text-brand-home1">
              {page.name}
            </h3>
            <span className="mt-3 inline-flex items-center justify-center gap-1 font-body text-[10px] font-semibold uppercase text-brand-orange">
              Xem thêm
              <img src={warrow} alt="" className="h-3 w-3" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

/** Mobile layout (< lg) — scroll dọc theo mockup. */
export function HomeResponsive() {
  return (
    <PageShell className="relative overflow-x-hidden">
      <PurpleBlobs />
      <MobileHomeHeader />

      <main className="relative z-10">
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
