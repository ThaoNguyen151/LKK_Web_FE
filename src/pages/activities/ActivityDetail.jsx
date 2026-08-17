import { useEffect, useState } from 'react'
import rectLeft from '@assets/Rectangle-2.png'
import rectRight from '@assets/Rectangle-1.png'
import rectBottom from '@assets/Rectangle.png'
import { Header } from '@components/common'
import { PageShell } from '@layouts'
import { ROUTES, cn } from '@utils'
import {
  activityCategoryPath,
  getActivityById,
  getCategoryById,
} from './activityData'
import { InfoPanel, ImagesPanel, VideoPanel } from './detail'

const DETAIL_TAB_LABELS = {
  info: 'Thông tin',
  images: 'Hình ảnh',
  video: 'Video',
}

/**
 * @param {object} props
 * @param {import('./activityData').ActivityItem} props.item
 * @param {import('./activityData').ActivityCategory} props.category
 * @param {'info'|'images'|'video'} props.activeTab
 * @param {(tab: 'info'|'images'|'video') => void} props.onTabChange
 */
function DetailHeader({ item, category, activeTab, onTabChange }) {
  const tabs = item.detailTabs ?? ['info', 'images']

  return (
    <div className="mb-6 shrink-0">
      <p className="mb-3 mt-5 font-body text-[10px] leading-tight text-brand-home1/70 sm:text-[11px]">
        <a
          href={`#${ROUTES.HOME}`}
          className="font-semibold text-brand-home1 hover:underline"
        >
          Home
        </a>
        <span className="mx-1.5 text-brand-textheader/50">/</span>
        <a
          href={`#${activityCategoryPath(category.id)}`}
          className="text-brand-textheader/50 hover:text-brand-home1 hover:underline"
        >
          {category.breadcrumb}
        </a>
        <span className="mx-1.5 text-brand-textheader/50">/</span>
        <span className="text-brand-textheader/50">{item.title}</span>
      </p>

      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <h1
          className="min-w-0 shrink font-display text-3xl italic tracking-wide text-brand-home1 sm:max-w-[63%] sm:text-4xl lg:text-5xl lg:leading-[52px]"
          style={{ WebkitTextStroke: '0.2px #5a3bc4' }}
        >
          {item.title.toUpperCase()}
        </h1>

        <div
          className="ml-4 mr-3 hidden h-12 w-px shrink-0 self-center sm:block"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgb(90, 59, 196), transparent)',
          }}
        />

        <div className="min-w-0 overflow-x-auto overflow-y-hidden hide-scrollbar pb-3 sm:flex-1">
          <div className="flex w-max flex-nowrap items-center gap-x-8 sm:gap-x-10">
            {tabs.map(tab => {
              const active = tab === activeTab
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => onTabChange(tab)}
                  className={cn(
                    'relative shrink-0 whitespace-nowrap font-body text-xs font-semibold tracking-wide transition-colors',
                    active
                      ? "text-brand-home1 after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-2/3 after:-translate-x-1/2 after:bg-brand-home1 after:content-['']"
                      : 'text-gray-400 hover:text-brand-home1'
                  )}
                >
                  {DETAIL_TAB_LABELS[tab]}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * @param {object} props
 * @param {string} props.itemId
 * @param {string} props.categoryId
 * @param {import('react').ReactNode} [props.sidebar]
 */
export function ActivityDetail({ itemId, categoryId, sidebar }) {
  const item = getActivityById(itemId)
  const category = getCategoryById(categoryId)
  const [tabByItem, setTabByItem] = useState(
    /** @type {Record<string, 'info'|'images'|'video'>} */ ({})
  )

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    root.classList.add('hide-scrollbar')
    body.classList.add('hide-scrollbar')
    return () => {
      root.classList.remove('hide-scrollbar')
      body.classList.remove('hide-scrollbar')
    }
  }, [])

  const tabs = item?.detailTabs ?? ['info', 'images']
  const requestedTab = tabByItem[itemId] ?? 'info'
  const activeTab = tabs.includes(requestedTab)
    ? requestedTab
    : (tabs[0] ?? 'info')

  const onTabChange = /** @param {'info'|'images'|'video'} tab */ tab => {
    setTabByItem(prev => ({ ...prev, [itemId]: tab }))
  }

  if (!item) {
    return (
      <PageShell className="relative flex h-dvh flex-col overflow-hidden">
        <Header variant="fixed" />
        <main className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center pt-16 lg:pt-20">
          <p className="font-body text-sm text-gray-500">
            Không tìm thấy nội dung.
          </p>
          <a
            href={`#${activityCategoryPath(categoryId)}`}
            className="mt-4 font-body text-sm font-semibold text-brand-home1 hover:underline"
          >
            Quay lại danh sách
          </a>
        </main>
      </PageShell>
    )
  }

  return (
    <PageShell className="relative flex h-dvh flex-col overflow-hidden">
      <Header variant="fixed" />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <img
          src={rectLeft}
          alt=""
          className="absolute left-0 top-[20%] h-full w-[min(40vw,420px)] opacity-70"
          aria-hidden
        />
        <img
          src={rectRight}
          alt=""
          className="absolute bottom-[10%] right-0 w-[min(35vw,380px)] opacity-70"
          aria-hidden
        />
        <img
          src={rectBottom}
          alt=""
          className="absolute bottom-0 left-1/2 w-[600px] -translate-x-[70%]"
          aria-hidden
        />
      </div>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col pt-16 lg:pt-20">
        <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 items-stretch px-4 py-6 sm:px-6 lg:px-10">
          {sidebar ? (
            <div className="hidden min-h-0 shrink-0 self-stretch md:block">
              {sidebar}
            </div>
          ) : null}

          <div className="flex min-h-0 min-w-0 flex-1 flex-col pl-4 sm:pl-6 lg:pl-8">
            <DetailHeader
              item={item}
              category={category}
              activeTab={activeTab}
              onTabChange={onTabChange}
            />

            <div className="min-h-0 flex-1 overflow-hidden">
              {activeTab === 'info' ? <InfoPanel item={item} /> : null}
              {activeTab === 'images' ? (
                <div className="h-full overflow-y-auto hide-scrollbar pb-6">
                  <ImagesPanel item={item} />
                </div>
              ) : null}
              {activeTab === 'video' ? (
                <div className="h-full overflow-y-auto hide-scrollbar pb-6">
                  <VideoPanel key={item.id} item={item} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
