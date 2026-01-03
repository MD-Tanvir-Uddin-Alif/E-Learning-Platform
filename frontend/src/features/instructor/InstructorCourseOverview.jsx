import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCourseDetails, getAllCategories } from '../../api/axios'; 

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export default function InstructorCourseOverview() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // 1. Fetch Course Details
  const { data: course, isLoading, isError } = useQuery({
    queryKey: ['course-details', courseId],
    queryFn: () => getCourseDetails(courseId),
    enabled: !!courseId,
  });

  // 2. Fetch Categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories-select'],
    queryFn: getAllCategories,
  });

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : `Category #${id}`;
  };

  if (isLoading) return <div className="p-10 text-center text-[#222222]/60 font-['Lexend']">Loading details...</div>;
  if (isError || !course) return (
    <div className="p-10 text-center font-['Lexend']">
      <p className="text-red-500 font-bold mb-4">Course not found.</p>
      <button onClick={() => navigate('/instructor/courses')} className="text-[#FF6D1F] underline">
        Back to Courses
      </button>
    </div>
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <div className="min-h-screen bg-[#FAF3E1]/30 font-['Lexend'] text-[#222222]">
        
        <header className="sticky top-0 z-20 bg-white/80 px-6 py-4 backdrop-blur-md border-b border-[#F5E7C6]">
          <div className="mx-auto flex max-w-5xl items-center gap-4">
            <button 
              onClick={() => navigate('/instructor/courses')}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF3E1] text-[#222222]/60 hover:bg-[#FF6D1F] hover:text-white transition-all"
            >
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-0.5">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold text-[#222222] truncate">{course.title}</h1>
            <div className="ml-auto flex gap-3">
              {/* EDIT DETAILS BUTTON */}
              <button 
                className="hidden sm:flex h-10 items-center gap-2 rounded-lg border border-[#F5E7C6] px-4 text-sm font-bold text-[#222222] hover:bg-[#FAF3E1] transition-colors"
                onClick={() => navigate('/course/add', { state: { courseToEdit: course } })}
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit Details
              </button>
              <button 
                className="flex h-10 items-center gap-2 rounded-lg bg-[#222222] px-4 text-sm font-bold text-white shadow-lg hover:bg-black transition-colors"
              >
                Publish
              </button>
            </div>
          </div>
        </header>

        <main className="px-6 py-8 pb-20">
          
          <section className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[32px] bg-white shadow-xl shadow-[#F5E7C6]/50 border border-[#F5E7C6]">
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                <div className="relative bg-[#222222] md:col-span-5 h-64 md:h-auto">
                   {course.image_url ? (
                     <img
                       src={getMediaUrl(course.image_url)}
                       alt={course.title}
                       className="absolute inset-0 h-full w-full object-cover opacity-90"
                     />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-white/20">
                       <span className="material-symbols-outlined text-[64px]">image</span>
                     </div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                </div>

                <div className="flex flex-col p-8 md:col-span-7 md:p-10">
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${course.is_paid ? 'bg-[#FAF3E1] text-[#FF6D1F]' : 'bg-green-100 text-green-700'}`}>
                      {course.is_paid ? 'Paid' : 'Free'}
                    </span>
                    <span className="rounded-full bg-[#FAF3E1] px-3 py-1 text-xs font-bold text-[#222222]/60 uppercase tracking-wide">
                      {getCategoryName(course.category_id)}
                    </span>
                  </div>
                  
                  <h1 className="mb-2 text-3xl font-bold leading-tight text-[#222222] md:text-4xl">
                    {course.title}
                  </h1>
                  
                  {course.sub_title && (
                    <p className="mb-6 text-lg font-medium text-[#222222]/60">
                      {course.sub_title}
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-6 border-t border-[#F5E7C6] pt-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#222222]/40 uppercase">Price</span>
                      <span className="text-xl font-bold text-[#222222]">
                        {course.is_paid ? `$${course.price}` : 'Free'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#222222]/40 uppercase">Students</span>
                      <span className="text-xl font-bold text-[#222222]">0</span>
                    </div>
                     <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#222222]/40 uppercase">Rating</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-bold text-[#222222]">N/A</span>
                        <span className="material-symbols-outlined text-sm text-[#FF6D1F] mb-1">star</span>
                      </div>
                    </div>
                  </div>
                  
                   <div className="mt-8">
                     <h3 className="text-sm font-bold uppercase text-[#222222]/40 mb-2">Description</h3>
                     <p className="text-[#222222]/70 leading-relaxed whitespace-pre-wrap">
                       {course.description || "No description provided."}
                     </p>
                   </div>
                </div>

              </div>
            </div>
          </section>

          <section className="mx-auto mt-12 max-w-5xl scroll-mt-24" id="videos-section">
            <div className="mb-6 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[#222222]">Course Videos</h2>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5E7C6] text-xs font-bold text-[#222222]">
                  {course.videos ? course.videos.length : 0}
                </span>
              </div>
              {/* ADD/MANAGE VIDEOS BUTTON */}
              <button
                onClick={() => navigate('/video/add', { 
                    state: { 
                        courseId: course.id, 
                        courseTitle: course.title,
                        existingVideos: course.videos // Passing existing videos triggers "Manage Mode"
                    } 
                })}
                className="group flex items-center gap-1 text-sm font-bold text-[#FF6D1F] hover:underline"
              >
                <span className="material-symbols-outlined transition-transform group-hover:rotate-90">settings</span>
                Manage Videos
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {course.videos && course.videos.length > 0 ? (
                course.videos.map((v) => (
                  <VideoCard key={v.id} v={v} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-[#F5E7C6]">
                   <p className="text-[#222222]/40 font-bold">No videos uploaded yet.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function VideoCard({ v }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-[#F5E7C6] transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video bg-[#222222]">
        <div className="absolute inset-0 flex items-center justify-center text-white/20">
           <span className="material-symbols-outlined text-[48px]">play_circle</span>
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <span className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 text-xs font-bold text-white backdrop-blur-md">
           Order: {v.order}
        </span>
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-base font-bold text-[#222222] line-clamp-1" title={v.title}>
          {v.title || "Untitled Video"}
        </h3>
        <div className="flex items-center justify-between mt-3">
           <a 
             href={getMediaUrl(v.video_url)} 
             target="_blank" 
             rel="noreferrer"
             className="text-xs font-bold text-[#FF6D1F] hover:underline flex items-center gap-1"
           >
             <span className="material-symbols-outlined text-[16px]">open_in_new</span>
             Watch Video
           </a>
        </div>
      </div>
    </div>
  );
}