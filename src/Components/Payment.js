// src/components/Payment.js
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [total, setTotal] = useState(0);
    const cartId = localStorage.getItem('cart_id')
    const navigate = useNavigate();  // For redirection

    useEffect(() => {

        // Fetch the cart and its total from the backend
        if (cartId) {
            fetch(`http://localhost:8080/carts/${cartId}`)
                .then(response => response.json())
                .then(data => {
                    setTotal(data.total);
                })
                .catch(error => console.error('Error fetching cart:', error));
        }
    }, []);

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
                console.log('Cart Deleted:', localStorage.getItem('cart_id'));
            })
            .catch(error => console.error('Error in request:', error));
    };

    const handlePayment = () => {
        const paymentData = {
            cart_id: parseInt(cartId, 10), // Example Cart ID, you can pass dynamic Cart ID
            amount: total,
            payment_method: paymentMethod,
        };

        fetch('http://localhost:8080/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Payment successful:', data);
                clearCart(); // Clear the cart after payment
                navigate('/payment-success');
            })
            .catch(error => console.error('Error processing payment:', error));
    };

    return (
        <div>
            <h2>Payment</h2>
            <p>Total Amount: ${total}</p>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
            </select>
            <button onClick={handlePayment}>Submit Payment</button>
        </div>
    );
}

export default Payment;
