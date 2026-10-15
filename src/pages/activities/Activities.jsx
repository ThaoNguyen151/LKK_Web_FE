import { useBreakpoint } from '@hooks'
import { ROUTES } from '@utils'
import { ActivitiesDesktop } from './ActivitiesPage'
import { ActivitiesResponsive } from './ActivitiesResponsive'

/**
 * Entry — desktop canvas / mobile responsive (đồng bộ News, Library, Contact).
 * @param {object} props
 * @param {string} [props.route]
 */
export function Activities({ route = ROUTES.ACTIVITIES }) {
  const { isCanvasLayout } = useBreakpoint()

  if (!isCanvasLayout) {
    return <ActivitiesResponsive route={route} />
  }

  return <ActivitiesDesktop route={route} />
}
