import React from 'react';
import { FaChartBar, FaUserCheck, FaUserClock } from 'react-icons/fa';

const EnrollmentStats = ({ enrollments }) => {
  const completed = enrollments.filter(e => e.progress === 100).length;
  const inProgress = enrollments.length - completed;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Enrollment Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <FaChartBar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold">{enrollments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FaUserCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold">{completed}</p>
              <p className="text-xs text-gray-500">{enrollments.length > 0 ? Math.round((completed / enrollments.length) * 100) : 0}% completion rate</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <FaUserClock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold">{inProgress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentStats;