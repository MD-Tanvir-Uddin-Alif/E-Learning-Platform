import { useState } from 'react'
import Navbar from './components/common/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-white font-['Inter'] text-[#222222] antialiased selection:bg-[#FF6D1F]/30 selection:text-[#FF6D1F]">
        <Navbar />
      </div>
    </>
  )
}

export default App
