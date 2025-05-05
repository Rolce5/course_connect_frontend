import React, { memo } from "react";
import {
  FiAlertTriangle,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

const OptionItem = memo(({ option, optionLetter, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 border rounded-lg cursor-pointer flex items-center ${
      isSelected
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200 hover:border-blue-300"
    }`}
  >
    <span className="font-bold mr-3">{optionLetter}.</span>
    <span>{option.option_text}</span>
  </div>
));

const QuizModal = memo(
  ({
    currentQuiz,
    currentQuestionIndex,
    selectedAnswers,
    answeredQuestions,
    quizAttempts,
    handleAnswerSelect,
    handlePreviousQuestion,
    handleNextQuestion,
    handleQuizSubmit,
    onClose,
  }) => {
    const currentQuestion = currentQuiz?.questions?.[currentQuestionIndex];
    const isLastQuestion =
      currentQuestionIndex === currentQuiz?.questions?.length - 1;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 lg:p-6">
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className="text-xl lg:text-2xl font-bold">
                {quizAttempts?.length > 0
                  ? `Attempt ${quizAttempts?.length + 1}/3`
                  : "Lesson Quiz"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close quiz"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {currentQuestion && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-4">
                    Question {currentQuestionIndex + 1} of{" "}
                    {currentQuiz.questions.length}
                  </h3>
                  <p className="mb-4">{currentQuestion.question_text}</p>

                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, optionIndex) => {
                      const optionLetter = String.fromCharCode(
                        65 + optionIndex
                      );
                      const isSelected =
                        selectedAnswers[currentQuestion.id] === option.id;

                      return (
                        <OptionItem
                          key={option.id}
                          option={option}
                          optionLetter={optionLetter}
                          isSelected={isSelected}
                          onClick={() =>
                            handleAnswerSelect(currentQuestion.id, option.id)
                          }
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between">
                  {currentQuestionIndex !== 0 && (
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className={`px-4 py-2 rounded-lg ${
                        currentQuestionIndex === 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <FiChevronLeft className="inline mr-1" />
                      Previous
                    </button>
                  )}

                  {isLastQuestion ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={
                        answeredQuestions.length < currentQuiz.questions.length
                      }
                      className={`px-4 py-2 rounded-lg ${
                        answeredQuestions.length < currentQuiz.questions.length
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Next
                      <FiChevronRight className="inline ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default QuizModal;
