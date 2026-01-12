import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getMyEnrollments } from '../../api/axios'; // Updated import path

// Base URL for images
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export default function StudentCourseDashboard() {
  const navigate = useNavigate();

  // Fetch Enrollments
  const { data: enrollments = [], isLoading, isError } = useQuery({
    queryKey: ['my-enrollments'],
    queryFn: getMyEnrollments,
  });

  const handleResume = (courseId) => {
    // Navigate to the video player route
    navigate(`/learn/${courseId}`);
  };

  return (
    <div className="flex h-screen w-full font-['Lexend']">
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />
      
      {/* ----------  MAIN CONTENT  ---------- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            {/* Welcome Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#222222' }}>
                Welcome back! 👋
              </h1>
              <p className="mt-1" style={{ color: 'rgba(34,34,34,.7)' }}>
                Pick up where you left off. Happy learning!
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className="p-6 rounded-xl flex flex-col gap-1 shadow-sm border"
                style={{ backgroundColor: '#F5E7C6', borderColor: '#F5E7C6' }}
              >
                <p className="font-medium" style={{ color: '#222222' }}>Courses in Progress</p>
                <p className="text-3xl font-bold" style={{ color: '#FF6D1F' }}>{enrollments.length}</p>
              </div>
              {/* <div className="p-6 rounded-xl flex flex-col gap-1 shadow-sm border bg-white" style={{ borderColor: '#F5E7C6' }}>
                <p className="font-medium" style={{ color: 'rgba(34,34,34,.6)' }}>Completed</p>
                <p className="text-3xl font-bold" style={{ color: '#222222' }}>0</p>
              </div>
              <div className="p-6 rounded-xl flex flex-col gap-1 shadow-sm border bg-white" style={{ borderColor: '#F5E7C6' }}>
                <p className="font-medium" style={{ color: 'rgba(34,34,34,.6)' }}>Certificates</p>
                <p className="text-3xl font-bold" style={{ color: '#222222' }}>0</p>
              </div>
              <div className="p-6 rounded-xl flex flex-col gap-1 shadow-sm border bg-white" style={{ borderColor: '#F5E7C6' }}>
                <p className="font-medium" style={{ color: 'rgba(34,34,34,.6)' }}>Learning Hours</p>
                <p className="text-3xl font-bold" style={{ color: '#222222' }}>0h</p>
              </div> */}
            </div>

            {/* Content Split */}
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Left Column: My Courses */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#222222]">My Courses</h2>
                  <button className="text-sm font-bold text-[#FF6D1F] hover:underline">View All</button>
                </div>

                {isLoading && <div className="p-10 text-center text-[#222222]/50">Loading enrollments...</div>}
                {isError && <div className="p-10 text-center text-red-500">Failed to load courses.</div>}

                {!isLoading && !isError && enrollments.length === 0 && (
                   <div className="p-10 text-center border-2 border-dashed border-[#F5E7C6] rounded-xl bg-white">
                      <p className="text-[#222222]/50 font-medium">You haven't enrolled in any courses yet.</p>
                   </div>
                )}

                <div className="flex flex-col gap-4">
                  {enrollments.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => handleResume(course.id)}
                      className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white border shadow-sm transition-all hover:shadow-md cursor-pointer"
                      style={{ borderColor: '#F5E7C6' }}
                    >
                      {/* Thumbnail */}
                      <div className="w-full sm:w-48 aspect-video rounded-xl bg-[#222222] overflow-hidden shrink-0 relative">
                        {course.image_url ? (
                           <img 
                             src={getImageUrl(course.image_url)} 
                             alt={course.title} 
                             className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                           />
                        ) : (
                           <div className="h-full w-full flex items-center justify-center text-white/20">
                              <span className="material-symbols-outlined text-[32px]">image</span>
                           </div>
                        )}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-[#FAF3E1] text-[#222222]/60">
                            {course.category_name || 'Course'}
                          </span>
                          <button className="text-[#222222]/30 hover:text-[#FF6D1F]">
                            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                          </button>
                        </div>
                        
                        <h3 className="font-bold text-lg mb-1 line-clamp-1" style={{ color: '#222222' }}>
                          {course.title}
                        </h3>
                        <p className="text-sm text-[#222222]/60 mb-4 line-clamp-1">
                           Instructor: {course.instructor_name}
                        </p>

                        <div className="mt-auto flex flex-col gap-3">
                          <div className="w-full">
                            <div className="flex justify-between text-xs mb-1 font-medium">
                              <span style={{ color: '#222222' }}>Progress</span>
                              <span style={{ color: '#222222' }}>{Math.round(course.progress || 0)}%</span>
                            </div>
                            <div className="w-full rounded-full h-2" style={{ backgroundColor: '#F5E7C6' }}>
                              <div 
                                className="h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${course.progress || 0}%`, backgroundColor: '#FF6D1F' }} 
                              />
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                                e.stopPropagation(); 
                                handleResume(course.id);
                            }}
                            className="w-full py-2.5 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-opacity"
                            style={{ backgroundColor: '#FF6D1F', color: '#FAF3E1' }}
                          >
                            Resume Course
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              {/* <div className="w-full xl:w-96 shrink-0 hidden xl:block">
                 <div className="p-6 bg-white rounded-xl border border-[#F5E7C6] h-full flex items-center justify-center text-[#222222]/40 font-medium text-sm">
                    Additional Widgets Area
                 </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}