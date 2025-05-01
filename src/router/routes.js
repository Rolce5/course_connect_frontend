import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import AuthLayout from "../layout/authLayout";
import AppLayout from "../layout/appLayout";
import LoginPage from "../pages/auth/login";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/user/dashboard";
import RegisterPage from "../pages/auth/register";
import PrivateRoute from "../utils/PrivateRoute";
import GuestRoute from "../utils/GuestRoute";
import AdminRoute from "../utils/AdminRoute";
import AdminDashboardPage from "../pages/admin/dashboard";
import NewCoursePage from "../pages/admin/AddCourse";
import CourseListPage from "../pages/admin/manageCourse";
import CourseLessonsPage from "../pages/admin/ManageLessons";
import EditCoursePage from "../pages/admin/EditCourse";
import CourseDetailsPage from "../pages/admin/CourseDetailsView";
import CoursesPage from "../pages/user/Courses";
import StudentCourseDetailPage from "../pages/user/CourseDetailsPage";
import LearningPage from "../pages/user/LearningPage";
import NewModulePage from "../pages/admin/AddModules";
import EditModulePage from "../pages/admin/EditModule";
import ManageModulesPage from "../pages/admin/manageModules";
import PaymentPage from "../pages/user/PaymentPage";
import StudentsPage from "../pages/admin/StudentsPage";
import PaymentsPage from "../pages/admin/PaymentsPage";
import CertificatesPage from "../pages/admin/CertificatesPage";
import EnrollmentsPage from "../pages/admin/EnrollmentsPage";
import RevenueReport from "../pages/admin/RevenueReport";
import EngagementReport from "../pages/admin/EngagementReport";
import CompletionReport from "../pages/admin/CompletionReport";
import ProgressPage from "../pages/admin/ProgressPage";
import MyLearningPage from "../pages/user/MyLearningPage";
import SchedulePage from "../pages/user/SchedulePage";
import MessagesPage from "../pages/user/MessagesPage";
import SudentCertificatesPages from "../pages/user/SudentCertificatesPages";
import HelpCenter from "../pages/user/HelpCenter";
import SettingsPage from "../pages/SettingsPage";
import QuizManagementPage from "../pages/admin/QuizManagementPage";
import LessonDetailWithQuiz from "../pages/admin/LessonDetailWithQuiz";

const routes = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    element: <GuestRoute />, // Wrap the following routes in GuestRoute to ensure they are protected
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
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
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/courses",
            element: <CoursesPage />,
          },
          {
            path: "/courses/:courseId",
            element: <StudentCourseDetailPage />,
          },
          {
            path: "payment/:courseId",
            element: <PaymentPage />,
          },
          {
            path: "/student/learning",
            element: <MyLearningPage />,
          },
          {
            path: "/student/schedule",
            element: <SchedulePage />,
          },
          {
            path: "/student/messages",
            element: <MessagesPage />,
          },
          {
            path: "/student/certificates",
            element: <SudentCertificatesPages />,
          },
          {
            path: "/student/help",
            element: <HelpCenter />,
          },
        ],
      },
      // Routes without sidebar
      {
        element: <AppLayout hideSidebar />, // No manual prop passing
        children: [
          {
            path: "/settings",
            index: true,
            element: <SettingsPage />,
          },
          {
            path: ":courseTitle/:courseId/learn",
            element: <LearningPage />,
          },
        ],
      },

      // {
      //   path: ":courseTitle/:courseId/learn",
      //   element: (
      //     <AppLayout hideSidebar>
      //       <LearningPage />
      //     </AppLayout>
      //   ),
      // },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/admin/courses/new",
            element: <NewCoursePage />,
          },
          {
            path: "/admin/courses/:courseId/modules/:moduleId/lessons",
            element: <CourseLessonsPage />,
          },
          {
            path: "/admin/courses/:courseId/modules/:moduleId/lessons/:lessonId",
            element: <LessonDetailWithQuiz />,
          },
          {
            path: "/admin/courses/:courseId/modules",
            element: <ManageModulesPage />,
          },
          {
            path: "/admin/courses/:courseId/modules/new",
            element: <NewModulePage />,
          },
          {
            path: "/admin/courses/:courseId/modules/:moduleId/edit",
            element: <EditModulePage />,
          },
          {
            path: "/admin/courses/:courseId/edit",
            element: <EditCoursePage />,
          },
          {
            path: "/admin/courses/:courseId",
            element: <CourseDetailsPage />,
          },
          {
            path: "/admin/dashboard",
            element: <AdminDashboardPage />,
          },
          {
            path: "/admin/courses",
            element: <CourseListPage />,
          },
          {
            path: "/admin/students/all",
            element: <StudentsPage />,
          },
          {
            path: "/admin/payments",
            element: <PaymentsPage />,
          },
          {
            path: "/admin/certificates",
            element: <CertificatesPage />,
          },
          {
            path: "/admin/students/enrollments",
            element: <EnrollmentsPage />,
          },
          {
            path: "/admin/reports/revenue",
            element: <RevenueReport />,
          },
          {
            path: "/admin/reports/engagement",
            element: <EngagementReport />,
          },
          {
            path: "/admin/reports/completion",
            element: <CompletionReport />,
          },
          {
            path: "/admin/students/progress",
            element: <ProgressPage />,
          },
          {
            path: "/admin/quiz/:quizId",
            element: <QuizManagementPage />,
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
