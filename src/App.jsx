import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.scss'
import Layout from './layout/Layout'
import Home from "./pages/home/Home"
import Shoe from "./pages/Shoe/Shoe"
import Cart from "./pages/cart/Cart"
import SignUp from "./pages/signup/SignUp"
import SignIn from "./pages/signin/SignIn"
import Profile from "./pages/profile/Profile"
import Checkout from "./pages/checkout/Checkout"
import Confirm from "./pages/confirm/Confirm"
import { CartProvider } from './context/CartContext';
import ChatBot from "./components/chat-bot/ChatBot"

function App() {

  return (
    <BrowserRouter>
    <ChatBot />
      <CartProvider>
        <Layout >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:cat" element={<Home />} />
            <Route path="/product/:id" element={<Shoe />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirm" element={<Confirm />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
