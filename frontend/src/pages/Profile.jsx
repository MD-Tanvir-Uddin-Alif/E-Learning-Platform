// Profile.jsx
import React from 'react';

const Profile = () => {
  return (
    <>
      <style>{`
        /* Custom scrollbar for cleaner look */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #F5E7C6;
        }
        ::-webkit-scrollbar-thumb {
          background: #FF6D1F;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #e5621c;
        }

        /* Material Symbols font and Lexend font */
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Noto+Sans:wght@300;400;500;600;700&display=swap');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
        }

        body {
          font-family: 'Lexend', sans-serif;
        }
      `}</style>

      <main className="min-h-screen flex flex-col text-[#222222]" style={{ backgroundColor: '#FAF3E1' }}>
        <div className="flex-1 w-full max-w-5xl mx-auto p-6 md:p-8 flex flex-col gap-8">
          {/* Header Card Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#ead7cd] overflow-hidden">
            {/* Cover Photo Area */}
            <div className="relative h-48 md:h-60 w-full bg-gray-200 group">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-IS3H68Zp7MGOC6MUiib5PjBvxA0zIHri97f6d3w85YXmvAq-Majlkw_N6_JLOYR2Y-TChhIoiiSyGnYQ48ImhEWKJ54FcigoujWxFzXsNLcn5tStqfvwi2g49WELsxKuiRPh7TDzpWZE4HMQ3zkWBpLRFH9y7Fak3IAP8byW-czbk7wVhSVzjVjaRnL3G5fe0X66K49jiOF94LuCa5pfMeXWnps6f9VqVghRYErLPR8Ro1U_UvtV9ApAbkS4MvFWNArXTjRxQCA")',
                }}
              />
              <div className="absolute inset-0 bg-[#222222]/20"></div>
              <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#222222] text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all shadow-sm">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
                Change Cover
              </button>
            </div>

            {/* Profile Info & Stats Wrapper */}
            <div className="px-6 md:px-10 pb-6 relative">
              <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-16 md:-mt-12 mb-6">
                {/* Avatar */}
                <div className="relative group shrink-0 mx-auto md:mx-0">
                  <div className="size-32 md:size-40 rounded-full border-[6px] border-[#FF6D1F] bg-white p-1 shadow-lg relative z-10">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXMBGpsQr6fLUqVHtOUOYgiigVO3V9J5CFOTLynjH4KdxTjJgwjz9V7ScBlxUkxVixbsZKPsxZhm0PvJabz7D9KT1JbjqBCjHQ96GdHTrlxM3CWuzUif-FEOHFjQioe2oecAPCO-6OdV6g0Clqw_n0W_ADCewVNUkEgMQ6Plf7sl4qvGTQKClaaw5SBAfgnBDc7qGSiKAD5sG-XZN-bw5d03etMcSLAOJbnW4oe0gM_zGXds5SkDYjCWxJkWHpAWHBkuPFd8kQzdg")',
                      }}
                    />
                  </div>
                  <button
                    className="absolute bottom-2 right-2 z-20 bg-[#FF6D1F] text-white p-2 rounded-full shadow-md hover:bg-[#e5621c] transition-colors"
                    title="Change Profile Picture"
                  >
                    <span className="material-symbols-outlined text-lg block">edit</span>
                  </button>
                </div>

                {/* Name & Role */}
                <div className="flex flex-col items-center md:items-start flex-1 pt-16 md:pt-0 pb-2">
                  <h1 className="text-3xl font-bold text-[#222222] mb-1">Alex Johnson</h1>
                  <div className="flex items-center gap-2 text-[#222222]/70 mb-2">
                    <span className="material-symbols-outlined text-lg text-[#FF6D1F]">school</span>
                    <span className="text-sm font-medium">Student Level 4</span>
                    <span className="mx-2">•</span>
                    <span className="material-symbols-outlined text-lg text-[#FF6D1F]">location_on</span>
                    <span className="text-sm font-medium">San Francisco, CA</span>
                  </div>
                </div>

                {/* Stats (Desktop right aligned) */}
                <div className="flex gap-4 md:gap-8 justify-center md:justify-end py-4 border-t md:border-t-0 border-[#F5E7C6] w-full md:w-auto">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-[#FF6D1F]">12</span>
                    <span className="text-xs md:text-sm text-[#222222] font-medium uppercase tracking-wide opacity-80">Courses</span>
                  </div>
                  <div className="w-px bg-[#F5E7C6] h-10"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-[#FF6D1F]">145</span>
                    <span className="text-xs md:text-sm text-[#222222] font-medium uppercase tracking-wide opacity-80">Hours</span>
                  </div>
                  <div className="w-px bg-[#F5E7C6] h-10"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-[#FF6D1F]">8</span>
                    <span className="text-xs md:text-sm text-[#222222] font-medium uppercase tracking-wide opacity-80">Certs</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#F5E7C6] gap-8 mt-6">
                <a className="flex items-center gap-2 border-b-[3px] border-[#FF6D1F] text-[#222222] pb-3 px-1" href="#">
                  <span className="material-symbols-outlined text-xl text-[#FF6D1F]">person</span>
                  <p className="text-sm font-bold tracking-wide">Personal Info</p>
                </a>
                <a className="flex items-center gap-2 border-b-[3px] border-transparent text-[#222222]/60 hover:text-[#FF6D1F] transition-colors pb-3 px-1" href="#">
                  <span className="material-symbols-outlined text-xl">menu_book</span>
                  <p className="text-sm font-medium tracking-wide">My Courses</p>
                </a>
                <a className="flex items-center gap-2 border-b-[3px] border-transparent text-[#222222]/60 hover:text-[#FF6D1F] transition-colors pb-3 px-1" href="#">
                  <span className="material-symbols-outlined text-xl">security</span>
                  <p className="text-sm font-medium tracking-wide">Security</p>
                </a>
              </div>
            </div>
          </div>

          {/* Form Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Progress & Bio */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Progress Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ead7cd]">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#222222]">Profile Completion</h3>
                    <p className="text-sm text-[#222222]/60 mt-1">Complete your bio and location to reach 100%</p>
                  </div>
                  <span className="text-xl font-bold text-[#FF6D1F]">75%</span>
                </div>
                <div className="h-3 w-full bg-[#F5E7C6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF6D1F] rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              {/* Personal Info Form */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#ead7cd]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#222222]">Basic Information</h3>
                  <button className="text-sm text-[#FF6D1F] font-bold hover:underline">Edit Public Profile</button>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#222222]">First Name</label>
                      <input
                        className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all placeholder-[#222222]/40"
                        type="text"
                        defaultValue="Alex"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#222222]">Last Name</label>
                      <input
                        className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all placeholder-[#222222]/40"
                        type="text"
                        defaultValue="Johnson"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222222]">Headline</label>
                    <input
                      className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all placeholder-[#222222]/40"
                      type="text"
                      defaultValue="Aspiring Web Developer & UX Enthusiast"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222222]">Bio</label>
                    <textarea
                      className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all placeholder-[#222222]/40 resize-none"
                      rows="4"
                      defaultValue="Passionate about building accessible web applications and learning new technologies. Currently focusing on mastering React and Tailwind CSS."
                    />
                    <p className="text-xs text-right text-[#222222]/50">250 characters left</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222222] flex items-center gap-2">
                      Email Address
                      <span className="material-symbols-outlined text-base text-[#222222]/40" title="Contact support to change email">info</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#222222]/50">mail</span>
                      <input
                        className="w-full bg-[#F5E7C6]/70 border-none rounded-lg pl-10 pr-4 py-3 text-[#222222]/70 cursor-not-allowed focus:ring-0"
                        readOnly
                        type="email"
                        defaultValue="alex.johnson@example.com"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#222222]/40 uppercase bg-white/50 px-2 py-1 rounded">Read-only</span>
                    </div>
                  </div>
                  <div className="pt-6 flex items-center justify-end gap-4">
                    <button className="px-6 py-2.5 rounded-lg text-[#222222] font-medium hover:bg-[#F5E7C6] transition-colors" type="button">
                      Cancel
                    </button>
                    <button
                      className="px-8 py-2.5 rounded-lg text-white font-bold shadow-md hover:bg-[#e5621c] transition-all flex items-center gap-2"
                      style={{ backgroundColor: '#FF6D1F' }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">save</span>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Security & Actions */}
            <div className="flex flex-col gap-6">
              {/* Password Management */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ead7cd]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#F5E7C6] p-2 rounded-lg text-[#FF6D1F]">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#222222]">Password</h3>
                </div>
                <div className="h-px w-full bg-[#F5E7C6] mb-6"></div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222222]">Current Password</label>
                    <input
                      className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222222]">New Password</label>
                    <input
                      className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all"
                      type="password"
                    />
                  </div>
                  <button
                    className="w-full mt-2 py-2.5 rounded-lg border-2 font-bold hover:bg-[#FF6D1F] hover:text-white transition-all"
                    style={{ borderColor: '#FF6D1F', color: '#FF6D1F' }}
                    type="button"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Connected Accounts */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ead7cd]">
                <h3 className="text-lg font-bold text-[#222222] mb-4">Connected Accounts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-[#F5E7C6] bg-[#F5E7C6]/30">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-[#222222]">Google</span>
                    </div>
                    <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-[#F5E7C6] bg-[#F5E7C6]/30 opacity-70">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1877F2]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-[#222222]">Facebook</span>
                    </div>
                    <button className="text-xs text-[#FF6D1F] font-bold hover:underline">Connect</button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-6 rounded-2xl border border-red-100 mt-4" style={{ backgroundColor: '#FAF3E1' }}>
                <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">Danger Zone</h3>
                <p className="text-xs text-[#222222]/70 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="w-full py-2.5 rounded-lg border font-medium hover:bg-red-50 hover:border-red-300 transition-all text-sm" style={{ backgroundColor: '#FAF3E1', borderColor: '#fecaca', color: '#ef4444' }}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;