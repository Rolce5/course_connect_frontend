import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiBook,
  FiUsers,
  FiDollarSign,
  FiAward,
  FiBarChart2,
  FiPieChart
} from 'react-icons/fi';
import { getRecentEnrollments, getUserEnrollments } from '../../services/enrollmentService';
import { getStudents } from '../../services/studentService';
import { getAllCourses, getRecentCourses } from '../../services/couseService';
import { getProfile } from '../../services/userService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaBookOpen } from 'react-icons/fa';

const AdminDashboardPage = () => {
  const [recentEnrollments, setRecentEnrollments] = useState([])
  const [students, setStudents] = useState([]);
  const [profile, setProfile] = useState([]);
  const [courses, setCourses] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Use Promise.all to fetch all data simultaneously
      const [studentsData, coursesData, recentEnrollmentsData] = await Promise.all([
        getStudents(),          // Fetch students
        getAllCourses(),        // Fetch courses
        getRecentEnrollments()  // Fetch recent enrollments
      ]);
  
      // After all fetches are complete, update the state
      setStudents(studentsData);
      setCourses(coursesData);
  
      // Sort courses by createdAt in descending order and get the first 4
      const sortedCourses = coursesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
      setRecentCourses(sortedCourses);
  
      setRecentEnrollments(recentEnrollmentsData);
  
      // Logging to check results
      console.log("Students:", studentsData);
      console.log("Recent Courses:", sortedCourses);
      console.log("Recent Enrollments:", recentEnrollmentsData);
  
    } catch (error) {
      // Handle any error that occurs during the fetches
      setError("Failed to load data");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
    const upcomingEvents = [
    { id: 1, title: "Monthly Instructor Meeting", date: "2023-06-15", time: "10:00 AM" },
    { id: 2, title: "New Course Launch", date: "2023-06-20", time: "9:00 AM" },
    { id: 3, title: "Platform Maintenance", date: "2023-06-22", time: "2:00 AM" }
  ];
  if (isLoading) return <LoadingSpinner/>;

  return (
    <div>
      {/* Page title and actions */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
            Export
          </button>
          <Link to="/admin/courses/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Create Course
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Courses</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{courses.length}</p>
                <p className="mt-1 text-xs text-green-600">+12</p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-3"><FiBook className="text-blue-500" /> </div>
            </div>
          </div>
          <div
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Students</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{students.length}</p>
                <p className="mt-1 text-xs text-green-600">+8</p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-3"><FiUsers className="text-green-500" /></div>
            </div>
          </div>
          <div
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{courses.length}</p>
                <p className="mt-1 text-xs text-green-600">+23</p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-3"><FiDollarSign className="text-purple-500" /></div>
            </div>
          </div>
          <div
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Certificates</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{courses.length}</p>
                <p className="mt-1 text-xs text-green-600">+5</p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-3"><FiAward className="text-yellow-500" /></div>
            </div>
          </div>
      </div>

      {/* Charts and recent activity */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
            <div className="flex space-x-2">
              <button className="rounded-lg bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                Monthly
              </button>
              <button className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                Weekly
              </button>
            </div>
          </div>
          <div className="h-64">
            <div className="flex h-full items-center justify-center rounded-lg bg-gray-50">
              <div className="text-center">
                <FiBarChart2 className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Revenue chart will appear here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course distribution */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Course Distribution</h2>
          <div className="h-64">
            <div className="flex h-full items-center justify-center rounded-lg bg-gray-50">
              <div className="text-center">
                <FiPieChart className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Course distribution chart will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent courses and enrollments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent courses */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Courses</h2>
          </div>
          <div className="divide-y">
            {recentCourses.map((course) => (
              <div key={course.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {course.enrollments.length} students • {course.isActive === 'active' ? 'Published' : 'Draft'}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {course.progress}%
                  </span>
                </div>
                <div className="mt-3">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4 text-center">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all courses
            </button>
          </div>
        </div>

        {/* Recent enrollments */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Enrollments</h2>
          </div>
          <div className="divide-y">
            {recentEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{enrollment.user.first_name} {enrollment.user.last_name}</h3>
                      <p className="text-sm text-gray-500">{enrollment.course.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">  {new Date(enrollment.createdAt).toLocaleDateString('en-CA')}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        enrollment.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : enrollment.status === 'in progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4 text-center">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all enrollments
            </button>
          </div>
        </div>
      </div>


      {/* OTHER START */}

       {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Enrollment Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Enrollment Trends</h2>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              {/* <BsGraphUp size={48} className="mx-auto mb-2" /> */}
              <p>Enrollment chart will appear here</p>
            </div>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Platform Activity</h2>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              {/* <FiActivity size={48} className="mx-auto mb-2" /> */}
              <p>Activity chart will appear here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Courses</h2>
            <button className="text-indigo-600 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <FaBookOpen size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.instructor.first_name}{course.instructor.last_name}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.isActive === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {course.isActive ? 'Published' : "Draft"}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{course.enrollments.length} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <button className="text-indigo-600 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                  {/* <FaCalendarAlt size={18} /> */}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                </div>
                <button className="text-indigo-600 text-sm font-medium">Details</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OTHER END */}
    </div>
  );
};

export default AdminDashboardPage;
