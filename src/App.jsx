import CartPage from "./pages/CartPage"
import HomePage from "./pages/HomePage"
import { Routes, Route, useLocation } from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import ProductManagementPage from "./pages/admin/ProductManagementPage"
import CreateProductPage from "./pages/admin/CreateProductPage"
import EditProductPage from "./pages/admin/EditProductPage"



const App = () => {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <>
      {
        location.pathname.startsWith("/admin") ? null : <Header />
      }
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/product/:productId" Component={ProductDetailPage} />
        <Route path="/admin">
          <Route path="products" Component={ProductManagementPage} />
          <Route path="products/create" Component={CreateProductPage}/>
          <Route path="products/edit/:productId" Component={EditProductPage}/>
        </Route>

        <Route path="*" Component={NotFoundPage} />
      </Routes>

      {
        location.pathname.startsWith("/admin") ? null : <Footer />
      }
    </>
  )
}

export default App
