import logo from '@assets/logo.png'
import facebookIcon from '@assets/images/icon/facebook.png'
import tiktokIcon from '@assets/images/icon/tiktok.png'
import instagramIcon from '@assets/images/icon/instagram.png'
import { cn, ROUTES } from '@utils'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'HOẠT ĐỘNG', href: ROUTES.HOME },
  { label: 'THƯ VIỆN', href: ROUTES.ABOUT },
  { label: 'GIẢI THƯỞNG', href: ROUTES.HOME },
  { label: 'TIN TỨC', href: ROUTES.CONTACT },
]

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/DvLeKhanh.Official',
    icon: facebookIcon,
    label: 'Facebook',
  },
  {
    href: 'https://www.tiktok.com/@dienvienlekhanh',
    icon: tiktokIcon,
    label: 'TikTok',
  },
  {
    href: 'https://www.instagram.com/dienvienlekhanh/',
    icon: instagramIcon,
    label: 'Instagram',
  },
]

function SocialIcons({ className, iconClassName = 'h-6 w-6' }) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {SOCIAL_LINKS.map(item => (
        <a
          key={item.label}
          href={item.href}
          className="text-brand-home1 transition-colors hover:text-purple-700"
          aria-label={item.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={item.icon} alt={item.label} className={iconClassName} />
        </a>
      ))}
    </div>
  )
}

export function Header({ variant = 'fixed' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const positionClass =
    variant === 'fixed' ? 'fixed left-0 right-0 top-0 z-40' : 'relative z-40'

  return (
    <>
      <div
        className={cn(
          'h-16 bg-brand-header shadow-sm backdrop-blur-md lg:h-20',
          variant === 'fixed' && 'fixed left-0 right-0 top-0 z-30'
        )}
      />

      <header className={cn(positionClass, 'h-16 lg:h-20')}>
        <div className="page-container flex h-full max-w-none items-center justify-between py-0">
          <SocialIcons className="hidden lg:flex" />

          <img src={logo} alt="LK Logo" className="h-10 w-auto lg:hidden" />

          <nav className="hidden items-center gap-8 xl:gap-25 lg:flex">
            {NAV_LINKS.slice(0, 2).map(link => (
              <a
                key={link.label}
                href={`#${link.href}`}
                className="font-body text-sm font-semibold uppercase tracking-wide text-brand-textheader/50 transition-colors hover:text-purple-600"
              >
                {link.label}
              </a>
            ))}
            <img src={logo} alt="LK Logo" className="mx-2 h-12 w-auto" />
            {NAV_LINKS.slice(2).map(link => (
              <a
                key={link.label}
                href={`#${link.href}`}
                className="font-body text-sm font-semibold uppercase tracking-wide text-brand-textheader/50 transition-colors hover:text-purple-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand-home1 transition-colors hover:bg-purple-100 lg:hidden"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            <svg
              className="h-6 w-6"
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

          <div className="hidden lg:block">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full text-brand-home1 transition-colors hover:bg-purple-100"
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-purple-100 bg-brand-header px-4 pb-6 pt-4 shadow-lg lg:hidden">
            <SocialIcons
              className="mb-4 justify-center"
              iconClassName="h-7 w-7"
            />
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={`#${link.href}`}
                  className="rounded-lg px-3 py-2 text-center font-body text-sm font-semibold uppercase tracking-wide text-brand-textheader/70 transition-colors hover:bg-purple-50 hover:text-brand-home1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
