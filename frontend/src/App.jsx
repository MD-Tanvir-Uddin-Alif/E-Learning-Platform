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
      { path: 'profile', element: <ProtectedRoute><Profile/></ProtectedRoute> }
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
      // When at /dashboard, show a welcome message or dashboard widgets
      { path: 'dashboard', element: <div className="p-10 text-2xl font-bold">Dashboard Home</div> }, 
      // When at /users, UserTable renders beside the sidebar
      { path: 'users', element: <UserTable /> }
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