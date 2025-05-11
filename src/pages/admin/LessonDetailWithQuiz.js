import { useState, useEffect } from "react";
import {
  FiClock,
  FiPlay,
  FiEdit,
  FiTrash2,
  FiChevronRight,
  FiPlus,
  FiCheck,
  FiX,
  FiFileText,
  FiAlertCircle,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  createQuiz,
  getQuizByLessonId,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../services/quizService";
import ConfirmModal from "../../components/ConfirmModal";

export default function LessonDetailWithQuiz({ lessonId }) {
  const [activeTab, setActiveTab] = useState("lesson");
  const { state } = useLocation();
  const lesson = state?.lesson;

  const [quiz, setQuiz] = useState(null);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [quizFormData, setQuizFormData] = useState({
    title: "",
    description: "",
    lessonId: lesson.id, // Add this
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizByLessonId(lesson.id);
        if (data) {
          setQuiz(data);
        }
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    };

    fetchQuiz();
  }, [lesson.id]); // Re-run when lesson changes

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const reponse = await deleteQuestion(id);
      setQuiz((prev) => ({
        ...prev,
        questions: prev.questions.filter((q) => q.id !== id),
      }));
      setQuestionToDelete(null);
      (<toast className="success"></toast>)("Course deleted succusfully.");
    } catch (error) {
      console.error("Failed to delete course:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateQuiz = async () => {
    setIsLoading(true);
    setError(null);

    // 1. Save current state in case we need to revert
    const previousQuizState = quiz;

    try {
      // 2. Optimistically update UI first
      setQuiz({
        ...quizFormData,
        questions: [],
        id: String(`temp-${Date.now()}`), // Temporary ID
      });

      setIsCreatingQuiz(false);

      // 3. Actually save to backend
      const createdQuiz = await createQuiz(quizFormData);

      // 4. Replace optimistic update with real data
      setQuiz({
        ...createdQuiz,
        questions: [],
      });
    } catch (err) {
      // 5. Revert if API call fails
      setQuiz(previousQuizState);
      setError(err.response?.data?.message || "Failed to save quiz");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSaveQuestion = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepare payload in consistent backend format
      const payload = {
        question: currentQuestion.question_text,
        hint: currentQuestion.hint,
        options: currentQuestion.options.map((opt) => ({
          optionText: opt.optionText || opt.option_text || "", // Handle both cases
          isCorrect: opt.isCorrect || opt.is_correct || false,
        })),
      };

      let savedQuestion;

      // Add validation
      if (!currentQuestion.question_text.trim()) {
        setError("Question field cannot be empty");
        return;
      }

      // Validate all option texts
      const hasEmptyOption = currentQuestion.options.some(
        (opt) => !opt.optionText?.trim() && !opt.option_text?.trim()
      );
      if (hasEmptyOption) {
        setError("All options must have text");
        return;
      }

      // Check that at least one option is marked as correct
      const hasCorrectAnswer = currentQuestion.options.some(
        (opt) => opt.is_correct || opt.isCorrect
      );
      if (!hasCorrectAnswer) {
        setError("Please mark at least one option as correct");
        return;
      }

      if (currentQuestion.id) {
        // Update existing question
        savedQuestion = await updateQuestion(currentQuestion.id, payload);
      } else {
        // Add new question
        savedQuestion = await createQuestion(quiz.id, payload); // Modified to send complete payload
      }

      // Update state
      setQuiz((prev) => {
        if (currentQuestion.id) {
          return {
            ...prev,
            questions: prev.questions.map((q) =>
              q.id === currentQuestion.id ? savedQuestion : q
            ),
          };
        } else {
          return {
            ...prev,
            questions: [...prev.questions, savedQuestion],
          };
        }
      });

      setIsEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to save question"
      );
      console.error("Error saving question:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                <FiEdit className="mr-2" />
                Edit Lesson
              </button>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex space-x-8 mt-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("lesson")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === "lesson" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              <FiPlay className="mr-2" />
              Lesson Content
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === "quiz" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              <FiCheck className="mr-2" />
              Lesson Quiz
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeTab === "lesson" ? (
            <motion.div
              key="lesson"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={tabVariants}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Video Player */}
              <div className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-2xl overflow-hidden shadow-xl aspect-video relative">
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <FiPlay className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                )}
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  onLoadedData={() => setVideoLoaded(true)}
                >
                  <source src={lesson.videoUrl} type="video/mp4" />
                </video>
              </div>

              {/* Lesson Content */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      <div>{lesson.title} </div>
                    </h2>
                    <div
                      className="prose prose-indigo max-w-none"
                      dangerouslySetInnerHTML={{ __html: lesson.description }}
                    />
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Detailed Content
                    </h2>
                    <div
                      className="prose prose-indigo max-w-none"
                      dangerouslySetInnerHTML={{ __html: lesson.content }}
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Lesson Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <FiClock className="mr-2 text-indigo-500" />
                        <span>{lesson.duration} minutes</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiCheck className="mr-2 text-indigo-500" />
                        <span>Beginner level</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Resources
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-indigo-600 hover:text-indigo-800">
                        <FiChevronRight className="mr-2" />
                        <a href="#" className="text-sm">
                          Download Slides
                        </a>
                      </li>
                      <li className="flex items-center text-indigo-600 hover:text-indigo-800">
                        <FiChevronRight className="mr-2" />
                        <a href="#" className="text-sm">
                          Example Code
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={tabVariants}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {!quiz ? (
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3 p-3 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-100"
                    >
                      <FiAlertCircle className="flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}
                  <div className="max-w-md mx-auto py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      No Quiz Created Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Create a quiz to start adding questions for this lesson.
                    </p>
                    <button
                      onClick={() => setIsCreatingQuiz(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
                    >
                      <FiPlus className="mr-2" />
                      Create Quiz
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Quiz Header */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                          {quiz.title}
                        </h2>
                        <p className="text-gray-600">{quiz.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setQuizFormData({
                              title: quiz.title,
                              description: quiz.description,
                            });
                            setIsCreatingQuiz(true);
                          }}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center text-sm whitespace-nowrap"
                        >
                          <FiEdit className="mr-2" />
                          Edit Quiz
                        </button>
                        <button
                          onClick={() => {
                            setCurrentQuestion({
                              id: null,
                              question: "",
                              hint: "",
                              options: [
                                { id: 1, optionText: "", isCorrect: false },
                                { id: 2, optionText: "", isCorrect: false },
                              ],
                            });
                            setIsEditing(true);
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center text-sm whitespace-nowrap"
                        >
                          <FiPlus className="mr-2" />
                          Add Question
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Questions List */}
                  {quiz.questions?.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                      <div className="max-w-md mx-auto py-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                          No Questions Added Yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Add your first question to this quiz.
                        </p>
                        <button
                          onClick={() => {
                            setCurrentQuestion({
                              id: null,
                              question: "",
                              hint: "",
                              options: [
                                { id: 1, optionText: "", isCorrect: false },
                                { id: 2, optionText: "", isCorrect: false },
                              ],
                            });
                            setIsEditing(true);
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto text-sm"
                        >
                          <FiPlus className="mr-2" />
                          Add First Question
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {quiz.questions?.map((question) => (
                        <motion.div
                          key={question.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                          <div className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-800">
                                  {question.question_text}
                                </h3>
                                {question.hint && (
                                  <p className="font-light text-gray-800  text-xs italic">
                                    Hint: {question.hint}
                                  </p>
                                )}
                                <ul className="mt-3 space-y-2">
                                  {question.options.map((option) => (
                                    <li
                                      key={option.id}
                                      className={`flex items-center text-sm p-2 rounded ${option.is_correct ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}`}
                                    >
                                      {option.is_correct ? (
                                        <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                          <FiCheck className="text-green-600 text-xs" />
                                        </span>
                                      ) : (
                                        <span className="w-5 h-5 bg-gray-200 rounded-full mr-2"></span>
                                      )}
                                      {option.option_text}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setCurrentQuestion({
                                      ...question,
                                      question: question.question_text,
                                      hint: question.hint,
                                      options: question.options.map((opt) => ({
                                        id: opt.id,
                                        optionText: opt.option_text,
                                        isCorrect: opt.is_correct,
                                      })),
                                    });
                                    setIsEditing(true);
                                  }}
                                  className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                >
                                  <FiEdit />
                                </button>
                                <button
                                  onClick={() => setQuestionToDelete(question)}
                                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Question Editor Modal */}
      {/* <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentQuestion.id ? "Edit Question" : "New Question"}
                  </h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 p-3 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-100"
                  >
                    <FiAlertCircle className="flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question
                    </label>
                    <textarea
                      value={currentQuestion.question_text}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          question_text: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter the question text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hint
                    </label>
                    <textarea
                      value={currentQuestion.hint}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          hint: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter the hint text"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Options
                      </label>
                      <button
                        onClick={() =>
                          setCurrentQuestion((prev) => ({
                            ...prev,
                            options: [
                              ...prev.options,
                              {
                                id: Date.now(),
                                optionText: "",
                                isCorrect: false,
                              },
                            ],
                          }))
                        }
                        className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                      >
                        <FiPlus className="mr-1" /> Add Option
                      </button>
                    </div>

                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-start space-x-3"
                        >
                          <div className="flex-1">
                            <input
                              type="text"
                              value={option.optionText || ""}
                              onChange={(e) => {
                                const updatedOptions =
                                  currentQuestion.options.map((opt) =>
                                    opt.id === option.id
                                      ? { ...opt, optionText: e.target.value }
                                      : opt
                                  );
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  options: updatedOptions,
                                });
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Option text"
                            />
                          </div>
                          <div className="flex items-center h-11">
                            <input
                              id={`correct-${option.id}`}
                              name="correctOption"
                              type="radio"
                              checked={option.isCorrect || option.is_correct}
                              onChange={() => {
                                const updatedOptions =
                                  currentQuestion.options.map((opt) => ({
                                    ...opt,
                                    isCorrect: opt.id === option.id,
                                  }));
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  options: updatedOptions,
                                });
                              }}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const updatedOptions =
                                currentQuestion.options.filter(
                                  (opt) => opt.id !== option.id
                                );
                              setCurrentQuestion({
                                ...currentQuestion,
                                options: updatedOptions,
                              });
                            }}
                            className="text-gray-400 hover:text-red-500 h-11 flex items-center px-2"
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveQuestion()}
                      className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Save Question
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
      <div>
        {/* Modal backdrop */}
        {isEditing && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop with transition */}
            <div
              className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                isEditing ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Modal container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              {/* Modal content with transition */}
              <div
                className={`bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 ${
                  isEditing
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-5"
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {currentQuestion.id ? "Edit Question" : "New Question"}
                    </h2>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  {error && (
                    <div
                      className={`flex items-center gap-3 p-3 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-100 transition-opacity duration-300 ${
                        error ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <FiAlertCircle className="flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question
                      </label>
                      <textarea
                        value={currentQuestion.question_text}
                        onChange={(e) =>
                          setCurrentQuestion({
                            ...currentQuestion,
                            question_text: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter the question text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hint
                      </label>
                      <textarea
                        value={currentQuestion.hint}
                        onChange={(e) =>
                          setCurrentQuestion({
                            ...currentQuestion,
                            hint: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter the hint text"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Options
                        </label>
                        <button
                          onClick={() =>
                            setCurrentQuestion((prev) => ({
                              ...prev,
                              options: [
                                ...prev.options,
                                {
                                  id: Date.now(),
                                  optionText: "",
                                  isCorrect: false,
                                },
                              ],
                            }))
                          }
                          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                          <FiPlus className="mr-1" /> Add Option
                        </button>
                      </div>

                      <div className="space-y-3">
                        {currentQuestion.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-1">
                              <input
                                type="text"
                                value={option.optionText || ""}
                                onChange={(e) => {
                                  const updatedOptions =
                                    currentQuestion.options.map((opt) =>
                                      opt.id === option.id
                                        ? { ...opt, optionText: e.target.value }
                                        : opt
                                    );
                                  setCurrentQuestion({
                                    ...currentQuestion,
                                    options: updatedOptions,
                                  });
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Option text"
                              />
                            </div>
                            <div className="flex items-center h-11">
                              <input
                                id={`correct-${option.id}`}
                                name="correctOption"
                                type="radio"
                                checked={option.isCorrect || option.is_correct}
                                onChange={() => {
                                  const updatedOptions =
                                    currentQuestion.options.map((opt) => ({
                                      ...opt,
                                      isCorrect: opt.id === option.id,
                                    }));
                                  setCurrentQuestion({
                                    ...currentQuestion,
                                    options: updatedOptions,
                                  });
                                }}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const updatedOptions =
                                  currentQuestion.options.filter(
                                    (opt) => opt.id !== option.id
                                  );
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  options: updatedOptions,
                                });
                              }}
                              className="text-gray-400 hover:text-red-500 h-11 flex items-center px-2"
                            >
                              <FiX />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveQuestion()}
                        className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Save Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Creation Modal */}
      <AnimatePresence>
        {isCreatingQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">
                    {typeof quiz?.id === "string" &&
                      quiz.id.startsWith("temp-") && (
                        <div className="bg-yellow-50 text-yellow-800 p-2 mb-4 rounded flex items-center">
                          <FiAlertCircle className="mr-2" />
                          Saving to server...
                        </div>
                      )}

                    {error && (
                      <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                      </div>
                    )}
                    {quiz ? "Edit Quiz Details" : "Create New Quiz"}
                  </h2>
                  <button
                    onClick={() => setIsCreatingQuiz(false)}
                    className="text-white/80 hover:text-white p-1 rounded-full transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Quiz Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Quiz Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={quizFormData.title}
                      onChange={(e) =>
                        setQuizFormData({
                          ...quizFormData,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
                      placeholder="Enter quiz title"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiEdit className="text-gray-400" />
                    </div>
                  </div>
                </div>
                {/* Quiz Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      value={quizFormData.description}
                      onChange={(e) =>
                        setQuizFormData({
                          ...quizFormData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
                      placeholder="Briefly describe what this quiz covers"
                    />
                    <div className="absolute top-3 left-3">
                      <FiFileText className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingQuiz(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateQuiz}
                  disabled={!quizFormData.title.trim() || isLoading}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                    !quizFormData.title.trim() || isLoading
                      ? "bg-indigo-400 cursor-not-allowed text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {quiz ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <FiPlus className="mr-2" />
                      {quiz ? "Update Quiz" : "Create Quiz"}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ConfirmModal
        isOpen={!!questionToDelete}
        onClose={() => setQuestionToDelete(null)}
        onConfirm={() => handleDelete(questionToDelete?.id)}
        title="Confirm Deletion"
        message={
          <>
            Are you sure you want to delete this quiz question{" "}
            <strong>{questionToDelete?.question_text}</strong>? This action
            cannot be undone.
          </>
        }
        confirmText="Delete Course"
        isProcessing={isDeleting}
        danger={true}
      />
    </div>
  );
}

// import { useState, useEffect } from "react";
// import {
//   FiClock,
//   FiPlay,
//   FiEdit,
//   FiTrash2,
//   FiPlus,
//   FiCheck,
//   FiX,
//   FiList,
//   FiFileText,
// } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// export default function LessonDetailWithQuiz({ lessonId }) {
//   // State for active tab and loading
//   const [activeTab, setActiveTab] = useState("lesson");
//   const [isLoading, setIsLoading] = useState(true);

//   // Mock data matching your Prisma schema
//   const [lesson, setLesson] = useState(null);
//   const [quizData, setQuizData] = useState({
//     quiz: null,
//     questions: [],
//   });

//   // Load data - replace with actual Prisma queries
//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);

//       // Simulate fetching lesson data
//       const mockLesson = {
//         id: parseInt(lessonId),
//         title: "Advanced React Hooks",
//         description: "<p>Deep dive into advanced React Hooks patterns</p>",
//         content: "<h2>useReducer</h2><p>For complex state logic</p>",
//         duration: 60,
//         order: 1,
//         videoUrl: "https://example.com/videos/advanced-hooks.mp4",
//         hasQuiz: true,
//         moduleId: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       // Simulate fetching quiz data
//       const mockQuiz = {
//         id: 1,
//         lessonId: parseInt(lessonId),
//         title: "React Hooks Mastery Quiz",
//         description: "Test your advanced hooks knowledge",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       const mockQuestions = [
//         {
//           id: 1,
//           quizId: 1,
//           question: "When should you use useReducer?",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           answers: [
//             {
//               id: 1,
//               option: "For simple state",
//               is_correct: false,
//               quizQuestionId: 1,
//             },
//             {
//               id: 2,
//               option: "For complex state logic",
//               is_correct: true,
//               quizQuestionId: 1,
//             },
//           ],
//         },
//       ];

//       setLesson(mockLesson);
//       setQuizData({
//         quiz: mockQuiz,
//         questions: mockQuestions,
//       });
//       setIsLoading(false);
//     };

//     loadData();
//   }, [lessonId]);

//   // Quiz management functions
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [isEditingQuiz, setIsEditingQuiz] = useState(false);

//   const handleSaveQuestion = async (questionData) => {
//     // Implement your Prisma mutation here
//     console.log("Saving question:", questionData);
//     // Example:
//     // await prisma.quizQuestion.upsert({...});
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header with tabs */}
//       <div className="border-b border-gray-200 mb-8">
//         <nav className="flex -mb-px">
//           <button
//             onClick={() => setActiveTab("lesson")}
//             className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
//               activeTab === "lesson"
//                 ? "border-indigo-500 text-indigo-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//             }`}
//           >
//             <FiFileText className="mr-2" />
//             Lesson Content
//           </button>
//           {lesson.hasQuiz && (
//             <button
//               onClick={() => setActiveTab("quiz")}
//               className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
//                 activeTab === "quiz"
//                   ? "border-indigo-500 text-indigo-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//             >
//               <FiList className="mr-2" />
//               Lesson Quiz
//             </button>
//           )}
//         </nav>
//       </div>

//       <AnimatePresence mode="wait">
//         {activeTab === "lesson" ? (
//           <motion.div
//             key="lesson"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             {/* Lesson Content */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
//               <div className="aspect-w-16 aspect-h-9 bg-gray-900">
//                 {lesson.videoUrl ? (
//                   <video
//                     controls
//                     className="w-full h-full object-cover"
//                     src={lesson.videoUrl}
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-white">
//                     <FiPlay className="text-4xl" />
//                   </div>
//                 )}
//               </div>

//               <div className="p-6">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-4">
//                   {lesson.title}
//                 </h1>
//                 <div className="flex items-center text-gray-600 mb-6">
//                   <FiClock className="mr-2" />
//                   <span>{lesson.duration} minutes</span>
//                 </div>

//                 <div
//                   className="prose max-w-none"
//                   dangerouslySetInnerHTML={{ __html: lesson.description }}
//                 />

//                 <div className="mt-8">
//                   <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                     Detailed Content
//                   </h2>
//                   <div
//                     className="prose max-w-none"
//                     dangerouslySetInnerHTML={{ __html: lesson.content }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="quiz"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             {/* Quiz Management */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {quizData.quiz.title}
//                     </h2>
//                     <p className="text-gray-600 mt-1">
//                       {quizData.quiz.description}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setCurrentQuestion({
//                         question: "",
//                         answers: [
//                           { option: "", is_correct: false },
//                           { option: "", is_correct: false },
//                         ],
//                       });
//                       setIsEditingQuiz(true);
//                     }}
//                     className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
//                   >
//                     <FiPlus className="mr-2" />
//                     Add Question
//                   </button>
//                 </div>
//               </div>

//               {/* Questions List */}
//               <div className="divide-y divide-gray-200">
//                 {quizData.questions.length === 0 ? (
//                   <div className="p-8 text-center text-gray-500">
//                     No questions added yet
//                   </div>
//                 ) : (
//                   quizData.questions.map((question) => (
//                     <div
//                       key={question.id}
//                       className="p-6 hover:bg-gray-50 transition-colors"
//                     >
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <h3 className="font-medium text-gray-800">
//                             {question.question}
//                           </h3>
//                           <ul className="mt-3 space-y-2">
//                             {question.answers.map((answer) => (
//                               <li
//                                 key={answer.id}
//                                 className={`flex items-start text-sm p-2 rounded ${
//                                   answer.is_correct
//                                     ? "bg-green-50 text-green-700"
//                                     : "bg-gray-50 text-gray-700"
//                                 }`}
//                               >
//                                 <span
//                                   className={`inline-flex items-center justify-center h-5 w-5 rounded-full mr-3 mt-0.5 flex-shrink-0 ${
//                                     answer.is_correct
//                                       ? "bg-green-100 text-green-600"
//                                       : "bg-gray-200 text-gray-600"
//                                   }`}
//                                 >
//                                   {answer.is_correct ? (
//                                     <FiCheck className="text-xs" />
//                                   ) : null}
//                                 </span>
//                                 <span>{answer.option}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                         <div className="flex space-x-2 ml-4">
//                           <button
//                             onClick={() => {
//                               setCurrentQuestion(
//                                 JSON.parse(JSON.stringify(question))
//                               );
//                               setIsEditingQuiz(true);
//                             }}
//                             className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
//                           >
//                             <FiEdit />
//                           </button>
//                           <button
//                             onClick={() => {
//                               if (window.confirm("Delete this question?")) {
//                                 // Implement delete functionality
//                               }
//                             }}
//                             className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Question Editor Modal */}
//       <AnimatePresence>
//         {isEditingQuiz && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.95, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.95, y: 20 }}
//               className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     {currentQuestion?.id ? "Edit Question" : "Add New Question"}
//                   </h2>
//                   <button
//                     onClick={() => setIsEditingQuiz(false)}
//                     className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
//                   >
//                     <FiX size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Question Text *
//                     </label>
//                     <textarea
//                       value={currentQuestion.question}
//                       onChange={(e) =>
//                         setCurrentQuestion({
//                           ...currentQuestion,
//                           question: e.target.value,
//                         })
//                       }
//                       rows={3}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="Enter the question text"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <div className="flex justify-between items-center mb-3">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Answer Options *
//                       </label>
//                       <button
//                         onClick={() =>
//                           setCurrentQuestion((prev) => ({
//                             ...prev,
//                             answers: [
//                               ...prev.answers,
//                               { option: "", is_correct: false },
//                             ],
//                           }))
//                         }
//                         className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
//                         type="button"
//                       >
//                         <FiPlus className="mr-1" /> Add Option
//                       </button>
//                     </div>

//                     <div className="space-y-3">
//                       {currentQuestion.answers.map((answer, index) => (
//                         <div key={index} className="flex items-start space-x-3">
//                           <div className="flex-1">
//                             <input
//                               type="text"
//                               value={answer.option}
//                               onChange={(e) => {
//                                 const updatedAnswers = [
//                                   ...currentQuestion.answers,
//                                 ];
//                                 updatedAnswers[index].option = e.target.value;
//                                 setCurrentQuestion({
//                                   ...currentQuestion,
//                                   answers: updatedAnswers,
//                                 });
//                               }}
//                               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                               placeholder={`Option ${index + 1}`}
//                               required
//                             />
//                           </div>
//                           <div className="flex items-center h-11">
//                             <input
//                               id={`correct-${index}`}
//                               name="correctAnswer"
//                               type="radio"
//                               checked={answer.is_correct}
//                               onChange={() => {
//                                 const updatedAnswers =
//                                   currentQuestion.answers.map((a, i) => ({
//                                     ...a,
//                                     is_correct: i === index,
//                                   }));
//                                 setCurrentQuestion({
//                                   ...currentQuestion,
//                                   answers: updatedAnswers,
//                                 });
//                               }}
//                               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//                             />
//                           </div>
//                           <button
//                             onClick={() => {
//                               const updatedAnswers =
//                                 currentQuestion.answers.filter(
//                                   (_, i) => i !== index
//                                 );
//                               setCurrentQuestion({
//                                 ...currentQuestion,
//                                 answers: updatedAnswers,
//                               });
//                             }}
//                             className="text-gray-400 hover:text-red-500 h-11 flex items-center px-2"
//                             type="button"
//                             disabled={currentQuestion.answers.length <= 2}
//                           >
//                             <FiX />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//                     <button
//                       type="button"
//                       onClick={() => setIsEditingQuiz(false)}
//                       className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleSaveQuestion(currentQuestion)}
//                       className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors"
//                       disabled={
//                         !currentQuestion.question ||
//                         currentQuestion.answers.length < 2
//                       }
//                     >
//                       Save Question
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
