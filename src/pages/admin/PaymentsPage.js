import { useCallback, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { FiDollarSign, FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiDownload } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getPayments } from '../../services/paymentService';

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchPayments = useCallback(async () => {
    try {
      const { data, pagination: paginationData } = await getPayments(
        pagination.page,
        pagination.limit
      );
      setPayments(data);
      setPagination((prev) => ({
        ...prev,
        total: paginationData.total,
        totalPages: paginationData.totalPages,
      }));
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

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



  // useEffect(() => {
  //   const fetchPayments = async () => {

  //     try {
  //       const data = await getPayments();
  //       setPayments(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching payments:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchPayments();

  // }, [])

  // Mock data
  // const payments = [
  //   {
  //     id: 1,
  //     transactionId: "TXN-2023-001",
  //     student: "John Doe",
  //     course: "Advanced React Patterns",
  //     amount: 99.99,
  //     date: "2023-05-10",
  //     status: "completed",
  //     method: "Credit Card"
  //   },
  //   {
  //     id: 2,
  //     transactionId: "TXN-2023-002",
  //     student: "Jane Smith",
  //     course: "Python for Data Science",
  //     amount: 79.99,
  //     date: "2023-05-12",
  //     status: "completed",
  //     method: "PayPal"
  //   },
  //   {
  //     id: 3,
  //     transactionId: "TXN-2023-003",
  //     student: "Robert Johnson",
  //     course: "UI/UX Fundamentals",
  //     amount: 59.99,
  //     date: "2023-05-15",
  //     status: "pending",
  //     method: "Bank Transfer"
  //   },
  //   {
  //     id: 4,
  //     transactionId: "TXN-2023-004",
  //     student: "Emily Williams",
  //     course: "Mobile App Development",
  //     amount: 89.99,
  //     date: "2023-05-18",
  //     status: "failed",
  //     method: "Credit Card"
  //   },
  //   {
  //     id: 5,
  //     transactionId: "TXN-2023-005",
  //     student: "Michael Brown",
  //     course: "Business Fundamentals",
  //     amount: 49.99,
  //     date: "2023-05-20",
  //     status: "refunded",
  //     method: "PayPal"
  //   }
  // ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      payment.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      payment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      activeFilter === 'all' || 
      payment.status === activeFilter;
    return matchesSearch && matchesFilter;
  });


  const statusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'refunded':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const paymentMethodIcon = (method) => {
    switch (method) {
      case "Credit Card":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
            💳 {method}
          </span>
        );
      case "PayPal":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
            🔵 {method}
          </span>
        );
      case "Bank Transfer":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
            🏦 {method}
          </span>
        );
      case "MTN MoMo":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
            📱 {method}
          </span>
        );
      case "Orange Money":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-800">
            🍊 {method}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
            {method || "Unknown"}
          </span>
        );
    }
  };

  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Payments</title>
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          Payments
        </h1>
        <div className="flex items-center space-x-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {payments.filter((p) => p.status === "pending").length} Pending
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <FiDownload className="mr-2" />
            Export
          </button>
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
                placeholder="Search payments..."
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
                      All Payments
                    </button>
                    <button
                      onClick={() => setActiveFilter("completed")}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "completed" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => setActiveFilter("pending")}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "pending" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setActiveFilter("failed")}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "failed" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                      Failed
                    </button>
                    <button
                      onClick={() => setActiveFilter("refunded")}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === "refunded" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                      Refunded
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {filteredPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transaction ID
                    </th>
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
                      Course
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment Method
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
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      History
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.transaction_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {payment.user.first_name} {payment.user.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                        {payment.course.title}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {paymentMethodIcon(payment.method)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={statusBadge(payment.status)}>
                          {payment.status.charAt(0).toUpperCase() +
                            payment.status.slice(1)}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.date}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <details>
                          <summary className="text-blue-600 cursor-pointer text-sm">
                            View History
                          </summary>
                          <ul className="mt-2 space-y-1 text-sm">
                            {payment.paymentHistory.map((history) => (
                              <li
                                key={history.id}
                                className="flex justify-between"
                              >
                                <span>{history.status}</span>
                                <span className="text-gray-500">
                                  {new Date(history.createdAt).toLocaleString()}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Add pagination controls at the bottom of your table */}
              <div className="flex items-center justify-between mt-4">
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
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FiDollarSign className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No payments found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try a different search term"
                  : "No payment records match the current filters"}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                $
                {payments
                  .filter((p) => p.status === "completed")
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiDollarSign className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Payments
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                $
                {payments
                  .filter((p) => p.status === "pending")
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FiDollarSign className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Average Payment
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                $
                {(
                  payments
                    .filter((p) => p.status === "completed")
                    .reduce((sum, p) => sum + p.amount, 0) /
                  Math.max(
                    1,
                    payments.filter((p) => p.status === "completed").length
                  )
                ).toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiDollarSign className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}