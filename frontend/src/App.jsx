import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react'
import MainLayout from './components/Layout/MainLayout'
import NavOnlyLayout from './components/Layout/NavOnlyLayout';
import Home from './pages/Home'
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import ForgotPassword from './features/auth/ForgotPassword';
import EmailVerification from './features/auth/EmailVerification';
import Profile from './pages/Profile';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import SetPassword from './features/auth/SetPassword';

const router = createBrowserRouter([
  /* navbar + footer */
  {
    element: <MainLayout/>,
    children: [
      { path: '/', element: <Home/>},
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

  /* nothing */
  { path: 'forgotpassword', element: <ForgotPassword /> },
  { path: 'set-password', element: <SetPassword />}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
