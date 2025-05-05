// // // // // EXTENSIVE SIDEBAR UI

// // // import { useState, useEffect } from 'react';
// // // import { FiBook, FiCheckCircle, FiClock, FiAward, FiBarChart2, FiMenu } from 'react-icons/fi';
// // // import { FaPlay, FaLock } from 'react-icons/fa';
// // // import { Link } from 'react-router-dom';

// // // const CourseLearningPage = () => {
// // //   // Mock data
// // //   const mockCourse = {
// // //     id: '1',
// // //     title: 'React for Beginners',
// // //     modules: [
// // //       {
// // //         id: '101',
// // //         order: 1,
// // //         title: 'Module 1: Introduction to React',
// // //         duration: '1h 30m',
// // //         lessons: [
// // //           { id: '201', title: 'Lesson 1: Getting Started with React', duration: '15m', completed: true, hasQuiz: true },
// // //           { id: '202', title: 'Lesson 2: React Components', duration: '20m', completed: false, hasQuiz: false },
// // //         ]
// // //       },
// // //       {
// // //         id: '102',
// // //         order: 2,
// // //         title: 'Module 2: React Advanced Topics',
// // //         duration: '2h 15m',
// // //         lessons: [
// // //           { id: '203', title: 'Lesson 3: State and Lifecycle', duration: '30m', completed: false, hasQuiz: false },
// // //           { id: '204', title: 'Lesson 4: React Hooks', duration: '45m', completed: false, hasQuiz: true },
// // //         ]
// // //       }
// // //     ]
// // //   };

// // //   const mockProgress = 45;  // Mock progress percentage
// // //   const mockTimeSpent = '2h 45m';  // Mock time spent on the course
// // //   const mockLastActivity = 'Lesson 3';  // Mock last completed activity

// // //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // //   return (
// // //     <div className="flex h-screen bg-gray-50">
// // //       {/* Mobile Sidebar Toggle */}
// // //       <button
// // //         onClick={() => setSidebarOpen(!sidebarOpen)}
// // //         className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
// // //       >
// // //         <FiMenu className="w-6 h-6" />
// // //       </button>

// // //       {/* Sidebar */}
// // //       <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
// // //           md:translate-x-0 transform transition-transform duration-200 ease-in-out
// // //           fixed md:static w-80 h-full bg-white border-r border-gray-200 z-40 overflow-y-auto`}>

// // //         <div className="p-6">
// // //           <h2 className="text-xl font-bold flex items-center gap-2">
// // //             <FiBook /> {mockCourse.title}
// // //           </h2>
// // //           <div className="mt-6">
// // //             <div className="flex justify-between items-center mb-2">
// // //               <span className="text-sm font-medium">Progress</span>
// // //               <span className="text-sm font-bold">{mockProgress}%</span>
// // //             </div>
// // //             <div className="w-full bg-gray-200 rounded-full h-2.5">
// // //               <div
// // //                 className="bg-green-600 h-2.5 rounded-full"
// // //                 style={{ width: `${mockProgress}%` }}
// // //               ></div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <nav className="px-4 pb-6">
// // //           {mockCourse.modules.map((module) => (
// // //             <div key={module.id} className="mb-6">
// // //               <h3 className="font-medium text-gray-900 flex items-center gap-2 mb-2">
// // //                 <FiCheckCircle className="text-green-500" />
// // //                 Module {module.order}: {module.title}
// // //                 <span className="text-xs text-gray-500 ml-auto">{module.duration}</span>
// // //               </h3>
// // //               <ul className="space-y-1 pl-6">
// // //                 {module.lessons.map((lesson) => (
// // //                   <li key={lesson.id}>
// // //                     <Link
// // //                       to={`/learn/${mockCourse.id}/lessons/${lesson.id}`}
// // //                       className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm ${
// // //                         lesson.completed
// // //                           ? 'text-green-600 bg-green-50'
// // //                           : 'text-gray-700 hover:bg-gray-100'
// // //                       }`}
// // //                     >
// // //                       {lesson.completed ? (
// // //                         <FiCheckCircle className="text-green-500" />
// // //                       ) : (
// // //                         <FaPlay className="text-blue-500 text-xs" />
// // //                       )}
// // //                       {lesson.title}
// // //                       <span className="text-xs text-gray-500 ml-auto">{lesson.duration}</span>
// // //                       {lesson.hasQuiz && (
// // //                         <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
// // //                           Quiz
// // //                         </span>
// // //                       )}
// // //                     </Link>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           ))}
// // //         </nav>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="flex-1 overflow-y-auto">
// // //         <div className="max-w-4xl mx-auto p-6">
// // //           <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
// // //             <h1 className="text-2xl font-bold mb-4">Welcome back to {mockCourse.title}</h1>

// // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // //               <div className="bg-blue-50 p-4 rounded-lg">
// // //                 <div className="flex items-center gap-3">
// // //                   <div className="bg-blue-100 p-2 rounded-full">
// // //                     <FiClock className="text-blue-600" />
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-sm text-gray-600">Time Spent</p>
// // //                     <p className="font-bold">{mockTimeSpent}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="bg-purple-50 p-4 rounded-lg">
// // //                 <div className="flex items-center gap-3">
// // //                   <div className="bg-purple-100 p-2 rounded-full">
// // //                     <FiBarChart2 className="text-purple-600" />
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-sm text-gray-600">Completion</p>
// // //                     <p className="font-bold">{mockProgress}%</p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="bg-green-50 p-4 rounded-lg">
// // //                 <div className="flex items-center gap-3">
// // //                   <div className="bg-green-100 p-2 rounded-full">
// // //                     <FiAward className="text-green-600" />
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-sm text-gray-600">Last Activity</p>
// // //                     <p className="font-bold">{mockLastActivity}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="border-t pt-4">
// // //               <h3 className="font-medium mb-3">Recommended Next</h3>
// // //               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // //                 <div className="flex justify-between items-center">
// // //                   <div>
// // //                     <h4 className="font-medium">State and Lifecycle</h4>
// // //                     <p className="text-sm text-gray-600">Module 1 • 30 min</p>
// // //                   </div>
// // //                   <Link
// // //                     to={`/learn/${mockCourse.id}/lessons/4`}
// // //                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
// // //                   >
// // //                     <FaPlay className="text-xs" /> Continue
// // //                   </Link>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CourseLearningPage;

// // // import { useEffect, useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import {
// // //   FiCheck,
// // //   FiX,
// // //   FiArrowLeft,
// // //   FiMenu,
// // //   FiChevronLeft,
// // //   FiChevronRight,
// // // } from "react-icons/fi";
// // // import { getCourseWithLessons } from "../../services/couseService";
// // // import LoadingSpinner from "../../components/LoadingSpinner";
// // // import {
// // //   getUserEnrollments,
// // //   updateEnrollmentProgress,
// // // } from "../../services/enrollmentService";

// // // const LearningPage = () => {
// // //   const { courseId } = useParams();
// // //   const [courseData, setCourseData] = useState(null);
// // //   const [currentLesson, setCurrentLesson] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [progress, setProgress] = useState(0);
// // //   const [notes, setNotes] = useState("");
// // //   const [showQuizModal, setShowQuizModal] = useState(false);
// // //   const [enrollment, setEnrollment] = useState(null);
// // //   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
// // //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // //   const [quizCompleted, setQuizCompleted] = useState(false);
// // //   const [answeredQuestions, setAnsweredQuestions] = useState([]);

// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const course = await getCourseWithLessons(courseId);
// // //         const enrollmentData = await getUserEnrollments(courseId);

// // //         setCourseData(course);
// // //         setEnrollment(enrollmentData);
// // //         setProgress(enrollmentData?.progress || 0);

// // //         const allLessons = course.modules.flatMap((module) => module.lessons);
// // //         const targetLesson = enrollmentData?.lastLessonId
// // //           ? allLessons.find((l) => l.id === enrollmentData.lastLessonId)
// // //           : allLessons[0];

// // //         setCurrentLesson(targetLesson || allLessons[0]);
// // //         console.log(targetLesson);
// // //       } catch (error) {
// // //         console.error("Error loading course data:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [courseId]);

// // //   const updateProgress = async (lessonId) => {
// // //     if (!courseData || !enrollment) return;

// // //     const allLessons = courseData.modules.flatMap((module) => module.lessons);
// // //     const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
// // //     const newProgress = Math.round(
// // //       ((currentIndex + 1) / allLessons.length) * 100
// // //     );

// // //     try {
// // //       const updated = await updateEnrollmentProgress({
// // //         enrollmentId: enrollment.id,
// // //         lastLessonId: lessonId,
// // //         progress: newProgress,
// // //       });
// // //       setEnrollment(updated);
// // //       setProgress(updated.progress);
// // //     } catch (error) {
// // //       console.error("Update failed:", error);
// // //     }
// // //   };

// // //   // const goToLesson = async (lesson) => {
// // //   //   setCurrentLesson(lesson);
// // //   //   await updateProgress(lesson.id);
// // //   //   setMobileSidebarOpen(false); // Close sidebar on mobile after selection
// // //   // };
// // //   const goToLesson = async (lesson) => {
// // //     setCurrentLesson(lesson);
// // //     setQuizCompleted(false); // Reset quiz completion status
// // //     setAnsweredQuestions([]); // Reset answered questions
// // //     await updateProgress(lesson.id);
// // //     setMobileSidebarOpen(false);
// // //   };

// // //   const goToNextLesson = async () => {
// // //     const allLessons = courseData.modules.flatMap((module) => module.lessons);
// // //     const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);

// // //     if (currentIndex < allLessons.length - 1) {
// // //       await goToLesson(allLessons[currentIndex + 1]);
// // //     } else {
// // //       await updateProgress(currentLesson.id, true);
// // //       navigate(`/courses/${courseId}/complete`);
// // //     }
// // //   };

// // //   const goToPreviousLesson = async () => {
// // //     const allLessons = courseData.modules.flatMap((module) => module.lessons);
// // //     const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);

// // //     if (currentIndex > 0) {
// // //       await goToLesson(allLessons[currentIndex - 1]);
// // //     }
// // //   };

// // //   // Add these helper functions
// // //   const handleNextQuestion = () => {
// // //     if (
// // //       currentQuestionIndex <
// // //       (currentLesson.quiz?.questions?.length || 0) - 1
// // //     ) {
// // //       setCurrentQuestionIndex(currentQuestionIndex + 1);
// // //     }
// // //   };

// // //   const handlePreviousQuestion = () => {
// // //     if (currentQuestionIndex > 0) {
// // //       setCurrentQuestionIndex(currentQuestionIndex - 1);
// // //     }
// // //   };

// // //   // const handleAnswerSelect = (questionId, optionId) => {
// // //   //   // Handle answer selection logic here
// // //   //   // Then automatically go to next question if not last
// // //   //   if (
// // //   //     currentQuestionIndex <
// // //   //     (currentLesson.quiz?.questions?.length || 0) - 1
// // //   //   ) {
// // //   //     setTimeout(() => handleNextQuestion(), 500); // Small delay for UX
// // //   //   }
// // //   // };
// // //   const handleAnswerSelect = (questionId, optionId) => {
// // //     // Track answered questions
// // //     setAnsweredQuestions((prev) => [...prev, questionId]);

// // //     // Auto-advance if not last question
// // //     if (currentQuestionIndex < currentLesson.quiz.questions.length - 1) {
// // //       setTimeout(() => handleNextQuestion(), 500);
// // //     }
// // //   };

// // //   const handleQuizSubmit = () => {
// // //     setQuizCompleted(true);
// // //     setShowQuizModal(false);
// // //     // You might want to save quiz results to your backend here
// // //   };

// // //   useEffect(() => {
// // //     if (showQuizModal) {
// // //       setCurrentQuestionIndex(0);
// // //     }
// // //   }, [showQuizModal]);

// // //   const handleNoteSave = async () => {
// // //     // Save notes implementation
// // //   };

// // //   if (loading) return <LoadingSpinner />;
// // //   if (!courseData)
// // //     return <div className="p-4 text-center">Course not found</div>;
// // //   if (!currentLesson)
// // //     return <div className="p-4 text-center">Lesson not found</div>;
// // // const allLessons = courseData?.modules?.flatMap((module) => module.lessons) || [];
// // // const currentIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);

// // //   return (
// // //     <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
// // //       {/* Mobile Header */}
// // //       <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
// // //         <button
// // //           onClick={() => navigate(-1)}
// // //           className="text-gray-600 hover:text-gray-800"
// // //         >
// // //           <FiArrowLeft className="h-5 w-5" />
// // //         </button>
// // //         <h1 className="text-lg font-bold truncate max-w-xs">
// // //           {courseData.title}
// // //         </h1>
// // //         <button
// // //           onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
// // //           className="text-gray-600 hover:text-gray-800"
// // //         >
// // //           <FiMenu className="h-5 w-5" />
// // //         </button>
// // //       </header>

// // //       {/* Mobile Sidebar Backdrop */}
// // //       {mobileSidebarOpen && (
// // //         <div
// // //           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
// // //           onClick={() => setMobileSidebarOpen(false)}
// // //         />
// // //       )}

// // //       {/* Sidebar - Responsive */}
// // //       <aside
// // //         className={`
// // //         ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
// // //         lg:translate-x-0 transform transition-transform duration-200 ease-in-out
// // //         fixed lg:static w-72 h-full bg-white border-r border-gray-200 z-30 overflow-y-auto
// // //       `}
// // //       >
// // //         <div className="p-4">
// // //           <div className="hidden lg:flex items-center mb-4">
// // //             <button
// // //               onClick={() => navigate(-1)}
// // //               className="text-gray-600 hover:text-gray-800 mr-2"
// // //             >
// // //               <FiArrowLeft className="h-5 w-5" />
// // //             </button>
// // //             <h2 className="text-lg font-bold truncate">{courseData.title}</h2>
// // //           </div>

// // //           {/* Progress Bar */}
// // //           <div className="mb-6">
// // //             <div className="flex justify-between text-sm mb-1">
// // //               <span>Progress</span>
// // //               <span>{progress}%</span>
// // //             </div>
// // //             <div className="h-2 bg-gray-200 rounded-full">
// // //               <div
// // //                 className="h-full bg-green-500 rounded-full"
// // //                 style={{ width: `${progress}%` }}
// // //               />
// // //             </div>
// // //           </div>
// // //           {/* Course Modules */}
// // //           <nav className="space-y-4">
// // //             {courseData.modules.map((module) => (
// // //               <div key={module.id}>
// // //                 <h3
// // //                   // className="font-medium text-gray-700 px-2 py-1 bg-gray-50 rounded"
// // //                   className="px-2 py-1 font-medium text-gray-700"
// // //                 >
// // //                   Module {module.order}: {module.title}
// // //                 </h3>
// // //                 <ul className="mt-1 space-y-1">
// // //                   {module.lessons.map((lesson) => {
// // //                     const allLessons = courseData.modules.flatMap(
// // //                       (m) => m.lessons
// // //                     );
// // //                     const lessonIndex = allLessons.findIndex(
// // //                       (l) => l.id === lesson.id
// // //                     );
// // //                     const lessonProgress = Math.round(
// // //                       ((lessonIndex + 1) / allLessons.length) * 100
// // //                     );
// // //                     const isCompleted = progress >= lessonProgress;

// // //                     return (
// // //                       <li key={lesson.id}>
// // //                         <button
// // //                           onClick={() => goToLesson(lesson)}
// // //                           className={`
// // //                             w-full text-left px-3 py-2 text-sm rounded flex items-center
// // //                             ${
// // //                               currentLesson.id === lesson.id
// // //                                 ? "bg-blue-50 text-blue-600"
// // //                                 : "hover:bg-gray-100"
// // //                             }
// // //                           `}
// // //                         >
// // //                           <span className="w-6 text-center text-gray-500">
// // //                             {lesson.order}
// // //                           </span>
// // //                           <span className="truncate">{lesson.title}</span>
// // //                           {isCompleted && (
// // //                             <FiCheck className="ml-auto text-green-500" />
// // //                           )}
// // //                         </button>
// // //                       </li>
// // //                     );
// // //                   })}
// // //                 </ul>
// // //               </div>
// // //             ))}
// // //           </nav>
// // //         </div>
// // //       </aside>

// // //       {/* Main Content */}
// // //       <main className="flex-1 flex flex-col overflow-hidden">
// // //         {/* Lesson Content */}
// // //         <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-white">
// // //           <div className="max-w-4xl mx-auto">
// // //             <h1 className="text-xl lg:text-2xl font-bold mb-4">
// // //               {currentLesson.title}
// // //             </h1>

// // //             {/* Video Player - Responsive */}
// // //             {currentLesson.videoUrl && (
// // //               <div className="mb-6 aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
// // //                 <video
// // //                   controls
// // //                   className="w-full h-full object-cover"
// // //                   onEnded={() => updateProgress(currentLesson.id)}
// // //                   autoPlay
// // //                 >
// // //                   <source src={currentLesson.videoUrl} type="video/mp4" />
// // //                   Your browser does not support the video tag.
// // //                 </video>
// // //               </div>
// // //             )}

// // //             {/* Lesson Content */}
// // //             <div className="mb-6 lg:mb-8 h-[70vh] overflow-y-auto">
// // //               <div
// // //                 className="prose max-w-none w-full text-left"
// // //                 dangerouslySetInnerHTML={{ __html: currentLesson.content }}
// // //               />
// // //             </div>
// // //             {/* Notes Section */}
// // //             <div className="border-t border-gray-200 pt-4 lg:pt-6">
// // //               <h3 className="text-lg font-semibold mb-3 lg:mb-4">Your Notes</h3>
// // //               <textarea
// // //                 value={notes}
// // //                 onChange={(e) => setNotes(e.target.value)}
// // //                 className="w-full h-32 lg:h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
// // //                 placeholder="Write your notes here..."
// // //               />
// // //               <div className="flex justify-end mt-2">
// // //                 <button
// // //                   onClick={handleNoteSave}
// // //                   className="px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm lg:text-base"
// // //                 >
// // //                   Save Notes
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Lesson Navigation - Responsive */}
// // //         <footer className="bg-white border-t border-gray-200 p-3 lg:p-4">
// // //           <div className="max-w-4xl mx-auto flex justify-between items-center">
// // //             <button
// // //               onClick={goToPreviousLesson}
// // //               disabled={
// // //                 !courseData?.modules[0]?.lessons[0] ||
// // //                 currentLesson.id === courseData.modules[0].lessons[0].id
// // //               }
// // //               className={`
// // //                 flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base
// // //                 ${
// // //                   !courseData?.modules[0]?.lessons[0] ||
// // //                   currentLesson.id === courseData.modules[0].lessons[0].id
// // //                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
// // //                     : "bg-gray-100 hover:bg-gray-200"
// // //                 }
// // //               `}
// // //             >
// // //               <FiChevronLeft className="mr-1" />
// // //               <span className="hidden sm:inline">Previous</span>
// // //             </button>

// // //             <div className="flex space-x-2">
// // //               {currentLesson.quiz?.questions?.length > 0 && (
// // //                 <button
// // //                   onClick={() => setShowQuizModal(true)}
// // //                   className="px-3 py-1.5 lg:px-4 lg:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm lg:text-base"
// // //                 >
// // //                   <span className="hidden sm:inline">Take</span> Quiz
// // //                 </button>
// // //               )}

// // //               {/* <button
// // //                 onClick={goToNextLesson}
// // //                 className="flex items-center px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm lg:text-base"
// // //               >
// // //                 <span>{isLastLesson() ? 'Complete' : 'Next'} </span>
// // //                 <FiChevronRight className="ml-1" />
// // //               </button> */}
// // //               {/* <button
// // //                 onClick={goToNextLesson}
// // //                 disabled={
// // //                   currentLesson.quiz?.questions?.length > 0 && !quizCompleted
// // //                 }
// // //                 className={`flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base ${
// // //                   currentLesson.quiz?.questions?.length > 0 && !quizCompleted
// // //                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// // //                     : "bg-blue-600 text-white hover:bg-blue-700"
// // //                 }`}
// // //               >
// // //                 <span>
// // //                   {currentIndex === allLessons.length - 1 ? "Complete" : "Next"}
// // //                 </span>
// // //                 <FiChevronRight className="ml-1" />
// // //               </button> */}
// // //               <div className="relative">
// // //                 <button
// // //                   onClick={goToNextLesson}
// // //                   disabled={
// // //                     currentLesson.quiz?.questions?.length > 0 && !quizCompleted
// // //                   }
// // //                   className={`flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base ${
// // //                     currentLesson.quiz?.questions?.length > 0 && !quizCompleted
// // //                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// // //                       : "bg-blue-600 text-white hover:bg-blue-700"
// // //                   }`}
// // //                 >
// // //                   <span>
// // //                     {currentIndex === allLessons.length - 1
// // //                       ? "Complete"
// // //                       : "Next"}
// // //                   </span>
// // //                   <FiChevronRight className="ml-1" />
// // //                 </button>

// // //                 {currentLesson.quiz?.questions?.length > 0 &&
// // //                   !quizCompleted && (
// // //                     <div className="absolute bottom-full mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
// // //                       Complete the quiz to continue
// // //                     </div>
// // //                   )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </footer>
// // //       </main>

// // //       {/* Quiz Modal - Responsive */}
// // //       {/* {showQuizModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
// // //           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// // //             <div className="p-4 lg:p-6">
// // //               <div className="flex justify-between items-center mb-4 lg:mb-6">
// // //                 <h2 className="text-xl lg:text-2xl font-bold">Lesson Quiz</h2>
// // //                 <button
// // //                   onClick={() => setShowQuizModal(false)}
// // //                   className="text-gray-500 hover:text-gray-700"
// // //                 >
// // //                   <FiX className="h-6 w-6" />
// // //                 </button>
// // //               </div>

// // //               <div className="space-y-4 lg:space-y-6">
// // //                 {currentLesson.quiz?.questions?.map((question, index) => (
// // //                   // <div key={question.id} className="mb-6"></div>
// // //                   <div key={question.id}>
// // //                     <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">
// // //                       Question {index + 1}: {question.question}
// // //                     </h3>
// // //                     <div className="space-y-2 lg:space-y-3">
// // //                       {question.options?.map((option, optionIndex) => {
// // //                         const optionLetter = String.fromCharCode(
// // //                           65 + optionIndex
// // //                         );
// // //                         return (
// // //                           <div
// // //                             key={option.id}
// // //                             className="p-3 lg:p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 text-sm lg:text-base flex items-center"
// // //                           >
// // //                             <span className="font-bold mr-2">
// // //                               {optionLetter}.
// // //                             </span>
// // //                             {option.optionText}
// // //                           </div>
// // //                         );
// // //                       })}
// // //                     </div>
// // //                   </div>
// // //                 ))}

// // //                 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 lg:py-3 rounded-lg font-medium text-sm lg:text-base">
// // //                   Submit Quiz
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )} */}
// // //       {showQuizModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
// // //           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// // //             <div className="p-4 lg:p-6">
// // //               <div className="flex justify-between items-center mb-4 lg:mb-6">
// // //                 <h2 className="text-xl lg:text-2xl font-bold">
// // //                   Question {currentQuestionIndex + 1} of{" "}
// // //                   {currentLesson.quiz?.questions?.length}
// // //                 </h2>
// // //                 <button
// // //                   onClick={() => setShowQuizModal(false)}
// // //                   className="text-gray-500 hover:text-gray-700"
// // //                 >
// // //                   <FiX className="h-6 w-6" />
// // //                 </button>
// // //               </div>

// // //               <div className="space-y-6">
// // //                 {currentLesson.quiz?.questions?.[currentQuestionIndex] && (
// // //                   <>
// // //                     <div>
// // //                       <h3 className="text-lg lg:text-xl font-semibold mb-4">
// // //                         {
// // //                           currentLesson.quiz.questions[currentQuestionIndex]
// // //                             .question
// // //                         }
// // //                       </h3>
// // //                       <div className="space-y-3">
// // //                         {currentLesson.quiz.questions[
// // //                           currentQuestionIndex
// // //                         ].options?.map((option, optionIndex) => {
// // //                           const optionLetter = String.fromCharCode(
// // //                             65 + optionIndex
// // //                           );
// // //                           return (
// // //                             <div
// // //                               key={option.id}
// // //                               onClick={() =>
// // //                                 handleAnswerSelect(
// // //                                   currentLesson.quiz.questions[
// // //                                     currentQuestionIndex
// // //                                   ].id,
// // //                                   option.id
// // //                                 )
// // //                               }
// // //                               className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 flex items-center"
// // //                             >
// // //                               <span className="font-bold mr-3">
// // //                                 {optionLetter}.
// // //                               </span>
// // //                               <span>{option.optionText}</span>
// // //                             </div>
// // //                           );
// // //                         })}
// // //                       </div>
// // //                     </div>

// // //                     {/* <div className="flex justify-between">
// // //                       <button
// // //                         onClick={handlePreviousQuestion}
// // //                         disabled={currentQuestionIndex === 0}
// // //                         className={`px-4 py-2 rounded-lg ${currentQuestionIndex === 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:bg-blue-50"}`}
// // //                       >
// // //                         <FiChevronLeft className="inline mr-1" />
// // //                         Previous
// // //                       </button>

// // //                       {currentQuestionIndex <
// // //                       currentLesson.quiz.questions.length - 1 ? (
// // //                         <button
// // //                           onClick={handleNextQuestion}
// // //                           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// // //                         >
// // //                           Next
// // //                           <FiChevronRight className="inline ml-1" />
// // //                         </button>
// // //                       ) : (
// // //                         <button
// // //                           onClick={() => {
// // //                             // Handle quiz submission
// // //                             setShowQuizModal(false);
// // //                           }}
// // //                           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
// // //                         >
// // //                           Submit Quiz
// // //                         </button>
// // //                       )}
// // //                     </div> */}
// // //                     <div className="flex justify-between">
// // //                       {/* Previous button */}
// // //                       <button
// // //                         onClick={handlePreviousQuestion}
// // //                         disabled={currentQuestionIndex === 0}
// // //                         className={`px-4 py-2 rounded-lg ${
// // //                           currentQuestionIndex === 0
// // //                             ? "text-gray-400 cursor-not-allowed"
// // //                             : "text-blue-600 hover:bg-blue-50"
// // //                         }`}
// // //                       >
// // //                         <FiChevronLeft className="inline mr-1" />
// // //                         Previous
// // //                       </button>

// // //                       {/* Next/Submit button */}
// // //                       {currentQuestionIndex ===
// // //                       currentLesson.quiz.questions.length - 1 && (

// // //                         <button
// // //                           onClick={handleQuizSubmit}
// // //                           disabled={
// // //                             answeredQuestions.length <
// // //                             currentLesson.quiz.questions.length
// // //                           }
// // //                           className={`px-4 py-2 rounded-lg ${
// // //                             answeredQuestions.length <
// // //                             currentLesson.quiz.questions.length
// // //                               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// // //                               : "bg-green-600 text-white hover:bg-green-700"
// // //                           }`}
// // //                         >
// // //                           Submit Quiz
// // //                         </button>
// // //                       )}
// // //                     </div>
// // //                   </>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default LearningPage;



import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
  useReducer,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowLeft,
  FiMenu,
} from "react-icons/fi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useCourseData } from "../../hooks/useCourseData";
import { useEnrollment } from "../../hooks/useEnrollment";
import { getNote, saveNote } from "../../services/noteService";
import {
  getNewQuizVersion,
  getQuizAttempts,
  submitQuizAnswers,
} from "../../services/quizService";
import {
  completeLesson,
  checkLessonProgress,
  generateCertificate,
} from "../../services/enrollmentService";

const QuizModal = lazy(() => import("../../components/QuizModal"));
const LessonSidebar = lazy(() => import("../../components/LessonSidebar"));
const LessonContent = lazy(() => import("../../components/LessonContent"));
const QuizReviewSection = lazy(
  () => import("../../components/QuizReviewSection")
);

function quizReducer(state, action) {
  switch (action.type) {
    case "INIT_QUIZ":
      return {
        ...state,
        currentQuizId: action.payload.quizId, // Track which quiz these attempts belong to
        attempts: action.payload.attempts.filter(
          (a) => a.quizId === action.payload.quizId
        ), // Filter relevant attempts
        bestScore: Math.max(...action.payload.attempts.map((a) => a.score), 0),
        completed: action.payload.attempts.some((a) => a.score >= 70),
      };
    case "SHOW_MODAL":
      return { ...state, showModal: true };
    case "HIDE_MODAL":
      return { ...state, showModal: false };
    case "SHOW_REVIEW":
      return { ...state, showReview: true };
    case "HIDE_REVIEW":
      return { ...state, showReview: false };
    case "SELECT_ANSWER":
      return {
        ...state,
        selectedAnswers: {
          ...state.selectedAnswers,
          [action.payload.questionId]: action.payload.optionId,
        },
        answeredQuestions: state.answeredQuestions.includes(
          action.payload.questionId
        )
          ? state.answeredQuestions
          : [...state.answeredQuestions, action.payload.questionId],
        currentIndex: Math.min(
          state.currentIndex + 1,
          action.payload.totalQuestions - 1
        ),
      };
    case "SUBMIT_QUIZ":
      return {
        ...state,
        completed: action.payload.score >= 70, 
        showModal: false,
        showReview: true,
        attempts: [...state.attempts, action.payload.attempt],
        score: action.payload.score,
        bestScore: Math.max(state.bestScore, action.payload.score),
      };
    case "PREPARE_RETRY":
      return {
        ...state,
        showModal: true,
        completed: false,
        currentIndex: 0,
        selectedAnswers: {},
        answeredQuestions: [],
        shuffledQuiz: action.payload.shuffledQuiz,
      };
    case "PREV_QUESTION":
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
      };
    case "RESET_QUIZ":
      return {
        showModal: false,
        showReview: false,
        currentIndex: 0,
        completed: false,
        answeredQuestions: [],
        selectedAnswers: {},
        score: null,
        attempts: [],
        bestScore: 0,
        shuffledQuiz: null,
      };
    case "COMPLETE_QUIZ":
      return {
        ...state,
        completed: true,
      };
    default:
      return state;
  }
}

const LearningPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [currentLesson, setCurrentLesson] = useState(null);
  const [notes, setNotes] = useState("");
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [quizLoading, setQuizLoading] = useState(false);


  const [quizState, dispatch] = useReducer(quizReducer, {
    showModal: false,
    showReview: false,
    currentIndex: 0,
    completed: false,
    answeredQuestions: [],
    selectedAnswers: {},
    score: null,
    attempts: [],
    bestScore: 0,
    shuffledQuiz: null,
  });

  const {
    courseData,
    loading: courseLoading,
    error: courseError,
  } = useCourseData(courseId);
  const {
    enrollment,
    progress,
    updateProgress,
    loading: enrollmentLoading,
  } = useEnrollment(courseId);

  const { currentModuleIndex, currentLessonIndex } = useMemo(() => {
    if (!courseData?.modules || !currentLesson)
      return { currentModuleIndex: -1, currentLessonIndex: -1 };

    for (let mIdx = 0; mIdx < courseData.modules.length; mIdx++) {
      const module = courseData.modules[mIdx];
      for (let lIdx = 0; lIdx < module.lessons.length; lIdx++) {
        if (module.lessons[lIdx].id === currentLesson.id) {
          return { currentModuleIndex: mIdx, currentLessonIndex: lIdx };
        }
      }
    }
    return { currentModuleIndex: -1, currentLessonIndex: -1 };
  }, [courseData, currentLesson]);

  const allLessons = useMemo(
    () => courseData?.modules?.flatMap((module) => module.lessons) || [],
    [courseData]
  );

  const isLastLesson = useMemo(() => {
    return (
      enrollment?.status === "COMPLETED" ||
      (currentModuleIndex === courseData?.modules.length - 1 &&
        currentLessonIndex ===
          courseData?.modules[currentModuleIndex]?.lessons.length - 1)
    );
  }, [currentModuleIndex, currentLessonIndex, courseData, enrollment]);

  const currentQuiz = useMemo(
    () => quizState.shuffledQuiz || currentLesson?.quiz,
    [quizState.shuffledQuiz, currentLesson]
  );

  const attemptsLeft = useMemo(() => {
    // Only count attempts for current lesson's quiz
    const currentQuizAttempts = quizState.attempts.filter(
      (a) => a.quizId === currentLesson?.quiz?.id
    );
    return 3 - currentQuizAttempts.length;
  }, [quizState.attempts, currentLesson]);

  useEffect(() => {
    if (courseLoading || enrollmentLoading || !courseData?.modules) return;

    const initialLesson = enrollment?.lastLessonId
      ? allLessons.find((l) => l.id === enrollment.lastLessonId)
      : courseData.modules[0]?.lessons[0];

    if (initialLesson && !currentLesson) {
      setCurrentLesson(initialLesson);
      setInitialLoad(false);
    }
  }, [
    courseLoading,
    enrollmentLoading,
    enrollment,
    courseData,
    allLessons,
    currentLesson,
  ]);

  useEffect(() => {
    const loadLessonData = async () => {
      if (!currentLesson) return;
          setQuizLoading(true);


      try {
        const [noteData, attempts, lessonProgress] = await Promise.all([
          getNote(currentLesson.id),
          currentLesson.quiz?.id
            ? getQuizAttempts(currentLesson.quiz.id)
            : Promise.resolve([]),
          initialLoad
            ? checkLessonProgress(currentLesson.id)
            : Promise.resolve({ completed: videoCompleted }),
        ]);

        setNotes(noteData?.content || "");
        if (initialLoad) setVideoCompleted(lessonProgress?.completed || false);

        if (currentLesson.quiz) {
          dispatch({
            type: "INIT_QUIZ",
            payload: {
              attempts,
              quizId: currentLesson.quiz.id, // Add current quiz ID
            },
          });
          if (attempts.some((a) => a.score >= 70)) {
            dispatch({ type: "COMPLETE_QUIZ" });
          }
        } else if (lessonProgress?.completed) {
          dispatch({ type: "COMPLETE_QUIZ" });
        }
      } catch (error) {
        console.error("Failed to load lesson data:", error);
        setNotes("");
        setVideoCompleted(false);
        dispatch({ type: "RESET_QUIZ" });
      } finally {
        if (initialLoad) setInitialLoad(false);
              setQuizLoading(false);

      }
    };

    loadLessonData();
  }, [currentLesson, initialLoad, videoCompleted]);

  useEffect(() => {
    if (enrollment?.status === "COMPLETED") {
      const handleCertificateGeneration = async () => {
        try {
          await generateCertificate(courseId);
        } catch (error) {
          console.error("Certificate generation failed:", error);
        }
      };
      handleCertificateGeneration();
    }
  }, [enrollment?.status, courseId]);


  const handleNoteSave = useCallback(async () => {
    try {
      await saveNote({ lessonId: currentLesson.id, content: notes });
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  }, [currentLesson, notes]);

  const handleVideoEnded = useCallback(async () => {
    try {
      await completeLesson(currentLesson.id);
      setVideoCompleted(true);
      await updateProgress(currentLesson.id);
      if (!currentLesson.quiz) dispatch({ type: "COMPLETE_QUIZ" });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  }, [currentLesson, updateProgress]);

  const handleAnswerSelect = useCallback(
    (questionId, optionId) => {
      dispatch({
        type: "SELECT_ANSWER",
        payload: {
          questionId,
          optionId,
          totalQuestions: currentQuiz.questions.length,
        },
      });
    },
    [currentQuiz]
  );

  const handleQuizSubmit = useCallback(async () => {
    try {
      const response = await submitQuizAnswers({
        quizId: currentQuiz.id,
        answers: quizState.selectedAnswers,
      });

      dispatch({
        type: "SUBMIT_QUIZ",
        payload: {
          attempt: {
            id: response.id,
            score: response.score,
            createdAt: response.createdAt,
          },
          score: response.score,
        },
      });
    } catch (error) {
      console.error("Quiz submission failed:", error);
    }
  }, [currentQuiz, quizState.selectedAnswers]);

  const prepareQuizRetake = useCallback(async () => {
    try {
      const newQuizVersion = await getNewQuizVersion(currentLesson.quiz.id);
      dispatch({
        type: "PREPARE_RETRY",
        payload: { shuffledQuiz: newQuizVersion },
      });
    } catch (error) {
      console.error("Failed to prepare quiz retake:", error);
    }
  }, [currentLesson]);

  const goToLesson = useCallback(
    async (lesson) => {
      if (isTransitioning || currentLesson?.id === lesson.id) return;

      setIsTransitioning(true);
      try {
        setCurrentLesson(lesson);
        setNotes("");
        setVideoCompleted(false);
        dispatch({ type: "RESET_QUIZ" });
        setInitialLoad(true);
      } catch (error) {
        console.error("Lesson transition failed:", error);
      } finally {
        setIsTransitioning(false);
      }
    },
    [currentLesson, isTransitioning]
  );

  const goToNextLesson = useCallback(async () => {
    if (isTransitioning || !courseData?.modules) return;

    dispatch({ type: "RESET_QUIZ" });

    if (currentLesson?.videoUrl && !videoCompleted) {
      alert("Please complete the video before proceeding");
      return;
    }

    if (currentLesson?.quiz && !quizState.completed) {
      alert("Please complete and pass the quiz before proceeding");
      return;
    }

    setIsTransitioning(true);
    try {
      await updateProgress(currentLesson.id);

      const currentModule = courseData.modules[currentModuleIndex];
      let nextLesson = null;

      if (currentLessonIndex < currentModule.lessons.length - 1) {
        nextLesson = currentModule.lessons[currentLessonIndex + 1];
      } else if (currentModuleIndex < courseData.modules.length - 1) {
        const nextModule = courseData.modules[currentModuleIndex + 1];
        nextLesson = nextModule.lessons[0];
      } else if (!isLastLesson) {
        navigate(`/courses/${courseId}/complete`);
        return;
      }

      if (nextLesson) {
        setCurrentLesson(nextLesson);
        setNotes("");
        setVideoCompleted(false);
        dispatch({ type: "RESET_QUIZ" });
        setInitialLoad(true);
        setCurrentLesson(nextLesson);
      } else if (!isLastLesson) {
        // Generate certificate before navigation
        try {
          await generateCertificate(courseId);
        } catch (error) {
          console.error("Certificate generation failed:", error);
        }
        navigate(`/courses/${courseId}/complete`);
        return;
      }
    } catch (error) {
      console.error("Lesson navigation failed:", error);
    } finally {
      setIsTransitioning(false);
    }
  }, [
    currentLesson,
    currentModuleIndex,
    currentLessonIndex,
    courseData,
    isTransitioning,
    videoCompleted,
    quizState.completed,
    isLastLesson,
    courseId,
    navigate,
    updateProgress,
    generateCertificate,
  ]);

  const goToPreviousLesson = useCallback(async () => {
    if (isTransitioning || currentModuleIndex === -1) return;

    setIsTransitioning(true);
    try {
      let prevLesson = null;
      const currentModule = courseData.modules[currentModuleIndex];

      if (currentLessonIndex > 0) {
        prevLesson = currentModule.lessons[currentLessonIndex - 1];
      } else if (currentModuleIndex > 0) {
        const prevModule = courseData.modules[currentModuleIndex - 1];
        prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
      }

      if (prevLesson) {
        setCurrentLesson(prevLesson);
        setNotes("");
        setVideoCompleted(false);
        dispatch({ type: "RESET_QUIZ" });
        setInitialLoad(true);
      }
    } catch (error) {
      console.error("Previous lesson navigation failed:", error);
    } finally {
      setIsTransitioning(false);
    }
  }, [currentModuleIndex, currentLessonIndex, courseData, isTransitioning]);

  const isLessonAccessible = useCallback(
    (lessonId) => {
      if (!enrollment) return false;
      if (enrollment.status === "COMPLETED") return true;
      return (
        allLessons.findIndex((l) => l.id === lessonId) <= currentLessonIndex
      );
    },
    [enrollment, allLessons, currentLessonIndex]
  );

  const isLessonCompleted = useCallback(
    (lessonId) => {
      if (enrollment?.status === "COMPLETED") return true;
      const lessonIndex = allLessons.findIndex((l) => l.id === lessonId);
      return (
        lessonIndex < currentLessonIndex ||
        (lessonIndex === currentLessonIndex &&
          (!currentLesson.videoUrl || videoCompleted) &&
          (!currentLesson.quiz || quizState.completed))
      );
    },
    [
      allLessons,
      currentLessonIndex,
      currentLesson,
      videoCompleted,
      quizState.completed,
      enrollment,
    ]
  );

  if (courseLoading || enrollmentLoading || initialLoad) {
    return <LoadingSpinner />;
  }

  if (courseError || !courseData) {
    return <div className="p-4 text-center">Course not found</div>;
  }

  if (!currentLesson || !allLessons.length) {
    return <div className="p-4 text-center">Lesson data not available</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold truncate max-w-xs">
          {courseData.title}
        </h1>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-gray-600 hover:text-gray-800"
        >
          <FiMenu className="h-5 w-5" />
        </button>
      </header>

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <Suspense fallback={<LoadingSpinner />}>
        <LessonSidebar
          courseData={courseData}
          currentLesson={currentLesson}
          progress={progress}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          isLessonAccessible={isLessonAccessible}
          isLessonCompleted={isLessonCompleted}
          goToLesson={goToLesson}
          navigate={navigate}
        />
      </Suspense>

      <main className="flex-1 flex flex-col overflow-hidden">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <LessonContent
              currentLesson={currentLesson}
              notes={notes}
              setNotes={setNotes}
              handleNoteSave={handleNoteSave}
              handleVideoEnded={handleVideoEnded}
            />
          </Suspense>
        </ErrorBoundary>

        <footer className="bg-white border-t border-gray-200 p-3 lg:p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button
              onClick={goToPreviousLesson}
              disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
              className={`flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base ${
                currentModuleIndex === 0 && currentLessonIndex === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <FiChevronLeft className="mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex space-x-2">
              {currentLesson?.quiz?.questions?.length > 0 && (
                <button
                  onClick={() => {
                    if (quizState.attempts.length >= 3) {
                      alert("Maximum attempts reached...");
                    } else {
                      if (quizState.attempts.length > 0) {
                        prepareQuizRetake();
                      } else {
                        dispatch({ type: "SHOW_MODAL" });
                      }
                    }
                  }}
                  disabled={quizLoading || attemptsLeft <= 0}
                  className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base ${
                    quizState.attempts?.length >= 3
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  }`}
                >
                  {quizLoading
                    ? "Loading..."
                    : quizState.attempts.length > 0
                      ? `Retake Quiz (${attemptsLeft} left)`
                      : "Take Quiz"}
                </button>
              )}

              <button
                onClick={goToNextLesson}
                disabled={
                  isTransitioning ||
                  (currentLesson?.quiz?.questions?.length > 0 &&
                    (!quizState.completed || quizState.bestScore < 70)) || // Additional check
                  (currentLesson?.videoUrl && !videoCompleted)
                }
                className={`flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base ${
                  isTransitioning ||
                  (currentLesson?.quiz?.questions?.length > 0 &&
                    !quizState.completed) ||
                  (currentLesson?.videoUrl && !videoCompleted)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <span>{isLastLesson ? "Complete" : "Next"}</span>
                <FiChevronRight className="ml-1" />
              </button>
            </div>
          </div>
        </footer>
      </main>

      {quizState.showModal && (
        <Suspense fallback={<LoadingSpinner />}>
          <QuizModal
            currentQuiz={currentQuiz}
            currentQuestionIndex={quizState.currentIndex}
            selectedAnswers={quizState.selectedAnswers}
            answeredQuestions={quizState.answeredQuestions}
            quizAttempts={quizState.attempts}
            handleAnswerSelect={handleAnswerSelect}
            handlePreviousQuestion={() => dispatch({ type: "PREV_QUESTION" })}
            handleNextQuestion={() =>
              dispatch({
                type: "SELECT_ANSWER",
                payload: {
                  questionId: null,
                  optionId: null,
                  totalQuestions: currentQuiz.questions.length,
                },
              })
            }
            handleQuizSubmit={handleQuizSubmit}
            onClose={() => dispatch({ type: "HIDE_MODAL" })}
          />
        </Suspense>
      )}

      {quizState.completed && quizState.showReview && (
        <QuizReviewSection
          quizScore={quizState.score}
          bestScore={quizState.bestScore}
          quizAttempts={quizState.attempts}
          currentQuiz={currentQuiz}
          selectedAnswers={quizState.selectedAnswers}
          attemptsLeft={attemptsLeft}
          courseId={courseId}
          prepareQuizRetake={prepareQuizRetake}
          onClose={() => dispatch({ type: "HIDE_REVIEW" })}
        />
      )}
    </div>
  );
};

export default LearningPage;