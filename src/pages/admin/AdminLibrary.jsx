import { useMemo, useState } from 'react'
import {
  createAdminLibraryImage,
  deleteAdminLibraryImage,
  updateAdminLibraryImage,
} from '@services/admin'
import { useAdminStore } from '@hooks/useAdminStore'
import { AdminButton, AdminField, AdminModal, adminInputClass } from './AdminUi'

/**
 * @param {object | null} item
 */
function emptyForm(item) {
  return {
    src: item?.src || '',
    alt: item?.alt || 'Lê Khánh',
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
function LibraryFormModal({ open, item, isNew, onClose, onSubmit }) {
  const formKey = `${open}-${item?.id ?? 'new'}`
  const [prevKey, setPrevKey] = useState(formKey)
  const [form, setForm] = useState(() => emptyForm(item))
  const [error, setError] = useState('')

  if (prevKey !== formKey) {
    setPrevKey(formKey)
    setForm(emptyForm(item))
    setError('')
  }

  function handleSave() {
    if (!form.src.trim()) {
      setError('Nhập URL ảnh.')
      return
    }
    onSubmit({
      src: form.src.trim(),
      alt: form.alt.trim() || 'Lê Khánh',
      isPublished: form.isPublished,
    })
  }

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={isNew ? 'Thêm ảnh thư viện' : 'Sửa ảnh thư viện'}
      footer={
        <>
          <AdminButton variant="secondary" onClick={onClose}>
            Huỷ
          </AdminButton>
          <AdminButton onClick={handleSave}>Lưu</AdminButton>
        </>
      }
    >
      <div className="space-y-4">
        <AdminField label="URL ảnh">
          <input
            className={adminInputClass()}
            value={form.src}
            onChange={e => setForm(f => ({ ...f, src: e.target.value }))}
            placeholder="https://… hoặc path local"
          />
        </AdminField>
        <AdminField label="Alt">
          <input
            className={adminInputClass()}
            value={form.alt}
            onChange={e => setForm(f => ({ ...f, alt: e.target.value }))}
          />
        </AdminField>
        {form.src ? (
          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-brand-home1/10">
            <img
              src={form.src}
              alt={form.alt}
              className="mx-auto max-h-48 object-contain"
            />
          </div>
        ) : null}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={e =>
              setForm(f => ({ ...f, isPublished: e.target.checked }))
            }
          />
          <span className="font-body text-sm font-semibold">Đã publish</span>
        </label>
        {error ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
      </div>
    </AdminModal>
  )
}

export function AdminLibrary() {
  const items = /** @type {any[]} */ (useAdminStore('library'))
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(/** @type {any | null} */ (null))
  const [isNew, setIsNew] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      item =>
        item.id?.toLowerCase().includes(q) ||
        item.alt?.toLowerCase().includes(q) ||
        item.src?.toLowerCase().includes(q)
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
      if (isNew) createAdminLibraryImage(payload)
      else if (editing?.id) updateAdminLibraryImage(editing.id, payload)
      setEditing(null)
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Lỗi lưu ảnh')
    }
  }

  /**
   * @param {object} item
   */
  function handleDelete(item) {
    if (!window.confirm(`Xoá ảnh “${item.alt || item.id}”?`)) return
    deleteAdminLibraryImage(item.id)
  }

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl italic text-brand-home1">
            Thư viện
          </h2>
          <p className="mt-1 font-body text-sm text-brand-textheader/55">
            Thêm / sửa / xoá ảnh — {items.length} mục
          </p>
        </div>
        <AdminButton onClick={openCreate}>+ Thêm ảnh</AdminButton>
      </div>

      <input
        className={adminInputClass('mb-4 max-w-xs')}
        placeholder="Tìm ID / alt / URL…"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map(item => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-brand-home1/10 bg-white shadow-sm"
          >
            <div className="aspect-[3/4] bg-brand-soft">
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.alt || 'Lê Khánh'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-brand-textheader/40">
                  No image
                </div>
              )}
            </div>
            <div className="space-y-2 p-2.5">
              <p className="truncate font-body text-[11px] text-brand-textheader/50">
                {item.id}
              </p>
              <div className="flex gap-1.5">
                <AdminButton
                  variant="secondary"
                  className="flex-1 px-2 py-1.5 text-xs"
                  onClick={() => openEdit(item)}
                >
                  Sửa
                </AdminButton>
                <AdminButton
                  variant="danger"
                  className="flex-1 px-2 py-1.5 text-xs"
                  onClick={() => handleDelete(item)}
                >
                  Xoá
                </AdminButton>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center font-body text-sm text-brand-textheader/45">
          Không có ảnh nào.
        </p>
      ) : null}

      <LibraryFormModal
        open={editing !== null}
        item={editing}
        isNew={isNew}
        onClose={() => setEditing(null)}
        onSubmit={handleSubmit}
      />
    </section>
  )
}
