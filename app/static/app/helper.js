import jwt_decode from 'jwt-decode';
// Helper function to check if the token is expired
function isTokenExpired(token) {
    try {
        const decodedToken = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return currentTime >= decodedToken.exp;
        } catch (error) {
            console.error("Error decoding JWT:", error);
            return true; // Treat as expired if there's an error decoding
        }
    }

// Function to refresh the access token using the refresh token
function refreshToken() {
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    if (!refreshToken) {
        console.error("No refresh token available.");
        return Promise.reject("No refresh token available.");
    }

    return fetch("/refresh", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to refresh access token.");
        }
        return response.json();
    })
    .then(result => {
        localStorage.setItem("ACCESS_TOKEN", result.access);
        return result.access;
    })
    .catch(error => {
        console.error("Error refreshing token:", error);
    });
}

// Function to perform a full login and store tokens
function performLogin() {
    fetch("/login", {
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Login failed.");
        }
        return response.json();
    })
    .then(result => {
        localStorage.setItem("ACCESS_TOKEN", result.access);
        localStorage.setItem("REFRESH_TOKEN", result.refresh); // Assuming refresh token is provided
        })
        .catch(error => {
            console.error("Error during login:", error);
        });
    }


    export {isTokenExpired, refreshToken, performLogin}