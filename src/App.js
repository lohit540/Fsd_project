import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Home from "./components/Home";

function App() {
    const [cartItems, setCartItems] = useState([]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </Router>
    );
}

export default App;
