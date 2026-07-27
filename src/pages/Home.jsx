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
import { HomeResponsive } from './home/HomeResponsive'
import { HomeSectionDots } from './home/HomeSectionDots'
import { MaiVangAward, HtvAward } from './home/awards'
import { awardYearPath } from './awards/awardsData'
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
                  className="relative h-auto w-[620px] shrink-0 object-contain object-bottom"
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
                  22 • 12 • 1981
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
                    className="relative h-[700px] w-auto max-w-none shrink-0 object-contain"
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
              <div className="grid grid-cols-2 items-center gap-16">
                <div className="pointer-events-none relative z-50 flex shrink-0 items-end justify-center">
                  <img
                    src={imageHome4}
                    alt="Lê Khánh"
                    className="relative z-50 h-auto w-[620px] shrink-0 rounded-2xl object-contain"
                    style={{ marginTop: '-10px', marginLeft: '-70px' }}
                  />
                </div>

                <div className="flex flex-col justify-center gap-6 pr-20 pt-20">
                  <h2 className="font-display-medium text-center font-display text-[50px] italic leading-tight text-brand-home1">
                    MẠNG XÃ HỘI
                  </h2>
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
                          className="absolute right-5 bottom-3 scale-150 text-xl text-gray-400 transition-colors duration-200 group-hover:text-brand-changehover"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </a>
                    ))}
                  </div>

                  <div
                    className="my-0 mt-3 mb-3 h-[1px] w-full"
                    style={{
                      background:
                        'linear-gradient(to right, transparent, #5A3BC4, transparent)',
                    }}
                  />

                  <div className="flex flex-col gap-4">
                    {FANPAGE_DATA.map(page => (
                      <a
                        key={page.name}
                        href={page.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative rounded-3xl border-2 border-white bg-white/10 p-4 transition-all duration-200 hover:border hover:border-brand-home1 hover:shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-purple-100 ring-2 ring-purple-200/60">
                            <img
                              src={page.avatar}
                              alt={page.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1 pr-8">
                            <div className="mb-1 inline-block rounded-full bg-brand-orange px-2 py-0.5 text-[9.5px] uppercase tracking-wide text-white">
                              Fanpage
                            </div>
                            <h3 className="font-body text-lg font-semibold text-brand-home1 transition-colors duration-200">
                              {page.name}
                            </h3>
                            <span className="mt-1 inline-block font-body text-xs font-medium text-gray-600 transition-colors duration-200">
                              FOLLOW NGAY
                            </span>
                          </div>
                        </div>
                        <span
                          className="absolute right-5 bottom-4 scale-150 text-xl text-gray-400 transition-colors duration-200"
                          aria-hidden="true"
                        >
                          →
                        </span>
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
