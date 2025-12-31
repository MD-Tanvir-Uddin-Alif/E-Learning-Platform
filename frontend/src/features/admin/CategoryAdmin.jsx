// src/components/CategoryAdmin.jsx
import React, { useState } from 'react';

/* ---- dummy data ---- */
const dummyCategories = [
  { id: 1, name: 'Web Development', desc: 'HTML, CSS, and JS fundamentals including React and Vue frameworks.', icon: 'code' },
  { id: 2, name: 'Data Science', desc: 'Python, R, and statistical analysis modules for big data.', icon: 'bar_chart' },
  { id: 3, name: 'UX Design', desc: 'Wireframing, prototyping, and user research methodologies.', icon: 'design_services' },
  { id: 4, name: 'Digital Marketing', desc: 'SEO, SEM, and social media marketing strategies.', icon: 'campaign' },
];

export default function CategoryAdmin() {
  const [categories, setCategories] = useState(dummyCategories);
  const [showDelete, setShowDelete] = useState(null);

  const handleDelete = (id) => {
    setCategories(c => c.filter(cat => cat.id !== id));
    setShowDelete(null);
  };

  return (
    <>
      {/* fonts & icons */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <div className="min-h-screen bg-[#FAF3E1] text-[#222222] font-['Lexend']">
        {/* sticky header */}
        <header className="sticky top-0 z-50 w-full h-20 bg-[#F5E7C6] shadow-sm flex items-center justify-between px-6 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <h1 className="text-[32px] font-bold tracking-tight text-[#222222]">Categories</h1>
          </div>
          <button className="flex items-center gap-2 bg-[#FF6D1F] text-[#FAF3E1] px-5 py-2.5 rounded-[12px] font-bold shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF6D1F] focus:ring-offset-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add Category</span>
          </button>
        </header>

        {/* main content */}
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8">
          {/* stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Categories', value: categories.length, icon: 'category', bg: 'bg-white' },
              { label: 'Active Courses', value: 148, icon: 'visibility', bg: 'bg-white' },
              { label: 'Last Updated', value: '2h ago', icon: 'update', bg: 'bg-white' },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} p-4 rounded-[20px] shadow-sm flex items-center gap-4`}>
                <div className="size-10 rounded-full bg-[#FAF3E1] flex items-center justify-center text-[#FF6D1F]">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <div>
                  <p className="text-sm text-[#222222]/60">{s.label}</p>
                  <p className="text-xl font-bold text-[#222222]">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* category list */}
          <div className="grid gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group bg-white rounded-[20px] p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-transparent hover:border-[#F5E7C6]"
              >
                <div className="flex items-center gap-4 w-full md:w-auto overflow-hidden">
                  <div className="shrink-0 size-12 rounded-[14px] bg-[#FAF3E1] flex items-center justify-center text-[#222222]">
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-lg font-semibold truncate text-[#222222]">{cat.name}</h3>
                    <p className="text-sm text-[#222222]/70 truncate max-w-xl">{cat.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <button className="flex items-center gap-1.5 bg-[#F5E7C6] text-[#222222] rounded-[10px] px-4 py-2 text-sm font-medium hover:bg-[#FF6D1F] hover:text-[#FAF3E1] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => setShowDelete(cat)}
                    className="flex items-center gap-1.5 bg-[#FAF3E1] text-[#FF6D1F] border border-[#FF6D1F] rounded-[10px] px-4 py-2 text-sm font-medium hover:bg-[#FF6D1F] hover:text-[#FAF3E1] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))}

            {/* divider */}
            <div className="my-12 flex items-center gap-4 opacity-50">
              <div className="h-px bg-current grow" />
              <span className="text-sm font-medium uppercase tracking-widest text-[#222222]">Design States Preview</span>
              <div className="h-px bg-current grow" />
            </div>

            {/* empty state */}
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 text-[#FF6D1F] bg-[#FAF3E1] p-4 rounded-full">
                <span className="material-symbols-outlined text-[48px]">folder_off</span>
              </div>
              <p className="text-center text-lg text-[#222222]/50 mb-4 font-medium">No categories yet</p>
              <button className="text-[#FF6D1F] font-bold text-sm hover:underline hover:text-[#d6520f] transition-colors">
                Create one
              </button>
            </div>

            {/* delete modal (inline demo) */}
            {showDelete && (
              <div className="flex justify-center py-8">
                <div className="w-full max-w-md bg-[#FAF3E1] border border-[#F5E7C6] rounded-[24px] p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4 text-[#FF6D1F]">
                    <span className="material-symbols-outlined">warning</span>
                    <h3 className="text-lg font-bold text-[#222222]">Delete Category?</h3>
                  </div>
                  <p className="text-[#222222]/70 mb-8 leading-relaxed">
                    Are you sure you want to delete <span className="font-semibold text-[#222222]">"{showDelete.name}"</span>? This action cannot be undone and will affect associated courses.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowDelete(null)}
                      className="px-5 py-2.5 rounded-[12px] bg-[#F5E7C6] text-[#222222] font-bold text-sm hover:bg-opacity-80 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(showDelete.id)}
                      className="px-5 py-2.5 rounded-[12px] bg-[#FF6D1F] text-[#FAF3E1] font-bold text-sm hover:bg-[#e0560e] transition-colors shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}