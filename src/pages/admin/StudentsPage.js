import { useCallback, useEffect, useState } from 'react';
import { FiUsers, FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getStudents } from '../../services/userService';

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
   const [students, setStudents] = useState([]);
   const [loading, setLoading] = useState(true);
   const [pagination, setPagination] = useState({
     page: 1,
     limit: 10,
     total: 0,
     totalPages: 1,
   });

   const fetchStudents = useCallback(async () => {
     try {
       const { data, pagination: paginationData } = await getStudents(
         pagination.page,
         pagination.limit
       );
       setStudents(data);
       console.log(data);
       setPagination((prev) => ({
         ...prev,
         total: paginationData.total,
         totalPages: paginationData.totalPages,
       }));
     } catch (error) {
       console.error("Error fetching payments:", error);
     } finally {
       setLoading(false);
     }
   }, [pagination.page, pagination.limit]);

   useEffect(() => {
     fetchStudents();
   }, [fetchStudents]);

   const handlePageChange = (newPage) => {
     setPagination((prev) => ({ ...prev, page: newPage }));
   };

   const handleLimitChange = (e) => {
     setPagination((prev) => ({
       ...prev,
       limit: Number(e.target.value),
       page: 1,
     }));
   };


  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && student.status === 'active') || 
      (activeFilter === 'inactive' && student.status === 'inactive');
    return matchesSearch && matchesFilter;
  });

  const statusBadge = (status) => {
    return status === 'active' ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Inactive
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          All Students
        </h1>
        <Link
          to="/admin/students/new"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <FiPlus className="mr-2" /> Add Student
        </Link>
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
                placeholder="Search students..."
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
                      onClick={() => setActiveFilter("all")}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "all" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                      All Students
                    </button>
                    <button
                      onClick={() => setActiveFilter("active")}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "active" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                      Active Only
                    </button>
                    <button
                      onClick={() => setActiveFilter("inactive")}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "inactive" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                      Inactive Only
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Enrolled
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Completed
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Active
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                              {student.first_name.charAt(0)}
                              {student.last_name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 capitalize">
                              {student.first_name} {student.last_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {statusBadge(student.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.enrollments.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {
                          student.enrollments.filter(
                            (e) => e.status === "COMPLETED"
                          ).length
                        }
                      </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  {new Date(
    Math.max(
      ...(student.enrollments || []).map(e => new Date(e.updatedAt).getTime()),
      new Date(student.updatedAt).getTime()
    )
  ).toISOString().split('T')[0]}
</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                          <FiEdit2 />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Add pagination controls at the bottom of your table */}
              {/* <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}{" "}
                    of {pagination.total} entries
                  </span>

                  <select
                    value={pagination.limit}
                    onChange={handleLimitChange}
                    className="border rounded text-sm p-1"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>

                <div className="flex space-x-1">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-3 py-1 rounded border ${pagination.page === 1 ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1 rounded border ${pagination.page === pageNum ? "bg-indigo-100 text-indigo-600" : "bg-white hover:bg-gray-50"}`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-3 py-1 rounded border ${pagination.page === pagination.totalPages ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}
                  >
                    Next
                  </button>
                </div>
              </div> */}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No students found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try a different search term"
                  : "No students match the current filters"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}