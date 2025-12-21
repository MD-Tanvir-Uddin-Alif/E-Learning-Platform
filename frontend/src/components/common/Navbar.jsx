import React from 'react'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#ebdcc1] px-4 py-3 shadow-sm" style={{ backgroundColor: 'rgba(245, 231, 198, 0.95)', backdropFilter: 'blur(8px)' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6D1F] text-white shadow-md transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Skill<span className="text-[#FF6D1F]">Forge</span></span>
          </a>
          
          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-medium hover:text-[#FF6D1F] transition-colors">Courses</a>
            <a href="#" className="text-sm font-medium hover:text-[#FF6D1F] transition-colors">Mentors</a>
            <a href="#" className="text-sm font-medium hover:text-[#FF6D1F] transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium hover:text-[#FF6D1F] transition-colors">Enterprise</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:block relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#222222]/50 group-focus-within:text-[#FF6D1F] material-symbols-outlined text-[20px]">search</span>
            <input type="text" placeholder="Search courses..." className="h-10 w-64 rounded-full border-none bg-white py-2 pl-10 pr-4 text-sm text-[#222222] shadow-sm ring-1 ring-transparent placeholder:text-[#222222]/40 focus:ring-2 focus:ring-[#FF6D1F]/50 focus:outline-none transition-all" />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="hidden rounded-full px-5 py-2 text-sm font-semibold hover:bg-[#FAF3E1]/50 transition-colors md:block">Log In</button>
            <button className="flex items-center justify-center rounded-full bg-[#FF6D1F] px-5 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar