import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { resetPassword } from '../../api/auth';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: ''
  });
  
  // Design requires independent toggles for better UX
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  // --- Toast State ---
  const [toast, setToast] = useState(null); 

  // --- Helpers ---
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const closeToast = () => setToast(null);

  // Check token on mount
  useEffect(() => {
    if (!token) {
      showToast('error', 'Invalid Link', 'Missing reset token. Please request a new link.');
    }
  }, [token]);

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      showToast('success', 'Password Reset', 'Your password has been updated successfully. Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (err) => {
      const msg = err.response?.data?.detail || 'Failed to reset password.';
      showToast('error', 'Reset Failed', msg);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      showToast('error', 'Validation Error', 'Passwords do not match.');
      return;
    }
    if (!token) {
        showToast('error', 'Missing Token', 'Cannot reset password without a valid token.');
        return;
    }
    mutate({ token, new_password: formData.new_password });
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
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {renderToast()}

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF3E1] to-[#F5E7C6] p-4 font-['Lexend'] text-[#222222]">
        
        {/* Header (Logo) */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6D1F] text-[#FAF3E1] shadow-lg transition-transform hover:scale-105">
            <span className="material-symbols-outlined text-[28px]">school</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#222222]">Skill<span className="text-[#FF6D1F]">Forge</span></span>
        </div>

        {/* Card */}
        <div className="w-[92%] sm:w-[384px] rounded-2xl bg-[#FAF3E1] border border-[#F5E7C6] shadow-xl px-6 py-8">
          
          <div className="mb-6 text-center sm:text-left">
            <h1 className="text-2xl font-bold leading-tight mb-2">Create your new password</h1>
            <p className="text-sm text-[#222222]/70">Must be at least 8 characters</p>
          </div>

          {token ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* New Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="new-password" className="text-sm font-semibold ml-1">New Password</label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showNew ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.new_password}
                    onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                    className="peer h-12 w-full rounded-xl bg-white border-2 border-[#F5E7C6] pl-4 pr-12 text-[#222222] placeholder-[#222222]/40 outline-none focus:border-[#FF6D1F] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(s => !s)}
                    className="absolute right-0 top-0 h-12 w-12 grid place-items-center text-[#222222]/40 hover:text-[#222222] focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showNew ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm-password" className="text-sm font-semibold ml-1">Confirm Password</label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                    className="peer h-12 w-full rounded-xl bg-white border-2 border-[#F5E7C6] pl-4 pr-12 text-[#222222] placeholder-[#222222]/40 outline-none focus:border-[#FF6D1F] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute right-0 top-0 h-12 w-12 grid place-items-center text-[#222222]/40 hover:text-[#222222] focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showConfirm ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="mt-2 h-12 w-full rounded-xl bg-[#FF6D1F] text-[#FAF3E1] font-semibold shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] hover:bg-[#e65c14] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isPending ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          ) : (
            <div className="text-center p-4">
              <div className="bg-red-50 text-red-500 p-3 rounded-lg border border-red-100 mb-4 text-sm font-medium">
                Missing or invalid reset token.
              </div>
              <Link to="/forgotpassword" className="text-[#ff6d1f] font-bold hover:underline text-sm">
                Request a new link
              </Link>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex flex-col items-center gap-4">
           <Link to="/login" className="flex items-center gap-2 text-[#222222] font-medium hover:text-[#ff6d1f] transition-colors text-sm">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Login
            </Link>

            <div className="flex gap-6 text-sm font-medium text-[#222222]/60">
                <a className="hover:text-[#FF6D1F] transition-colors" href="#">Help</a>
                <a className="hover:text-[#FF6D1F] transition-colors" href="#">Privacy</a>
                <a className="hover:text-[#FF6D1F] transition-colors" href="#">Terms</a>
            </div>
        </div>

      </div>
    </>
  );
};

export default ResetPassword;