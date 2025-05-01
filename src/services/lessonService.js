import apiClient from "./apiClient";

export const getModuleLessons = async (moduleId) => {
    try {
      const response = await apiClient.get(`/lessons/${moduleId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to fetch lessons",
        error.response?.data || error.message
      );
      throw error;
    }
  };

export const getHighestLessonOrder = async (moduleId) => {
    try {
      const response = await apiClient.get(`/lessons/${moduleId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to fetch lessons",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  
  export const createLesson = async (lessonData) => {
    try {
      const response = await apiClient.post(`/lessons`, lessonData, {
      headers: { "Content-Type": "multipart/form-data" }, // Content-type for file upload
    }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Failed to create lesson",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  
  export const updateLesson = async (lessonId, lessonData) => {
    try {
      const response = await apiClient.put(`/lessons/${lessonId}`, lessonData);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to update lesson",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  
  export const deleteLesson = async (lessonId) => {
    try {
      const response = await apiClient.delete(`/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to delete lesson",
        error.response?.data || error.message
      );
      throw error;
    }
  };