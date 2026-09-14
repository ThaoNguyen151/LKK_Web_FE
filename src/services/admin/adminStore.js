import { ACTIVITY_ITEMS, getActivityById } from '@pages/activities/activityData'
import { NEWS_ITEMS } from '@pages/news/newsData'
import { LIBRARY_IMAGES } from '@pages/library/libraryData'

const KEYS = {
  activities: 'lkk_admin_activities',
  news: 'lkk_admin_news',
  library: 'lkk_admin_library',
}

/**
 * @template T
 * @param {string} key
 * @param {() => T} seed
 * @returns {T}
 */
function load(key, seed) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const data = JSON.parse(raw)
      if (Array.isArray(data)) return /** @type {T} */ (data)
    }
  } catch {
    /* fall through */
  }
  const initial = seed()
  localStorage.setItem(key, JSON.stringify(initial))
  return initial
}

/**
 * @param {string} key
 * @param {unknown} value
 */
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new CustomEvent('lkk-admin-store', { detail: { key } }))
}

function newId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

function seedActivities() {
  return ACTIVITY_ITEMS.map(item => {
    const full = getActivityById(item.id) ?? item
    return {
      ...full,
      images: Array.isArray(full.images) ? [...full.images] : [],
      videos: Array.isArray(full.videos)
        ? full.videos.map(v => ({ ...v }))
        : [],
      videoParts: Array.isArray(full.videoParts)
        ? full.videoParts.map(p => ({ ...p }))
        : [],
      info: full.info ? { ...full.info } : {},
      detailTabs: full.detailTabs ? [...full.detailTabs] : ['info', 'images'],
      isPublished: true,
    }
  })
}

function seedNews() {
  return NEWS_ITEMS.map(item => ({
    ...item,
    imageSrc: item.imageSrc ?? '',
    href: item.href ?? '#',
    isPublished: true,
  }))
}

function seedLibrary() {
  return LIBRARY_IMAGES.map(item => ({
    ...item,
    alt: item.alt ?? 'Lê Khánh',
    isPublished: true,
  }))
}

/** @returns {import('@pages/activities/activityData').ActivityItem[]} */
export function listAdminActivities() {
  return load(KEYS.activities, seedActivities)
}

/** @param {string} id */
export function getAdminActivity(id) {
  return listAdminActivities().find(a => a.id === id) ?? null
}

/**
 * @param {Partial<import('@pages/activities/activityData').ActivityItem> & {
 *   categoryId: string
 *   tabId: string
 *   title: string
 *   badge: string
 *   year: string
 *   subtitle?: string
 * }} payload
 */
export function createAdminActivity(payload) {
  const list = listAdminActivities()
  const id = payload.id?.trim() || newId('act')
  if (list.some(a => a.id === id)) {
    throw new Error('ID hoạt động đã tồn tại.')
  }
  const item = {
    id,
    categoryId: payload.categoryId,
    tabId: payload.tabId,
    badge: payload.badge || '',
    year: payload.year || '',
    title: payload.title || '',
    subtitle: payload.subtitle || '',
    image: payload.image || '',
    videoUrl: payload.videoUrl || '',
    info: payload.info ? { ...payload.info } : {},
    description: payload.description || '',
    images: Array.isArray(payload.images) ? [...payload.images] : [],
    videoParts: Array.isArray(payload.videoParts)
      ? payload.videoParts.map(p => ({ ...p }))
      : [],
    videos: Array.isArray(payload.videos)
      ? payload.videos.map(v => ({ ...v }))
      : [],
    detailTabs: payload.detailTabs
      ? [...payload.detailTabs]
      : ['info', 'images'],
    isPublished: payload.isPublished !== false,
  }
  list.unshift(item)
  save(KEYS.activities, list)
  return item
}

/**
 * @param {string} id
 * @param {Partial<import('@pages/activities/activityData').ActivityItem>} patch
 */
export function updateAdminActivity(id, patch) {
  const list = listAdminActivities()
  const index = list.findIndex(a => a.id === id)
  if (index < 0) throw new Error('Không tìm thấy hoạt động.')
  const prev = list[index]
  list[index] = {
    ...prev,
    ...patch,
    id: prev.id,
    info: patch.info ? { ...patch.info } : prev.info,
    images: patch.images ? [...patch.images] : prev.images,
    videos: patch.videos ? patch.videos.map(v => ({ ...v })) : prev.videos,
    videoParts: patch.videoParts
      ? patch.videoParts.map(p => ({ ...p }))
      : prev.videoParts,
    detailTabs: patch.detailTabs ? [...patch.detailTabs] : prev.detailTabs,
  }
  save(KEYS.activities, list)
  return list[index]
}

/** @param {string} id */
export function deleteAdminActivity(id) {
  const next = listAdminActivities().filter(a => a.id !== id)
  save(KEYS.activities, next)
}

/** @returns {import('@pages/news/newsData').NewsItem[]} */
export function listAdminNews() {
  return load(KEYS.news, seedNews)
}

/**
 * @param {{ source: string, title: string, date: string, href?: string, imageSrc?: string, isPublished?: boolean }} payload
 */
export function createAdminNews(payload) {
  const list = listAdminNews()
  const item = {
    id: newId('news'),
    source: payload.source || '',
    title: payload.title || '',
    date: payload.date || '',
    href: payload.href || '#',
    imageSrc: payload.imageSrc || '',
    isPublished: payload.isPublished !== false,
  }
  list.unshift(item)
  save(KEYS.news, list)
  return item
}

/**
 * @param {string} id
 * @param {Partial<import('@pages/news/newsData').NewsItem> & { isPublished?: boolean }} patch
 */
export function updateAdminNews(id, patch) {
  const list = listAdminNews()
  const index = list.findIndex(n => n.id === id)
  if (index < 0) throw new Error('Không tìm thấy tin tức.')
  list[index] = { ...list[index], ...patch, id }
  save(KEYS.news, list)
  return list[index]
}

/** @param {string} id */
export function deleteAdminNews(id) {
  save(
    KEYS.news,
    listAdminNews().filter(n => n.id !== id)
  )
}

/** @returns {import('@pages/library/libraryData').LibraryImage[]} */
export function listAdminLibrary() {
  return load(KEYS.library, seedLibrary)
}

/**
 * @param {{ src: string, alt?: string, isPublished?: boolean }} payload
 */
export function createAdminLibraryImage(payload) {
  const list = listAdminLibrary()
  const item = {
    id: newId('lib'),
    src: payload.src || '',
    alt: payload.alt || 'Lê Khánh',
    isPublished: payload.isPublished !== false,
  }
  list.unshift(item)
  save(KEYS.library, list)
  return item
}

/**
 * @param {string} id
 * @param {Partial<import('@pages/library/libraryData').LibraryImage> & { isPublished?: boolean }} patch
 */
export function updateAdminLibraryImage(id, patch) {
  const list = listAdminLibrary()
  const index = list.findIndex(i => i.id === id)
  if (index < 0) throw new Error('Không tìm thấy ảnh.')
  list[index] = { ...list[index], ...patch, id }
  save(KEYS.library, list)
  return list[index]
}

/** @param {string} id */
export function deleteAdminLibraryImage(id) {
  save(
    KEYS.library,
    listAdminLibrary().filter(i => i.id !== id)
  )
}

/** Reset toàn bộ dữ liệu admin về seed FE */
export function resetAdminStore() {
  save(KEYS.activities, seedActivities())
  save(KEYS.news, seedNews())
  save(KEYS.library, seedLibrary())
}
