import { useBreakpoint } from '@hooks'
import { LibraryDesktop } from './LibraryPage'
import { LibraryResponsive } from './LibraryResponsive'

/** Entry — desktop canvas / mobile responsive (đồng bộ Home, News, Contact). */
export function Library() {
  const { isCanvasLayout } = useBreakpoint()

  if (!isCanvasLayout) {
    return <LibraryResponsive />
  }

  return <LibraryDesktop />
}
