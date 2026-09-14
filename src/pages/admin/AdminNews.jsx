import { useMemo, useState } from 'react'
import {
  createAdminNews,
  deleteAdminNews,
  updateAdminNews,
} from '@services/admin'
import { useAdminStore } from '@hooks/useAdminStore'
import { AdminButton, AdminField, AdminModal, adminInputClass } from './AdminUi'

/**
 * @param {object | null} item
 */
function emptyForm(item) {
  return {
    source: item?.source || '',
    title: item?.title || '',
    date: item?.date || '',
    href: item?.href || '#',
    imageSrc: item?.imageSrc || '',
    isPublished: item?.isPublished !== false,
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
function NewsFormModal({ open, item, isNew, onClose, onSubmit }) {
  const formKey = `${open}-${item?.id ?? 'new'}`
  const [prevKey, setPrevKey] = useState(formKey)
  const [form, setForm] = useState(() => emptyForm(item))
  const [error, setError] = useState('')

  if (prevKey !== formKey) {
    setPrevKey(formKey)
    setForm(emptyForm(item))
    setError('')
  }

  /**
   * @param {string} key
   * @param {string | boolean} value
   */
  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    if (!form.title.trim() || !form.source.trim() || !form.date.trim()) {
      setError('Nhập đủ nguồn, tiêu đề và ngày.')
      return
    }
    onSubmit({
      source: form.source.trim(),
      title: form.title.trim(),
      date: form.date.trim(),
      href: form.href.trim() || '#',
      imageSrc: form.imageSrc.trim(),
      isPublished: form.isPublished,
    })
  }

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={isNew ? 'Thêm tin tức' : 'Sửa tin tức'}
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
        <AdminField label="Nguồn báo">
          <input
            className={adminInputClass()}
            value={form.source}
            onChange={e => setField('source', e.target.value)}
            placeholder="NGƯỜI LAO ĐỘNG"
          />
        </AdminField>
        <AdminField label="Ngày (DD/MM/YYYY)">
          <input
            className={adminInputClass()}
            value={form.date}
            onChange={e => setField('date', e.target.value)}
            placeholder="12/02/2026"
          />
        </AdminField>
        <AdminField label="Tiêu đề" className="sm:col-span-2">
          <input
            className={adminInputClass()}
            value={form.title}
            onChange={e => setField('title', e.target.value)}
          />
        </AdminField>
        <AdminField label="Link bài gốc" className="sm:col-span-2">
          <input
            className={adminInputClass()}
            value={form.href}
            onChange={e => setField('href', e.target.value)}
            placeholder="https://… hoặc #"
          />
        </AdminField>
        <AdminField label="Ảnh thumbnail (URL)" className="sm:col-span-2">
          <input
            className={adminInputClass()}
            value={form.imageSrc}
            onChange={e => setField('imageSrc', e.target.value)}
          />
        </AdminField>
        <label className="flex items-center gap-2 sm:col-span-2">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={e => setField('isPublished', e.target.checked)}
          />
          <span className="font-body text-sm font-semibold">Đã publish</span>
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

export function AdminNews() {
  const items = /** @type {any[]} */ (useAdminStore('news'))
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(/** @type {any | null} */ (null))
  const [isNew, setIsNew] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      item =>
        item.title?.toLowerCase().includes(q) ||
        item.source?.toLowerCase().includes(q) ||
        item.id?.toLowerCase().includes(q)
    )
  }, [items, query])

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
      if (isNew) createAdminNews(payload)
      else if (editing?.id) updateAdminNews(editing.id, payload)
      setEditing(null)
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Lỗi lưu tin')
    }
  }

  /**
   * @param {object} item
   */
  function handleDelete(item) {
    if (!window.confirm(`Xoá tin “${item.title}”?`)) return
    deleteAdminNews(item.id)
  }

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl italic text-brand-home1">
            Tin tức
          </h2>
          <p className="mt-1 font-body text-sm text-brand-textheader/55">
            Thêm / sửa / xoá bài — {items.length} mục
          </p>
        </div>
        <AdminButton onClick={openCreate}>+ Thêm tin</AdminButton>
      </div>

      <input
        className={adminInputClass('mb-4 max-w-xs')}
        placeholder="Tìm tiêu đề / nguồn…"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="overflow-hidden rounded-2xl border border-brand-home1/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left font-body text-sm">
            <thead className="bg-brand-home1/5 text-xs uppercase tracking-wide text-brand-textheader/55">
              <tr>
                <th className="px-4 py-3">Ngày</th>
                <th className="px-4 py-3">Nguồn</th>
                <th className="px-4 py-3">Tiêu đề</th>
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
                  <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-semibold text-brand-home1">
                    {item.source}
                  </td>
                  <td className="max-w-md px-4 py-3">
                    <div className="line-clamp-2 font-semibold">
                      {item.title}
                    </div>
                  </td>
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
                    colSpan={5}
                    className="px-4 py-10 text-center text-brand-textheader/45"
                  >
                    Không có tin nào.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <NewsFormModal
        open={editing !== null}
        item={editing}
        isNew={isNew}
        onClose={() => setEditing(null)}
        onSubmit={handleSubmit}
      />
    </section>
  )
}
