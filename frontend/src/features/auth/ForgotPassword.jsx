// src/components/ForgotPassword.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => (
  <>
    {/* Fonts + icon helper (once in app is enough) */}
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
      .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
    `}</style>

    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#FAF3E1] to-[#F5E7C6] font-['Lexend']">
      <div className="w-full max-w-[384px] flex flex-col items-center">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6D1F] text-white shadow-md transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Skill<span className="text-[#FF6D1F]">Forge</span></span>
        </div>

        {/* Card */}
        <div className="w-full bg-[#FAF3E1] border border-[#F5E7C6] rounded-3xl shadow-lg p-8 sm:p-10 flex flex-col gap-6 relative overflow-hidden">
          {/* Heading */}
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[#222222] text-[28px] font-bold leading-tight">Forgot your password?</h1>
            <p className="text-[#222222]/70 text-base font-normal leading-relaxed">Enter your email and we’ll send a reset link</p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <label className="flex flex-col w-full">
              <span className="sr-only">Email Address</span>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="flex w-full rounded-full border border-[#F5E7C6] bg-[#FAF3E1] h-14 px-5 text-[#222222] placeholder:text-[#222222]/40 focus:outline-none focus:ring-2 focus:ring-[#ff6d1f] focus:border-transparent transition-all duration-200 text-base"
                />
                {/* Error Icon (hidden by default) */}
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#ff6d1f] hidden">error</span>
              </div>
              {/* Error Text (hidden by default) */}
              <p className="text-[#ff6d1f] text-sm mt-2 font-medium hidden">Email not found</p>
            </label>

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center rounded-full h-12 bg-[#ff6d1f] hover:bg-[#E5621D] text-[#FAF3E1] text-base font-bold transition-colors duration-200 shadow-sm shadow-[#ff6d1f]/20"
            >
              Send Reset Link
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-2">
            <Link
              to="/login"
              className="text-[#222222] text-sm font-medium hover:text-[#ff6d1f] transition-colors duration-200 group inline-flex flex-col items-center gap-0.5"
            >
              Back to login
              <span className="block w-full h-[2px] bg-[#ff6d1f] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ForgotPassword;