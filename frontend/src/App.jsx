import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react'
import MainLayout from './components/Layout/MainLayout'
import NavOnlyLayout from './components/Layout/NavOnlyLayout';
import Home from './pages/Home'
import Register from './features/auth/Register';

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
    ],
  },

  // /* nothing (login page) */
  // { path: 'login', element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
