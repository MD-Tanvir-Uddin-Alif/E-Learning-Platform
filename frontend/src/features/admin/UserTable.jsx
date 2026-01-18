import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as AdminApi from '../../api/axios';

// Base URL for images
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/* ---- Helper Components ---- */
const RoleBadge = ({ role }) => {
  const base = 'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border shadow-sm uppercase';
  const normalizedRole = String(role || '').toLowerCase();
  
  if (normalizedRole === 'admin') return <span className={`${base} bg-[#222222] text-white border-black/5`}>{role}</span>;
  if (normalizedRole === 'instructor') return <span className={`${base} bg-white/50 text-[#FF6D1F] border-primary/20`}>{role}</span>;
  return <span className={`${base} bg-[#F5E7C6] text-[#222222] border-black/5`}>{role}</span>;
};

const StatusBadge = ({ isBlocked, isVerified }) => {
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border';
  if (isBlocked) return <span className={`${base} bg-red-100 text-red-800 border-red-200`}>Blocked</span>;
  if (isVerified) return <span className={`${base} bg-green-100 text-green-800 border-green-200`}>Active</span>;
  return <span className={`${base} bg-amber-100 text-amber-800 border-amber-200`}>Pending</span>;
};

export default function UserTable() {
  const queryClient = useQueryClient();
  
  // Local State
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Toast State ---
  const [toast, setToast] = useState(null); 
  
  // --- Modal State (Replaces window.confirm) ---
  const [confirmModal, setConfirmModal] = useState({ show: false, user: null, type: null });

  // --- Helpers ---
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 4000);
  };
  const closeToast = () => setToast(null);

  // 1. Fetch Users Data
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
       try {
         return await AdminApi.getAllUsers();
       } catch (e) {
         console.warn("API Error or Preview Mode. Falling back to dummy data.");
         return [
            { id: 1, first_name: 'Emma', last_name: 'Wilson', email: 'emma@test.com', role: 'user', is_verified: true, is_blocked: false, created_at: '2023-10-24', profile_image: null },
            { id: 2, first_name: 'Robert', last_name: 'Fox', email: 'rob@test.com', role: 'instructor', is_verified: true, is_blocked: false, created_at: '2023-09-12', profile_image: null },
         ];
       }
    },
  });

  // 2. Mutations
  const blockMutation = useMutation({
    mutationFn: AdminApi.blockUser,
    onSuccess: () => {
        queryClient.invalidateQueries(['admin-users']);
        showToast('success', 'User Blocked', 'Access has been revoked for this user.');
        setConfirmModal({ show: false, user: null, type: null }); // Close modal
    },
    onError: (err) => {
        const msg = err.response?.data?.detail || 'Failed to block user';
        showToast('error', 'Action Failed', msg);
        setConfirmModal({ show: false, user: null, type: null }); // Close modal
    }
  });

  const unblockMutation = useMutation({
    mutationFn: AdminApi.unblockUser,
    onSuccess: () => {
        queryClient.invalidateQueries(['admin-users']);
        showToast('success', 'User Unblocked', 'Access has been restored for this user.');
        setConfirmModal({ show: false, user: null, type: null }); // Close modal
    },
    onError: (err) => {
        const msg = err.response?.data?.detail || 'Failed to unblock user';
        showToast('error', 'Action Failed', msg);
        setConfirmModal({ show: false, user: null, type: null }); // Close modal
    }
  });

  // Open the custom modal instead of window.confirm
  const handleToggleBlockClick = (user) => {
    setConfirmModal({
      show: true,
      user,
      type: user.is_blocked ? 'unblock' : 'block'
    });
  };

  // Execute the action when user clicks "Yes" in modal
  const handleConfirmAction = () => {
    if (!confirmModal.user) return;
    
    if (confirmModal.type === 'block') {
      blockMutation.mutate(confirmModal.user.id);
    } else {
      unblockMutation.mutate(confirmModal.user.id);
    }
  };

  // 3. Filtering logic
  const filteredUsers = users.filter((user) => {
    const fName = user.first_name || '';
    const lName = user.last_name || '';
    const fullName = `${fName} ${lName}`.toLowerCase();
    const email = (user.email || '').toLowerCase();
    
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'All Roles' || (user.role && String(user.role).toLowerCase() === roleFilter.toLowerCase());
    
    let userStatus = 'Pending';
    if (user.is_blocked) userStatus = 'Blocked';
    else if (user.is_verified) userStatus = 'Active';

    const matchesStatus = statusFilter === 'All Status' || 
      (statusFilter === 'Active' && userStatus === 'Active') ||
      (statusFilter === 'Blocked' && userStatus === 'Blocked') ||
      (statusFilter === 'Pending' && userStatus === 'Pending');

    return matchesSearch && matchesRole && matchesStatus;
  });

  // 4. Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const getUserInitials = (user) => {
    const f = user.first_name ? user.first_name[0] : '';
    const l = user.last_name ? user.last_name[0] : '';
    return (f + l).toUpperCase() || '?';
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
  };

  // --- Render Toast UI ---
  const renderToast = () => {
    if (!toast) return null;
    let icon = toast.type === 'success' ? 'check' : toast.type === 'error' ? 'priority_high' : 'info';
    let barColor = toast.type === 'success' ? 'bg-[#FF6D1F]' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    let iconBg = toast.type === 'success' ? 'bg-[#FF6D1F]' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500';

    return (
      <div className="fixed top-5 right-5 z-[70] animate-[slideDown_0.3s_ease-out]">
        <div className="pointer-events-auto relative w-[320px] overflow-hidden rounded-xl bg-[#F5E7C6] shadow-xl border border-[#ead7cd]">
          <div className="flex items-start gap-3 p-4 pr-10">
            <div className={`flex size-6 shrink-0 items-center justify-center rounded-full text-white ${iconBg}`}>
              <span className="material-symbols-outlined text-[16px] font-bold">{icon}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-sm font-semibold text-[#222222]">{toast.title}</h3>
              <p className="font-display text-xs text-[#222222]/80 leading-normal">{toast.message}</p>
            </div>
            <button onClick={closeToast} className="absolute right-3 top-3 flex items-center justify-center text-[#222222]/40 hover:text-[#FF6D1F]">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <div className="h-[3px] w-full bg-[#FAF3E1]">
            <div className={`h-full w-full ${barColor}`}></div>
          </div>
        </div>
      </div>
    );
  };

  // --- Render Confirmation Modal UI ---
  const renderConfirmationModal = () => {
    if (!confirmModal.show) return null;

    const isBlock = confirmModal.type === 'block';
    const title = isBlock ? 'Block User?' : 'Unblock User?';
    const message = isBlock 
      ? `Are you sure you want to block ${confirmModal.user?.first_name}? They will lose access to the platform immediately.`
      : `Are you sure you want to restore access for ${confirmModal.user?.first_name}?`;
    
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#222222]/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
        <div className="w-full max-w-sm bg-[#FAF3E1] rounded-2xl shadow-2xl border border-[#F5E7C6] overflow-hidden transform transition-all scale-100">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`size-12 rounded-full flex items-center justify-center shrink-0 ${isBlock ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
                <span className="material-symbols-outlined text-[28px]">{isBlock ? 'block' : 'lock_open'}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#222222]">{title}</h3>
              </div>
            </div>
            <p className="text-sm text-[#222222]/70 leading-relaxed mb-6">{message}</p>
            
            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setConfirmModal({ show: false, user: null, type: null })}
                className="px-4 py-2 text-sm font-bold text-[#222222]/70 hover:text-[#222222] hover:bg-[#F5E7C6] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-sm font-bold text-white rounded-lg shadow-md transition-transform active:scale-95 ${isBlock ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isBlock ? 'Yes, Block' : 'Yes, Unblock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="p-10 text-center text-gray-500">Loading users...</div>;
  if (isError && !users.length) return <div className="p-10 text-center text-red-500">Error loading users.</div>;

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
       <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />
       
       <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {renderToast()}
      {renderConfirmationModal()}

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-[#F5E7C6]/50 bg-white z-10">
        <div>
          <h2 className="text-2xl font-black text-[#222222] tracking-tight">User Management</h2>
          <p className="text-sm text-[#222222]/60 mt-1">Manage platform access, roles, and user details</p>
        </div>
        {/* <div className="flex items-center gap-4">
          <button className="relative p-2 text-[#222222]/60 hover:text-[#FF6D1F] transition-colors rounded-full hover:bg-[#FAF3E1]">
            <span className="absolute top-2 right-2 size-2 bg-[#FF6D1F] rounded-full border-2 border-white"></span>
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#FF6D1F] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#FF6D1F]/90 transition-all shadow-orange-500/20">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add User</span>
          </button>
        </div> */}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: users.length, icon: 'group', bg: 'bg-[#FAF3E1]', change: '+12.5%' },
            { label: 'Instructors', value: users.filter(u => u.role === 'instructor').length, icon: 'school', bg: 'bg-[#F5E7C6]', change: '+4.2%' },
            { label: 'Verified Students', value: users.filter(u => u.role === 'user' && u.is_verified).length, icon: 'person_check', bg: 'bg-[#FAF3E1]', change: '+18%' },
            { label: 'Blocked Users', value: users.filter(u => u.is_blocked).length, icon: 'block', bg: 'bg-[#F5E7C6]', change: 'Low' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} p-6 rounded-xl border border-black/5 hover:border-primary/30 transition-colors group`}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-black/5 rounded-lg text-[#222222] group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                {/* Stats Badge */}
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{s.change}</span>
              </div>
              <p className="text-[#222222]/70 text-sm font-medium">{s.label}</p>
              <p className="text-3xl font-black text-[#FF6D1F] mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white rounded-lg">
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[#222222]/40 group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 bg-[#FAF3E1] border border-black/10 rounded-lg leading-5 text-[#222222] placeholder-[#222222]/40 focus:ring-2 focus:ring-primary focus:outline-none sm:text-sm shadow-sm"
            />
          </div>
          <div className="flex w-full md:w-auto gap-3">
             <div className="relative">
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="appearance-none bg-[#F5E7C6] text-[#222222] pl-4 pr-10 py-2.5 rounded-lg border-none focus:ring-2 focus:ring-primary text-sm font-medium cursor-pointer hover:bg-[#F5E7C6]/80 transition-colors"
                >
                  <option>All Roles</option>
                  <option value="user">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#222222]/70">
                  <span className="material-symbols-outlined text-lg">expand_more</span>
                </div>
            </div>
            <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-[#F5E7C6] text-[#222222] pl-4 pr-10 py-2.5 rounded-lg border-none focus:ring-2 focus:ring-primary text-sm font-medium cursor-pointer hover:bg-[#F5E7C6]/80 transition-colors"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Blocked</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#222222]/70">
                  <span className="material-symbols-outlined text-lg">expand_more</span>
                </div>
            </div>
             {/* <button className="flex items-center gap-2 px-4 py-2.5 border border-black/10 text-[#222222] text-sm font-bold rounded-lg hover:bg-[#F5E7C6]/50 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span className="hidden sm:inline">Export CSV</span>
              </button> */}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-black/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#222222]">
              <thead className="bg-[#F5E7C6] text-[#222222] uppercase font-bold text-xs tracking-wider border-b border-black/10">
                <tr>
                   <th scope="col" className="px-6 py-4 w-12">
                      <input type="checkbox" className="rounded border-black/20 text-primary focus:ring-primary bg-[#FAF3E1] size-4 cursor-pointer" />
                    </th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {paginatedUsers.map((u, index) => {
                  const rowBg = index % 2 === 0 ? 'bg-[#FAF3E1]' : 'bg-[#F5E7C6]';
                  
                  return (
                    <tr key={u.id} className={`${rowBg} hover:bg-black/5 transition-colors`}>
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-black/20 text-primary focus:ring-primary bg-white size-4 cursor-pointer" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {u.profile_image ? (
                            <div
                              className="size-9 rounded-full bg-cover bg-center border border-black/10"
                              style={{ backgroundImage: `url(${getImageUrl(u.profile_image)})` }}
                            />
                          ) : (
                            <div className="size-9 rounded-full bg-[#FF6D1F] text-white flex items-center justify-center font-bold text-xs uppercase">
                              {getUserInitials(u)}
                            </div>
                          )}
                          <span className="font-bold text-[#222222]">
                            {u.first_name} {u.last_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#222222]/80">{u.email}</td>
                      <td className="px-6 py-4"><RoleBadge role={u.role} /></td>
                      <td className="px-6 py-4"><StatusBadge isBlocked={u.is_blocked} isVerified={u.is_verified} /></td>
                      <td className="px-6 py-4 text-[#222222]/70">{formatDate(u.created_at)}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                         <div className="flex items-center justify-end gap-2">
                           <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors" title="Edit">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            {/* Replaced native onClick with new handler */}
                            <button 
                              onClick={() => handleToggleBlockClick(u)}
                              className={`p-1.5 rounded-md transition-colors ${u.is_blocked ? 'text-green-600 hover:bg-green-100' : 'text-red-500 hover:bg-red-100'}`} 
                              title={u.is_blocked ? "Unblock" : "Block"}
                            >
                              <span className="material-symbols-outlined text-[20px]">{u.is_blocked ? 'check_circle' : 'block'}</span>
                            </button>
                         </div>
                      </td>
                    </tr>
                  );
                })}
                
                {paginatedUsers.length === 0 && (
                   <tr>
                    <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#FAF3E1] border-t border-black/10">
             <p className="text-sm text-[#222222]/70">
              Showing <span className="font-bold text-[#222222]">{filteredUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-bold text-[#222222]">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-bold text-[#222222]">{filteredUsers.length}</span> results
            </p>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="px-3 py-1 text-sm font-medium rounded-md border border-black/10 text-[#222222] hover:bg-[#F5E7C6] transition-colors disabled:opacity-50">Previous</button>
              <button className="px-3 py-1 text-sm font-medium rounded-md bg-[#FF6D1F] text-white hover:bg-[#FF6D1F]/90 transition-colors">{currentPage}</button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 text-sm font-medium rounded-md border border-black/10 text-[#222222] hover:bg-[#F5E7C6] transition-colors disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}