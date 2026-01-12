import React from 'react';
import { useLocation } from 'react-router-dom';

const EmailVerification = () => {
  const { state } = useLocation();
  const email = state?.email || 'alex.morgan@example.com';

  return (
    <>
      {/* Fonts + icon helper */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
        .material-symbols-outlined { 
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; 
        }
        @keyframes scaleIn { 
          0% { transform: scale(0); opacity: 0; } 
          100% { transform: scale(1); opacity: 1; } 
        }
        .animate-scale-in { 
          animation: scaleIn 0.5s ease-out forwards; 
        }
      `}</style>

      <div className="min-h-screen flex flex-col bg-[#FAF3E1] text-[#222222] font-['Lexend']">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 w-full">
          <div className="w-full max-w-[520px] bg-white backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-[#F5E7C6] flex flex-col gap-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F5E7C6] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ff6d1f]/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Verification State */}
            <div className="flex flex-col items-center text-center gap-6 relative z-10">
              {/* Icon */}
              <div className="size-24 bg-[#ff6d1f]/10 rounded-full flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[#ff6d1f] text-[48px]">mark_email_unread</span>
              </div>

              {/* Headline & Subtext */}
              <div className="flex flex-col gap-2">
                <h1 className="text-[#222222] text-3xl font-black tracking-tight">
                  Verify your email
                </h1>
                <p className="text-[#222222]/80 text-lg font-normal leading-relaxed">
                  We've sent a verification link to <br />
                  <span className="font-bold text-[#222222]">{email}</span>
                </p>
              </div>

              {/* Instructions Box */}
              <div className="w-full bg-[#F5E7C6]/60 p-5 rounded-xl border border-[#F5E7C6] text-left flex gap-3 items-start">
                <span className="material-symbols-outlined text-[#ff6d1f] mt-0.5">info</span>
                <p className="text-[#222222] text-sm leading-relaxed">
                  Please check your inbox and click the link to activate your account. If you don't see it, check your spam folder.
                </p>
              </div>

              {/* Email Providers */}
              {/* <div className="w-full grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#F5E7C6] hover:bg-[#ff6d1f] text-[#222222] hover:text-white font-bold transition-all duration-300 group">
                  <span className="material-symbols-outlined text-xl group-hover:text-white transition-colors">mail</span>
                  Open Gmail
                </button>
                <button className="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#F5E7C6] hover:bg-[#ff6d1f] text-[#222222] hover:text-white font-bold transition-all duration-300 group">
                  <span className="material-symbols-outlined text-xl group-hover:text-white transition-colors">drafts</span>
                  Open Outlook
                </button>
              </div> */}

              {/* Footer Actions */}
              {/* <div className="flex flex-col items-center gap-4 mt-2 w-full">
                <div className="flex items-center gap-2 text-sm text-[#222222]/70">
                  <span>Didn't receive the email?</span>
                  <button className="font-bold text-[#ff6d1f] hover:text-[#ff6d1f]/80 transition-colors flex items-center gap-1">
                    Resend Code <span className="text-[#222222] font-normal">(00:29)</span>
                  </button>
                </div>
                <a className="text-sm font-medium text-[#ff6d1f] hover:underline flex items-center gap-1 group" href="#">
                  <span className="material-symbols-outlined text-base group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                  Wrong email address?
                </a>
              </div> */}
            </div>
          </div>
        </main>

        {/* Simple Footer */}
        <footer className="w-full py-6 text-center text-[#222222]/40 text-sm">
          <p>© 2025 LearnUp Platform. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default EmailVerification;