import {Link, NavLink, Outlet} from 'react-router-dom'
export  default function Layout(){
    return (
        <div className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-dark bg-primary shadow-sm">
                <div className='container'>
                    <Link to="/products" className="navbar-brand fw-semibold">
                        ƏN UCUZ MARKET
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#nav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="nav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products/create">Add Product</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="flex-grow-1 py-4">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <footer className="border-top text-muted text-center small bg-light">
                AWS S3, RDS and Deploy demo {new Date().getFullYear()}
            </footer>
        </div>
    )
}