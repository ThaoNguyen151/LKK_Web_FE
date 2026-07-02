import { Header, Footer } from '@components/common'

export function MainLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col bg-brand-soft">
      <Header variant="fixed" />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
    </div>
  )
}
