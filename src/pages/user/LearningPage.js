// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FiCheck, FiX } from 'react-icons/fi';
// import { getCourseWithLessons } from '../../../services/couseService';
// import LoadingSpinner from '../../../components/LoadingSpinner';

// const LearningPage = () => {
//   const { courseId, lessonId } = useParams();
//   const [courseData, setCourseData] = useState([]);
//   const [currentLesson, setCurrentLesson] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const [notes, setNotes] = useState('');
//   const [showQuizModal, setShowQuizModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         const data = await getCourseWithLessons(courseId);
//         console.log(data); // Make sure this shows the structure of the course and lessons
//         setCourseData(data);
  
//         // Find the current lesson based on the lessonId from URL params
//         let lesson;
//         if (lessonId) {
//           lesson = data.flatMap((module) => module.lessons).find((lesson) => lesson.id === parseInt(lessonId));
//         } else {
//           // If no lessonId in URL, set the first lesson from the first module
//           lesson = data[0]?.lessons[0]; // Default to first lesson in the first module
//         }
  
//         if (lesson) {
//           setCurrentLesson(lesson);
//         }
//       } catch (error) {
//         console.error("Failed to fetch course MODULES:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourseData();
//   }, [courseId, lessonId]);
  
//   // useEffect(() => {
//   //   const fetchCourseData = async () => {
//   //     // Mock course data
//   //     const courseData = {
//   //       title: "React Basics",
//   //       modules: [
//   //         {
//   //           id: 1,
//   //           order: 1,
//   //           title: "Introduction to React",
//   //           lessons: [
//   //             {
//   //               id: 1,
//   //               order: 1,
//   //               title: "What is React?",
//   //               content: "<p>React is a JavaScript library for building user interfaces.</p>",
//   //               videoUrl: "https://www.example.com/video.mp4",
//   //               completed: false,
//   //               hasQuiz: false,
//   //             },
//   //             {
//   //               id: 2,
//   //               order: 2,
//   //               title: "React Components",
//   //               content: "<p>Components are the building blocks of React.</p>",
//   //               videoUrl: "https://www.example.com/video.mp4",
//   //               completed: false,
//   //               hasQuiz: false,
//   //             },
//   //           ],
//   //         },
//   //         {
//   //           id: 2,
//   //           order: 2,
//   //           title: "Advanced React",
//   //           lessons: [
//   //             {
//   //               id: 3,
//   //               order: 1,
//   //               title: "State and Lifecycle",
//   //               content: "<p>State and lifecycle are core concepts in React.</p>",
//   //               videoUrl: "https://www.example.com/video.mp4",
//   //               completed: false,
//   //               hasQuiz: false,
//   //             },
//   //           ],
//   //         },
//   //       ],
//   //       lessonsCount: 3,
//   //     };

//   //     const enrollment = {
//   //       progress: 33,
//   //     };

//   //     setCourse(courseData);
//   //     setProgress(enrollment.progress);

//   //     let lesson;
//   //     if (lessonId) {
//   //       lesson = courseData.modules
//   //         .flatMap((module) => module.lessons)
//   //         .find((l) => l.id === parseInt(lessonId));
//   //     } else {
//   //       const allLessons = courseData.modules.flatMap((module) => module.lessons);
//   //       lesson = allLessons.find((l) => !l.completed) || allLessons[allLessons.length - 1];
//   //     }

//   //     setCurrentLesson(lesson);

//   //     const lessonNotes = "These are some example notes for the lesson.";
//   //     setNotes(lessonNotes);

//   //     setLoading(false);
//   //   };

//   //   fetchCourseData();
//   // }, [courseId, lessonId]);

//   // const goToLesson = (lesson) => {
//   //   setCurrentLesson(lesson);
//   //   navigate(`/learn/${courseId}/lessons/${lesson.id}`);
//   // };

//   // const goToNextLesson = () => {
//   //   const allLessons = course.modules.flatMap((module) => module.lessons);
//   //   const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);

//   //   if (currentIndex < allLessons.length - 1) {
//   //     goToLesson(allLessons[currentIndex + 1]);
//   //   } else {
//   //     navigate(`/courses/${courseId}`);
//   //   }
//   // };

//   // const goToPreviousLesson = () => {
//   //   const allLessons = course.modules.flatMap((module) => module.lessons);
//   //   const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);

//   //   if (currentIndex > 0) {
//   //     goToLesson(allLessons[currentIndex - 1]);
//   //   }
//   // };

//   // const handleLessonComplete = async () => {
//   //   const newProgress = Math.min(progress + (100 / course.lessonsCount), 100);
//   //   setProgress(newProgress);
//   // };

//   // const handleNoteSave = async () => {
//   //   console.log("Notes saved:", notes);
//   // };

//   // const isLastLesson = () => {
//   //   const allLessons = course.modules.flatMap((module) => module.lessons);
//   //   return currentLesson.id === allLessons[allLessons.length - 1].id;
//   // };
//   const goToLesson = (lesson) => {
//     setCurrentLesson(lesson);
//     navigate(`/learn/${courseId}/lessons/${lesson.id}`);
//   };

//   const goToNextLesson = () => {
//     const allLessons = courseData.modules.flatMap((module) => module.lessons);
//     const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);

//     if (currentIndex < allLessons.length - 1) {
//       goToLesson(allLessons[currentIndex + 1]);
//     } else {
//       navigate(`/courses/${courseId}`);
//     }
//   };

//   const goToPreviousLesson = () => {
//     const allLessons = courseData.modules.flatMap((module) => module.lessons);
//     const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);

//     if (currentIndex > 0) {
//       goToLesson(allLessons[currentIndex - 1]);
//     }
//   };

//   const handleLessonComplete = async () => {
//     const newProgress = Math.min(progress + (100 / courseData.lessonsCount), 100);
//     setProgress(newProgress);
//   };

//   const handleNoteSave = async () => {
//     console.log("Notes saved:", notes);
//   };

//   const isLastLesson = () => {
//     const allLessons = courseData.modules.flatMap((module) => module.lessons);
//     return currentLesson.id === allLessons[allLessons.length - 1].id;
//   };

//   if (loading) return <LoadingSpinner />;
//   if (!courseData) return <div className="text-center py-20">Course  Modulenot found</div>;
//   // if (!currentLesson) return <div className="text-center py-20">Lesson not found</div>;

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Course Sidebar */}
//       <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-lg font-bold">{courseData.title}</h2>
//           <div className="mt-2">
//             <div className="h-2 bg-gray-200 rounded-full">
//               <div
//                 className="h-full bg-green-500 rounded-full"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               {Math.round(progress)}% complete
//             </p>
//           </div>
//         </div>

//         <nav className="p-2">
//           {courseData.modules.map((module) => (
//             <div key={module.id} className="mb-4">
//               <div className="px-2 py-1 font-medium text-gray-700">
//                 Module {module.order}: {module.title}
//               </div>
//               <ul className="mt-1">
//                 {module.lessons.map((lesson) => (
//                   <li key={lesson.id}>
//                     <button
//                       onClick={() => goToLesson(lesson)}
//                       className={`w-full text-left px-3 py-2 text-sm rounded flex items-center ${
//                         currentLesson.id === lesson.id
//                           ? 'bg-blue-50 text-blue-600'
//                           : 'hover:bg-gray-100'
//                       }`}
//                     >
//                       <span className="w-6 text-center text-gray-500">
//                         {lesson.order}
//                       </span>
//                       <span className="truncate">{lesson.title}</span>
//                       {lesson.completed && (
//                         <FiCheck className="ml-auto text-green-500" />
//                       )}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Lesson Content */}
//         <main className="flex-1 overflow-y-auto p-6 bg-white">
//           <div className="max-w-4xl mx-auto">
//             <h1 className="text-2xl font-bold mb-4">{currentLesson.title}</h1>

//             {currentLesson.videoUrl && (
//               <div className="mb-6 aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
//                 <video
//                   controls
//                   className="w-full"
//                   onEnded={handleLessonComplete}
//                 >
//                   <source src={currentLesson.videoUrl} type="video/mp4" />
//                 </video>
//               </div>
//             )}

//             <div
//               className="prose max-w-none mb-8"
//               dangerouslySetInnerHTML={{ __html: currentLesson.content }}
//             />

//             <div className="border-t border-gray-200 pt-6">
//               <h3 className="text-lg font-semibold mb-4">Your Notes</h3>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 placeholder="Write your notes here..."
//               />
//               <div className="flex justify-end mt-2">
//                 <button
//                   onClick={handleNoteSave}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Save Notes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* Lesson Navigation */}
//         <footer className="bg-white border-t border-gray-200 p-4">
//           <div className="max-w-4xl mx-auto flex justify-between">
//             <button
//               onClick={goToPreviousLesson}
//               className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
//             >
//               Previous
//             </button>

//             <div className="flex space-x-2">
//               {currentLesson.hasQuiz && (
//                 <button
//                   onClick={() => setShowQuizModal(true)}
//                   className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//                 >
//                   Take Quiz
//                 </button>
//               )}

//               <button
//                 onClick={goToNextLesson}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 {isLastLesson() ? 'Complete Course' : 'Next'}
//               </button>
//             </div>
//           </div>
//         </footer>
//       </div>

//       {/* Quiz Modal */}
//       {showQuizModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">Lesson Quiz</h2>
//               <button
//                 onClick={() => setShowQuizModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <FiX size={24} />
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-xl font-semibold mb-4">
//                   Question 1: What is React?
//                 </h3>
//                 <div className="space-y-3">
//                   {[
//                     "A JavaScript framework",
//                     "A JavaScript library for building user interfaces",
//                     "A programming language",
//                     "A database technology",
//                   ].map((answer, i) => (
//                     <div
//                       key={i}
//                       className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300"
//                     >
//                       {answer}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-semibold mb-4">
//                   Question 2: What are React hooks?
//                 </h3>
//                 <div className="space-y-3">
//                   {[
//                     "Functions that let you use state and other React features",
//                     "Special React components",
//                     "A way to style components",
//                     "A testing framework",
//                   ].map((answer, i) => (
//                     <div
//                       key={i}
//                       className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300"
//                     >
//                       {answer}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
//                 Submit Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LearningPage;



// // EXTENSIVE SIDEBAR UI

// // import { useState, useEffect } from 'react';
// // import { FiBook, FiCheckCircle, FiClock, FiAward, FiBarChart2, FiMenu } from 'react-icons/fi';
// // import { FaPlay, FaLock } from 'react-icons/fa';
// // import { Link } from 'react-router-dom';

// // const CourseLearningPage = () => {
// //   // Mock data
// //   const mockCourse = {
// //     id: '1',
// //     title: 'React for Beginners',
// //     modules: [
// //       {
// //         id: '101',
// //         order: 1,
// //         title: 'Module 1: Introduction to React',
// //         duration: '1h 30m',
// //         lessons: [
// //           { id: '201', title: 'Lesson 1: Getting Started with React', duration: '15m', completed: true, hasQuiz: true },
// //           { id: '202', title: 'Lesson 2: React Components', duration: '20m', completed: false, hasQuiz: false },
// //         ]
// //       },
// //       {
// //         id: '102',
// //         order: 2,
// //         title: 'Module 2: React Advanced Topics',
// //         duration: '2h 15m',
// //         lessons: [
// //           { id: '203', title: 'Lesson 3: State and Lifecycle', duration: '30m', completed: false, hasQuiz: false },
// //           { id: '204', title: 'Lesson 4: React Hooks', duration: '45m', completed: false, hasQuiz: true },
// //         ]
// //       }
// //     ]
// //   };

// //   const mockProgress = 45;  // Mock progress percentage
// //   const mockTimeSpent = '2h 45m';  // Mock time spent on the course
// //   const mockLastActivity = 'Lesson 3';  // Mock last completed activity

// //   const [sidebarOpen, setSidebarOpen] = useState(true);

// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       {/* Mobile Sidebar Toggle */}
// //       <button 
// //         onClick={() => setSidebarOpen(!sidebarOpen)}
// //         className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
// //       >
// //         <FiMenu className="w-6 h-6" />
// //       </button>

// //       {/* Sidebar */}
// //       <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
// //           md:translate-x-0 transform transition-transform duration-200 ease-in-out 
// //           fixed md:static w-80 h-full bg-white border-r border-gray-200 z-40 overflow-y-auto`}>
        
// //         <div className="p-6">
// //           <h2 className="text-xl font-bold flex items-center gap-2">
// //             <FiBook /> {mockCourse.title}
// //           </h2>
// //           <div className="mt-6">
// //             <div className="flex justify-between items-center mb-2">
// //               <span className="text-sm font-medium">Progress</span>
// //               <span className="text-sm font-bold">{mockProgress}%</span>
// //             </div>
// //             <div className="w-full bg-gray-200 rounded-full h-2.5">
// //               <div 
// //                 className="bg-green-600 h-2.5 rounded-full" 
// //                 style={{ width: `${mockProgress}%` }}
// //               ></div>
// //             </div>
// //           </div>
// //         </div>

// //         <nav className="px-4 pb-6">
// //           {mockCourse.modules.map((module) => (
// //             <div key={module.id} className="mb-6">
// //               <h3 className="font-medium text-gray-900 flex items-center gap-2 mb-2">
// //                 <FiCheckCircle className="text-green-500" />
// //                 Module {module.order}: {module.title}
// //                 <span className="text-xs text-gray-500 ml-auto">{module.duration}</span>
// //               </h3>
// //               <ul className="space-y-1 pl-6">
// //                 {module.lessons.map((lesson) => (
// //                   <li key={lesson.id}>
// //                     <Link
// //                       to={`/learn/${mockCourse.id}/lessons/${lesson.id}`}
// //                       className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm ${
// //                         lesson.completed 
// //                           ? 'text-green-600 bg-green-50' 
// //                           : 'text-gray-700 hover:bg-gray-100'
// //                       }`}
// //                     >
// //                       {lesson.completed ? (
// //                         <FiCheckCircle className="text-green-500" />
// //                       ) : (
// //                         <FaPlay className="text-blue-500 text-xs" />
// //                       )}
// //                       {lesson.title}
// //                       <span className="text-xs text-gray-500 ml-auto">{lesson.duration}</span>
// //                       {lesson.hasQuiz && (
// //                         <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
// //                           Quiz
// //                         </span>
// //                       )}
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </nav>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 overflow-y-auto">
// //         <div className="max-w-4xl mx-auto p-6">
// //           <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
// //             <h1 className="text-2xl font-bold mb-4">Welcome back to {mockCourse.title}</h1>
            
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //               <div className="bg-blue-50 p-4 rounded-lg">
// //                 <div className="flex items-center gap-3">
// //                   <div className="bg-blue-100 p-2 rounded-full">
// //                     <FiClock className="text-blue-600" />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-gray-600">Time Spent</p>
// //                     <p className="font-bold">{mockTimeSpent}</p>
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="bg-purple-50 p-4 rounded-lg">
// //                 <div className="flex items-center gap-3">
// //                   <div className="bg-purple-100 p-2 rounded-full">
// //                     <FiBarChart2 className="text-purple-600" />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-gray-600">Completion</p>
// //                     <p className="font-bold">{mockProgress}%</p>
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="bg-green-50 p-4 rounded-lg">
// //                 <div className="flex items-center gap-3">
// //                   <div className="bg-green-100 p-2 rounded-full">
// //                     <FiAward className="text-green-600" />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-gray-600">Last Activity</p>
// //                     <p className="font-bold">{mockLastActivity}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="border-t pt-4">
// //               <h3 className="font-medium mb-3">Recommended Next</h3>
// //               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// //                 <div className="flex justify-between items-center">
// //                   <div>
// //                     <h4 className="font-medium">State and Lifecycle</h4>
// //                     <p className="text-sm text-gray-600">Module 1 • 30 min</p>
// //                   </div>
// //                   <Link
// //                     to={`/learn/${mockCourse.id}/lessons/4`}
// //                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
// //                   >
// //                     <FaPlay className="text-xs" /> Continue
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseLearningPage;


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck, FiX } from 'react-icons/fi';
import { 
  getCourseWithLessons,
  getEnrollment, 
} from '../../services/couseService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getUserEnrollments, updateEnrollmentProgress } from '../../services/enrollmentService';
import { checkPaymentStatus } from '../../services/paymentService';

const LearningPage = () => {
  const { courseId } = useParams(); // Removed lessonId from params
  const [courseData, setCourseData] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [enrollment, setEnrollment] = useState(null);
  const navigate = useNavigate();

  // Add this check before allowing access to course content
useEffect(() => {
  const verifyAccess = async () => {
    if (courseData?.pricing > 0) {
      const payment = await checkPaymentStatus(courseId);
      if (!payment) {
        navigate(`/payment/${courseId}?redirect=/learn/${courseId}`);
      }
    }
  };
  verifyAccess();
}, [courseId, courseData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch course data
        const course = await getCourseWithLessons(courseId);
        setCourseData(course);
        
        // Fetch user's enrollment for this course
        const enrollmentData = await getUserEnrollments(courseId);
        setEnrollment(enrollmentData);
        setProgress(enrollmentData.progress);
        
        // Determine which lesson to show
        let targetLesson;
        const allLessons = course.modules.flatMap(module => module.lessons);
        
        if (enrollmentData?.lastLessonId) {
          // If enrollment has lastLessonId, use that
          targetLesson = allLessons.find(l => l.id === enrollmentData.lastLessonId);
        } else {
          // Default to first lesson of first module
          targetLesson = course.modules[0]?.lessons[0];
        }
        
        if (!targetLesson) {
          throw new Error("No lessons found in course");
        }
        
        setCurrentLesson(targetLesson);
      } catch (error) {
        console.error("Error loading course data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [courseId]); // Removed lessonId dependency

  const updateProgress = async (newLessonId) => {
    if (!courseData || !enrollment) return;
    
    const allLessons = courseData.modules.flatMap(module => module.lessons);
    const totalLessons = allLessons.length;
    const currentIndex = allLessons.findIndex(l => l.id === newLessonId);
    const newProgress = Math.round(((currentIndex + 1) / totalLessons) * 100);
    
    try {
      const updatedEnrollment = await updateEnrollmentProgress({
        enrollmentId: enrollment.id,
        lastLessonId: newLessonId,
        progress: newProgress
      });
      console.log("working")
      setEnrollment(updatedEnrollment);
      setProgress(updatedEnrollment.progress);
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const goToLesson = async (lesson) => {
    setCurrentLesson(lesson);
    await updateProgress(lesson.id);
  };

  const goToNextLesson = async () => {
    if (!courseData) return;
    
    const allLessons = courseData.modules.flatMap(module => module.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      await goToLesson(nextLesson);
    } else {
      // Course completed
      try {
        // const updatedEnrollment = await updateEnrollmentProgress({
        //   enrollmentId: enrollment.id,
        //   lastLessonId: currentLesson.id,
        //   progress: 100,
        //   completed: true
        // });
        // setEnrollment(updatedEnrollment);
        // setProgress(100);
        // navigate(`/courses/${courseId}/complete`);
        console.log("working")

      } catch (error) {
        console.error("Failed to complete course:", error);
      }
    }
  };

  const goToPreviousLesson = async () => {
    if (!courseData) return;
    
    const allLessons = courseData.modules.flatMap(module => module.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      await goToLesson(prevLesson);
    }
  };

  const handleLessonComplete = async () => {
    await updateProgress(currentLesson.id);
  };

  const handleNoteSave = async () => {
    console.log("Notes saved:", notes);
    // Here you would typically save notes to the backend
  };

  const isLastLesson = () => {
    if (!courseData) return false;
    const allLessons = courseData.modules.flatMap(module => module.lessons);
    return currentLesson.id === allLessons[allLessons.length - 1].id;
  };

  if (loading) return <LoadingSpinner />;
  if (!courseData) return <div className="text-center py-20">Course not found</div>;
  if (!currentLesson) return <div className="text-center py-20">Lesson not found</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Course Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">{courseData.title}</h2>
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {progress}% complete
            </p>
          </div>
        </div>

        <nav className="p-2">
          {courseData.modules.map((module) => (
            <div key={module.id} className="mb-4">
              <div className="px-2 py-1 font-medium text-gray-700">
                Module {module.order}: {module.title}
              </div>
              <ul className="mt-1">
                {module.lessons.map((lesson) => {
                  const allLessons = courseData.modules.flatMap(m => m.lessons);
                  const lessonIndex = allLessons.findIndex(l => l.id === lesson.id);
                  const lessonProgress = Math.round(((lessonIndex + 1) / allLessons.length) * 100);
                  const isCompleted = progress >= lessonProgress;
                  
                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => goToLesson(lesson)}
                        className={`w-full text-left px-3 py-2 text-sm rounded flex items-center ${
                          currentLesson.id === lesson.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span className="w-6 text-center text-gray-500">
                          {lesson.order}
                        </span>
                        <span className="truncate">{lesson.title}</span>
                        {isCompleted && (
                          <FiCheck className="ml-auto text-green-500" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Lesson Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{currentLesson.title}</h1>

            {currentLesson.videoUrl && (
              <div className="mb-6 aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full"
                  onEnded={handleLessonComplete}
                  autoPlay 
                >
                  <source src={currentLesson.videoUrl} type="video/mp4" />
                </video>
              </div>
            )}

            <div
              className="prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            />

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Your Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Write your notes here..."
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleNoteSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Lesson Navigation */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex justify-between">
            <button
              onClick={goToPreviousLesson}
              disabled={!courseData?.modules[0]?.lessons[0] || 
                       currentLesson.id === courseData.modules[0].lessons[0].id}
              className={`px-4 py-2 rounded-lg ${
                (!courseData?.modules[0]?.lessons[0] || 
                 currentLesson.id === courseData.modules[0].lessons[0].id)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {currentLesson.hasQuiz && (
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Take Quiz
                </button>
              )}

              <button
                onClick={goToNextLesson}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isLastLesson() ? 'Complete Course' : 'Next'}
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Quiz Modal - remains the same */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            {/* ... existing quiz modal content ... */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage;
