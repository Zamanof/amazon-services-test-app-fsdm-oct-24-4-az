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
        <>
            <nav>
                <ol>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        Create
                    </li>
                </ol>
            </nav>
            <h1>New Product</h1>
            {error}

            <form
                onSubmit={onSubmit}
                className="mx-auto"
                style={{maxWidth:'32rem'}}
            >
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="form-label"
                    >Name</label>
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
                    <label
                        htmlFor="description"
                        className="form-label"
                    >
                        Description
                    </label>
                    <input
                        id="description"
                        name="description"
                        className="form-control"
                        value={form.description}
                        onChange={onChange}
                        required
                        maxLength={2000}
                    />
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="price"
                        className="form-label"
                    >
                        Price
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        className="form-control"
                        value={form.price}
                        onChange={onChange}
                        required
                        step="0.01"
                        min="0.01"
                    />
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="category"
                        className="form-label"
                    >
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
                    <label
                        htmlFor="image"
                        className="form-label"
                    >
                        Image
                    </label>
                    <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e)=> setFile(e.target.files?.[0] || null)}/>
                </div>
                <div className="d-flex gap-2">
                    <button type="submt" className="btn btn-primary">
                        {loading ? 'Saving...' : 'Create'}
                    </button>
                </div>

            </form>
        </>
    )
}