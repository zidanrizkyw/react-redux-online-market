import CartPage from "./pages/CartPage"
import HomePage from "./pages/HomePage"
import { Routes, Route } from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage"
import Header from "./components/Header"
import Footer from "./components/Footer"



const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="*" Component={NotFoundPage}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
