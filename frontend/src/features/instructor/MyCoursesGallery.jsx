import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getMyCourses } from '../../api/axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export default function MyCoursesGallery() {
  const navigate = useNavigate();

  // Fetch Courses
  const { data: courses = [], isLoading, isError } = useQuery({
    queryKey: ['my-courses'],
    queryFn: getMyCourses,
  });

  if (isError) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 font-bold mb-4">Failed to load courses.</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-[#FF6D1F] underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <div className="min-h-screen bg-[#FAF3E1]/30 font-['Lexend'] text-[#222222] p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#222222]">My Courses</h1>
            <p className="text-[#222222]/60 mt-1">Manage and edit your published content</p>
          </div>
          <button 
            onClick={() => navigate('/course/add')}
            className="flex items-center gap-2 px-5 py-3 bg-[#FF6D1F] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-[#e0560e] transition-all"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Create New Course
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <SkeletonCard />
            <SkeletonCard delay="delay-75" />
            <SkeletonCard delay="delay-100" />
            <SkeletonCard delay="delay-150" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[24px] border border-dashed border-[#F5E7C6]">
            <div className="bg-[#FAF3E1] rounded-full p-6 mb-4">
              <span className="material-symbols-outlined text-[48px] text-[#FF6D1F]">school</span>
            </div>
            <h3 className="text-[#222222] text-xl font-bold mt-2">No courses found</h3>
            <p className="text-[#222222]/60 text-base mt-2 mb-6 text-center max-w-sm">
              You haven’t created any courses yet. Start your teaching journey today.
            </p>
            <button 
              onClick={() => navigate('/course/add')}
              className="flex items-center gap-2 bg-[#FF6D1F] text-[#FAF3E1] px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-[#e0560e] transition-all"
            >
              <span className="material-symbols-outlined">add</span>
              Create Your First Course
            </button>
          </div>
        )}

        {/* Course Grid */}
        {!isLoading && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="group relative bg-white border border-[#F5E7C6] rounded-[24px] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => navigate(`/instructor/course/${course.id}`)} 
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-[#FAF3E1] relative overflow-hidden">
                  {course.image_url ? (
                    <img 
                      src={getImageUrl(course.image_url)} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#FF6D1F]/20">
                      <span className="material-symbols-outlined text-[48px]">image</span>
                    </div>
                  )}
                  
                  {/* "View Details" */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white font-bold px-4 py-2 rounded-full border border-white/30">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                      View Details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-[#222222] leading-tight line-clamp-2 mb-1" title={course.title}>
                    {course.title}
                  </h3>
                  {course.sub_title && (
                    <p className="text-sm text-[#222222]/60 line-clamp-1 mb-3">{course.sub_title}</p>
                  )}
                  
                  <div className="mt-auto flex items-center justify-between border-t border-[#F5E7C6]/50 pt-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase ${course.is_paid ? 'bg-[#FAF3E1] text-[#FF6D1F]' : 'bg-green-100 text-green-700'}`}>
                      {course.is_paid ? 'Paid' : 'Free'}
                    </span>
                    {course.is_paid && (
                      <span className="font-bold text-[#222222]">${course.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}

/* ---- Skeleton Component ---- */
function SkeletonCard({ delay = '' }) {
  return (
    <div className={`bg-white rounded-[24px] border border-[#F5E7C6] overflow-hidden flex flex-col h-full animate-pulse ${delay}`}>
      <div className="aspect-video bg-[#FAF3E1]" />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="h-6 bg-[#FAF3E1] rounded w-3/4" />
        <div className="h-4 bg-[#FAF3E1] rounded w-1/2" />
        <div className="mt-auto pt-4 border-t border-[#F5E7C6]/50 flex justify-between">
           <div className="h-5 bg-[#FAF3E1] rounded w-12" />
           <div className="h-5 bg-[#FAF3E1] rounded w-10" />
        </div>
      </div>
    </div>
  );
}