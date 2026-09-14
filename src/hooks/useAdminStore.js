import { useEffect, useState } from 'react'
import {
  listAdminActivities,
  listAdminLibrary,
  listAdminNews,
} from '@services/admin'

/**
 * @param {'activities' | 'news' | 'library'} resource
 */
function readStore(resource) {
  if (resource === 'activities') return listAdminActivities()
  if (resource === 'news') return listAdminNews()
  return listAdminLibrary()
}

/**
 * Re-render khi localStorage admin store thay đổi.
 * @param {'activities' | 'news' | 'library'} resource
 */
export function useAdminStore(resource) {
  const [version, setVersion] = useState(0)
  const [activeResource, setActiveResource] = useState(resource)

  if (activeResource !== resource) {
    setActiveResource(resource)
    setVersion(v => v + 1)
  }

  useEffect(() => {
    const refresh = () => setVersion(v => v + 1)
    window.addEventListener('lkk-admin-store', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('lkk-admin-store', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  // version buộc đọc lại sau mỗi mutation
  void version
  return readStore(resource)
}
