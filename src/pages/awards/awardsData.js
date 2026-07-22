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
 * @typedef {object} AwardYearDetail
 * @property {string} slug
 * @property {string} eventName
 * @property {string} logoSrc
 * @property {string} title
 * @property {string} subtitle
 * @property {string} role
 * @property {string} play
 * @property {string} cupSrc
 * @property {AwardTitleStyle} [titleStyle]
 */

/** Classes cho 2 kiểu typography title / subtitle */
export const AWARD_TITLE_STYLES = {
  /** Title nhạt + nhỏ, subtitle đậm + to */
  'subtitle-emphasis': {
    title:
      'whitespace-nowrap font-body text-sm font-medium leading-none tracking-wide text-brand-orange sm:text-base lg:text-lg xl:text-xl',
    subtitle:
      'mt-3 whitespace-nowrap font-body text-xl font-extrabold leading-none text-brand-orange sm:mt-4 sm:text-3xl md:text-4xl lg:mt-5 lg:text-5xl xl:text-4xl',
  },
  /** Title đậm + to, subtitle nhạt + nhỏ */
  'title-emphasis': {
    title:
      'whitespace-nowrap font-body text-xl font-extrabold leading-none text-brand-orange sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl',
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
    play: 'GIÁNG HƯƠNG – SÂN KHẤU VỀ KHUYA',
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
    play: 'GIÁNG HƯƠNG – SÂN KHẤU VỀ KHUYA',
    cupSrc: imageCupMV,
    titleStyle: 'title-emphasis',
  },
  2015: {
    slug: 'mai-vang',
    eventName: 'GIẢI MAI VÀNG 2015',
    logoSrc: logoHTV,
    title: 'GIẢI MAI VÀNG',
    subtitle: 'NỮ DIỄN VIÊN ĐIỆN ẢNH – SÂN KHẤU',
    role: 'Đang cập nhật',
    play: 'Đang cập nhật',
    cupSrc: imageCupMV,
    titleStyle: 'subtitle-emphasis',
  },
  2013: {
    slug: 'mai-vang',
    eventName: 'GIẢI MAI VÀNG 2013',
    logoSrc: logoLHP,
    title: 'GIẢI MAI VÀNG',
    subtitle: 'NỮ DIỄN VIÊN ĐIỆN ẢNH – SÂN KHẤU',
    role: 'Đang cập nhật',
    play: 'Đang cập nhật',
    cupSrc: imageCupMV,
    titleStyle: 'subtitle-emphasis',
  },
  2012: {
    slug: 'mai-vang',
    eventName: 'GIẢI MAI VÀNG 2012',
    logoSrc: logoMV,
    title: 'GIẢI MAI VÀNG',
    subtitle: 'NỮ DIỄN VIÊN ĐIỆN ẢNH – SÂN KHẤU',
    role: 'Đang cập nhật',
    play: 'Đang cập nhật',
    cupSrc: imageCupMV,
    titleStyle: 'subtitle-emphasis',
  },
  2011: {
    slug: 'mai-vang-lhp',
    eventName: 'GIẢI MAI VÀNG & LIÊN HOAN PHIM VIỆT NAM 2011',
    logoSrc: logoMV,
    title: 'GIẢI MAI VÀNG',
    subtitle: 'NỮ DIỄN VIÊN / LIÊN HOAN PHIM',
    role: 'Đang cập nhật',
    play: 'Đang cập nhật',
    cupSrc: imageCupLHP,
    titleStyle: 'subtitle-emphasis',
  },
  2010: {
    slug: 'mai-vang',
    eventName: 'GIẢI MAI VÀNG 2010',
    logoSrc: logoMV,
    title: 'GIẢI MAI VÀNG',
    subtitle: 'NỮ DIỄN VIÊN ĐIỆN ẢNH – SÂN KHẤU',
    role: 'Đang cập nhật',
    play: 'Đang cập nhật',
    cupSrc: imageCupMV,
    titleStyle: 'subtitle-emphasis',
  },
  2009: {
    slug: 'htv-awards',
    eventName: 'HTV AWARDS 2009',
    logoSrc: imageCupHTV,
    title: 'NỮ DIỄN VIÊN SÂN KHẤU',
    subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
    role: 'Đang cập nhật',
    play: 'Đang cập nhật',
    cupSrc: imageCupHTV,
    titleStyle: 'title-emphasis',
  },
  2008: {
    slug: 'htv-awards',
    eventName: 'HTV AWARDS 2008',
    logoSrc: imageCupHTV,
    title: 'NỮ DIỄN VIÊN SÂN KHẤU',
    subtitle: 'ĐƯỢC YÊU THÍCH NHẤT',
    role: 'Đang cập nhật',
    play: 'Đang cập nhật',
    cupSrc: imageCupHTV,
    titleStyle: 'title-emphasis',
  },
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
