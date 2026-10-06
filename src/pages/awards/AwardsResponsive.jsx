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

/** Chiều cao thiết kế cố định của khối nội dung (logo → pager) */
const STACK_DESIGN_HEIGHT = 620

/**
 * @param {string} eventName
 */
function formatEventNameLines(eventName) {
  const text = eventName.trim()
  const cityIdx = text.indexOf('THÀNH PHỐ')
  if (cityIdx > 0) {
    return [text.slice(0, cityIdx).trim(), text.slice(cityIdx).trim()]
  }
  // Tên ngắn (HTV AWARDS 2009, GIẢI MAI VÀNG 2023…) — giữ 1 dòng
  return [text]
}

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
      className="flex h-10 w-full items-center justify-center gap-2.5 px-5"
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
                ? 'min-w-[3.25rem] flex-col gap-1'
                : 'h-2 w-2 rounded-full bg-brand-home1/30 hover:bg-brand-home1/50'
            )}
          >
            {isActive ? (
              <>
                <span className="font-body text-[15px] font-semibold leading-none text-brand-home1">
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
 * @param {object} props
 * @param {import('./awardsData').AwardEntry} props.entry
 */
function AwardMobileTop({ entry }) {
  const titleStyle = entry.titleStyle ?? 'subtitle-emphasis'
  const playLabel = entry.playLabel ?? 'Vở diễn'
  const eventLines = formatEventNameLines(entry.eventName ?? '')

  const titleClass =
    titleStyle === 'title-emphasis'
      ? 'font-body text-[20px] font-extrabold leading-tight text-brand-orange'
      : 'font-body text-[13px] font-medium leading-none tracking-wide text-brand-orange'

  const subtitleClass =
    titleStyle === 'title-emphasis'
      ? 'mt-1.5 font-body text-[13px] font-medium leading-none tracking-wide text-brand-orange'
      : 'mt-1.5 font-body text-[20px] font-extrabold leading-tight text-brand-orange'

  return (
    <div className="flex w-full flex-col items-center px-5">
      <img src={entry.logoSrc} alt="" className="h-14 w-auto object-contain" />

      <p className="mt-2.5 max-w-[18rem] text-center font-body text-[11px] font-semibold uppercase leading-snug tracking-wide text-brand-home1">
        {eventLines.map(line => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      <div className="mt-5 inline-flex w-full max-w-[22rem] items-center justify-center gap-2">
        <img
          src={wreathL}
          alt=""
          className="h-12 w-auto shrink-0 object-contain"
          aria-hidden
        />
        <div className="min-w-0 flex-1 px-1 text-center">
          <p className={titleClass}>{entry.title}</p>
          <h2 className={subtitleClass}>{entry.subtitle}</h2>
        </div>
        <img
          src={wreathR}
          alt=""
          className="h-12 w-auto shrink-0 object-contain"
          aria-hidden
        />
      </div>

      <div className="mt-3.5 space-y-1 text-center font-body text-xs text-gray-800">
        <p>
          <span className="italic text-gray-500">Vai diễn:</span>{' '}
          <span className="font-semibold uppercase">{entry.role}</span>
        </p>
        <p>
          <span className="italic text-gray-500">{playLabel}:</span>{' '}
          <span className="font-semibold uppercase">{entry.play}</span>
        </p>
      </div>
    </div>
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

  // Scale cả khối nội dung cho vừa mọi chiều cao màn — gap & cúp giữ tỷ lệ giống nhau
  useLayoutEffect(() => {
    const stage = stageRef.current
    const stack = stackRef.current
    if (!stage || !stack) return

    const update = () => {
      const available = stage.clientHeight
      const needed = stack.offsetHeight || STACK_DESIGN_HEIGHT
      const next = available > 0 ? Math.min(1, available / needed) : 1
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
        {/* Stage: căn giữa; scale xuống nếu máy thấp để luôn thấy năm */}
        <div
          ref={stageRef}
          className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-0"
        >
          <div
            ref={stackRef}
            className="flex w-full max-w-md flex-col"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Lề trên trong khối thiết kế */}
            <div className="shrink-0 pt-6">
              <AwardMobileTop
                key={`${active.year}-${active.entry.slug ?? active.entryIndex}`}
                entry={active.entry}
              />
            </div>

            {/* Gap cố định chữ → cúp (không flex-1 nên không phình trên máy cao) */}
            <div className="h-5 shrink-0" aria-hidden />

            {/* Cúp + khối tím — size cố định */}
            <div className="relative mx-auto h-[200px] w-full shrink-0">
              <img
                src={awardBlock}
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-1/2 h-[130px] w-[280px] max-w-[86%] -translate-x-1/2 object-contain object-bottom"
              />
              {active.entry.cupSrc ? (
                <img
                  src={active.entry.cupSrc}
                  alt=""
                  className="absolute bottom-2 left-1/2 z-10 h-[185px] w-auto max-w-[220px] -translate-x-1/2 object-contain object-bottom drop-shadow-[0_8px_24px_rgba(90,59,196,0.2)]"
                />
              ) : null}
            </div>

            {/* Phân trang — nằm trong stack nên luôn hiện cùng tỷ lệ */}
            <div className="shrink-0 pt-4 pb-3">
              {yearSlides.length > 1 ? (
                <div
                  className="mb-2 flex justify-center gap-1.5"
                  role="tablist"
                  aria-label={`Giải thưởng năm ${activeYear}`}
                >
                  {yearSlides.map(s => (
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
                          ? 'w-4 bg-brand-orange'
                          : 'w-1.5 bg-brand-orange/30'
                      )}
                    />
                  ))}
                </div>
              ) : null}

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
