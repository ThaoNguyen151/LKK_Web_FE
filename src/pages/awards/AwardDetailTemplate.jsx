import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import blockGT from '@assets/images/award/block-GT.png'
import blockCup from '@assets/images/award/block-Cup.png'
import wreathL from '@assets/images/icon/wreathL.png'
import wreathR from '@assets/images/icon/wreathR.png'
import { ROUTES } from '@utils'
import { AwardYearSidebar } from './AwardYearSidebar'
import { AWARD_TITLE_STYLES } from './awardsData'

/** Chừa mép phải cho block-Cup (không chiếm hết chiều ngang) */
const CUP_ZONE_CLASS =
  'pr-6 sm:pr-10 lg:pr-[min(16vw,200px)] xl:pr-[min(14vw,240px)]'
/** Chừa cột năm + khoảng hở trái; không trừ cả chiều rộng block-GT */
const CENTER_ZONE_LEFT_CLASS =
  'pl-4 sm:pl-6 lg:pl-[calc(5.5rem+2.5rem)] xl:pl-[calc(5.5rem+3.5rem)]'

/**
 * Layout:
 * [Năm — cột trái ngoài cùng] | [Home / Giải thưởng + nội dung 2 cột]
 *
 * @param {object} props
 * @param {string} props.year
 * @param {import('./awardsData').AwardYearDetail} props.award
 */
export function AwardDetailTemplate({ year, award }) {
  const titleStyleKey = award.titleStyle ?? 'subtitle-emphasis'
  const titleStyles =
    AWARD_TITLE_STYLES[titleStyleKey] ?? AWARD_TITLE_STYLES['subtitle-emphasis']

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
        {/* block-Cup = nền mép phải; cup thật nằm trên nền đó */}
        <div className="absolute bottom-0 right-0 z-[1] flex h-[min(48vh,380px)] w-[min(55vw,600px)] items-center justify-center">
          <img
            src={blockCup}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-contain object-right-bottom"
            aria-hidden
          />
          <img
            src={award.cupSrc}
            alt={award.eventName}
            className="relative z-10 mb-[35%] ml-[30%] h-[120%] w-auto max-w-[55%] object-contain"
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
      <div className="relative z-10 mx-auto grid h-full min-h-0 w-full max-w-[1400px] grid-cols-1 px-4 py-3 sm:px-6 lg:grid-cols-[5.5rem_1fr] lg:gap-12 lg:px-10 lg:py-5 xl:px-14">
        {/* Cột 1 — năm sát trái */}
        <AwardYearSidebar
          activeYear={year}
          orientation="vertical"
          className="hidden h-full min-h-0 justify-center lg:flex"
        />

        {/* Cột 2 — Home / Giải thưởng + nội dung */}
        <div className="relative flex min-h-0 min-w-0 flex-col">
          {/* Breadcrumb + title trên nền block-GT */}
          <div className="relative z-10 mb-0 shrink-0 self-start">
            <img
              src={blockGT}
              alt=""
              className="pointer-events-none block h-auto w-[min(55vw,300px)] sm:w-[340px] lg:w-[400px]"
              aria-hidden
            />
            <div className="absolute inset-0 z-10 flex flex-col justify-start mt-3 px-10 py-2 sm:px-6 lg:px-7">
              <p className="mb-3 font-body text-[8px] leading-tight text-white/70 sm:text-[11px]">
                <a
                  href={`#${ROUTES.HOME}`}
                  className="font-semibold text-white hover:underline"
                >
                  Home
                </a>
                <span className="mx-1">/</span>
                <span>Giải Thưởng</span>
              </p>
              <h1 className="font-display text-2xl italic tracking-wide text-white sm:text-3xl lg:text-5xl">
                GIẢI THƯỞNG
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung giữa — trong vùng GT ↔ Cup; logo lem lên block-GT */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 top-[4.5rem] z-20 flex items-center justify-center sm:top-20 lg:top-[4.75rem] ${CENTER_ZONE_LEFT_CLASS} ${CUP_ZONE_CLASS}`}
      >
        <div className="pointer-events-auto flex w-full max-w-[56rem] flex-col items-center px-3 text-center sm:max-w-[64rem] sm:px-6 lg:max-w-[55rem] lg:px-8">
          <img
            src={award.logoSrc}
            alt=""
            className="relative z-20 -mt-6 mb-8 h-20 w-auto object-contain sm:-mt-10 sm:mb-10 sm:h-24 lg:-mt-14 lg:mb-12 lg:h-[7.5rem]"
          />

          {/* Wreath bám sát title/subtitle theo độ dài chữ */}
          <div className="inline-flex w-fit max-w-full items-center justify-center gap-2 sm:gap-3 lg:gap-4">
            <img
              src={wreathL}
              alt=""
              className="h-16 w-auto shrink-0 object-contain sm:h-10 lg:h-15 xl:h-20"
              aria-hidden
            />
            <div className="min-w-0 px-0.5 text-center sm:px-5">
              <p className={titleStyles.title}>{award.title}</p>
              <h2 className={titleStyles.subtitle}>{award.subtitle}</h2>
            </div>
            <img
              src={wreathR}
              alt=""
              className="h-16 w-auto shrink-0 object-contain sm:h-10 lg:h-15 xl:h-20"
              aria-hidden
            />
          </div>

          <div className="mt-10 w-full space-y-2 font-body text-sm text-gray-800 sm:mt-14 sm:space-y-3 sm:text-base lg:mt-12 lg:text-xs">
            <p className="whitespace-nowrap">
              <span className="italic text-gray-600">Vai diễn:</span>{' '}
              <span className="font-semibold uppercase lg: text-sm">
                {award.role}
              </span>
            </p>
            <p className="whitespace-nowrap">
              <span className="italic text-gray-600">Vở diễn:</span>{' '}
              <span className="font-semibold uppercase lg: text-sm">
                {award.play}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
