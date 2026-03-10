import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>

        <Footer />

      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
