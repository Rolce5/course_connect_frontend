import React from "react";
import { Helmet } from "react-helmet";
import {
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiStar,
} from "react-icons/fi";

const InstructorPerformancePage = () => {
  // Mock performance data
  const performanceData = [
    {
      id: 1,
      name: "Alex Johnson",
      courses: 8,
      students: 142,
      completionRate: 87,
      avgRating: 4.8,
      trend: "up",
    },
    // Add more mock data...
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Instructor Performance || CourseConnect</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Instructor Performance
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Instructors</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <FiUsers size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Rating</p>
                <p className="text-2xl font-bold">4.6</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FiStar size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Completion</p>
                <p className="text-2xl font-bold">82%</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FiBarChart2 size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Courses</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FiTrendingUp size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performanceData.map((instructor) => (
                  <tr key={instructor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {instructor.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {instructor.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {instructor.courses}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {instructor.students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${instructor.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs mt-1">
                        {instructor.completionRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {instructor.avgRating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {instructor.trend === "up" ? (
                        <div className="flex items-center text-green-500">
                          <FiTrendingUp className="mr-1" />
                          <span>Improving</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <FiTrendingDown className="mr-1" />
                          <span>Declining</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPerformancePage;
