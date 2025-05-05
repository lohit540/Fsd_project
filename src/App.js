import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/login";
import Home from "./components/Home";
import PrivateRoute from "./components/Auth/PrivateRoute";

function App() {
    const [cartItems, setCartItems] = useState([]);

    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/menu"
                    element={<Menu cartItems={cartItems} setCartItems={setCartItems} />}
                />
                <Route
                    path="/cart"
                    element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
                />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </Router>
    );
}

export default App;
        