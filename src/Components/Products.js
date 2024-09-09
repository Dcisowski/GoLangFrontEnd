// src/components/Products.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Products({ addToCart }) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        fetch('http://localhost:8080/products')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched products:', data)
                setProducts(data)
            });
    }, []);

    const handleAddToCart = (productId) => {
        // Get the cart ID from localStorage (if it exists)
        let cartId = localStorage.getItem('cart_id');
        fetch(`http://localhost:8080/carts/add`, {
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
        navigate('/cart'); // Programmatically navigate to the Cart page
    };

    const clearCart = () => {
        fetch(`http://localhost:8080/carts/${localStorage.getItem('cart_id')}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: {}, // Send cart_id if exists
        })
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('cart_id');
                }
                console.log('Cart Deelted:', localStorage.getItem('cart_id'));
            })
            .catch(error => console.error('Error in request:', error));
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
        </div>
    );
}

export default Products;
