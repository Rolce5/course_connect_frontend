// // import { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';

// // export default function QuizPage() {
// //   const { quizId } = useParams();
// //   const navigate = useNavigate();
// //   const [quiz, setQuiz] = useState(null); // Remove <QuizData | null>
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const [selectedOption, setSelectedOption] = useState(null); // Remove <number | null>
// //   const [showResults, setShowResults] = useState(false);
// //   const [score, setScore] = useState(0);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

// //   // Mock data fetch - replace with actual API call
// //   useEffect(() => {
// //     const fetchQuiz = async () => {
// //       try {
// //         // In a real app, you would fetch from your API
// //         // const response = await fetch(`/api/quizzes/${quizId}`);
// //         // const data = await response.json();

// //         // Mock data
// //         const mockQuiz = {
// //           id: 1,
// //           title: "React Fundamentals Quiz",
// //           description: "Test your knowledge of React core concepts",
// //           questions: [
// //             {
// //               id: 1,
// //               question: "What is the virtual DOM in React?",
// //               options: [
// //                 { id: 1, option: "A direct representation of the browser DOM", is_correct: false },
// //                 { id: 2, option: "A lightweight copy of the real DOM", is_correct: true },
// //                 { id: 3, option: "A 3D visualization tool", is_correct: false },
// //                 { id: 4, option: "A browser extension for debugging", is_correct: false }
// //               ]
// //             },
// //             {
// //               id: 2,
// //               question: "Which hook is used for side effects in React?",
// //               options: [
// //                 { id: 5, option: "useState", is_correct: false },
// //                 { id: 6, option: "useEffect", is_correct: true },
// //                 { id: 7, option: "useContext", is_correct: false },
// //                 { id: 8, option: "useReducer", is_correct: false }
// //               ]
// //             },
// //             {
// //               id: 3,
// //               question: "What does JSX stand for?",
// //               options: [
// //                 { id: 9, option: "JavaScript XML", is_correct: true },
// //                 { id: 10, option: "JavaScript Extension", is_correct: false },
// //                 { id: 11, option: "Java Syntax Extension", is_correct: false },
// //                 { id: 12, option: "JSON XML", is_correct: false }
// //               ]
// //             }
// //           ]
// //         };

// //         setQuiz(mockQuiz);
// //       } catch (error) {
// //         console.error("Failed to fetch quiz:", error);
// //       }
// //     };

// //     fetchQuiz();
// //   }, [quizId]);

// //   // Timer effect
// //   useEffect(() => {
// //     if (timeLeft <= 0) {
// //       handleSubmit();
// //       return;
// //     }

// //     const timer = setInterval(() => {
// //       setTimeLeft(prev => prev - 1);
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, [timeLeft]);

// //   const currentQuestion = quiz?.questions[currentQuestionIndex];

// //   const handleOptionSelect = (optionId) => {
// //     setSelectedOption(optionId);
// //   };

// //   const handleNext = () => {
// //     if (selectedOption === null) return;

// //     // Check if answer is correct
// //     const selectedOptionObj = currentQuestion?.options.find(opt => opt.id === selectedOption);
// //     if (selectedOptionObj?.is_correct) {
// //       setScore(prev => prev + 1);
// //     }

// //     // Move to next question or show results
// //     if (currentQuestionIndex < (quiz?.questions.length ?? 0) - 1) {
// //       setCurrentQuestionIndex(prev => prev + 1);
// //       setSelectedOption(null);
// //     } else {
// //       handleSubmit();
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     setIsSubmitting(true);
// //     try {
// //       // In a real app, you would submit to your API
// //       // await fetch('/api/quiz-submissions', {
// //       //   method: 'POST',
// //       //   body: JSON.stringify({
// //       //     quizId,
// //       //     answers: // collected answers
// //       //   })
// //       // });

// //       setShowResults(true);
// //     } catch (error) {
// //       console.error("Submission failed:", error);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const formatTime = (seconds) => {
// //     const mins = Math.floor(seconds / 60);
// //     const secs = seconds % 60;
// //     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
// //   };

// //   if (!quiz) {
// //     return <div className="flex justify-center items-center h-screen">
// //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
// //     </div>;
// //   }

// //   if (showResults) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //         <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
// //           <div className="text-center">
// //             <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Results</h1>
// //             <p className="text-lg text-gray-600 mb-8">{quiz.title}</p>

// //             <div className="flex justify-center mb-10">
// //               <div className="relative w-48 h-48">
// //                 <svg className="w-full h-full" viewBox="0 0 100 100">
// //                   <circle
// //                     className="text-gray-200"
// //                     strokeWidth="8"
// //                     stroke="currentColor"
// //                     fill="transparent"
// //                     r="40"
// //                     cx="50"
// //                     cy="50"
// //                   />
// //                   <circle
// //                     className="text-indigo-600"
// //                     strokeWidth="8"
// //                     strokeDasharray={`${(score / quiz.questions.length) * 251} 251`}
// //                     strokeLinecap="round"
// //                     stroke="currentColor"
// //                     fill="transparent"
// //                     r="40"
// //                     cx="50"
// //                     cy="50"
// //                   />
// //                 </svg>
// //                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
// //                   <span className="text-4xl font-bold text-gray-900">{Math.round((score / quiz.questions.length) * 100)}%</span>
// //                   <span className="block text-sm text-gray-500">Score</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mb-8">
// //               <p className="text-lg text-gray-700">
// //                 You answered {score} out of {quiz.questions.length} questions correctly.
// //               </p>
// //               {score === quiz.questions.length ? (
// //                 <p className="mt-4 text-green-600 font-medium">Perfect score! Well done!</p>
// //               ) : score >= quiz.questions.length * 0.7 ? (
// //                 <p className="mt-4 text-indigo-600 font-medium">Good job! You passed!</p>
// //               ) : (
// //                 <p className="mt-4 text-red-600 font-medium">Keep practicing! You'll get better!</p>
// //               )}
// //             </div>

// //             <button
// //               onClick={() => navigate(-1)}
// //               className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
// //             >
// //               Back to Course
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-3xl mx-auto">
// //         {/* Quiz header */}
// //         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
// //           <div className="p-6">
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
// //                 <p className="text-gray-600 mt-1">{quiz.description}</p>
// //               </div>
// //               <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
// //                 {formatTime(timeLeft)}
// //               </div>
// //             </div>

// //             <div className="mt-6">
// //               <div className="flex justify-between text-sm text-gray-500 mb-1">
// //                 <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
// //                 <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%</span>
// //               </div>
// //               <div className="w-full bg-gray-200 rounded-full h-2">
// //                 <div
// //                   className="bg-indigo-600 h-2 rounded-full"
// //                   style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
// //                 ></div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Question card */}
// //         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
// //           <div className="p-6">
// //             <h2 className="text-xl font-semibold text-gray-800 mb-6">
// //               {currentQuestion?.question}
// //             </h2>

// //             <div className="space-y-3">
// //               {currentQuestion?.options.map((option) => (
// //                 <div
// //                   key={option.id}
// //                   onClick={() => handleOptionSelect(option.id)}
// //                   className={`p-4 border rounded-lg cursor-pointer transition-colors ${
// //                     selectedOption === option.id
// //                       ? 'border-indigo-500 bg-indigo-50'
// //                       : 'border-gray-200 hover:border-indigo-300'
// //                   }`}
// //                 >
// //                   <div className="flex items-center">
// //                     <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
// //                       selectedOption === option.id
// //                         ? 'border-indigo-500 bg-indigo-500'
// //                         : 'border-gray-300'
// //                     }`}>
// //                       {selectedOption === option.id && (
// //                         <div className="w-2 h-2 rounded-full bg-white"></div>
// //                       )}
// //                     </div>
// //                     <span className="text-gray-700">{option.option}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Navigation buttons */}
// //         <div className="flex justify-between">
// //           {currentQuestionIndex > 0 ? (
// //             <button
// //               onClick={() => {
// //                 setCurrentQuestionIndex(prev => prev - 1);
// //                 setSelectedOption(null);
// //               }}
// //               className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
// //             >
// //               Previous
// //             </button>
// //           ) : (
// //             <div></div> // Empty div for spacing
// //           )}

// //           <button
// //             onClick={handleNext}
// //             disabled={selectedOption === null || isSubmitting}
// //             className={`px-6 py-2 font-medium rounded-lg ${
// //               selectedOption === null || isSubmitting
// //                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //                 : 'bg-indigo-600 text-white hover:bg-indigo-700'
// //             }`}
// //           >
// //             {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function QuizPage() {
//   const { lessonId } = useParams();
//   const navigate = useNavigate();
//   const [quiz, setQuiz] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//   });

//   // Load quiz data
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         // Mock data - replace with actual API call
//         const mockQuiz = {
//           id: 1,
//           lessonId: parseInt(lessonId),
//           title: "React Fundamentals Quiz",
//           description: "Test your knowledge of React core concepts",
//         };

//         const mockQuestions = [
//           {
//             id: 1,
//             quizId: 1,
//             question: "What is the virtual DOM in React?",
//             options: [
//               {
//                 id: 1,
//                 text: "A direct representation of the browser DOM",
//                 isCorrect: false,
//               },
//               {
//                 id: 2,
//                 text: "A lightweight copy of the real DOM",
//                 isCorrect: true,
//               },
//             ],
//           },
//         ];

//         setQuiz(mockQuiz);
//         setQuestions(mockQuestions);
//         setFormData({
//           title: mockQuiz.title,
//           description: mockQuiz.description,
//         });
//       } catch (error) {
//         console.error("Failed to fetch quiz:", error);
//       }
//     };

//     fetchQuiz();
//   }, [lessonId]);

//   const handleQuizChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const saveQuiz = async () => {
//     try {
//       // Save quiz details (title, description)
//       const updatedQuiz = { ...quiz, ...formData };
//       setQuiz(updatedQuiz);

//       // In a real app, you would save to your API
//       // await fetch(`/api/quizzes/${quiz.id}`, {
//       //   method: 'PUT',
//       //   body: JSON.stringify(updatedQuiz)
//       // });

//       alert("Quiz saved successfully!");
//     } catch (error) {
//       console.error("Failed to save quiz:", error);
//     }
//   };

//   const handleQuestionEdit = (question) => {
//     setCurrentQuestion(question);
//     setIsEditing(true);
//   };

//   const handleQuestionChange = (e) => {
//     setCurrentQuestion({
//       ...currentQuestion,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOptionChange = (optionId, field, value) => {
//     setCurrentQuestion((prev) => ({
//       ...prev,
//       options: prev.options.map((opt) =>
//         opt.id === optionId ? { ...opt, [field]: value } : opt
//       ),
//     }));
//   };

//   const addNewOption = () => {
//     setCurrentQuestion((prev) => ({
//       ...prev,
//       options: [
//         ...prev.options,
//         { id: Date.now(), text: "", isCorrect: false },
//       ],
//     }));
//   };

//   const removeOption = (optionId) => {
//     setCurrentQuestion((prev) => ({
//       ...prev,
//       options: prev.options.filter((opt) => opt.id !== optionId),
//     }));
//   };

//   const saveQuestion = async () => {
//     try {
//       if (currentQuestion.id) {
//         // Update existing question
//         const updatedQuestions = questions.map((q) =>
//           q.id === currentQuestion.id ? currentQuestion : q
//         );
//         setQuestions(updatedQuestions);
//       } else {
//         // Add new question
//         const newQuestion = { ...currentQuestion, id: Date.now() };
//         setQuestions([...questions, newQuestion]);
//       }

//       // In a real app, you would save to your API
//       // await fetch('/api/quiz-questions', {
//       //   method: currentQuestion.id ? 'PUT' : 'POST',
//       //   body: JSON.stringify(currentQuestion)
//       // });

//       setCurrentQuestion(null);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Failed to save question:", error);
//     }
//   };

//   const addNewQuestion = () => {
//     setCurrentQuestion({
//       id: null,
//       quizId: quiz.id,
//       question: "",
//       options: [
//         { id: 1, text: "", isCorrect: false },
//         { id: 2, text: "", isCorrect: false },
//       ],
//     });
//     setIsEditing(true);
//   };

//   const deleteQuestion = async (questionId) => {
//     try {
//       if (window.confirm("Are you sure you want to delete this question?")) {
//         setQuestions(questions.filter((q) => q.id !== questionId));

//         // In a real app, you would delete from your API
//         // await fetch(`/api/quiz-questions/${questionId}`, {
//         //   method: 'DELETE'
//         // });
//       }
//     } catch (error) {
//       console.error("Failed to delete question:", error);
//     }
//   };

//   if (!quiz) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Quiz Header */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
//           <div className="p-6">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">
//               Manage Quiz
//             </h1>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Quiz Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleQuizChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleQuizChange}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   onClick={saveQuiz}
//                   className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
//                 >
//                   Save Quiz Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Questions List */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
//               <button
//                 onClick={addNewQuestion}
//                 className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
//               >
//                 Add New Question
//               </button>
//             </div>

//             {questions.length === 0 ? (
//               <p className="text-gray-500 text-center py-4">
//                 No questions added yet
//               </p>
//             ) : (
//               <div className="space-y-4">
//                 {questions.map((question) => (
//                   <div
//                     key={question.id}
//                     className="border border-gray-200 rounded-lg p-4"
//                   >
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-medium text-gray-800">
//                           {question.question}
//                         </h3>
//                         <ul className="mt-2 space-y-1">
//                           {question.options.map((option) => (
//                             <li
//                               key={option.id}
//                               className={`text-sm ${option.isCorrect ? "text-green-600 font-medium" : "text-gray-600"}`}
//                             >
//                               {option.text} {option.isCorrect && "(Correct)"}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleQuestionEdit(question)}
//                           className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => deleteQuestion(question.id)}
//                           className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Question Editor Modal */}
//         {isEditing && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     {currentQuestion.id ? "Edit Question" : "Add New Question"}
//                   </h2>
//                   <button
//                     onClick={() => setIsEditing(false)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     ✕
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Question Text
//                     </label>
//                     <textarea
//                       name="question"
//                       value={currentQuestion.question}
//                       onChange={handleQuestionChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>

//                   <div>
//                     <div className="flex justify-between items-center mb-2">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Options
//                       </label>
//                       <button
//                         onClick={addNewOption}
//                         className="text-sm text-indigo-600 hover:text-indigo-800"
//                       >
//                         + Add Option
//                       </button>
//                     </div>

//                     <div className="space-y-3">
//                       {currentQuestion.options.map((option) => (
//                         <div
//                           key={option.id}
//                           className="flex items-start space-x-3"
//                         >
//                           <div className="flex-1">
//                             <input
//                               type="text"
//                               value={option.text}
//                               onChange={(e) =>
//                                 handleOptionChange(
//                                   option.id,
//                                   "text",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                               placeholder="Option text"
//                             />
//                           </div>
//                           <div className="flex items-center h-10">
//                             <input
//                               id={`correct-${option.id}`}
//                               name="correctOption"
//                               type="radio"
//                               checked={option.isCorrect}
//                               onChange={() =>
//                                 handleOptionChange(option.id, "isCorrect", true)
//                               }
//                               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//                             />
//                             <label
//                               htmlFor={`correct-${option.id}`}
//                               className="ml-2 block text-sm text-gray-700"
//                             >
//                               Correct
//                             </label>
//                           </div>
//                           <button
//                             onClick={() => removeOption(option.id)}
//                             className="text-red-600 hover:text-red-800 h-10 flex items-center"
//                           >
//                             ✕
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex justify-end space-x-3 pt-4">
//                     <button
//                       onClick={() => setIsEditing(false)}
//                       className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={saveQuestion}
//                       className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
//                     >
//                       Save Question
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';

export default function QuizManagementPage() {
  // Mock data storage
  const mockDatabase = {
    quiz: {
      id: 1,
      lessonId: 1,
      title: "React Fundamentals Quiz",
      description: "Test your knowledge of React core concepts"
    },
    questions: [
      {
        id: 1,
        quizId: 1,
        question: "What is the virtual DOM in React?",
        options: [
          { id: 1, text: "A direct representation of the browser DOM", isCorrect: false },
          { id: 2, text: "A lightweight copy of the real DOM", isCorrect: true }
        ]
      }
    ]
  };

  // State initialization
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  // Load mock data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setQuiz(mockDatabase.quiz);
      setQuestions(mockDatabase.questions);
      setFormData({
        title: mockDatabase.quiz.title,
        description: mockDatabase.quiz.description
      });
    }, 500);
  }, []);

  // Save quiz to mock database
  const saveQuiz = () => {
    const updatedQuiz = { ...mockDatabase.quiz, ...formData };
    mockDatabase.quiz = updatedQuiz;
    setQuiz(updatedQuiz);
    alert('Quiz saved successfully!');
  };

  // Save question to mock database
  const saveQuestion = () => {
    if (currentQuestion.id) {
      // Update existing question
      const index = mockDatabase.questions.findIndex(q => q.id === currentQuestion.id);
      mockDatabase.questions[index] = currentQuestion;
    } else {
      // Add new question
      const newQuestion = { ...currentQuestion, id: Date.now() };
      mockDatabase.questions.push(newQuestion);
    }
    
    // Update state
    setQuestions([...mockDatabase.questions]);
    setIsEditing(false);
    setCurrentQuestion(null);
  };

  // Add new question
  const addNewQuestion = () => {
    setCurrentQuestion({
      id: null,
      quizId: quiz.id,
      question: '',
      options: [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false }
      ]
    });
    setIsEditing(true);
  };

  // Delete question
  const deleteQuestion = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      mockDatabase.questions = mockDatabase.questions.filter(q => q.id !== questionId);
      setQuestions([...mockDatabase.questions]);
    }
  };

  if (!quiz) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Manage Quiz</h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={saveQuiz}
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
                >
                  Save Quiz Details
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Questions List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
              <button
                onClick={addNewQuestion}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
              >
                Add New Question
              </button>
            </div>
            
            {questions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No questions added yet</p>
            ) : (
              <div className="space-y-4">
                {questions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{question.question}</h3>
                        <ul className="mt-2 space-y-1">
                          {question.options.map(option => (
                            <li 
                              key={option.id} 
                              className={`text-sm ${option.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}`}
                            >
                              {option.text} {option.isCorrect && '(Correct)'}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setCurrentQuestion(JSON.parse(JSON.stringify(question)));
                            setIsEditing(true);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteQuestion(question.id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Question Editor Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {currentQuestion.id ? 'Edit Question' : 'Add New Question'}
                  </h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                    <textarea
                      name="question"
                      value={currentQuestion.question}
                      onChange={(e) => setCurrentQuestion({
                        ...currentQuestion,
                        question: e.target.value
                      })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Options</label>
                      <button
                        onClick={() => setCurrentQuestion({
                          ...currentQuestion,
                          options: [
                            ...currentQuestion.options,
                            { id: Date.now(), text: '', isCorrect: false }
                          ]
                        })}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        + Add Option
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <div key={option.id} className="flex items-start space-x-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => {
                                const updatedOptions = currentQuestion.options.map(opt => 
                                  opt.id === option.id 
                                    ? { ...opt, text: e.target.value } 
                                    : opt
                                );
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  options: updatedOptions
                                });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Option text"
                            />
                          </div>
                          <div className="flex items-center h-10">
                            <input
                              id={`correct-${option.id}`}
                              name="correctOption"
                              type="radio"
                              checked={option.isCorrect}
                              onChange={() => {
                                const updatedOptions = currentQuestion.options.map(opt => ({
                                  ...opt,
                                  isCorrect: opt.id === option.id
                                }));
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  options: updatedOptions
                                });
                              }}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <label htmlFor={`correct-${option.id}`} className="ml-2 block text-sm text-gray-700">
                              Correct
                            </label>
                          </div>
                          <button
                            onClick={() => {
                              const updatedOptions = currentQuestion.options.filter(
                                opt => opt.id !== option.id
                              );
                              setCurrentQuestion({
                                ...currentQuestion,
                                options: updatedOptions
                              });
                            }}
                            className="text-red-600 hover:text-red-800 h-10 flex items-center"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveQuestion}
                      className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
                    >
                      Save Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}