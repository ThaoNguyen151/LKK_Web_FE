import { cn } from '@utils'
import imageHome1 from '@assets/image_home_1.png'
import imageHome2 from '@assets/image_home_2.png'
import imageHome4 from '@assets/image_home_4.png'
import imageCupSK from '@assets/images/cup/LHSK.png'
import imageCupLHP from '@assets/images/cup/LHP.png'
import { Header, AwardBlock } from '@components/common'
import { useBreakpoint } from '@hooks'
import { ScaledCanvas } from '@layouts'
import { HomeResponsive } from './home/HomeResponsive'
import { MaiVangAward, HtvAward } from './home/awards'
import imageTextHome1 from '@assets/images/le-khanh.png'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import avatarCherishK from '@assets/images/avatar/avatar-cherishk.jpg'
import avatar1200HotE from '@assets/images/avatar/avatar-12hote.jpg'
import facebookIcon from '@assets/images/icon/facebook.png'
import tiktokIcon from '@assets/images/icon/tiktok.png'
import instagramIcon from '@assets/images/icon/instagram.png'
import facebookWhiteIcon from '@assets/images/icon/face_white.png'
import tiktokWhiteIcon from '@assets/images/icon/tiktok_white.png'
import instagramWhiteIcon from '@assets/images/icon/instagram_white.png'

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
    facebookUsername: 'LeKhanhcollection',
    avatar: avatarCherishK,
    fallbackEmoji: null,
  },
  {
    name: '1200 Hột É của chị Lê Khánh',
    href: 'https://www.facebook.com/profile.php?id=61555671172772',
    facebookUsername: '61555671172772', // thay bằng username thật
    avatar: avatar1200HotE,
    fallbackEmoji: '🎭',
  },
]

/** Wrapper nội dung trong canvas 1536px — không dùng .container (phụ thuộc viewport, vỡ khi zoom). */
const CANVAS_SECTION = 'relative z-10 mx-auto w-full max-w-full px-8'

function HomeDesktop() {
  return (
    <ScaledCanvas>
      <div className="h-full snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-brand-soft">
        <Header layout="canvas" />

        {/* Section 1 - Hero
            z-40: đè nền navbar (z-30), nằm dưới link navbar (z-50)
            không dùng bg opaque full — nền lấy từ scroll parent */}
        <section className="pointer-events-none relative z-40 flex h-full snap-start items-center justify-center overflow-hidden">
          {/* DECORATION BACKGROUND */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img src={rectLeft} className="absolute left-0 top-0 w-[590px]" />
            <img
              src={rectRight}
              className="absolute right-0 bottom-19 w-[420px]"
            />
            <img
              src={rectBottom}
              className="absolute bottom-0 left-1/2 w-[600px] -translate-x-[70%]"
            />
          </div>
          <div
            className={cn(CANVAS_SECTION, 'flex min-w-0 items-center pt-20')}
          >
            {/* LEFT IMAGE — đè lên nền navbar; w-[945px] khớp asset, px cố định trong canvas (không rem/flex shrink) */}
            <div className="relative z-10 shrink-0 -ml-10">
              <img
                src={imageHome1}
                alt="Lê Khánh"
                className="relative h-auto w-[945px] shrink-0 object-contain"
                style={{ marginTop: '-75px' }}
              />

              <div className="pointer-events-auto absolute top-114 right-[110px] rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white tracking-wide whitespace-nowrap shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md whitespace-nowrap">
                # NGHỆ SĨ
              </div>

              <div className="pointer-events-auto absolute left-185 top-136 rounded-full bg-brand-header/20 px-6 py-3 text-sm font-semibold tracking-wide text-brand-home1 whitespace-nowrap shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
                LÊ KIM KHÁNH
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative z-10 flex min-w-0 flex-1 flex-col">
              <div className="pointer-events-auto absolute right-40 bottom-23 rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white tracking-wide whitespace-nowrap shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
                # DIỄN VIÊN
              </div>

              <img
                src={imageTextHome1}
                alt="Lê Khánh"
                className="absolute left-[-120px] top-[-115px] z-30 w-[750px] object-contain"
              />

              <div className="pointer-events-auto absolute right-54 top-34 rounded-full bg-white/60 px-5 py-3 text-sm font-semibold tracking-wide text-brand-home1 whitespace-nowrap shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
                22 • 12 • 1981
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Bio with Stats */}
        <section className="pointer-events-none relative z-40 flex h-full snap-start items-center justify-center overflow-hidden">
          {/* DECORATION BACKGROUND */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={rectLeft}
              className="absolute left-0 bottom-[-200px] w-[590px]"
            />
            <img
              src={rectRight}
              className="absolute right-0 bottom-19 w-[420px]"
            />
            <img
              src={rectBottom}
              className="absolute bottom-0 left-2/3 w-[600px] -translate-x-[70%]"
            />
          </div>
          <div className={cn(CANVAS_SECTION, 'pointer-events-auto pt-20')}>
            <div className="grid min-w-0 grid-cols-5 items-start gap-2">
              {/* Left side - Text and Stats */}
              <div className="relative z-10 col-span-3 flex min-w-0 flex-col justify-center pr-2">
                <h2 className="font-display-medium mb-15 px-10 pt-30 text-center font-display text-6xl italic text-brand-home1">
                  KHO TÀNG NGHỆ THUẬT
                </h2>
                <p className="mb-15 font-body font-light text-lg leading-relaxed text-gray-700">
                  Sau hơn 20 năm chăm chỉ hoạt động nghệ thuật, Lê Khánh sở hữu
                  một kho tàng vai diễn
                  <br />
                  với đa dạng màu sắc. Cô vinh dự được xếp vào hàng ngũ diễn
                  viên thực lực của Việt Nam.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-10">
                  <div className="rounded-2xl border-2 border-white bg-white/20 p-6 backdrop-blur-sm">
                    <div className="mb-2 font-body text-5xl text-center">
                      <span className="text-black">100</span>
                      <span className="text-brand-home1">+</span>
                    </div>
                    <div className="font-body text-sm uppercase tracking-wide text-gray-600 text-center">
                      VỞ DIỄN
                    </div>
                  </div>
                  <div className="rounded-2xl border-2 border-white bg-white/20 p-6 backdrop-blur-sm">
                    <div className="mb-2 font-body text-5xl text-center">
                      <span className="text-black">35</span>
                      <span className="text-brand-home1">+</span>
                    </div>
                    <div className="font-body text-sm uppercase tracking-wide text-gray-600 text-center">
                      PHIM TRUYỀN HÌNH
                    </div>
                  </div>
                  <div className="rounded-2xl border-2 border-white bg-white/20 p-6 backdrop-blur-sm">
                    <div className="mb-2 font-body text-5xl text-center">
                      <span className="text-black">15</span>
                      <span className="text-brand-home1">+</span>
                    </div>
                    <div className="font-body text-sm uppercase tracking-wide text-gray-600 text-center">
                      PHIM ĐIỆN ẢNH
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Image đè nền navbar */}
              <div className="pointer-events-none relative z-10 col-span-2 flex min-w-0 items-center justify-end">
                <img
                  src={imageHome2}
                  alt="Lê Khánh"
                  className="relative h-auto w-full max-w-2xl scale-110 object-contain"
                  style={{ marginTop: '-50px', marginRight: '-10px' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Awards */}
        <section className="relative flex h-full snap-start items-center justify-center overflow-hidden bg-brand-soft">
          {/* DECORATION BACKGROUND */}
          <img
            src={rectLeft}
            className="pointer-events-none absolute left-0 bottom-[-200px] z-0 w-[590px]"
          />

          <img
            src={rectRight}
            className="pointer-events-none absolute right-0 bottom-19 z-0 w-[420px]"
          />

          <img
            src={rectBottom}
            className="pointer-events-none absolute bottom-0 left-2/3 z-0 w-[600px] -translate-x-[70%]"
          />
          <div
            className={cn(
              CANVAS_SECTION,
              'flex h-full w-full items-center pt-20 pb-8'
            )}
          >
            <div className="grid w-full min-w-0 grid-cols-3 items-stretch gap-5">
              <div className="min-w-0 overflow-hidden">
                <MaiVangAward />
              </div>

              {/* Festival Awards — 2 giải compact, không lem qua gạch ngang */}
              <div className="relative flex h-full min-h-0 flex-col overflow-hidden px-6 pt-5">
                {/* Line dọc trái */}
                <div
                  className="absolute left-0 top-[0%] h-[100%] w-[1px]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, #5A3BC4, transparent)',
                  }}
                />

                {/* Line dọc phải */}
                <div
                  className="absolute right-0 top-[0%] h-[100%] w-[1px]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, #5A3BC4, transparent)',
                  }}
                />

                <div className="relative min-h-0 flex-1 overflow-hidden px-2 py-5">
                  <AwardBlock
                    variant="compact"
                    className="h-full"
                    title={['LIÊN HOAN', 'SÂN KHẤU']}
                    years={[{ label: '2024' }]}
                    count="1"
                    cupSrc={imageCupSK}
                    cupAlt="Cup Liên hoan sân khấu"
                  />
                </div>

                <div
                  className="my-1 h-[1px] w-full shrink-0"
                  style={{
                    background:
                      'linear-gradient(to right, transparent, #5A3BC4, transparent)',
                  }}
                />

                <div className="relative min-h-0 flex-1 overflow-hidden px-2 py-3">
                  <AwardBlock
                    variant="compact"
                    className="h-full"
                    title={['LIÊN HOAN PHIM', 'VIỆT NAM']}
                    years={[{ label: '2011' }]}
                    count="1"
                    cupSrc={imageCupLHP}
                    cupAlt="Cup Liên hoan phim"
                  />
                </div>
              </div>

              <div className="min-w-0 overflow-hidden">
                <HtvAward />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - Mạng xã hội */}
        <section className="pointer-events-none relative z-40 flex h-full snap-start items-center justify-center overflow-hidden">
          {/* DECORATION BACKGROUND */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={rectLeft}
              className="absolute left-0 bottom-[-200px] w-[590px]"
            />
            <img
              src={rectRight}
              className="absolute right-0 bottom-19 w-[420px]"
            />
            <img
              src={rectBottom}
              className="absolute bottom-0 left-2/3 w-[600px] -translate-x-[70%]"
            />
          </div>
          <div className={cn(CANVAS_SECTION, 'pointer-events-auto')}>
            <div className="grid grid-cols-2 items-center gap-16">
              {/* Left — ảnh chân dung, z-50 đè navbar */}
              <div className="pointer-events-none relative z-50 flex justify-center">
                <img
                  src={imageHome4}
                  alt="Lê Khánh"
                  className="relative z-50 h-auto w-full max-w-3xl scale-90 rounded-2xl object-contain"
                  style={{ marginTop: '-10px', marginLeft: '-70px' }}
                />
              </div>

              {/* Right — tiêu đề, thống kê 3 cột, fanpage */}
              <div className="flex flex-col justify-center gap-6 pr-20 pt-20">
                <h2 className="font-display-medium font-display text-[50px] italic leading-tight text-center text-brand-home1">
                  MẠNG XÃ HỘI
                </h2>
                {/* Stats 3 ô */}
                <div className="grid grid-cols-3 gap-4">
                  {SOCIAL_DATA.map(item => (
                    <a
                      key={item.platform}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col rounded-2xl border border-brand-home1 bg-white/10 p-4 shadow-[0_5px_60px_rgba(90,59,196,0.25)] transition-colors duration-200 hover:border-brand-home1 hover:bg-brand-home1"
                    >
                      <span className="relative h-5 w-5 shrink-0">
                        <img
                          src={item.icon}
                          alt=""
                          className="absolute inset-0 h-5 w-5 object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
                          aria-hidden
                        />
                        <img
                          src={item.iconHover}
                          alt=""
                          className="absolute inset-0 h-5 w-5 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          aria-hidden
                        />
                      </span>
                      <span className="mt-3 font-body text-2xl font-bold tracking-tight text-brand-home1 transition-colors duration-200 group-hover:text-brand-changehover">
                        {item.followers}
                      </span>
                      <span className="mt-1 font-body text-[10px] uppercase leading-tight tracking-wide text-gray-600 transition-colors duration-200 group-hover:text-brand-changehover">
                        Người theo dõi
                      </span>
                      <span
                        className="absolute bottom-3 right-5 scale-150 text-xl text-gray-400 transition-colors duration-200 group-hover:text-brand-changehover"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </a>
                  ))}
                </div>

                {/* Line ngang */}
                <div
                  className="my-0 h-[1px] w-full mt-3 mb-3"
                  style={{
                    background:
                      'linear-gradient(to right, transparent, #5A3BC4, transparent)',
                  }}
                />

                {/* Fanpage cards */}
                <div className="flex flex-col gap-4">
                  {FANPAGE_DATA.map(page => (
                    <a
                      key={page.name}
                      href={page.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-3xl border-2 border-white bg-white/10 p-4 shadow-sm backdrop-blur-sm transition-all hover:border-brand-home1 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-purple-200/60 bg-purple-100">
                          <img
                            src={page.avatar}
                            alt={page.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 inline-block rounded-full bg-brand-orange px-2 py-0.5 text-[9.5px] uppercase tracking-wide text-white">
                            Fanpage
                          </div>
                          <h3 className="font-body text-lg font-semibold text-brand-home1">
                            {page.name}
                          </h3>
                          <button
                            type="button"
                            className="mt-1 font-body text-xs font-medium text-gray-600 transition-colors hover:text-purple-800"
                          >
                            <span>FOLLOW NGAY</span>
                            <span className="absolute bottom-4 left-54 text-xl text-gray-400 scale-150">
                              →
                            </span>
                          </button>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ScaledCanvas>
  )
}

export function Home() {
  const { isCanvasLayout } = useBreakpoint()

  if (!isCanvasLayout) {
    return <HomeResponsive />
  }

  return <HomeDesktop />
}
