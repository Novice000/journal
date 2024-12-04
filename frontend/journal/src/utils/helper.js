import { jwtDecode } from "jwt-decode"
import axiosInstance, { cred } from "./config";

// Helper function to check if the token is expired
function isAccessTokenExpired() {
    const token = localStorage.getItem("ACCESS_TOKEN")
    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken || !decodedToken.exp) {
        console.error("Invalid token format.");
        return true; // Invalid token, treat as expired
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime >= decodedToken.exp; // Token is expired or expiring now
    } catch (error) {
      console.error("Error decoding JWT:", error.message);
      return true; // Treat as expired on error
    }
  }

// Function to check if refresh token is expired
function isRefreshTokenExpired() {
    const token = localStorage.getItem("REFRESH_TOKEN")
    if (!token) {
      return true; // If there's no token, consider it expired
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // current time in seconds
  
      // Check if the token is expired by comparing the exp field with current time
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // If decoding fails, consider token expired
    }
  }

async function refreshToken() {
    const refreshToken = localStorage.getItem("REFRESH_TOKEN"); // Get refresh token from local storage
    if (!refreshToken) {
      console.error("No refresh token available.");
      return Promise.reject("No refresh token available.");
    }
  
    try {
        const response = await cred.post("/refresh/", {refresh: refreshToken})
        if (response.statusText !== "OK") {
            throw new Error("Failed to refresh access token.");
        }
        const result =  response.data;
        localStorage.setItem("ACCESS_TOKEN", result.access); // Store the new access token
        return result.access;
    } catch (error) {
        console.error("Error refreshing token:", error);
    }
}

async function getUser(){
  const id = jwtDecode(localStorage.getItem("ACCESS_TOKEN")).user_id
  try{
    const response = await axiosInstance.get(`/user/${id}`)
    if(response.status !== 201 && response.status !== 200){
      throw new Error("failed to get user")
    }
    const result = await response
    return result
  }catch(e){
    alert(e)
  }
}


export {isAccessTokenExpired, refreshToken, isRefreshTokenExpired, getUser}