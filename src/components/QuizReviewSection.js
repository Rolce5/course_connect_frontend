// import { FiAlertTriangle, FiBookOpen, FiCheck, FiInfo } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const QuizReviewSection = ({
//   quizScore,
//   bestScore,
//   quizAttempts,
//   weakTopics,
//   currentQuiz,
//   selectedAnswers,
//   attemptsLeft,
//   courseId,
//   prepareQuizRetake,
// }) => {
//   console.log("current quiz:", currentQuiz);
//   console.log("Weak topics quiz:", weakTopics);
//   return (
//     <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//       <div className="flex flex-col space-y-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             {quizScore >= 70 ? (
//               <FiCheck className="text-green-500 mr-2 text-xl" />
//             ) : (
//               <FiInfo className="text-yellow-500 mr-2 text-xl" />
//             )}
//             <h3 className="text-lg font-semibold">
//               Quiz {quizScore >= 70 ? "Passed" : "Review Needed"}
//               {": "} {quizScore}%
//             </h3>
//           </div>
//           <div className="text-sm text-gray-600">
//             Best: {bestScore}% • Attempts: {quizAttempts.length}/3
//           </div>
//         </div>

//         {quizScore < 70 ? (
//           <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
//             <div className="flex items-start">
//               <FiBookOpen className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
//               <div>
//                 <h4 className="font-medium">Recommended Review</h4>
//                 <p className="text-sm mb-2">
//                   Focus on these topics before retrying:
//                 </p>
//                 <ul className="space-y-2">
//                   {weakTopics.map((topic, i) => {
//                     const questionWithTopic = currentQuiz.questions.find(
//                       (q) => q.topic === topic
//                     );
//                     return (
//                       <li key={i} className="flex items-start">
//                         <FiAlertTriangle className="text-red-400 mr-2 mt-0.5 flex-shrink-0" />
//                         <div>
//                           <p className="font-medium">{topic}</p>
//                           {questionWithTopic?.hint && (
//                             <p className="text-xs text-gray-600 mt-1">
//                               {questionWithTopic.hint} dd
//                             </p>
//                           )}
//                           <Link
//                             to={`/courses/${courseId}/resources?topic=${encodeURIComponent(topic)}`}
//                             className="text-xs text-blue-600 hover:underline mt-1 inline-block"
//                           >
//                             Review Resources
//                           </Link>
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="p-3 bg-green-50 border border-green-200 rounded">
//             <div className="flex items-start">
//               <FiCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
//               <div>
//                 <h4 className="font-medium">Strong Understanding</h4>
//                 <p className="text-sm">You demonstrated mastery of:</p>
//                 <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
//                   {Array.from(
//                     new Set(
//                       currentQuiz.questions
//                         .filter(
//                           (q) =>
//                             selectedAnswers[q.id] === q.correctAnswer && q.auestion_text
//                         )
//                         .map((q) => q.auestion_text)
//                     )
//                   ).map((auestion_text, i) => (
//                     <li key={i}>{auestion_text}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}

//         {attemptsLeft > 0 && quizScore < 70 && (
//           <div className="border-t pt-4">
//             <div className="flex items-start mb-3">
//               <FiInfo className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
//               <div>
//                 <h4 className="font-medium">Ready for Retake?</h4>
//                 <p className="text-sm">
//                   After reviewing, you'll get a new set of questions on the same
//                   topics.
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={prepareQuizRetake}
//               className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
//             >
//               Retake Quiz ({attemptsLeft}{" "}
//               {attemptsLeft === 1 ? "attempt" : "attempts"} left)
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizReviewSection;
// import {
//   FiAlertTriangle,
//   FiBookOpen,
//   FiCheck,
//   FiInfo,
//   FiLock,
//   FiX,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// const QuizReviewSection = ({
//   quizScore,
//   bestScore,
//   quizAttempts,
//   weakTopics,
//   currentQuiz,
//   selectedAnswers,
//   attemptsLeft,
//   courseId,
//   prepareQuizRetake,
// }) => {
//   const maxAttempts = 3;
//   const hasMaxAttempts = quizAttempts.length >= maxAttempts;
//   const canRetake = attemptsLeft > 0 && quizScore < 70 && !hasMaxAttempts;
//   const [isExpanded, setIsExpanded] = useState(true);

//   // If no specific weak topics, use the quiz title as the general topic
//   const effectiveWeakTopics =
//     weakTopics.length > 0
//       ? weakTopics
//       : quizScore < 70
//         ? ["the quiz questions"]
//         : [];

//   // Get all topics from questions (filtering out null/undefined)
//   const allTopics = Array.from(
//     new Set(
//       currentQuiz?.questions?.map((q) => q.topic)?.filter((topic) => topic) // Remove null/undefined
//     )
//   );

//   // If no specific topics exist in questions, use a generic message
//   const hasSpecificTopics = allTopics.length > 0;

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 p-6 flex items-center justify-center  z-40 transition-all duration-300 ease-out opacity-0 animate-fadeIn">
//       <div className="bg-white w-full max-w-2xl max-h-[90vh] space-y-5 rounded-xl shadow-lg border border-gray-100 p-5">
//         {/* Header with collapse button */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             {quizScore >= 70 ? (
//               <div className="p-2 bg-green-100 rounded-full mr-3">
//                 <FiCheck className="text-green-600 text-xl" />
//               </div>
//             ) : (
//               <div className="p-2 bg-yellow-100 rounded-full mr-3">
//                 <FiInfo className="text-yellow-600 text-xl" />
//               </div>
//             )}
//             <div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Quiz {quizScore >= 70 ? "Passed" : "Review Needed"}
//                 <span className="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
//                   {quizScore}%
//                 </span>
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Best: {bestScore}% • Attempts: {quizAttempts.length}/
//                 {maxAttempts}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <FiX className="text-gray-500" />
//           </button>
//         </div>

//         {isExpanded && (
//           <div className="space-y-5 transition-all duration-300 ease-out">
//             {/* Review Section */}
//             {quizScore < 70 ? (
//               <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200 shadow-sm transition-all duration-200">
//                 <div className="flex items-start">
//                   <div className="p-2 bg-yellow-100 rounded-lg mr-3">
//                     <FiBookOpen className="text-yellow-600 text-xl" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-gray-800 mb-2">
//                       Recommended Review
//                     </h4>
//                     <p className="text-gray-600 mb-3">
//                       {hasSpecificTopics
//                         ? "Focus on these topics before retrying:"
//                         : "Review the quiz questions before retrying:"}
//                     </p>

//                     {hasSpecificTopics ? (
//                       <ul className="space-y-3">
//                         {effectiveWeakTopics.map((topic, i) => (
//                           <li
//                             key={i}
//                             className="flex items-start bg-white p-3 rounded-lg shadow-xs border border-gray-100 transition-all duration-200 delay-100"
//                           >
//                             <div className="p-1.5 bg-red-100 rounded-full mr-3">
//                               <FiAlertTriangle className="text-red-500" />
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-800">
//                                 {topic}
//                               </p>
//                               <Link
//                                 to={`/courses/${courseId}/resources?topic=${encodeURIComponent(topic)}`}
//                                 className="mt-1 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                               >
//                                 Review Resources
//                                 <svg
//                                   className="w-4 h-4 ml-1"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M14 5l7 7m0 0l-7 7m7-7H3"
//                                   />
//                                 </svg>
//                               </Link>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <div className="flex items-start bg-white p-3 rounded-lg shadow-xs border border-gray-100 transition-all duration-200 delay-100">
//                         <div className="p-1.5 bg-red-100 rounded-full mr-3">
//                           <FiAlertTriangle className="text-red-500" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-800">
//                             All quiz questions
//                           </p>
//                           <Link
//                             to={`/courses/${courseId}/resources`}
//                             className="mt-1 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                           >
//                             Review Course Materials
//                             <svg
//                               className="w-4 h-4 ml-1"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M14 5l7 7m0 0l-7 7m7-7H3"
//                               />
//                             </svg>
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 shadow-sm transition-all duration-200">
//                 <div className="flex items-start">
//                   <div className="p-2 bg-green-100 rounded-lg mr-3">
//                     <FiCheck className="text-green-600 text-xl" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-gray-800 mb-2">
//                       Strong Understanding
//                     </h4>
//                     <p className="text-gray-600 mb-3">
//                       {hasSpecificTopics
//                         ? "You demonstrated mastery of:"
//                         : "You demonstrated mastery of the quiz content"}
//                     </p>
//                     {hasSpecificTopics && (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                         {Array.from(
//                           new Set(
//                             currentQuiz.questions
//                               .filter(
//                                 (q) =>
//                                   selectedAnswers[q.id] === q.correctAnswer &&
//                                   q.topic
//                               )
//                               .map((q) => q.topic)
//                           )
//                         ).map((topic, i) => (
//                           <div
//                             key={i}
//                             className="bg-white px-3 py-2 rounded-lg shadow-xs border border-gray-100 text-sm font-medium text-gray-700 transition-all duration-200"
//                           >
//                             {topic}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Retake Section */}
//             {hasMaxAttempts ? (
//               <div className="pt-3 transition-all duration-200">
//                 <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <div className="p-2 bg-gray-200 rounded-lg mr-3">
//                     <FiLock className="text-gray-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-gray-800">
//                       Maximum Attempts Reached
//                     </h4>
//                     <p className="text-gray-600">
//                       You've used all {maxAttempts} attempts. Please proceed to
//                       the next lesson.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ) : canRetake ? (
//               <div className="pt-3 space-y-4 transition-all duration-200">
//                 <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
//                   <div className="p-2 bg-blue-100 rounded-lg mr-3">
//                     <FiInfo className="text-blue-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-gray-800">
//                       Ready for Retake?
//                     </h4>
//                     <p className="text-gray-600">
//                       After reviewing, you'll get a new set of questions on the
//                       same
//                       {hasSpecificTopics ? " topics." : " material."}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={prepareQuizRetake}
//                   className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
//                 >
//                   Retake Quiz ({attemptsLeft}{" "}
//                   {attemptsLeft === 1 ? "attempt" : "attempts"} left)
//                 </button>
//               </div>
//             ) : null}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizReviewSection;
import {
  FiAlertTriangle,
  FiBookOpen,
  FiCheck,
  FiInfo,
  FiLock,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const QuizReviewSection = ({
  quizScore,
  bestScore,
  quizAttempts,
  weakTopics,
  currentQuiz,
  selectedAnswers,
  attemptsLeft,
  courseId,
  prepareQuizRetake,
  onClose,
}) => {
  const maxAttempts = 3;
  const hasMaxAttempts = quizAttempts.length >= maxAttempts;
  const canRetake = attemptsLeft > 0 && quizScore < 70 && !hasMaxAttempts;
  const [isExpanded, setIsExpanded] = useState(true);

  // Get all topics from questions (filtering out null/undefined)
  const allTopics = Array.from(
    new Set(
      currentQuiz?.questions?.map((q) => q.topic)?.filter((topic) => topic)
    )
  );

  const hasSpecificTopics = allTopics.length > 0;

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 p-6 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <motion.div
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="p-5 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {quizScore >= 70 ? (
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <FiCheck className="text-green-600 text-xl" />
                </div>
              ) : (
                <div className="p-2 bg-yellow-100 rounded-full mr-3">
                  <FiInfo className="text-yellow-600 text-xl" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Quiz {quizScore >= 70 ? "Passed" : "Review Needed"}
                  <span className="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    {quizScore}%
                  </span>
                </h3>
                <p className="text-sm text-gray-500">
                  Best: {bestScore}% • Attempts: {quizAttempts.length}/
                  {maxAttempts}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close review"
            >
              <FiX className="text-gray-500" />
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="space-y-5"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                {/* Content */}
                {quizScore < 70 ? (
                  <motion.div
                    className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200 shadow-sm"
                    variants={itemVariants}
                  >
                    <div className="flex items-start">
                      <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                        <FiBookOpen className="text-yellow-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Recommended Review
                        </h4>
                        <p className="text-gray-600 mb-3">
                          {hasSpecificTopics
                            ? "Focus on these topics before retrying:"
                            : "Review the quiz questions before retrying:"}
                        </p>

                        {hasSpecificTopics ? (
                          <ul className="space-y-3">
                            {weakTopics.map((topic, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start bg-white p-3 rounded-lg shadow-xs border border-gray-100"
                                variants={itemVariants}
                              >
                                <div className="p-1.5 bg-red-100 rounded-full mr-3">
                                  <FiAlertTriangle className="text-red-500" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {topic}
                                  </p>
                                  <Link
                                    to={`/courses/${courseId}/resources?topic=${encodeURIComponent(topic)}`}
                                    className="mt-1 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    Review Resources
                                    <svg
                                      className="w-4 h-4 ml-1"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      />
                                    </svg>
                                  </Link>
                                </div>
                              </motion.li>
                            ))}
                          </ul>
                        ) : (
                          <motion.div
                            className="flex items-start bg-white p-3 rounded-lg shadow-xs border border-gray-100"
                            variants={itemVariants}
                          >
                            <div className="p-1.5 bg-red-100 rounded-full mr-3">
                              <FiAlertTriangle className="text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                All quiz questions
                              </p>
                              <Link
                                to={`/courses/${courseId}/resources`}
                                className="mt-1 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                              >
                                Review Course Materials
                                <svg
                                  className="w-4 h-4 ml-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 shadow-sm"
                    variants={itemVariants}
                  >
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <FiCheck className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Strong Understanding
                        </h4>
                        <p className="text-gray-600 mb-3">
                          {hasSpecificTopics
                            ? "You demonstrated mastery of:"
                            : "You demonstrated mastery of the quiz content"}
                        </p>
                        {hasSpecificTopics && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {Array.from(
                              new Set(
                                currentQuiz.questions
                                  .filter(
                                    (q) =>
                                      selectedAnswers[q.id] ===
                                        q.correctAnswer && q.topic
                                  )
                                  .map((q) => q.topic)
                              )
                            ).map((topic, i) => (
                              <motion.div
                                key={i}
                                className="bg-white px-3 py-2 rounded-lg shadow-xs border border-gray-100 text-sm font-medium text-gray-700"
                                variants={itemVariants}
                              >
                                {topic}
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Retake Section */}
                {hasMaxAttempts ? (
                  <motion.div className="pt-3" variants={itemVariants}>
                    <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="p-2 bg-gray-200 rounded-lg mr-3">
                        <FiLock className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          Maximum Attempts Reached
                        </h4>
                        <p className="text-gray-600">
                          You've used all {maxAttempts} attempts. Please proceed
                          to the next lesson.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : canRetake ? (
                  <motion.div
                    className="pt-3 space-y-4"
                    variants={itemVariants}
                  >
                    <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <FiInfo className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          Ready for Retake?
                        </h4>
                        <p className="text-gray-600">
                          After reviewing, you'll get a new set of questions on
                          the same {hasSpecificTopics ? "topics." : "material."}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={prepareQuizRetake}
                      className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Retake Quiz ({attemptsLeft}{" "}
                      {attemptsLeft === 1 ? "attempt" : "attempts"} left)
                    </button>
                  </motion.div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizReviewSection;