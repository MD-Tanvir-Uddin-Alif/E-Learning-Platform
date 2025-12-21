import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#FAF3E1] pt-16 text-[#222222]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 border-b border-[#222222]/5 pb-12 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[32px] text-[#FF6D1F]">school</span>
              <span className="text-xl font-bold">Skill<span className="text-[#FF6D1F]">Forge</span></span>
            </a>
            <p className="text-sm text-[#222222]/70">Empowering learners worldwide with accessible, high-quality education from industry experts.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold">Explore</h4>
            <ul className="flex flex-col gap-2 text-sm text-[#222222]/70">
              <li><a href="#" className="hover:text-[#FF6D1F]">Design Courses</a></li>
              <li><a href="#" className="hover:text-[#FF6D1F]">Development Bootcamps</a></li>
              <li><a href="#" className="hover:text-[#FF6D1F]">Business Strategy</a></li>
              <li><a href="#" className="hover:text-[#FF6D1F]">Photography</a></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-[#222222]/70">
              <li><a href="#" className="hover:text-[#FF6D1F]">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF6D1F]">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF6D1F]">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF6D1F]">Contact</a></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold">Subscribe</h4>
            <p className="text-sm text-[#222222]/70">Get the latest course updates and career tips.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="w-full rounded-md border-none bg-white px-3 py-2 text-sm shadow-sm placeholder:text-[#222222]/40 focus:ring-1 focus:ring-[#FF6D1F]" />
              <button className="rounded-md bg-[#FF6D1F] px-4 py-2 font-bold text-white shadow-sm hover:bg-[#FF6D1F]/90">Go</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-sm text-[#222222]/50">© 2024 SkillForge Inc. All rights reserved.</p>
          <div className="flex gap-6 text-[#222222]/50">
            <a href="#" className="hover:text-[#FF6D1F]"><span className="sr-only">Facebook</span>FB</a>
            <a href="#" className="hover:text-[#FF6D1F]"><span className="sr-only">Twitter</span>TW</a>
            <a href="#" className="hover:text-[#FF6D1F]"><span className="sr-only">Instagram</span>IG</a>
            <a href="#" className="hover:text-[#FF6D1F]"><span className="sr-only">LinkedIn</span>IN</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer