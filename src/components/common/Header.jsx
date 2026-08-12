import logo from '@assets/logo.png'
import facebookIcon from '@assets/images/icon/facebook.png'
import tiktokIcon from '@assets/images/icon/tiktok.png'
import instagramIcon from '@assets/images/icon/instagram.png'
import youtubeIcon from '@assets/images/icon/youtube.png'
import facebookWhiteIcon from '@assets/images/icon/face_white.png'
import tiktokWhiteIcon from '@assets/images/icon/tiktok_white.png'
import instagramWhiteIcon from '@assets/images/icon/instagram_white.png'
import youtubeWhiteIcon from '@assets/images/icon/youtube_white.png'
import socialSelfImage from '@assets/images/social/self.png'
import socialFamilyImage from '@assets/images/social/family.png'
import { cn, ROUTES } from '@utils'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'HOẠT ĐỘNG', href: ROUTES.ACTIVITIES },
  { label: 'THƯ VIỆN', href: ROUTES.LIBRARY },
  { label: 'GIẢI THƯỞNG', href: ROUTES.AWARDS },
  { label: 'TIN TỨC', href: ROUTES.NEWS },
]

/**
 * @param {string} href
 * @param {string} route
 */
function isNavActive(href, route) {
  if (href === ROUTES.HOME) {
    return route === ROUTES.HOME || route === ''
  }
  if (href === ROUTES.ACTIVITIES) {
    return (
      route === ROUTES.ACTIVITIES || route.startsWith(`${ROUTES.ACTIVITIES}/`)
    )
  }
  return route === href || route.startsWith(`${href}/`)
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.href
 * @param {string} props.route
 * @param {string} [props.className]
 * @param {() => void} [props.onClick]
 */
function NavLink({ label, href, route, className, onClick }) {
  const active = isNavActive(href, route)

  return (
    <a
      href={`#${href}`}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      className={cn(
        'relative font-body text-sm font-semibold uppercase tracking-wide transition-colors',
        active
          ? "text-brand-home1 after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-2/3 after:-translate-x-1/2 after:bg-brand-home1"
          : 'text-brand-textheader/50 hover:text-brand-home1',
        className
      )}
    >
      {label}
    </a>
  )
}

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
  {
    href: 'https://www.youtube.com/@ChuyenNhaLeKhanhTuanKhai',
    icon: youtubeIcon,
    label: 'Youtube',
  },
]

/** Dropdown MXH — mỗi nền tảng có N link; 1 link thì dropdown chỉ hiện 1 dòng */
const SOCIAL_DROPDOWNS = [
  {
    label: 'Facebook',
    icon: facebookIcon,
    iconHover: facebookWhiteIcon,
    accounts: [
      {
        name: 'Diễn viên Lê Khánh',
        href: 'https://www.facebook.com/DvLeKhanh.Official',
        avatar: socialSelfImage,
        avatarClassName: '-translate-x-0.5',
      },
      {
        name: 'Chuyện nhà Lê Khánh - Tuấn Khải',
        href: 'https://www.facebook.com/profile.php?id=61590618325034&locale=vi_VN',
        avatar: socialFamilyImage,
      },
    ],
  },
  {
    label: 'TikTok',
    icon: tiktokIcon,
    iconHover: tiktokWhiteIcon,
    accounts: [
      {
        name: 'Diễn viên Lê Khánh',
        href: 'https://www.tiktok.com/@dienvienlekhanh',
        avatar: socialSelfImage,
        avatarClassName: '-translate-x-0.5',
      },
      {
        name: 'Chuyện nhà Lê Khánh - Tuấn Khải',
        href: 'https://www.tiktok.com/@chuyennhalekhanhtuankhai',
        avatar: socialFamilyImage,
      },
    ],
  },
  {
    label: 'YouTube',
    icon: youtubeIcon,
    iconHover: youtubeWhiteIcon,
    accounts: [
      {
        name: 'Chuyện nhà Lê Khánh - Tuấn Khải',
        href: 'https://www.youtube.com/@ChuyenNhaLeKhanhTuanKhai',
        avatar: socialFamilyImage,
      },
    ],
  },
  {
    label: 'Instagram',
    icon: instagramIcon,
    iconHover: instagramWhiteIcon,
    accounts: [
      {
        name: 'Diễn viên Lê Khánh',
        href: 'https://www.instagram.com/dienvienlekhanh/',
        avatar: socialSelfImage,
        avatarClassName: '-translate-x-0.5',
      },
    ],
  },
]

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.iconClassName]
 */
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

/**
 * Icon MXH + dropdown tài khoản (1 link → 1 dòng).
 * @param {object} props
 * @param {string} [props.className]
 * @param {'left' | 'right'} [props.align]
 * @param {typeof SOCIAL_DROPDOWNS} [props.items]
 */
function SocialDropdowns({
  className,
  align = 'left',
  items = SOCIAL_DROPDOWNS,
}) {
  const [openLabel, setOpenLabel] = useState(
    /** @type {string | null} */ (null)
  )
  const [locked, setLocked] = useState(false)

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {items.map(social => {
        const open = openLabel === social.label

        return (
          <div
            key={social.label}
            className="relative"
            onMouseEnter={() => {
              if (locked) return
              setOpenLabel(social.label)
            }}
            onMouseLeave={() => {
              setOpenLabel(null)
              setLocked(false)
            }}
          >
            <button
              type="button"
              aria-label={`Mở danh sách ${social.label}`}
              aria-haspopup="menu"
              aria-expanded={open}
              className={cn(
                'relative flex h-10 w-10 items-center justify-center rounded-full transition-all',
                open &&
                  'bg-brand-home1 shadow-[0_5px_20px_rgba(90,59,196,0.25)]'
              )}
            >
              <img
                src={social.icon}
                alt=""
                className={cn(
                  'h-5 w-5 object-contain transition-opacity',
                  open && 'opacity-0'
                )}
              />
              <img
                src={social.iconHover}
                alt=""
                className={cn(
                  'absolute h-5 w-5 object-contain opacity-0 transition-opacity',
                  open && 'opacity-100'
                )}
              />
            </button>

            <div
              className={cn(
                'absolute top-full z-[60] min-w-[14.5rem] pt-2 transition-all duration-200',
                align === 'right' ? 'right-0' : 'left-0',
                open
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible pointer-events-none translate-y-1 opacity-0'
              )}
            >
              <div
                role="menu"
                className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(90,59,196,0.18)]"
              >
                {social.accounts.map((account, index) => {
                  const count = social.accounts.length
                  const isFirst = index === 0
                  const isLast = index === count - 1

                  return (
                    <a
                      key={account.href}
                      href={account.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => {
                        setOpenLabel(null)
                        setLocked(true)
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 px-3 py-3 font-body text-xs font-bold text-gray-900 transition-colors hover:bg-brand-home1/10',
                        count === 1 && 'rounded-2xl',
                        count > 1 && isFirst && 'rounded-t-2xl',
                        count > 1 && isLast && 'rounded-b-2xl'
                      )}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-home1">
                        <img
                          src={account.avatar}
                          alt=""
                          className={cn(
                            'h-full w-full mt-2 object-contain',
                            account.avatarClassName
                          )}
                        />
                      </span>
                      <span className="leading-snug">{account.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * @param {object} props
 * @param {'fixed' | 'static'} [props.variant]
 * @param {'responsive' | 'canvas'} [props.layout]
 */
export function Header({ variant = 'fixed', layout = 'responsive' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [route, setRoute] = useState(
    () => window.location.hash.slice(1) || ROUTES.HOME
  )
  const isCanvas = layout === 'canvas'

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash.slice(1) || ROUTES.HOME)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  /**
   * Canvas Home stacking (ảnh đè navbar nhưng navbar vẫn hiện):
   * - spacer z-30: nền thanh navbar
   * - section/ảnh z-40: đè lên nền navbar
   * - header z-50: social + link luôn nằm trên ảnh, vẫn bấm được
   */
  const spacerZ = isCanvas ? 'z-30' : 'z-30'
  const headerZ = isCanvas ? 'z-50' : 'z-40'

  const positionClass =
    variant === 'fixed'
      ? `fixed left-0 right-0 top-0 ${headerZ}`
      : `relative ${headerZ}`

  const leftSocials = SOCIAL_DROPDOWNS.slice(0, 2)
  const rightSocials = SOCIAL_DROPDOWNS.slice(2)

  return (
    <>
      <div
        className={cn(
          'bg-white shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.2)]',
          isCanvas ? 'h-20' : 'h-16 lg:h-20',
          variant === 'fixed' && `fixed left-0 right-0 top-0 ${spacerZ}`
        )}
      />

      <header
        className={cn(
          positionClass,
          'pointer-events-auto',
          isCanvas ? 'h-20 bg-transparent' : 'h-16 bg-transparent lg:h-20'
        )}
      >
        <div className="page-container flex h-full max-w-none items-center justify-between px-20 py-0">
          <SocialDropdowns
            items={leftSocials}
            className={isCanvas ? 'flex' : 'hidden lg:flex'}
          />

          <a
            href={`#${ROUTES.HOME}`}
            className={cn(isCanvas ? 'hidden' : 'lg:hidden')}
            aria-label="Về trang chủ"
          >
            <img src={logo} alt="LK Logo" className="h-10 w-auto" />
          </a>
          <nav
            className={cn(
              'items-center gap-8',
              isCanvas ? 'flex gap-25' : 'hidden xl:gap-25 lg:flex'
            )}
          >
            {NAV_LINKS.slice(0, 2).map(link => (
              <NavLink
                key={link.label}
                label={link.label}
                href={link.href}
                route={route}
              />
            ))}
            <a
              href={`#${ROUTES.HOME}`}
              className="mx-2 shrink-0"
              aria-label="Về trang chủ"
            >
              <img src={logo} alt="LK Logo" className="h-12 w-auto" />
            </a>{' '}
            {NAV_LINKS.slice(2).map(link => (
              <NavLink
                key={link.label}
                label={link.label}
                href={link.href}
                route={route}
              />
            ))}
          </nav>

          <button
            type="button"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full text-brand-home1 transition-colors hover:bg-purple-100',
              isCanvas ? 'hidden' : 'lg:hidden'
            )}
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

          <SocialDropdowns
            items={rightSocials}
            align="right"
            className={isCanvas ? 'flex' : 'hidden lg:flex'}
          />
        </div>

        {menuOpen && !isCanvas && (
          <div className="border-t border-purple-100 bg-white px-4 pb-6 pt-4 shadow-md lg:hidden">
            <SocialIcons
              className="mb-4 justify-center"
              iconClassName="h-7 w-7"
            />
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  route={route}
                  className="rounded-lg px-3 py-2 text-center hover:bg-purple-50"
                  onClick={() => setMenuOpen(false)}
                />
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
