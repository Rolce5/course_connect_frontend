// import { FiCheck, FiLock, FiArrowLeft } from "react-icons/fi";

// const LessonSidebar = ({
//   courseData,
//   currentLesson,
//   progress,
//   mobileSidebarOpen,
//   setMobileSidebarOpen,
//   isLessonAccessible,
//   isLessonCompleted,
//   goToLesson,
//   navigate,
// }) => {
//   return (
//     <aside
//       className={`
//         ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0 transform transition-transform duration-200 ease-in-out
//         fixed lg:static w-72 h-full bg-white border-r border-gray-200 z-30 overflow-y-auto
//       `}
//     >
//       <div className="p-4">
//         <div className="hidden lg:flex items-center mb-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-gray-600 hover:text-gray-800 mr-2"
//             aria-label="Go back"
//           >
//             <FiArrowLeft className="h-5 w-5" />
//           </button>
//           <h2 className="text-lg font-bold truncate">{courseData.title}</h2>
//         </div>

//         <div className="mb-6">
//           <div className="flex justify-between text-sm mb-1">
//             <span>Progress</span>
//             <span>{progress}%</span>
//           </div>
//           <div className="h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-full bg-green-500 rounded-full"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>

//         <nav className="space-y-4">
//           {courseData.modules.map((module) => (
//             <div key={module.id}>
//               <h3 className="px-2 py-1 font-medium text-gray-700">
//                 Module {module.order}: {module.title}
//               </h3>
//               <ul className="mt-1 space-y-1">
//                 {module.lessons.map((lesson) => {
//                   const isAccessible = isLessonAccessible(lesson.id);
//                   const isCompleted = isLessonCompleted(lesson.id);
//                   const isCurrent = currentLesson.id === lesson.id;
//                   const hasQuiz = lesson.quiz?.questions?.length > 0;

//                   return (
//                     <li key={lesson.id}>
//                       <button
//                         onClick={() => isAccessible && goToLesson(lesson)}
//                         disabled={!isAccessible}
//                         className={`
//                           w-full text-left px-3 py-2 text-sm rounded flex items-center
//                           ${
//                             isCurrent
//                               ? "bg-blue-50 text-blue-600 font-medium"
//                               : !isAccessible
//                                 ? "text-gray-400 cursor-not-allowed"
//                                 : "hover:bg-gray-100"
//                           }
//                         `}
//                       >
//                         <span className="w-6 text-center">
//                           {!isAccessible ? (
//                             <FiLock className="inline-block" />
//                           ) : (
//                             lesson.order
//                           )}
//                         </span>
//                         <span className="truncate">{lesson.title}</span>
//                         {hasQuiz && (
//                           <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
//                             Quiz
//                           </span>
//                         )}
//                         {isCompleted ? (
//                           <FiCheck className="ml-auto text-green-500" />
//                         ) : (
//                           isAccessible && (
//                             <span className="ml-auto text-xs text-gray-500">
//                               Available
//                             </span>
//                           )
//                         )}
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default LessonSidebar;
import { FiCheck, FiLock, FiArrowLeft } from "react-icons/fi";
import { memo } from "react";

const LessonSidebar = memo(
  ({
    courseData,
    currentLesson,
    enrollment,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    isLessonAccessible,
    isLessonCompleted,
    goToLesson,
    navigate,
  }) => {
    const progress = enrollment?.progress || 0;
    const isCourseCompleted = enrollment?.status === "COMPLETED";

    return (
      <aside
        className={`
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transform transition-transform duration-200 ease-in-out
        fixed lg:static w-72 h-full bg-white border-r border-gray-200 z-30 overflow-y-auto
      `}
      >
        <div className="p-4">
          <div className="hidden lg:flex items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800 mr-2"
              aria-label="Go back"
            >
              <FiArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-bold truncate">{courseData.title}</h2>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center text-sm mb-1">
              <span>Progress</span>
              <div className="flex items-center">
                <span className="mr-2">{progress}%</span>
                {isCourseCompleted && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                    Completed
                  </span>
                )}
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <nav className="space-y-4">
            {courseData.modules.map((module) => (
              <div key={module.id}>
                <h3 className="px-2 py-1 font-medium text-gray-700">
                  Module {module.order}: {module.title}
                </h3>
                <ul className="mt-1 space-y-1">
                  {module.lessons.map((lesson) => {
                    const isAccessible = isLessonAccessible(lesson.id);
                    const isCompleted = isLessonCompleted(lesson.id);
                    const isCurrent = currentLesson?.id === lesson.id;
                    const hasQuiz = lesson.quiz?.questions?.length > 0;

                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => isAccessible && goToLesson(lesson)}
                          disabled={!isAccessible}
                          className={`
                          w-full text-left px-3 py-2 text-sm rounded flex items-center
                          transition-colors duration-150
                          ${
                            isCurrent
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : !isAccessible
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-100 text-gray-700"
                          }
                          ${isCourseCompleted ? "!cursor-default" : ""}
                        `}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          <span className="w-6 text-center">
                            {!isAccessible && !isCourseCompleted ? (
                              <FiLock className="inline-block" />
                            ) : (
                              lesson.order
                            )}
                          </span>
                          <span className="truncate flex-1 text-left">
                            {lesson.title}
                          </span>
                          {hasQuiz && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                              Quiz
                            </span>
                          )}
                          {isCompleted ? (
                            <FiCheck className="ml-2 text-green-500 min-w-[20px]" />
                          ) : (
                            isAccessible &&
                            !isCourseCompleted && (
                              <span className="ml-2 text-xs text-gray-500">
                                Available
                              </span>
                            )
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
      </aside>
    );
  }
);

LessonSidebar.displayName = "LessonSidebar"; // Add display name for better debugging

export default LessonSidebar;