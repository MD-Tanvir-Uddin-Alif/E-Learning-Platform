import React from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '../api/auth';

const SideBar = () => {

    const { data: user, isLoading, isError } = useQuery({
    queryKey: ['me'],      
    queryFn: getMyProfile, 
    retry: false,        
  });

  // 1. Hide sidebar if loading, error (not logged in), no user data, or if role is just 'user'
  if (isLoading || isError || !user || user.role === 'user') return null;

  const role = user.role;

  // 2. Define Common Items (Visible to both)
  const baseItems = [
    { icon: 'dashboard', label: 'Dashboard', to: '/dashboard' },
    { icon: 'person', label: 'Profile', to: '/profile' },
  ];

  // 3. Define Role-Specific Items
  const roleSpecificItems = {
    instructor: [
      // { icon: 'add_circle', label: 'Add Course', to: '/course/add' },
      { icon: 'menu_book', label: 'Courses', to: '/instructor/courses' },
      { icon: 'payments', label: 'My Revenue', to: '/instructor-earnings'},
      // { icon: 'menu_book', label: 'Videos', to: '/video/add' },

    ],
    admin: [
      { icon: 'post_add', label: 'Add Category', to: '/add-category' },
      { icon: 'category', label: 'Categories', to: '/admin-category' },
      { icon: 'group', label: 'Users', to: '/users' },
      { icon: 'monetization_on', label: 'SiteRevenue', to: '/admin-RevenueDashboard'},
    ]
  };

  // 4. Combine items based on current role
  const items = [...baseItems, ...(roleSpecificItems[role] || [])];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap');
        
        .material-symbols-outlined { 
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; 
        }
        .material-symbols-outlined.filled { 
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; 
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .custom-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      
      <aside className="w-full lg:w-72 bg-[#FAF3E1] border-r border-[#F5E7C6] shrink-0 flex flex-col font-['Lexend'] h-screen sticky top-0">
        {/* Logo Section */}
        <div className="p-6 border-b border-[#F5E7C6]/50">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#FF6D1F] flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <span className="material-symbols-outlined filled text-[24px]">school</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#222222]">Skill<span className="text-[#FF6D1F]">Forge</span></h1>
              <p className="text-[#FF6D1F] text-xs font-medium tracking-wide">
                {role === 'admin' ? 'ADMIN PORTAL' : 'INSTRUCTOR PORTAL'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {items.map(item => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        {/* User Info Footer */}
        <div className="p-4 border-t border-[#F5E7C6]/50">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F5E7C6]/30">
            <div className="size-8 rounded-full bg-[#FF6D1F]/20 text-[#FF6D1F] flex items-center justify-center font-bold uppercase">
              {user.email?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-[#222222] truncate">{user.email?.split('@')[0]}</p>
              <p className="text-xs text-[#222222]/60 capitalize">{role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Reusable NavItem Component
function NavItem({ icon, label, to }) {
  const baseClasses = 'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden';
  const normalClasses = 'text-[#222222]/70 hover:bg-[#F5E7C6]/50 hover:text-[#222222]';
  const activeClasses = 'bg-[#F5E7C6] text-[#222222] shadow-sm font-bold';

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : normalClasses}`}
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator Bar */}
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#FF6D1F] rounded-r-full" />
          )}
          
          <span 
            className={`material-symbols-outlined transition-colors duration-200 ${
              isActive 
                ? 'filled text-[#FF6D1F]' 
                : 'text-[#222222]/50 group-hover:text-[#FF6D1F]'
            }`}
          >
            {icon}
          </span>
          <span className="font-medium relative z-10">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default SideBar;