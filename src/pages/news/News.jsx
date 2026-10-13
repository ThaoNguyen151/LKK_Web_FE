import { useBreakpoint } from '@hooks'
import { ROUTES } from '@utils'
import { NewsDesktop } from './NewsPage'
import { NewsResponsive } from './NewsResponsive'

/**
 * Entry — desktop canvas / mobile responsive (đồng bộ Home, Awards, Contact).
 * @param {object} props
 * @param {string} [props.route]
 */
export function News({ route = ROUTES.NEWS }) {
  const { isCanvasLayout } = useBreakpoint()

  if (!isCanvasLayout) {
    return <NewsResponsive route={route} />
  }

  return <NewsDesktop route={route} />
}
