import {useEffect, useState} from "react";
import {deleteProduct, getAllProducts} from "../api/product.js";
import {Link} from "react-router-dom";
import {PLACEHOLDER_IMAGE} from "../config.js";

export default function ProductList () {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadProducts = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getAllProducts()
            setProducts(data)
        }
        catch(e) {
            setError(e.message || "Failed to load products.")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const handleDelete = async (id, name) => {
        if(!window.confirm(`Delete ${name}?`)) return;
        try {
            await deleteProduct(id)
            setProducts((prev)=>
                prev.filter((p)=> p.id !== id))
        }
        catch(e) {
            setError(e.message || "Failed to delete product.")
        }
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
       <>
           <div className="d-flex flex-wrap align-items-center justify-content-between
           gap-2 mb-4">
               <h1 className="h3 mb-0">Products</h1>
               <Link
                   to='/products/create'
                   className="btn btn-primary">
                   New Product
               </Link>
           </div>

           {error && (
               <div className="alert alert-danger" role="alert">
                   {error}
               </div>
           )}
           {products.length === 0?(
               <p className="text-muted">Not products yet. Create one to get started</p>
           ):(<div className="row g-4">
               {products.map((product) => (
                   <div key={product.id} className="col-sm-6 col-lg-4">
                       <div className="card h-100 shadow">
                           <div className="ratio ratio-4x3 bg-light">
                                <Link to={`/products/${product.id}`}>
                                    <img
                                        alt={product.name}
                                        className="w-100 h-100"
                                        src={product.imageUrl || PLACEHOLDER_IMAGE}
                                    style={{objectFit: "cover"}}
                                    onError={(e)=>{
                                        e.currentTarget.src = PLACEHOLDER_IMAGE
                                    } }/>
                                </Link>
                           </div>
                           <div className="card-body d-flex flex-column">
                               <h2 className="card-title h5">
                                   <Link to={`/products/${product.id}`}
                                   className="text-decoration-none text-body">
                                       {product.name}
                                   </Link>
                               </h2>
                           </div>
                           <p className="text-muted small mb-2">
                               {product.category || '-'}
                           </p>
                           <p className="fw-semibold text-primary mb-3">
                               ${Number(product.price).toFixed(2)}
                           </p>
                           <div className="mt-auto d-flex gap-2">
                               <Link to={`/products/edit/${product.id}`}
                               className="btn btn-outline-secondary btn-sm">
                                   Edit
                               </Link>
                               <button
                                   type="button"
                                   className="btn btn-outline-danger btn-sm"
                                   onClick={() => handleDelete(product.id, product.name)}>
                               Delete
                           </button>
                           </div>

                       </div>
                   </div>
               ))}
           </div>)}
       </>
    )
}