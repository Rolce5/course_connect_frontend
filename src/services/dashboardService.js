import apiClient from "./apiClient";

export const getDashboard = async () => {
  try {
    const response = await apiClient.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetching dashboard data",
      error.response?.data || error.message
    );
  }
};
