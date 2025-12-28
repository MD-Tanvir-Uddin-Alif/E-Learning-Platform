import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // --- Toast State ---
  const [toast, setToast] = useState(null); 

  // --- Helpers ---
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const closeToast = () => setToast(null);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setIsSubmitted(true);
      showToast('success', 'Email Sent', `We sent a reset link to ${email}`);
    },
    onError: (error) => {
        const msg = error.response?.data?.detail || 'Something went wrong.';
        showToast('error', 'Request Failed', msg);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(email);
  };

  // --- Render Toast Component ---
  const renderToast = () => {
    if (!toast) return null;

    let icon = '';
    let barColorClass = '';
    if (toast.type === 'success') {
      icon = 'check';
      barColorClass = 'bg-[#FF6D1F]'; 
    } else if (toast.type === 'error') {
      icon = 'priority_high';
      barColorClass = 'bg-red-500'; 
    } else {
      icon = 'info';
      barColorClass = 'bg-blue-500';
    }

    return (
      <div className="fixed top-5 right-5 z-50 animate-[slideDown_0.3s_ease-out]">
        <div className="pointer-events-auto relative w-[320px] overflow-hidden rounded-xl bg-[#F5E7C6] shadow-xl transition-transform hover:-translate-y-1 duration-300 group border border-[#ead7cd]">
          <div className="flex items-start gap-3 p-4 pr-10">
            <div className={`flex size-6 shrink-0 items-center justify-center rounded-full text-white ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'info' ? 'bg-blue-500' : 'bg-[#FF6D1F]'}`}>
              <span className="material-symbols-outlined text-[16px] font-bold">{icon}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-sm font-semibold text-[#222222]">{toast.title}</h3>
              <p className="font-display text-xs text-[#222222]/80 leading-normal">{toast.message}</p>
            </div>
            <button onClick={closeToast} className="absolute right-3 top-3 flex items-center justify-center text-[#222222]/40 transition-colors hover:text-[#FF6D1F]">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <div className="h-[3px] w-full bg-[#FAF3E1]">
            <div className={`h-full w-full ${barColorClass}`}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
        .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {renderToast()}

      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#FAF3E1] to-[#F5E7C6] font-['Lexend']">
        <div className="w-full max-w-[384px] flex flex-col items-center">

          {/* Logo */}
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6D1F] text-white shadow-md transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#222222]">Skill<span className="text-[#FF6D1F]">Forge</span></span>
          </div>

          {/* Card */}
          <div className="w-full bg-[#FAF3E1] border border-[#F5E7C6] rounded-3xl shadow-lg p-8 sm:p-10 flex flex-col gap-6 relative overflow-hidden">
            
            {/* Logic to Toggle between Form and Success Message */}
            {!isSubmitted ? (
              <>
                {/* Heading */}
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-[#222222] text-[28px] font-bold leading-tight">Forgot your password?</h1>
                  <p className="text-[#222222]/70 text-base font-normal leading-relaxed">Enter your email and we’ll send a reset link</p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <label className="flex flex-col w-full">
                    <span className="sr-only">Email Address</span>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex w-full rounded-full border border-[#F5E7C6] bg-[#FAF3E1] h-14 px-5 text-[#222222] placeholder:text-[#222222]/40 focus:outline-none focus:ring-2 focus:ring-[#ff6d1f] focus:border-transparent transition-all duration-200 text-base"
                      />
                    </div>
                  </label>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex w-full cursor-pointer items-center justify-center rounded-full h-12 bg-[#ff6d1f] hover:bg-[#E5621D] text-[#FAF3E1] text-base font-bold transition-colors duration-200 shadow-sm shadow-[#ff6d1f]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isPending ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              </>
            ) : (
              /* Success State (Styled to match new design) */
              <div className="flex flex-col items-center gap-6 text-center animate-[slideDown_0.3s_ease-out]">
                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff6d1f]/10 text-[#ff6d1f]">
                  <span className="material-symbols-outlined text-[32px]">check_mail</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-[#222222] text-[24px] font-bold leading-tight">Check your mail</h1>
                  <p className="text-[#222222]/70 text-sm font-normal leading-relaxed">
                    We have sent a reset link to <br/><strong>{email}</strong>
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-base font-bold text-[#ff6d1f] hover:text-[#E5621D] transition-colors duration-200"
                >
                  Try another email
                </button>
              </div>
            )}

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
};

export default ForgotPassword;