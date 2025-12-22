import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react'
import MainLayout from './components/Layout/MainLayout'

import Home from './pages/Home'

const router = createBrowserRouter([
  /* navbar + footer */
  {
    element: <MainLayout/>,
    children: [
      { path: '/', element: <Home/>},
    ],
  },

  // /* navbar only */
  // {
  //   element: <NavOnlyLayout />,
  //   children: [
  //     { path: 'dashboard', element: <Dashboard /> },
  //   ],
  // },

  // /* nothing (login page) */
  // { path: 'login', element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
