import { useState } from 'react';
import { Helmet } from "react-helmet";
import { FiBarChart2, FiDollarSign, FiUsers, FiCheckCircle, FiDownload, FiTrendingUp, FiBook, FiAward } from 'react-icons/fi';
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
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6m');

  // Mock data
  const revenueData = [
    { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
    { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
    { name: 'Mar', revenue: 5000, expenses: 2800, profit: 2200 },
    { name: 'Apr', revenue: 2780, expenses: 1908, profit: 872 },
    { name: 'May', revenue: 1890, expenses: 1200, profit: 690 },
    { name: 'Jun', revenue: 2390, expenses: 1500, profit: 890 },
  ];

  const enrollmentData = [
    { name: 'Web Development', value: 400 },
    { name: 'Data Science', value: 300 },
    { name: 'UI/UX Design', value: 200 },
    { name: 'Mobile Development', value: 100 },
  ];

  const completionData = [
    { name: 'Advanced React', enrolled: 124, completed: 97, completionRate: 78 },
    { name: 'Python DS', enrolled: 98, completed: 64, completionRate: 65 },
    { name: 'UI/UX', enrolled: 76, completed: 62, completionRate: 82 },
    { name: 'Mobile Dev', enrolled: 112, completed: 78, completionRate: 70 },
  ];

  const engagementData = [
    { name: 'Week 1', activeUsers: 4000, avgTime: 35 },
    { name: 'Week 2', activeUsers: 3000, avgTime: 28 },
    { name: 'Week 3', activeUsers: 5000, avgTime: 42 },
    { name: 'Week 4', activeUsers: 2780, avgTime: 31 },
    { name: 'Week 5', activeUsers: 1890, avgTime: 25 },
    { name: 'Week 6', activeUsers: 2390, avgTime: 38 },
  ];

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={<FiDollarSign className="h-6 w-6" />}
                title="Total Revenue"
                value={`$${revenueData.reduce((sum, month) => sum + month.revenue, 0).toLocaleString()}`}
                change="+12.5%"
                color="purple"
              />
              <StatCard
                icon={<FiUsers className="h-6 w-6" />}
                title="Active Students"
                value={enrollmentData.reduce((sum, course) => sum + course.value, 0).toLocaleString()}
                change="+8.2%"
                color="blue"
              />
              <StatCard
                icon={<FiCheckCircle className="h-6 w-6" />}
                title="Avg Completion Rate"
                value={`${Math.round(completionData.reduce((sum, course) => sum + course.completionRate, 0) / completionData.length)}%`}
                change="+3.1%"
                color="green"
              />
            </div>

            <ChartCard title="Monthly Revenue">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#6366F1" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                  <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} name="Profit" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Course Enrollment">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={enrollmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {enrollmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Course Completion">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={completionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="enrolled" fill="#A5B4FC" name="Enrolled" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" fill="#6366F1" name="Completed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        );
      case 'revenue':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={<FiDollarSign className="h-6 w-6" />}
                title="Total Revenue"
                value={`$${revenueData.reduce((sum, month) => sum + month.revenue, 0).toLocaleString()}`}
                change="+12.5%"
                color="purple"
              />
              <StatCard
                icon={<FiTrendingUp className="h-6 w-6" />}
                title="Gross Profit"
                value={`$${revenueData.reduce((sum, month) => sum + month.profit, 0).toLocaleString()}`}
                change="+18.3%"
                color="green"
              />
              <StatCard
                icon={<FiBarChart2 className="h-6 w-6" />}
                title="Avg Monthly Growth"
                value="4.2%"
                change="+1.1%"
                color="blue"
              />
            </div>

            <ChartCard title="Revenue Breakdown">
              <div className="flex justify-end mb-4">
                <TimeRangeSelector activeRange={timeRange} setActiveRange={setTimeRange} />
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#6366F1" name="Revenue" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#F59E0B" name="Expenses" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="#10B981" name="Profit" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Revenue Trend">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} dot={{ r: 4 }} name="Revenue" />
                  <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        );
      case 'engagement':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={<FiUsers className="h-6 w-6" />}
                title="Active Users"
                value="12,845"
                change="+5.8%"
                color="blue"
              />
              <StatCard
                icon={<FiBook className="h-6 w-6" />}
                title="Avg. Time Spent"
                value="32 mins"
                change="+2.4%"
                color="green"
              />
              <StatCard
                icon={<FiTrendingUp className="h-6 w-6" />}
                title="Engagement Rate"
                value="68%"
                change="+3.7%"
                color="purple"
              />
            </div>

            <ChartCard title="Weekly Engagement">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="activeUsers" stroke="#6366F1" strokeWidth={2} dot={{ r: 4 }} name="Active Users" />
                  <Line yAxisId="right" type="monotone" dataKey="avgTime" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} name="Avg Time (mins)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Course Engagement">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="enrolled" fill="#A5B4FC" name="Enrolled" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completionRate" fill="#6366F1" name="Completion %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        );
      case 'completion':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={<FiCheckCircle className="h-6 w-6" />}
                title="Avg Completion Rate"
                value="74%"
                change="+3.1%"
                color="green"
              />
              <StatCard
                icon={<FiAward className="h-6 w-6" />}
                title="Certificates Issued"
                value="1,284"
                change="+12.7%"
                color="purple"
              />
              <StatCard
                icon={<FiUsers className="h-6 w-6" />}
                title="Active Learners"
                value="2,456"
                change="+5.3%"
                color="blue"
              />
            </div>

            <ChartCard title="Course Completion Rates">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completionRate" fill="#6366F1" name="Completion Rate %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Completion by Course">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={completionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="completionRate"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {completionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Enrollment vs Completion">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={completionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="enrolled" fill="#A5B4FC" name="Enrolled" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" fill="#6366F1" name="Completed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Revenue Report</title>
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Reports Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Track and analyze your platform performance
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FiDownload className="mr-2" />
          Export Report
        </motion.button>
      </div>

      <div className="mb-8">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}

// Component for individual stat cards
function StatCard({ icon, title, value, change, color }) {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-2 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} from last period
          </p>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

// Component for chart containers
function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

// Component for tab navigation
function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FiBarChart2 className="mr-2" /> },
    { id: 'revenue', label: 'Revenue', icon: <FiDollarSign className="mr-2" /> },
    { id: 'engagement', label: 'Engagement', icon: <FiUsers className="mr-2" /> },
    { id: 'completion', label: 'Completion', icon: <FiCheckCircle className="mr-2" /> },
  ];

  return (
    <nav className="flex space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

// Component for time range selector
function TimeRangeSelector({ activeRange, setActiveRange }) {
  const ranges = [
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '3m', label: '3M' },
    { id: '6m', label: '6M' },
    { id: '12m', label: '12M' },
  ];

  return (
    <div className="inline-flex rounded-md shadow-sm">
      {ranges.map((range) => (
        <button
          key={range.id}
          onClick={() => setActiveRange(range.id)}
          className={`px-3 py-1 text-sm font-medium ${
            activeRange === range.id
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } ${range.id === ranges[0].id ? 'rounded-l-md' : ''} ${
            range.id === ranges[ranges.length - 1].id ? 'rounded-r-md' : ''
          } border border-gray-300`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}