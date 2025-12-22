import React from 'react'
import Register from '../../features/auth/Register'
import Navbar from '../common/Navbar'
import Login from '../../features/auth/Login'
import { Outlet } from 'react-router-dom'

const NavOnlyLayout = () => {
  return (
    <>
        <Navbar/>
        <main>
          <Outlet/>
        </main>
    </>
  )
}

export default NavOnlyLayout