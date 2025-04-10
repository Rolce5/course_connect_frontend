import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiEdit2,
  FiBookOpen,
  FiClock,
  FiUsers,
  FiDollarSign,
  FiArrowLeft,
  FiAward,
  FiBarChart2,
  FiList,
  FiCheckCircle,
  FiStar,
  FiPlus,
} from "react-icons/fi";
import { getCourseById } from "../../services/couseService";
import CourseStatusBadge from "../../components/CourseStatusBadge";
import ProgressBar from "../../components/ProgressBar";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function CourseDetailsPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
        navigate("/admin/courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (isLoading) return <LoadingSpinner />;

  if (!course)
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          Course not found
        </h2>
        <button
          onClick={() => navigate("/admin/courses")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Courses
        </button>
      </div>
    );

  // Calculate average rating
  const averageRating =
    course.reviews?.length > 0
      ? course.reviews.reduce((sum, review) => sum + review.rating, 0) /
        course.reviews.length
      : 0;

  // Calculate total lessons across all modules
  const totalLessons =
    course.modules?.reduce(
      (sum, module) => sum + (module.lessons?.length || 0),
      0
    ) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/courses")}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4"
        >
          <FiArrowLeft className="mr-1" /> Back to Courses
        </button>
        <CourseStatusBadge isActive={course.isActive} />
      </div>

      {/* Course header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50 p-6 flex items-center justify-center">
            {course.imageUrl ? (
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                <FiBookOpen className="text-indigo-300 text-5xl" />
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h1>
                <p className="text-gray-600 mb-4">{course.shortDescription}</p>
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="text-gray-700 font-medium">
                      {averageRating.toFixed(1)} ({course.reviewsCount || 0}{" "}
                      reviews)
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {course.difficulty}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                    {course.category.replace("_", " ")}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/admin/courses/${courseId}/edit`}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiEdit2 className="mr-2" /> Edit
                </Link>
                <Link
                  to={`/admin/courses/${courseId}/modules`}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Manage Content
                </Link>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FiClock className="text-indigo-500 mr-2" />
                  <span className="text-sm text-gray-500">Total Hours</span>
                </div>
                <p className="text-lg font-semibold mt-1">
                  {course.totalHours} hours
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FiUsers className="text-indigo-500 mr-2" />
                  <span className="text-sm text-gray-500">Students</span>
                </div>
                <p className="text-lg font-semibold mt-1">
                  {course.enrollments?.length || 0}
                </p>
              </div>

              {/* <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FiBookOpen className="text-indigo-500 mr-2" />
                  <span className="text-sm text-gray-500">Lessons</span>
                </div>
                <p className="text-lg font-semibold mt-1">{totalLessons}</p>
              </div> */}
              <Link
                to={`/admin/courses/${courseId}/modules`}
                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiBookOpen className="text-indigo-500 mr-2" />
                    <span className="text-sm text-gray-500">Content</span>
                  </div>
                  <span className="text-xs text-indigo-600 opacity-0 group-hover:opacity-100 transition">
                    Manage →
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <div>
                    <p className="text-lg font-semibold">
                      {course.modules?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500">Modules</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{totalLessons}</p>
                    <p className="text-xs text-gray-500">Lessons</p>
                  </div>
                </div>
              </Link>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FiDollarSign className="text-indigo-500 mr-2" />
                  <span className="text-sm text-gray-500">Price</span>
                </div>
                <p className="text-lg font-semibold mt-1">
                  {course.pricing ? (
                    <>
                      <span className="text-indigo-600">${course.pricing}</span>
                      {course.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${course.originalPrice}
                        </span>
                      )}
                    </>
                  ) : (
                    "Free"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "content"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab("outcomes")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "outcomes"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Learning Outcomes
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "analytics"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {activeTab === "overview" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700 mb-6">{course.description}</p>

                <h3 className="text-lg font-medium mb-2">Instructor</h3>
                <div className="flex items-center mb-6">
                  {course.instructor.profilePic ? (
                    <img
                      src={course.instructor.profilePic}
                      alt={course.instructor.first_name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-medium">
                        {course.instructor.first_name.charAt(0)}
                        {course.instructor.last_name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">
                      {course.instructor.first_name}{" "}
                      {course.instructor.last_name}
                      {course.instructor.title &&
                        `, ${course.instructor.title}`}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Rating: {course.instructor.rating?.toFixed(1) || "N/A"} •{" "}
                      {course.instructor.students || 0} students
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-6">
                  {course.requirements?.length > 0 ? (
                    course.requirements.map((req, index) => (
                      <li key={index}>{req.text}</li>
                    ))
                  ) : (
                    <li>No specific requirements</li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Course Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Completion Rate
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {Math.round(
                          course.enrollments?.reduce(
                            (acc, curr) => acc + curr.progress,
                            0
                          ) / (course.enrollments?.length || 1)
                        )}
                        %
                      </span>
                    </div>
                    <ProgressBar
                      value={
                        course.enrollments?.reduce(
                          (acc, curr) => acc + curr.progress,
                          0
                        ) / (course.enrollments?.length || 1)
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Certificates Issued
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {course.certificates?.length || 0}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, ((course.certificates?.length || 0) / (course.enrollments?.length || 1)) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Course Duration
                    </h4>
                    <p className="text-gray-600">{course.duration} weeks</p>
                  </div>

                  {course.videoUrl && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Preview Video
                      </h4>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={course.videoUrl}
                          className="w-full h-48 rounded-lg"
                          title="Course preview"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {activeTab === 'content' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
            <div className="space-y-4">
              {course.modules?.length > 0 ? (
                course.modules.sort((a, b) => a.order - b.order).map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-medium">{module.title}</h3>
                      <span className="text-sm text-gray-600">{module.duration}</span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {module.lessons?.length > 0 ? (
                        module.lessons.sort((a, b) => a.order - b.order).map((lesson) => (
                          <div key={lesson.id} className="px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FiCheckCircle className="text-green-500 mr-3" />
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-600">{lesson.duration} min</span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-500">No lessons in this module</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No modules have been added to this course yet
                </div>
              )}
            </div>
          </div>
        )} */}
        {activeTab === "content" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Course Content
              </h2>
              <Link
                to={`/admin/courses/${courseId}/modules`}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiEdit2 className="mr-2" /> Manage Content
              </Link>
            </div>

            <div className="space-y-6">
              {course.modules?.length > 0 ? (
                course.modules
                  .sort((a, b) => a.order - b.order)
                  .map((module) => (
                    <div
                      key={module.id}
                      className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-md"
                    >
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <span className="text-indigo-600 font-medium">
                              {module.order}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              {module.title}
                            </h3>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span className="flex items-center">
                                <FiClock className="mr-1" /> {module.duration}
                              </span>
                              <span className="flex items-center">
                                <FiBookOpen className="mr-1" />{" "}
                                {module.lessons?.length || 0} lessons
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {module.lessons?.length > 0 ? (
                          module.lessons
                            .sort((a, b) => a.order - b.order)
                            .map((lesson) => (
                              <div
                                key={lesson.id}
                                className="px-6 py-4 flex items-center hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-4">
                                  <FiCheckCircle className="text-green-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {lesson.title}
                                  </h4>
                                  <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <FiClock className="mr-1" />
                                    <span>{lesson.duration} min</span>
                                    {lesson.videoUrl && (
                                      <span className="ml-3 flex items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 mr-1"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                          />
                                        </svg>
                                        Video
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Lesson {lesson.order}
                                  </span>
                                </div>
                              </div>
                            ))
                        ) : (
                          <div className="px-6 py-4 text-center text-gray-500">
                            No lessons in this module
                          </div>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                    <FiBookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No modules yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add your first module to start building course content
                  </p>
                  <Link
                    to={`/admin/courses/${courseId}/modules/new`}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Add Module
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "outcomes" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.learningOutcomes?.length > 0 ? (
                course.learningOutcomes.map((outcome, index) => (
                  <div key={outcome.id} className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>{outcome.text}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">
                  No learning outcomes specified
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Course Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 flex items-center">
                  <FiUsers className="mr-2" /> Enrollment Stats
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Total Enrollments</span>
                      <span className="font-medium">
                        {course.enrollments?.length || 0}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Active Students</span>
                      <span className="font-medium">
                        {course.enrollments?.filter(
                          (e) => e.progress > 0 && e.progress < 100
                        ).length || 0}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-medium">
                        {course.enrollments?.filter((e) => e.progress === 100)
                          .length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 flex items-center">
                  <FiStar className="mr-2" /> Reviews
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="text-2xl font-bold mr-3">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            className={`${star <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"} mr-1`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        {course.reviews?.length || 0} reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <h3 className="font-medium mb-3 flex items-center">
                  <FiBarChart2 className="mr-2" /> Revenue
                </h3>
                {course.payments?.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Total Revenue
                      </span>
                      <span className="font-medium">
                        $
                        {course.payments
                          .reduce((sum, payment) => sum + payment.amount, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Completed Payments
                      </span>
                      <span className="font-medium">
                        {
                          course.payments.filter(
                            (p) => p.status === "completed"
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">No payment data available</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
