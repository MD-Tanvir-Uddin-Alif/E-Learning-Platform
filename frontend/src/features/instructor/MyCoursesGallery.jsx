// src/components/MyCoursesGallery.jsx
import React, { useState } from 'react';

/* ---- dummy data ---- */
const dummyCourses = [
  { id: 1, title: 'Introduction to React', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQsHJRruFoEwTaA4oFRe-eK2hpmlm_llUAIHeVAnD-TM1zfxFyO2RC8h3t_q6Thl-Uc18K3_hW9Jha97UyzLXbcY2FdwEQ_0_yvkYPuL_x03JZZOFmAKBVgBFwp5NRteS1VXYVcN3wbHJkpy6Ik2yDjA4uH9w3lBnE6uCFxr7YMg0EhExJLDzzeZF6FVbedVN82SSv63ot1Tym4InP-qBqd6WwSNQr4yqLpzRS-mTUAyxPyIB31-FruHmO2NLwDCV3M0N53Y1iSI' },
  { id: 2, title: 'Advanced Pottery', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMSBQ8nsz1mqPROPk0hmyYqimJel6ZnT961-qSU_mBoiZnf9050QeDoIILVh20u-wpgTlXn2E1u-DmN58POxG9jcSP3wif6wZeWl9zMY3QnZJGHK2NA7CRj6X4CbxLih4dTFxSyrEKY7lerUiybvaP_F1eRo5is3m8rFtNz8CbSydho9O_n1N-zrU70nuAYZxX2_rl8aag40a2qhAuI27rJNMoae_UON9_iEEva2qTFVSOghf08Hgh2qGmy_KnMRcJ7oYugHNm-G8' },
  { id: 3, title: 'Digital Marketing 101', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGnmbVN28Fvxzxuiszf8EmnMKqlVbH2_PzPap9lWaCeg4sL5kyuVUwstXrE2waS9_l8ZkVDEAjWX3KJww13ly2wztTbjklh-leYmFebqdfoxXoJmaqPiaw4SvjqNsSgdvCKkdBUjMEoDRgqOgvhiZTPD1yZ2g_vgrD0AtfaPiQ2RVP1VTGkOPYeFFpGV5TmPNRKPBCpnzQxxP15PDwsSJkK92jHADg_Wh53RaaU0voif0wyBVE8d30b2t6y5n5Wi2T2yupMI9goww' },
  { id: 4, title: 'UX Design Fundamentals', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSudipJ5NtdN8ojknzRS0rIUbd0Ey6SzhTVLcvEXQ2PKcEP41L5RZlRmUuHwFa7yEzPL7uoRYypXzmerEzDj0XBR3abPzZilEtrRZoDNA7i9_P3NTvWzo0mQ2F9kbXA5pOou9-FV7KBW5AGmBqUXrle55k67b2GsojeOCLORRwkqh4vvERDZJ-NyN87U7o5xg3jUK-9FHg5MDxrBQSUJ1xP5XwgoMc-BBsUXycD3l63CFxomVbAdFJ4sn2Xf2XFmx7vV5YQ2-m_E' },
  { id: 5, title: 'Python for Beginners', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCugo8fHhaNlMq9yRyBqXJ98OmNIXUcK79HDRlhPhWlduG3r5zz-M8daZ0yja7SKTZOgUzuDvATaMFLYsqiHki_yQ0ekt4n1U_aQvcG3x5pr11nnzqg04rsTP3Dg-79QkHFbkctV1NVoB72-4usBsk0zsyAV4GOKy4kV_K5p-rywWHkAKRDwJiu5oulfTOLeUd2p8hgfCZw2YIFPriO8n' },
  { id: 6, title: 'Creative Writing Masterclass', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9-Hj_wn6-KZ6Ch8aFL19BuYojU6y7zHd69akPHhHZ73R_wdfpi8q_CMeX3u9IseC09on-bTdtxvhTF30J1YvHYx00ho7RFkP5RmQfHg9TuoD8JMgZWueUQFB7n7HXAjSJRWNhQD5YdFYEpfZnRV9pqSE-_Qg-kR7e3EpJ6Tzki7-tOR_HOJ2lmaFz6z6v6JeIFxow015MKr' },
  { id: 7, title: 'Financial Literacy', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAMW3W0dSAVcycLhudunheIOoQRfLcewezzWDCjwGT_dh5RFkHdPUvjfllbGWFU8DrWkJ5YZQH5wNLjfXdJ_yOkqZXiBRlYJqKumIgjJEdX_xtHrN5X3yY2wsxSl0sURTAna34X7o7wCyEb0MdlxIqxi9W2RiBL8ZdU46RrFkAY36VGK9xnjsi3JRYrRMLN3rjLKv1GQJDqvPBtWCzQYRRw9oXey47siEiIzbIqbDcaUaz621AgM-Ajig1rCZxbeAMoTQHeJ9WUIc' },
  { id: 8, title: 'Photography Basics', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvHj8RNx21lLfbLh6HFjFfTeFvX8l9T7dPkq9o0_Pt2qaTaIZm72Y_9u-Aw_T3N_SBQH92akx4MXWW0atBUJfKEhIZcDjCIS_zbuV76aFjZy2EzcFCx2NED-7-1tE3CxzwfevNTWRQDnuAcbwqDhJ45eeZPd0wq-xx4_komBscLf_dIKiPtVJJnUJ-wxBetFGt1kDfA_F6puej0uqlKvtC7vJWQtbcUHRC_ErxVW3P7oOCOHVu3QXMucOgtWrClVtHVh-2B8Z1euc' },
];

/* ---- tiny helpers ---- */
const CourseCard = ({ course }) => (
  <a
    href="#"
    className="group block relative bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="aspect-video w-full bg-gray-200 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${course.thumb})` }}
        aria-label={course.title}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
    <div className="bg-[#F5E7C6] px-4 py-3 border-t border-[#ebdcc3]">
      <h3 className="text-[#222222] font-semibold text-center truncate text-base leading-snug">{course.title}</h3>
    </div>
  </a>
);

const SkeletonCard = ({ delay = '' }) => (
  <div className={`bg-white rounded-[20px] overflow-hidden shadow-sm animate-pulse ${delay}`}>
    <div className="aspect-video w-full bg-[#FAF3E1]/50" />
    <div className="bg-[#F5E7C6] px-4 py-3 h-[48px] flex items-center justify-center">
      <div className="h-4 bg-black/5 rounded w-3/4" />
    </div>
  </div>
);

export default function MyCoursesGallery() {
  const [courses] = useState(dummyCourses);
  const [loading] = useState(false); // toggle to show skeletons

  return (
    <>
      {/* fonts & icons */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <div className="min-h-screen bg-[#FAF3E1] text-[#222222]">
        <main className="flex-grow w-full max-w-7xl mx-auto p-6 md:p-10">
          {/* course grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>

          {/* loading state demo */}
          <div className="mt-16 mb-6">
            <h2 className="text-black/50 text-sm font-bold uppercase tracking-wider mb-4 px-1">Loading State Example</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <SkeletonCard />
              <SkeletonCard delay="delay-75" />
              <SkeletonCard delay="delay-100" />
              <SkeletonCard delay="delay-150" />
            </div>
          </div>

          {/* empty state demo */}
          <div className="mt-16 mb-20 border-t border-[#F5E7C6] pt-16">
            <h2 className="text-black/50 text-sm font-bold uppercase tracking-wider mb-4 px-1 text-center">Empty State Example</h2>
            <div className="flex flex-col items-center justify-center py-10">
              <div className="bg-[#F5E7C6]/30 rounded-full p-6 mb-4">
                <span className="material-symbols-outlined text-[48px] text-[#F5E7C6]/80 text-[#FF6D1F]">school</span>
              </div>
              <h3 className="text-[#222222] text-lg font-bold mt-2">No courses found</h3>
              <p className="text-[#222222]/60 text-base mt-2 mb-6 text-center max-w-sm">
                You haven’t created any courses yet. Start your teaching journey today.
              </p>
              <button className="flex items-center gap-2 bg-[#FF6D1F] text-[#FAF3E1] rounded-[12px] px-6 py-3 font-bold hover:scale-105 transition-transform shadow-md">
                <span>Create your first course</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}