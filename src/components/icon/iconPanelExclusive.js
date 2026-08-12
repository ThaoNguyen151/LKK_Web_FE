/** @typedef {'search' | 'sort'} IconPanelId */

/** @type {Set<(id: IconPanelId) => void>} */
const listeners = new Set()

/**
 * Đăng ký lắng nghe panel khác được mở (để tự đóng).
 * @param {(id: IconPanelId) => void} listener
 */
export function subscribeIconPanel(listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/**
 * Báo panel đang mở — các panel khác sẽ đóng.
 * @param {IconPanelId} id
 */
export function claimIconPanel(id) {
  listeners.forEach(listener => listener(id))
}
