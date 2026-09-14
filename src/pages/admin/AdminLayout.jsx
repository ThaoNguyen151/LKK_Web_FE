import { cn, ROUTES } from '@utils'
import { logoutAdmin, getAdminSession, resetAdminStore } from '@services/admin'
import { AdminButton } from './AdminUi'

const NAV = [
  { id: 'activities', label: 'Hoạt động', href: `${ROUTES.ADMIN}/activities` },
  { id: 'library', label: 'Thư viện', href: `${ROUTES.ADMIN}/library` },
  { id: 'news', label: 'Tin tức', href: `${ROUTES.ADMIN}/news` },
]

/**
 * @param {object} props
 * @param {'activities' | 'library' | 'news'} props.active
 * @param {import('react').ReactNode} props.children
 * @param {() => void} props.onLogout
 */
export function AdminLayout({ active, children, onLogout }) {
  const session = getAdminSession()

  function handleLogout() {
    logoutAdmin()
    onLogout()
  }

  function handleReset() {
    if (
      !window.confirm(
        'Khôi phục dữ liệu admin về bản seed từ FE? Thay đổi local sẽ mất.'
      )
    ) {
      return
    }
    resetAdminStore()
  }

  return (
    <div className="min-h-dvh bg-brand-soft text-brand-textheader">
      <header className="sticky top-0 z-40 border-b border-brand-home1/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-home1/55">
              LKK Admin
            </p>
            <h1 className="font-display text-2xl italic text-brand-home1">
              Quản trị nội dung
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-home1/10 px-3 py-1 font-body text-xs font-semibold text-brand-home1">
              {session?.username ?? 'admin'}
            </span>
            <AdminButton variant="ghost" onClick={handleReset}>
              Reset data
            </AdminButton>
            <a href={`#${ROUTES.HOME}`}>
              <AdminButton variant="secondary">Xem site</AdminButton>
            </a>
            <AdminButton variant="danger" onClick={handleLogout}>
              Đăng xuất
            </AdminButton>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {NAV.map(item => (
            <a
              key={item.id}
              href={`#${item.href}`}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 font-body text-sm font-semibold transition',
                active === item.id
                  ? 'bg-brand-home1 text-white'
                  : 'bg-white text-brand-textheader/65 ring-1 ring-brand-home1/10 hover:text-brand-home1'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  )
}
