
import { useState } from 'react';
import { FiAward, FiSearch, FiDownload, FiPrinter, FiCheckCircle, FiXCircle, FiFilter, FiChevronUp, FiChevronDown } from 'react-icons/fi';

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data
  const certificates = [
    {
      id: 1,
      certificateId: "CERT-2023-001",
      student: "John Doe",
      course: "Advanced React Patterns",
      issuedDate: "2023-05-10",
      status: "issued",
      downloadUrl: "#"
    },
    {
      id: 2,
      certificateId: "CERT-2023-002",
      student: "Jane Smith",
      course: "Python for Data Science",
      issuedDate: "2023-05-12",
      status: "issued",
      downloadUrl: "#"
    },
    {
      id: 3,
      certificateId: "CERT-2023-003",
      student: "Robert Johnson",
      course: "UI/UX Fundamentals",
      issuedDate: "2023-05-15",
      status: "pending",
      downloadUrl: "#"
    },
    {
      id: 4,
      certificateId: "CERT-2023-004",
      student: "Emily Williams",
      course: "Mobile App Development",
      issuedDate: "2023-05-18",
      status: "revoked",
      downloadUrl: "#"
    },
    {
      id: 5,
      certificateId: "CERT-2023-005",
      student: "Michael Brown",
      course: "Business Fundamentals",
      issuedDate: "2023-05-20",
      status: "issued",
      downloadUrl: "#"
    }
  ];

  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = 
      certificate.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
      certificate.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.certificateId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      activeFilter === 'all' || 
      certificate.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const statusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'issued':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'revoked':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Certificates</h1>
        <div className="flex items-center space-x-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {certificates.filter(c => c.status === 'issued').length} Issued
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <FiDownload className="mr-2" />
            Bulk Export
          </button>
        </div>
      </div>

      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search certificates..."
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
                      All Certificates
                    </button>
                    <button
                      onClick={() => setActiveFilter('issued')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'issued' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Issued
                    </button>
                    <button
                      onClick={() => setActiveFilter('pending')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'pending' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setActiveFilter('revoked')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'revoked' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Revoked
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {filteredCertificates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Certificate ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issued Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCertificates.map((certificate) => (
                    <tr key={certificate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {certificate.certificateId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.student}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.issuedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {statusBadge(certificate.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {certificate.status === 'issued' ? (
                          <>
                            <a 
                              href={certificate.downloadUrl} 
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                              download
                            >
                              <FiDownload />
                            </a>
                            <button className="text-gray-600 hover:text-gray-900">
                              <FiPrinter />
                            </button>
                          </>
                        ) : certificate.status === 'pending' ? (
                          <button className="text-green-600 hover:text-green-900 mr-4">
                            <FiCheckCircle />
                          </button>
                        ) : null}
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
              <FiAward className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No certificates found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try a different search term' : 'No certificates match the current filters'}
              </p>
            </div>
          )}
        </div>
      </div> */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
       <div className="p-6">
         <div className="mb-6">
           <div className="relative max-w-md">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search certificates..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search certificates..."
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
                      All Certificates
                    </button>
                    <button
                      onClick={() => setActiveFilter('issued')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'issued' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Issued
                    </button>
                    <button
                      onClick={() => setActiveFilter('pending')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'pending' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setActiveFilter('revoked')}
                      className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'revoked' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Revoked
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {filteredCertificates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Certificate ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Awarded On
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCertificates.map((certificate) => (
                    <tr key={certificate.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {certificate.certificateId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.awardedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={statusBadge(certificate.status)}>
                          {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                          <FiDownload />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <FiPrinter />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FiAward className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No certificates found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try a different search term' : 'No certificates have been issued yet'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Certificates</p>
              <p className="text-2xl font-semibold text-gray-900">
                {certificates.length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <FiAward className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Issued This Month</p>
              <p className="text-2xl font-semibold text-gray-900">
                {certificates.filter(c => c.status === 'issued' && c.issuedDate.startsWith('2023-05')).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiAward className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Approval</p>
              <p className="text-2xl font-semibold text-gray-900">
                {certificates.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FiAward className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}