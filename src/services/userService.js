import apiClient from "./apiClient";

export const getAllUsers = async () => {
  try{
    const response = await apiClient.get("/users");
    return response.data;

  } catch(error) {
    console.error(
      "Failed to fetch users",
      error.response?.data || error.message
    );
  }
}

export const getProfile = async () => {
  try{
    const response = await apiClient.get("/users/profile");
    return response.data;

  } catch(error) {
    console.error(
      "Failed to fetch profile",
      error.response?.data || error.message
    );
  }
}