import CartPage from "./pages/CartPage"
import HomePage from "./pages/HomePage"
import { Routes, Route } from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ProductDetailPage from "./pages/ProductDetailPage"



const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/product/:productId" Component={ProductDetailPage}/>
        <Route path="*" Component={NotFoundPage}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
