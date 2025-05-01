import { useState } from 'react';
import { FiCheckCircle, FiDownload, FiCalendar, FiBook, FiAward, FiUsers } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line
} from 'recharts';

export default function CompletionReport() {
  const [timeRange, setTimeRange] = useState('monthly');

  // Mock data
  const monthlyCompletionData = [
    { name: 'Jan', started: 400, completed: 240, completionRate: 60 },
    { name: 'Feb', started: 300, completed: 139, completionRate: 46 },
    { name: 'Mar', started: 500, completed: 280, completionRate: 56 },
    { name: 'Apr', started: 278, completed: 190, completionRate: 68 },
    { name: 'May', started: 189, completed: 120, completionRate: 63 },
    { name: 'Jun', started: 239, completed: 150, completionRate: 63 },
    { name: 'Jul', started: 349, completed: 210, completionRate: 60 },
  ];

  const quarterlyCompletionData = [
    { name: 'Q1', started: 1200, completed: 659, completionRate: 55 },
    { name: 'Q2', started: 706, completed: 461, completionRate: 65 },
    { name: 'Q3', started: 800, completed: 500, completionRate: 63 },
    { name: 'Q4', started: 950, completed: 600, completionRate: 63 },
  ];

  const yearlyCompletionData = [
    { name: '2020', started: 2400, completed: 1500, completionRate: 63 },
    { name: '2021', started: 3600, completed: 2200, completionRate: 61 },
    { name: '2022', started: 4800, completed: 3000, completionRate: 63 },
    { name: '2023', started: 5200, completed: 3200, completionRate: 62 },
  ];

  const data = timeRange === 'monthly' ? monthlyCompletionData : 
               timeRange === 'quarterly' ? quarterlyCompletionData : 
               yearlyCompletionData;

  const courseCompletionData = [
    { name: 'Advanced React', started: 124, completed: 97, completionRate: 78 },
    { name: 'Python DS', started: 98, completed: 64, completionRate: 65 },
    { name: 'UI/UX', started: 76, completed: 62, completionRate: 82 },
    { name: 'Mobile Dev', started: 112, completed: 78, completionRate: 70 },
    { name: 'Business', started: 85, completed: 51, completionRate: 60 },
  ];

  const topCompleters = [
    { id: 1, name: 'Alex Johnson', completed: 12, lastCourse: 'Advanced React', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Sarah Williams', completed: 10, lastCourse: 'Data Science', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Michael Chen', completed: 9, lastCourse: 'UI/UX Design', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
    { id: 4, name: 'Emma Davis', completed: 8, lastCourse: 'Mobile Development', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
    { id: 5, name: 'David Kim', completed: 7, lastCourse: 'Business Analytics', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
  ];

   const completionData = [
    { name: 'Advanced React', enrolled: 124, completed: 97, completionRate: 78 },
    { name: 'Python DS', enrolled: 98, completed: 64, completionRate: 65 },
    { name: 'UI/UX', enrolled: 76, completed: 62, completionRate: 82 },
    { name: 'Mobile Dev', enrolled: 112, completed: 78, completionRate: 70 },
  ];

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8884d8'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Completion Report</h1>
          <p className="text-gray-500 mt-1">Track course completion and certification metrics</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
            <FiCalendar className="text-gray-500 mr-2" />
            <select
              className="bg-white text-sm focus:outline-none"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <FiDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Courses Started</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {data.reduce((sum, item) => sum + item.started, 0).toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-2">+8.2% from last period</p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
              <FiBook className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Courses Completed</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {data.reduce((sum, item) => sum + item.completed, 0).toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-2">+12.5% from last period</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100 text-green-600">
              <FiCheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Completion Rate</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {Math.round(data.reduce((sum, item) => sum + item.completionRate, 0) / data.length)}%
              </p>
              <p className="text-sm text-green-600 mt-2">+3.1% from last period</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
              <FiAward className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Completion Over Time Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Completion Rates Over Time</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="started" fill="#6366F1" name="Started" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="completed" fill="#A5B4FC" name="Completed" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="completionRate" stroke="#10B981" strokeWidth={2} name="Completion Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Course Completion Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Course Completion Breakdown</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseCompletionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="completionRate"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {courseCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Completion Rate"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Completers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Top Completers</h2>
            <div className="space-y-4">
              {topCompleters.map((user) => (
                <div key={user.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.lastCourse}</p>
                  </div>
                  <div className="flex items-center">
                    <FiAward className="text-yellow-500 mr-1" />
                    <span className="font-medium">{user.completed} courses</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View all completers →
            </button>
          </div>
        </div>
      </div>

      {/* Completion rate vs Enrollment */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Enrollment vs Completion</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="enrolled" 
                    fill="#A5B4FC" 
                    name="Enrolled" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="completed" 
                    fill="#6366F1" 
                    name="Completed" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
    </div>
  );
}