const AUTH_KEY = 'lkk_admin_auth'

/** Demo credentials — thay bằng API `/auth/login` khi có backend */
export const DEMO_ADMIN = {
  username: 'admin',
  password: 'admin123',
}

/**
 * @returns {{ username: string, token: string } | null}
 */
export function getAdminSession() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data?.token || !data?.username) return null
    return { username: String(data.username), token: String(data.token) }
  } catch {
    return null
  }
}

export function isAdminLoggedIn() {
  return getAdminSession() !== null
}

/**
 * @param {string} username
 * @param {string} password
 * @returns {{ ok: true, session: { username: string, token: string } } | { ok: false, error: string }}
 */
export function loginAdmin(username, password) {
  const u = username.trim()
  const p = password

  if (!u || !p) {
    return { ok: false, error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' }
  }

  if (u !== DEMO_ADMIN.username || p !== DEMO_ADMIN.password) {
    return { ok: false, error: 'Sai tên đăng nhập hoặc mật khẩu.' }
  }

  const session = {
    username: u,
    token: `demo.${btoa(u)}.${Date.now()}`,
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(session))
  return { ok: true, session }
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY)
}
