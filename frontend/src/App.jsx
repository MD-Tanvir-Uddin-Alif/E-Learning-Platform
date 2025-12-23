import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react'
import MainLayout from './components/Layout/MainLayout'
import NavOnlyLayout from './components/Layout/NavOnlyLayout';
import Home from './pages/Home'
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import ForgotPassword from './features/auth/ForgotPassword';

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
    ],
  },

  /* nothing (login page) */
  { path: 'forgotpassword', element: <ForgotPassword /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
