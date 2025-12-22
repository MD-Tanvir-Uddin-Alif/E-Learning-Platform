import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import Home from '../../pages/Home'

const MainLayout = () => {
  return (
    <>
        <div className="bg-white font-['Inter'] text-[#222222] antialiased selection:bg-[#FF6D1F]/30 selection:text-[#FF6D1F]">
            <Navbar/>
              <Home/>
            <Footer/>
        </div>
    </>
  )
}

export default MainLayout