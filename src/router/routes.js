
import React from 'react';
import { createBrowserRouter, redirect } from "react-router-dom";
import AuthLayout from "../layout/authLayout";
import AppLayout from "../layout/appLayout";
import LoginPage from "../pages/auth/login";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/user/dashboard";
import RegisterPage from "../pages/auth/register";
import PrivateRoute from '../utils/PrivateRoute';
import GuestRoute from '../utils/GuestRoute';
import AdminRoute from '../utils/AdminRoute';
import AdminDashboardPage from '../pages/admin/dashboard';
import UserListPage from '../pages/admin/UserListPage';
import NewCoursePage from '../pages/admin/AddCourse';
import CourseListPage from '../pages/admin/manageCourse';
import CourseLessonsPage from '../pages/admin/ManageLessons';
import EditCoursePage from '../pages/admin/EditCourse';
import CourseDetailsPage from '../pages/admin/CourseDetailsView';
import CoursesPage from '../pages/user/Courses';
import StudentCourseDetailPage from '../pages/user/CourseDetailsPage';
import LearningPage from '../pages/user/LearningPage';
import NewModulePage from '../pages/admin/AddModules';
import EditModulePage from '../pages/admin/EditModule';
import ManageModulesPage from '../pages/admin/manageModules';
import PaymentPage from '../pages/user/PaymentPage';

const routes = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/dashboard'),
  },
  {
    element: <GuestRoute />, // Wrap the following routes in GuestRoute to ensure they are protected
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          }
        ],
      },
    ],
  },
  {
    element: <PrivateRoute />, // Wrap the following routes in PrivateRoute to ensure they are protected
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/courses',
            element: <CoursesPage />
          },
          {
            path: '/courses/:courseId',
            element: <StudentCourseDetailPage />
          },
          {
            path: 'learn/:courseId/lessons/:lessonId',
            element: <LearningPage />
          },
          {
            path: 'payment/:courseId',
            element: <PaymentPage />
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/admin/courses/new',
            element: <NewCoursePage />
          },
          {
            path: '/admin/courses/:courseId/modules/:moduleId/lessons',
            element: <CourseLessonsPage />
          },
          {
            path: '/admin/courses/:courseId/modules',
            element: <ManageModulesPage />
          },
          {
            path: '/admin/courses/:courseId/modules/new',
            element: <NewModulePage />
          },
          {
            path: '/admin/courses/:courseId/modules/:moduleId/edit',
            element: <EditModulePage />
          },
          {
            path: '/admin/courses/:courseId/edit',
            element: <EditCoursePage />
          },
          {
            path: '/admin/courses/:courseId',
            element: <CourseDetailsPage />
          },
          {
            path: '/admin/dashboard',
            element: <AdminDashboardPage />,
          },
          {
            path: '/admin/courses',
            element: <CourseListPage />
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;