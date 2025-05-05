import { useState } from 'react';
import { FiAward, FiDownload, FiPrinter, FiSearch, FiLinkedin, FiLink, FiMail } from 'react-icons/fi';

export default function SudentCertificatesPages() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const certificates = [
    {
      id: 1,
      certificateId: "CC-2023-001",
      course: "UI/UX Fundamentals",
      instructor: "Emma Rodriguez",
      issuedDate: "2023-05-15",
      downloadUrl: "#",
      imageUrl: "https://source.unsplash.com/random/300x200/?certificate"
    },
    {
      id: 2,
      certificateId: "CC-2023-002",
      course: "JavaScript Basics",
      instructor: "David Kim",
      issuedDate: "2023-03-22",
      downloadUrl: "#",
      imageUrl: "https://source.unsplash.com/random/300x200/?diploma"
    },
    {
      id: 3,
      certificateId: "CC-2023-003",
      course: "Introduction to Python",
      instructor: "Michael Chen",
      issuedDate: "2023-01-10",
      downloadUrl: "#",
      imageUrl: "https://source.unsplash.com/random/300x200/?document"
    }
  ];

  const filteredCertificates = certificates.filter(certificate => 
    certificate.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    certificate.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    certificate.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">My Certificates</h1>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {certificates.length} Certificates Earned
        </div>
      </div>

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

          {filteredCertificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map(certificate => (
                <div key={certificate.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-gray-50 p-4 flex items-center justify-center">
                    <img 
                      src={certificate.imageUrl} 
                      alt={certificate.course}
                      className="h-48 object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{certificate.course}</h3>
                    <p className="text-sm text-gray-500 mb-2">Instructor: {certificate.instructor}</p>
                    <p className="text-xs text-gray-500 mb-4">Issued: {certificate.issuedDate} • ID: {certificate.certificateId}</p>
                    <div className="flex space-x-2">
                      <a
                        href={certificate.downloadUrl}
                        download
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FiDownload className="-ml-1 mr-2 h-4 w-4" />
                        Download
                      </a>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <FiPrinter className="-ml-1 mr-2 h-4 w-4" />
                        Print
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiAward className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {searchTerm ? 'No certificates found' : 'No certificates earned yet'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm 
                  ? 'Try a different search term' 
                  : 'Complete courses to earn certificates'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">How to share your certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <FiLinkedin className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-gray-900">Add to LinkedIn</h3>
              </div>
              <p className="text-sm text-gray-600">Showcase your achievements by adding certificates to your LinkedIn profile under the Licenses & Certifications section.</p>
              <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Share on LinkedIn
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                  <FiLink className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-gray-900">Copy Shareable Link</h3>
              </div>
              <p className="text-sm text-gray-600">Generate a public link to your certificate that you can share anywhere - in resumes, emails, or social media.</p>
              <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Copy Certificate Link
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                  <FiMail className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-gray-900">Email Certificate</h3>
              </div>
              <p className="text-sm text-gray-600">Send your certificate directly to employers or colleagues via email with a personalized message.</p>
              <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Email Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}