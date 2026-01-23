import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { addVideosToCourse, manageCourseVideos } from '../../api/axios';

export default function AddVideos() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, courseTitle, existingVideos } = location.state || {};
  const isManageMode = !!existingVideos; 

  // Redirect 
  useEffect(() => {
    if (!courseId) {
      alert("No course selected. Please create a course first.");
      navigate('/course/add');
    }
  }, [courseId, navigate]);

  const [newVideoQueue, setNewVideoQueue] = useState([]);
  
  const [existingQueue, setExistingQueue] = useState(existingVideos || []);

  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 4000);
  };
  const closeToast = () => setToast(null);

  // New file input
  const handleFileSelect = (e) => {
    if (e.target.files) {
      const startOrder = (existingQueue.length > 0 ? Math.max(...existingQueue.map(v=>v.order)) : 0) + newVideoQueue.length + 1;

      const newFiles = Array.from(e.target.files).map((file, index) => ({
        tempId: Date.now() + index, 
        file,
        title: file.name.split('.')[0],
        order: startOrder + index
      }));
      setNewVideoQueue(prev => [...prev, ...newFiles]);
    }
  };

  // Update Title 
  const updateNewTitle = (tempId, newTitle) => {
    setNewVideoQueue(prev => prev.map(v => v.tempId === tempId ? { ...v, title: newTitle } : v));
  };
  // Remove 
  const removeNewVideo = (tempId) => {
    setNewVideoQueue(prev => prev.filter(v => v.tempId !== tempId));
  };

  // Update Title
  const updateExistingTitle = (id, newTitle) => {
    setExistingQueue(prev => prev.map(v => v.id === id ? { ...v, title: newTitle } : v));
  };

  // Mutations
  const uploadMutation = useMutation({
    mutationFn: (formData) => {
        if (isManageMode) {
            return manageCourseVideos(courseId, formData);
        } else {
            return addVideosToCourse(courseId, formData);
        }
    },
    onSuccess: () => {
      showToast('success', 'Success', 'Videos have been updated successfully.');
      setTimeout(() => navigate(`/instructor/course/${courseId}`), 2000);
    },
    onError: (err) => {
      const msg = err.response?.data?.detail || 'Failed to process videos';
      showToast('error', 'Error', msg);
    }
  });

  const handleSave = () => {
    const formData = new FormData();

    if (isManageMode) {
        
        const updates = existingQueue.map(v => ({
            id: v.id,
            title: v.title,
            order: v.order 
        }));
        formData.append('video_updates', JSON.stringify(updates));

        // API expects 'new_files' (list of files) and 'new_files_data' (JSON list of metadata)
        if (newVideoQueue.length > 0) {
            const newMeta = newVideoQueue.map(v => ({
                title: v.title,
                order: v.order
            }));
            formData.append('new_files_data', JSON.stringify(newMeta));
            
            newVideoQueue.forEach(v => {
                formData.append('new_files', v.file);
            });
        }
    } else {
        // LEGACY MODE (First time add)
        if (newVideoQueue.length === 0) {
            showToast('error', 'Empty Queue', 'Please select videos to upload.');
            return;
        }
        const titles = newVideoQueue.map(v => v.title);
        const orders = newVideoQueue.map((_, index) => index + 1);

        formData.append('titles', JSON.stringify(titles));
        formData.append('orders', JSON.stringify(orders));

        newVideoQueue.forEach(v => {
            formData.append('videos', v.file);
        });
    }

    uploadMutation.mutate(formData);
  };

  // --- Toast UI ---
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

  if (!courseId) return null;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`@keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      
      {renderToast()}

      <div className="min-h-screen bg-[#FAF3E1]/50 w-full flex justify-center p-4 md:p-8 font-['Lexend'] text-[#222222]">
        <main className="w-full max-w-[800px] flex flex-col gap-6">
          
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
                {isManageMode ? 'Manage Videos' : 'Upload Videos'}
            </h1>
            <p className="text-[#222222]/60">
               {isManageMode ? 'Edit existing content or add new lessons for' : 'Adding content to'} <span className="font-bold text-[#FF6D1F]">"{courseTitle || 'Course'}"</span>
            </p>
          </header>

          <div className="bg-white rounded-[24px] shadow-xl border border-[#F5E7C6] p-6 md:p-8 relative overflow-hidden flex flex-col gap-6">
            
            <div className="flex flex-col gap-4">
              
              {/* --- EXISTING VIDEOS SECTION --- */}
              {isManageMode && existingQueue.length > 0 && (
                 <div className="space-y-3 mb-6">
                    <h3 className="text-sm font-bold uppercase text-[#222222]/40">Existing Videos</h3>
                    {existingQueue.map((v) => (
                        <div key={v.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-4">
                            <span className="font-bold text-[#222222]/20 w-6 text-center">{v.order}</span>
                            <div className="size-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                                <span className="material-symbols-outlined text-[20px]">movie</span>
                            </div>
                            <input 
                                type="text" 
                                value={v.title}
                                onChange={(e) => updateExistingTitle(v.id, e.target.value)}
                                className="bg-transparent font-medium text-[#222222] focus:outline-none focus:border-b-2 focus:border-[#FF6D1F] w-full"
                            />
                            <div className="text-xs text-gray-400 whitespace-nowrap">Published</div>
                        </div>
                    ))}
                 </div>
              )}

              {/* --- NEW VIDEOS SECTION --- */}
              <h3 className="text-sm font-bold uppercase text-[#222222]/40">
                  {isManageMode ? 'Add New Videos' : 'Video Queue'}
              </h3>
              
              {newVideoQueue.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-[#F5E7C6] rounded-2xl flex flex-col items-center justify-center text-center gap-3 bg-[#FAF3E1]/20">
                   <div className="size-12 bg-[#FAF3E1] rounded-full flex items-center justify-center text-[#FF6D1F]">
                      <span className="material-symbols-outlined text-[24px]">add</span>
                   </div>
                   <p className="font-bold text-[#222222]/40 text-sm">No new videos selected</p>
                </div>
              ) : (
                newVideoQueue.map((v, i) => (
                  <div key={v.tempId} className="bg-[#FAF3E1]/30 border border-[#F5E7C6] rounded-xl p-3 flex items-center gap-4 animate-[fadeIn_0.3s_ease-out]">
                    <span className="font-bold text-[#222222]/20 w-6 text-center">
                        {v.order}
                    </span>
                    <div className="size-10 rounded-lg bg-[#FF6D1F]/10 flex items-center justify-center text-[#FF6D1F] shrink-0">
                      <span className="material-symbols-outlined text-[20px]">upload</span>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <input 
                        type="text" 
                        value={v.title}
                        onChange={(e) => updateNewTitle(v.tempId, e.target.value)}
                        placeholder="Video Title"
                        className="bg-transparent font-bold text-[#222222] placeholder-[#222222]/30 focus:outline-none focus:text-[#FF6D1F] w-full"
                      />
                      <p className="text-xs text-[#222222]/50 truncate">{v.file.name}</p>
                    </div>
                    <button onClick={() => removeNewVideo(v.tempId)} className="text-[#222222]/30 hover:text-red-500">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                ))
              )}

              {/* Add Button */}
              <div className="relative mt-2">
                <input 
                  type="file" 
                  multiple 
                  accept="video/*" 
                  onChange={handleFileSelect} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button 
                  type="button" 
                  className="group w-full border-2 border-dashed border-[#FF6D1F] hover:border-solid rounded-[12px] py-3 px-4 flex items-center justify-center gap-2 text-[#FF6D1F] hover:bg-[#FF6D1F] hover:text-white transition-all duration-300"
                >
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                  <span className="font-medium">Select Videos to Upload</span>
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white pt-4 mt-2 border-t border-transparent flex justify-end items-center gap-4 z-10">
              <button
                onClick={() => navigate(`/instructor/course/${courseId}`)}
                className="text-[#222222] text-sm font-medium hover:underline decoration-primary decoration-2 underline-offset-4"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={uploadMutation.isPending || (newVideoQueue.length === 0 && !isManageMode)}
                className="bg-[#FF6D1F] hover:scale-105 active:scale-95 transition-all text-[#FAF3E1] text-sm font-semibold rounded-[12px] px-6 py-2.5 shadow-lg shadow-orange-500/20 flex items-center gap-2 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {uploadMutation.isPending ? (
                   <>
                     <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                     <span>Saving...</span>
                   </>
                ) : (
                   <>
                     <span className="material-symbols-outlined text-[20px]">save</span>
                     <span>Save Changes</span>
                   </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}