import imageCupSK from '@assets/images/cup/LHSK.png'
import imageCupMV from '@assets/images/cup/MV.png'
import imageCupLHP from '@assets/images/cup/LHP.png'
import imageCupHTV from '@assets/images/cup/HTV.png'
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
import { awardYearPath } from '../awards/awardsData'

export const HOME_INTRO =
  'Sau hơn 20 năm chăm chỉ hoạt động nghệ thuật, Lê Khánh sở hữu một kho tàng vai diễn với đa dạng màu sắc. Cô vinh dự được xếp vào hàng ngũ diễn viên thực lực của Việt Nam.'

export const HOME_STATS = [
  { value: '100', label: 'VAI DIỄN' },
  { value: '35', label: 'PHIM TRUYỀN HÌNH' },
  { value: '15', label: 'PHIM ĐIỆN ẢNH' },
]

export const HOME_AWARDS = [
  {
    id: 'mai-vang',
    title: 'MAI VÀNG',
    years: ['2023', '2012', '2015', '2011', '2013', '2010'],
    count: '6',
    cup: imageCupMV,
  },
  {
    id: 'san-khau',
    title: 'LIÊN HOAN\nSÂN KHẤU',
    years: ['2024'],
    count: '1',
    cup: imageCupSK,
  },
  {
    id: 'phim-vn',
    title: 'LIÊN HOAN\nPHIM VN',
    years: ['2011'],
    count: '1',
    cup: imageCupLHP,
  },
  {
    id: 'htv',
    title: 'HTV\nAWARDS',
    years: ['2009', '2008'],
    count: '2',
    cup: imageCupHTV,
  },
]

/** @type {Array<{ id: string, name: string, image: string, imageSide: 'left' | 'right', iconSide: 'left' | 'right', links: Array<{ label: string, href: string, icon: string, iconHover: string }> }>} */
export const SOCIAL_PROFILES = [
  {
    id: 'self',
    name: 'Diễn viên Lê Khánh',
    image: socialSelfImage,
    imageSide: 'right',
    iconSide: 'left',
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
    imageSide: 'left',
    iconSide: 'right',
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

export const FANPAGE_DATA = [
  {
    name: 'CherishK – all about Lê Khánh',
    href: 'https://facebook.com/LeKhanhcollection',
    avatar: avatarCherishK,
  },
  {
    name: '1200 Hột É của chị\nLê Khánh',
    href: 'https://www.facebook.com/profile.php?id=61555671172772',
    avatar: avatar1200HotE,
  },
]

/**
 * @param {string} year
 */
export function awardYearHref(year) {
  return `#${awardYearPath(year)}`
}
