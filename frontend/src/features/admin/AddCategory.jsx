// src/components/AddCategory.jsx
import React, { useState } from 'react';

export default function AddCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }
    setError('');
    console.log({ name, description });
    // TODO: wire to API
  };

  return (
    <>
      {/* fonts & icons */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <div className="min-h-screen bg-white font-['Lexend'] text-[#222222] flex flex-col antialiased selection:bg-[#FF6D1F]/30">
        <div className="flex h-full grow flex-col items-center justify-center p-4">
          {/* card */}
          <main className="w-[92%] md:w-[480px] bg-[#FAF3E1] rounded-[24px] shadow-lg p-8 md:p-10 transition-all duration-300">
            {/* header */}
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-[28px] font-bold leading-tight text-center tracking-tight text-[#222222]">
                Create New Category
              </h2>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* category name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="category-name" className="text-sm font-medium text-[#222222]">
                  Category Name
                </label>
                <div className="relative">
                  <input
                    id="category-name"
                    name="category-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Advanced Mathematics"
                    className={`peer w-full h-12 rounded-xl bg-[#F5E7C6] text-[#222222] px-4 text-base placeholder-[#222222]/40 border-2 border-transparent focus:border-[#FF6D1F] focus:ring-0 focus:outline-none transition-colors ${error ? 'border-red-500' : ''}`}
                  />
                  {error && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                      <span className="material-symbols-outlined text-[20px]">error</span>
                    </div>
                  )}
                </div>
                {error && (
                  <p className="text-red-500 text-sm font-medium mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                    {error}
                  </p>
                )}
              </div>

              {/* description */}
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium text-[#222222]">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe this category…"
                  rows={5}
                  className="w-full min-h-32 rounded-xl bg-[#F5E7C6] text-[#222222] p-4 text-base placeholder-[#222222]/40 border-2 border-transparent focus:border-[#FF6D1F] focus:ring-0 focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* actions */}
              <div className="flex flex-col gap-4 mt-2">
                <button
                  type="submit"
                  className="w-full h-12 bg-[#FF6D1F] hover:bg-orange-600 text-[#FAF3E1] text-base font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>Create</span>
                </button>
                <a
                  href="#"
                  className="text-[#222222] text-sm font-medium text-center hover:underline hover:text-[#FF6D1F] transition-colors py-2"
                >
                  Cancel
                </a>
              </div>
            </form>
          </main>

          {/* decorative blobs */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
            <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
            <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
}