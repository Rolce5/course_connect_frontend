import apiClient from "./apiClient";

export const createCourseModule = async (formData) => {
  try {
    const response = await apiClient.post("/modules", formData);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to create Module",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCourseModules = async (courseId) => {
  try {
    const response = await apiClient.get(`modules/course/${courseId}/modules`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch course modules",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getHighestModuleOrder = async (courseId) => {
  try {
    const response = await apiClient.get(`/modules/${courseId}/highest-order`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch course modules",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getModuleById = async (moduleId) => {
  try {
    const response = await apiClient.get(`/modules/${moduleId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch course modules",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateModule = async (moduleId, formData) => {
  try {
    const response = await apiClient.patch(`/modules/${moduleId}`, formData);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to create Module",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateModuleOrder = async (courseId, moduleOrderUpdates) => {
  try {
    const response = await apiClient.put(
      `/modules/courses/${courseId}/modules/order`,
      { updates: moduleOrderUpdates }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating module order:", error);
    throw error;
  }
};

export const deleteModule = async (moduleId) => {
  try {
    const response = await apiClient.delete(`modules/${moduleId}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting module:", error);
    throw error;
  }
};
