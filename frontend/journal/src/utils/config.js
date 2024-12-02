import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/journal",
    headers: {
        "Content-Type": "application/json",
    }
})

const cred = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('ACCESS_TOKEN');  // Get token from localStorage (or any other method)
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;  // Add token to Authorization header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;
  export {cred}