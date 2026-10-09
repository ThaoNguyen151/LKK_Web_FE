import iconAddress from '@assets/images/contact/contactWaddress.png'
import iconMail from '@assets/images/contact/contactWmail.png'
import iconPhone from '@assets/images/contact/contactWphone.png'

/**
 * @typedef {{
 *   id: string,
 *   label: string,
 *   value: string,
 *   valueMobile?: string,
 *   valueCaption?: string,
 *   valueCaptionMobile?: string,
 *   valueNote?: string,
 *   iconSide: 'left' | 'right',
 *   iconSrc: string,
 *   external?: boolean
 * }} ContactItem
 */

/** @type {ContactItem[]} */
export const CONTACT_ITEMS = [
  {
    id: 'address',
    label: 'ĐỊA CHỈ',
    valueCaption: 'Công ty TNHH Truyền thông - Giải trí BÁCH PHÚC',
    valueCaptionMobile: 'Công ty TNHH Truyền thông - Giải trí BÁCH PHÚC',
    value: '24/2 Đinh Tiên Hoàng, Phường Tân Định, TP.HCM',
    valueMobile: '24/2 Đinh Tiên Hoàng, Phường Tân Định, TP.HCM',
    iconSide: 'right',
    iconSrc: iconAddress,
    external: true,
  },
  {
    id: 'phone',
    label: 'ĐIỆN THOẠI',
    value: '0879 79 62 58 - 0939 393 799',
    // Mobile: bỏ dấu "-" , mỗi số 1 hàng
    valueMobile: '0879 79 62 58\n0939 393 799',
    valueNote: '(Mr. Khải)',
    iconSide: 'left',
    iconSrc: iconPhone,
  },
  {
    id: 'email',
    label: 'EMAIL',
    value: 'bachphucentertainment@gmail.com',
    iconSide: 'right',
    iconSrc: iconMail,
  },
]
