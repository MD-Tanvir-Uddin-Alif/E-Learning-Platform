import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react'
import MainLayout from './components/Layout/MainLayout'
import NavOnlyLayout from './components/Layout/NavOnlyLayout';
import DashboardLayout from './hooks/DashboardLayout'; // Imported the new Layout
import Home from './pages/Home'
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import ForgotPassword from './features/auth/ForgotPassword';
import EmailVerification from './features/auth/EmailVerification';
import Profile from './pages/Profile';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import ResetPassword from './features/auth/SetPassword';
import About from './pages/About';
// SideBar import removed here because it's now handled inside DashboardLayout
import UserTable from './features/admin/UserTable';
import AddCategory from './features/admin/AddCategory';
import CategoryAdmin from './features/admin/CategoryAdmin';
import CreateCourse from './features/instructor/CreateCourse';
import AddVideos from './features/instructor/AddVideos';
import MyCoursesGallery from './features/instructor/MyCoursesGallery';
import InstructorCourseOverview from './features/instructor/InstructorCourseOverview';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetails from './pages/CourseDetails';
import StudentCourseDashboard from './features/student/StudentCourseDashboard';
import VideoPlayer from './features/student/VideoPlayer';
import CertificateView from './features/student/CertificateView';

const router = createBrowserRouter([
  /* navbar + footer */
  {
    element: <MainLayout/>,
    children: [
      { path: '/', element: <Home/>},
      { path: 'about', element: <About />}
    ],
  },

  /* navbar only */
  {
    element: <NavOnlyLayout />,
    children: [
      { path: 'registration', element: <Register/> },
      { path: 'login', element: <Login/> },
      { path: 'verify-email', element: <EmailVerification/> },
      { path: 'profile', element: <ProtectedRoute><Profile/></ProtectedRoute> },
      { path: 'courses', element: <CourseCatalog />},
      { path: 'courses/:courseId', element: <CourseDetails />},
      { path: 'student/course', element: <ProtectedRoute><StudentCourseDashboard /></ProtectedRoute>},
      { path: 'learn/:courseId', element: <ProtectedRoute><VideoPlayer /></ProtectedRoute> },
      { path: 'certificate/:courseId', element: <ProtectedRoute><CertificateView /></ProtectedRoute>}

    ],
  },

  /* Dashboard / Admin Routes (Sidebar + Content) */
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <div className="p-10 text-2xl font-bold">Dashboard Home</div> }, 
      // admin path
      { path: 'users', element: <UserTable /> },
      { path: 'add-category', element: <AddCategory />},
      { path: 'admin-category', element: <CategoryAdmin />},
      //instractor path
      { path: 'course/add', element: <CreateCourse />},
      { path: 'video/add', element: <AddVideos />},
      { path: 'instructor/courses', element: <MyCoursesGallery />},
      { path: 'instructor/course/:courseId', element: <InstructorCourseOverview />},
    ]
  },

  /* Standalone Routes */
  { path: 'forgotpassword', element: <ForgotPassword /> },
  { path: 'set-password', element: < ResetPassword/>},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;