import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { getProfile } from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState(null); // Add user state

  // Fetch user data ONCE when layout mounts
  useEffect(() => {
    const loadUser = async () => {
      const userData = await getProfile();
      setUser(userData);
    };
    loadUser();
  }, []); // Empty dependency array = runs once

  if (!user) return <LoadingSpinner />; // Optional loading state

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar (pass user data) */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        userProfile={user}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          setMobileSidebarOpen={setMobileSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          userProfile={user} // Pass user to header if needed
        />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="mx-auto max-w-7xl">
            {children || <Outlet />} {/* Handles both nested and direct children */}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;