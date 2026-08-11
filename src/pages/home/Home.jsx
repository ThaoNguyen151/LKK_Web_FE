import { useEffect, useRef, useState } from 'react'
import { cn } from '@utils'
import imageHome1 from '@assets/image_home_1.png'
import imageHome2 from '@assets/image_home_2.png'
import imageHome4 from '@assets/image_home_4.png'
import imageCupSK from '@assets/images/cup/LHSK.png'
import imageCupLHP from '@assets/images/cup/LHP.png'
import { Header, AwardBlock } from '@components/common'
import { useBreakpoint } from '@hooks'
import { ScaledCanvas } from '@layouts'
import { HomeResponsive } from './HomeResponsive'
import { HomeSectionDots } from './HomeSectionDots'
import { MaiVangAward, HtvAward } from './awards'
import { awardYearPath } from '../awards/awardsData'
import imageTextHome1 from '@assets/images/le-khanh.png'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import avatarCherishK from '@assets/images/avatar/avatar-cherishk.jpg'
import avatar1200HotE from '@assets/images/avatar/avatar-12hote.jpg'
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
import warrow from '@assets/images/subicon/iconWarrow.png'

const SOCIAL_PROFILE_DATA = [
  {
    id: 'self',
    name: 'Diễn viên Lê Khánh',
    image: socialSelfImage,
    imageClassName: 'bottom-0 left-[-8%] top-1 w-[100%] -translate-y-8',
    links: [
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/DvLeKhanh.Official',
        icon: facebookIcon,
        iconHover: facebookWhiteIcon,
      },
      {
        label: 'TikTok',
        href: 'https://www.tiktok.com/@dienvienlekhanh',
        icon: tiktokIcon,
        iconHover: tiktokWhiteIcon,
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/dienvienlekhanh/',
        icon: instagramIcon,
        iconHover: instagramWhiteIcon,
      },
    ],
  },
  {
    id: 'family',
    name: 'Chuyện nhà\nLê Khánh - Tuấn Khải',
    image: socialFamilyImage,
    imageClassName: 'bottom-0 left-0 top-1 w-[90%] -translate-y-8',
    links: [
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61590618325034&locale=vi_VN',
        icon: facebookIcon,
        iconHover: facebookWhiteIcon,
      },
      {
        label: 'TikTok',
        href: 'https://www.tiktok.com/@chuyennhalekhanhtuankhai',
        icon: tiktokIcon,
        iconHover: tiktokWhiteIcon,
      },
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/@ChuyenNhaLeKhanhTuanKhai',
        icon: youtubeIcon,
        iconHover: youtubeWhiteIcon,
      },
    ],
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
    fallbackEmoji: null,
  },
]

/** Wrapper nội dung trong canvas 1536px — không dùng .container (phụ thuộc viewport, vỡ khi zoom). */
const CANVAS_SECTION = 'relative z-10 mx-auto w-full max-w-full px-8'

function HomeDesktop() {
  const scrollRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const sectionRefs = useRef(/** @type {(HTMLElement | null)[]} */ ([]))
  const [activeSection, setActiveSection] = useState(0)
  const scrollDirRef = useRef(/** @type {'forward' | 'reverse'} */ ('forward'))
  const lastScrollTopRef = useRef(0)
  const activeSectionRef = useRef(0)

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const sections = /** @type {HTMLElement[]} */ (
      sectionRefs.current.filter(
        /** @returns {s is HTMLElement} */ s => s != null
      )
    )
    if (sections.length === 0) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    /** @type {Record<number, number>} */
    const ratios = {}
    /** @type {Record<number, boolean>} */
    const inViewState = {}

    /**
     * @param {HTMLElement} sectionEl
     * @param {boolean} inView
     * @param {'forward' | 'reverse'} direction
     */
    const syncInView = (sectionEl, inView, direction) => {
      const content = sectionEl.querySelector('[data-home-section-content]')
      if (!(content instanceof HTMLElement)) return

      if (reducedMotion) {
        content.classList.remove(
          'anim-enter-up',
          'anim-enter-down',
          'anim-exit-up',
          'anim-exit-down'
        )
        content.classList.toggle('is-inview', true)
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
      // Restart CSS animation
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

    const updateActive = () => {
      let bestIndex = 0
      let bestRatio = -1
      Object.entries(ratios).forEach(([key, ratio]) => {
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestIndex = Number(key)
        }
      })
      if (bestRatio > 0) {
        activeSectionRef.current = bestIndex
        setActiveSection(bestIndex)
      }
    }

    const onScroll = () => {
      const top = root.scrollTop
      const delta = top - lastScrollTopRef.current
      if (Math.abs(delta) > 2) {
        scrollDirRef.current = delta > 0 ? 'forward' : 'reverse'
      }
      lastScrollTopRef.current = top
    }

    const observer = new IntersectionObserver(
      entries => {
        const direction = scrollDirRef.current
        entries.forEach(entry => {
          const index = Number(
            /** @type {HTMLElement} */ (entry.target).dataset.homeSection
          )
          ratios[index] = entry.isIntersecting ? entry.intersectionRatio : 0

          const nowInView = entry.isIntersecting
          if (inViewState[index] !== nowInView) {
            inViewState[index] = nowInView
            syncInView(
              /** @type {HTMLElement} */ (entry.target),
              nowInView,
              direction
            )
          }
        })
        updateActive()
      },
      { root, threshold: [0.35, 0.55, 0.7] }
    )

    root.addEventListener('scroll', onScroll, { passive: true })

    sections.forEach(section => {
      observer.observe(section)
      const rect = section.getBoundingClientRect()
      const rootRect = root.getBoundingClientRect()
      const visible =
        rect.top < rootRect.bottom * 0.7 && rect.bottom > rootRect.top + 40
      if (visible) {
        const index = Number(section.dataset.homeSection)
        ratios[index] = 1
        inViewState[index] = true
        syncInView(section, true, 'forward')
      }
    })
    updateActive()

    return () => {
      observer.disconnect()
      root.removeEventListener('scroll', onScroll)
    }
  }, [])

  /** @param {number} index */
  const goToSection = index => {
    const section = sectionRefs.current[index]
    if (!section) return
    scrollDirRef.current =
      index >= activeSectionRef.current ? 'forward' : 'reverse'
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSectionRef.current = index
    setActiveSection(index)
  }

  return (
    <ScaledCanvas>
      <div className="relative h-full">
        {/* Nền cố định — không scroll theo section (giống nav) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-brand-soft">
          <img
            src={rectLeft}
            alt=""
            className="absolute left-0 top-0 w-[590px]"
            aria-hidden
          />
          <img
            src={rectRight}
            alt=""
            className="absolute bottom-[8%] right-0 w-[420px]"
            aria-hidden
          />
          <img
            src={rectBottom}
            alt=""
            className="absolute bottom-0 left-1/2 w-[600px] -translate-x-[70%]"
            aria-hidden
          />
        </div>

        <div
          ref={scrollRef}
          className="relative z-10 h-full snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-transparent"
        >
          <Header layout="canvas" />

          {/* Section 1 - Hero */}
          <section
            ref={el => {
              sectionRefs.current[0] = el
            }}
            data-home-section="0"
            className="pointer-events-none relative z-40 flex h-full snap-start items-center justify-center overflow-hidden"
          >
            <div
              data-home-section-content
              className={cn(
                CANVAS_SECTION,
                'home-section-content flex h-full min-w-0 items-stretch pt-20'
              )}
            >
              <div className="relative z-10 -ml-10 flex h-full shrink-0 items-end">
                <img
                  src={imageHome1}
                  alt="Lê Khánh"
                  className="relative h-auto w-[610px] shrink-0 object-contain object-bottom"
                />

                <div className="pointer-events-auto absolute top-114 right-[10px] rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold tracking-wide whitespace-nowrap text-white shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
                  # NGHỆ SĨ
                </div>

                <div className="pointer-events-auto absolute left-185 top-130 rounded-full bg-brand-header/20 px-6 py-3 text-sm font-semibold tracking-wide whitespace-nowrap text-brand-home1 shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
                  LÊ KIM KHÁNH
                </div>
              </div>

              <div className="relative z-10 h-full min-w-0 flex-1">
                <div className="pointer-events-auto absolute right-45 bottom-23 rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold tracking-wide whitespace-nowrap text-white shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
                  # DIỄN VIÊN
                </div>

                <img
                  src={imageTextHome1}
                  alt="Lê Khánh"
                  className="absolute left-[-20px] top-[200px] z-30 w-[750px] object-contain"
                />

                <div className="pointer-events-auto absolute right-54 top-34 rounded-full bg-white/60 px-5 py-3 text-sm font-semibold tracking-wide whitespace-nowrap text-brand-home1 shadow-[0_20px_60px_rgba(90,59,196,0.25)] backdrop-blur-md">
                  22/12/1981
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 - Bio with Stats */}
          <section
            ref={el => {
              sectionRefs.current[1] = el
            }}
            data-home-section="1"
            className="pointer-events-none relative z-40 flex h-full snap-start items-end justify-center overflow-hidden"
          >
            <div
              data-home-section-content
              className={cn(
                CANVAS_SECTION,
                'home-section-content pointer-events-auto pt-30'
              )}
            >
              <div className="grid min-w-0 grid-cols-5 items-start gap-2">
                <div className="relative z-10 col-span-3 flex min-w-0 flex-col justify-center pl-15 pr-2">
                  <h2 className="font-display-medium mb-15 pt-30 text-center font-display text-6xl italic text-brand-home1">
                    KHO TÀNG NGHỆ THUẬT
                  </h2>
                  <p className="mb-15 font-body text-[16px] font-light leading-relaxed text-gray-700">
                    Sau hơn 20 năm chăm chỉ hoạt động nghệ thuật, Lê Khánh sở
                    hữu một kho tàng vai diễn
                    <br />
                    với đa dạng màu sắc. Cô vinh dự được xếp vào hàng ngũ diễn
                    viên thực lực của Việt Nam.
                  </p>

                  <div className="grid grid-cols-3 gap-10">
                    <div className="rounded-2xl border-2 border-white bg-white/20 p-6 backdrop-blur-sm">
                      <div className="mb-2 text-center font-body text-5xl">
                        <span className="text-black">100</span>
                        <span className="text-brand-home1">+</span>
                      </div>
                      <div className="text-center font-body text-sm uppercase tracking-wide text-gray-600">
                        VỞ DIỄN
                      </div>
                    </div>
                    <div className="rounded-2xl border-2 border-white bg-white/20 p-6 backdrop-blur-sm">
                      <div className="mb-2 text-center font-body text-5xl">
                        <span className="text-black">35</span>
                        <span className="text-brand-home1">+</span>
                      </div>
                      <div className="text-center font-body text-sm uppercase tracking-wide text-gray-600">
                        PHIM TRUYỀN HÌNH
                      </div>
                    </div>
                    <div className="rounded-2xl border-2 border-white bg-white/20 p-6 backdrop-blur-sm">
                      <div className="mb-2 text-center font-body text-5xl">
                        <span className="text-black">15</span>
                        <span className="text-brand-home1">+</span>
                      </div>
                      <div className="text-center font-body text-sm uppercase tracking-wide text-gray-600">
                        PHIM ĐIỆN ẢNH
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none relative z-10 col-span-2 flex shrink-0 items-end justify-end overflow-visible">
                  <img
                    src={imageHome2}
                    alt="Lê Khánh"
                    className="relative h-[690px] w-auto max-w-none shrink-0 object-contain"
                    style={{ marginTop: '-80px', marginRight: '-10px' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 - Awards */}
          <section
            ref={el => {
              sectionRefs.current[2] = el
            }}
            data-home-section="2"
            className="relative z-40 flex h-full snap-start items-end justify-center overflow-hidden"
          >
            <div
              data-home-section-content
              className={cn(
                CANVAS_SECTION,
                'home-section-content flex h-full w-full items-center pt-20 pb-8'
              )}
            >
              <div className="grid w-full min-w-0 grid-cols-3 items-stretch gap-8">
                <div className="min-w-0 overflow-hidden">
                  <MaiVangAward />
                </div>

                <div className="relative flex h-full min-h-0 flex-col overflow-hidden px-6 pt-5">
                  <div
                    className="absolute left-0 top-[0%] h-[100%] w-[1px]"
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent, #5A3BC4, transparent)',
                    }}
                  />
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
                      years={[
                        { label: '2024', href: `#${awardYearPath('2024')}` },
                      ]}
                      count="1"
                      cupSrc={imageCupSK}
                      cupAlt="Cup Liên hoan sân khấu"
                      cupClassName="!h-40"
                      countClassName="!translate-y-[-16%]"
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
                      years={[
                        { label: '2011', href: `#${awardYearPath('2011')}` },
                      ]}
                      count="1"
                      cupSrc={imageCupLHP}
                      cupAlt="Cup Liên hoan phim"
                      cupClassName="!h-40"
                      countClassName="!translate-y-[-16%]"
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
          <section
            ref={el => {
              sectionRefs.current[3] = el
            }}
            data-home-section="3"
            className="pointer-events-none relative z-40 flex h-full snap-start items-end justify-center overflow-hidden"
          >
            <div
              data-home-section-content
              className={cn(
                CANVAS_SECTION,
                'home-section-content pointer-events-auto'
              )}
            >
              <div className="grid grid-cols-2 items-center gap-1">
                <div className="pointer-events-none relative z-50 flex shrink-0 items-end justify-center">
                  <img
                    src={imageHome4}
                    alt="Lê Khánh"
                    className="relative z-50 h-auto w-[610px] shrink-0 rounded-2xl object-contain"
                    style={{ marginTop: '-10px', marginLeft: '-70px' }}
                  />
                </div>

                <div className="flex origin-center scale-90 flex-col justify-center pr-16 pt-14">
                  <h2 className="font-display-medium text-center font-display text-[50px] italic leading-tight text-brand-home1">
                    MẠNG XÃ HỘI
                  </h2>

                  <div className="mt-7 grid grid-cols-2 gap-12 px-2">
                    {SOCIAL_PROFILE_DATA.map(profile => (
                      <article
                        key={profile.id}
                        className="relative h-[265px] rounded-2xl bg-brand-home1 shadow-[0_10px_35px_rgba(90,59,196,0.24)]"
                      >
                        <img
                          src={profile.image}
                          alt={profile.name.replace('\n', ' ')}
                          className={cn(
                            'pointer-events-none absolute z-10 h-72 object-contain object-bottom',
                            profile.imageClassName
                          )}
                        />

                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-28 rounded-b-2xl bg-gradient-to-t from-brand-home1 via-brand-home1/75 to-transparent"
                          aria-hidden
                        />

                        <h3 className="absolute bottom-4 left-5 z-20 whitespace-pre-line font-body text-lg font-semibold leading-[1.5] text-white">
                          {profile.name}
                        </h3>

                        <div className="absolute -right-6 bottom-10 z-30 flex flex-col gap-3">
                          {profile.links.map(link => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${link.label} – ${profile.name.replace('\n', ' ')}`}
                              className="group relative flex h-13 w-13 items-center justify-center rounded-full border-2 border-brand-home1 bg-white shadow-[0_6px_18px_rgba(90,59,196,0.2)] transition-colors hover:bg-brand-home1 hover:border-white"
                            >
                              <img
                                src={link.icon}
                                alt=""
                                className="absolute h-6 w-6 object-contain transition-opacity group-hover:opacity-0"
                              />
                              <img
                                src={link.iconHover}
                                alt=""
                                className="absolute h-6 w-6 object-contain opacity-0 transition-opacity group-hover:opacity-100"
                              />
                            </a>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>

                  <div
                    className="mb-5 mt-12 h-px w-full"
                    style={{
                      background:
                        'linear-gradient(to right, transparent, #5A3BC4, transparent)',
                    }}
                  />

                  <h2 className="font-display-medium text-center font-display text-[42px] italic leading-tight text-brand-home1">
                    FANSITE
                  </h2>

                  <div className="mt-5 grid grid-cols-2 gap-5">
                    {FANPAGE_DATA.map(page => (
                      <a
                        key={page.name}
                        href={page.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex min-h-24 items-center gap-4 rounded-2xl border-2 border-white bg-white/20 p-4 transition-all duration-200 hover:border-brand-home1 hover:shadow-[0_8px_30px_rgba(90,59,196,0.18)]"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-purple-100 ring-2 ring-purple-200/60">
                          <img
                            src={page.avatar}
                            alt={page.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-body text-[18px] font-semibold leading-snug text-brand-home1">
                            {page.name}
                          </h3>

                          <span className="mt-1 inline-flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-wide leading-none text-gray-500">
                            <span className="flex items-center mt-0.3">
                              Theo dõi
                            </span>

                            <span aria-hidden className="flex items-start">
                              <img
                                src={warrow}
                                alt=""
                                className="h-3 w-3 brightness-0 opacity-50"
                              />
                            </span>
                          </span>
                        </div>

                        <span
                          className="absolute inset-0 -z-10 rounded-2xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <HomeSectionDots activeIndex={activeSection} onSelect={goToSection} />
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
