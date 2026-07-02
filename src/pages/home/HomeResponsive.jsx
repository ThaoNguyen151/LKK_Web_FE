import imageHome1 from '@assets/image_home_1.png'
import imageHome2 from '@assets/image_home_2.png'
import imageHome4 from '@assets/image_home_4.png'
import imageCupSK from '@assets/images/cup/LHSK.png'
import imageCupMV from '@assets/images/cup/MV.png'
import imageCupLHP from '@assets/images/cup/LHP.png'
import imageCupHTV from '@assets/images/cup/HTV.png'
import imageTextHome1 from '@assets/images/le-khanh.png'
import avatarCherishK from '@assets/images/avatar/avatar-cherishk.jpg'
import avatar1200HotE from '@assets/images/avatar/avatar-12hote.jpg'
import facebookIcon from '@assets/images/icon/facebook.png'
import tiktokIcon from '@assets/images/icon/tiktok.png'
import instagramIcon from '@assets/images/icon/instagram.png'
import facebookWhiteIcon from '@assets/images/icon/face_white.png'
import tiktokWhiteIcon from '@assets/images/icon/tiktok_white.png'
import instagramWhiteIcon from '@assets/images/icon/instagram_white.png'
import { Header } from '@components/common'
import { PageSection, PageShell } from '@layouts'

const SOCIAL_DATA = [
  {
    platform: 'facebook',
    followers: '169k',
    href: 'https://www.facebook.com/DvLeKhanh.Official',
    icon: facebookIcon,
    iconHover: facebookWhiteIcon,
  },
  {
    platform: 'tiktok',
    followers: '106.4k',
    href: 'https://www.tiktok.com/@dienvienlekhanh',
    icon: tiktokIcon,
    iconHover: tiktokWhiteIcon,
  },
  {
    platform: 'instagram',
    followers: '2.629',
    href: 'https://www.instagram.com/dienvienlekhanh/',
    icon: instagramIcon,
    iconHover: instagramWhiteIcon,
  },
]

const FANPAGE_DATA = [
  {
    name: 'CherishK – all about Lê Khánh',
    href: 'https://facebook.com/LeKhanhcollection',
    avatar: avatarCherishK,
  },
  {
    name: '1200 Hột É của chị Lê Khánh',
    href: 'https://www.facebook.com/profile.php?id=61555671172772',
    avatar: avatar1200HotE,
  },
]

const STATS = [
  { value: '100', label: 'VỞ DIỄN' },
  { value: '35', label: 'PHIM TRUYỀN HÌNH' },
  { value: '15', label: 'PHIM ĐIỆN ẢNH' },
]

const AWARDS = [
  {
    title: 'MAI VÀNG',
    years: ['2023', '2015', '2013', '2012', '2011', '2010'],
    count: '6',
    cup: imageCupMV,
  },
  {
    title: 'LIÊN HOAN SÂN KHẤU',
    years: ['2024'],
    count: '1',
    cup: imageCupSK,
  },
  {
    title: 'LIÊN HOAN PHIM VIỆT NAM',
    years: ['2011'],
    count: '1',
    cup: imageCupLHP,
  },
  {
    title: 'HTV AWARDS',
    years: ['2008', '2009'],
    count: '2',
    cup: imageCupHTV,
  },
]

function Tag({ children, variant = 'orange' }) {
  const styles =
    variant === 'orange'
      ? 'bg-brand-orange text-white'
      : 'bg-white/70 text-brand-home1'

  return (
    <span
      className={`inline-block rounded-full px-4 py-2 text-xs font-semibold tracking-wide sm:text-sm ${styles}`}
    >
      {children}
    </span>
  )
}

/** Fluid layout for mobile & tablet (< lg). */
export function HomeResponsive() {
  return (
    <PageShell>
      <Header />

      <main className="pt-16 lg:pt-20">
        <PageSection className="relative overflow-hidden text-center">
          <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
            <img
              src={imageHome1}
              alt="Lê Khánh"
              className="w-full max-w-sm object-contain"
            />
            <img
              src={imageTextHome1}
              alt="Lê Khánh"
              className="w-full max-w-md object-contain"
            />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Tag># NGHỆ SĨ</Tag>
              <Tag># DIỄN VIÊN</Tag>
              <Tag variant="light">22 • 12 • 1981</Tag>
            </div>
            <Tag variant="light">LÊ KIM KHÁNH</Tag>
          </div>
        </PageSection>

        <PageSection className="bg-brand-soft">
          <h2 className="heading-display mb-6 text-center">
            KHO TÀNG NGHỆ THUẬT
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center font-body text-base leading-relaxed text-gray-700 sm:text-lg">
            Sau hơn 20 năm chăm chỉ hoạt động nghệ thuật, Lê Khánh sở hữu một
            kho tàng vai diễn với đa dạng màu sắc. Cô vinh dự được xếp vào hàng
            ngũ diễn viên thực lực của Việt Nam.
          </p>

          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map(stat => (
              <div
                key={stat.label}
                className="rounded-2xl border-2 border-white bg-white/20 p-5 text-center backdrop-blur-sm"
              >
                <div className="mb-1 font-body text-4xl">
                  <span className="text-black">{stat.value}</span>
                  <span className="text-brand-home1">+</span>
                </div>
                <div className="font-body text-xs uppercase tracking-wide text-gray-600 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <img
            src={imageHome2}
            alt="Lê Khánh"
            className="mx-auto w-full max-w-md object-contain"
          />
        </PageSection>

        <PageSection>
          <h2 className="heading-section mb-8 text-center">GIẢI THƯỞNG</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {AWARDS.map(award => (
              <div
                key={award.title}
                className="rounded-2xl border border-white/60 bg-white/10 p-5 shadow-sm backdrop-blur-sm"
              >
                <h3 className="mb-3 font-display text-2xl italic text-brand-home1 sm:text-3xl">
                  {award.title}
                </h3>
                <div className="mb-4 flex flex-wrap gap-2">
                  {award.years.map(year => (
                    <span
                      key={year}
                      className="rounded-full bg-white/50 px-3 py-1 font-body text-sm text-black"
                    >
                      {year}
                    </span>
                  ))}
                </div>
                <div className="flex items-end justify-between gap-4">
                  <span className="font-display text-6xl text-brand-cup">
                    {award.count}
                  </span>
                  <img
                    src={award.cup}
                    alt=""
                    className="h-20 w-auto object-contain sm:h-24"
                  />
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection>
          <div className="grid grid-cols-1 items-start gap-10">
            <img
              src={imageHome4}
              alt="Lê Khánh"
              className="mx-auto w-full max-w-md rounded-2xl object-contain"
            />

            <div>
              <h2 className="heading-section mb-6 text-center">MẠNG XÃ HỘI</h2>

              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {SOCIAL_DATA.map(item => (
                  <a
                    key={item.platform}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col rounded-2xl border border-brand-home1 bg-white/10 p-4 shadow-sm transition-colors hover:bg-brand-home1"
                  >
                    <img src={item.icon} alt="" className="h-5 w-5" />
                    <span className="mt-2 font-body text-xl font-bold text-brand-home1 group-hover:text-brand-changehover">
                      {item.followers}
                    </span>
                    <span className="font-body text-[10px] uppercase text-gray-600 group-hover:text-brand-changehover">
                      Người theo dõi
                    </span>
                  </a>
                ))}
              </div>

              <div className="gradient-line-h mb-6" />

              <div className="flex flex-col gap-4">
                {FANPAGE_DATA.map(page => (
                  <a
                    key={page.name}
                    href={page.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border-2 border-white bg-white/10 p-4 transition-all hover:border-brand-home1"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={page.avatar}
                        alt={page.name}
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-purple-200/60"
                      />
                      <div>
                        <span className="mb-1 inline-block rounded-full bg-brand-orange px-2 py-0.5 text-[10px] uppercase text-white">
                          Fanpage
                        </span>
                        <h3 className="font-body text-sm font-semibold text-brand-home1 sm:text-base">
                          {page.name}
                        </h3>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </PageSection>
      </main>
    </PageShell>
  )
}
