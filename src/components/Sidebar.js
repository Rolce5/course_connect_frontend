// import React from "react";
// import {
//   FiHome,
//   FiBook,
//   FiUsers,
//   FiDollarSign,
//   FiAward,
//   FiFileText,
//   FiSettings,
//   FiX,
//   FiChevronDown,
//   FiChevronUp,
//   FiBarChart2,
//   FiLogOut,
//   FiBookOpen,
//   FiCalendar,
//   FiMessageSquare,
// } from "react-icons/fi";
// import { useNavigate, useLocation } from "react-router-dom";
// import { logout } from "../services/authHelper";

// const Sidebar = ({ sidebarOpen, mobileSidebarOpen, setMobileSidebarOpen,
//   userProfile }) => {
//   const [activeSubmenu, setActiveSubmenu] = React.useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
  

//   const handleNavigation = (path) => {
//     navigate(path);
//     setMobileSidebarOpen(false);
//   };

//   const toggleSubmenu = (menuName) => {
//     setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
//   };

//   // const toggleSubmenu = (menu) => {
//   //   if (activeSubmenu === menu) {
//   //     setActiveSubmenu(null);
//   //   } else {
//   //     setActiveSubmenu(menu);
//   //   }
//   // };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };


// // Admin Menu Items
// const adminMenu = [    {
//       name: "Dashboard",
//       icon: <FiHome />,
//       path: "/dashboard",
//     },
//     {
//       name: "Courses",
//       icon: <FiBook />,
//       path: "/admin/courses",
//       submenu: [
//         {
//           name: "All Courses",
//           path: "/admin/courses/",
//         },
//         {
//           name: "Add New",
//           path: "/admin/courses/new",
//         },
//         {
//           name: "Categories",
//           path: "/admin/courses/categories",
//         },
//       ],
//     },
//     {
//       name: "Students",
//       icon: <FiUsers />,
//       path: "students",
//       submenu: [
//         { name: "All Students", path: "students/all" },
//         { name: "Enrollments", path: "students/enrollments" },
//         { name: "Progress", path: "students/progress" },
//       ],
//     },
//     {
//       name: "Payments",
//       icon: <FiDollarSign />,
//       path: "payments",
//     },
//     {
//       name: "Certificates",
//       icon: <FiAward />,
//       path: "certificates",
//     },
//     {
//       name: "Quizzes",
//       icon: <FiFileText />,
//       path: "quizzes",
//     },
//     {
//       name: "Reports",
//       icon: <FiBarChart2 />,
//       path: "reports",
//       submenu: [
//         { name: "Revenue", path: "reports/revenue" },
//         { name: "Engagement", path: "reports/engagement" },
//         { name: "Completion", path: "reports/completion" },
//       ],
//     },
//     {
//       name: "Settings",
//       icon: <FiSettings />,
//       path: "settings",
//     },
//     // ... rest of your menu items
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

//   const menuItems = userProfile.role === 'ADMIN' ? adminMenu : studentMenu;


 
//   return (
//     <aside
//       className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:flex`}
//     >
//       <div className="flex h-full flex-col">
//         {/* Sidebar header */}
//         <div className="flex h-16 items-center justify-between border-b px-4">
//           <div className="flex items-center space-x-3">
//             <div className="h-8 w-8 rounded-lg bg-indigo-600"></div>
//             <span className="text-xl font-semibold text-gray-800">CourseConnect</span>
//           </div>
//           <button
//             className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
//             onClick={() => setMobileSidebarOpen(false)}
//           >
//             <FiX className="h-6 w-6" />
//           </button>
//         </div>

//         {/* Sidebar content */}
//         <div className="flex-1 overflow-y-auto px-4 py-4">
//           <nav className="space-y-1">
//             {menuItems.map((item) => (
//               <div key={item.name}>
//                 <button
//                   onClick={() => {
//                     if (item.submenu) {
//                       toggleSubmenu(item.name);
//                     } else {
//                       handleNavigation(item.path);
//                     }
//                   }}
//                   className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-100`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <span className="text-gray-500">{item.icon}</span>
//                     <span>{item.name}</span>
//                   </div>
//                   {item.submenu && (
//                     <span className="text-gray-500">
//                       {activeSubmenu === item.name ? (
//                         <FiChevronUp />
//                       ) : (
//                         <FiChevronDown />
//                       )}
//                     </span>
//                   )}
//                 </button>
//                 {item.submenu && activeSubmenu === item.name && (
//                   <div className="mt-1 space-y-1 pl-11">
//                     {item.submenu.map((subItem) => (
//                       <button
//                         key={subItem.name}
//                         onClick={
//                           subItem.onClick ||
//                           (() => handleNavigation(subItem.path))
//                         }
//                         className={`block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
//                       >
//                         {subItem.name}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//         </div>

//         {/* Sidebar footer */}
//         <div className="border-t p-4">
//           <div className="flex items-center space-x-3">
//             <img
//               src={userProfile.profilePic || 'https://www.gravatar.com/avatar/?d=mp&s=200'}
//               alt="User profile"
//               className="h-10 w-10 rounded-full"
//             />
//             <div className="flex-1">
//               <p className="text-sm font-medium text-gray-900">{userProfile.first_name} {userProfile.last_name}</p>
//               <p className="text-xs text-gray-500">{userProfile.email}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
//             >
//               <FiLogOut className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
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
  FiLayers,
  FiUser,
  FiPieChart,
  FiMail,
  FiHelpCircle,
  FiBell
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../services/authHelper";

const Sidebar = ({
  sidebarOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  userProfile,
  badgeCounts
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      title: "New course published",
      message: "Your course 'Advanced React' has been approved",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "New student enrolled",
      message: "John Doe enrolled in your 'JavaScript Fundamentals' course",
      time: "1 day ago",
      read: true
    },
    {
      id: 3,
      title: "Payment received",
      message: "You've received $49.99 for course enrollment",
      time: "3 days ago",
      read: true
    }
  ];

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  // Admin Menu Items
  const adminMenu = [
    {
      name: "Dashboard",
      icon: <FiHome className="w-5 h-5" />,
      path: "/dashboard",
      badge: null,
    },
    {
      name: "Courses",
      icon: <FiBook className="w-5 h-5" />,
      path: "/admin/courses",
      submenu: [
        {
          name: "All Courses",
          path: "/admin/courses",
          badge: badgeCounts?.courses || 0,
        },
        {
          name: "Add New",
          path: "/admin/courses/new",
        },
        {
          name: "Categories",
          path: "/admin/courses/categories",
          badge: 5,
        },
      ],
    },
    {
      name: "Students",
      icon: <FiUsers className="w-5 h-5" />,
      path: "/admin/students",
      submenu: [
        {
          name: "All Students",
          path: "/admin/students/all",
          badge: badgeCounts?.students || 0,
        },
        {
          name: "Enrolled Students",
          path: "/admin/students/enrolled",
          badge: badgeCounts?.enrolledStudents || 0,
        },
        {
          name: "Not Enrolled",
          path: "/admin/students/not-enrolled",
          badge: badgeCounts?.notEnrolledStudents || 0,
        },
        {
          name: "Enrollments",
          path: "/admin/students/enrollments",
          badge: badgeCounts?.enrollments || 0,
        },
        {
          name: "Progress",
          path: "/admin/students/progress",
        },
      ],
    },
    {
      name: "Instructors",
      icon: <FiUser className="w-5 h-5" />,
      path: "/admin/instructors",
      submenu: [
        {
          name: "All Instructors",
          path: "/admin/instructors/all",
          badge: badgeCounts?.instructors || 0,
        },
        {
          name: "Add New",
          path: "/admin/instructors/new",
        },
        {
          name: "Performance",
          path: "/admin/instructors/performance",
        },
      ],
    },

    // {
    //   name: "Content",
    //   icon: <FiLayers className="w-5 h-5" />,
    //   path: "/admin/content",
    //   submenu: [
    //     { name: "Modules", path: "/admin/content/modules" },
    //     { name: "Lessons", path: "/admin/content/lessons" },
    //     { name: "Quizzes", path: "/admin/content/quizzes" }
    //   ]
    // },
    {
      name: "Payments",
      icon: <FiDollarSign className="w-5 h-5" />,
      path: "/admin/payments",
      badge: badgeCounts?.payments || 0,
    },
    {
      name: "Certificates",
      icon: <FiAward className="w-5 h-5" />,
      path: "/admin/certificates",
      badge: badgeCounts?.certificates || 0,
    },
    {
      name: "Reports",
      icon: <FiBarChart2 className="w-5 h-5" />,
      path: "/admin/reports",
      submenu: [
        { name: "Revenue", path: "/admin/reports/revenue" },
        { name: "Engagement", path: "/admin/reports/engagement" },
        { name: "Completion", path: "/admin/reports/completion" },
      ],
    },
  ];
  const instructorMenu = [
    {
      name: "Dashboard",
      icon: <FiHome className="w-5 h-5" />,
      path: "/dashboard",
      badge: null,
    },
    {
      name: "My Courses",
      icon: <FiBook className="w-5 h-5" />,
      path: "/admin/courses",
      submenu: [
        {
          name: "All Courses",
          path: "/admin/courses",
          badge: badgeCounts?.courses || 0,
        },
        {
          name: "Add New",
          path: "/admin/courses/new",
        },
        {
          name: "Categories",
          path: "/admin/courses/categories",
          badge: 5,
        },
      ],
    },
    {
      name: "Students",
      icon: <FiUsers className="w-5 h-5" />,
      path: "/admin/students",
      submenu: [
        {
          name: "All Students",
          path: "/admin/students/all",
          badge: badgeCounts?.students || 0,
        },
        {
          name: "Enrollments",
          path: "/admin/students/enrollments",
          badge: badgeCounts?.enrollments || 0,
        },
        {
          name: "Progress",
          path: "/admin/students/progress",
        },
      ],
    },

    // {
    //   name: "Content",
    //   icon: <FiLayers className="w-5 h-5" />,
    //   path: "/admin/content",
    //   submenu: [
    //     { name: "Modules", path: "/admin/content/modules" },
    //     { name: "Lessons", path: "/admin/content/lessons" },
    //     { name: "Quizzes", path: "/admin/content/quizzes" }
    //   ]
    // },
    {
      name: "Payments",
      icon: <FiDollarSign className="w-5 h-5" />,
      path: "/admin/payments",
      badge: badgeCounts?.payments || 0,
    },
    {
      name: "Certificates",
      icon: <FiAward className="w-5 h-5" />,
      path: "/admin/certificates",
      badge: badgeCounts?.certificates || 0,
    },
  ];

  // Student Menu Items
  const studentMenu = [
    {
      name: "My Learning",
      icon: <FiBookOpen className="w-5 h-5" />,
      path: "/student/learning",
      badge: 2
    },
    {
      name: "Schedule",
      icon: <FiCalendar className="w-5 h-5" />,
      path: "/student/schedule"
    },
    {
      name: "Messages",
      icon: <FiMessageSquare className="w-5 h-5" />,
      path: "/student/messages",
      badge: 4
    },
    {
      name: "Certificates",
      icon: <FiAward className="w-5 h-5" />,
      path: "/student/certificates"
    },
    {
      name: "Help Center",
      icon: <FiHelpCircle className="w-5 h-5" />,
      path: "/student/help"
    }
  ];

    const getMenuItems = () => {
      switch (userProfile?.role) {
        case "ADMIN":
          return adminMenu;
        case "INSTRUCTOR":
          return instructorMenu;
        default:
          return studentMenu;
      }
    };

    const menuItems = getMenuItems();

  // const menuItems =
  //   userProfile?.role === "ADMIN" || userProfile?.role === "INSTRUCTOR"
  //     ? adminMenu
  //     : studentMenu;
console.log("profile:", userProfile);
  const handleNavigation = (path) => {
    navigate(path);
    setMobileSidebarOpen(false);
  };

  const toggleSubmenu = (menuName) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-xl transition-all duration-300 ease-in-out
    ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:relative ${sidebarOpen ? "" : "lg:w-0 lg:overflow-hidden"}`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600">
                <FiBookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                CourseConnect
              </span>
            </div>
            <button
              className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            {/* Notifications dropdown for mobile */}
            <div className="mb-4 lg:hidden">
              <button
                onClick={toggleNotifications}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <FiBell className="h-5 w-5 text-gray-500" />
                    {unreadCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <span>Notifications</span>
                </div>
                <FiChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    notificationsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {notificationsOpen && (
                <div className="mt-1 space-y-1 pl-11">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg px-3 py-2 text-sm ${
                        notification.read
                          ? "text-gray-600"
                          : "bg-blue-50 text-blue-700 font-medium"
                      }`}
                    >
                      <div className="font-medium">{notification.title}</div>
                      <div className="truncate">{notification.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Main Navigation */}
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
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isActive(item.path) && !item.submenu
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`${
                          isActive(item.path) && !item.submenu
                            ? "text-indigo-600"
                            : "text-gray-500"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      {item.badge && (
                        <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-800">
                          {item.badge}
                        </span>
                      )}
                      {item.submenu && (
                        <span
                          className={`${
                            activeSubmenu === item.name
                              ? "text-indigo-600"
                              : "text-gray-500"
                          }`}
                        >
                          {activeSubmenu === item.name ? (
                            <FiChevronUp className="h-5 w-5" />
                          ) : (
                            <FiChevronDown className="h-5 w-5" />
                          )}
                        </span>
                      )}
                    </div>
                  </button>
                  {item.submenu && activeSubmenu === item.name && (
                    <div className="mt-1 space-y-1 pl-11">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavigation(subItem.path)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            isActive(subItem.path)
                              ? "bg-indigo-50 text-indigo-700"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span>{subItem.name}</span>
                          {subItem.badge && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                              {subItem.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={
                    userProfile?.profilePic ||
                    `https://ui-avatars.com/api/?name=${userProfile?.first_name}+${userProfile?.last_name}&background=random`
                  }
                  alt="User profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {userProfile?.first_name} {userProfile?.last_name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {userProfile?.role === "ADMIN" ? "Administrator" : "Student"}
                </p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => navigate("/settings")}
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                  title="Settings"
                >
                  <FiSettings className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;