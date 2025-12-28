import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/auth'; // Ensure path is correct
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  // --- Toast State ---
  const [toast, setToast] = useState(null); // { type: 'success'|'error'|'info', title: '', message: '' }

  // --- Helpers ---
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    // Auto-dismiss after 4 seconds
    setTimeout(() => setToast(null), 4000);
  };

  const closeToast = () => setToast(null);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      
      // --- CRITICAL UPDATE: Notify Navbar to update state ---
      window.dispatchEvent(new Event('auth-change'));
      
      showToast('success', 'Welcome Back', 'Login successful! Redirecting to profile...');
      
      // Small delay to allow the user to see the success toast before redirecting
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    },
    onError: (err) => {
      const errorMsg = err.response?.data?.detail || 'Please check your email and password.';
      showToast('error', 'Login Failed', errorMsg);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  // --- Render Toast Component ---
  const renderToast = () => {
    if (!toast) return null;

    let icon = '';
    let barColorClass = '';
    // Determine icon and color based on type
    if (toast.type === 'success') {
      icon = 'check';
      barColorClass = 'bg-[#FF6D1F]'; // Brand Orange
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
            {/* Icon Circle */}
            <div 
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-white ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'info' ? 'bg-blue-500' : 'bg-[#FF6D1F]'}`}
            >
              <span className="material-symbols-outlined text-[16px] font-bold">{icon}</span>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-sm font-semibold text-[#222222]">{toast.title}</h3>
              <p className="font-display text-xs text-[#222222]/80 leading-normal">{toast.message}</p>
            </div>
            {/* Close Button */}
            <button 
              onClick={closeToast}
              className="absolute right-3 top-3 flex items-center justify-center text-[#222222]/40 transition-colors hover:text-[#FF6D1F]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          {/* Progress Bar Decoration */}
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
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .floating-input:placeholder-shown+label { top: 50%; transform: translateY(-50%); font-size: 1rem; color: #6b7280; }
        .floating-input:not(:placeholder-shown)+label, .floating-input:focus+label { top: 0; transform: translateY(-50%) scale(.85); color: #ff6d1f; }
        .checkbox-custom:checked { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E"); background-color: #ff6d1f; border-color: #ff6d1f; }

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Render Toast Container */}
      {renderToast()}

      <div className="min-h-screen flex flex-col relative bg-[#FAF3E1] text-[#222222] font-['Lexend'] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{backgroundImage:'radial-gradient(#F5E7C6 2px, transparent 2px), radial-gradient(#F5E7C6 2px, transparent 2px)',backgroundSize:'40px 40px',backgroundPosition:'0 0,20px 20px'}}></div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 flex items-center justify-center"><img alt="" className="w-full h-full object-cover mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBznQwpjHP_2_-ERzhz7VyA2zAjrpyW1s3S9AN3TTjOfH8zKm1hkPXYWwRkymPaxMgADYCiz8sv5c-T7rfylxXxyd1WgHLPxbQgqZdNQ2rzq4kTB8Q_8pnqEDLDFG-TLdf5agtfpZlFiC4dBH05mX19J9U1H2tGxEjZerbX6c_bx33cAw_fGvpdefbAe04qtD8xSzLmgyEwVH8xU4nFqGI5p_9qMcXsaZu6b7nJ8BncUzBZYy6HbWiibtHFuTAv2dCZG4WBIdNbpIE"/></div>

        <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-[480px] bg-[#FAF3E1] border border-[#F5E7C6] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-[#222222] text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-[#222222]/70 text-sm">Please enter your details to sign in.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input id="email" name="email" type="email" required placeholder=" " value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="floating-input block px-4 pb-2.5 pt-5 w-full text-base text-[#222222] bg-[#FAF3E1] rounded-lg border border-[#F5E7C6] appearance-none focus:outline-none focus:ring-0 focus:border-[#ff6d1f] peer transition-colors h-14"/>
                <label htmlFor="email" className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] left-4 peer-focus:text-[#ff6d1f] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 bg-[#FAF3E1] px-1 pointer-events-none">Email Address</label>
              </div>

              <div className="relative">
                <input id="password" name="password" type={showPwd ? 'text' : 'password'} required placeholder=" " value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="floating-input block px-4 pb-2.5 pt-5 w-full text-base text-[#222222] bg-[#FAF3E1] rounded-lg border border-[#F5E7C6] appearance-none focus:outline-none focus:ring-0 focus:border-[#ff6d1f] peer transition-colors h-14 pr-12"/>
                <label htmlFor="password" className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] left-4 peer-focus:text-[#ff6d1f] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 bg-[#FAF3E1] px-1 pointer-events-none">Password</label>
                <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#222222] hover:text-[#ff6d1f] transition-colors focus:outline-none"><span className="material-symbols-outlined text-[20px]">{showPwd ? 'visibility_off' : 'visibility'}</span></button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="checkbox-custom h-5 w-5 rounded border-2 border-[#F5E7C6] bg-transparent text-[#ff6d1f] focus:ring-0 focus:ring-offset-0 focus:border-[#ff6d1f] transition-colors cursor-pointer group-hover:border-[#ff6d1f]/50"/>
                  <span className="text-sm text-[#222222] font-medium">Remember me</span>
                </label>
                <Link to="/forgotpassword" className="text-sm font-semibold text-[#ff6d1f] hover:underline hover:text-[#ff6d1f]/80 transition-colors">Forgot Password?</Link>
              </div>

              <button type="submit" disabled={isPending} className="w-full h-12 bg-[#ff6d1f] text-[#FAF3E1] rounded-lg font-bold text-base hover:bg-[#222222] hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group disabled:opacity-60">
                <span>{isPending ? 'Signing in…' : 'Sign in'}</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#F5E7C6]"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-[#FAF3E1] text-[#222222]/60">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#F5E7C6]/50 hover:bg-[#F5E7C6] border border-transparent hover:border-[#F5E7C6] transition-colors text-[#222222] font-medium"><svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Google</button>
              <button className="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#F5E7C6]/50 hover:bg-[#F5E7C6] border border-transparent hover:border-[#F5E7C6] transition-colors text-[#222222] font-medium"><svg className="w-5 h-5" viewBox="0 0 23 23"><path d="M1 1h10v10H1z" fill="#f35325"/><path d="M12 1h10v10H12z" fill="#81bc06"/><path d="M1 12h10v10H1z" fill="#05a6f0"/><path d="M12 12h10v10H12z" fill="#ffba08"/></svg>Microsoft</button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[#222222] text-sm">Don't have an account yet?<Link to="/registration" className="text-[#ff6d1f] font-bold hover:underline ml-1">Register now</Link></p>
            </div>
          </div>
        </main>

        <footer className="relative z-10 py-6 text-center text-[#222222]/60 text-xs"><p>© 2025 EduLearn Inc. All rights reserved. | <a className="hover:text-[#ff6d1f]" href="#">Privacy Policy</a></p></footer>
      </div>
    </>
  );
};

export default Login;