// src/components/PaymentSuccess.js
import React from 'react';
import {useNavigate} from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();
    const returnToSourcePage = () => {
        navigate(`/`)
    }
    return (
        <div>
            <h2>Payment Successful!</h2>
            <p>Your payment has been processed successfully.</p>
            <button onClick={returnToSourcePage}>Navigate to Home Page</button>
        </div>
    );
}

export default PaymentSuccess;
