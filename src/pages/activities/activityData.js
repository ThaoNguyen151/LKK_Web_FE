import iconSK from '@assets/images/activity/iconSK.png'
import iconPA from '@assets/images/activity/iconPA.png'
import iconGS from '@assets/images/activity/iconGS.png'
import iconHDK from '@assets/images/activity/iconHDK.png'

/**
 * @typedef {object} ActivityTab
 * @property {string} id
 * @property {string} label
 */

/**
 * @typedef {object} ActivityCategory
 * @property {string} id
 * @property {string} label
 * @property {string} breadcrumb
 * @property {string} icon
 * @property {ActivityTab[]} tabs
 */

/**
 * @typedef {object} ActivityInfoField
 * @property {string} key
 * @property {string} label
 */

/**
 * @typedef {object} ActivityVideo
 * @property {string} id
 * @property {string} title
 * @property {string} url
 * @property {string} [partId]
 * @property {number} [episode]
 */

/**
 * @typedef {object} ActivityVideoPart
 * @property {string} id
 * @property {string} label
 */

/**
 * @typedef {object} ActivityItem
 * @property {string} id
 * @property {string} categoryId
 * @property {string} tabId
 * @property {string} badge
 * @property {string} year
 * @property {string} title
 * @property {string} subtitle
 * @property {string} [image]
 * @property {string} [videoUrl]
 * @property {string} [infoUrl]
 * @property {('info'|'images'|'video')[]} [detailTabs]
 * @property {Record<string, string>} [info]
 * @property {string} [description]
 * @property {string[]} [images]
 * @property {ActivityVideoPart[]} [videoParts]
 * @property {ActivityVideo[]} [videos]
 */

/** @type {Record<string, ActivityInfoField[]>} */
export const ACTIVITY_INFO_FIELDS = {
  'san-khau': [
    { key: 'role', label: 'VAI DIỄN' },
    { key: 'unit', label: 'ĐƠN VỊ' },
    { key: 'author', label: 'TÁC GIẢ' },
    { key: 'year', label: 'NĂM PHÁT HÀNH' },
    { key: 'director', label: 'ĐẠO DIỄN' },
  ],
  'phim-anh': [
    { key: 'role', label: 'VAI DIỄN' },
    { key: 'director', label: 'ĐẠO DIỄN' },
    { key: 'duration', label: 'THỜI LƯỢNG' },
    { key: 'year', label: 'NĂM PHÁT HÀNH' },
    { key: 'revenue', label: 'DOANH THU' },
  ],
  gameshow: [
    { key: 'role', label: 'VAI TRÒ' },
    { key: 'channel', label: 'KÊNH PHÁT SÓNG' },
    { key: 'year', label: 'NĂM' },
  ],
  khac: [
    { key: 'role', label: 'VAI TRÒ' },
    { key: 'channel', label: 'KÊNH / NỀN TẢNG' },
    { key: 'year', label: 'NĂM' },
  ],
}

/** @type {Record<string, Partial<ActivityItem>>} */
const ACTIVITY_DETAIL_BY_ID = {
  'sk-td-1': {
    detailTabs: ['info', 'images', 'video'],
    info: {
      role: 'BÀ HUYỆN THANH',
      unit: 'Sân khấu Thiên Đăng',
      author: 'Nguyễn Văn A',
      year: '2025',
      director: 'NSND Minh Hoàng',
    },
    description:
      'Vở diễn kể về hành trình của bà huyện Thanh giữa những biến cố của thời cuộc, với nhiều lớp cảm xúc và những tình huống kịch tính trên sân khấu.',
    images: ['', '', '', '', '', ''],
    videoParts: [
      { id: 'p1', label: 'Phần 1' },
      { id: 'p2', label: 'Phần 2' },
    ],
    videos: [
      {
        id: 'v1',
        title: '13 Đức Thầy – Đức Thầy 13 (Trailer)',
        url: 'https://www.youtube.com/',
        partId: 'p1',
        episode: 1,
      },
      {
        id: 'v2',
        title: 'Hậu trường tập 1',
        url: 'https://www.youtube.com/',
        partId: 'p1',
        episode: 2,
      },
      {
        id: 'v3',
        title: '13 Đức Thầy – Phần 2',
        url: 'https://www.youtube.com/',
        partId: 'p2',
        episode: 1,
      },
    ],
  },
  'pa-da-1': {
    title: 'Chị Dậu',
    badge: 'ĐIỆN ẢNH',
    year: '2024',
    subtitle: 'vai diễn: NĂM THU',
    detailTabs: ['info', 'images', 'video'],
    info: {
      role: 'NĂM THU',
      director: 'Khương Ngọc',
      duration: '100 phút',
      year: '2024',
      revenue: '113 tỷ',
    },
    description:
      'Chị Dậu là hành trình của một người phụ nữ nông thôn giữa những áp lực đời sống và khát vọng đổi thay. Phim mang đến nhiều cung bậc cảm xúc, từ ấm áp đến day dứt, với những phân cảnh gần gũi đời thường.',
    images: ['', '', '', '', '', '', '', ''],
    videos: [
      {
        id: 'v1',
        title: 'Chị Dậu (2024)',
        url: 'https://www.youtube.com/',
        episode: 1,
      },
      {
        id: 'v2',
        title: 'Lê Khánh chửi chồng lofi cực chill trong Chị Dậu',
        url: 'https://www.youtube.com/',
        episode: 2,
      },
    ],
  },
  'pa-da-2': {
    detailTabs: ['info', 'images'],
    info: {
      role: 'HOÀNG HẬU',
      director: 'Nguyễn Hoàng',
      duration: '115 phút',
      year: '2025',
      revenue: '—',
    },
    description:
      'Bộ phim tái hiện không khí cung đình với những xung đột quyền lực và tình cảm. Vai Hoàng Hậu của Lê Khánh mang sắc thái kiêu sa, nội lực và đầy chiều sâu.',
    images: ['', '', '', ''],
  },
  'gs-mc-1': {
    detailTabs: ['info', 'images', 'video'],
    info: {
      role: 'MC',
      channel: 'THVL1',
      year: '2021',
    },
    description:
      'Chương trình gameshow gắn với những câu chuyện hạnh phúc đời thường. Lê Khánh đảm nhận vai trò MC với phong cách gần gũi và dẫn dắt linh hoạt.',
    images: ['', '', ''],
    videos: [
      {
        id: 'v1',
        title: 'Hạnh Phúc Ở Đâu – Tập 1',
        url: 'https://www.youtube.com/',
        episode: 1,
      },
      {
        id: 'v2',
        title: 'Hạnh Phúc Ở Đâu – Tập 2',
        url: 'https://www.youtube.com/',
        episode: 2,
      },
    ],
  },
  'hk-mv-1': {
    detailTabs: ['info', 'images', 'video'],
    info: {
      role: 'Ca sĩ / Diễn viên',
      channel: 'YouTube',
      year: '2021',
    },
    description:
      'MV ca nhạc kết hợp hình ảnh điện ảnh và cảm xúc sân khấu, mang đến một không gian kể chuyện bằng âm nhạc.',
    images: ['', '', '', ''],
    videos: [
      {
        id: 'v1',
        title: 'Tình Khúc Mùa Thu – Official MV',
        url: 'https://www.youtube.com/',
        episode: 1,
      },
    ],
  },
}

/**
 * @param {string} subtitle
 */
function parseSubtitleValue(subtitle) {
  const sep = subtitle.indexOf(':')
  if (sep === -1) return subtitle.trim()
  return subtitle.slice(sep + 1).trim()
}

/**
 * @param {ActivityItem} item
 * @returns {ActivityItem}
 */
export function normalizeActivityDetail(item) {
  const override = ACTIVITY_DETAIL_BY_ID[item.id] ?? {}
  const merged = { ...item, ...override }
  const subtitleValue = parseSubtitleValue(merged.subtitle)
  const fields = ACTIVITY_INFO_FIELDS[merged.categoryId] ?? []

  /** @type {Record<string, string>} */
  const info = { ...(merged.info ?? {}) }
  if (!info.year) info.year = merged.year
  if (!info.role && fields.some(f => f.key === 'role'))
    info.role = subtitleValue
  if (!info.channel && fields.some(f => f.key === 'channel')) {
    info.channel = subtitleValue
  }

  /** @type {('info'|'images'|'video')[]} */
  let detailTabs = merged.detailTabs ?? ['info', 'images']
  if (!merged.detailTabs && (merged.videos?.length || merged.videoUrl)) {
    detailTabs = ['info', 'images', 'video']
  }

  const videos =
    merged.videos ??
    (merged.videoUrl
      ? [
          {
            id: `${merged.id}-video`,
            title: merged.title,
            url: merged.videoUrl,
            episode: 1,
          },
        ]
      : [])

  return {
    ...merged,
    info,
    description:
      merged.description ??
      `${merged.title} là một trong những dự án đáng nhớ của Lê Khánh trong mục ${merged.badge}.`,
    images: merged.images ?? ['', '', '', ''],
    videoParts: merged.videoParts ?? [],
    videos,
    detailTabs,
  }
}

/**
 * @param {string} id
 */
export function getActivityById(id) {
  const item = ACTIVITY_ITEMS.find(entry => entry.id === id)
  return item ? normalizeActivityDetail(item) : null
}

/**
 * @param {string} categoryId
 * @param {string} itemId
 */
export function activityDetailPath(categoryId, itemId) {
  return `/activities/${categoryId}/${itemId}`
}

/**
 * @param {string} route
 * @returns {{ categoryId: string, itemId: string | null }}
 */
export function parseActivityRoute(route) {
  const categoryId = parseActivityCategory(route)
  if (!route.startsWith('/activities')) {
    return { categoryId, itemId: null }
  }
  const parts = route
    .slice('/activities'.length)
    .replace(/^\//, '')
    .split('/')
    .filter(Boolean)
  const itemId = parts[1] ?? null
  if (itemId && ACTIVITY_ITEMS.some(item => item.id === itemId)) {
    return { categoryId, itemId }
  }
  return { categoryId, itemId: null }
}

/**
 * @param {string} categoryId
 */
export function getInfoFieldsForCategory(categoryId) {
  return ACTIVITY_INFO_FIELDS[categoryId] ?? ACTIVITY_INFO_FIELDS.khac
}

/** @type {ActivityCategory[]} */
export const ACTIVITY_CATEGORIES = [
  {
    id: 'san-khau',
    label: 'SÂN KHẤU',
    breadcrumb: 'Sân Khấu',
    icon: iconSK,
    tabs: [
      { id: 'thien-dang', label: 'Sân khấu THIÊN ĐĂNG' },
      { id: 'idecaf', label: 'Sân khấu IDECAF' },
      { id: 'ngay-xua-ngay-xua', label: 'Ngày Xửa Ngày Xưa' },
      { id: 'chuyen-ngay-xua', label: 'Chuyện Ngày Xưa' },
    ],
  },
  {
    id: 'phim-anh',
    label: 'PHIM ẢNH',
    breadcrumb: 'Phim Ảnh',
    icon: iconPA,
    tabs: [
      { id: 'dien-anh', label: 'Phim Điện ảnh' },
      { id: 'truyen-hinh', label: 'Phim Truyền hình' },
      { id: 'chieu-mang', label: 'Phim Chiếu mạng' },
    ],
  },
  {
    id: 'gameshow',
    label: 'GAMESHOW',
    breadcrumb: 'Gameshow',
    icon: iconGS,
    tabs: [
      { id: 'chuong-trinh', label: 'Chương trình' },
      { id: 'mc', label: 'MC' },
      { id: 'giam-khao', label: 'Giám khảo' },
    ],
  },
  {
    id: 'khac',
    label: 'HOẠT ĐỘNG KHÁC',
    breadcrumb: 'Hoạt Động Khác',
    icon: iconHDK,
    tabs: [
      { id: 'quang-cao', label: 'Quảng cáo' },
      { id: 'mv', label: 'MV Ca nhạc' },
      { id: 'tieu-pham', label: 'Tiểu phẩm' },
    ],
  },
]

/** @type {ActivityItem[]} */
export const ACTIVITY_ITEMS = [
  // —— Sân khấu / Thiên Đăng ——
  {
    id: 'sk-td-1',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'Vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-2',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-3',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-4',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-5',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-6',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-7',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-8',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-9',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-10',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-11',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-td-12',
    categoryId: 'san-khau',
    tabId: 'thien-dang',
    badge: 'THIÊN ĐĂNG',
    year: '2025',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  // —— Sân khấu / IDECAF ——
  {
    id: 'sk-id-1',
    categoryId: 'san-khau',
    tabId: 'idecaf',
    badge: 'IDECAF',
    year: '2024',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  {
    id: 'sk-id-2',
    categoryId: 'san-khau',
    tabId: 'idecaf',
    badge: 'IDECAF',
    year: '2023',
    title: '13 Đức Thầy – Đức Thầy 13',
    subtitle: 'vai diễn: BÀ HUYỆN THANH',
  },
  // —— Phim ảnh ——
  {
    id: 'pa-da-1',
    categoryId: 'phim-anh',
    tabId: 'dien-anh',
    badge: 'ĐIỆN ẢNH',
    year: '2024',
    title: 'Chị Dậu',
    subtitle: 'vai diễn: NĂM THU',
  },
  {
    id: 'pa-da-2',
    categoryId: 'phim-anh',
    tabId: 'dien-anh',
    badge: 'ĐIỆN ẢNH',
    year: '2025',
    title: 'Đêm Hội Long Đình',
    subtitle: 'vai diễn: HOÀNG HẬU',
  },
  {
    id: 'pa-da-3',
    categoryId: 'phim-anh',
    tabId: 'dien-anh',
    badge: 'ĐIỆN ẢNH',
    year: '2024',
    title: 'Mắt Biếc',
    subtitle: 'vai diễn: MẸ HÀ LAN',
  },
  {
    id: 'pa-da-4',
    categoryId: 'phim-anh',
    tabId: 'dien-anh',
    badge: 'ĐIỆN ẢNH',
    year: '2023',
    title: 'Cô Ba Sài Gòn',
    subtitle: 'vai diễn: THANH',
  },
  {
    id: 'pa-th-1',
    categoryId: 'phim-anh',
    tabId: 'truyen-hinh',
    badge: 'TRUYỀN HÌNH',
    year: '2022',
    title: 'Gia Đình Vui Vẻ',
    subtitle: 'vai diễn: MẸ',
  },
  {
    id: 'pa-cm-1',
    categoryId: 'phim-anh',
    tabId: 'chieu-mang',
    badge: 'CHIẾU MẠNG',
    year: '2021',
    title: 'Series Đặc Biệt',
    subtitle: 'vai diễn: KHÁCH MỜI',
  },
  // —— Gameshow ——
  {
    id: 'gs-mc-1',
    categoryId: 'gameshow',
    tabId: 'mc',
    badge: 'MC',
    year: '2021',
    title: 'Hạnh Phúc Ở Đâu',
    subtitle: 'Kênh phát sóng: THVL1',
  },
  {
    id: 'gs-mc-2',
    categoryId: 'gameshow',
    tabId: 'mc',
    badge: 'MC',
    year: '2017',
    title: 'Vì Yêu Mà Đến',
    subtitle: 'Kênh phát sóng: HTV7',
  },
  {
    id: 'gs-mc-3',
    categoryId: 'gameshow',
    tabId: 'mc',
    badge: 'MC',
    year: '2019',
    title: 'Siêu Tài Năng Nhí',
    subtitle: 'Kênh phát sóng: VTV3',
  },
  {
    id: 'gs-mc-4',
    categoryId: 'gameshow',
    tabId: 'mc',
    badge: 'MC',
    year: '2018',
    title: 'Người Ấy Là Ai',
    subtitle: 'Kênh phát sóng: HTV2',
  },
  {
    id: 'gs-ct-1',
    categoryId: 'gameshow',
    tabId: 'chuong-trinh',
    badge: 'CHƯƠNG TRÌNH',
    year: '2020',
    title: 'Ký Ức Vui Vẻ',
    subtitle: 'Kênh phát sóng: VTV3',
  },
  {
    id: 'gs-gk-1',
    categoryId: 'gameshow',
    tabId: 'giam-khao',
    badge: 'GIÁM KHẢO',
    year: '2022',
    title: 'The Voice Kids',
    subtitle: 'Kênh phát sóng: VTV3',
  },
  // —— Hoạt động khác ——
  {
    id: 'hk-mv-1',
    categoryId: 'khac',
    tabId: 'mv',
    badge: 'MV',
    year: '2021',
    title: 'Tình Khúc Mùa Thu',
    subtitle: 'Kênh phát sóng: YouTube',
  },
  {
    id: 'hk-mv-2',
    categoryId: 'khac',
    tabId: 'mv',
    badge: 'MV',
    year: '2019',
    title: 'Nhớ Về Em',
    subtitle: 'Kênh phát sóng: YouTube',
  },
  {
    id: 'hk-qc-1',
    categoryId: 'khac',
    tabId: 'quang-cao',
    badge: 'QC',
    year: '2023',
    title: 'Chiến dịch Thương hiệu A',
    subtitle: 'Vai trò: Đại sứ',
  },
  {
    id: 'hk-tp-1',
    categoryId: 'khac',
    tabId: 'tieu-pham',
    badge: 'TIỂU PHẨM',
    year: '2020',
    title: 'Chuyện Nhà Mình',
    subtitle: 'vai diễn: MẸ',
  },
]

export const DEFAULT_CATEGORY_ID = ACTIVITY_CATEGORIES[0].id

/**
 * @param {string} categoryId
 */
export function getCategoryById(categoryId) {
  return (
    ACTIVITY_CATEGORIES.find(c => c.id === categoryId) ?? ACTIVITY_CATEGORIES[0]
  )
}

/**
 * @param {string} categoryId
 */
export function activityCategoryPath(categoryId) {
  return `/activities/${categoryId}`
}

/**
 * Parse category id from hash path like `/activities/san-khau` or `/activities`.
 * @param {string} route
 */
export function parseActivityCategory(route) {
  if (!route.startsWith('/activities')) return DEFAULT_CATEGORY_ID
  const rest = route.slice('/activities'.length).replace(/^\//, '')
  const id = rest.split('/')[0]
  if (ACTIVITY_CATEGORIES.some(c => c.id === id)) return id
  return DEFAULT_CATEGORY_ID
}

/**
 * @param {object} opts
 * @param {string} opts.categoryId
 * @param {string} opts.tabId
 * @param {string} [opts.query]
 * @param {'desc' | 'asc'} [opts.sort]
 */
export function getActivityItems({
  categoryId,
  tabId,
  query = '',
  sort = 'desc',
}) {
  const q = query.trim().toLowerCase()
  let list = ACTIVITY_ITEMS.filter(
    item => item.categoryId === categoryId && item.tabId === tabId
  )

  if (q) {
    list = list.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
    )
  }

  list = [...list].sort((a, b) => {
    const ya = Number(a.year) || 0
    const yb = Number(b.year) || 0
    return sort === 'asc' ? ya - yb : yb - ya
  })

  return list
}
