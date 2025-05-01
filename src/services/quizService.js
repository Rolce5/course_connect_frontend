import apiClient from "./apiClient";

export const createQuiz = async (quizData) => {
  try {
    const response = await apiClient.post('/quizzes', quizData);
    return response.data;
  } catch (error) {
    // Convert to standardized error format
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Network error occurred'
    );
  }
};

export const getQuizByLessonId = async (lessonId) => {
  try {
    const response = await apiClient.get(`/quizzes/${lessonId}`);
    return response.data;
  } catch (error) {
    // Convert to standardized error format
    throw new Error(
      error.response?.data?.message || error.message || "Network error occurred"
    );
  }
};

export const updateQuiz = async (quizData) => {
  try {
    const response = await apiClient.put(`/quizzes/${quizData.id}`, quizData);
    return response.data;
  } catch (error) {
    // Convert to standardized error format
    throw new Error(
      error.response?.data?.message || error.message || "Network error occurred"
    );
  }
};

export const createQuestion = async (quizId, questionData) => {
  try {
    const response = await apiClient.post(
      `/quizzes/${quizId}/questions`,
      questionData
    );
    return response.data;
  } catch (error) {
    // Convert to standardized error format
    throw new Error(
      error.response?.data?.message || error.message || "Network error occurred"
    );
  }
};

export const updateQuestion = async (questionId, questionData) => {
  try {
    const response = await apiClient.patch(
      `/quizzes/questions/${questionId}/update`,
      questionData
    );
    return response.data;
  } catch (error) {
    // Convert to standardized error format
    throw new Error(
      error.response?.data?.message || error.message || "Network error occurred"
    );
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await apiClient.delete(
      `/quizzes/questions/${questionId}/delete`);
    return response.data;
  } catch (error) {
    // Convert to standardized error format
    throw new Error(
      error.response?.data?.message || error.message || "Network error occurred"
    );
  }
};

export const submitQuizAnswers = async ({ quizId, answers }) => {
  try {
    const response = await apiClient.post(`/quizzes/${quizId}/submit`, {
      answers, 
    });
          console.log(answers);

    return response.data;
  } catch (error) {
    console.error(
      "Quiz submission failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getQuizAttempts = async (quizId) => {
  try {
    const response = await apiClient.get(`/quizzes/${quizId}/attempts`);
    return response.data || [];
  } catch (error) {
    console.error(
      "Failed to fetch quiz attempts",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getNewQuizVersion = async (quizId) => {
  try {
    const response = await apiClient.get(`/quizzes/${quizId}/new-version`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to get new quiz version",
      error.response?.data || error.message
    );
    throw error;
  }
};
