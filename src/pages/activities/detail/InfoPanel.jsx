import { getInfoFieldsForCategory } from '../activityData'

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {boolean} [props.large]
 */
function InfoField({ label, value, large = false }) {
  return (
    <div className="min-w-0">
      <p className="font-body text-[10px] font-semibold uppercase tracking-[1px] text-brand-home1/40 sm:text-[10px]">
        {label}
      </p>
      <p
        className={
          large
            ? 'mt-0.5 font-body text-xl font-bold uppercase leading-snug text-brand-textheader sm:mb-[-6px] sm:text-lg'
            : 'mt-0.5 font-body text-sm leading-snug text-brand-textheader sm:text-[15px]'
        }
      >
        {value || '—'}
      </p>
    </div>
  )
}

/**
 * Panel Thông tin — ảnh 2:3 cố định giữa khung; chỉ nội dung cuộn.
 * @param {object} props
 * @param {import('../activityData').ActivityItem} props.item
 */
export function InfoPanel({ item }) {
  const fields = getInfoFieldsForCategory(item.categoryId)
  const info = item.info ?? {}
  const primaryFields = fields.filter(
    field => field.primary && Boolean(info[field.key]?.trim())
  )
  const secondaryFields = fields.filter(
    field => !field.primary && Boolean(info[field.key]?.trim())
  )

  return (
    <div className="flex h-full min-h-0 flex-col gap-6 lg:flex-row lg:gap-10">
      {/* Ảnh 2:3, cao hơn, canh giữa khung — không cuộn theo nội dung */}
      <div className="flex w-full shrink-0 justify-start lg:h-full lg:w-auto lg:items-start lg:justify-start">
        <div className="aspect-[2/3] h-[min(70vh,28rem)] overflow-hidden rounded-xl bg-[#cbb8e8] sm:h-[min(72vh,32rem)] lg:h-[min(60vh,23rem)] lg:max-h-full">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
      </div>

      {/* Chỉ cột nội dung cuộn */}
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto hide-scrollbar pr-1">
        <div className="flex flex-col pb-4 pt-3">
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
              <p className="font-body text-sm leading-relaxed text-brand-textheader sm:text-[15px] sm:leading-6">
                {item.description}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
