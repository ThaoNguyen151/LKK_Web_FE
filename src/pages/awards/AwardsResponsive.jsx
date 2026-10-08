import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import rectFull from '@assets/Rectangle-full.png'
import awardBlock from '@assets/images/mobile/award/award.png'
import wreathL from '@assets/images/icon/wreathL.png'
import wreathR from '@assets/images/icon/wreathR.png'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { cn, ROUTES } from '@utils'
import {
  DEFAULT_AWARD_YEAR,
  YEARS,
  awardYearPath,
  getAwardByYear,
  getAwardEntries,
} from './awardsData'

const SWIPE_THRESHOLD_PX = 48
const AUTO_ADVANCE_MS = 4_000

/** Lề dưới (giữ nguyên) */
const EDGE_BOTTOM = '1.25rem'
/** Lề trên lớn hơn lề dưới */
const EDGE_TOP = '2.25rem'

/**
 * @returns {Array<{ year: string, entryIndex: number, entry: import('./awardsData').AwardEntry }>}
 */
function buildAwardSlides() {
  /** @type {Array<{ year: string, entryIndex: number, entry: import('./awardsData').AwardEntry }>} */
  const slides = []
  for (const year of YEARS) {
    const award = getAwardByYear(year)
    if (!award) continue
    getAwardEntries(award).forEach((entry, entryIndex) => {
      slides.push({ year, entryIndex, entry })
    })
  }
  return slides
}

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 */
function AwardsMobileBackdrop({ className, style }) {
  return (
    <div
      aria-hidden
      className={cn('overflow-hidden bg-brand-soft', className)}
      style={style}
    >
      <div className="absolute left-[-65px] top-[8%] flex h-[min(60vw,240px)] w-[min(48vw,180px)] items-center justify-start overflow-visible">
        <img
          src={rectFull}
          alt=""
          className="h-auto w-[min(100vw,480px)] max-w-none translate-x-[-50%] rotate-[330deg] object-contain opacity-80"
        />
      </div>
      <img
        src={rectFull}
        alt=""
        className="absolute right-0 top-[45%] h-auto w-[min(80vw,340px)] max-w-none translate-x-[45%] object-contain opacity-75"
      />
    </div>
  )
}

/**
 * @param {object} props
 * @param {string} props.activeYear
 * @param {(year: string) => void} props.onSelectYear
 */
function AwardYearPager({ activeYear, onSelectYear }) {
  return (
    <div
      className="flex h-10 w-full items-center justify-center gap-3 px-5"
      role="tablist"
      aria-label="Chọn năm giải thưởng"
    >
      {YEARS.map(year => {
        const isActive = year === activeYear

        return (
          <button
            key={year}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Năm ${year}`}
            onClick={() => onSelectYear(year)}
            className={cn(
              'flex shrink-0 items-center justify-center transition-all duration-300 ease-out',
              isActive
                ? 'min-w-[2.25rem] flex-col gap-1.5'
                : 'h-1.5 w-2 rounded-full bg-brand-home1/15 hover:bg-brand-home1/50'
            )}
          >
            {isActive ? (
              <>
                <span className="font-body text-[13px] font-semibold leading-none text-brand-home1">
                  {year}
                </span>
                <span className="h-[2px] w-full rounded-full bg-brand-home1" />
              </>
            ) : (
              <span className="sr-only">{year}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/**
 * @param {import('./awardsData').AwardEntry} entry
 */
function getTitleClasses(entry) {
  const titleStyle = entry.titleStyle ?? 'subtitle-emphasis'
  // leading đủ cao để không cắt dấu tiếng Việt
  const titleClass =
    titleStyle === 'title-emphasis'
      ? 'font-body font-black leading-[1.35] tracking-tight text-brand-orange'
      : 'font-body font-bold leading-[1.35] tracking-wide text-brand-orange'
  const subtitleClass =
    titleStyle === 'title-emphasis'
      ? 'mt-0 font-body font-bold leading-[1.35] tracking-wide text-brand-orange'
      : 'mt-0 font-body font-black leading-[1.35] tracking-tight text-brand-orange'
  const titleMaxPx = titleStyle === 'title-emphasis' ? 20 : 15
  const subtitleMaxPx = titleStyle === 'title-emphasis' ? 15 : 20
  return { titleClass, subtitleClass, titleMaxPx, subtitleMaxPx }
}

/**
 * Một hàng chữ — câu dài tự giảm font-size cho vừa khung, không wrap.
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {'p' | 'h2'} [props.as]
 * @param {number} [props.maxPx]
 * @param {number} [props.minPx]
 */
function FitOneLine({ children, className, as = 'p', maxPx = 20, minPx = 10 }) {
  const ref = useRef(/** @type {HTMLElement | null} */ (null))

  useLayoutEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const fit = () => {
      let size = maxPx
      el.style.fontSize = `${size}px`
      el.style.whiteSpace = 'nowrap'
      // Cho phép đo full width trước khi thu
      while (el.scrollWidth > parent.clientWidth && size > minPx) {
        size -= 0.5
        el.style.fontSize = `${size}px`
      }
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [children, maxPx, minPx])

  const Tag = as
  return (
    <Tag
      ref={el => {
        ref.current = el
      }}
      className={cn('whitespace-nowrap py-0.5', className)}
      style={{ lineHeight: 1.35 }}
    >
      {children}
    </Tag>
  )
}

/**
 * @param {object} props
 * @param {string} props.route
 */
export function AwardsResponsive({ route }) {
  const slides = useMemo(() => buildAwardSlides(), [])
  const stageRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const stackRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [scale, setScale] = useState(1)

  const yearFromRoute = useMemo(() => {
    if (!route.startsWith(ROUTES.AWARDS)) return null
    const rest = route.slice(ROUTES.AWARDS.length).replace(/^\//, '')
    const year = rest.split('/')[0]
    return /^\d{4}$/.test(year) ? year : null
  }, [route])

  const initialIndex = useMemo(() => {
    const y =
      yearFromRoute && getAwardByYear(yearFromRoute)
        ? yearFromRoute
        : DEFAULT_AWARD_YEAR
    const idx = slides.findIndex(s => s.year === y)
    return idx >= 0 ? idx : 0
  }, [yearFromRoute, slides])

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const touchStartX = useRef(/** @type {number | null} */ (null))

  useEffect(() => {
    setActiveIndex(initialIndex)
  }, [initialIndex])

  const active = slides[activeIndex] ?? slides[0]
  const activeYear = active?.year ?? DEFAULT_AWARD_YEAR

  // Chỉ scale khi máy thấp bị tràn — máy cao giữ lề đều, không phình gap
  useLayoutEffect(() => {
    const stage = stageRef.current
    const stack = stackRef.current
    if (!stage || !stack) return

    const update = () => {
      const available = stage.clientHeight
      const needed = stack.scrollHeight
      const next = available > 0 && needed > available ? available / needed : 1
      setScale(next)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(stage)
    ro.observe(stack)
    return () => ro.disconnect()
  }, [activeIndex])

  useEffect(() => {
    const target = awardYearPath(activeYear)
    if (route === target) return
    const nextHash = `#${target}`
    if (window.location.hash !== nextHash) {
      window.location.replace(nextHash)
    }
  }, [route, activeYear])

  const goToIndex = useCallback(
    /** @param {number} index */
    index => {
      if (!slides.length) return
      const next = (index + slides.length) % slides.length
      setActiveIndex(next)
      const year = slides[next].year
      const nextHash = `#${awardYearPath(year)}`
      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash
      }
    },
    [slides]
  )

  const goNext = useCallback(
    () => goToIndex(activeIndex + 1),
    [activeIndex, goToIndex]
  )
  const goPrev = useCallback(
    () => goToIndex(activeIndex - 1),
    [activeIndex, goToIndex]
  )

  useEffect(() => {
    const id = window.setInterval(() => goNext(), AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [goNext])

  /** @param {import('react').TouchEvent} event */
  const onTouchStart = event => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  /** @param {import('react').TouchEvent} event */
  const onTouchEnd = event => {
    const startX = touchStartX.current
    touchStartX.current = null
    if (startX == null) return
    const endX = event.changedTouches[0]?.clientX
    if (endX == null) return
    const delta = endX - startX
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return
    if (delta < 0) goNext()
    else goPrev()
  }

  const selectYear = useCallback(
    /** @param {string} year */
    year => {
      const idx = slides.findIndex(s => s.year === year)
      if (idx >= 0) goToIndex(idx)
    },
    [slides, goToIndex]
  )

  if (!active) return null

  const yearSlides = slides
    .map((s, i) => ({ ...s, i }))
    .filter(s => s.year === activeYear)

  return (
    <PageShell className="relative h-dvh max-h-dvh overflow-hidden">
      <AwardsMobileBackdrop className="pointer-events-none fixed inset-0 z-0" />
      <Header variant="fixed" layout="mobile" />

      <main
        className="relative z-10 flex h-dvh max-h-dvh flex-col overflow-hidden pt-15"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/*
          Lề trên lớn hơn, lề dưới giữ nguyên.
          Logo → tên giải → vai/vở → cúp: 3 khoảng flex-1 bằng nhau.
        */}
        <div
          ref={stageRef}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
          style={{
            paddingTop: EDGE_TOP,
            paddingBottom: `max(${EDGE_BOTTOM}, env(safe-area-inset-bottom, 0px))`,
          }}
        >
          <div
            ref={stackRef}
            key={`${active.year}-${active.entry.slug ?? active.entryIndex}`}
            className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col px-5"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            <img
              src={active.entry.logoSrc}
              alt=""
              className="awards-mobile-slide-ltr mx-auto h-26 w-auto shrink-0 object-contain"
            />

            <div className="min-h-3 flex-1" aria-hidden />

            {/* 2. Tên giải + vòng nguyệt quế — mỗi dòng 1 hàng, dài thì thu chữ */}
            {(() => {
              const { titleClass, subtitleClass, titleMaxPx, subtitleMaxPx } =
                getTitleClasses(active.entry)
              return (
                <div className="awards-mobile-slide-ltr inline-flex w-max max-w-full shrink-0 items-center gap-2 self-center">
                  <img
                    src={wreathL}
                    alt=""
                    className="h-12 w-auto shrink-0 object-contain"
                    aria-hidden
                  />
                  <div className="min-w-0 overflow-x-clip overflow-y-visible py-0.5 text-center">
                    <FitOneLine
                      className={titleClass}
                      maxPx={titleMaxPx}
                      minPx={10}
                    >
                      {active.entry.title}
                    </FitOneLine>
                    <FitOneLine
                      as="h2"
                      className={subtitleClass}
                      maxPx={subtitleMaxPx}
                      minPx={10}
                    >
                      {active.entry.subtitle}
                    </FitOneLine>
                  </div>
                  <img
                    src={wreathR}
                    alt=""
                    className="h-12 w-auto shrink-0 object-contain"
                    aria-hidden
                  />
                </div>
              )
            })()}

            <div className="min-h-3 flex-1" aria-hidden />

            {/* 3. Vai diễn / vở diễn — L→R */}
            <div className="awards-mobile-slide-ltr shrink-0 space-y-0.5 text-center font-body text-[13px] text-gray-800">
              <p>
                <span className="italic font-body text-[10px] text-gray-500">
                  Vai diễn:
                </span>{' '}
                <span className="font-semibold uppercase">
                  {active.entry.role}
                </span>
              </p>
              <p>
                <span className="italic font-body text-[10px] text-gray-500">
                  {active.entry.playLabel ?? 'Vở diễn'}:
                </span>{' '}
                <span className="font-semibold uppercase">
                  {active.entry.play}
                </span>
              </p>
            </div>

            <div className="min-h-3 flex-1" aria-hidden />

            {/* 4. Khối tím đứng yên; chỉ hình cúp R→L */}
            <div className="relative mx-auto h-[280px] w-full shrink-0">
              <img
                src={awardBlock}
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-1/2 h-[170px] w-[320px] max-w-[90%] -translate-x-1/2 object-contain object-bottom"
              />
              {active.entry.cupSrc ? (
                <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2">
                  <img
                    src={active.entry.cupSrc}
                    alt=""
                    className="awards-mobile-slide-rtl h-[270px] w-auto object-contain object-bottom drop-shadow-[0_8px_24px_rgba(90,59,196,0.2)]"
                  />
                </div>
              ) : null}
            </div>

            {/* Phân trang — sát lề dưới; chừa chỗ cố định cho chấm phụ (2011) để không xê dịch */}
            <div className="shrink-0 pt-4">
              <div
                className="mb-2 flex h-3 items-center justify-center gap-1.5"
                role={yearSlides.length > 1 ? 'tablist' : undefined}
                aria-label={
                  yearSlides.length > 1
                    ? `Giải thưởng năm ${activeYear}`
                    : undefined
                }
                aria-hidden={yearSlides.length < 2}
              >
                {yearSlides.length > 1
                  ? yearSlides.map(s => (
                      <button
                        key={`${s.year}-${s.entryIndex}`}
                        type="button"
                        role="tab"
                        aria-selected={s.i === activeIndex}
                        aria-label={s.entry.title}
                        onClick={() => goToIndex(s.i)}
                        className={cn(
                          'h-1.5 rounded-full transition-all',
                          s.i === activeIndex
                            ? 'w-2 bg-brand-orange'
                            : 'w-2 bg-brand-orange/30'
                        )}
                      />
                    ))
                  : null}
              </div>

              <AwardYearPager
                activeYear={activeYear}
                onSelectYear={selectYear}
              />
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
