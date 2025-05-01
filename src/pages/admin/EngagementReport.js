import { FiUsers, FiBook, FiTrendingUp, FiDownload } from 'react-icons/fi';
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

export default function EngagementReports() {
  // Mock data
  const engagementData = [
    { name: 'Week 1', activeUsers: 4000, avgTime: 35 },
    { name: 'Week 2', activeUsers: 3000, avgTime: 28 },
    { name: 'Week 3', activeUsers: 5000, avgTime: 42 },
    { name: 'Week 4', activeUsers: 2780, avgTime: 31 },
    { name: 'Week 5', activeUsers: 1890, avgTime: 25 },
    { name: 'Week 6', activeUsers: 2390, avgTime: 38 },
  ];

  const courseEngagementData = [
    { name: 'Advanced React', enrolled: 124, active: 97, completionRate: 78 },
    { name: 'Python DS', enrolled: 98, active: 64, completionRate: 65 },
    { name: 'UI/UX', enrolled: 76, active: 62, completionRate: 82 },
    { name: 'Mobile Dev', enrolled: 112, active: 78, completionRate: 70 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Engagement Reports</h1>
          <p className="text-gray-500 mt-1">Track user activity and interaction metrics</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 md:mt-0">
          <FiDownload className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">12,845</p>
              <p className="text-sm text-green-600 mt-2">+5.8% from last period</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <FiUsers className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Time Spent</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">32 mins</p>
              <p className="text-sm text-green-600 mt-2">+2.4% from last period</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100 text-green-600">
              <FiBook className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Engagement Rate</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">68%</p>
              <p className="text-sm text-green-600 mt-2">+3.7% from last period</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
              <FiTrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Engagement Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Engagement</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="activeUsers" 
                  stroke="#6366F1" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  name="Active Users" 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  name="Avg Time (mins)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Course Engagement Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Course Engagement</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseEngagementData}>
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
                  dataKey="active" 
                  fill="#6366F1" 
                  name="Active Users" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6">
           <h2 className="text-lg font-medium text-gray-900 mb-4">Most Active Users</h2>
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     User
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Courses Enrolled
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Lessons Completed
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Time Spent
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Last Active
                   </th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 <tr>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                         <span className="text-indigo-600 font-medium">JD</span>
                       </div>
                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900">John Doe</div>
                         <div className="text-sm text-gray-500">john.doe@example.com</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     5
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     42
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     15h 30m
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     2 hours ago
                   </td>
                 </tr>
                 <tr>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                         <span className="text-green-600 font-medium">JS</span>
                       </div>
                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                         <div className="text-sm text-gray-500">jane.smith@example.com</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     3
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     28
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     9h 45m
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     1 day ago
                   </td>
                 </tr>
                 <tr>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                         <span className="text-purple-600 font-medium">RJ</span>
                       </div>
                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900">Robert Johnson</div>
                         <div className="text-sm text-gray-500">robert.j@example.com</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     7
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     56
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     22h 15m
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     3 hours ago
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
       </div>
    </div>
  );
}