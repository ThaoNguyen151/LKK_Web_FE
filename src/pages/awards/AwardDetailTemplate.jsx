import { useEffect, useRef, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import blockGT from '@assets/images/award/block-GT.png'
import blockCup from '@assets/images/award/block-Cup.png'
import wreathL from '@assets/images/icon/wreathL.png'
import wreathR from '@assets/images/icon/wreathR.png'
import { ROUTES } from '@utils'
import { AwardYearSidebar } from './AwardYearSidebar'
import { AWARD_TITLE_STYLES, getAwardCups, getAwardEntries } from './awardsData'

/** Chừa mép phải cho block-Cup (không chiếm hết chiều ngang) */
const CUP_ZONE_CLASS =
  'pr-6 sm:pr-10 lg:pr-[min(16vw,200px)] xl:pr-[min(14vw,240px)]'
/** Chừa cột năm + khoảng hở trái; không trừ cả chiều rộng block-GT */
const CENTER_ZONE_LEFT_CLASS =
  'pl-4 sm:pl-6 lg:pl-[calc(5.5rem+2.5rem)] xl:pl-[calc(5.5rem+3.5rem)]'

const EXIT_MS = 900
const ENTER_MS = 1400

/**
 * @param {object} props
 * @param {import('./awardsData').AwardEntry} props.entry
 * @param {'single' | 'dual'} [props.variant]
 */
function AwardEntryBlock({ entry, variant = 'single' }) {
  const titleStyleKey = entry.titleStyle ?? 'subtitle-emphasis'
  const baseStyles =
    AWARD_TITLE_STYLES[titleStyleKey] ?? AWARD_TITLE_STYLES['subtitle-emphasis']
  const isDual = variant === 'dual'
  const playLabel = entry.playLabel ?? 'Vở diễn'

  /** Dual: thu nhỏ chữ để 2 giải vừa 1 viewport */
  const titleStyles = isDual
    ? titleStyleKey === 'title-emphasis'
      ? {
          title:
            'whitespace-nowrap font-body text-base font-extrabold leading-none text-brand-orange sm:text-xl md:text-2xl lg:text-3xl',
          subtitle:
            'mt-2 whitespace-nowrap font-body text-xs font-medium leading-none tracking-wide text-brand-orange sm:mt-2.5 sm:text-sm lg:text-base',
        }
      : {
          title:
            'whitespace-nowrap font-body text-xs font-medium leading-none tracking-wide text-brand-orange sm:text-sm lg:text-base',
          subtitle:
            'mt-2 whitespace-nowrap font-body text-base font-extrabold leading-none text-brand-orange sm:mt-2.5 sm:text-xl md:text-2xl lg:text-3xl',
        }
    : baseStyles

  const logoClass = isDual
    ? 'relative z-20 mb-3 h-12 w-auto object-contain sm:mb-4 sm:h-14 lg:h-20'
    : 'relative z-20 -mt-6 mb-8 h-20 w-auto object-contain sm:-mt-10 sm:mb-10 sm:h-24 lg:-mt-14 lg:mb-12 lg:h-[7.5rem]'

  const wreathClass = isDual
    ? 'h-10 w-auto shrink-0 object-contain sm:h-12 lg:h-14'
    : 'h-16 w-auto shrink-0 object-contain sm:h-10 lg:h-15 xl:h-20'

  const metaClass = isDual
    ? 'mt-4 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-1 font-body text-sm text-gray-800 sm:mt-5 sm:gap-x-10'
    : 'mt-10 w-full space-y-0.5 font-body text-sm text-gray-800 sm:mt-14 sm:space-y-1 lg:mt-12'

  return (
    <div className="flex w-full flex-col items-center text-center">
      <img src={entry.logoSrc} alt="" className={logoClass} />

      <div className="inline-flex w-fit max-w-full items-center justify-center gap-2 sm:gap-3 lg:gap-2">
        <img src={wreathL} alt="" className={wreathClass} aria-hidden />
        <div className="min-w-0 px-0.5 text-center sm:px-5">
          <p className={titleStyles.title}>{entry.title}</p>
          <h2 className={titleStyles.subtitle}>{entry.subtitle}</h2>
        </div>
        <img src={wreathR} alt="" className={wreathClass} aria-hidden />
      </div>

      {isDual ? (
        <div className={metaClass}>
          <p className="whitespace-nowrap">
            <span className="text-[12px] italic text-gray-600">Vai diễn:</span>{' '}
            <span className="text-sm font-semibold uppercase">
              {entry.role}
            </span>
          </p>
          <p className="whitespace-nowrap">
            <span className="text-[12px] italic text-gray-600">
              {playLabel}:
            </span>{' '}
            <span className="text-sm font-semibold uppercase">
              {entry.play}
            </span>
          </p>
        </div>
      ) : (
        <div className={metaClass}>
          <p className="whitespace-nowrap">
            <span className="text-[12px] italic text-gray-600">Vai diễn:</span>{' '}
            <span className="text-sm font-semibold uppercase">
              {entry.role}
            </span>
          </p>
          <p className="whitespace-nowrap">
            <span className="text-[12px] italic text-gray-600">
              {playLabel}:
            </span>{' '}
            <span className="text-sm font-semibold uppercase">
              {entry.play}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * @param {object} props
 * @param {string[]} props.cups
 * @param {import('./awardsData').AwardEntry[]} props.entries
 * @param {string} [props.className]
 * @param {string} [props.animKey]
 */
function AwardCupsLayer({ cups, entries, className = '', animKey }) {
  if (cups.length > 1) {
    return (
      <div
        key={animKey}
        className={`award-anim-layer relative z-10 mb-[28%] mr-[5%] ml-auto flex items-end justify-end gap-8 pr-[4%] sm:mb-[30%] sm:gap-10 sm:pr-[6%] lg:mb-[32%] lg:gap-5 ${className}`}
      >
        <img
          src={cups[1]}
          alt=""
          className="relative z-20 mb-[10%] h-[min(48vh,360px)] w-auto object-contain object-bottom sm:h-[min(52vh,400px)]"
        />
        <img
          src={cups[0]}
          alt=""
          className="relative z-10 mb-[4%] h-[min(52vh,400px)] w-auto object-contain object-bottom sm:mb-[35%] sm:h-[min(56vh,440px)]"
        />
      </div>
    )
  }

  if (!cups[0]) return null

  return (
    <img
      key={animKey}
      src={cups[0]}
      alt={entries[0]?.eventName ?? ''}
      className={`award-anim-layer relative z-10 mb-[35%] ml-[30%] h-[120%] w-auto max-w-[55%] object-contain ${className}`}
    />
  )
}

/**
 * @param {object} props
 * @param {import('./awardsData').AwardEntry[]} props.entries
 * @param {boolean} props.isDual
 * @param {string} [props.className]
 * @param {string} [props.animKey]
 */
function AwardContentLayer({ entries, isDual, className = '', animKey }) {
  return (
    <div
      key={animKey}
      className={`award-anim-layer pointer-events-auto flex w-full flex-col items-center px-3 text-center sm:px-6 lg:px-8 ${
        isDual
          ? 'max-w-[56rem] gap-8 sm:max-w-[64rem] sm:gap-10 lg:max-w-[55rem] lg:gap-12'
          : 'max-w-[56rem] sm:max-w-[64rem] lg:max-w-[55rem]'
      } ${className}`}
    >
      {entries.map((entry, index) => (
        <AwardEntryBlock
          key={entry.slug ?? `${entry.title}-${index}`}
          entry={entry}
          variant={isDual ? 'dual' : 'single'}
        />
      ))}
    </div>
  )
}

/**
 * Layout:
 * [Năm — cột trái ngoài cùng] | [Home / Giải thưởng + nội dung 2 cột]
 * Năm dual (2011): 2 giải xếp dọc + 2 cúp trên block-Cup.
 * Đổi năm: logo/chữ từ trên xuống; cúp từ dưới lên (exit + enter).
 * block-Cup giữ cố định.
 *
 * @param {object} props
 * @param {string} props.year
 * @param {import('./awardsData').AwardYearDetail} props.award
 */
export function AwardDetailTemplate({ year, award }) {
  const [displayYear, setDisplayYear] = useState(year)
  const [displayAward, setDisplayAward] = useState(award)
  const [phase, setPhase] = useState(
    /** @type {'idle' | 'exit' | 'enter'} */ ('idle')
  )
  const timersRef = useRef(/** @type {number[]} */ ([]))
  const displayRef = useRef({ year, award })

  useEffect(() => {
    if (
      year === displayRef.current.year &&
      award === displayRef.current.award
    ) {
      return
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    timersRef.current.forEach(id => window.clearTimeout(id))
    timersRef.current = []

    if (reducedMotion) {
      displayRef.current = { year, award }
      const id = window.setTimeout(() => {
        setDisplayYear(year)
        setDisplayAward(award)
        setPhase('idle')
      }, 0)
      timersRef.current.push(id)
      return () => {
        timersRef.current.forEach(t => window.clearTimeout(t))
        timersRef.current = []
      }
    }

    const startId = window.setTimeout(() => {
      setPhase('exit')
    }, 0)

    const exitId = window.setTimeout(() => {
      displayRef.current = { year, award }
      setDisplayYear(year)
      setDisplayAward(award)
      setPhase('enter')
      const enterId = window.setTimeout(() => {
        setPhase('idle')
      }, ENTER_MS)
      timersRef.current.push(enterId)
    }, EXIT_MS)

    timersRef.current.push(startId, exitId)

    return () => {
      timersRef.current.forEach(id => window.clearTimeout(id))
      timersRef.current = []
    }
  }, [year, award])

  const entries = getAwardEntries(displayAward)
  const cups = getAwardCups(displayAward)
  const isDual = entries.length > 1
  const contentAnimClass =
    phase === 'exit'
      ? 'award-anim-content-exit'
      : phase === 'enter'
        ? 'award-anim-content-enter'
        : ''
  const cupAnimClass =
    phase === 'exit'
      ? 'award-anim-cup-exit'
      : phase === 'enter'
        ? 'award-anim-cup-enter'
        : ''

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      {/* Background decorations — fixed shell */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={rectLeft}
          alt=""
          className="absolute bottom-[-200px] left-0 w-[590px]"
          aria-hidden
        />
        <img
          src={rectRight}
          alt=""
          className="absolute right-0 bottom-19 w-[420px]"
          aria-hidden
        />
        <img
          src={rectBottom}
          alt=""
          className="absolute bottom-0 left-2/3 w-[600px] -translate-x-[70%]"
          aria-hidden
        />
        {/* block-Cup cố định; cúp trượt từ dưới lên */}
        <div className="absolute bottom-0 right-0 z-[1] flex h-[min(48vh,380px)] w-[min(55vw,600px)] items-center justify-center">
          <img
            src={blockCup}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-contain object-right-bottom"
            aria-hidden
          />
          <AwardCupsLayer
            cups={cups}
            entries={entries}
            animKey={`cups-${displayYear}-${phase}`}
            className={cupAnimClass}
          />
        </div>
      </div>

      {/* Mobile: năm ngang trên cùng */}
      <div className="relative z-10 shrink-0 px-4 pt-3 lg:hidden">
        <AwardYearSidebar
          activeYear={year}
          orientation="horizontal"
          className="mb-2"
        />
      </div>

      {/* Desktop: 2 cột — năm trái ngoài cùng | phần còn lại */}
      <div className="relative z-10 mx-auto grid h-full min-h-0 w-full max-w-[1440px] grid-cols-1 px-4 py-3 sm:px-6 lg:grid-cols-[5.5rem_1fr] lg:gap-12 lg:px-10 lg:py-6 xl:px-10">
        <AwardYearSidebar
          activeYear={year}
          orientation="vertical"
          className="hidden h-full min-h-0 justify-center lg:flex"
        />

        <div className="relative flex min-h-0 min-w-0 flex-col">
          <div className="relative z-10 mb-0 shrink-0 self-start">
            <img
              src={blockGT}
              alt=""
              className="pointer-events-none block h-auto w-[min(55vw,300px)] sm:w-[340px] lg:w-[400px]"
              aria-hidden
            />
            <div className="absolute inset-0 z-10 mt-3 flex flex-col justify-start px-10 py-2 sm:px-6 lg:px-7">
              <p className="mb-3 font-body text-[8px] leading-tight text-white/50 sm:text-[11px]">
                <a
                  href={`#${ROUTES.HOME}`}
                  className="font-semibold text-white hover:underline"
                >
                  Home
                </a>
                <span className="mx-1">/</span>
                <span>Giải Thưởng</span>
              </p>
              <h1
                className="font-display text-2xl italic tracking-wide text-white sm:text-3xl lg:text-5xl"
                style={{ WebkitTextStroke: '0.2px white' }}
              >
                GIẢI THƯỞNG
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung giữa — layout cũ + animate class trên chính khối nội dung */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 top-[4.5rem] z-20 flex items-center justify-center sm:top-20 lg:top-[4.75rem] ${CENTER_ZONE_LEFT_CLASS} ${CUP_ZONE_CLASS}`}
      >
        <AwardContentLayer
          entries={entries}
          isDual={isDual}
          animKey={`content-${displayYear}-${phase}`}
          className={contentAnimClass}
        />
      </div>
    </div>
  )
}
