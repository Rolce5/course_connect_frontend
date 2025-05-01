import { jwtDecode } from "jwt-decode";

// Logout function
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
};

// Check if the user is authenticated (token exists and is not expired)
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && !isTokenExpired(token); // Ensure token exists and is not expired
};

// Check if the token is expired
export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const expirationTime = decoded.exp * 1000; // Convert expiration to milliseconds
        return Date.now() > expirationTime; // Check if the current time is greater than the token's expiration time
    } catch (error) {
        return true; // Return true if decoding fails (invalid or expired token)
    }
};

// Check if the user is an admin
export const isAdmin = () => {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
};

// Check if the user is an instructor
export const isInstructor = () => {
    const role = localStorage.getItem('role');
    return role === 'INSTRUCTOR';
};

// Check if the user is a regular user
export const isUser = () => {
    const role = localStorage.getItem('role');
    return role === 'USER';
};

// Check if the user is admin and authenticated
export const adminOnly = () => {
    return isAuthenticated() && isAdmin();
};
