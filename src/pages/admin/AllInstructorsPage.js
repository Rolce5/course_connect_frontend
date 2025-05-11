// import React, { useState } from "react";
// import {
//   FiSearch,
//   FiUserPlus,
//   FiFilter,
//   FiEdit2,
//   FiTrash2,
//   FiStar,
//   FiChevronDown,
// } from "react-icons/fi";

// const AllInstructorsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");

//   // Mock data
//   const instructors = [
//     {
//       id: 1,
//       name: "Alex Johnson",
//       email: "alex@courseconnect.com",
//       courses: 8,
//       students: 142,
//       rating: 4.8,
//       status: "active",
//       joined: "2023-05-15",
//     },
//     // Add more mock data...
//   ];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">All Instructors</h1>
//           <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//             <FiUserPlus className="mr-2" />
//             Add Instructor
//           </button>
//         </div>

//         {/* Search and Filter */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="relative flex-1">
//             <FiSearch className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search instructors..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
//               <FiFilter className="mr-2" />
//               Filter
//               <FiChevronDown className="ml-2" />
//             </button>
//           </div>
//         </div>

//         {/* Instructors Table */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Courses
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Students
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Rating
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {instructors.map((instructor) => (
//                   <tr key={instructor.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
//                           {instructor.name.charAt(0)}
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {instructor.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {instructor.email}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {instructor.courses}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {instructor.students}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <FiStar className="text-yellow-400 mr-1" />
//                         <span className="text-sm font-medium">
//                           {instructor.rating}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           instructor.status === "active"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {instructor.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button className="text-indigo-600 hover:text-indigo-900 mr-3">
//                         <FiEdit2 />
//                       </button>
//                       <button className="text-red-600 hover:text-red-900">
//                         <FiTrash2 />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex justify-between items-center">
//           <div className="text-sm text-gray-500">
//             Showing 1 to 10 of 15 instructors
//           </div>
//           <div className="flex gap-1">
//             <button className="px-3 py-1 border rounded-lg bg-white text-gray-700 hover:bg-gray-50">
//               Previous
//             </button>
//             <button className="px-3 py-1 border rounded-lg bg-indigo-600 text-white">
//               1
//             </button>
//             <button className="px-3 py-1 border rounded-lg bg-white text-gray-700 hover:bg-gray-50">
//               2
//             </button>
//             <button className="px-3 py-1 border rounded-lg bg-white text-gray-700 hover:bg-gray-50">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllInstructorsPage;

// import { useCallback, useEffect, useState } from "react";
// import {
//   FiUsers,
//   FiSearch,
//   FiUserPlus,
//   FiFilter,
//   FiEdit2,
//   FiTrash2,
//   FiStar,
//   FiChevronDown,
//   FiChevronUp,
// } from "react-icons/fi";
// import { getInstructors } from "../../services/userService";
// import { getLastActiveDate } from "../../utils/dateUtils";
// // import StatusBadge from "../../components/StatusBadge";
// import { Helmet } from "react-helmet";

// const AllInstructorsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [filtersOpen, setFiltersOpen] = useState(false);
//   const [instructors, setInstructors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 1,
//   });

//   const fetchInstructors = useCallback(async () => {
//     try {
//       const { data, pagination: paginationData } = await getInstructors(
//         pagination.page,
//         pagination.limit
//       );
//       setInstructors(data);
//       console.log(data);
//       setPagination((prev) => ({
//         ...prev,
//         total: paginationData.total,
//         totalPages: paginationData.totalPages,
//       }));
//     } catch (error) {
//       console.error("Error fetching instructors:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit]);

//   useEffect(() => {
//     fetchInstructors();
//   }, [fetchInstructors]);

//   const handlePageChange = (newPage) => {
//     setPagination((prev) => ({ ...prev, page: newPage }));
//   };

//   const handleLimitChange = (e) => {
//     setPagination((prev) => ({
//       ...prev,
//       limit: Number(e.target.value),
//       page: 1,
//     }));
//   };

//   const filteredInstructors = instructors.filter((instructor) => {
//     const matchesSearch =
//       `${instructor.first_name} ${instructor.last_name}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter =
//       activeFilter === "all" ||
//       (activeFilter === "active" && instructor.status === "active") ||
//       (activeFilter === "inactive" && instructor.status === "inactive");
//     return matchesSearch && matchesFilter;
//   });

//   // Mock data
//   const instructorss = [
//     {
//       id: 1,
//       name: "Alex Johnson",
//       email: "alex@courseconnect.com",
//       courses: 8,
//       students: 142,
//       rating: 4.8,
//       status: "active",
//       joined: "2023-05-15",
//     },
//     // Add more mock data...
//   ];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <Helmet>
//           <title>Insructors || CourseConnect</title>
//         </Helmet>
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">All Instructors</h1>
//           <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//             <FiUserPlus className="mr-2" />
//             Add Instructor
//           </button>
//         </div>
//         {/* Search and Filter */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="relative flex-1">
//             <FiSearch className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search instructors..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setFiltersOpen(!filtersOpen)}
//               className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
//             >
//               <FiFilter className="mr-2" />
//               Filters
//               {filtersOpen ? (
//                 <FiChevronUp className="ml-2" />
//               ) : (
//                 <FiChevronDown className="ml-2" />
//               )}
//             </button>
//             {filtersOpen && (
//               <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//                 <div className="py-1">
//                   <button
//                     onClick={() => setActiveFilter("all")}
//                     className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "all" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
//                   >
//                     All Instructors
//                   </button>
//                   <button
//                     onClick={() => setActiveFilter("active")}
//                     className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "active" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
//                   >
//                     Active Only
//                   </button>
//                   <button
//                     onClick={() => setActiveFilter("inactive")}
//                     className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "inactive" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
//                   >
//                     Inactive Only
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* Instructors Table */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           {filteredInstructors.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Courses
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Students
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Rating
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {instructors.map((instructor) => (
//                     <tr key={instructor.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           {instructor.profilePic ? (
//                             <img
//                               src={instructor.profilePic}
//                               alt={`${instructor.first_name} ${instructor.last_name}`}
//                               className="flex-shrink-0 h-10 w-10 rounded-full object-cover"
//                             />
//                           ) : (
//                             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium capitize">
//                               {instructor.first_name.charAt(0)}
//                               {instructor.last_name.charAt(0)}
//                             </div>
//                           )}

//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900 capitize">
//                               {instructor.first_name} {instructor.last_name}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {instructor.email}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {instructor.course_count}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {instructor.student_count}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <FiStar className="text-yellow-400 mr-1" />
//                           <span className="text-sm font-medium">
//                             {instructor.rating}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             instructor.status === "active"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-red-100 text-red-800"
//                           }`}
//                         >
//                           {instructor.status}
//                           {/* <StatusBadge isActive={instructor.status} /> */}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button className="text-indigo-600 hover:text-indigo-900 mr-3">
//                           <FiEdit2 />
//                         </button>
//                         <button className="text-red-600 hover:text-red-900">
//                           <FiTrash2 />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
//               <h3 className="mt-2 text-lg font-medium text-gray-900">
//                 No instructor found
//               </h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 {searchTerm
//                   ? "Try a different search term"
//                   : "No instructor match the current filters"}
//               </p>
//             </div>
//           )}
//         </div>
//         {/* Pagination */}

//         <div className="mt-6 flex justify-between items-center">
//           <div className="text-sm text-gray-500">
//             Showing 1 to 10 of 15 instructors
//           </div>

//           <div className="flex gap-1">
//             <button className="px-3 py-1 border rounded-lg bg-white text-gray-700 hover:bg-gray-50">
//               Previous
//             </button>
//             <button className="px-3 py-1 border rounded-lg bg-indigo-600 text-white">
//               1
//             </button>

//             <button className="px-3 py-1 border rounded-lg bg-white text-gray-700 hover:bg-gray-50">
//               2
//             </button>

//             <button className="px-3 py-1 border rounded-lg bg-white text-gray-700 hover:bg-gray-50">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllInstructorsPage;

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiUsers,
  FiSearch,
  FiUserPlus,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiAlertCircle,
} from "react-icons/fi";
import { getInstructors } from "../../services/userService";
import { Helmet } from "react-helmet";
import  useDebounce  from "../../hooks/useDebounce";
import TableSkeletonLoading from "../../components/TableSkeletonLoading";

const AllInstructorsPage = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  
  const fetchInstructors = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getInstructors(
        pagination.page,
        pagination.limit,
        debouncedSearchTerm // Add search term if needed
      );
      console.log("Response: ", result);

      setInstructors(result.data);

      setPagination((prev) => ({
        ...prev,
        total: result.pagination?.total || result.data?.length || 0,
        totalPages: result.pagination?.totalPages || 1,
      }));

      setError(null);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      setError(err.message || "Failed to load instructors");
      // Reset to safe values on error
      setPagination((prev) => ({
        ...prev,
        total: 0,
        totalPages: 1,
      }));
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, debouncedSearchTerm]);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);


  // Handle pagination
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

  // Handle sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort instructors
  const filteredInstructors = useMemo(() => {
    let result = instructors.filter((instructor) => {
      const matchesSearch =
        `${instructor.first_name} ${instructor.last_name}`
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        instructor.email
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "active" && instructor.status === "active") ||
        (activeFilter === "inactive" && instructor.status === "inactive");

      return matchesSearch && matchesFilter;
    });

    // Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
          case "name":
            aValue = `${a.first_name} ${a.last_name}`.toLowerCase();
            bValue = `${b.first_name} ${b.last_name}`.toLowerCase();
            break;
          case "courses":
            aValue = a.course_count;
            bValue = b.course_count;
            break;
          case "students":
            aValue = a.student_count;
            bValue = b.student_count;
            break;
          case "rating":
            aValue = a.rating;
            bValue = b.rating;
            break;
          case "status":
            aValue = a.status;
            bValue = b.status;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [instructors, debouncedSearchTerm, activeFilter, sortConfig]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Helmet>
          <title>Instructors || CourseConnect</title>
        </Helmet>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading instructors: {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Instructors</h1>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <FiUserPlus className="mr-2" />
            Add Instructor
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search instructors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              aria-label={`${filtersOpen ? "Close" : "Open"} filters`}
              aria-expanded={filtersOpen}
            >
              <FiFilter className="mr-2" />
              <div className="flex items-center">
                {activeFilter === "all" ? (
                  <span>Filters</span>
                ) : (
                  <span className="flex items-center">
                    <span className="font-medium capitalize">
                      {activeFilter}
                    </span>
                    <span className="ml-1 text-gray-600">Only</span>
                  </span>
                )}
                {filtersOpen ? (
                  <FiChevronUp className="ml-2" />
                ) : (
                  <FiChevronDown className="ml-2" />
                )}
              </div>
            </button>
            {filtersOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {["all", "active", "inactive"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(filter);
                        setFiltersOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeFilter === filter
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {filter === "all"
                        ? "All Instructors"
                        : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Only`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructors Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            // Skeleton Loading
            <TableSkeletonLoading />
          ) : filteredInstructors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {["name", "courses", "students", "rating", "status"].map(
                      (column) => (
                        <th
                          key={column}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort(column)}
                        >
                          <div className="flex items-center">
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                            <span className="ml-1">
                              {sortConfig.key === column
                                ? sortConfig.direction === "ascending"
                                  ? "↑"
                                  : "↓"
                                : "↕"}
                            </span>
                          </div>
                        </th>
                      )
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInstructors.map((instructor) => (
                    <tr key={instructor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {instructor.profilePic ? (
                            <img
                              src={instructor.profilePic}
                              alt={`${instructor.first_name} ${instructor.last_name}`}
                              className="flex-shrink-0 h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                              {instructor.first_name.charAt(0)}
                              {instructor.last_name.charAt(0)}
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {instructor.first_name} {instructor.last_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {instructor.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {instructor.course_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {instructor.student_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">
                            {instructor.rating || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            instructor.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {instructor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          aria-label={`Edit ${instructor.first_name}`}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          aria-label={`Delete ${instructor.first_name}`}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {searchTerm
                  ? "No matching instructors"
                  : "No instructors found"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search or filter criteria"
                  : activeFilter !== "all"
                    ? "No instructors match the current status filter"
                    : "There are currently no instructors registered"}
              </p>
              {activeFilter !== "all" && (
                <button
                  onClick={() => setActiveFilter("all")}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredInstructors.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              Showing{" "}
              {pagination.page * pagination.limit - pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} instructors
            </div>

            <div className="flex gap-1">
              <button
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className={`px-3 py-1 border rounded-lg ${
                  pagination.page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Previous page"
              >
                Previous
              </button>

              {[...Array(pagination.totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border rounded-lg ${
                    pagination.page === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={pagination.page === pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
                className={`px-3 py-1 border rounded-lg ${
                  pagination.page === pagination.totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInstructorsPage;