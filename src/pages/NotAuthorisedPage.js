import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorisedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/dashboard'); // Redirect to the dashboard or home page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <div className="text-6xl text-red-500 mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">403 - Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotAuthorisedPage;