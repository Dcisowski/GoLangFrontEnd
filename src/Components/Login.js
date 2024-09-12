// src/Components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const backendRedirectUrl = "redirectURL";

    const getTokenFromBackend = async () => {
        try {
            const response = await fetch(`${backendRedirectUrl}/login`, {
                method: 'GET',
                credentials: 'include',
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                const accessToken = data.access_token;
                localStorage.setItem('access_token', accessToken);
                console.log('Token stored:', accessToken);

                // Check if token is stored properly before navigating
                const storedToken = localStorage.getItem('access_token');
                console.log('Stored Token:', storedToken);

                // Perform navigation to products page
                console.log('Navigating to products page');
            } else {
                console.error('Failed to fetch token');
            }
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const handleLoginClick = () => {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            getTokenFromBackend()
                .then(() => {
                    console.log('After token fetch, attempting to navigate');
                    // window.location.href = `/`;
                })
                .catch((error) => {
                    console.error('Error fetching token:', error);
                });
        } else {
            console.log("In else")
            // window.location.href = `/`;
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <p>Click the button to log in via Google.</p>
            <button onClick={handleLoginClick}>Log In</button>
        </div>
    );
};

export default Login;
