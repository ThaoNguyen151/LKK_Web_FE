import { Header, Footer } from '@components/common'

export function MainLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col bg-brand-soft">
      <Header variant="fixed" />
      <main className="flex-1 pt-header">{children}</main>
      <Footer />
    </div>
  )
}
