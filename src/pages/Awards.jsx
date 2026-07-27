import { useEffect, useRef } from 'react'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { ROUTES } from '@utils'
import { AwardDetailTemplate } from './awards/AwardDetailTemplate'
import {
  DEFAULT_AWARD_YEAR,
  YEARS,
  getAwardByYear,
  awardYearPath,
} from './awards/awardsData'

const AUTO_YEAR_MS = 4_000
const WHEEL_COOLDOWN_MS = 400

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
 * @param {string} year
 * @param {1 | -1} step
 */
function adjacentAwardYear(year, step) {
  const index = YEARS.indexOf(year)
  const from = index >= 0 ? index : 0
  const next = (from + step + YEARS.length) % YEARS.length
  return YEARS[next]
}

/**
 * @param {string} year
 */
function navigateToAwardYear(year) {
  const nextHash = `#${awardYearPath(year)}`
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash
  }
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
  const wheelLockRef = useRef(false)

  useEffect(() => {
    const target = awardYearPath(year)
    if (route === target) return

    const nextHash = `#${target}`
    if (window.location.hash !== nextHash) {
      window.location.replace(nextHash)
    }
  }, [route, year])

  // Tự nhảy năm sau 40s; lăn chuột đổi năm (xuống = năm dưới, lên = năm trên)
  useEffect(() => {
    const goNext = () => navigateToAwardYear(adjacentAwardYear(year, 1))
    const goPrev = () => navigateToAwardYear(adjacentAwardYear(year, -1))

    const timerId = window.setInterval(goNext, AUTO_YEAR_MS)

    /** @param {WheelEvent} event */
    const onWheel = event => {
      if (Math.abs(event.deltaY) < 8) return
      event.preventDefault()
      if (wheelLockRef.current) return

      wheelLockRef.current = true
      if (event.deltaY > 0) goNext()
      else goPrev()

      window.setTimeout(() => {
        wheelLockRef.current = false
      }, WHEEL_COOLDOWN_MS)
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.clearInterval(timerId)
      window.removeEventListener('wheel', onWheel)
    }
  }, [year])

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
