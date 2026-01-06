import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getPublicCourses, getAllCategories } from '../api/axios'; // Use getCategoriesForSelect which points to public/all-categories

// Base URL for images
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export default function CourseCatalog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch Courses
  const { data, isLoading, isError } = useQuery({
    queryKey: ['public-courses'],
    queryFn: getPublicCourses,
  });

  // Fetch Categories
  const { data: categories = [] } = useQuery({
    queryKey: ['public-categories'],
    queryFn: getAllCategories,
  });

  const courses = data?.courses || [];

  // Toggle Category Selection
  const toggleCategory = (catName) => {
    setSelectedCategories(prev => 
      prev.includes(catName) 
        ? prev.filter(c => c !== catName) 
        : [...prev, catName]
    );
  };

  // Client-side filtering
  const filteredCourses = courses.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(c.category);

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <div className="font-['Lexend'] bg-[#FAF3E1] min-h-screen flex flex-col">
        
        {/* main content */}
        <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
            
            {/* sidebar filters */}
            <aside className="hidden lg:flex flex-col gap-8 sticky top-8 h-fit">
              <div>
                <h3 className="text-lg font-black text-[#222222] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#FF6D1F]">tune</span> Filters
                </h3>
                
                {/* Categories */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-[#222222]/60 uppercase tracking-wide">Category</h4>
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none h-5 w-5 border-2 border-[#222222]/20 rounded transition-colors checked:bg-[#FF6D1F] checked:border-[#FF6D1F]"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleCategory(cat.name)}
                        />
                        <span className="material-symbols-outlined text-white text-[14px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                      </div>
                      <span className={`font-medium transition-colors ${selectedCategories.includes(cat.name) ? 'text-[#FF6D1F]' : 'text-[#222222] group-hover:text-[#FF6D1F]'}`}>
                        {cat.name}
                      </span>
                    </label>
                  ))}
                  {categories.length === 0 && <p className="text-sm text-[#222222]/40">No categories found.</p>}
                </div>
              </div>
            </aside>

            {/* main catalog */}
            <div className="flex flex-col gap-8">
              
              {/* header / search */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-black text-[#222222] tracking-tight">Explore Courses</h1>
                  <p className="text-[#222222]/70 mt-2 font-medium">Find the perfect course to upgrade your skills.</p>
                </div>
                
                {/* search bar */}
                <div className="relative w-full md:w-96">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#222222]/40">search</span>
                  <input 
                    type="text" 
                    placeholder="Search courses, skills, or instructors..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#F5E7C6] rounded-xl focus:outline-none focus:border-[#FF6D1F] focus:ring-0 transition-colors placeholder-[#222222]/30 text-[#222222] font-medium"
                  />
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                 <div className="py-20 text-center text-[#222222]/50 font-bold">Loading courses...</div>
              )}

              {/* Error State */}
              {isError && (
                 <div className="py-20 text-center text-red-500 font-bold">Failed to load courses.</div>
              )}

              {/* cards grid */}
              {!isLoading && !isError && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((c) => (
                      <CourseCard key={c.id} course={c} onClick={() => navigate(`/courses/${c.id}`)} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-[#F5E7C6]">
                       <p className="text-[#222222]/40 font-bold">No courses found matching your criteria.</p>
                       <button onClick={() => { setSearchTerm(''); setSelectedCategories([]); }} className="mt-4 text-[#FF6D1F] underline font-bold">Clear Filters</button>
                    </div>
                  )}
                </div>
              )}

              {/* pagination (visual only for now) */}
              {!isLoading && filteredCourses.length > 0 && (
                <div className="flex justify-center mt-12 mb-8">
                  <button className="bg-[#F5E7C6] hover:bg-[#FF6D1F] hover:text-white text-[#222222] font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 group">
                    Load More Courses
                    <span className="material-symbols-outlined group-hover:translate-y-0.5 transition-transform">expand_more</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* simple footer */}
        <footer className="bg-white border-t border-[#ead7cd] py-8 mt-auto">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FF6D1F]">school</span>
              <span className="text-[#222222] font-bold">E-Learning Platform</span>
            </div>
            <p className="text-[#a08f85] text-sm">© 2024 SkillForge Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

function CourseCard({ course, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white border border-[#F5E7C6] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* image */}
      <div className="aspect-video relative bg-[#222222] overflow-hidden">
        {course.image_url ? (
           <img 
             src={getImageUrl(course.image_url)} 
             alt={course.title} 
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
           />
        ) : (
           <div className="w-full h-full flex items-center justify-center text-white/20">
              <span className="material-symbols-outlined text-[48px]">image</span>
           </div>
        )}
        
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[#222222] uppercase tracking-wide">
          {course.category}
        </div>
      </div>

      {/* content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-bold text-lg text-[#222222] leading-tight line-clamp-2 group-hover:text-[#FF6D1F] transition-colors">
          {course.title}
        </h3>
        
        {/* instructor & rating */}
        <div className="flex items-center justify-between text-xs text-[#222222]/60">
          <div className="flex items-center gap-1.5">
             {/* If instructor image exists, can show it, else icon */}
             <span className="material-symbols-outlined text-[16px]">person</span>
             <span className="font-medium truncate max-w-[100px]">{course.instructor_name}</span>
          </div>
          <div className="flex items-center gap-1 text-[#FF6D1F] font-bold bg-[#FF6D1F]/5 px-1.5 py-0.5 rounded">
            <span className="material-symbols-outlined text-[14px] fill-current">star</span>
            {course.rating > 0 ? course.rating : 'New'}
          </div>
        </div>

        {/* footer */}
        <div className="mt-auto pt-4 border-t border-[#F5E7C6]/50 flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-[10px] uppercase font-bold text-[#222222]/40">Price</span>
             <span className="text-lg font-black text-[#222222]">
                {course.is_paid ? `$${course.price}` : 'Free'}
             </span>
          </div>
          <button className="bg-[#FAF3E1] group-hover:bg-[#FF6D1F] text-[#222222] group-hover:text-white rounded-lg p-2 transition-colors">
            <span className="material-symbols-outlined block">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}