import apiClient from "./apiClient";

export const getAllCourses = async () => {
  try {
    const response = await apiClient.get("/courses");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch courses",
      error.response?.data || error.message
    );
  }
};

export const getUserCourses = async () => {
  try {
    const response = await apiClient.get("/courses");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch courses",
      error.response?.data || error.message
    );
  }
};

export const getRecentCourses = async () => {
  try {
    const response = await apiClient.get("/courses/recent");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch courses",
      error.response?.data || error.message
    );
  }
};

export const createCourse = async (formData) => {
  try {
    const response = await apiClient.post("/courses", formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Content-type for file upload
    });
    return response.data; // Return the created course data
  } catch (error) {
    console.error(
      "Failed to save course:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCourseById = async (courseId) => {
  try {
    const response = await apiClient.get(`courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to get course",
      error.response?.data || error.message
    );
  }
};

export const getCourseWithLessons = async (courseId) => {
  try {
    const response = await apiClient.get(`courses/${courseId}/with-lessons`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to get course",
      error.response?.data || error.message
    );
  }
};

export const updateCourse = async (courseId, formData) => {
    try {
      const response = await apiClient.patch(`/courses/${courseId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Failed to update course:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  

export const deleteCourse = async (courseId) => {
  try {
    const response = await apiClient.delete(`courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete course", error.response?.data || error.message);
    throw error;
  }
};


export const getRecommendedCourses = async () => {
  try {
    const response = await apiClient.get("/courses");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch courses",
      error.response?.data || error.message
    );
  }
};

