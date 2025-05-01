import React, { useState } from 'react';
import { FiMenu, FiSearch, FiBell, FiUser, FiMessageSquare, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const Header = ({ setMobileSidebarOpen, setSidebarOpen, sidebarOpen, userProfile }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah',
      content: 'Regarding your course submission',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'alert',
      title: 'Assignment deadline',
      content: 'Your design project is due tomorrow',
      time: '5 hours ago',
      read: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Course completed',
      content: 'You finished "Advanced React" course',
      time: '1 day ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // Mark all as read when opening
    if (!showNotifications) {
      // In a real app, you would update the notifications as read in your state/backend
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
      <div className="flex items-center space-x-4">
        {/* Sidebar toggle buttons */}
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
        
        {/* Search bar */}
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
        {/* Notification button with dropdown */}
        <div className="relative">
          <button 
            className="relative rounded-lg p-1 text-gray-500 hover:bg-gray-100"
            onClick={handleNotificationClick}
          >
            <FiBell className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="p-2">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {notifications.map((notification) => (
                        <li key={notification.id} className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-1">
                              {notification.type === 'message' && (
                                <FiMessageSquare className="h-5 w-5 text-blue-500" />
                              )}
                              {notification.type === 'alert' && (
                                <FiAlertCircle className="h-5 w-5 text-yellow-500" />
                              )}
                              {notification.type === 'success' && (
                                <FiCheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {notification.content}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="ml-4 flex-shrink-0">
                                <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No new notifications
                    </div>
                  )}
                </div>
                <div className="border-t px-4 py-2 text-center">
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View all notifications
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* User profile */}
        <div className="relative">
          <button className="flex items-center space-x-2 rounded-lg p-1 hover:bg-gray-100">
            <img
              src={userProfile.profilePic || "https://www.gravatar.com/avatar/?d=mp&s=200"}
              alt="User profile"
              className="h-8 w-8 rounded-full"
            />
            <span className="hidden text-sm font-medium text-gray-700 lg:block capitalize">
              {userProfile.first_name} {userProfile.last_name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;