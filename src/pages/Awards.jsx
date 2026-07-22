import { useEffect } from 'react'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { ROUTES } from '@utils'
import { AwardDetailTemplate } from './awards/AwardDetailTemplate'
import {
  DEFAULT_AWARD_YEAR,
  getAwardByYear,
  awardYearPath,
} from './awards/awardsData'

/**
 * Parse year from hash path like `/awards/2024` or `/awards`.
 * @param {string} route
 * @returns {string | null}
 */
export function parseAwardYearFromRoute(route) {
  if (!route.startsWith(ROUTES.AWARDS)) return null

  const rest = route.slice(ROUTES.AWARDS.length).replace(/^\//, '')
  if (!rest) return null

  const year = rest.split('/')[0]
  return /^\d{4}$/.test(year) ? year : null
}

/**
 * @param {object} props
 * @param {string} props.route Current hash path without `#`
 */
export function Awards({ route }) {
  const yearFromRoute = parseAwardYearFromRoute(route)
  const year =
    yearFromRoute && getAwardByYear(yearFromRoute)
      ? yearFromRoute
      : DEFAULT_AWARD_YEAR
  const award = getAwardByYear(year)

  useEffect(() => {
    const target = awardYearPath(year)
    if (route === target) return

    const nextHash = `#${target}`
    if (window.location.hash !== nextHash) {
      window.location.replace(nextHash)
    }
  }, [route, year])

  if (!award) return null

  return (
    <PageShell className="flex h-dvh flex-col overflow-hidden">
      <Header variant="fixed" />
      <main className="min-h-0 flex-1 overflow-hidden pt-16 lg:pt-20">
        <AwardDetailTemplate year={year} award={award} />
      </main>
    </PageShell>
  )
}
