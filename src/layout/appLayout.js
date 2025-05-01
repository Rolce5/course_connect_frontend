
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { getProfile } from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';

const AppLayout = ({ children, hideSidebar = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getProfile();
      setUser(userData);
    };
    loadUser();
  }, []);

  if (!user) return <LoadingSpinner />;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conditionally render sidebar */}
      {!hideSidebar && (
        <>
          {mobileSidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}
          <Sidebar
            sidebarOpen={sidebarOpen}
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
            userProfile={user}
          />
        </>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          setMobileSidebarOpen={setMobileSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          userProfile={user}
          showSidebarToggle={!hideSidebar}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="mx-auto max-w-full">
            {/* {children || <Outlet />} */}
            <Outlet context={{ user }} /> {/* 👈 Critical change */}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;