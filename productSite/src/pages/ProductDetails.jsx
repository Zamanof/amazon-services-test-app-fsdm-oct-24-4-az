import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../api/product.js";
import {PLACEHOLDER_IMAGE} from "../config.js";

function formatDate(iso){
    if(!iso) return '-';
    try {
        return new Date(iso).toLocaleDateString();
    }
    catch{
        return iso;
    }
}
export default function ProductDetails () {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const p = await getProductById(id);
                if(!cancelled) setProduct(p);
            }
            catch (e) {
                setError(e.message || "Not found")
            }
            finally {
                if (!cancelled) setLoading(false);
            }
        })()
        return () => {
            cancelled = true;
        }
    }, [id])

    if(loading) return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if(error || !product) return (
        <div>
            <div className="alert alert-warning">
                {error || 'Product not found'}
            </div>
            <Link
                to="/products"
                className="btn btn-outline-primary"
            >
                Back to Products
            </Link>
        </div>
    )

    return (
        <div>
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/products">Products</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {product.name}
                    </li>
                </ol>
            </nav>

            <div className="row g-4">
                <div className="col-md-5">
                    <div className="ratio ratio-1x1 bg-light rounded shadow-sm overflow-hidden">
                        <img
                            src={product.imageUrl || PLACEHOLDER_IMAGE}
                            alt=""
                            className="object-fit-contain"
                            style={{ objectFit: 'contain' }}
                            onError={(e) => {
                                e.currentTarget.src = PLACEHOLDER_IMAGE
                            }}
                        />
                    </div>
                </div>
                <div className="col-md-7">
                    <h1 className="h2 mb-2">{product.name}</h1>
                    <p className="text-muted mb-3">{product.category || 'No category'}</p>
                    <p className="display-6 text-primary mb-4">${Number(product.price).toFixed(2)}</p>
                    <h2 className="h5">Description</h2>
                    <p className="mb-4">{product.description || '—'}</p>
                    <p className="small text-muted mb-4">Created: {formatDate(product.createdAt)}</p>

                    <p className="text-muted">
                        <strong>Discount: </strong>{" "}
                        {product.isDiscountActive ? (
                            <span className="badge text-bg-success">
                                Active
                            </span>
                        ):(
                            <span className="badge text-bg-secondary">
                                Inactive
                            </span>
                        )}
                    </p>

                    <div className="d-flex flex-wrap gap-2">
                        <Link to={`/products/edit/${product.id}`} className="btn btn-primary">
                            Edit
                        </Link>
                        <Link to="/products" className="btn btn-outline-secondary">
                            Back to list
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}