import { isTokenExpired,refreshToken, performLogin } from "./helper";

document.addEventListener("DOMContentLoaded", ()=>{
    
})

function login() {
    let accessToken = localStorage.getItem("ACCESS_TOKEN");
    
        if (!accessToken || isTokenExpired(accessToken)) {
            // If there's no access token or it has expired, get a new one
            if (localStorage.getItem("REFRESH_TOKEN")) {
                // Try to refresh the access token
                refreshToken().then(newAccessToken => {
                    if (!newAccessToken) {
                        // If refresh failed, perform a full login
                        performLogin();
                    }
                });
            } else {
                // If no refresh token, perform a full login
                performLogin();
            }
        } else {
            // Access token exists and is valid
            console.log("Access token is valid.");
        }
    }