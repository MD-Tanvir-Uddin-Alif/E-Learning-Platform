import React from 'react'
import Register from '../../features/auth/Register'
import Navbar from '../common/Navbar'

const NavOnlyLayout = () => {
  return (
    <>
        <Navbar/>
        <Register/>
    </>
  )
}

export default NavOnlyLayout