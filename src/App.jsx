import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.scss'
import Layout from './layout/Layout'
import Home from "./pages/home/Home"
import Shoe from "./pages/Shoe/Shoe"
import Cart from "./pages/cart/Cart"
import SignUp from "./pages/signup/SignUp"

function App() {

  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Shoe />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
