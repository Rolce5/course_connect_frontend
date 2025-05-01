import { useState } from "react";
import { FiBookOpen, FiInfo, FiAlertTriangle, FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import QuizReviewSection from "./QuizReviewSection";

const LessonContent = ({
  currentLesson,
  notes,
  setNotes,
  handleNoteSave,
  handleVideoEnded,
  quizCompleted,
  currentQuiz,
  quizScore,
  bestScore,
  quizAttempts,
  weakTopics,
  attemptsLeft,
  selectedAnswers,
  courseId,
  prepareQuizRetake,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await handleNoteSave();
    setIsSaving(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl lg:text-2xl font-bold mb-4">
          {currentLesson.title}
        </h1>

        {currentLesson.videoUrl && (
          <div className="mb-6 aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
            <video
              controls
              className="w-full h-full object-cover"
              onEnded={handleVideoEnded}
              autoPlay
            >
              <source src={currentLesson.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {quizCompleted && (
          <QuizReviewSection
            quizScore={quizScore}
            bestScore={bestScore}
            quizAttempts={quizAttempts}
            weakTopics={weakTopics}
            currentQuiz={currentQuiz}
            selectedAnswers={selectedAnswers}
            attemptsLeft={attemptsLeft}
            courseId={courseId}
            prepareQuizRetake={prepareQuizRetake}
          />
        )}

        <div className="mb-6 lg:mb-8 h-[70vh] overflow-y-auto">
          <div
            className="prose max-w-none w-full text-left"
            dangerouslySetInnerHTML={{ __html: currentLesson.content }}
          />
        </div>

        <div className="border-t border-gray-200 pt-4 lg:pt-6">
          <h3 className="text-lg font-semibold mb-3 lg:mb-4">Your Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 lg:h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
            placeholder="Write your notes here..."
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm lg:text-base disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Notes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;
