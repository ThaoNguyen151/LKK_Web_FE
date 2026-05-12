import logo from '@assets/logo.png'
import facebookIcon from '@/assets/images/icon/facebook.png'
import tiktokIcon from '@/assets/images/icon/tiktok.png'
import instagramIcon from '@/assets/images/icon/instagram.png'

export function Header() {
  return (
    <>
      {/* Background layer - below the image (z-10) */}
      <div className="fixed left-0 right-0 top-0 z-10 h-20 bg-brand-header backdrop-blur-md shadow-sm"></div>

      {/* Content layer - above the image (z-40) */}
      <header className="fixed left-0 right-0 top-0 z-40 h-20">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          {/* Left - Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/DvLeKhanh.Official"
              className="text-2xl text-brand-home1 transition-colors hover:text-purple-700"
              aria-label="Facebook"
            >
              <img src={facebookIcon} alt="Facebook" className="h-6 w-6" />
            </a>
            <a
              href="https://www.tiktok.com/@dienvienlekhanh"
              className="text-2xl text-brand-home1 transition-colors hover:text-purple-700"
              aria-label="TikTok"
            >
              <img src={tiktokIcon} alt="TikTok" className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/dienvienlekhanh/"
              className="text-2xl text-brand-home1 transition-colors hover:text-purple-700"
              aria-label="Instagram"
            >
              <img src={instagramIcon} alt="Instagram" className="h-6 w-6" />
            </a>
          </div>

          {/* Center - Navigation with Logo */}
          <nav className="flex items-center gap-25">
            <a
              href="#"
              className="font-body text-sm font-body font-semibold uppercase tracking-wide text-brand-textheader/50 transition-colors hover:text-purple-600"
            >
              HOẠT ĐỘNG
            </a>
            <a
              href="#"
              className="font-body text-sm font-body font-semibold uppercase tracking-wide text-brand-textheader/50 transition-colors hover:text-purple-600"
            >
              THƯ VIỆN
            </a>
            <img src={logo} alt="LK Logo" className="mx-4 h-12 w-auto" />
            <a
              href="#"
              className="font-body text-sm font-body font-semibold uppercase tracking-wide text-brand-textheader/50 transition-colors hover:text-purple-600"
            >
              GIẢI THƯỞNG
            </a>
            <a
              href="#"
              className="font-body text-sm font-body font-semibold uppercase tracking-wide text-brand-textheader/50 transition-colors hover:text-purple-600"
            >
              TIN TỨC
            </a>
          </nav>

          {/* Right - Circle Button */}
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/0 text-white transition-colors hover:bg-purple-700"
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
      </header>
    </>
  )
}
