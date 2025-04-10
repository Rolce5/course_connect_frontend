import React, { useEffect, useState } from "react";
import {
  FiBook,
  FiClock,
  FiAward,
  FiBarChart2,
  FiCheckCircle,
  FiPlayCircle,
  FiLock,
} from "react-icons/fi";
import { getAllCourses } from "../../services/couseService";
import { Link } from "react-router-dom";
import { getUserEnrollments } from "../../services/enrollmentService";

const DashboardPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      // Run both functions concurrently using Promise.all
      const [courseData, enrollmentData] = await Promise.all([
        getAllCourses(),  // Fetch all courses
        getUserEnrollments(),  // Fetch user enrollments
      ]);
  
      // Once both are resolved, update the state with the data
      setCourses(courseData || []);  // If courseData is undefined, default to empty array
      setEnrollments(enrollmentData);  // Set the enrollments
  
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

  const recommendedCourses = [
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Dr. Sarah Chen",
      rating: 4.8,
      students: 1245,
      category: "Data Science",
      image: "https://source.unsplash.com/random/300x200/?python",
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter",
      instructor: "Alex Johnson",
      rating: 4.6,
      students: 892,
      category: "Mobile Development",
      image: "https://source.unsplash.com/random/300x200/?flutter",
    },
    {
      id: 6,
      title: "DevOps Fundamentals",
      instructor: "Maria Garcia",
      rating: 4.7,
      students: 1567,
      category: "DevOps",
      image: "https://source.unsplash.com/random/300x200/?devops",
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      course: "Advanced React Development",
      task: "Final Project Submission",
      dueDate: "May 25, 2023",
      daysLeft: 3,
    },
    {
      id: 2,
      course: "UI/UX Design Fundamentals",
      task: "Portfolio Assignment",
      dueDate: "May 28, 2023",
      daysLeft: 6,
    },
    {
      id: 3,
      course: "Node.js Backend Mastery",
      task: "Module 3 Quiz",
      dueDate: "May 30, 2023",
      daysLeft: 8,
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, Alex!
        </h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Enrolled Courses
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{enrollments.length || 0}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <FiBook className="text-blue-500" />
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Hours Learned{" "}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">42 </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <FiClock className="text-green-500" />
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Certificates </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">3 </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <FiAward className="text-yellow-500" />
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                completion Rate{" "}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">78% </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <FiBarChart2 className="text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Current Courses
          </h2>
          <Link
            to="/courses"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-lg bg-white shadow-sm"
            >
              <Link to={`/courses/${course.id}`}>
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="h-40 w-full object-cover"
                />
              </Link>
              <div className="p-6">
                <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
                  {course.category}
                </span>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  {course.title}
                </h3>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-sm text-gray-600">
                    <span>Progress: {course.progress}%</span>
                    <span>
                      {course.lessonsCompleted}/{course.totalLessons} lessons
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                    Continue
                  </button>
                  <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <FiPlayCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Upcoming Deadlines */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming Deadlines
            </h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View Calendar
            </button>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="divide-y">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {deadline.task}
                      </h3>
                      <p className="text-sm text-gray-500">{deadline.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {deadline.dueDate}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          deadline.daysLeft <= 3
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {deadline.daysLeft}{" "}
                        {deadline.daysLeft === 1 ? "day" : "days"} left
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4 text-center">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all deadlines
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recommended For You
            </h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Browse All
            </button>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="divide-y">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="p-6">
                  <div className="flex space-x-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        By {course.instructor}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-yellow-500">
                          ★ {course.rating}
                        </span>
                        <span className="text-gray-500">
                          {course.students.toLocaleString()} students
                        </span>
                        <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                          {course.category}
                        </span>
                      </div>
                    </div>
                    <button className="self-center rounded-lg bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-100">
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Activity
          </h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View All Activity
          </button>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="divide-y">
            {/* Activity Item */}
            <div className="p-6">
              <div className="flex space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FiCheckCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    You completed{" "}
                    <span className="font-medium">
                      "State Management in React"
                    </span>{" "}
                    lesson
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Advanced React Development • 2 hours ago
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Item */}
            <div className="p-6">
              <div className="flex space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <FiPlayCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    You started{" "}
                    <span className="font-medium">"Design Principles"</span>{" "}
                    lesson
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    UI/UX Design Fundamentals • 5 hours ago
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Item */}
            <div className="p-6">
              <div className="flex space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <FiAward className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    You earned a certificate for{" "}
                    <span className="font-medium">
                      "JavaScript Fundamentals"
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Yesterday at 4:23 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
