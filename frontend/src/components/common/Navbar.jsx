import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMyProfile } from '../../api/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(null); 
  const dropdownRef = useRef(null);

  // Helper to check login status & fetch user info
  const checkLogin = async () => {
    const token = localStorage.getItem('token');
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      try {
        const data = await getMyProfile();
        setUserInfo(data);
      } catch (error) {
        console.error("Failed to fetch navbar user info", error);
        // Optional: specific error handling (e.g. invalid token)
      }
    } else {
      setUserInfo(null);
    }
  };

  // Initial check and event listener
  useEffect(() => {
    checkLogin();

    // Listen for custom event 'auth-change' to update immediately
    const handleAuthChange = () => {
      checkLogin();
    };

    window.addEventListener('auth-change', handleAuthChange);
    // Listen for storage events (e.g. other tabs)
    window.addEventListener('storage', handleAuthChange); 
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    
    // Dispatch event so other components (like this one) know auth state changed
    window.dispatchEvent(new Event('auth-change'));
    
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate('/login');
    setShowDropdown(false);
  };

  // Helper to build image URL safely
  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/150";
    if (path.startsWith('http')) return path;
    
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${baseUrl}${cleanPath}`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#ebdcc1] px-4 py-3 shadow-sm" style={{ backgroundColor: 'rgba(245, 231, 198, 0.95)', backdropFilter: 'blur(8px)' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6D1F] text-white shadow-md transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#222222]">Skill<span className="text-[#FF6D1F]">Forge</span></span>
          </Link>
          
          <div className="hidden items-center gap-8 md:flex text-[#222222]">
            <a href="#" className="text-sm font-medium hover:text-[#FF6D1F] transition-colors">Courses</a>
            <a href="#" className="text-sm font-medium hover:text-[#FF6D1F] transition-colors">Mentors</a>
            <a href="#" className="text-sm font-medium hover:text-[#FF6D1F] transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium hover:text-[#FF6D1F] transition-colors">Enterprise</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:block relative group text-[#222222]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#222222]/50 group-focus-within:text-[#FF6D1F] material-symbols-outlined text-[20px]">search</span>
            <input type="text" placeholder="Search courses..." className="h-10 w-64 rounded-full border-none bg-white py-2 pl-10 pr-4 text-sm text-[#222222] shadow-sm ring-1 ring-transparent placeholder:text-[#222222]/40 focus:ring-2 focus:ring-[#FF6D1F]/50 focus:outline-none transition-all" />
          </div>
          
          {/* Conditional Rendering based on Login Status */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              {/* User Profile Section */}
              <div className="flex items-center gap-3 pl-2 border-l border-black/5 dark:border-white/10">
                {/* Role Badge - Dynamic */}
                <div className="hidden xl:flex h-7 px-3 items-center justify-center rounded-full bg-[#FF6D1F]/10">
                  <span className="text-[#FF6D1F] text-xs font-bold uppercase tracking-wide">
                    {userInfo?.role || 'Student'}
                  </span>
                </div>
                
                {/* Avatar Button - Dynamic */}
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="size-10 rounded-full bg-white p-0.5 overflow-hidden ring-2 ring-transparent hover:ring-[#FF6D1F] transition-all group focus:outline-none"
                >
                  <div 
                    className="w-full h-full rounded-full bg-cover bg-center" 
                    style={{backgroundImage: `url("${getImageUrl(userInfo?.profile_image)}")`}}
                  ></div>
                </button>
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#F5E7C6] py-1 overflow-hidden z-50 animate-[fadeIn_0.15s_ease-out]">
                  <Link 
                    to="/profile" 
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#222222] hover:bg-[#FAF3E1] hover:text-[#FF6D1F] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">person</span>
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Login / Register Buttons */
            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden rounded-full px-5 py-2 text-sm font-semibold text-[#222222] hover:bg-[#FAF3E1]/50 transition-colors md:block">Log In</Link>
              <Link to="/registration" className="flex items-center justify-center rounded-full bg-[#222222] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#222222]/20 hover:bg-[#FF6D1F] hover:shadow-[#FF6D1F]/40 hover:-translate-y-0.5 transition-all duration-300">
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar