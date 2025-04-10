import apiClient from "./apiClient";

export const enrollInCourse = async (courseId) => {
  try {
    // Convert to number explicitly and validate
    const numericId = Number(courseId);
    if (isNaN(numericId)) {
      throw new Error("Invalid course ID format");
    }

    const response = await apiClient.post("courses/enrollment", {
      courseId: numericId, // Send as numeric value
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to enroll to course",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserEnrollments = async () => {
  try {
    const response = await apiClient.get("courses/enrollment/all");
    return response.data || [];
  } catch (error) {
    console.error(
      "Failed to fetch user enrollments",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getRecentEnrollments = async () => {
  try {
    const response = await apiClient.get("courses/enrollment/recent");
    return response.data || [];
  } catch (error) {
    console.error(
      "Failed to fetch recent enrollments",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateEnrollmentProgress = async () => {
  try {
    const response = await apiClient.post("courses/enrollment/recent");
    return response.data || [];
  } catch (error) {
    console.error(
      "Failed to fetch recent enrollments",
      error.response?.data || error.message
    );
    throw error;
  }
};
