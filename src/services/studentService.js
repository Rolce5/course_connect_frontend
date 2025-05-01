import apiClient from "./apiClient";

export const getStudents = async () => {
  try {
    const response = await apiClient.get("users/students");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching student:",
      error.response?.data || error.message
    );
    throw error;
  }
};
