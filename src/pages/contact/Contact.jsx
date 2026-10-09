import { useBreakpoint } from '@hooks'
import { ContactDesktop } from './ContactPage'
import { ContactResponsive } from './ContactResponsive'

/** Entry — desktop canvas / mobile responsive (đồng bộ Home, Awards). */
export function Contact() {
  const { isCanvasLayout } = useBreakpoint()

  if (!isCanvasLayout) {
    return <ContactResponsive />
  }

  return <ContactDesktop />
}
