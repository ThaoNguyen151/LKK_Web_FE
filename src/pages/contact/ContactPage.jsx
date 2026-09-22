import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import iconAddress from '@assets/images/contact/contactWaddress.png'
import iconMail from '@assets/images/contact/contactWmail.png'
import iconPhone from '@assets/images/contact/contactWphone.png'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'

const CONTACT_ITEMS = [
  {
    id: 'phone',
    label: 'ĐIỆN THOẠI',
    value: '0939 393 799',
    valueNote: '(Mr. Khải)',
    iconSide: 'right',
    iconSrc: iconPhone,
  },
  {
    id: 'email',
    label: 'EMAIL',
    value: 'bachphucentertainment@gmail.com',
    iconSide: 'left',
    iconSrc: iconMail,
  },
  {
    id: 'address',
    label: 'ĐỊA CHỈ',
    value: '24/2 Đinh Tiên Hoàng, Phường Tân Định, TP.HCM',
    iconSide: 'right',
    iconSrc: iconAddress,
    external: true,
  },
]

/**
 * @param {object} props
 * @param {(typeof CONTACT_ITEMS)[number]} props.item
 */
function ContactCard({ item }) {
  const isLeft = item.iconSide === 'left'

  // Icon phải: trắng → tím (trái → phải); icon trái: tím → trắng
  const borderGradient = isLeft
    ? 'linear-gradient(to right, #5A3BC4 0%, #5A3BC4 30%, #ffffff 80%, #ffffff 100%)'
    : 'linear-gradient(to right, #ffffff 0%, #ffffff 30%, #5A3BC4 80%, #5A3BC4 100%)'

  const radiusClass = cn(
    'rounded-2xl sm:rounded-[1rem]',
    isLeft
      ? 'rounded-bl-[2.75rem] sm:rounded-bl-[4rem]'
      : 'rounded-br-[2.75rem] sm:rounded-br-[4rem]'
  )

  const cardClass = cn(
    'relative flex min-h-0 flex-1 flex-col justify-center bg-white/10 px-7 py-6 backdrop-blur-sm transition-shadow duration-200 sm:px-14 sm:py-10',
    radiusClass,
    isLeft ? 'pl-10 sm:pl-14' : 'pr-10 sm:pr-12'
  )

  const body = (
    <div>
      <p className="font-body text-[11px] font-bold text-brand-home1 sm:text-[10px]">
        {item.label}
      </p>
      <p
        className={cn(
          'mt-2 font-body leading-snug text-brand-textheader',
          item.id === 'phone'
            ? 'text-lg font-semibold italic sm:text-xl lg:text-[1.35rem]'
            : 'text-sm font-medium sm:text-[0.95rem] lg:text-[14px]'
        )}
      >
        {item.value}
        {item.valueNote ? (
          <span className="ml-1.5 text-[14px] font-normal not-italic sm:ml-2">
            {item.valueNote}
          </span>
        ) : null}
      </p>
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-5 z-10 flex h-11 w-11 translate-y-1/5 items-center justify-center rounded-full bg-brand-home1 sm:bottom-1.5 sm:h-10 sm:w-10',
          isLeft ? '-left-5 sm:-left-0' : '-right-5 sm:-right-0'
        )}
      >
        <img
          src={item.iconSrc}
          alt=""
          className="h-3.5 w-3.5 object-contain h-5 w-5"
        />
      </span>
    </div>
  )

  return (
    <article className={cardClass}>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 z-[5]',
          radiusClass
        )}
        style={{
          padding: 1.25,
          background: borderGradient,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {body}
    </article>
  )
}

/** Trang Liên hệ — panel tím + 3 thẻ thông tin. */
export function Contact() {
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
