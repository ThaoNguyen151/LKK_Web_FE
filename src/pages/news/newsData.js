/**
 * @typedef {object} NewsItem
 * @property {string} id
 * @property {string} source Tên báo / nguồn
 * @property {string} title Tiêu đề bài
 * @property {string} date Ngày đăng — DD/MM/YYYY
 * @property {string} [imageSrc] Ảnh thumbnail (placeholder nếu thiếu)
 * @property {string} [href] Link bài gốc
 */

/** Số tin mỗi trang trên grid (tạm giảm để test phân trang) */
export const NEWS_PAGE_SIZE = 20

/** @type {NewsItem[]} */
export const NEWS_ITEMS = [
  {
    id: '1',
    source: 'NGƯỜI LAO ĐỘNG',
    title: 'Lê Khánh trở lại sân khấu sau loạt dự án điện ảnh',
    date: '12/02/2026',
    href: 'https://baovanhoa.vn/giai-tri/le-khanh-tro-lai-san-khau-kich-sau-loat-du-an-dien-anh-204397.html',
  },
  {
    id: '2',
    source: 'THANH NIÊN',
    title:
      'Nữ diễn viên Lê Khánh và hành trình hơn 20 năm gắn bó với nghệ thuật',
    date: '12/07/2023',
    href: '#',
  },
  {
    id: '3',
    source: 'TUỔI TRẺ',
    title: 'Lê Khánh nhận huy chương vàng Liên hoan sân khấu TP.HCM',
    date: '05/06/2024',
    href: '#',
  },
  {
    id: '4',
    source: 'VNEXPRESS',
    title: 'Gặp gỡ Lê Khánh: Diễn viên thực lực của điện ảnh và sân khấu Việt',
    date: '28/03/2023',
    href: '#',
  },
  {
    id: '5',
    source: 'DAN TRI',
    title: 'Lê Khánh chia sẻ về vai diễn Giáng Hương gây tiếng vang',
    date: '15/01/2024',
    href: '#',
  },
  {
    id: '6',
    source: 'TIỀN PHONG',
    title: 'Mai Vàng và những dấu ấn của Lê Khánh trên sân khấu kịch nói',
    date: '02/11/2023',
    href: '#',
  },
  {
    id: '7',
    source: 'LAO ĐỘNG',
    title: 'Lê Khánh: Từ HTV Awards đến giải thưởng điện ảnh quốc gia',
    date: '21/09/2022',
    href: '#',
  },
  {
    id: '8',
    source: 'PHỤ NỮ',
    title: 'Nữ diễn viên Lê Khánh và góc nhìn về nghề diễn viên đương đại',
    date: '08/04/2023',
    href: '#',
  },
  {
    id: '9',
    source: 'SAIGON GIAI PHONG',
    title: 'Đêm sân khấu về khuya: Lê Khánh tỏa sáng trong vở Giáng Hương',
    date: '30/05/2024',
    href: '#',
  },
  {
    id: '10',
    source: 'CAND',
    title: 'Lê Khánh – gương mặt thân quen của khán giả truyền hình Việt Nam',
    date: '17/12/2022',
    href: '#',
  },
  {
    id: '11',
    source: 'NGƯỜI LAO ĐỘNG',
    title: 'Hậu trường làm nghề của diễn viên Lê Khánh',
    date: '03/08/2022',
    href: '#',
  },
  {
    id: '12',
    source: 'THANH NIÊN',
    title: 'Lê Khánh được đề cử giải thưởng sân khấu yêu thích',
    date: '14/02/2023',
    href: '#',
  },
  {
    id: '13',
    source: 'TUỔI TRẺ',
    title: 'Phỏng vấn Lê Khánh về các dự án phim và kịch năm mới',
    date: '09/01/2024',
    href: '#',
  },
  {
    id: '14',
    source: 'VNEXPRESS',
    title: 'Lê Khánh: Diễn xuất chân thực là chìa khóa chinh phục khán giả',
    date: '22/10/2023',
    href: '#',
  },
  {
    id: '15',
    source: 'DAN TRI',
    title: 'Những vai diễn đáng nhớ của Lê Khánh trên màn ảnh rộng',
    date: '11/06/2022',
    href: '#',
  },
  {
    id: '1',
    source: 'NGƯỜI LAO ĐỘNG',
    title: 'Lê Khánh trở lại sân khấu sau loạt dự án điện ảnh',
    date: '12/02/2026',
    href: 'https://baovanhoa.vn/giai-tri/le-khanh-tro-lai-san-khau-kich-sau-loat-du-an-dien-anh-204397.html',
  },
  {
    id: '2',
    source: 'THANH NIÊN',
    title:
      'Nữ diễn viên Lê Khánh và hành trình hơn 20 năm gắn bó với nghệ thuật',
    date: '12/07/2023',
    href: '#',
  },
  {
    id: '3',
    source: 'TUỔI TRẺ',
    title: 'Lê Khánh nhận huy chương vàng Liên hoan sân khấu TP.HCM',
    date: '05/06/2024',
    href: '#',
  },
  {
    id: '4',
    source: 'VNEXPRESS',
    title: 'Gặp gỡ Lê Khánh: Diễn viên thực lực của điện ảnh và sân khấu Việt',
    date: '28/03/2023',
    href: '#',
  },
  {
    id: '5',
    source: 'DAN TRI',
    title: 'Lê Khánh chia sẻ về vai diễn Giáng Hương gây tiếng vang',
    date: '15/01/2024',
    href: '#',
  },
  {
    id: '6',
    source: 'TIỀN PHONG',
    title: 'Mai Vàng và những dấu ấn của Lê Khánh trên sân khấu kịch nói',
    date: '02/11/2023',
    href: '#',
  },
  {
    id: '7',
    source: 'LAO ĐỘNG',
    title: 'Lê Khánh: Từ HTV Awards đến giải thưởng điện ảnh quốc gia',
    date: '21/09/2022',
    href: '#',
  },
  {
    id: '8',
    source: 'PHỤ NỮ',
    title: 'Nữ diễn viên Lê Khánh và góc nhìn về nghề diễn viên đương đại',
    date: '08/04/2023',
    href: '#',
  },
  {
    id: '9',
    source: 'SAIGON GIAI PHONG',
    title: 'Đêm sân khấu về khuya: Lê Khánh tỏa sáng trong vở Giáng Hương',
    date: '30/05/2024',
    href: '#',
  },
  {
    id: '10',
    source: 'CAND',
    title: 'Lê Khánh – gương mặt thân quen của khán giả truyền hình Việt Nam',
    date: '17/12/2022',
    href: '#',
  },
  {
    id: '11',
    source: 'NGƯỜI LAO ĐỘNG',
    title: 'Hậu trường làm nghề của diễn viên Lê Khánh',
    date: '03/08/2022',
    href: '#',
  },
  {
    id: '12',
    source: 'THANH NIÊN',
    title: 'Lê Khánh được đề cử giải thưởng sân khấu yêu thích',
    date: '14/02/2023',
    href: '#',
  },
  {
    id: '13',
    source: 'TUỔI TRẺ',
    title: 'Phỏng vấn Lê Khánh về các dự án phim và kịch năm mới',
    date: '09/01/2024',
    href: '#',
  },
  {
    id: '14',
    source: 'VNEXPRESS',
    title: 'Lê Khánh: Diễn xuất chân thực là chìa khóa chinh phục khán giả',
    date: '22/10/2023',
    href: '#',
  },
  {
    id: '15',
    source: 'DAN TRI',
    title: 'Những vai diễn đáng nhớ của Lê Khánh trên màn ảnh rộng',
    date: '11/06/2022',
    href: '#',
  },
  {
    id: '1',
    source: 'NGƯỜI LAO ĐỘNG',
    title: 'Lê Khánh trở lại sân khấu sau loạt dự án điện ảnh',
    date: '12/02/2026',
    href: 'https://baovanhoa.vn/giai-tri/le-khanh-tro-lai-san-khau-kich-sau-loat-du-an-dien-anh-204397.html',
  },
  {
    id: '2',
    source: 'THANH NIÊN',
    title:
      'Nữ diễn viên Lê Khánh và hành trình hơn 20 năm gắn bó với nghệ thuật',
    date: '12/07/2023',
    href: '#',
  },
  {
    id: '3',
    source: 'TUỔI TRẺ',
    title: 'Lê Khánh nhận huy chương vàng Liên hoan sân khấu TP.HCM',
    date: '05/06/2024',
    href: '#',
  },
  {
    id: '4',
    source: 'VNEXPRESS',
    title: 'Gặp gỡ Lê Khánh: Diễn viên thực lực của điện ảnh và sân khấu Việt',
    date: '28/03/2023',
    href: '#',
  },
  {
    id: '5',
    source: 'DAN TRI',
    title: 'Lê Khánh chia sẻ về vai diễn Giáng Hương gây tiếng vang',
    date: '15/01/2024',
    href: '#',
  },
  {
    id: '6',
    source: 'TIỀN PHONG',
    title: 'Mai Vàng và những dấu ấn của Lê Khánh trên sân khấu kịch nói',
    date: '02/11/2023',
    href: '#',
  },
  {
    id: '7',
    source: 'LAO ĐỘNG',
    title: 'Lê Khánh: Từ HTV Awards đến giải thưởng điện ảnh quốc gia',
    date: '21/09/2022',
    href: '#',
  },
  {
    id: '8',
    source: 'PHỤ NỮ',
    title: 'Nữ diễn viên Lê Khánh và góc nhìn về nghề diễn viên đương đại',
    date: '08/04/2023',
    href: '#',
  },
  {
    id: '9',
    source: 'SAIGON GIAI PHONG',
    title: 'Đêm sân khấu về khuya: Lê Khánh tỏa sáng trong vở Giáng Hương',
    date: '30/05/2024',
    href: '#',
  },
  {
    id: '10',
    source: 'CAND',
    title: 'Lê Khánh – gương mặt thân quen của khán giả truyền hình Việt Nam',
    date: '17/12/2022',
    href: '#',
  },
  {
    id: '11',
    source: 'NGƯỜI LAO ĐỘNG',
    title: 'Hậu trường làm nghề của diễn viên Lê Khánh',
    date: '03/08/2022',
    href: '#',
  },
  {
    id: '12',
    source: 'THANH NIÊN',
    title: 'Lê Khánh được đề cử giải thưởng sân khấu yêu thích',
    date: '14/02/2023',
    href: '#',
  },
  {
    id: '13',
    source: 'TUỔI TRẺ',
    title: 'Phỏng vấn Lê Khánh về các dự án phim và kịch năm mới',
    date: '09/01/2024',
    href: '#',
  },
  {
    id: '14',
    source: 'VNEXPRESS',
    title: 'Lê Khánh: Diễn xuất chân thực là chìa khóa chinh phục khán giả',
    date: '22/10/2023',
    href: '#',
  },
  {
    id: '15',
    source: 'DAN TRI',
    title: 'Những vai diễn đáng nhớ của Lê Khánh trên màn ảnh rộng',
    date: '11/06/2022',
    href: '#',
  },
]

/**
 * @param {number} page 1-based
 * @param {number} [pageSize]
 * @returns {{ items: NewsItem[], totalPages: number, page: number }}
 */
export function getNewsPage(page = 1, pageSize = NEWS_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(NEWS_ITEMS.length / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize
  return {
    items: NEWS_ITEMS.slice(start, start + pageSize),
    totalPages,
    page: safePage,
  }
}
