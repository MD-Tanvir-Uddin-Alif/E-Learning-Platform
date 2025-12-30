// src/components/UserTable.jsx
import React from 'react';

const dummyUsers = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    role: 'Student',
    status: 'Active',
    joined: 'Oct 24, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAajlC-psQbJ4SXJwkcs5sKhF6xemoqQA-a8CJDumn9nHwL39WAgVXybwNt4YqETtpFR8pv3sWVo-myJ7Pgx2Yvex36XhS5ivHlrU5UpBDSP6pQVsYTboS6FU-TzvqFHaTr0iWFU6L37-6TvKTrRsUXqNlvVyJGXVAts0fk7j4sJoPo31xow2bqslKHN4Ef8nQq71Pp9NukPI48ONOh6MRyIS9MQZgBc5cMLoXwx4YFm6sl5I3v-xsBIT6YJzmn7Gqh72d_RcV8TLo',
    bg: 'bg-[#FAF3E1]',
  },
  {
    id: 2,
    name: 'Robert Fox',
    email: 'r.fox@eduadmin.com',
    role: 'Instructor',
    status: 'Active',
    joined: 'Sep 12, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmOLhnuNXaWQ6kfXzyWzmiEIXVyCeLVM77QXKM5OIcMJONxd9Udk6YodlHZ5MdCDhnAS1o5zhcSkpcAVnIOsYtA0us--Qs3jakbPiFiGhLCxnGLrFQCbqpRjWcR0JJZqNOPj9BuzxqQDG0ZMJAPhnwcoykAz7TooOBJKjNaDtPMOB4Sdc3kDtZoF1fheZpxufWZLFMZ921bjB44dyi_I9YJArJDb1BItlmSp714-QnH7Ew-vCt3fMF-LHlKPT8R2Dedw9jR2oggB8',
    bg: 'bg-[#F5E7C6]',
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    email: 'sarah.j@eduadmin.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Jan 10, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy_drQI9ky7_-FrvA_5lHgpmm47OO3vnZaoum0vMIzPbWA4RtYaWnzrCPclV4elnL7mp7h6am9iCJIMdd_7xt_gB-nGBnaVlcOXqHNG1f0MtnucCeEtQvn71NnPjkVP0E_fzJ1n9luyHv12xHnj2tUk0Q8MoWo7SHmtRz7jubegGg7SLwnhSG6oamPicAl4gnk0UiH2ds7k9Jl3jJc5fAZt_2Ij8tZjC9BDndB-e3pqZ0K4YCbM_OO6BYdU0MzeUcTHnxNnl7FVng',
    bg: 'bg-[#FAF3E1]',
  },
  {
    id: 4,
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    role: 'Student',
    status: 'Offline',
    joined: 'Nov 02, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4iM2IllWR5L6evKOpzQdOcSFdUB3kwXFXeRNhqJUtO6attwAsa1-yoFU_rNnk_hYq8Ix81wYeZ_NHRZfyxIQB_LOr_n1hMUo03teQwswFz-_HOotNdicj1jcYJfD00ai1RbDo8u8-fVF8c1X0xN1Yu5EjrQCeCHCMYNNE7Cf1hAwEaz4YRksFcCQOrc5ikzEGzg32yzACvktJP2jJt3BS1lCJ37TCRKlxLaQ7bGZfRhPBjk1W865s5Q9K-3xmQ_-vdO63GZJds74',
    bg: 'bg-[#F5E7C6]',
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa.w@example.com',
    role: 'Student',
    status: 'Pending',
    joined: 'Nov 05, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj2XMRnAsRTU3lB4ZxvheBIUNiJosjTxNsHCrXAQQ1rlHrHMO9CrX2s3D5b3MI2tJ0uF-VJ6Zn6G_Is47WJw45xRFyWOQpTYf635ELUTL0_B7nuooCFB2BbuV1CKHNEDC8P9JrzviKbnKC-JeBOqhRZuz4eHVILBrGX0mCVa16J5uwpVZjOb1Rku91hi9chtUM1aor1zWu5AjKt7Tky3ZHIg9d7K3PSnJ8WRmgQpdbK173GoBPf7W3t7gRuVd0_FK0rmbnBeewPmk',
    bg: 'bg-[#FAF3E1]',
  },
];

/* ---- tiny helpers ---- */
const roleBadge = (role) => {
  const base = 'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border shadow-sm';
  if (role === 'Admin') return `${base} bg-[#222222] text-white border-black/5`;
  if (role === 'Instructor') return `${base} bg-white/50 text-[#FF6D1F] border-primary/20`;
  return `${base} bg-[#F5E7C6] text-[#222222] border-black/5`;
};

const statusBadge = (status) => {
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border';
  if (status === 'Active') return `${base} bg-green-100 text-green-800 border-green-200`;
  if (status === 'Offline') return `${base} bg-gray-100 text-gray-700 border-gray-200`;
  if (status === 'Pending') return `${base} bg-amber-100 text-amber-800 border-amber-200`;
  return `${base} bg-gray-100 text-gray-700 border-gray-200`;
};

/* ---- component ---- */
export default function UserTable() {
  return (
    <>
      {/* fonts & icons */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        {/* header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-[#F5E7C6]/50 bg-white z-10">
          <div>
            <h2 className="text-2xl font-black text-[#222222] tracking-tight">User Management</h2>
            <p className="text-sm text-[#222222]/60 mt-1">Manage platform access, roles, and user details</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#222222]/60 hover:text-[#FF6D1F] transition-colors rounded-full hover:bg-[#FAF3E1]">
              <span className="absolute top-2 right-2 size-2 bg-[#FF6D1F] rounded-full border-2 border-white"></span>
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FF6D1F] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#FF6D1F]/90 transition-all shadow-orange-500/20">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add User</span>
            </button>
          </div>
        </header>

        {/* scrollable content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: '12,450', change: '+12.5%', icon: 'group', bg: 'bg-[#FAF3E1]' },
              { label: 'Active Instructors', value: '450', change: '+4.2%', icon: 'school', bg: 'bg-[#F5E7C6]' },
              { label: 'New Students', value: '1,203', change: '+18%', icon: 'person_add', bg: 'bg-[#FAF3E1]' },
              { label: 'Pending Approvals', value: '24', change: 'Low', icon: 'pending_actions', bg: 'bg-[#F5E7C6]' },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} p-6 rounded-xl border border-black/5 hover:border-primary/30 transition-colors group`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-black/5 rounded-lg text-[#222222] group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{s.change}</span>
                </div>
                <p className="text-[#222222]/70 text-sm font-medium">{s.label}</p>
                <p className="text-3xl font-black text-primary mt-1">{s.value}</p>
              </div>
            ))}
          </div>

          {/* filters & search */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white rounded-lg">
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#222222]/40 group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                className="block w-full pl-10 pr-3 py-2.5 bg-[#FAF3E1] border border-black/10 rounded-lg leading-5 text-[#222222] placeholder-[#222222]/40 focus:ring-2 focus:ring-primary focus:outline-none sm:text-sm shadow-sm"
              />
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <div className="relative">
                <select className="appearance-none bg-[#F5E7C6] text-[#222222] pl-4 pr-10 py-2.5 rounded-lg border-none focus:ring-2 focus:ring-primary text-sm font-medium cursor-pointer hover:bg-[#F5E7C6]/80 transition-colors">
                  <option>All Roles</option>
                  <option>Student</option>
                  <option>Instructor</option>
                  <option>Admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#222222]/70">
                  <span className="material-symbols-outlined text-lg">expand_more</span>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-[#F5E7C6] text-[#222222] pl-4 pr-10 py-2.5 rounded-lg border-none focus:ring-2 focus:ring-primary text-sm font-medium cursor-pointer hover:bg-[#F5E7C6]/80 transition-colors">
                  <option>Status: Active</option>
                  <option>Status: Inactive</option>
                  <option>Status: Pending</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#222222]/70">
                  <span className="material-symbols-outlined text-lg">expand_more</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-black/10 text-[#222222] text-sm font-bold rounded-lg hover:bg-[#F5E7C6]/50 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>

          {/* table */}
          <div className="bg-white rounded-xl border border-black/10 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#222222]">
                <thead className="bg-[#F5E7C6] text-[#222222] uppercase font-bold text-xs tracking-wider border-b border-black/10">
                  <tr>
                    <th scope="col" className="px-6 py-4 w-12">
                      <input type="checkbox" className="rounded border-black/20 text-primary focus:ring-primary bg-[#FAF3E1] size-4 cursor-pointer" />
                    </th>
                    <th scope="col" className="px-6 py-4">User</th>
                    <th scope="col" className="px-6 py-4">Email</th>
                    <th scope="col" className="px-6 py-4">Role</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                    <th scope="col" className="px-6 py-4">Joined</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {dummyUsers.map((u) => (
                    <tr key={u.id} className={`${u.bg} hover:bg-black/5 transition-colors`}>
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-black/20 text-primary focus:ring-primary bg-white size-4 cursor-pointer" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className="size-9 rounded-full bg-cover bg-center border border-black/10"
                            style={{ backgroundImage: `url(${u.avatar})` }}
                            aria-label={`${u.name} avatar`}
                          />
                          <span className="font-bold text-[#222222]">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#222222]/80">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={roleBadge(u.role)}>{u.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={statusBadge(u.status)}>{u.status}</span>
                      </td>
                      <td className="px-6 py-4 text-[#222222]/70">{u.joined}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors" title="Edit">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                          <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors" title="Delete">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#FAF3E1] border-t border-black/10">
              <p className="text-sm text-[#222222]/70">
                Showing <span className="font-bold text-[#222222]">1</span> to <span className="font-bold text-[#222222]">5</span> of <span className="font-bold text-[#222222]">124</span> results
              </p>
              <div className="flex gap-2">
                <button disabled className="px-3 py-1 text-sm font-medium rounded-md border border-black/10 text-[#222222] hover:bg-[#F5E7C6] transition-colors disabled:opacity-50">Previous</button>
                <button className="px-3 py-1 text-sm font-medium rounded-md bg-[#FF6D1F] text-white hover:bg-[#FF6D1F]/90 transition-colors">1</button>
                <button className="px-3 py-1 text-sm font-medium rounded-md border border-black/10 text-[#222222] hover:bg-[#F5E7C6] transition-colors">2</button>
                <button className="px-3 py-1 text-sm font-medium rounded-md border border-black/10 text-[#222222] hover:bg-[#F5E7C6] transition-colors">3</button>
                <span className="px-2 text-[#222222]">…</span>
                <button className="px-3 py-1 text-sm font-medium rounded-md border border-black/10 text-[#222222] hover:bg-[#F5E7C6] transition-colors">Next</button>
              </div>
            </div>
          </div>
        </div>
    </main>
  </>
);
}