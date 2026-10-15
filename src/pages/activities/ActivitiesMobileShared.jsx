import rectFull from '@assets/Rectangle-full.png'
import { cn } from '@utils'
import { ACTIVITY_CATEGORIES, activityCategoryPath } from './activityData'

/**
 * Padding dưới header trắng mobile — chỉ trang hoạt động
 * (không đổi .pt-header / spacer toàn cục).
 */
export const ACTIVITIES_MOBILE_MAIN_PT =
  'pt-[calc(4.5rem+env(safe-area-inset-top,0px))]'

/**
 * Vùng dưới header trắng: thanh tím + xám cố định; nội dung cuộn trong khung
 * bắt đầu từ mép dưới thanh xám (không lướt xuyên nền xám).
 */
export const ACTIVITIES_MOBILE_BELOW_HEADER =
  'top-[calc(4.5rem+env(safe-area-inset-top,0px))]'

/**
 * @param {object} props
 * @param {string} [props.className]
 */
export function ActivitiesMobileBackdrop({ className }) {
  return (
    <div aria-hidden className={cn('overflow-hidden bg-brand-soft', className)}>
      <div className="absolute left-[-65px] top-[8%] flex h-[min(72vw,300px)] w-[min(52vw,210px)] items-center justify-start overflow-visible">
        <img
          src={rectFull}
          alt=""
          className="h-auto w-[min(110vw,520px)] max-w-none translate-x-[-50%] rotate-[330deg] object-contain opacity-85 pt-[80%]"
        />
      </div>
      <img
        src={rectFull}
        alt=""
        className="absolute right-0 top-[40%] h-auto w-[min(90vw,380px)] max-w-none translate-x-[50%] object-contain opacity-85"
      />
    </div>
  )
}

/**
 * Nhãn danh mục trên mobile — rút gọn "HOẠT ĐỘNG KHÁC" → "KHÁC".
 * @param {import('./activityData').ActivityCategory} cat
 */
function mobileCategoryLabel(cat) {
  if (cat.id === 'khac') return 'KHÁC'
  return cat.label
}

/**
 * Thanh danh mục 4 cột — tím full-bleed; nút căn lề trang.
 * @param {object} props
 * @param {string} props.activeId
 */
export function ActivityCategoryBarMobile({ activeId }) {
  return (
    <nav aria-label="Danh mục hoạt động" className="w-full bg-brand-home1">
      <div className="home-mobile-section">
        <div className="home-mobile-content flex items-stretch">
          {ACTIVITY_CATEGORIES.map(cat => {
            const active = cat.id === activeId
            return (
              <a
                key={cat.id}
                href={`#${activityCategoryPath(cat.id)}`}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex min-w-0 flex-1 flex-col items-center justify-end gap-1.5 px-0.5 pb-2.5 pt-2.5 text-center transition-colors',
                  active && 'gap-2 bg-white/15'
                )}
              >
                <span
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-tl-xl rounded-br-xl rounded-tr-none rounded-bl-none transition-colors',
                    active ? 'bg-brand-orange' : 'bg-transparent opacity-55'
                  )}
                >
                  <img
                    src={cat.icon}
                    alt=""
                    className="h-8 w-8 object-contain mix-blend-screen"
                    aria-hidden
                  />
                </span>
                <span
                  className={cn(
                    'font-body text-[9px] uppercase leading-none tracking-wide',
                    active
                      ? 'font-semibold text-white'
                      : 'font-light text-white/55'
                  )}
                >
                  {mobileCategoryLabel(cat)}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
