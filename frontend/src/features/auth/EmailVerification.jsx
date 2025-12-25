import React from 'react'
import { useLocation } from 'react-router-dom'

const EmailVerification = () => {

     const { state } = useLocation();
     const email = state?.email || 'your email';
  return (
    <>
    {/* Fonts + icon helper (once in app is enough) */}
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
      .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
      @keyframes scaleIn { 0%{transform:scale(0);opacity:0;} 100%{transform:scale(1);opacity:1;} }
      .animate-scale-in { animation:scaleIn 0.5s ease-out forwards; }
    `}</style>

    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FAF3E1] to-[#F5E7C6] dark:from-[#23160f] dark:to-[#1a120e] text-[#222222] dark:text-white font-['Lexend'] transition-colors duration-300">
      {/* Navbar (optional visual) - remove if you don't want it */}
      {/* <header className="w-full flex items-center justify-between whitespace-nowrap px-10 py-5">
        <div className="flex items-center gap-3 text-[#222222] dark:text-white">
          <div className="size-8 text-[#ff6d1f]">
            <span className="material-symbols-outlined text-4xl">school</span>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">LearnUp</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-[#222222]/70 dark:text-gray-300 hidden sm:block">Need help?</span>
          <button className="flex items-center justify-center rounded-lg px-5 py-2.5 bg-transparent border-2 border-[#ff6d1f] text-[#ff6d1f] text-sm font-bold hover:bg-[#ff6d1f] hover:text-white transition-colors duration-300">
            Contact Support
          </button>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-[520px] bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-[#F5E7C6] dark:border-white/10 flex flex-col gap-8 relative overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F5E7C6] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ff6d1f]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Verification State (active) */}
          <div className="flex flex-col items-center text-center gap-6 relative z-10">
            {/* Icon */}
            <div className="size-24 bg-[#ff6d1f]/10 rounded-full flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[#ff6d1f] text-[48px]">mark_email_unread</span>
            </div>

            {/* Headline & Subtext */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[#222222] dark:text-white text-3xl font-black tracking-tight">Verify your email</h1>
              <p className="text-[#222222]/80 dark:text-gray-300 text-lg font-normal leading-relaxed">
                We've sent a verification link to <br /><span className="font-bold text-[#222222] dark:text-white">{email}</span>
              </p>
            </div>

            {/* Instructions Box */}
            <div className="w-full bg-[#F5E7C6]/60 dark:bg-white/5 p-5 rounded-xl border border-[#F5E7C6] dark:border-white/10 text-left flex gap-3 items-start">
              <span className="material-symbols-outlined text-[#ff6d1f] mt-0.5">info</span>
              <p className="text-[#222222] dark:text-gray-200 text-sm leading-relaxed">
                Please check your inbox and click the link to activate your account. If you don't see it, check your spam folder.
              </p>
            </div>

            {/* Email Providers */}
            <div className="w-full grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#F5E7C6] hover:bg-[#ff6d1f] text-[#222222] hover:text-white font-bold transition-all duration-300 group">
                <span className="material-symbols-outlined text-xl group-hover:text-white transition-colors">mail</span>
                Open Gmail
              </button>
              <button className="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#F5E7C6] hover:bg-[#ff6d1f] text-[#222222] hover:text-white font-bold transition-all duration-300 group">
                <span className="material-symbols-outlined text-xl group-hover:text-white transition-colors">drafts</span>
                Open Outlook
              </button>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col items-center gap-4 mt-2 w-full">
              <div className="flex items-center gap-2 text-sm text-[#222222]/70 dark:text-gray-400">
                <span>Didn't receive the email?</span>
                <button className="font-bold text-[#ff6d1f] hover:text-[#ff6d1f]/80 transition-colors flex items-center gap-1">
                  Resend Code <span className="text-[#222222] font-normal">(00:29)</span>
                </button>
              </div>
              <a className="text-sm font-medium text-[#ff6d1f] hover:underline flex items-center gap-1 group" href="#">
                <span className="material-symbols-outlined text-base group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                Wrong email address?
              </a>
            </div>
          </div>

          {/* Success State (commented out) */}
          {/* 
          <div className="flex flex-col items-center text-center gap-6 relative z-10 py-8 animate-scale-in">
            <div className="size-24 bg-green-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-[48px]">check_circle</span>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-[#222222] dark:text-white text-3xl font-black tracking-tight">Email Confirmed!</h1>
              <p className="text-[#222222]/80 dark:text-gray-300 text-lg font-normal">Your account has been successfully verified. <br/>You can now access your dashboard.</p>
            </div>
            <button className="w-full mt-4 flex items-center justify-center rounded-lg h-12 bg-[#ff6d1f] text-white text-base font-bold shadow-md hover:bg-[#ff6d1f]/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              Go to Dashboard
            </button>
          </div>
          */}

          {/* Error State (commented out) */}
          {/* 
          <div className="flex flex-col items-center text-center gap-6 relative z-10 py-8">
            <div className="size-24 bg-red-100 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-[#ff6d1f] text-[48px]">error</span></div>
            <div className="flex flex-col gap-2"><h1 className="text-[#222222] dark:text-white text-3xl font-black tracking-tight">Verification Failed</h1><p className="text-[#222222]/80 dark:text-gray-300 text-lg font-normal">The verification link is invalid or has expired.</p></div>
            <div className="w-full bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/20 text-center"><p className="text-[#ff6d1f] font-medium text-sm">Error Code: TOKEN_EXPIRED</p></div>
            <button className="w-full mt-2 flex items-center justify-center rounded-lg h-12 bg-[#F5E7C6] text-[#222222] hover:bg-[#ff6d1f] hover:text-white text-base font-bold transition-all duration-300">Request New Token</button>
          </div>
          */}

          {/* Loading State (commented out) */}
          {/* 
          <div className="flex flex-col items-center text-center gap-8 relative z-10 w-full animate-pulse">
            <div className="size-24 bg-[#F5E7C6] rounded-full"></div>
            <div className="flex flex-col items-center gap-3 w-full"><div className="h-8 bg-[#F5E7C6] rounded w-2/3"></div><div className="h-4 bg-[#F5E7C6] rounded w-1/2"></div></div>
            <div className="w-full h-24 bg-[#F5E7C6] rounded-xl"></div>
            <div className="w-full grid grid-cols-2 gap-4"><div className="h-12 bg-[#F5E7C6] rounded-lg"></div><div className="h-12 bg-[#F5E7C6] rounded-lg"></div></div>
          </div>
          */}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full py-6 text-center text-[#222222]/40 dark:text-gray-400 text-sm">
        <p>© 2024 LearnUp Platform. All rights reserved.</p>
      </footer>
    </div>
    </>
  )
}

export default EmailVerification