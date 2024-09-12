// src/components/Products.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Products({ addToCart }) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize navigate
    const backendUrl = "http://localhost:8080";

    useEffect(() => {
        fetch(`${backendUrl}/api/products`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.text()) // Fetch as text to log the full response
            .then(data => {
                console.log('Response text:', data); // Log full response
                const jsonData = JSON.parse(data); // Then parse if it's JSON
                setProducts(jsonData);
            })
            .catch(error => console.error('Error getting products:', error));
    }, []);

    const handleAddToCart = (productId) => {
        // Get the cart ID from localStorage (if it exists)
        let cartId = localStorage.getItem('cart_id');
        fetch(`${backendUrl}/api/carts/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId, cart_id: cartId }), // Send cart_id if exists
        })
            .then(response => response.json())
            .then(data => {
                if (data.cart_id) {
                    // If a new cart was created, store the cart ID in localStorage
                    localStorage.setItem('cart_id', data.cart_id);
                }
                console.log('Added to cart:', data);
            })
            .catch(error => console.error('Error adding to cart:', error));
    };

    const goToCart = () => {
        navigate(`/cart`); // Programmatically navigate to the Cart page
    };

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
    };

    const logOut = () => {
        fetch(`${backendUrl}/api/logout/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(() => {
            // Clear the local storage or any session-related data
            localStorage.removeItem('access_token');
            console.log(localStorage)
            // Redirect user to login
            window.location.href = `/login`;
        }).catch(error => console.error('Error in request:', error));
    };

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.ID}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleAddToCart(product.ID)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <button onClick={goToCart}>Go to Cart</button> {/* Button to navigate to Cart */}
            <button onClick={clearCart}>Clear The Cart</button> {/* Button to navigate to Cart */}
            <button onClick={logOut}>Log Out</button> {/* Button to navigate to Cart */}
        </div>
    );
}

export default Products;
