import { getInfoFieldsForCategory } from '../activityData'
import { getActivityPosterSrc } from '../posterData'
import { ScrollFadeContainer } from './ScrollFadeContainer'

/**
 * Tách tựa vở: "NXNX 33: Tên dài…" → tên ngắn bold + phần dài thường.
 * @param {string} value
 * @returns {import('react').ReactNode}
 */
function formatPlayTitleValue(value) {
  const text = value?.trim() ?? ''
  if (!text) return '—'

  const sep = text.search(/[:：]/)
  if (sep < 0) return text

  const head = text.slice(0, sep).trim()
  const tail = text.slice(sep + 1).trim()
  if (!head) return text

  return (
    <>
      <span className="font-bold">{head}</span>
      {tail ? (
        <span className="font-normal">
          {text[sep]} {tail}
        </span>
      ) : (
        <span className="font-normal">{text[sep]}</span>
      )}
    </>
  )
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {boolean} [props.large]
 * @param {boolean} [props.splitPlayTitle] Tựa vở: vế đầu bold, phần dài không bold
 */
function InfoField({ label, value, large = false, splitPlayTitle = false }) {
  const content = splitPlayTitle
    ? formatPlayTitleValue(value)
    : value?.trim() || '—'

  return (
    <div className="min-w-0">
      <p className="font-body text-[10px] font-semibold uppercase tracking-[1px] text-brand-home1/40 sm:text-[10px]">
        {label}
      </p>
      <p
        className={
          large
            ? 'mt-0.5 font-body text-xl font-bold leading-snug text-brand-textheader sm:mb-[-6px] sm:text-[16px]'
            : 'mt-0.5 font-body text-sm leading-snug text-brand-textheader sm:text-[14px]'
        }
      >
        {content}
      </p>
    </div>
  )
}

/**
 * Panel Thông tin — ảnh 2:3 cố định giữa khung; chỉ nội dung cuộn.
 * @param {object} props
 * @param {import('../activityData').ActivityItem} props.item
 * @param {import('react').Ref<{ scrollToTop: () => void }>} [props.scrollRef]
 * @param {(state: { scrolled: boolean, showHint: boolean }) => void} [props.onScrollState]
 * @param {import('react').RefObject<HTMLElement | null>} [props.sidebarRef]
 */
export function InfoPanel({ item, scrollRef, onScrollState, sidebarRef }) {
  const fields = getInfoFieldsForCategory(item.categoryId)
  const info = item.info ?? {}
  const posterSrc = getActivityPosterSrc(item)
  const primaryFields = fields.filter(
    field => field.primary && Boolean(info[field.key]?.trim())
  )
  const secondaryFields = fields.filter(
    field => !field.primary && Boolean(info[field.key]?.trim())
  )

  return (
    <div className="flex h-full min-h-0 flex-col gap-6 lg:flex-row lg:gap-12">
      {/* Ảnh 2:3 — không cuộn; mờ trên (containTopFade) không đè lên đây */}
      <div className="flex w-full shrink-0 justify-start lg:h-full lg:w-auto lg:items-start lg:justify-start">
        <div className="aspect-[2/3] h-[min(70vh,28rem)] overflow-hidden rounded-xl bg-[#cbb8e8] sm:h-[min(72vh,32rem)] lg:h-[min(70vh,25rem)] lg:max-h-full">
          {posterSrc ? (
            <img
              src={posterSrc}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
      </div>

      {/* Cột nội dung: mờ trên local; mờ dưới bleed giống Hình ảnh */}
      <ScrollFadeContainer
        ref={scrollRef}
        className="h-full min-h-0 min-w-0 flex-1"
        innerClassName="pr-1 pb-10 pt-3"
        scrollKey={item.id}
        extendBleed
        containTopFade
        sidebarRef={sidebarRef}
        onScrollState={onScrollState}
      >
        <div className="flex flex-col pb-4">
          <span className="mb-6 inline-flex w-fit rounded-full bg-brand-orange px-3 py-0.5 pt-1 font-body text-[10px] font-bold uppercase tracking-wide text-white sm:mb-7 sm:text-[10px]">
            {item.badge}
          </span>

          {primaryFields.length > 0 ? (
            <div className="mb-6 space-y-5 sm:mb-8 sm:space-y-6">
              {primaryFields.map(field => (
                <InfoField
                  key={field.key}
                  label={field.label}
                  value={info[field.key] ?? ''}
                  large
                  splitPlayTitle={field.key === 'playTitle'}
                />
              ))}
            </div>
          ) : null}

          {secondaryFields.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
              {secondaryFields.map(field => (
                <InfoField
                  key={field.key}
                  label={field.label}
                  value={info[field.key] ?? ''}
                />
              ))}
            </div>
          ) : null}

          {item.description ? (
            <div className="mt-8 sm:mt-6">
              <p className="mb-0.5 font-body text-[10px] font-semibold uppercase tracking-[2px] text-brand-home1/40 sm:text-[10px]">
                Mô tả
              </p>
              <p className="mr-22 font-body text-sm text-justify leading-relaxed text-brand-textheader sm:text-[14px] sm:leading-6">
                {item.description}
              </p>
            </div>
          ) : null}
        </div>
      </ScrollFadeContainer>
    </div>
  )
}
