// Profile.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'; // Import axios for the preview version


import { getMyProfile, updateProfile, changePassword } from '../api/auth';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000';

const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/150";
  if (path.startsWith('http')) return path;
  
  // For local dev, you would use import.meta.env.VITE_API_URL
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${baseUrl}${cleanPath}`;
};

const Profile = () => {
  // --- State Management ---
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    headline: '',
    bio: '',
    email: '',
    profile_image: '',
    role: '',
  });
  
  const [passwords, setPasswords] = useState({
    old_password: '', // Matches backend Pydantic model
    new_password: ''
  });

  // UI States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Toast State
  const [toast, setToast] = useState(null); // { type: 'success'|'error'|'info', title: '', message: '' }

  const fileInputRef = useRef(null);

  // --- Helpers ---
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    // Auto-dismiss after 4 seconds
    setTimeout(() => setToast(null), 4000);
  };

  const closeToast = () => setToast(null);

  // --- Fetch Data ---
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      if (error.response && error.response.status === 401) {
        showToast('error', 'Session Expired', 'Please login again.');
      } else {
        showToast('error', 'Error', 'Failed to load profile data.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUser((prev) => ({ ...prev, new_image_file: file }));
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    
    try {
      const formData = new FormData();
      formData.append('first_name', user.first_name || '');
      formData.append('last_name', user.last_name || '');
      formData.append('headline', user.headline || '');
      formData.append('bio', user.bio || '');
      
      if (user.new_image_file) {
        formData.append('profile_image', user.new_image_file);
      }

      const response = await updateProfile(formData);
      
      setUser((prev) => ({
        ...prev,
        ...response.user,
        new_image_file: null
      }));
      setPreviewImage(null); 
      
      showToast('success', 'Profile Updated', 'Your profile information has been saved successfully.');
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.detail || 'Failed to update profile.';
      showToast('error', 'Update Failed', errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    setPassLoading(true);
    try {
      await changePassword(passwords);
      setPasswords({ old_password: '', new_password: '' });
      showToast('success', 'Password Changed', 'Your password has been updated successfully.');
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.detail || "Failed to update password";
      showToast('error', 'Update Failed', errorMsg);
    } finally {
      setPassLoading(false);
    }
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
      <div className="fixed bottom-5 right-5 z-50 animate-[slideUp_0.3s_ease-out]">
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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FAF3E1]">Loading...</div>;

  return (
    <>
      <style>{`
        /* Custom scrollbar for cleaner look */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #F5E7C6; }
        ::-webkit-scrollbar-thumb { background: #FF6D1F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #e5621c; }
        
        /* Keyframe for toast slide up */
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Noto+Sans:wght@300;400;500;600;700&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal; font-size: 24px;
          line-height: 1; letter-spacing: normal; text-transform: none;
          display: inline-block; white-space: nowrap; word-wrap: normal;
          direction: ltr; -webkit-font-smoothing: antialiased;
        }
        body { font-family: 'Lexend', sans-serif; }
      `}</style>

      {renderToast()}

      <main className="min-h-screen flex flex-col text-[#222222]" style={{ backgroundColor: '#FAF3E1' }}>
        <div className="flex-1 w-full max-w-5xl mx-auto p-6 md:p-8 flex flex-col gap-8">
          
          {/* Header Card Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#ead7cd] overflow-hidden">
            {/* Cover Photo Area */}
            <div className="relative h-48 md:h-60 w-full bg-gray-200 group">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-IS3H68Zp7MGOC6MUiib5PjBvxA0zIHri97f6d3w85YXmvAq-Majlkw_N6_JLOYR2Y-TChhIoiiSyGnYQ48ImhEWKJ54FcigoujWxFzXsNLcn5tStqfvwi2g49WELsxKuiRPh7TDzpWZE4HMQ3zkWBpLRFH9y7Fak3IAP8byW-czbk7wVhSVzjVjaRnL3G5fe0X66K49jiOF94LuCa5pfMeXWnps6f9VqVghRYErLPR8Ro1U_UvtV9ApAbkS4MvFWNArXTjRxQCA")',
                }}
              />
              <div className="absolute inset-0 bg-[#222222]/20"></div>
              {/* Cover photo change button is static for now */}
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
                  <div className="size-32 md:size-40 rounded-full border-[6px] border-[#FF6D1F] bg-white p-1 shadow-lg relative z-10 overflow-hidden">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url("${previewImage || getImageUrl(user.profile_image)}")`,
                      }}
                    />
                  </div>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                  
                  <button
                    onClick={handleImageClick}
                    className="absolute bottom-2 right-2 z-20 bg-[#FF6D1F] text-white p-2 rounded-full shadow-md hover:bg-[#e5621c] transition-colors cursor-pointer"
                    title="Change Profile Picture"
                  >
                    <span className="material-symbols-outlined text-lg block">edit</span>
                  </button>
                </div>

                {/* Name & Role */}
                <div className="flex flex-col items-center md:items-start flex-1 pt-16 md:pt-0 pb-2">
                  <h1 className="text-3xl font-bold text-[#222222] mb-1">{user.first_name} {user.last_name}</h1>
                  <div className="flex items-center gap-2 text-[#222222]/70 mb-2">
                    <span className="material-symbols-outlined text-lg text-[#FF6D1F]">person</span>
                    <span className="text-sm font-medium">{user.role || 'User'}</span>
                    <span className="mx-2">•</span>
                    {/* <span className="material-symbols-outlined text-lg text-[#FF6D1F]">location_on</span>
                    <span className="text-sm font-medium">San Francisco, CA</span> */}
                  </div>
                </div>

                {/* Stats (Static for demo) */}
                {/* <div className="flex gap-4 md:gap-8 justify-center md:justify-end py-4 border-t md:border-t-0 border-[#F5E7C6] w-full md:w-auto">
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
                </div> */}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#F5E7C6] gap-8 mt-6">
                <a className="flex items-center gap-2 border-b-[3px] border-[#FF6D1F] text-[#222222] pb-3 px-1" href="#">
                  <span className="material-symbols-outlined text-xl text-[#FF6D1F]">person</span>
                  <p className="text-sm font-bold tracking-wide">Personal Info</p>
                </a>
                {/* <a className="flex items-center gap-2 border-b-[3px] border-transparent text-[#222222]/60 hover:text-[#FF6D1F] transition-colors pb-3 px-1" href="#">
                  <span className="material-symbols-outlined text-xl">menu_book</span>
                  <Link to="/student/course" className="text-sm font-medium tracking-wide">My Courses</Link>
                </a> */}
                {user?.role !== 'admin' &&(<Link to='/student/course' className="flex items-center gap-2 border-b-[3px] border-transparent text-[#222222]/60 hover:text-[#FF6D1F] transition-colors pb-3 px-1" href="#">
                  <span className="material-symbols-outlined text-xl">menu_book</span>
                  <p className="text-sm font-medium tracking-wide">My Course</p>
                </Link>
                )}
                {user?.role !== 'user' &&(<Link to='/dashboard' className="flex items-center gap-2 border-b-[3px] border-transparent text-[#222222]/60 hover:text-[#FF6D1F] transition-colors pb-3 px-1" href="#">
                  <span className="material-symbols-outlined text-xl">dashboard</span>
                  <p className="text-sm font-medium tracking-wide">Dashboard</p>
                </Link>
                )}
                {user?.role !== 'admin' &&(<Link to='/payment-history' className="flex items-center gap-2 border-b-[3px] border-transparent text-[#222222]/60 hover:text-[#FF6D1F] transition-colors pb-3 px-1" href="#">
                  <span className="material-symbols-outlined text-xl">history</span>
                  <p className="text-sm font-medium tracking-wide">Payment History</p>
                </Link>
                )}
              </div>
            </div>
          </div>

          {/* Form Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Progress & Bio */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Progress Card (Static) */}
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
                        name="first_name"
                        value={user.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#222222]">Last Name</label>
                      <input
                        className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all placeholder-[#222222]/40"
                        type="text"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222222]">Headline</label>
                    <input
                      className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all placeholder-[#222222]/40"
                      type="text"
                      name="headline"
                      value={user.headline || ''}
                      onChange={handleInputChange}
                      placeholder="e.g. Aspiring Web Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222222]">Bio</label>
                    <textarea
                      className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all placeholder-[#222222]/40 resize-none"
                      rows="4"
                      name="bio"
                      value={user.bio || ''}
                      onChange={handleInputChange}
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
                        value={user.email}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#222222]/40 uppercase bg-white/50 px-2 py-1 rounded">Read-only</span>
                    </div>
                  </div>
                  <div className="pt-6 flex items-center justify-end gap-4">
                    <button className="px-6 py-2.5 rounded-lg text-[#222222] font-medium hover:bg-[#F5E7C6] transition-colors" type="button" onClick={() => fetchProfile()}>
                      Cancel
                    </button>
                    <button
                      className="px-8 py-2.5 rounded-lg text-white font-bold shadow-md hover:bg-[#e5621c] transition-all flex items-center gap-2 disabled:opacity-50"
                      style={{ backgroundColor: '#FF6D1F' }}
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={saving}
                    >
                      <span className="material-symbols-outlined text-lg">{saving ? 'sync' : 'save'}</span>
                      {saving ? 'Saving...' : 'Save Changes'}
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
                      className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all "
                      placeholder="••••••••"
                      type="password"
                      name="old_password"
                      value={passwords.old_password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222222]">New Password</label>
                    <input
                      className="w-full bg-[#F5E7C6] border-none rounded-lg px-4 py-3 text-[#222222] focus:ring-0 focus:border-2 focus:border-[#FF6D1F] transition-all"
                      type="password"
                      name="new_password"
                      value={passwords.new_password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <button
                    className="w-full mt-2 py-2.5 rounded-lg border-2 font-bold hover:bg-[#FF6D1F] hover:text-white transition-all disabled:opacity-50"
                    style={{ borderColor: '#FF6D1F', color: '#FF6D1F' }}
                    type="button"
                    onClick={handleUpdatePassword}
                    disabled={passLoading}
                  >
                    {passLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>

              {/* Connected Accounts (Static) */}
              {/* <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ead7cd]">
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
              </div> */}

              {/* Danger Zone (Static) */}
              {/* <div className="p-6 rounded-2xl border border-red-100 mt-4" style={{ backgroundColor: '#FAF3E1' }}>
                <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">Danger Zone</h3>
                <p className="text-xs text-[#222222]/70 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="w-full py-2.5 rounded-lg border font-medium hover:bg-red-50 hover:border-red-300 transition-all text-sm" style={{ backgroundColor: '#FAF3E1', borderColor: '#fecaca', color: '#ef4444' }}>
                  Delete Account
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;