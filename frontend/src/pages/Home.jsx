import React from 'react'



import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getPublicCourses, getAllCategories } from '../api/axios';

// Base URL for images
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};


const Home = () => {



  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ['home-categories'],
    queryFn: getAllCategories, 
  });

  const { data: coursesData, isLoading: isLoadingCourses } = useQuery({
    queryKey: ['home-courses'],
    queryFn: getPublicCourses,
  });

  const featuredCourses = coursesData?.courses?.slice(0, 7) || [];
  const featuredCategories = categories.slice(0, 4);
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pb-20 pt-16 lg:pt-24" style={{ background: 'linear-gradient(to bottom, #FAF3E1, #F5E7C6)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FF6D1F 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-[#FF6D1F] backdrop-blur-sm shadow-sm border border-white">
                <span className="flex h-2 w-2 rounded-full bg-[#FF6D1F] animate-pulse"></span>
                New Courses Added Weekly
              </div>
              
              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-[#222222] sm:text-5xl md:text-6xl">
                Grow your skills with 
                <span className="text-[#FF6D1F] relative inline-block ml-2">
                  Expert
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FF6D1F]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4"></path>
                  </svg>
                </span>
                mentors
              </h1>
              
              <p className="text-lg text-[#222222]/80 md:text-xl max-w-2xl mx-auto lg:mx-0">
                Join over 2 million learners worldwide. Master design, coding, marketing, and more with hands-on projects and real-time feedback.
              </p>
              
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <button className="group flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-full bg-[#FF6D1F] px-8 text-base font-bold text-white shadow-lg transition-all hover:bg-[#FF6D1F]/90 hover:-translate-y-0.5">
                  Start Learning
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <button className="flex h-12 min-w-[160px] items-center justify-center rounded-full bg-white px-8 text-base font-bold text-[#222222] shadow-sm ring-1 ring-[#222222]/10 transition-all hover:bg-gray-50 hover:ring-[#222222]/20">View Pricing</button>
              </div>
              
              <div className="mt-4 flex items-center justify-center gap-4 text-sm font-medium text-[#222222]/70 lg:justify-start">
                <div className="flex -space-x-2">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFYqbszHUFDgxN24MP72cjImN9rFCP5clc7UllchfZAy9wG9Tz6AFtm3kQfjUawxdpGjZJGG2czlRd_rknQjj83gHs45YfaPdSLNmzrydDnrBCFogYf7Ze_mnpvdS8bNYDer1w_9PU7GsnsJ7W9QHBzpMSp0Dz3ycZcYF6OVaUP6S_P2j4FXGGgotg5sSKNBp3ppZ4X2VuGDn3uuXhTsCKjmWSUfidSO4LhZ9KXdYG8-BR225PS0EITF_5gzSy0Nqdn9_AIrbMbjk" alt="User" className="h-8 w-8 rounded-full border-2 border-[#FAF3E1]" />
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsPuyUBzzpjYKTlEs7SueASjzFzjCzPkR3mvMFJQ_rPSKy0Whv-aSMqLcn3U-ZLpZgqct-8rh9zf9hE2_41ao7PKXh7k5skPchjsw0APjs3a60L8YHZrF1b5C6G4tvlewPLDLGtYkfZkgY2aPWF1L0uuUDYUTnS99KLL_K_SVx0ksUk545JE5NViVStqppWwTeBq7FfKs8-aht97DQR43zldyoCzfg8Zl7fz1_ayo1Ke9ikX3FAjqwsle6fY9duAwp2znPLovIk5k" alt="User" className="h-8 w-8 rounded-full border-2 border-[#FAF3E1]" />
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXX_hm6QSmK3Hv340vTQuCceJWm7Ky0RphajScjLEwgPuHGkozxkXrkupPYRRHEiR-yv7zRbXPfCowe17K4VAZ2ofSbEdSRQNor8svYD7_asQzZTBc1ZVo7wQQ8_YnOQ3XkgzdTJK2Ky-H7PGdEGYmiZ61BUs0eH0wz62A86Tnt1VtMXKNiLTUcKXMmVxFENWif-nENTYdvG-jz7ocCihFDVYWGs2N4rYsFfJIKryYBNygScXTGIcsmLtDv7rZO7PwVcFe0lx8HOI" alt="User" className="h-8 w-8 rounded-full border-2 border-[#FAF3E1]" />
                </div>
                <p>Trusted by 10k+ students</p>
              </div>
            </div>
            
            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white p-2 rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl" style={{ boxShadow: '0 25px 50px rgba(255, 109, 31, 0.1)' }}>
                <div className="h-full w-full overflow-hidden rounded-xl bg-gray-900/5 relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYocBWj_PQC94esNHUQWDlyeIviVss1t-fiwSAH8JpJ_syQCJhCb0AHNPJ3ktyOQ0Nis5jzl5smE5zGy8FzOe1sYaPlrIf3S2O4BLCD8mgJWsIRpjPw9XtymgvoqvidGwQUpdjHlCGazag61rW1oBWRK6lMNhl7wcsitLlJHWZffqE5o7Malnila9R8nU_6m9vETDXMewCHkm1LoTIu8ZWXsFZSxeGtz1nlY6Lz3FuPW2BYZv7De6RSESkveZaN1ntASDowLmcAGA')" }}></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-md border border-white/50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6D1F]/10 text-[#FF6D1F]">
                        <span className="material-symbols-outlined">play_circle</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#222222]">Introduction to UX Design</p>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                          <div className="h-1.5 w-[65%] rounded-full bg-[#FF6D1F]"></div>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-[#222222]">65%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-8 -top-8 -z-10 h-32 w-32 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(255, 109, 31, 0.1)' }}></div>
              <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full blur-3xl" style={{ backgroundColor: '#F5E7C6' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <div className="relative flex w-full flex-col overflow-hidden bg-white py-10 border-b border-gray-100">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-[#222222]/50">Trusted by top companies worldwide</p>
        <div className="relative flex overflow-x-hidden">
          <div className="whitespace-nowrap py-2 flex items-center gap-16 px-8" style={{ animation: 'marquee 25s linear infinite' }}>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Google</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Microsoft</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Spotify</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Amazon</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Uber</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Airbnb</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Netflix</span>
          </div>
          <div className="absolute top-0 whitespace-nowrap py-2 flex items-center gap-16 px-8" style={{ animation: 'marquee2 25s linear infinite' }}>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Google</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Microsoft</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Spotify</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Amazon</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Uber</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Airbnb</span>
            <span className="text-2xl font-bold text-[#222222]/30 flex items-center gap-2"><span className="material-symbols-outlined">verified</span> Netflix</span>
          </div>
        </div>
      </div>

      {/* Course Grid Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#222222] md:text-4xl">Explore Top Courses</h2>
          <p className="mt-3 text-[#222222]/60">Discover the best content to push your career forward.</p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <button className="rounded-full bg-[#FF6D1F] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#FF6D1F]/90">All Courses</button>
          {featuredCategories.length > 0 ? (
            <div className="flex flex-wrap gap-4 justify-center">
              {featuredCategories.map((cat) => (
                <button
                  key={cat.id}
                  className="rounded-full bg-[#F5E7C6] px-6 py-2.5 text-sm font-semibold text-[#222222] transition-all hover:bg-[#FF6D1F] hover:text-white"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#222222]/40">
              Loading categories...
            </div>
          )}

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoadingCourses ? (
            <div className="col-span-full py-20 text-center text-[#222222]/50">
              Loading courses...
            </div>
          ) : featuredCourses.length > 0 ? (
            featuredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#FAF3E1] border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6D1F]/30 hover:shadow-lg hover:shadow-[#FF6D1F]/10"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                  {course.image_url ? (
                    <img
                      src={getImageUrl(course.image_url)}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <span className="material-symbols-outlined text-[48px]">image</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button className="rounded-full bg-[#FF6D1F] px-6 py-2 text-sm font-bold text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Start Learning
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6D1F] shadow-sm">
                      {course.category}
                    </span>

                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined text-[16px] fill-current">
                        star
                      </span>
                      <span className="text-xs font-bold">
                        {course.rating || 'New'}
                      </span>
                      <span className="text-[10px] text-[#222222]/50">
                        ({course.total_ratings || 0})
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-3 text-lg font-bold leading-tight text-[#222222] group-hover:text-[#FF6D1F] transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-2">
                    <img
                      src={
                        getImageUrl(course.instructor_image) ||
                        `https://ui-avatars.com/api/?name=${course.instructor_name}`
                      }
                      alt={course.instructor_name}
                      className="h-6 w-6 rounded-full object-cover bg-gray-100"
                    />
                    <span className="text-xs font-medium text-[#222222]/70 truncate">
                      {course.instructor_name}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222222]/5">
                    <span className="text-lg font-bold text-[#222222]">
                      {course.is_paid ? `$${course.price}` : 'Free'}
                    </span>

                    {course.original_price && (
                      <span className="text-xs font-medium text-[#222222]/50 line-through">
                        ${course.original_price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-400">No courses available yet.</p>
            </div>
          )}

        </div>

        <div className="mt-16 flex justify-center">
          <button onClick={()=> navigate('/courses')} className="flex items-center gap-2 rounded-full border-2 border-[#FF6D1F] bg-transparent px-8 py-3 text-sm font-bold text-[#FF6D1F] transition-all hover:bg-[#FF6D1F] hover:text-white">
            View All Courses
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default Home