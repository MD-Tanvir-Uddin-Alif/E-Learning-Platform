import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCategory, updateCategory } from '../../api/axios';

export default function AddCategory() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // "Edit Mode"
  const categoryToEdit = location.state?.categoryToEdit;
  const isEditMode = !!categoryToEdit;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ---if Editing ---
  useEffect(() => {
    if (isEditMode) {
      setName(categoryToEdit.name);
      setDescription(categoryToEdit.description);
    }
  }, [isEditMode, categoryToEdit]);

  // --- Toast State ---
  const [toast, setToast] = useState(null); 

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const closeToast = () => setToast(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('error', 'Validation Error', 'Category name is required');
      return;
    }
    
    setIsLoading(true);

    try {
      if (isEditMode) {
        // UPDATE 
        await updateCategory(categoryToEdit.id, { name, description });
        showToast('success', 'Category Updated', 'Changes saved successfully!');
        setTimeout(() => navigate('/admin-category'), 1500); 
      } else {
        // CREATE 
        await createCategory({ name, description });
        showToast('success', 'Category Created', 'New category added successfully!');
        setName('');
        setDescription('');
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.detail || `Failed to ${isEditMode ? 'update' : 'create'} category`;
      showToast('error', 'Operation Failed', msg);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Toast ---
  const renderToast = () => {
    if (!toast) return null;
    const isError = toast.type === 'error';
    const isSuccess = toast.type === 'success';
    
    return (
      <div className="fixed top-5 right-5 z-[70] animate-[slideDown_0.3s_ease-out]">
        <div className="pointer-events-auto relative w-[320px] overflow-hidden rounded-xl bg-[#F5E7C6] shadow-xl border border-[#ead7cd]">
          <div className="flex items-start gap-3 p-4 pr-10">
            <div className={`flex size-6 shrink-0 items-center justify-center rounded-full text-white ${isError ? 'bg-red-500' : isSuccess ? 'bg-[#FF6D1F]' : 'bg-blue-500'}`}>
              <span className="material-symbols-outlined text-[16px] font-bold">
                {isError ? 'priority_high' : isSuccess ? 'check' : 'info'}
              </span>
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
            <div className={`h-full w-full ${isError ? 'bg-red-500' : isSuccess ? 'bg-[#FF6D1F]' : 'bg-blue-500'}`}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {renderToast()}

      <div className="min-h-screen bg-white font-['Lexend'] text-[#222222] flex flex-col antialiased selection:bg-[#FF6D1F]/30">
        <div className="flex h-full grow flex-col items-center justify-center p-4">
          <main className="w-[92%] md:w-[480px] bg-[#FAF3E1] rounded-[24px] shadow-lg p-8 md:p-10 transition-all duration-300 border border-[#F5E7C6] relative overflow-hidden">
            
            {/* Header */}
            <div className="flex flex-col items-center mb-8 relative z-10">
              <div className="size-12 rounded-xl bg-[#FF6D1F]/10 flex items-center justify-center text-[#FF6D1F] mb-4">
                 <span className="material-symbols-outlined text-[28px]">
                    {isEditMode ? 'edit_note' : 'post_add'}
                 </span>
              </div>
              <h2 className="text-[28px] font-bold leading-tight text-center tracking-tight text-[#222222]">
                {isEditMode ? 'Update Category' : 'Create New Category'}
              </h2>
              <p className="text-[#222222]/60 text-sm mt-1 text-center">
                {isEditMode ? 'Modify category details below' : 'Add a new topic for courses'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="category-name" className="text-sm font-bold text-[#222222] ml-1">
                  Category Name
                </label>
                <div className="relative">
                  <input
                    id="category-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Advanced Mathematics"
                    className="peer w-full h-12 rounded-xl bg-[#F5E7C6] text-[#222222] px-4 text-base placeholder-[#222222]/40 border-2 border-transparent focus:border-[#FF6D1F] focus:ring-0 focus:outline-none transition-colors"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-bold text-[#222222] ml-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe this category…"
                  rows={5}
                  disabled={isLoading}
                  className="w-full min-h-32 rounded-xl bg-[#F5E7C6] text-[#222222] p-4 text-base placeholder-[#222222]/40 border-2 border-transparent focus:border-[#FF6D1F] focus:ring-0 focus:outline-none resize-none transition-colors disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 bg-[#FF6D1F] hover:bg-orange-600 text-[#FAF3E1] text-base font-bold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 ${isLoading ? 'opacity-70 cursor-not-allowed hover:scale-100' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                      <span>{isEditMode ? 'Saving...' : 'Creating...'}</span>
                    </>
                  ) : (
                    <span>{isEditMode ? 'Save Changes' : 'Create Category'}</span>
                  )}
                </button>
                
                {isEditMode ? (
                  <button
                    type="button"
                    onClick={() => navigate('/admin-category')}
                    className="w-full h-12 text-[#222222]/60 hover:text-[#222222] hover:bg-[#F5E7C6]/50 text-sm font-bold rounded-xl transition-colors"
                  >
                    Cancel Update
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setName(''); setDescription(''); }}
                    className={`w-full h-12 text-[#222222]/60 hover:text-[#222222] hover:bg-[#F5E7C6]/50 text-sm font-bold rounded-xl transition-colors ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    Clear Form
                  </button>
                )}
              </div>
            </form>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
               <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FF6D1F]/5 blur-[60px] rounded-full" />
               <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#F5E7C6] blur-[60px] rounded-full" />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}