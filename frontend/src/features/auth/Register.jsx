import { useState} from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [file, setFile] = useState(null);



  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: registerUser,
    // onSuccess: () => navigate('/verify-email', { state: { email: emailRef.current } }),
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  const fd = new FormData(e.target);
  const email = fd.get('email'); 

  fd.set('role', role);
  if (file) fd.set('profile_image', file);

  mutate(fd, {
    onSuccess: () => {
      navigate('/verify-email', { state: { email } });
    },
  });
};


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
        .material-symbols-outlined{ font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
        .peer:checked + div { border-color:#ff6d1f; box-shadow:0 0 0 2px #ff6d1f; }
      `}</style>

      <main className="min-h-screen grid place-items-center py-10 px-4 md:px-6 bg-[#FAF3E1] text-[#1d120c] font-['Lexend']">
        <div className="w-full max-w-[800px] flex flex-col gap-6">
          <div className="text-center space-y-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Create Your Account</h1>
            <p className="text-[#a16545] text-base">Join thousands of learners and instructors today.</p>
          </div>

          {/* error banner */}
          {error && !isSuccess &&(
            <div className="bg-red-100 text-red-700 rounded-lg p-3 text-sm">{error.response?.data?.detail || 'Registration failed'}</div>
          )}
          {isSuccess && (
            <div className="bg-green-100 text-green-700 rounded-lg p-3 text-sm">Check your email to verify your account.</div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-[#f4ebe6] p-6 md:p-8 space-y-6">
            {/* Role */}
            <div>
              <label className="block text-sm font-bold mb-3">I want to join as a:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Student */}
                <label className="relative group cursor-pointer">
                  <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} className="peer sr-only" />
                  <div className="h-full flex flex-col gap-3 p-5 rounded-xl border-2 border-transparent bg-[#F5E7C6] hover:bg-[#ebdcc0] peer-checked:ring-2 peer-checked:ring-[#ff6d1f] transition-all">
                    <div className="flex justify-between items-start">
                      <span className="material-symbols-outlined text-3xl">backpack</span>
                      <div className="w-6 h-6 rounded-full border-2 border-black/20 grid place-items-center peer-checked:border-[#ff6d1f] peer-checked:bg-[#ff6d1f] peer-checked:text-white">
                        <span className="material-symbols-outlined text-sm hidden peer-checked:block">check</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-bold">Student</p>
                      <p className="text-[#a16545] text-sm">Access courses and materials.</p>
                    </div>
                  </div>
                </label>

                {/* Instructor */}
                <label className="relative group cursor-pointer">
                  <input type="radio" name="role" value="instructor" checked={role === 'instructor'} onChange={() => setRole('instructor')} className="peer sr-only" />
                  <div className={`h-full flex flex-col gap-3 p-5 rounded-xl border-2 transition-all ${
                    role === 'instructor'
                      ? 'border-[#ff6d1f] bg-[#ff6d1f] shadow-lg shadow-orange-500/30 text-white'
                      : 'border-transparent bg-[#F5E7C6] hover:bg-[#ebdcc0] ring-2 ring-transparent hover:ring-orange-300'
                  }`}>
                    <div className="flex justify-between items-start">
                      <span className="material-symbols-outlined text-3xl">cast_for_education</span>
                      <div className="w-6 h-6 rounded-full bg-white text-[#ff6d1f] grid place-items-center">
                        <span className="material-symbols-outlined text-sm font-bold">check</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-bold">Instructor</p>
                      <p className={`text-sm ${role === 'instructor' ? 'text-white/90' : 'text-[#a16545]'}`}>Create courses and earn revenue.</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="first_name" required placeholder="First name" className="h-11 px-4 rounded-lg bg-[#FAF3E1] border-transparent focus:border-[#ff6d1f] focus:ring-[#ff6d1f] focus:bg-white transition-colors" />
              <input name="last_name" required placeholder="Last name" className="h-11 px-4 rounded-lg bg-[#FAF3E1] border-transparent focus:border-[#ff6d1f] focus:ring-[#ff6d1f] focus:bg-white transition-colors" />
              <input name="email" type="email" required placeholder="Email address" className="h-11 px-4 rounded-lg bg-[#FAF3E1] border-transparent focus:border-[#ff6d1f] focus:ring-[#ff6d1f] focus:bg-white transition-colors" />
              <input name="password" type="password" required placeholder="Password" className="h-11 px-4 rounded-lg bg-[#FAF3E1] border-transparent focus:border-[#ff6d1f] focus:ring-[#ff6d1f] focus:bg-white transition-colors" />
            </div>

            {/* Profile image */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#FAF3E1] border border-[#ead7cd] grid place-items-center shrink-0 overflow-hidden">
                  {file ? (
                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-[#a16545] opacity-50">person</span>
                  )}
                </div>
                <label className="flex-1 h-20 rounded-xl bg-[#F5E7C6] border-2 border-dashed border-[#ff6d1f] grid place-items-center cursor-pointer hover:bg-[#F5E7C6]/80 transition-colors group">
                  <input type="file" name="profile_image" onChange={(e) => setFile(e.target.files?.[0] || null)} className="sr-only" />
                  <span className="material-symbols-outlined text-[#ff6d1f] group-hover:scale-110 transition-transform">cloud_upload</span>
                  <p className="text-xs font-medium mt-1">{file ? file.name : 'Click to upload or drag & drop'}</p>
                </label>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="peer size-5 rounded border border-[#a16545] bg-white checked:bg-[#ff6d1f] checked:border-[#ff6d1f] transition-all" />
              <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 text-sm pointer-events-none">check</span>
              <span className="text-sm text-[#1d120c]">I agree to the <a href="#" className="underline decoration-[#ff6d1f]/50 underline-offset-2">Terms of Service</a> and <a href="#" className="underline decoration-[#ff6d1f]/50 underline-offset-2">Privacy Policy</a>.</span>
            </label>

            {/* Submit */}
            <button type="submit" disabled={isPending} className="w-full h-12 bg-[#ff6d1f] hover:bg-orange-600 text-white font-bold rounded-lg text-lg shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all disabled:opacity-60">
              {isPending ? 'Registering…' : 'Complete Registration'}
            </button>

            <p className="text-center text-sm text-[#a16545]">
              Already have an account? <Link to="/login" className="text-[#ff6d1f] font-bold hover:underline">Log in</Link>
            </p>
          </form>
        </div>
    </main>
  </>
);
};

export default Register;