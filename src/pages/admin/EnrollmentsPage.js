// import React, { useState, useEffect } from 'react';
// import { FiSearch, FiFilter, FiCalendar, FiBook, FiUser, FiCheckCircle, FiClock } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// // import { DataTable } from '../components/DataTable';
// // import { Badge } from '../components/Badge';

// const EnrollmentsPage = () => {
//   const [enrollments, setEnrollments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState('all');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate API call
//     const fetchEnrollments = async () => {
//       setLoading(true);
//       try {
//         // In a real app, you would fetch from your API
//         const mockData = Array(18).fill().map((_, i) => {
//           const statuses = ['completed', 'in_progress', 'not_started'];
//           const status = statuses[Math.floor(Math.random() * 3)];
//           const enrolledDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
//           const completedDate = status === 'completed' ? 
//             new Date(enrolledDate.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000) : null;
          
//           return {
//             id: i + 1,
//             student: {
//               id: Math.floor(Math.random() * 243) + 1,
//               firstName: `Student${Math.floor(Math.random() * 243) + 1}`,
//               lastName: `Last${Math.floor(Math.random() * 243) + 1}`,
//               email: `student${Math.floor(Math.random() * 243) + 1}@example.com`
//             },
//             course: {
//               id: Math.floor(Math.random() * 50) + 1,
//               title: `Course ${Math.floor(Math.random() * 50) + 1}`,
//               category: ['Web', 'Mobile', 'Data Science', 'Design', 'Business'][Math.floor(Math.random() * 5)]
//             },
//             enrolledDate: enrolledDate.toISOString(),
//             completedDate: completedDate?.toISOString(),
//             progress: Math.floor(Math.random() * 100),
//             status,
//             lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
//           };
//         });
        
//         // Apply filters
//         let filtered = mockData;
        
//         if (searchTerm) {
//           filtered = filtered.filter(enrollment => 
//             `${enrollment.student.firstName} ${enrollment.student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             enrollment.course.title.toLowerCase().includes(searchTerm.toLowerCase())
//           );
//         }
        
//         if (statusFilter !== 'all') {
//           filtered = filtered.filter(enrollment => enrollment.status === statusFilter);
//         }
        
//         if (dateFilter === 'recent') {
//           filtered = filtered.filter(enrollment => 
//             new Date(enrollment.enrolledDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//           );
//         } else if (dateFilter === 'older') {
//           filtered = filtered.filter(enrollment => 
//             new Date(enrollment.enrolledDate) <= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//           );
//         }
        
//         setEnrollments(filtered);
//       } catch (error) {
//         console.error('Error fetching enrollments:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnrollments();
//   }, [searchTerm, statusFilter, dateFilter]);

//   const statusBadge = {
//     completed: { color: 'green', icon: <FiCheckCircle className="mr-1" />, text: 'Completed' },
//     in_progress: { color: 'blue', icon: <FiClock className="mr-1" />, text: 'In Progress' },
//     not_started: { color: 'yellow', icon: <FiClock className="mr-1" />, text: 'Not Started' }
//   };

//   const columns = [
//     {
//       header: 'Student',
//       accessor: 'student',
//       cell: (row) => (
//         <div className="flex items-center space-x-3">
//           <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//             <FiUser className="text-gray-500" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-900">{row.student.firstName} {row.student.lastName}</p>
//             <p className="text-sm text-gray-500">{row.student.email}</p>
//           </div>
//         </div>
//       )
//     },
//     {
//       header: 'Course',
//       accessor: 'course',
//       cell: (row) => (
//         <div className="flex items-center space-x-3">
//           <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
//             <FiBook className="text-gray-500" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-900">{row.course.title}</p>
//             {/* <Badge color="gray" className="text-xs">
//               {row.course.category}
//             </Badge> */}
//           </div>
//         </div>
//       )
//     },
//     {
//       header: 'Enrollment Date',
//       accessor: 'enrolledDate',
//       cell: (row) => (
//         <div className="text-sm text-gray-500">
//           <FiCalendar className="inline mr-1" />
//           {new Date(row.enrolledDate).toLocaleDateString()}
//         </div>
//       )
//     },
//     {
//       header: 'Progress',
//       accessor: 'progress',
//       cell: (row) => (
//         <div className="flex items-center">
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div 
//               className={`h-2.5 rounded-full ${
//                 row.status === 'completed' ? 'bg-green-500' : 
//                 row.status === 'in_progress' ? 'bg-blue-500' : 'bg-yellow-500'
//               }`} 
//               style={{ width: `${row.progress}%` }}
//             ></div>
//           </div>
//           <span className="ml-2 text-sm font-medium text-gray-700">{row.progress}%</span>
//         </div>
//       )
//     },
//     // {
//     //   header: 'Status',
//     //   accessor: 'status',
//     //   cell: (row) => (
//     //     <Badge color={statusBadge[row.status].color}>
//     //       {statusBadge[row.status].icon}
//     //       {statusBadge[row.status].text}
//     //     </Badge>
//     //   )
//     // },
//     {
//       header: 'Actions',
//       accessor: 'actions',
//       cell: (row) => (
//         <button
//           onClick={() => navigate(`/admin/enrollments/${row.id}`)}
//           className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
//         >
//           View
//         </button>
//       )
//     }
//   ];

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-8">
//       <div className="sm:flex sm:items-center sm:justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Student Enrollments</h1>
//           <p className="mt-2 text-sm text-gray-700">
//             Track and manage all course enrollments for students
//           </p>
//         </div>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div className="relative rounded-md shadow-sm w-full sm:w-64">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
//                 placeholder="Search enrollments..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <div>
//                 <label htmlFor="status-filter" className="sr-only">Status</label>
//                 <select
//                   id="status-filter"
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-3 pr-10"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="completed">Completed</option>
//                   <option value="in_progress">In Progress</option>
//                   <option value="not_started">Not Started</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="date-filter" className="sr-only">Date</label>
//                 <select
//                   id="date-filter"
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-3 pr-10"
//                   value={dateFilter}
//                   onChange={(e) => setDateFilter(e.target.value)}
//                 >
//                   <option value="all">All Dates</option>
//                   <option value="recent">Recent (last 7 days)</option>
//                   <option value="older">Older</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="px-4 py-5 sm:p-6">
//           {/* <DataTable
//             columns={columns}
//             data={enrollments}
//             loading={loading}
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnrollmentsPage;

import { useState } from 'react';
import { FiBook, FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function EnrollmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data
  const enrollments = [
    {
      id: 1,
      student: "John Doe",
      course: "Advanced React Patterns",
      date: "2023-05-10",
      status: "active",
      progress: 78
    },
    {
      id: 2,
      student: "Jane Smith",
      course: "Python for Data Science",
      date: "2023-05-12",
      status: "active",
      progress: 45
    },
    {
      id: 3,
      student: "Robert Johnson",
      course: "UI/UX Fundamentals",
      date: "2023-05-15",
      status: "completed",
      progress: 100
    },
    {
      id: 4,
      student: "Emily Williams",
      course: "Mobile App Development",
      date: "2023-05-18",
      status: "cancelled",
      progress: 12
    },
    {
      id: 5,
      student: "Michael Brown",
      course: "Business Fundamentals",
      date: "2023-05-20",
      status: "active",
      progress: 32
    }
  ];

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = 
      enrollment.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
      enrollment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      activeFilter === 'all' || 
      enrollment.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const statusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Active
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Student Enrollments</h1>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {enrollments.length} Active Enrollments
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search enrollments..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <FiFilter className="mr-2" />
                Filters
                {filtersOpen ? (
                  <FiChevronUp className="ml-2" />
                ) : (
                  <FiChevronDown className="ml-2" />
                )}
              </button>
              {filtersOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      All Enrollments
                    </button>
                    <button
                      onClick={() => setActiveFilter('active')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'active' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setActiveFilter('completed')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => setActiveFilter('cancelled')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'cancelled' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Cancelled
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {filteredEnrollments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEnrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {enrollment.student}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {enrollment.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {enrollment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {statusBadge(enrollment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-32 mr-2">
                            {progressBar(enrollment.progress)}
                          </div>
                          <span className="text-sm text-gray-500">{enrollment.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {enrollment.status === 'active' ? (
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                            <FiCheckCircle />
                          </button>
                        ) : (
                          <button className="text-gray-400 mr-4" disabled>
                            <FiCheckCircle />
                          </button>
                        )}
                        <button className="text-red-600 hover:text-red-900">
                          <FiXCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FiBook className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No enrollments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try a different search term' : 'No enrollments match the current filters'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}