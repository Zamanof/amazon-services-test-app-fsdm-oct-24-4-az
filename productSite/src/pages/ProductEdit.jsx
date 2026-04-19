import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAllProducts, updateProduct } from '../api/product.js'

export default function ProductEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', description: '', price: '', category: '' })
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false
        ;(async () => {
            setLoading(true)
            setError(null)
            try {
                const p = await getAllProducts(id)
                if (cancelled) return
                setForm({
                    name: p.name || '',
                    description: p.description || '',
                    price: String(p.price ?? ''),
                    category: p.category || '',
                })
            } catch (e) {
                if (!cancelled) setError(e.message || 'Product not found')
            } finally {
                if (!cancelled) setLoading(false)
            }
        })()
        return () => {
            cancelled = true
        }
    }, [id])

    const onChange = (e) => {
        const { name, value } = e.target
        setForm((f) => ({ ...f, [name]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError(null)
        const fd = new FormData()
        fd.append('Name', form.name.trim())
        fd.append('Description', form.description)
        fd.append('Price', String(form.price))
        fd.append('Category', form.category)
        if (file) fd.append('Image', file)
        try {
            await updateProduct(id, fd)
            navigate(`/products/${id}`)
        } catch (err) {
            setError(err.message || 'Update failed')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading…</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/products">Products</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/products/${id}`}>#{id}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit
                    </li>
                </ol>
            </nav>

            <h1 className="h3 mb-4">Edit product</h1>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: '32rem' }}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                        Name <span className="text-danger">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={onChange}
                        required
                        maxLength={200}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows={3}
                        value={form.description}
                        onChange={onChange}
                        maxLength={2000}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="price">
                        Price <span className="text-danger">*</span>
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0.01"
                        className="form-control"
                        value={form.price}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="category">
                        Category
                    </label>
                    <input
                        id="category"
                        name="category"
                        className="form-control"
                        value={form.category}
                        onChange={onChange}
                        maxLength={100}
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label" htmlFor="image">
                        New image (optional)
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <div className="form-text">Leave empty to keep the current image.</div>
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Saving…' : 'Save'}
                    </button>
                    <Link to={`/products/${id}`} className="btn btn-outline-secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}