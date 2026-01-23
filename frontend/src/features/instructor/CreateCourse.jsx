import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllCategories, createCourse, updateCourse } from '../../api/axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export default function CreateCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const courseToEdit = location.state?.courseToEdit;
  const isEditMode = !!courseToEdit;

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null); 
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [isPaid, setIsPaid] = useState(true);

  // if editing
  useEffect(() => {
    if (isEditMode && courseToEdit) {
      setTitle(courseToEdit.title || '');
      setSubtitle(courseToEdit.sub_title || '');
      setCategoryId(courseToEdit.category_id || '');
      setDescription(courseToEdit.description || '');
      setIsPaid(courseToEdit.is_paid);
      setPrice(courseToEdit.price || '');
      setCurrentThumbnail(courseToEdit.image_url);
    }
  }, [isEditMode, courseToEdit]);

  const [toast, setToast] = useState(null); 
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 4000);
  };
  const closeToast = () => setToast(null);

  // 1. Fetch Categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories-select'],
    queryFn: getAllCategories,
  });

  // Create Mutations
  const createMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      showToast('success', 'Course Created', 'Proceeding to add videos...');
      setTimeout(() => {
        navigate('/video/add', { state: { courseId: data.id, courseTitle: data.title } });
      }, 1500);
    },
    onError: (err) => {
      const msg = err.response?.data?.detail || 'Failed to create course';
      showToast('error', 'Error', msg);
    }
  });

  const updateMutation = useMutation({
    mutationFn: (formData) => updateCourse(courseToEdit.id, formData),
    onSuccess: (data) => {
      showToast('success', 'Course Updated', 'Changes saved successfully.');
      setTimeout(() => {
        navigate(`/instructor/course/${data.id}`);
      }, 1500);
    },
    onError: (err) => {
      const msg = err.response?.data?.detail || 'Failed to update course';
      showToast('error', 'Error', msg);
    }
  });

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryId) {
      showToast('error', 'Missing Field', 'Please select a category');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    
    if (subtitle) formData.append('sub_title', subtitle);
    formData.append('description', description);
    
    formData.append('is_paid', isPaid);
    
    if (isPaid && price) formData.append('price', price);
    
    formData.append('category_id', categoryId);
    
    if (thumbnail) {
      formData.append('image', thumbnail);
    }

    if (isEditMode) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

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
      <style>{`@keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      
      {renderToast()}

      <div className="min-h-screen bg-[#FAF3E1] w-full flex items-center justify-center p-4 md:p-8 font-['Lexend'] text-[#222222]">
        {/* card */}
        <div className="w-full max-w-[640px] bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden border border-[#F5E7C6]">
          <div className="relative z-10 flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#222222]">
              {isEditMode ? 'Edit Course Details' : 'Create New Course'}
            </h1>
            <p className="text-[#222222]/60 text-sm">
              {isEditMode ? 'Update information for your published course' : 'Fill in the details to publish your course'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
            
            {/* Title & Subtitle */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold ml-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Advanced React Patterns"
                  className="w-full h-12 bg-[#FAF3E1] border-2 border-transparent focus:border-[#FF6D1F] focus:bg-white rounded-xl px-4 outline-none transition-all placeholder-[#222222]/30"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold ml-1">Subtitle</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Short description..."
                  className="w-full h-12 bg-[#FAF3E1] border-2 border-transparent focus:border-[#FF6D1F] focus:bg-white rounded-xl px-4 outline-none transition-all placeholder-[#222222]/30"
                />
              </div>
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold ml-1">Category</label>
                <div className="relative">
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full h-12 bg-[#FAF3E1] border-2 border-transparent focus:border-[#FF6D1F] focus:bg-white rounded-xl px-4 appearance-none outline-none cursor-pointer transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#222222]/50">expand_more</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold ml-1">Price</label>
                <div className="flex gap-2">
                   {/* Paid Toggle */}
                   <button 
                      type="button" 
                      onClick={() => setIsPaid(!isPaid)}
                      className={`h-12 px-4 rounded-xl font-bold text-sm border-2 transition-all ${isPaid ? 'bg-[#FF6D1F] text-[#FAF3E1] border-[#FF6D1F]' : 'bg-[#FAF3E1] text-[#222222]/50 border-transparent hover:border-[#FF6D1F]'}`}
                   >
                     {isPaid ? 'Paid' : 'Free'}
                   </button>
                   {isPaid && (
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#222222]/40">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        required={isPaid}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-12 bg-[#FAF3E1] border-2 border-transparent focus:border-[#FF6D1F] focus:bg-white rounded-xl pl-8 pr-4 outline-none transition-all placeholder-[#222222]/30"
                      />
                    </div>
                   )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold ml-1">Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will students learn in this course?"
                className="w-full bg-[#FAF3E1] border-2 border-transparent focus:border-[#FF6D1F] focus:bg-white rounded-xl p-4 outline-none transition-all resize-none placeholder-[#222222]/30"
              />
            </div>

            {/* File Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold ml-1">Thumbnail</label>
              <div className="relative w-full h-32 bg-[#FAF3E1] border-2 border-dashed border-[#F5E7C6] rounded-xl hover:border-[#FF6D1F] hover:bg-[#FF6D1F]/5 transition-all group overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                
                {/* Preview Logic */}
                {thumbnail ? (
                   /* New Upload Preview */
                   <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none z-0">
                      <div className="flex items-center gap-2 text-[#FF6D1F] font-bold">
                          <span className="material-symbols-outlined">check_circle</span>
                          <span>{thumbnail.name}</span>
                       </div>
                       <span className="text-xs text-[#222222]/50">New file selected</span>
                   </div>
                ) : isEditMode && currentThumbnail ? (
                   /* Existing Image Preview */
                   <>
                     <img 
                        src={getImageUrl(currentThumbnail)} 
                        alt="Current thumbnail" 
                        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all z-0" 
                     />
                     <div className="absolute inset-0 flex items-center justify-center z-0">
                       <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                         Click to replace
                       </span>
                     </div>
                   </>
                ) : (
                  /* Empty State */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#222222]/50 pointer-events-none group-hover:scale-105 transition-transform z-0">
                      <div className="p-2 bg-white/50 rounded-full group-hover:bg-white transition-colors">
                        <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                      </div>
                      <span className="text-sm font-medium">Click or drag file</span>
                  </div>
                )}
              </div>
            </div>

            {/* actions */}
            <div className="flex flex-col items-center gap-4 mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FF6D1F] text-[#FAF3E1] rounded-xl py-3 text-base font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:bg-[#F5E7C6] disabled:text-[#222222]/50 shadow-lg shadow-[#FF6D1F]/20 hover:shadow-[#FF6D1F]/30 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                   <>
                     <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                     <span>{isEditMode ? 'Updating...' : 'Creating...'}</span>
                   </>
                ) : (
                  <span>{isEditMode ? 'Save Changes' : 'Create Course'}</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-[#222222] text-sm font-medium hover:underline decoration-2 underline-offset-4 decoration-[#FF6D1F]/30 hover:decoration-[#FF6D1F] transition-all"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* decorative blobs */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FF6D1F]/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#F5E7C6]/60 blur-[80px] rounded-full pointer-events-none" />
        </div>
      </div>
    </>
  );
}