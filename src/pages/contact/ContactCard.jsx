import { cn } from '@utils'

/**
 * @param {object} props
 * @param {import('./contactData').ContactItem} props.item
 * @param {'desktop' | 'mobile'} [props.variant]
 * @param {string} [props.className]
 */
export function ContactCard({ item, variant = 'desktop', className }) {
  const isLeft = item.iconSide === 'left'
  const isMobile = variant === 'mobile'

  // Icon phải: trắng → tím (trái → phải); icon trái: tím → trắng
  const borderGradient = isLeft
    ? 'linear-gradient(to right, #5A3BC4 0%, #5A3BC4 30%, #ffffff 80%, #ffffff 100%)'
    : 'linear-gradient(to right, #ffffff 0%, #ffffff 30%, #5A3BC4 80%, #5A3BC4 100%)'

  const radiusClass = isMobile
    ? cn(
        'rounded-[1.5rem]',
        isLeft ? 'rounded-bl-[4.5rem]' : 'rounded-br-[4.5rem]'
      )
    : cn(
        'rounded-2xl sm:rounded-[1rem]',
        isLeft
          ? 'rounded-bl-[2.75rem] sm:rounded-bl-[4rem]'
          : 'rounded-br-[2.75rem] sm:rounded-br-[4rem]'
      )

  const cardClass = cn(
    'relative flex min-h-0 flex-col bg-white/10 backdrop-blur-sm',
    isMobile
      ? // Mobile: cao theo nội dung + reveal giống home
        cn('home-mobile-reveal shrink-0 px-10 py-10', isLeft ? 'pl-10' : 'pr-9')
      : cn(
          'flex-1 justify-center px-7 py-6 transition-shadow duration-200 sm:px-14 sm:py-10',
          isLeft ? 'pl-10 sm:pl-14' : 'pr-10 sm:pr-12'
        ),
    radiusClass,
    className
  )

  return (
    <article
      className={cardClass}
      {...(isMobile ? { 'data-contact-reveal': '' } : {})}
    >
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
      <div>
        <p className="font-body text-[10px] font-bold text-brand-home1 sm:text-[10px]">
          {item.label}
        </p>
        <p
          className={cn(
            'mt-2 font-body text-[13px] leading-snug text-brand-textheader lg:mt-2',
            item.id === 'phone'
              ? 'text-lg font-semibold italic text-[20px] lg:text-[1.35rem]'
              : 'text-sm font-medium text-[13px] lg:text-[14px]'
          )}
        >
          {item.valueCaption || item.valueCaptionMobile ? (
            <span
              className={cn(
                'mb-1 block text-[13px] font-semibold not-italic uppercase lg:text-[14px] lg:mb-1.5',
                isMobile && item.valueCaptionMobile && 'whitespace-pre-line'
              )}
            >
              {isMobile && item.valueCaptionMobile
                ? item.valueCaptionMobile
                : item.valueCaption}
            </span>
          ) : null}
          {isMobile && item.valueMobile ? (
            <span className="block">
              {item.valueMobile.split('\n').map(line => (
                <span key={line} className="block">
                  {line}
                  {item.valueNote ? (
                    <span className="ml-1.5 text-[13px] font-normal not-italic">
                      {item.valueNote}
                    </span>
                  ) : null}
                </span>
              ))}
            </span>
          ) : (
            <>
              {item.value}
              {item.valueNote ? (
                <span className="ml-1.5 text-[13px] font-normal not-italic lg:text-[14px] sm:ml-2">
                  {item.valueNote}
                </span>
              ) : null}
            </>
          )}
        </p>
        <span
          aria-hidden="true"
          className={cn(
            'absolute z-10 flex items-center justify-center rounded-full bg-brand-home1',
            isMobile
              ? cn(
                  'bottom-3.5 h-11 w-11 translate-y-1/3',
                  isLeft ? '-left-0' : '-right-0'
                )
              : cn(
                  'bottom-5 h-11 w-11 translate-y-1/5 sm:bottom-1.5 sm:h-10 sm:w-10',
                  isLeft ? '-left-5 sm:-left-0' : '-right-5 sm:-right-0'
                )
          )}
        >
          <img src={item.iconSrc} alt="" className="h-5 w-5 object-contain" />
        </span>
      </div>
    </article>
  )
}
