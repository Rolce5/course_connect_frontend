import apiClient from "./apiClient";

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
      const response = await apiClient.post("payment/initiate", {courseId});
      return response.data;
    } catch (error) {
      console.error(
        "Failed to process payment",
        error.response?.data || error.message
      );
      throw error;
    }
  };