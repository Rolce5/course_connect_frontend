// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// const apiClient = axios.create({
//   baseURL: "http://localhost:5000/api", // Replace with your backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add an interceptor to dynamically set the Authorization header
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // Make sure you are using 'access_token' key
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add a response interceptor to handle expired tokens
// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // If the token is expired or invalid, clear it from local storage and redirect to login
//       localStorage.removeItem("token"); // Clear expired token from localStorage
//       window.location.href = "/login"; // Redirect to the login page
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to dynamically set the Authorization header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Use 'access_token' key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle expired tokens
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // If the token is expired or invalid, try refreshing the access token using the refresh token
      const refreshToken = getCookie("refresh_token"); // Assume it's stored as an HTTP-only cookie
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/refresh",
            { refresh_token: refreshToken }
          );
          const { token } = response.data;

          // Store the new access token
          localStorage.setItem("token", token);

          // Retry the original request with the new access token
          error.config.headers["Authorization"] = `Bearer ${token}`;
          return axios(error.config);
        } catch (refreshError) {
          // If refresh token is invalid, redirect to login
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redirect to login page
        }
      }
    }
    return Promise.reject(error);
  }
);

// Function to retrieve cookies (simplified)
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default apiClient;
