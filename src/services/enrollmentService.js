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

export const getUserEnrollmentForCourse = async (courseId) => {
  try {
    const response = await apiClient.get(`courses/enrollment/${courseId}`);
    return response.data || null;
  } catch (error) {
    console.error(
      "Failed to fetch course enrollment",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllUserEnrollments = async () => {
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

// export const updateEnrollmentProgress = async ({
//   enrollmentId,
//   lastLessonId,
//   progress,
//   courseId,
// }) => {
//   try {
//     const response = await apiClient.patch(
//       `courses/enrollment/${courseId}/progress`,
//       {
//         lastLessonId,
//         markComplete: progress === 100,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Failed to update enrollment progress",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

export const updateEnrollmentProgress = async ({ courseId, lastLessonId }) => {
  try {
    const response = await apiClient.patch(
      `courses/enrollment/${courseId}/progress`,
      { lastLessonId } // No more markComplete flag
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update enrollment progress",
      error.response?.data || error.message
    );
    throw error;
  }
};