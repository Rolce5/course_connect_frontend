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

export const getStudents = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(
      `/users/students?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch students",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getInstructors = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await apiClient.get(
      `/users/instructors?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
    );
    return {
      data: response.data.instructors,
      pagination: response.pagination, // Ensure your backend returns pagination info
    };
  } catch (error) {
    console.error("Failed to fetch instructors", error.response?.data || error.message);
    throw error;
  }
};


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