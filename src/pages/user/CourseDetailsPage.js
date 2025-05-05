import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { FaStar, FaUser, FaClock, FaCheck } from "react-icons/fa";
import {
  FiPlayCircle,
  FiFileText,
  FiAward,
  FiCheck,
  FiPlay,
  FiDownload,
  FiSmartphone,
  FiStar,
  FiUsers,
  FiBook,
  FiSearch,
  FiLock,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import {
  enrollInCourse,
  getAllUserEnrollments,
} from "../../services/enrollmentService";
import { getCourseWithLessons } from "../../services/couseService";
import {
  checkPaymentStatus,
  processPayment,
} from "../../services/paymentService";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";

const StudentCourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessonCount, setLessonCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const [courseData, enrollments] = await Promise.all([
          getCourseWithLessons(courseId),
          getAllUserEnrollments(),
        ]);

        // Count the lessons
        const totalLessons = courseData.modules.reduce(
          (acc, module) => acc + module.lessons.length,
          0
        );
        setLessonCount(totalLessons);

        setCourse(courseData);
        setIsEnrolled(
          enrollments.some((e) => e.courseId === parseInt(courseId))
        );
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);


const handleEnroll = async () => {
  setIsEnrolling(true);
  try {
    if (course.pricing > 0) {
      // Paid course - initiate payment
      const res = await processPayment(courseId);
      console.log("Payment initiation response:", res);

      if (res?.link) {
        // Store transaction ID before redirecting
        localStorage.setItem('currentTransaction', res.transactionId);
        
        // Redirect to Fapshi (not in new tab)
        window.location.href = res.link;
      } else {
        toast.error("Failed to initiate payment.");
      }
    } else {
      // Free course - direct enrollment
      await enrollInCourse(courseId);
      setIsEnrolled(true);
      toast.success("Enrolled successfully!");
    }
  } catch (error) {
    console.error("Enrollment/payment failed:", error);
    toast.error(error?.response?.data?.message || "Enrollment failed");
  } finally {
    setIsEnrolling(false);
  }
};

// Add this useEffect to check payment status when page loads
// useEffect(() => {
//   const checkPaymentStatus = async () => {
//     const transactionId = localStorage.getItem('currentTransaction');
//     if (transactionId) {
//       try {
//         const verification = await checkPaymentStatus(transactionId);
//         console.log("Payment verification result:", verification);
        
//         if (verification.success) {
//           setIsEnrolled(true);
//           toast.success("Payment successful! You're now enrolled.");
//           localStorage.removeItem('currentTransaction');
//         }
//       } catch (error) {
//         console.error("Payment verification failed:", error);
//       }
//     }
//   };

//   checkPaymentStatus();
// }, [localStorage.getItem('currentTransaction')]);




  if (loading) return <LoadingSpinner />;
  if (!course) return <div className="text-center py-20">Course not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Course Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-500">{course.category}</span>
                <span>•</span>
                <span className="text-sm text-gray-500">
                  {course.difficulty}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {course.title}
              </h1>
              <div
                className="text-lg text-gray-600 mb-6"
                dangerouslySetInnerHTML={{
                  __html: course.description,
                }}
              />

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  {/* <span className="font-medium">{course.rating.toFixed(1)}</span> */}
                  {/* <span className="text-gray-500 ml-1">({course.reviews} reviews)</span> */}
                </div>
                <div className="flex items-center">
                  <FaUser className="text-gray-400 mr-1" />
                  <span className="text-gray-500">
                    {course.enrollments.length}{" "}
                    {course.enrollments.length === 1 ? "student" : "students"}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-gray-400 mr-1" />
                  <span className="text-gray-500">{course.duration} hours</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={
                    course.instructor?.profilePic ||
                    "https://www.gravatar.com/avatar/?d=mp&s=200'"
                  }
                  alt={course.instructor?.first_name || "John Doe"}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-500">Created by</p>
                  <p className="font-medium">
                    {course.instructor?.first_name}{" "}
                    {course.instructor?.last_name}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-4">
                <div className="mb-4">
                  {course.imageUrl && (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full rounded-lg mb-4"
                    />
                  )}

                  {isEnrolled ? (
                    <button
                      onClick={() =>
                        navigate(`/${course.title}/${courseId}/learn`)
                      }
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-4 px-6 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <FiPlayCircle className="w-5 h-5" />
                        Continue Learning
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full ml-2">
                          {course.progressPercentage || 0}% complete
                        </span>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  ) : (
                    <>
                      <div className="mb-4">
                        {course.pricing ? (
                          <div className="text-center">
                            <span className="text-3xl font-bold">
                              ${course.pricing}
                            </span>
                            {course.originalPrice && (
                              <span className="text-gray-500 line-through ml-2">
                                ${course.originalPrice}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="text-center text-2xl font-bold text-green-600">
                            Free
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={handleEnroll}
                        disabled={isEnrolling}
                        className={` py-3 text-white rounded-lg mb-3 transition-colors disabled:opacity-50 flex items-center justify-center ${
                          isEnrolling
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {isEnrolling ? (
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
                            please wait...
                          </>
                        ) : (
                          <div> Enroll Now</div>
                        )}
                      </Button>
                    </>
                  )}

                  <div className="text-center text-sm text-gray-500">
                    30-day money-back guarantee
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <FiPlayCircle className="text-gray-400 mr-2" />
                    <span>{lessonCount} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <FiFileText className="text-gray-400 mr-2" />
                    <span>{course.quizzesCount} quizzes</span>
                  </div>
                  <div className="flex items-center">
                    <FiAward className="text-gray-400 mr-2" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "curriculum"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setActiveTab("instructor")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "instructor"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Instructor
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: course.description,
                  }}
                />

                {course.learningOutcomes > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mt-8 mb-4">
                      What You'll Learn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.learningOutcomes?.map((outcome, index) => (
                        <div key={index} className="flex items-start">
                          <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {course.requirements > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mt-8 mb-4">
                      Requirements
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {course.requirements?.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "curriculum" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {course.modules?.map((module, moduleIndex) => (
                    <div
                      key={module.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                        <h3 className="font-medium">
                          Module {moduleIndex + 1}: {module.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {module.lessons.length} lessons • {module.duration}
                        </span>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {module.lessons?.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="px-4 py-3 flex items-center"
                          >
                            <div className="flex items-center mr-4">
                              <FiPlayCircle className="text-gray-400 mr-2" />
                              <span className="text-sm text-gray-500 w-8">
                                {lessonIndex + 1}
                              </span>
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-sm font-medium">
                                {lesson.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {lesson.duration}
                              </p>
                            </div>
                            {isEnrolled ? (
                              <button
                                onClick={() =>
                                  navigate(`/${course.title}/${courseId}/learn`)
                                }
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Start
                              </button>
                            ) : (
                              <FiLock className="text-gray-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "instructor" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  About the Instructor
                </h2>
                <div className="flex items-start space-x-6">
                  <img
                    src={
                      course.instructor.profilePic ||
                      "https://www.gravatar.com/avatar/?d=mp&s=200'"
                    }
                    alt={course.instructor.first_name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold">
                      {`${course.instructor.first_name} ${course.instructor.last_name}`}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {course.instructor.title}
                    </p>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span>
                          {course.instructor?.rating || "4.8"} Instructor Rating
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiUsers className="text-gray-400 mr-1" />
                        <span>
                          {course.numberOfStudents}{" "}
                          {course.numberOfStudents == 1
                            ? "Student"
                            : "Students"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiBook className="text-gray-400 mr-1" />
                        <span>{course.instructorCourses} Courses</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                <div className="space-y-6">
                  {course.reviews?.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6"
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-medium">{review.user.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`${i < review.rating ? "text-yellow-400" : "text-gray-300"} mr-1`}
                                size={14}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 ml-auto">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="font-bold text-lg mb-4">This Course Includes</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiPlay className="text-blue-500 mr-2" />
                  <span>{course.totalHours} hours on-demand video</span>
                </li>
                <li className="flex items-center">
                  <FiDownload className="text-blue-500 mr-2" />
                  <span>{course.resourcesCount} downloadable resources</span>
                </li>
                <li className="flex items-center">
                  <FiSmartphone className="text-blue-500 mr-2" />
                  <span>Access on mobile and TV</span>
                </li>
                <li className="flex items-center">
                  <FiAward className="text-blue-500 mr-2" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDetailPage;
