import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getPublicCourseDetails, initiatePayment } from '../api/axios'; 

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [toast, setToast] = useState(null); 
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 4000);
  };
  const closeToast = () => setToast(null);

  const { data: course, isLoading, isError } = useQuery({
    queryKey: ['public-course-details', courseId],
    queryFn: () => getPublicCourseDetails(courseId),
    enabled: !!courseId,
  });

  // Payment Mutation
  const paymentMutation = useMutation({
    mutationFn: () => initiatePayment(courseId),
    onSuccess: (data) => {
      if (data.type === 'free_enrollment') {
        showToast('success', 'Enrolled Successfully', 'You have been enrolled in this free course.');
        setTimeout(() => navigate('/student/course'), 1500);
      } else if (data.type === 'payment_redirect' && data.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      }
    },
    onError: (err) => {
      const msg = err.response?.data?.detail || 'Failed to initiate enrollment';
      if (err.response?.status === 400 && msg.includes("already enrolled")) {
         showToast('info', 'Already Enrolled', 'Redirecting to your dashboard...');
         setTimeout(() => navigate('/student/course'), 1500);
      } else {
         showToast('error', 'Enrollment Failed', msg);
      }
    }
  });

  const handleEnroll = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    if (!token) {
      showToast('error', 'Login Required', 'Please log in to enroll in courses.');
      setTimeout(() => navigate('/login', { state: { from: `/courses/${courseId}` } }), 1500);
      return;
    }
    
    paymentMutation.mutate();
  };

  const renderToast = () => {
    if (!toast) return null;
    const isError = toast.type === 'error';
    const isSuccess = toast.type === 'success';
    const isInfo = toast.type === 'info';
    
    let bgColor = isSuccess ? 'bg-[#FF6D1F]' : isError ? 'bg-red-500' : 'bg-blue-500';
    let icon = isSuccess ? 'check' : isError ? 'priority_high' : 'info';

    return (
      <div className="fixed top-5 right-5 z-[70] animate-[slideDown_0.3s_ease-out]">
        <div className="pointer-events-auto relative w-[320px] overflow-hidden rounded-xl bg-[#F5E7C6] shadow-xl border border-[#ead7cd]">
          <div className="flex items-start gap-3 p-4 pr-10">
            <div className={`flex size-6 shrink-0 items-center justify-center rounded-full text-white ${bgColor}`}>
              <span className="material-symbols-outlined text-[16px] font-bold">
                {icon}
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
            <div className={`h-full w-full ${bgColor}`}></div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="p-20 text-center font-bold text-[#222222]/50">Loading course details...</div>;
  if (isError || !course) return (
    <div className="p-20 text-center">
      <p className="text-red-500 font-bold mb-4">Course not found.</p>
      <button onClick={() => navigate('/courses')} className="text-[#FF6D1F] underline font-bold">Back to Catalog</button>
    </div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`@keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

      {renderToast()}

      {/* ---  HERO  ---*/}
      <div className="py-12" style={{ backgroundColor: '#F5E7C6' }}>
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[2fr_1fr]">
          {/* left */}
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ring-1"
                style={{ backgroundColor: 'rgba(255,109,31,.1)', color: '#FF6D1F', borderColor: 'rgba(255,109,31,.2)' }}
              >
                {course.category || 'Course'}
              </span>
              <span className="text-sm font-medium text-gray-600">Last updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>

            <h1 className="text-4xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl" style={{ color: '#222222' }}>
              {course.title}
            </h1>

            <p className="text-lg leading-relaxed text-gray-700 md:w-5/6">
              {course.sub_title || course.description?.substring(0, 150) + "..."}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-[#222222]/80">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined" style={{ color: '#FF6D1F' }}>star</span>
                <span>{course.rating > 0 ? course.rating : 'New'} ({course.total_ratings || 0} reviews)</span>
              </div>
              {/* <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined" style={{ color: '#FF6D1F' }}>group</span>
                <span>{course.students_count || 0} students</span>
              </div> */}
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined" style={{ color: '#FF6D1F' }}>schedule</span>
                <span>{course.videos?.length || 0} lessons</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handleEnroll}
                disabled={paymentMutation.isPending}
                className="rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#222222' }}
              >
                {paymentMutation.isPending ? (
                   <>
                     <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                     Processing...
                   </>
                ) : (
                   'Enroll Now'
                )}
              </button>
              <span className="text-3xl font-black" style={{ color: '#222222' }}>
                {course.is_paid ? `$${course.price}` : 'Free'}
              </span>
            </div>
          </div>

          {/* right (thumbnail) */}
          <div className="relative hidden lg:block">
            <div
              className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 border-4 border-white"
            >
              {course.image_url ? (
                 <img 
                   src={getMediaUrl(course.image_url)} 
                   alt={course.title} 
                   className="h-full w-full object-cover" 
                 />
              ) : (
                 <div className="h-full w-full flex items-center justify-center bg-[#222222] text-white">
                    <span className="material-symbols-outlined text-6xl">image</span>
                 </div>
              )}
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer group">
                 <div className="size-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl ml-1" style={{ color: '#FF6D1F' }}>play_arrow</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------  CONTENT LAYOUT  ------------------ */}
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 lg:grid-cols-[2fr_1fr]" style={{ fontFamily: 'Lexend, sans-serif' }}>
        
        {/* Main Column */}
        <div className="flex flex-col gap-12">
          
          {/* Description */}
          <section>
            <h2 className="mb-6 text-2xl font-black text-[#222222]">About this course</h2>
            <div className="prose prose-lg text-[#222222]/80 leading-relaxed whitespace-pre-wrap">
              {course.description || "No description provided."}
            </div>
          </section>

          {/* Curriculum */}
          <section>
            <h2 className="mb-6 text-2xl font-black text-[#222222]">Course Content</h2>
            <div className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: '#F5E7C6' }}>
              {course.videos && course.videos.length > 0 ? (
                course.videos.map((v, idx) => (
                  <div
                    key={v.id}
                    className="group flex items-center justify-between border-b bg-white px-6 py-4 last:border-0 transition-colors hover:bg-[#FAF3E1]/30"
                    style={{ borderColor: '#F5E7C6' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-lg font-bold text-sm" style={{ backgroundColor: '#FAF3E1', color: '#FF6D1F' }}>
                        {idx + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#222222] text-sm md:text-base group-hover:text-[#FF6D1F] transition-colors">
                          {v.title}
                        </span>
                        <span className="text-xs font-medium text-[#222222]/40">Video Lesson</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold text-[#222222]/60 hover:bg-white hover:text-[#FF6D1F] transition-all" style={{ borderColor: '#F5E7C6' }}>
                       <span className="material-symbols-outlined text-[16px]">lock</span>
                       <span className="hidden sm:inline">Locked</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-[#222222]/50">No videos available yet.</div>
              )}
            </div>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="mb-6 text-2xl font-black text-[#222222]">Your Instructor</h2>
            <div className="flex flex-col gap-6 rounded-3xl p-8 border sm:flex-row sm:items-start" style={{ backgroundColor: 'rgba(250, 243, 225, 0.3)', borderColor: '#F5E7C6' }}>
              <img
                src={getMediaUrl(course.instructor_image) || `https://ui-avatars.com/api/?name=${course.instructor_name}`}
                alt={course.instructor_name}
                className="h-24 w-24 rounded-2xl object-cover shadow-md"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-[#222222]">{course.instructor_name}</h3>
                <p className="text-sm font-bold uppercase tracking-wide" style={{ color: '#FF6D1F' }}>
                  {course.instructor_headline || "Instructor"}
                </p>
                <p className="text-[#222222]/70 leading-relaxed text-sm">
                  Experienced instructor passionate about teaching.
                </p>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="mb-6 text-2xl font-black text-[#222222] flex items-center gap-2">
              Student Feedback
              <span className="rounded-lg px-2 py-1 text-base font-bold" style={{ backgroundColor: '#FAF3E1', color: '#FF6D1F' }}>
                {course.rating > 0 ? course.rating : 'N/A'}
              </span>
            </h2>
            
            <div className="grid gap-6">
              {course.reviews && course.reviews.length > 0 ? (
                course.reviews.map((review) => (
                  <div key={review.id} className="rounded-2xl border p-6 bg-white" style={{ borderColor: '#F5E7C6' }}>
                    <div className="flex items-center gap-4 mb-3">
                      <img 
                        src={getMediaUrl(review.user_image) || `https://ui-avatars.com/api/?name=${review.user_name}`} 
                        alt={review.user_name} 
                        className="size-10 rounded-full object-cover bg-gray-100" 
                      />
                      <div>
                        <h4 className="font-bold text-sm text-[#222222]">{review.user_name}</h4>
                        <div className="flex text-[12px]" style={{ color: '#FF6D1F' }}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`material-symbols-outlined text-[14px] ${i < Math.round(review.rating) ? 'fill-current' : 'text-gray-300'}`}>star</span>
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-xs font-medium text-[#222222]/40">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#222222]/70 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[#222222]/50 italic">No reviews yet.</p>
              )}
            </div>
          </section>

        </div>

        {/* Sticky Sidebar (Desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 flex flex-col gap-6 rounded-3xl border bg-white p-6 shadow-xl" style={{ borderColor: '#F5E7C6', boxShadow: '0 20px 25px -5px rgba(245, 231, 198, 0.2), 0 10px 10px -5px rgba(245, 231, 198, 0.1)' }}>
            <div className="text-center">
               <span className="text-3xl font-black text-[#222222]">
                  {course.is_paid ? `$${course.price}` : 'Free'}
               </span>
            </div>
            
            <button
              onClick={handleEnroll}
              disabled={paymentMutation.isPending}
              className="w-full rounded-xl py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: '#FF6D1F', boxShadow: '0 10px 15px -3px rgba(255, 109, 31, 0.2)' }}
            >
              {paymentMutation.isPending ? (
                 <>
                   <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                   Processing...
                 </>
              ) : (
                 'Enroll Now'
              )}
            </button>
            
            <ul className="flex flex-col gap-3 text-sm font-medium text-[#222222]/70">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ color: '#FF6D1F' }}>all_inclusive</span>
                Full lifetime access
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ color: '#FF6D1F' }}>devices</span>
                Access on mobile and TV
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ color: '#FF6D1F' }}>card_membership</span>
                Certificate of completion
              </li>
            </ul>

            <div className="border-t pt-6 mt-2" style={{ borderColor: '#F5E7C6' }}>
              <h4 className="font-bold text-[#222222] mb-3 text-sm">Secure Payment via</h4>
              <div className="flex gap-2 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer">
                {/* Mock Icons */}
                {/* <div className="h-6 w-10 rounded bg-white shadow-sm bg-cover" style={{ backgroundColor: '#FAF3E1', border: '1px solid #F5E7C6' }} title="bkash"></div> */}
                {/* <div className="h-6 w-10 rounded bg-white shadow-sm bg-cover" style={{ backgroundColor: '#FAF3E1', border: '1px solid #F5E7C6' }} title="Mastercard"></div> */}
                {/* <div className="h-6 w-10 rounded bg-white shadow-sm bg-cover" style={{ backgroundColor: '#FAF3E1', border: '1px solid #F5E7C6' }} title="PayPal"></div> */}
              </div>
            </div>
          </div>
        </aside>

      </div>
    </>
  );
}