import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Layout from "./components/Layout.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductCreate from "./pages/ProductCreate.jsx";
import ProductEdit from "./pages/ProductEdit.jsx";

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Navigate to="/products"  replace/>}/>
                <Route path='products' element={<ProductList />}/>
                <Route path='products/create' element={<ProductCreate />}/>
                <Route path='products/edit/:id' element={<ProductEdit />}/>
                <Route path='products/:id' element={<ProductDetails />}/>
            </Route>
            <Route path='*' element={<Navigate to="/products" replace/> }/>
        </Routes>
    )
}


