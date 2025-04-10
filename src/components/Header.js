import React from 'react';
import { FiMenu, FiSearch, FiBell, FiUser } from 'react-icons/fi';

const Header = ({ setMobileSidebarOpen, setSidebarOpen, sidebarOpen, userProfile }) => {
  // Mock user data
  const user = {
    name: 'John Doe',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg'
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <FiMenu className="h-6 w-6" />
        </button>
        <button
          className="hidden rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:block"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu className="h-6 w-6" />
        </button>
        <div className="relative max-w-md flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border-0 bg-gray-100 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-indigo-500"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative rounded-lg p-1 text-gray-500 hover:bg-gray-100">
          <FiBell className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"></span>
        </button>
        <div className="relative">
          <button className="flex items-center space-x-2 rounded-lg p-1 hover:bg-gray-100">
            <img
              src={userProfile.profilePic || "https://www.gravatar.com/avatar/?d=mp&s=200"}
              alt="User profile"
              className="h-8 w-8 rounded-full"
            />
            <span className="hidden text-sm font-medium text-gray-700 lg:block">
            {userProfile.first_name} {userProfile.last_name}            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;