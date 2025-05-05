import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiClock, FiCheckCircle, FiAlertCircle, FiChevronRight } from 'react-icons/fi';
import ProgressBar from '../../components/ProgressBar';
import { getRecommendedCourses } from "../../services/couseService";
import { Link } from "react-router-dom";
import { getAllUserEnrollments } from "../../services/enrollmentService";
import Button from "../../components/Button"

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState('in-progress');
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      // Run both functions concurrently using Promise.all
      const [courseData, enrollmentData] = await Promise.all([
        getRecommendedCourses(),  // Fetch user recommended courses
        getAllUserEnrollments(),  // Fetch user enrollments
      ]);
  
      // Once both are resolved, update the state with the data
      setRecommendedCourses(courseData || []); 
      setEnrollments(enrollmentData);  

      console.log("Enrolled Course: ", enrollments)

  
    } catch (error) {
      // Handle errors
      setError("Failed to load courses or enrolled courses");
    } finally {
      // Ensure loading is set to false after data is fetched
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData(); // Call the new fetchData function
  }, []);

  const filteredCourses = enrollments.filter(enrollment => 
    activeTab === 'in-progress' ? 
      (enrollment.status === 'NOT_STARTED' || enrollment.status === 'IN_PROGRESS' || enrollment.status === 'PAUSED') : 
      enrollment.status === 'completed'
  );

console.log(filteredCourses

)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>
My Learning        </title>
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          My Learning
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "in-progress"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "completed"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((enrollment) => (
            <div
              key={enrollment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={enrollment?.imageUrl}
                  alt={enrollment?.title}
                  className="w-full h-40 object-cover"
                />
                {enrollment?.status === "paused" && (
                  <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
                    Paused
                  </div>
                )}
                {enrollment?.status === "completed" && (
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                    Completed
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {enrollment?.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {enrollment?.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Instructor:{" "}
                  <span className="font-bold capitalize">
                    {enrollment?.instructor.first_name}{" "}
                    {enrollment?.instructor.last_name}
                  </span>
                </p>

                {enrollment.status !== "completed" && (
                  <>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">
                          Progress: {enrollment.progress}%
                        </span>
                        <span className="text-gray-500">
                          Last accessed: {enrollment.lastAccessed}
                        </span>
                      </div>
                      <ProgressBar value={enrollment.progress} />
                    </div>
                    <div className="flex items-center text-sm text-gray-700 mb-4">
                      <FiClock className="mr-2 text-gray-400" />
                      <span>Next: {enrollment.nextLesson}</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <Link
                    to={`/${enrollment.title}/${enrollment.courseId}/learn`}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    {enrollment.progress === undefined ||
                    enrollment.progress === null ||
                    enrollment.progress === 0
                      ? "Start Course"
                      : enrollment.status === "COMPLETED"
                        ? "View Certificate"
                        : "Continue Learning"}
                  </Link>

                  <button className="text-gray-500 hover:text-gray-700">
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FiBookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {activeTab === "in-progress"
              ? "No active courses"
              : "No completed courses"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === "in-progress"
              ? "Browse our catalog to find your next course"
              : "Complete some courses to see them here"}
          </p>
          <Button className="mt-6 inline-flex items-center px-4 !py-2 border border-transparent text-sm !rounded-md !shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Browse Courses
          </Button>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Recommended For You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={course.imageUrl}
                alt="Recommended course"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-md font-medium text-gray-900 mb-1">
                  {" "}
                  {course.title}
                </h3>
                {/* <p className="text-sm text-gray-500 mb-3 capitalize">{course.instructor.first_name} {course.instructor.last_name}</p> */}
                <Button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="inline-flex justify-center items-center px-4 !py-2 border border-gray-300 !shadow-sm text-sm !rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}