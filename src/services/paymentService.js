import apiClient from "./apiClient";

export const getPayments = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(
      `/payments?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch payments",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const checkPaymentStatus = async (transactionId) => {
    try {
      const response = await apiClient.get(`/payments/status/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to create lesson",
        error.response?.data || error.message
      );
      throw error;
    }
  };

export const processPayment = async (courseId) => {
    try {
      const response = await apiClient.post("payments/initiate", {courseId});
      return response.data;
    } catch (error) {
      console.error(
        "Failed to process payment",
        error.response?.data || error.message
      );
      throw error;
    }
  };