// src/SetPassword.jsx
import React, { useState } from 'react';

const SetPassword = () => {
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showNew, setShowNew]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('new password:', pwd);
  };

  return (
    <>
      {/* fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF3E1] to-[#F5E7C6] p-4 font-['Lexend'] text-[#222222]">
        {/* header */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6D1F] text-[#FAF3E1] shadow-lg">
            <span className="material-symbols-outlined text-[28px]">school</span>
          </div>
            <span className="text-xl font-bold tracking-tight text-[#222222]">Skill<span className="text-[#FF6D1F]">Forge</span></span>
        </div>

        {/* card */}
        <div className="w-[92%] sm:w-[384px] rounded-2xl bg-[#FAF3E1] border border-[#F5E7C6] shadow-xl px-6 py-8">
          <div className="mb-6 text-center sm:text-left">
            <h1 className="text-2xl font-bold leading-tight mb-2">Create your new password</h1>
            <p className="text-sm text-[#222222]/70">Must be at least 8 characters</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* new password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="new-password" className="text-sm font-semibold ml-1">New Password</label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNew ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                  className="peer h-12 w-full rounded-xl bg-white border-2 border-[#F5E7C6] pl-4 pr-12 text-[#222222] placeholder-[#222222]/40 outline-none focus:border-[#FF6D1F]"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(s => !s)}
                  className="absolute right-0 top-0 h-12 w-12 grid place-items-center text-[#222222]/40 hover:text-[#222222]"
                >
                  <span className="material-symbols-outlined text-[20px]">{showNew ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </div>

            {/* confirm password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm-password" className="text-sm font-semibold ml-1">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="h-12 w-full rounded-xl bg-white border-2 border-[#F5E7C6] pl-4 pr-12 text-[#222222] placeholder-[#222222]/40 outline-none focus:border-[#FF6D1F]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(s => !s)}
                  className="absolute right-0 top-0 h-12 w-12 grid place-items-center text-[#222222]/40 hover:text-[#222222]"
                >
                  <span className="material-symbols-outlined text-[20px]">{showConfirm ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              className="mt-2 h-12 w-full rounded-xl bg-[#FF6D1F] text-[#FAF3E1] font-semibold shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] hover:bg-[#e65c14]"
            >
              Reset Password
            </button>
          </form>
        </div>

        {/* footer links */}
        <div className="mt-8 flex gap-6 text-sm font-medium text-[#222222]/60">
          <a className="hover:text-[#FF6D1F] transition-colors" href="#">Help</a>
          <a className="hover:text-[#FF6D1F] transition-colors" href="#">Privacy</a>
          <a className="hover:text-[#FF6D1F] transition-colors" href="#">Terms</a>
        </div>
      </div>
    </>
  );
};

export default SetPassword;