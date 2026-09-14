import { useEffect } from 'react'
import { ROUTES } from '@utils'
import { isAdminLoggedIn } from '@services/admin'
import { AdminLogin } from './AdminLogin'
import { AdminLayout } from './AdminLayout'
import { AdminActivities } from './AdminActivities'
import { AdminLibrary } from './AdminLibrary'
import { AdminNews } from './AdminNews'

/**
 * @param {string} route Hash path without `#`
 * @returns {'activities' | 'library' | 'news' | 'login'}
 */
function parseAdminSection(route) {
  if (!route.startsWith(ROUTES.ADMIN)) return 'login'
  const rest = route.slice(ROUTES.ADMIN.length).replace(/^\//, '')
  if (rest === 'library' || rest.startsWith('library/')) return 'library'
  if (rest === 'news' || rest.startsWith('news/')) return 'news'
  if (rest === 'login') return 'login'
  return 'activities'
}

/**
 * @param {object} props
 * @param {string} props.route
 */
export function Admin({ route }) {
  const authed = isAdminLoggedIn()
  const section = parseAdminSection(route)

  useEffect(() => {
    if (!authed) return
    if (route === ROUTES.ADMIN || route === `${ROUTES.ADMIN}/`) {
      window.location.hash = `${ROUTES.ADMIN}/activities`
    }
  }, [authed, route])

  if (!authed || section === 'login') {
    return (
      <AdminLogin
        onSuccess={() => {
          window.location.hash = `${ROUTES.ADMIN}/activities`
        }}
      />
    )
  }

  return (
    <AdminLayout
      active={section === 'login' ? 'activities' : section}
      onLogout={() => {
        window.location.hash = `${ROUTES.ADMIN}/login`
      }}
    >
      {section === 'library' ? <AdminLibrary /> : null}
      {section === 'news' ? <AdminNews /> : null}
      {section === 'activities' ? <AdminActivities /> : null}
    </AdminLayout>
  )
}
