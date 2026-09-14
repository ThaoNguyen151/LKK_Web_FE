import { useState } from 'react'
import { DEMO_ADMIN, loginAdmin } from '@services/admin'
import { AdminButton, AdminField, adminInputClass } from './AdminUi'
import { ROUTES } from '@utils'

/**
 * @param {object} props
 * @param {() => void} props.onSuccess
 */
export function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /**
   * @param {import('react').FormEvent} e
   */
  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = loginAdmin(username, password)
    setLoading(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    onSuccess()
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-brand-soft px-4 py-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-home1/10 blur-3xl" />
        <div className="absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-3xl border border-white/80 bg-white/80 p-8 shadow-[0_20px_60px_rgba(90,59,196,0.12)] backdrop-blur-md">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-brand-home1/60">
          LKK CMS
        </p>
        <h1 className="mt-2 font-display text-4xl italic text-brand-home1">
          Đăng nhập Admin
        </h1>
        <p className="mt-2 font-body text-sm text-brand-textheader/60">
          Quản lý Activity, Library và News. Khách không đăng nhập chỉ xem trang
          công khai.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <AdminField label="Tên đăng nhập">
            <input
              className={adminInputClass()}
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
            />
          </AdminField>
          <AdminField label="Mật khẩu">
            <input
              type="password"
              className={adminInputClass()}
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </AdminField>

          {error ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 font-body text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <AdminButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
          </AdminButton>
        </form>

        <p className="mt-6 rounded-2xl bg-brand-home1/5 px-3 py-3 font-body text-[12px] leading-relaxed text-brand-textheader/55">
          Demo: <strong>{DEMO_ADMIN.username}</strong> /{' '}
          <strong>{DEMO_ADMIN.password}</strong>
          <br />
          Khi có backend, form này gọi <code>POST /api/v1/auth/login</code>.
        </p>

        <a
          href={`#${ROUTES.HOME}`}
          className="mt-4 inline-block font-body text-sm font-semibold text-brand-home1 hover:underline"
        >
          ← Về trang chủ
        </a>
      </div>
    </div>
  )
}
