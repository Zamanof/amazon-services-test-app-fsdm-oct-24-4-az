import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {createProduct} from "../api/product.js";

const empty = {
    name:'',
    price:'',
    description:'',
    category:'',
}
export default function ProductCreate () {
    const navigate = useNavigate();
    const [form, setForm] = useState(empty);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f)=>({...f, [name]: value}));
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const fd = new FormData();
        fd.append('Name', form.name.trim());
        fd.append('Price', String(form.price));
        fd.append('Description', form.description.trim());
        fd.append('Category', form.category.trim());

        if(file) fd.append("Image", file)
        try {
            const created = await createProduct(fd)
            navigate(`/products/${created.id}`)
        }
        catch(err){
            setError(err.message || "Could not create the product");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/products">Products</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create
                    </li>
                </ol>
            </nav>

            <h1 className="h3 mb-4">New product</h1>

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
                        Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <div className="form-text">Uploaded to AWS S3 when configured. Optional for local demo.</div>
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving…' : 'Create'}
                    </button>
                    <Link to="/products" className="btn btn-outline-secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}