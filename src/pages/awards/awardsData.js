import imageCupMV from '@assets/images/cup/MV.png'
import imageCupHTV from '@assets/images/cup/HTV.png'
import imageCupLHSK from '@assets/images/cup/LHSK.png'
import imageCupLHP from '@assets/images/cup/LHP.png'
import logoMV from '@assets/images/logo/logoMV.png'
import logoLHSK from '@assets/images/logo/logoLHSK.png'
import logoLHP from '@assets/images/logo/logoLHPVN.png'
import logoHTV from '@assets/images/logo/logoHTV.png'

/** Years shown in the awards sidebar (newest first). */
export const YEARS = [
  '2024',
  '2023',
  '2015',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
]

export const DEFAULT_AWARD_YEAR = YEARS[0]

/**
 * @typedef {'subtitle-emphasis' | 'title-emphasis'} AwardTitleStyle
 * - subtitle-emphasis: title nhỏ/nhạt, subtitle to/đậm (vd. Huy chương vàng)
 * - title-emphasis: title to/đậm, subtitle nhỏ/nhạt (vd. HTV được yêu thích)
 */

/**
 * @typedef {object} AwardEntry
 * @property {string} [slug]
 * @property {string} [eventName]
 * @property {string} logoSrc
 * @property {string} title
 * @property {string} subtitle
 * @property {string} role
 * @property {string} play
 * @property {string} [playLabel] Label cho dòng play — mặc định "Vở diễn"
 * @property {string} [cupSrc]
 * @property {AwardTitleStyle} [titleStyle]
 */

/**
 * @typedef {object} AwardYearDetail
 * @property {string} slug
 * @property {string} [eventName]
 * @property {string} [logoSrc]
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {string} [role]
 * @property {string} [play]
 * @property {string} [playLabel]
 * @property {string} [cupSrc]
 * @property {AwardTitleStyle} [titleStyle]
 * @property {AwardEntry[]} [entries] Nhiều giải trong 1 năm (vd. 2011)
 * @property {string[]} [cupSrcs] Nhiều cúp (vd. 2011); mặc định lấy từ entries/cupSrc
 */

/** Classes cho 2 kiểu typography title / subtitle */
export const AWARD_TITLE_STYLES = {
  /** Title nhạt + nhỏ, subtitle đậm + to */
  'subtitle-emphasis': {
    title:
      'whitespace-nowrap font-body text-sm font-medium leading-none tracking-wide text-brand-orange sm:text-base lg:text-lg xl:text-xl',
    subtitle:
      'mt-3 whitespace-nowrap font-body text-xl font-extrabold leading-none text-brand-orange sm:mt-4 sm:text-3xl md:text-4xl lg:mt-4 lg:text-5xl xl:text-3xl',
  },
  /** Title đậm + to, subtitle nhạt + nhỏ */
  'title-emphasis': {
    title:
      'whitespace-nowrap font-body text-xl font-extrabold leading-none text-brand-orange sm:text-3xl md:text-4xl lg:text-5xl xl:text-3xl',
    subtitle:
      'mt-3 whitespace-nowrap font-body text-sm font-medium leading-none tracking-wide text-brand-orange sm:mt-4 sm:text-base lg:text-lg xl:text-xl',
  },
}

/** @type {Record<string, AwardYearDetail>} */
export const AWARDS_BY_YEAR = {
  2024: {
    slug: 'lien-hoan-san-khau',
    eventName: 'LIÊN HOAN SÂN KHẤU THÀNH PHỐ HỒ CHÍ MINH 2024',
    logoSrc: logoLHSK,
    title: 'HUY CHƯƠNG VÀNG',
    subtitle: 'NỮ DIỄN VIÊN SÂN KHẤU',
    role: 'GIÁNG HƯƠNG',
    play: 'GIÁNG HƯƠNG - SÂN KHẤU VỀ KHUYA',
    cupSrc: imageCupLHSK,
    titleStyle: 'subtitle-emphasis',
  },
  2023: {
    slug: 'mai-vang',
    eventName: 'GIẢI MAI VÀNG 2023',
    logoSrc: logoMV,
    title: 'NỮ DIỄN VIÊN SÂN KHẤU',
    subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
    role: 'GIÁNG HƯƠNG',
    play: 'GIÁNG HƯƠNG - SÂN KHẤU VỀ KHUYA',
    cupSrc: imageCupMV,
    titleStyle: 'title-emphasis',
  },
  2015: {
    slug: 'mai-vang',
    eventName: 'GIẢI MAI VÀNG 2015',
    logoSrc: logoMV,
    title: 'NỮ DIỄN VIÊN SÂN KHẤU',
    subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
    role: 'HỒNG',
    play: 'CẦN AI ĐÓ ĐỂ YÊU THƯƠNG',
    cupSrc: imageCupMV,
    titleStyle: 'title-emphasis',
  },
  2013: {
    slug: 'mai-vang',
    eventName: 'GIẢI MAI VÀNG 2013',
    logoSrc: logoMV,
    title: 'NỮ DIỄN VIÊN SÂN KHẤU',
    subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
    role: 'TYRA BỘI NGỌC',
    play: 'HỒN BƯỚM MƠ ĐIÊN',
    cupSrc: imageCupMV,
    titleStyle: 'title-emphasis',
  },
  2012: {
    slug: 'mai-vang',
    eventName: 'GIẢI MAI VÀNG 2012',
    logoSrc: logoMV,
    title: 'NỮ DIỄN VIÊN SÂN KHẤU',
    subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
    role: 'HOA',
    play: 'LẨU TRĂN',
    cupSrc: imageCupMV,
    titleStyle: 'title-emphasis',
  },
  2011: {
    slug: 'mai-vang-lhp',
    entries: [
      {
        slug: 'lien-hoan-phim',
        eventName: 'LIÊN HOAN PHIM VIỆT NAM 2011',
        logoSrc: logoLHP,
        title: 'NỮ DIỄN VIÊN PHỤ XUẤT SẮC',
        subtitle: 'PHIM TRUYỆN ĐIỆN ẢNH',
        role: 'LÊ QUYÊN',
        play: 'CÔ DÂU ĐẠI CHIẾN',
        playLabel: 'Phim',
        cupSrc: imageCupLHP,
        titleStyle: 'title-emphasis',
      },
      {
        slug: 'mai-vang',
        eventName: 'GIẢI MAI VÀNG 2011',
        logoSrc: logoMV,
        title: 'NỮ DIỄN VIÊN SÂN KHẤU',
        subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
        role: 'FAN HÂM MỘ',
        play: 'CA SĨ NGÔI SAO',
        playLabel: 'Vở diễn',
        cupSrc: imageCupMV,
        titleStyle: 'title-emphasis',
      },
    ],
    cupSrcs: [imageCupLHP, imageCupMV],
  },
  2010: {
    slug: 'mai-vang',
    eventName: 'GIẢI MAI VÀNG 2010',
    logoSrc: logoMV,
    title: 'NỮ DIỄN VIÊN SÂN KHẤU',
    subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
    role: 'KAY',
    play: 'MỘT CUỘC ĐỜI BỊ ĐÁNH CẮP',
    cupSrc: imageCupMV,
    titleStyle: 'title-emphasis',
  },
  2009: {
    slug: 'htv-awards',
    eventName: 'HTV AWARDS 2009',
    logoSrc: logoHTV,
    title: 'NỮ DIỄN VIÊN PHỤ',
    subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
    role: 'SANALY',
    play: 'MÙI NGÒ GAI',
    cupSrc: imageCupHTV,
    titleStyle: 'title-emphasis',
  },
  2008: {
    slug: 'htv-awards',
    eventName: 'HTV AWARDS 2008',
    logoSrc: logoHTV,
    title: 'NỮ DIỄN VIÊN PHỤ',
    subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
    role: 'SANALY',
    play: 'MÙI NGÒ GAI',
    cupSrc: imageCupHTV,
    titleStyle: 'title-emphasis',
  },
}

/**
 * @param {AwardYearDetail} award
 * @returns {AwardEntry[]}
 */
export function getAwardEntries(award) {
  if (award.entries?.length) return award.entries
  return [
    {
      slug: award.slug,
      eventName: award.eventName,
      logoSrc: award.logoSrc ?? '',
      title: award.title ?? '',
      subtitle: award.subtitle ?? '',
      role: award.role ?? '',
      play: award.play ?? '',
      playLabel: award.playLabel,
      cupSrc: award.cupSrc,
      titleStyle: award.titleStyle,
    },
  ]
}

/**
 * @param {AwardYearDetail} award
 * @returns {string[]}
 */
export function getAwardCups(award) {
  if (award.cupSrcs?.length) return award.cupSrcs
  const fromEntries = getAwardEntries(award)
    .map(entry => entry.cupSrc)
    .filter(/** @returns {cup is string} */ cup => Boolean(cup))
  if (fromEntries.length) return fromEntries
  return award.cupSrc ? [award.cupSrc] : []
}

/**
 * @param {string} year
 * @returns {AwardYearDetail | null}
 */
export function getAwardByYear(year) {
  return AWARDS_BY_YEAR[year] ?? null
}

/**
 * @param {string} year
 * @returns {string}
 */
export function awardYearPath(year) {
  return `/awards/${year}`
}
