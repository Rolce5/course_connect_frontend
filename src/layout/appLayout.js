
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { getProfile } from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSidebarBadgeCounts } from '../services/dashboardService';

const AppLayout = ({ children, hideSidebar = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
   const [badgeCounts, setBadgeCounts] = useState({
     courses: 0,
     students: 0,
     instructors: 0,
     payments: 0,
     certificates: 0,
   });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const loadData = async () => {
       try {
         // Fetch in parallel
         const [userData, counts] = await Promise.all([
           getProfile(),
           getSidebarBadgeCounts(), // Your API call
         ]);
         setUser(userData);
         setBadgeCounts(counts);
         console.log(counts);
       } catch (error) {
         console.error("Failed to load layout data:", error);
       } finally {
         setLoading(false);
       }
     };
     loadData();
   }, []);

   if (loading) return <LoadingSpinner fullScreen />;


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
            badgeCounts={badgeCounts}
          />
        </>
      )}

      {/* Main content */}
      {/* <div className="flex flex-1 flex-col overflow-hidden w-full"> */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "lg:ml-0" : ""}`}
      >
        <Header
          setMobileSidebarOpen={setMobileSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          userProfile={user}
          showSidebarToggle={!hideSidebar}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="mx-auto max-w-full p-4">
            {/* {children || <Outlet />} */}
            <Outlet context={{ user }} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;