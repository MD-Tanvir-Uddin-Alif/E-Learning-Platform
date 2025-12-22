// src/components/Register.jsx
import React from 'react';

const Register = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Noto+Sans:wght@100..900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
      .material-symbols-outlined{ font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
      .peer:checked + div { border-color:#ff6d1f; box-shadow:0 0 0 2px #ff6d1f; }
    `}</style>

    <main className="min-h-screen grid place-items-center py-10 px-4 md:px-6 bg-[#FAF3E1] text-[#1d120c] font-['Lexend']">
      <div className="w-full max-w-[800px] flex flex-col gap-6">

        {/* Heading */}
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Create Your Account</h1>
          <p className="text-[#a16545] text-base">Join thousands of learners and instructors today.</p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-end text-sm font-medium">
            <span>Account Type</span>
            <span className="text-[#ff6d1f]">Step 1 of 3</span>
          </div>
          <div className="h-2 bg-[#ead7cd] rounded-full overflow-hidden">
            <div className="h-full bg-[#ff6d1f] w-1/3 rounded-full shadow-[0_0_10px_rgba(255,109,31,0.5)]"></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#f4ebe6] p-6 md:p-8 space-y-6">

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-bold mb-3">I want to join as a:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student */}
              <label className="relative group cursor-pointer">
                <input type="radio" name="role" className="peer sr-only" />
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

              {/* Instructor (pre-selected) */}
              <label className="relative group cursor-pointer">
                <input type="radio" name="role" className="sr-only" defaultChecked />
                <div className="h-full flex flex-col gap-3 p-5 rounded-xl border-2 border-[#ff6d1f] bg-[#ff6d1f] shadow-lg shadow-orange-500/30 text-white">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-3xl">cast_for_education</span>
                    <div className="w-6 h-6 rounded-full bg-white text-[#ff6d1f] grid place-items-center">
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold">Instructor</p>
                    <p className="text-white/90 text-sm">Create courses and earn revenue.</p>
                  </div>
                </div>
              </label>
            </div>

            {/* Info box */}
            <div className="mt-4 p-4 rounded-lg bg-[#F5E7C6] border border-[#ff6d1f] flex gap-3 items-start">
              <span className="material-symbols-outlined text-[#ff6d1f] mt-0.5">info</span>
              <div>
                <p className="text-sm font-bold">Instructor Benefits</p>
                <p className="text-[#a16545] text-sm leading-relaxed">Instructors receive 70% revenue share on all paid courses and get early access to our new course builder tools.</p>
              </div>
            </div>
          </div>

          {/* ========== FORM ========== */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="fullname" className="text-sm font-medium">Full Name</label>
                <input id="fullname" type="text" placeholder="Jane Doe" className="w-full h-11 px-4 rounded-lg bg-[#FAF3E1] border-transparent focus:border-[#ff6d1f] focus:ring-[#ff6d1f] focus:bg-white transition-colors placeholder:text-[#a16545]/50" />
              </div>

              {/* Email */}
              <div className="space-y-1 relative">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <input id="email" type="email" defaultValue="jane.doe@example.com" className="w-full h-11 px-4 rounded-lg bg-[#FAF3E1] border-transparent focus:border-[#ff6d1f] focus:ring-[#ff6d1f] focus:bg-white transition-colors" />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#ff6d1f] text-xl">check_circle</span>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <div className="relative">
                  <input id="password" type="password" defaultValue="Password123" className="w-full h-11 px-4 rounded-lg bg-[#FAF3E1] border-transparent focus:border-[#ff6d1f] focus:ring-[#ff6d1f] focus:bg-white transition-colors" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a16545] hover:text-[#1d120c]">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                </div>
                {/* Strength */}
                <div className="pt-1">
                  <div className="flex gap-1 h-1.5 mb-1">
                    <div className="flex-1 rounded-full bg-[#F5E7C6]"></div>
                    <div className="flex-1 rounded-full bg-[#F5E7C6]"></div>
                    <div className="flex-1 rounded-full bg-gray-200"></div>
                  </div>
                  <p className="text-xs text-[#a16545]">Strength: <span className="font-bold">Medium</span></p>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label htmlFor="confirm_password" className="text-sm font-medium">Confirm Password</label>
                <input id="confirm_password" type="password" placeholder="••••••••" className="w-full h-11 px-4 rounded-lg bg-[#FAF3E1] border-transparent focus:border-[#ff6d1f] focus:ring-[#ff6d1f] focus:bg-white transition-colors" />
              </div>
            </div>

            {/* Profile Picture */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#FAF3E1] border border-[#ead7cd] grid place-items-center shrink-0">
                  <span className="material-symbols-outlined text-4xl text-[#a16545] opacity-50">person</span>
                </div>
                <label className="flex-1 h-20 rounded-xl bg-[#F5E7C6] border-2 border-dashed border-[#ff6d1f] grid place-items-center cursor-pointer hover:bg-[#F5E7C6]/80 transition-colors group">
                  <input type="file" className="sr-only" />
                  <span className="material-symbols-outlined text-[#ff6d1f] group-hover:scale-110 transition-transform">cloud_upload</span>
                  <p className="text-xs font-medium mt-1">Click to upload or drag & drop</p>
                </label>
              </div>
            </div>

            <hr className="border-[#f4ebe6]" />

            {/* Checkbox + reCAPTCHA */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="peer size-5 rounded border border-[#a16545] bg-white checked:bg-[#ff6d1f] checked:border-[#ff6d1f] transition-all" />
                <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 text-sm pointer-events-none">check</span>
                <span className="text-sm text-[#1d120c] group-hover:text-[#ff6d1f] transition-colors">I agree to the <a href="#" className="underline decoration-[#ff6d1f]/50 underline-offset-2">Terms of Service</a> and <a href="#" className="underline decoration-[#ff6d1f]/50 underline-offset-2">Privacy Policy</a>.</span>
              </label>

              {/* Mock reCAPTCHA */}
              <div className="w-full sm:w-[300px] h-[74px] bg-[#222222] rounded-sm border border-[#555] flex items-center justify-between px-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-white rounded-sm border-2 border-[#c1c1c1] hover:border-white cursor-pointer"></div>
                  <span className="text-white text-sm">I'm not a robot</span>
                </div>
                <div className="flex flex-col items-center text-[10px] text-[#f5f5f5] opacity-50">
                  <div className="w-8 h-8 bg-contain bg-no-repeat bg-center mb-0.5" style={{backgroundImage:'url(https://www.gstatic.com/recaptcha/api2/logo_48.png)'}}></div>
                  <div>reCAPTCHA</div>
                  <div className="text-[9px]">Privacy - Terms</div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button type="button" className="w-full h-12 bg-[#ff6d1f] hover:bg-orange-600 text-white font-bold rounded-lg text-lg shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
              <span>Complete Registration</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className="text-center text-sm text-[#a16545]">
              Already have an account? <a href="#" className="text-[#ff6d1f] font-bold hover:underline">Log in</a>
            </p>
          </form>

          {/* Help Links */}
          <div className="flex justify-center gap-6 text-sm text-[#a16545]/70">
            <a className="hover:text-[#ff6d1f]" href="#">Help Center</a>
            <a className="hover:text-[#ff6d1f]" href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default Register;