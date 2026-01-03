import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { addVideosToCourse } from '../../api/axios'; // API function

export default function AddVideos() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, courseTitle } = location.state || {};

  // Redirect if no courseId (direct access protection)
  useEffect(() => {
    if (!courseId) {
      alert("No course selected. Please create a course first.");
      navigate('/course/add');
    }
  }, [courseId, navigate]);

  // Video State
  const [videoQueue, setVideoQueue] = useState([]);
  const [toast, setToast] = useState(null);

  // --- Helpers ---
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 4000);
  };
  const closeToast = () => setToast(null);

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file, index) => ({
        id: Date.now() + index,
        file,
        title: file.name.split('.')[0],
        order: videoQueue.length + index + 1
      }));
      setVideoQueue(prev => [...prev, ...newFiles]);
    }
  };

  const updateTitle = (id, newTitle) => {
    setVideoQueue(prev => prev.map(v => v.id === id ? { ...v, title: newTitle } : v));
  };

  const removeVideo = (id) => {
    setVideoQueue(prev => prev.filter(v => v.id !== id));
  };

  // API Mutation
  const uploadMutation = useMutation({
    mutationFn: (formData) => addVideosToCourse(courseId, formData),
    onSuccess: () => {
      showToast('success', 'Upload Complete', 'All videos have been added successfully.');
      setTimeout(() => navigate('/instructor/courses'), 2000); // Redirect to course list
    },
    onError: (err) => {
      const msg = err.response?.data?.detail || 'Failed to upload videos';
      showToast('error', 'Upload Failed', msg);
    }
  });

  const handleUpload = () => {
    if (videoQueue.length === 0) {
      showToast('error', 'Empty Queue', 'Please select videos to upload.');
      return;
    }

    const formData = new FormData();
    const titles = videoQueue.map(v => v.title);
    const orders = videoQueue.map((_, index) => index + 1);

    formData.append('titles', JSON.stringify(titles));
    formData.append('orders', JSON.stringify(orders));

    videoQueue.forEach(v => {
      formData.append('videos', v.file);
    });

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
          
          {/* Header */}
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Upload Videos</h1>
            <p className="text-[#222222]/60">
               Adding content to <span className="font-bold text-[#FF6D1F]">"{courseTitle || 'New Course'}"</span>
            </p>
          </header>

          {/* Main Card */}
          <div className="bg-white rounded-[24px] shadow-xl border border-[#F5E7C6] p-6 md:p-8 relative overflow-hidden flex flex-col gap-6">
            
            {/* List */}
            <div className="flex flex-col gap-4">
              {videoQueue.length === 0 ? (
                <div className="p-10 border-2 border-dashed border-[#F5E7C6] rounded-2xl flex flex-col items-center justify-center text-center gap-3 bg-[#FAF3E1]/20">
                   <div className="size-16 bg-[#FAF3E1] rounded-full flex items-center justify-center text-[#FF6D1F]">
                      <span className="material-symbols-outlined text-[32px]">video_library</span>
                   </div>
                   <p className="font-bold text-[#222222]/40">No videos selected yet</p>
                </div>
              ) : (
                videoQueue.map((v, i) => (
                  <div key={v.id} className="group relative bg-[#FAF3E1]/30 border border-[#F5E7C6] hover:border-[#FF6D1F]/30 hover:bg-white rounded-xl p-3 flex items-center gap-4 transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
                    
                    {/* Index */}
                    <span className="font-bold text-[#222222]/20 w-6 text-center">{i + 1}</span>

                    {/* Preview Icon */}
                    <div className="size-12 rounded-lg bg-[#222222] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                      <span className="material-symbols-outlined">play_arrow</span>
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <input 
                        type="text" 
                        value={v.title}
                        onChange={(e) => updateTitle(v.id, e.target.value)}
                        placeholder="Video Title"
                        className="bg-transparent font-bold text-[#222222] placeholder-[#222222]/30 focus:outline-none focus:text-[#FF6D1F] transition-colors w-full"
                      />
                      <p className="text-xs text-[#222222]/50 truncate">{v.file.name}</p>
                    </div>

                    {/* Delete Action */}
                    <button 
                      onClick={() => removeVideo(v.id)}
                      className="size-8 rounded-lg flex items-center justify-center text-[#222222]/30 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                ))
              )}

              {/* Add Button */}
              <div className="relative">
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
                  <span className="font-medium">Add more videos</span>
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white pt-4 mt-2 border-t border-transparent flex justify-end items-center gap-4 z-10">
              <button
                onClick={() => navigate('/instructor/courses')}
                className="text-[#222222] text-sm font-medium hover:underline decoration-primary decoration-2 underline-offset-4"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={videoQueue.length === 0 || uploadMutation.isPending}
                className="bg-[#FF6D1F] hover:scale-105 active:scale-95 transition-all text-[#FAF3E1] text-sm font-semibold rounded-[12px] px-6 py-2.5 shadow-lg shadow-orange-500/20 flex items-center gap-2 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {uploadMutation.isPending ? (
                   <>
                     <span className="material-symbols-outlined animate-spin text-[20px]">cloud_upload</span>
                     <span>Uploading...</span>
                   </>
                ) : (
                   <>
                     <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                     <span>Upload ({videoQueue.length} videos)</span>
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