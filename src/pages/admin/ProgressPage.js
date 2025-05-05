import { useState } from 'react';
import { Helmet } from "react-helmet";
import { FiTrendingUp, FiSearch, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

export default function ProgressPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const students = [
    {
      id: 1,
      name: "John Doe",
      courses: [
        { name: "Advanced React", progress: 78, lastActivity: "2 days ago" },
        { name: "JavaScript Fundamentals", progress: 100, lastActivity: "1 week ago" }
      ],
      totalProgress: 89,
      avgTimeSpent: "45 min/day"
    },
    {
      id: 2,
      name: "Jane Smith",
      courses: [
        { name: "Python for Data Science", progress: 45, lastActivity: "1 day ago" },
        { name: "Machine Learning Basics", progress: 32, lastActivity: "3 days ago" }
      ],
      totalProgress: 39,
      avgTimeSpent: "30 min/day"
    },
    {
      id: 3,
      name: "Robert Johnson",
      courses: [
        { name: "UI/UX Fundamentals", progress: 100, lastActivity: "Completed" },
        { name: "Advanced Design", progress: 68, lastActivity: "5 hours ago" }
      ],
      totalProgress: 84,
      avgTimeSpent: "60 min/day"
    },
    {
      id: 4,
      name: "Emily Williams",
      courses: [
        { name: "Mobile App Development", progress: 12, lastActivity: "2 weeks ago" }
      ],
      totalProgress: 12,
      avgTimeSpent: "15 min/day"
    }
  ];

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const progressData = [
    { name: 'Week 1', activeStudents: 400, avgProgress: 25 },
    { name: 'Week 2', activeStudents: 300, avgProgress: 45 },
    { name: 'Week 3', activeStudents: 600, avgProgress: 60 },
    { name: 'Week 4', activeStudents: 500, avgProgress: 75 },
    { name: 'Week 5', activeStudents: 450, avgProgress: 85 },
  ];

  const progressBar = (progress) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Progress</title>
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          Student Progress
        </h1>
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>


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
            onClick={() => setActiveTab("detailed")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "detailed"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Detailed View
          </button>
        </nav>
      </div>

      {activeTab === "overview" ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                  <FiTrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Students
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      students.filter(
                        (s) => s.totalProgress > 0 && s.totalProgress < 100
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <FiTrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Average Progress
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {Math.round(
                      students.reduce(
                        (sum, student) => sum + student.totalProgress,
                        0
                      ) / students.length
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                  <FiTrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Completed Courses
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      students
                        .flatMap((s) => s.courses)
                        .filter((c) => c.progress === 100).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Weekly Progress Trends
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#4f46e5" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#10b981"
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="activeStudents"
                      stroke="#4f46e5"
                      name="Active Students"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avgProgress"
                      stroke="#10b981"
                      name="Avg Progress (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Course Completion Rates
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Advanced React",
                        enrolled: 124,
                        completed: 97,
                        completionRate: 78,
                      },
                      {
                        name: "Python DS",
                        enrolled: 98,
                        completed: 64,
                        completionRate: 65,
                      },
                      {
                        name: "UI/UX",
                        enrolled: 76,
                        completed: 62,
                        completionRate: 82,
                      },
                      {
                        name: "Mobile Dev",
                        enrolled: 112,
                        completed: 78,
                        completionRate: 70,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#4f46e5" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#10b981"
                      domain={[0, 100]}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="enrolled"
                      fill="#4f46e5"
                      name="Enrolled"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="completed"
                      fill="#8b5cf6"
                      name="Completed"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="completionRate"
                      stroke="#10b981"
                      name="Completion Rate (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Student Progress Details
            </h2>
            {filteredStudents.length > 0 ? (
              <div className="space-y-6">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{student.name}</h3>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-4">
                            Overall Progress: {student.totalProgress}%
                          </span>
                          <span className="text-sm text-gray-600">
                            Avg Time: {student.avgTimeSpent}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {student.courses.map((course, index) => (
                        <div key={index} className="px-6 py-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{course.name}</span>
                            <span className="text-sm text-gray-500">
                              Last activity: {course.lastActivity}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-full mr-4">
                              {progressBar(course.progress)}
                            </div>
                            <span className="text-sm font-medium">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FiTrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No students found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm
                    ? "Try a different search term"
                    : "No student progress data available"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}