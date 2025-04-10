import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="text-center text-white p-10 bg-white bg-opacity-80 rounded-xl shadow-xl max-w-3xl w-full">
        {/* Icon or Image */}
        <div className="flex justify-center mb-8">
          <img
            src="https://via.placeholder.com/100x100.png?text=404"
            alt="404 Error"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4">Oops! Page Not Found</h1>

        {/* Descriptive Text */}
        <p className="text-lg mb-6">
          We couldn't find the page you're looking for. It might have been moved
          or deleted.
        </p>

        {/* CTA - Button to go back */}
        <div className="flex justify-center space-x-4">
          <Link
            to="/dashboard"
            className="inline-block px-8 py-3 text-lg font-semibold text-indigo-600 bg-white rounded-lg shadow-md hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 transition duration-300"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-300 transition duration-300"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Optional Contact or Help Section */}
        <p className="text-sm mt-8 text-gray-700">
          If you need further assistance, please{" "}
          <a href="/support" className="text-indigo-500 hover:underline">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
