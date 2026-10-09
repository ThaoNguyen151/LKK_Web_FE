import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { ROUTES } from '@utils'
import { ContactCard } from './ContactCard'
import { CONTACT_ITEMS } from './contactData'

/** Desktop canvas — panel tím LIÊN HỆ + 3 thẻ thông tin. */
export function ContactDesktop() {
  return (
    <PageShell className="relative overflow-x-hidden">
      <Header variant="fixed" />

      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={rectLeft}
          alt=""
          className="absolute left-0 top-[12%] h-full w-[min(42vw,460px)] opacity-75"
        />
        <img
          src={rectRight}
          alt=""
          className="absolute bottom-[8%] right-0 w-[min(38vw,420px)] opacity-70"
        />
        <img
          src={rectBottom}
          alt=""
          className="absolute bottom-0 left-1/2 w-[min(70vw,620px)] -translate-x-[65%] opacity-65"
        />
      </div>

      <main className="relative z-10 flex min-h-dvh flex-col pt-header">
        <div className="mx-auto flex w-full max-w-[950px] flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-20">
          <div className="grid items-stretch gap-6 md:grid-cols-[minmax(200px,240px)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(220px,260px)_minmax(0,1fr)] lg:gap-0 xl:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="relative flex min-h-[180px] flex-col overflow-hidden rounded-[2rem] bg-brand-home1 px-5 py-6 text-white sm:min-h-[200px] sm:rounded-[2.25rem] sm:px-6 sm:py-7 md:min-h-0 md:py-8 lg:rounded-tr-[1rem] lg:rounded-br-[1rem] lg:rounded-tl-[4rem] lg:rounded-bl-[4rem] lg:px-9 lg:py-35">
              <div className="flex flex-col gap-2 sm:gap-3.5">
                <p className="font-body text-[10px] leading-tight text-white/50 sm:text-[11px]">
                  <a
                    href={`#${ROUTES.HOME}`}
                    className="text-white hover:underline"
                  >
                    Home
                  </a>
                  <span className="mx-1.5">/</span>
                  <span>Liên Hệ</span>
                </p>

                <h1
                  className="text-left font-display text-5xl italic tracking-wide text-white"
                  style={{ WebkitTextStroke: '0.2px white' }}
                >
                  LIÊN HỆ
                </h1>
              </div>

              <p className="mt-auto pt-16 text-right font-body text-[6px] font-medium uppercase leading-relaxed tracking-[0.06em] text-white/40 sm:text-[9px] sm:pt-20 lg:text-[10px] lg:pt-8">
                © 2026 BẢN QUYỀN THUỘC VỀ DIỄN VIÊN LÊ KHÁNH
              </p>
            </aside>

            <div className="flex h-full min-w-0 flex-col gap-4 overflow-visible px-5 sm:gap-5 sm:px-6 md:gap-5 lg:gap-4 lg:px-5 lg:py-0">
              {CONTACT_ITEMS.map(item => (
                <ContactCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
