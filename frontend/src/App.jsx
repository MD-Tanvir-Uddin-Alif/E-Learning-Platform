import { useState } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-white font-['Inter'] text-[#222222] antialiased selection:bg-[#FF6D1F]/30 selection:text-[#FF6D1F]">
        <Navbar />
        <Home />
        <Footer />
      </div>
    </>
  )
}

export default App
