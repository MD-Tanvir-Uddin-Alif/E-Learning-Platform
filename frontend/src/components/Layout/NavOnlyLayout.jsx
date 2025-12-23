import React from 'react'
import Navbar from '../common/Navbar'
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