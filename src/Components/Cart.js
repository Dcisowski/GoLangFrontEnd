// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const backendUrl = "http://localhost:8080";

    useEffect(() => {
        // Get the cart ID from localStorage
        const cartId = localStorage.getItem('cart_id');

        // Fetch the cart and its total from the backend
        if (cartId) {
            fetch(`${backendUrl}/api/carts/${cartId}`)
                .then(response => response.json())
                .then(data => {
                    setCart(data.cart);
                    setTotal(data.total);
                })
                .catch(error => console.error('Error fetching cart:', error));
        }
    }, []);

    if (!cart) {
        return <p>No items in the cart.</p>;
    }

    const clearCart = () => {
        fetch(`${backendUrl}/api/carts/${localStorage.getItem('cart_id')}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: {}, // Send cart_id if exists
        })
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('cart_id');
                }
                console.log('Cart Deleted:', localStorage.getItem('cart_id'));
            })
            .catch(error => console.error('Error in request:', error));
        window.location.reload()
    };

    const goToPayment = () => {
        navigate(`payment`, { replace: true }); // Programmatically navigate to the Cart page
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cart.Products.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
            <h3>Total: ${total}</h3>
            <button onClick={goToPayment}>Go to Payment</button> {/* Button to navigate to Cart */}
            <button onClick={clearCart}>Clear Cart</button> {}
        </div>
    );
}

export default Cart;
