// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Payment from './Components/Payment';
import PaymentSuccess from './Components/PaymentSuccess';
import Login from './Components/Login';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // To handle loading while checking token

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false); // After checking the token, loading is false
    }, []);

    // Show loading spinner or text while authentication check is in progress
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Router>
            <Routes>
                {/* Login Route */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                {isAuthenticated ? (
                    <>
                        {/* Products Route */}
                        <Route path="/" element={<Products addToCart={setCartItems} />} />

                        {/* Cart Route */}
                        <Route path="/cart" element={<Cart cartItems={cartItems} />} />

                        {/* Payment Route */}
                        <Route path="/cart/payment" element={<Payment cartItems={cartItems} />} />

                        {/* Payment Success Route */}
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;
