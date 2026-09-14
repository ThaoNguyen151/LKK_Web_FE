import { useMemo, useState } from 'react'
import {
  ACTIVITY_CATEGORIES,
  ACTIVITY_INFO_FIELDS,
} from '@pages/activities/activityData'
import {
  createAdminActivity,
  deleteAdminActivity,
  updateAdminActivity,
} from '@services/admin'
import { useAdminStore } from '@hooks/useAdminStore'
import { AdminButton, AdminField, AdminModal, adminInputClass } from './AdminUi'

/**
 * @param {Partial<import('@pages/activities/activityData').ActivityItem> | null} item
 */
function emptyForm(item) {
  const categoryId =
    item?.categoryId || ACTIVITY_CATEGORIES[0]?.id || 'san-khau'
  const category = ACTIVITY_CATEGORIES.find(c => c.id === categoryId)
  const tabId = item?.tabId || category?.tabs[0]?.id || ''

  return {
    id: item?.id || '',
    categoryId,
    tabId,
    badge: item?.badge || category?.label || '',
    year: item?.year || '',
    title: item?.title || '',
    subtitle: item?.subtitle || '',
    image: item?.image || '',
    description: item?.description || '',
    info: { ...(item?.info || {}) },
    imagesText: (item?.images || []).join('\n'),
    videosText: (item?.videos || []).map(v => `${v.title}|${v.url}`).join('\n'),
    isPublished:
      /** @type {{ isPublished?: boolean }} */ (item)?.isPublished !== false,
  }
}

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {object | null} props.item
 * @param {boolean} props.isNew
 * @param {() => void} props.onClose
 * @param {(payload: object) => void} props.onSubmit
 */
function ActivityFormModal({ open, item, isNew, onClose, onSubmit }) {
  const [form, setForm] = useState(() => emptyForm(item))
  const [error, setError] = useState('')

  const formKey = `${open}-${item?.id ?? 'new'}`
  const [prevKey, setPrevKey] = useState(formKey)
  if (prevKey !== formKey) {
    setPrevKey(formKey)
    setForm(emptyForm(item))
    setError('')
  }

  const tabs = useMemo(() => {
    const cat = ACTIVITY_CATEGORIES.find(c => c.id === form.categoryId)
    return cat?.tabs ?? []
  }, [form.categoryId])

  const infoFields = ACTIVITY_INFO_FIELDS[form.categoryId] || []

  /**
   * @param {string} key
   * @param {string | boolean} value
   */
  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function setInfo(key, value) {
    setForm(prev => ({
      ...prev,
      info: { ...prev.info, [key]: value },
    }))
  }

  function handleCategoryChange(categoryId) {
    const cat = ACTIVITY_CATEGORIES.find(c => c.id === categoryId)
    setForm(prev => ({
      ...prev,
      categoryId,
      tabId: cat?.tabs[0]?.id || '',
      badge: prev.badge || cat?.label || '',
    }))
  }

  function handleSave() {
    setError('')
    if (!form.title.trim()) {
      setError('Vui lòng nhập tiêu đề.')
      return
    }
    if (!form.categoryId || !form.tabId) {
      setError('Chọn category và tab.')
      return
    }

    const images = form.imagesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)

    const videos = form.videosText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [title, url] = line.split('|').map(s => s.trim())
        return {
          id: `v-${index + 1}`,
          title: title || `Video ${index + 1}`,
          url: url || title || '',
        }
      })
      .filter(v => v.url)

    const detailTabs = ['info', 'images']
    if (videos.length > 0) detailTabs.push('video')

    onSubmit({
      id: form.id.trim() || undefined,
      categoryId: form.categoryId,
      tabId: form.tabId,
      badge: form.badge.trim(),
      year: form.year.trim(),
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      image: form.image.trim(),
      description: form.description,
      info: form.info,
      images,
      videos,
      videoParts: item?.videoParts || [],
      detailTabs,
      isPublished: form.isPublished,
    })
  }

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={isNew ? 'Thêm hoạt động' : 'Sửa hoạt động'}
      footer={
        <>
          <AdminButton variant="secondary" onClick={onClose}>
            Huỷ
          </AdminButton>
          <AdminButton onClick={handleSave}>Lưu</AdminButton>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {isNew ? (
          <AdminField label="ID (tuỳ chọn)" hint="Để trống sẽ tự tạo">
            <input
              className={adminInputClass()}
              value={form.id}
              onChange={e => setField('id', e.target.value)}
              placeholder="sk-td-99"
            />
          </AdminField>
        ) : (
          <AdminField label="ID">
            <input className={adminInputClass()} value={form.id} disabled />
          </AdminField>
        )}

        <AdminField label="Năm">
          <input
            className={adminInputClass()}
            value={form.year}
            onChange={e => setField('year', e.target.value)}
            placeholder="2024"
          />
        </AdminField>

        <AdminField label="Category">
          <select
            className={adminInputClass()}
            value={form.categoryId}
            onChange={e => handleCategoryChange(e.target.value)}
          >
            {ACTIVITY_CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </AdminField>

        <AdminField label="Tab">
          <select
            className={adminInputClass()}
            value={form.tabId}
            onChange={e => setField('tabId', e.target.value)}
          >
            {tabs.map(t => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </AdminField>

        <AdminField label="Tiêu đề" className="sm:col-span-2">
          <input
            className={adminInputClass()}
            value={form.title}
            onChange={e => setField('title', e.target.value)}
          />
        </AdminField>

        <AdminField label="Badge">
          <input
            className={adminInputClass()}
            value={form.badge}
            onChange={e => setField('badge', e.target.value)}
          />
        </AdminField>

        <AdminField label="Subtitle">
          <input
            className={adminInputClass()}
            value={form.subtitle}
            onChange={e => setField('subtitle', e.target.value)}
            placeholder="vai diễn: …"
          />
        </AdminField>

        <AdminField label="Poster / ảnh card (URL)" className="sm:col-span-2">
          <input
            className={adminInputClass()}
            value={form.image}
            onChange={e => setField('image', e.target.value)}
            placeholder="https://…"
          />
        </AdminField>

        <AdminField label="Mô tả" className="sm:col-span-2">
          <textarea
            className={adminInputClass('min-h-28')}
            value={form.description}
            onChange={e => setField('description', e.target.value)}
          />
        </AdminField>

        <div className="sm:col-span-2">
          <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wide text-brand-home1">
            Chi tiết InfoPanel
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {infoFields.map(field => (
              <AdminField key={field.key} label={field.label}>
                <input
                  className={adminInputClass()}
                  value={form.info[field.key] || ''}
                  onChange={e => setInfo(field.key, e.target.value)}
                />
              </AdminField>
            ))}
          </div>
        </div>

        <AdminField
          label="Gallery ảnh (mỗi URL 1 dòng)"
          className="sm:col-span-2"
        >
          <textarea
            className={adminInputClass('min-h-24 font-mono text-xs')}
            value={form.imagesText}
            onChange={e => setField('imagesText', e.target.value)}
          />
        </AdminField>

        <AdminField
          label="Videos (mỗi dòng: Tiêu đề|URL)"
          className="sm:col-span-2"
          hint="Có video sẽ bật tab Video trên detail"
        >
          <textarea
            className={adminInputClass('min-h-24 font-mono text-xs')}
            value={form.videosText}
            onChange={e => setField('videosText', e.target.value)}
          />
        </AdminField>

        <label className="flex items-center gap-2 sm:col-span-2">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={e => setField('isPublished', e.target.checked)}
          />
          <span className="font-body text-sm font-semibold">
            Đã publish (hiện trên site guest)
          </span>
        </label>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </AdminModal>
  )
}

export function AdminActivities() {
  const items = /** @type {any[]} */ (useAdminStore('activities'))
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [editing, setEditing] = useState(/** @type {any | null} */ (null))
  const [isNew, setIsNew] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(item => {
      if (categoryFilter && item.categoryId !== categoryFilter) return false
      if (!q) return true
      return (
        item.title?.toLowerCase().includes(q) ||
        item.id?.toLowerCase().includes(q) ||
        item.badge?.toLowerCase().includes(q)
      )
    })
  }, [items, query, categoryFilter])

  function openCreate() {
    setIsNew(true)
    setEditing({})
  }

  /**
   * @param {object} item
   */
  function openEdit(item) {
    setIsNew(false)
    setEditing(item)
  }

  /**
   * @param {object} payload
   */
  function handleSubmit(payload) {
    try {
      if (isNew) {
        createAdminActivity(payload)
      } else if (editing?.id) {
        updateAdminActivity(editing.id, payload)
      }
      setEditing(null)
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Lỗi lưu hoạt động')
    }
  }

  /**
   * @param {object} item
   */
  function handleDelete(item) {
    if (!window.confirm(`Xoá hoạt động “${item.title}”?`)) return
    deleteAdminActivity(item.id)
  }

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl italic text-brand-home1">
            Hoạt động
          </h2>
          <p className="mt-1 font-body text-sm text-brand-textheader/55">
            Thêm / sửa / xoá card &amp; chi tiết (info, ảnh, video) —{' '}
            {items.length} mục
          </p>
        </div>
        <AdminButton onClick={openCreate}>+ Thêm hoạt động</AdminButton>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          className={adminInputClass('max-w-xs')}
          placeholder="Tìm tiêu đề / ID…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          className={adminInputClass('max-w-[12rem]')}
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">Tất cả category</option>
          {ACTIVITY_CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-home1/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left font-body text-sm">
            <thead className="bg-brand-home1/5 text-xs uppercase tracking-wide text-brand-textheader/55">
              <tr>
                <th className="px-4 py-3">Năm</th>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Badge</th>
                <th className="px-4 py-3">TT</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr
                  key={item.id}
                  className="border-t border-brand-home1/8 hover:bg-brand-soft/80"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{item.year}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-brand-textheader">
                      {item.title}
                    </div>
                    <div className="text-xs text-brand-textheader/45">
                      {item.id}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.categoryId}/{item.tabId}
                  </td>
                  <td className="px-4 py-3">{item.badge}</td>
                  <td className="px-4 py-3">
                    {item.isPublished !== false ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        Public
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        Nháp
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <AdminButton
                        variant="secondary"
                        className="px-3 py-1.5 text-xs"
                        onClick={() => openEdit(item)}
                      >
                        Sửa
                      </AdminButton>
                      <AdminButton
                        variant="danger"
                        className="px-3 py-1.5 text-xs"
                        onClick={() => handleDelete(item)}
                      >
                        Xoá
                      </AdminButton>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-brand-textheader/45"
                  >
                    Không có hoạt động nào.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <ActivityFormModal
        open={editing !== null}
        item={editing}
        isNew={isNew}
        onClose={() => setEditing(null)}
        onSubmit={handleSubmit}
      />
    </section>
  )
}
