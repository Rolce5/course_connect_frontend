import React from "react";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiDollarSign,
  FiAward,
  FiFileText,
  FiSettings,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiBarChart2,
  FiLogOut,
  FiBookOpen,
  FiCalendar,
  FiMessageSquare,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../services/authHelper";

const Sidebar = ({ sidebarOpen, mobileSidebarOpen, setMobileSidebarOpen,
  userProfile }) => {
  const [activeSubmenu, setActiveSubmenu] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleNavigation = (path) => {
    navigate(path);
    setMobileSidebarOpen(false);
  };

  const toggleSubmenu = (menuName) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  // const toggleSubmenu = (menu) => {
  //   if (activeSubmenu === menu) {
  //     setActiveSubmenu(null);
  //   } else {
  //     setActiveSubmenu(menu);
  //   }
  // };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


// Admin Menu Items
const adminMenu = [    {
      name: "Dashboard",
      icon: <FiHome />,
      path: "/dashboard",
    },
    {
      name: "Courses",
      icon: <FiBook />,
      path: "/admin/courses",
      submenu: [
        {
          name: "All Courses",
          path: "/admin/courses/",
        },
        {
          name: "Add New",
          path: "/admin/courses/new",
        },
        {
          name: "Categories",
          path: "/admin/courses/categories",
        },
      ],
    },
    {
      name: "Students",
      icon: <FiUsers />,
      path: "students",
      submenu: [
        { name: "All Students", path: "students/all" },
        { name: "Enrollments", path: "students/enrollments" },
        { name: "Progress", path: "students/progress" },
      ],
    },
    {
      name: "Payments",
      icon: <FiDollarSign />,
      path: "payments",
    },
    {
      name: "Certificates",
      icon: <FiAward />,
      path: "certificates",
    },
    {
      name: "Quizzes",
      icon: <FiFileText />,
      path: "quizzes",
    },
    {
      name: "Reports",
      icon: <FiBarChart2 />,
      path: "reports",
      submenu: [
        { name: "Revenue", path: "reports/revenue" },
        { name: "Engagement", path: "reports/engagement" },
        { name: "Completion", path: "reports/completion" },
      ],
    },
    {
      name: "Settings",
      icon: <FiSettings />,
      path: "settings",
    },
    // ... rest of your menu items
  ];

  // Student Menu Items
  const studentMenu = [
    {
      name: "My Learning",
      icon: <FiBookOpen size={18} />,
      path: "/student/learning"
    },
    {
      name: "Schedule",
      icon: <FiCalendar size={18} />,
      path: "/student/schedule"
    },
    {
      name: "Messages",
      icon: <FiMessageSquare size={18} />,
      path: "/student/messages"
    },
    {
      name: "Certificates",
      icon: <FiAward size={18} />,
      path: "/student/certificates"
    }
  ];

  const menuItems = userProfile.role === 'ADMIN' ? adminMenu : studentMenu;


 
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:flex`}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-600"></div>
            <span className="text-xl font-semibold text-gray-800">CourseConnect</span>
          </div>
          <button
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => {
                    if (item.submenu) {
                      toggleSubmenu(item.name);
                    } else {
                      handleNavigation(item.path);
                    }
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-100`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {item.submenu && (
                    <span className="text-gray-500">
                      {activeSubmenu === item.name ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </span>
                  )}
                </button>
                {item.submenu && activeSubmenu === item.name && (
                  <div className="mt-1 space-y-1 pl-11">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={
                          subItem.onClick ||
                          (() => handleNavigation(subItem.path))
                        }
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-3">
            <img
              src={userProfile.profilePic || 'https://www.gravatar.com/avatar/?d=mp&s=200'}
              alt="User profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{userProfile.first_name} {userProfile.last_name}</p>
              <p className="text-xs text-gray-500">{userProfile.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
            >
              <FiLogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;


// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   FiHome,
//   FiBook,
//   FiUsers,
//   FiDollarSign,
//   FiAward,
//   FiSettings,
//   FiLogOut,
//   FiBookOpen,
//   FiCalendar,
//   FiMessageSquare,
//   FiFileText,
//   FiChevronDown,
//   FiChevronUp,
//   FiX
// } from 'react-icons/fi';

// const Sidebar = ({
//   sidebarOpen,
//   mobileSidebarOpen,
//   setMobileSidebarOpen,
//   userRole,
//   userProfile
// }) => {
//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Admin Menu Items
//   const adminMenu = [
//     {
//       name: "Dashboard",
//       icon: <FiHome size={18} />,
//       path: "/admin/dashboard"
//     },
//     {
//       name: "Courses",
//       icon: <FiBook size={18} />,
//       submenu: [
//         { name: "All Courses", path: "/admin/courses" },
//         { name: "Create New", path: "/admin/courses/new" }
//       ]
//     },
//     {
//       name: "Students",
//       icon: <FiUsers size={18} />,
//       path: "/admin/students"
//     },
//     {
//       name: "Payments",
//       icon: <FiDollarSign size={18} />,
//       path: "/admin/payments"
//     }
//   ];

//   // Student Menu Items
//   const studentMenu = [
//     {
//       name: "My Learning",
//       icon: <FiBookOpen size={18} />,
//       path: "/student/learning"
//     },
//     {
//       name: "Schedule",
//       icon: <FiCalendar size={18} />,
//       path: "/student/schedule"
//     },
//     {
//       name: "Messages",
//       icon: <FiMessageSquare size={18} />,
//       path: "/student/messages"
//     },
//     {
//       name: "Certificates",
//       icon: <FiAward size={18} />,
//       path: "/student/certificates"
//     }
//   ];

//   const menuItems = userRole === 'ADMIN' ? adminMenu : studentMenu;

//   const handleNavigation = (path) => {
//     navigate(path);
//     setMobileSidebarOpen(false);
//   };

//   const toggleSubmenu = (menuName) => {
//     setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
//   };

//   return (
//     <>
//       {/* Mobile Backdrop */}
//       {mobileSidebarOpen && (
//         <div
//           className="fixed inset-0 z-20 bg-black/50 lg:hidden"
//           onClick={() => setMobileSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar Container */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="flex h-full flex-col">
//           {/* Sidebar Header */}
//           <div className="flex h-16 items-center justify-between border-b px-4">
//             <h1 className="text-xl font-semibold">
//               {userRole === 'admin' ? 'Admin Panel' : 'My Learning'}
//             </h1>
//             <button
//               className="lg:hidden"
//               onClick={() => setMobileSidebarOpen(false)}
//             >
//               <FiX size={20} />
//             </button>
//           </div>

//           {/* Menu Items */}
//           <nav className="flex-1 overflow-y-auto py-4">
//             <ul className="space-y-1 px-2">
//               {menuItems.map((item) => (
//                 <li key={item.name}>
//                   {item.submenu ? (
//                     <>
//                       <button
//                         onClick={() => toggleSubmenu(item.name)}
//                         className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-gray-100 ${
//                           activeSubmenu === item.name ? 'bg-gray-100' : ''
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-gray-600">{item.icon}</span>
//                           <span>{item.name}</span>
//                         </div>
//                         {activeSubmenu === item.name ? (
//                           <FiChevronUp size={18} />
//                         ) : (
//                           <FiChevronDown size={18} />
//                         )}
//                       </button>
//                       {activeSubmenu === item.name && (
//                         <ul className="ml-8 mt-1 space-y-1">
//                           {item.submenu.map((subItem) => (
//                             <li key={subItem.name}>
//                               <button
//                                 onClick={() => handleNavigation(subItem.path)}
//                                 className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100 ${
//                                   location.pathname === subItem.path
//                                     ? 'bg-blue-50 text-blue-600'
//                                     : ''
//                                 }`}
//                               >
//                                 {subItem.name}
//                               </button>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => handleNavigation(item.path)}
//                       className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 ${
//                         location.pathname === item.path
//                           ? 'bg-blue-50 text-blue-600'
//                           : ''
//                       }`}
//                     >
//                       <span className="text-gray-600">{item.icon}</span>
//                       <span>{item.name}</span>
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* User Profile Footer */}
//           <div className="border-t p-4">
//             <div className="flex items-center gap-3">
//               <img
//                 src={userProfile?.picture || '/default-avatar.jpg'}
//                 className="h-10 w-10 rounded-full"
//                 alt="Profile"
//               />
//               <div>
//                 <p className="font-medium">{userProfile?.name || 'User'}</p>
//                 <p className="text-sm text-gray-500">
//                   {userRole === 'admin' ? 'Administrator' : 'Student'}
//                 </p>
//               </div>
//               <button
//                 onClick={() => {
//                   // Add logout logic here
//                   navigate('/login');
//                 }}
//                 className="ml-auto rounded-full p-2 hover:bg-gray-100"
//               >
//                 <FiLogOut size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
