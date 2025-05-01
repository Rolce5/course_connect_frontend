import apiClient from './apiClient';


export const registerUser = async (userData) => {
  try {
    // First, register the user
    const registerResponse = await apiClient.post('/auth/signup', userData);
    const { email, password } = userData; // Get credentials from userData
    
    // After registration, log the user in automatically
    const loginResponse = await apiClient.post('/auth/signin', { email, password });
    
    // Return the login response (which should include the token)
    return loginResponse.data; // This contains the token and role
  } catch (error) {
    console.error('Registration or Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post(
      "/auth/signin",
      credentials,
      { withCredentials: true } 
    );
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

// Add logout function
export const logoutUser = async () => {
  try {
    // Clear client-side token
    localStorage.removeItem('token');
    
    // Call backend logout if needed
    await apiClient.post(
      '/auth/logout', 
      {}, 
      { withCredentials: true }
    );
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
