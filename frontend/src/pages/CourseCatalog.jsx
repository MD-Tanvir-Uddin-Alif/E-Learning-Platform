import React, { useState } from 'react';

/* ---- dummy data ---- */
const dummyCourses = [
  {
    id: 1,
    title: 'Complete Web Design: from Figma to Webflow',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIj4JsQSb2SRSXoHIi_H1XnlRlj9DIAkxgMOVVIua1uaFTIdcjEM00486QiZUAoNpGzVQmYHrs-VUeSrUgewD9hQhuUQFQT91WAFKASw7geRoo-tmNBn58-9LdFWJ0kxnIE0xR9A3xYim9pXMGjZTI3K2SVvZkAOcde6LU1KSkowGnLFypyelmfjRTPmy2gzO3Wtdv31c6jJWrr9IdQjOyxOdhEkREVNzk5v749P9Hhu0A9vzKHnHaiasMWpnZ9ymqfJmL2KBG9f0',
    category: 'Design',
    rating: 4.8,
    price: 49.99,
    instructor: 'Sarah J.',
    duration: '12h 30m',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Advanced React Patterns and Performance',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgy08wXUAGrqSYhgqH-VypfFzixs7a-6y9jYNa9ZWh2HrOgPZ7AIKZtd8tC9ARDtjpj5iDihCUdq6SekqQ2hzpn4rpC-CQoDiFDjg-jnyiZO9b4pT02UE5j0yWgp-39XySDEt6fTft9LIon7gcmZZG7_hFYPtdWSbm1OUZU9beUMq8s4sTGp5jC4dStP9uaKufWTzlMBwCogblSt9IYUlSfw_f9Ybrwv4RORmiz8mJvMrjpKolmauiJzN05LiG_dWuG-LbbwK7YK8',
    category: 'Dev',
    rating: 4.9,
    price: 89.0,
    instructor: 'David C.',
    duration: '8h 15m',
    level: 'Intermediate',
  },
  {
    id: 3,
    title: 'Product Management 101',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1BLqlSkYYVb4VoulUNFzoL0VwMMD6oXP2LDIs1P7SUVvsaRhzDaXcdF2fTrOCL5O7yt1br0Fu3xMng_uR11PegdgD0WUDBBs6x2ab2l8lhjtFQ7VE9noEGgRfv7gJrqcFZzS7_RZt4FuR-8hONbrKZKAssrjahVyV_8WQfTLAskAD7njyQ_BxKOXQAedIb3VdyqB0roZkakWc_xSTfAPkczeGntb6i7nnsJSrgysH4_xu4nOzhofNxtrUgms6Xj999JuOXdm34',
    category: 'Business',
    rating: 4.5,
    price: 29.99,
    instructor: 'Emily R.',
    duration: '6h 45m',
    level: 'Beginner',
  },
  {
    id: 4,
    title: 'UX Design Fundamentals',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSudipJ5NtdN8ojknzRS0rIUbd0Ey6SzhTVLcvEXQ2PKcEP41L5RZlRmUuHwFa7yEzPL7uoRYypXzmerEzDj0XBR3abPzZilEtrRZoDNA7i9_P3NTvWzo0mQ2F9kbXA5pOou9-FV7KBW5AGmBqUXrle55k67b2GsojeOCLORRwkqh4vvERDZJ-NyN87U7o5xg3jUK-9FHg5MDxrBQSUJ1xP5XwgoMc-BBsUXycD3l63CFxomVbAdFJ4sn2Xf2XFmx7vV5YQ2-m_E',
    category: 'Design',
    rating: 4.7,
    price: 59.0,
    instructor: 'Alex M.',
    duration: '15h 00m',
    level: 'Intermediate',
  },
  {
    id: 5,
    title: 'Ethical Hacking Bootcamp',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV6-8nls9A9YOrEItqqUNe3wJtCD1QwfPJ4_t-jo-AAfKHu0Xokie-D42aaWU3cZNs6BUz0xISiOC3P79kriNqUYu1BGyuKB6SQfT_FAQY5ifscBJr-0osMAkpUv_9QoF_7tQs1bPEUeyf5g9DDpYAUQ2wz0h9JTseKwtsk83x_k-pa3J72fA35WN7fuyGbhVHUfkp4BnHOYemIINqsyhnJIduxloF5ckr98emmdUT8xMSteEVsYyJQbzQ98cd1lnwtkmap6a9yMs',
    category: 'Security',
    rating: 5.0,
    price: 120.0,
    instructor: 'Marcus T.',
    duration: '42h 10m',
    level: 'Expert',
  },
  {
    id: 6,
    title: 'Python for Data Science',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARy_srG-C7r9zW_J7d5KQkh2sFHb7sRNUF1RPNsdAXlLNQbekOvD5kmoMLEwFAa5pGcseRNNrxvMamQ3szU3pfFBYkAjkRytrZcnLqi-omnKKrsIgNJLsxUOfHj5DiVfBT0XKZ6jMKv-AwWRoMtQIwYTJ1V8P9ay_5Lh2ZzpUXvZJ7DccGJSNaRH4dLarziapD-JmuQND4QxVBNy7OrrtAxrX_ICzQnfdRsDuuFWm9L7VoPNrr24SoOMwxZTe6U8AWARNO95xd9cI',
    category: 'Data',
    rating: 4.6,
    price: 39.5,
    instructor: 'Jessica L.',
    duration: '18h 45m',
    level: 'Intermediate',
  },
];

/* ---- tiny helpers ---- */
const CourseCard = ({ course }) => (
  <div className="group flex flex-col bg-[#FAF3E1] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20">
    <div className="relative h-48 w-full overflow-hidden">
      <img
        src={course.thumb}
        alt="Course Thumbnail"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 right-3 bg-[#FF6D1F] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
        ${course.price}
      </div>
    </div>
    <div className="flex flex-col flex-1 p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 text-[#FF6D1F] text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">{course.category === 'Design' ? 'palette' : course.category === 'Dev' ? 'code' : course.category === 'Business' ? 'trending_up' : course.category === 'Data' ? 'bar_chart' : 'security'}</span>
          {course.category}
        </div>
        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
          <span className="material-symbols-outlined text-sm fill-current">star</span>
          {course.rating}
        </div>
      </div>
      <h3 className="text-lg font-bold text-[#222222] mb-2 line-clamp-2 group-hover:text-[#FF6D1F] transition-colors">{course.title}</h3>
      <p className="text-sm text-[#a16545] mb-4 line-clamp-2">Learn how to design beautiful interfaces and implement them without code.</p>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#a16545]/10">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={`https://i.pravatar.cc/40?u=${course.instructor}`}
              alt={course.instructor}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-medium text-[#222222]">{course.instructor}</span>
        </div>
        <span className="text-xs font-medium text-[#a16545] flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">schedule</span>
          {course.duration}
        </span>
      </div>
    </div>
  </div>
);

export default function CourseCatalog() {
  const [courses] = useState(dummyCourses);

  return (
    <>
      {/* fonts & icons */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <div className="bg-[#f8f6f5] text-[#222222] font-['Inter']">
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* breadcrumbs */}
         

          <div className="flex flex-col lg:flex-row gap-8">
            {/* sidebar filters */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-[#F5E7C6] rounded-xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#222222]">Filters</h3>
                  <button className="text-xs font-medium text-[#FF6D1F] hover:text-[#FF6D1F]/80 hover:underline">Reset</button>
                </div>

                {/* category filter */}
                <div className="mb-6">
                  <button className="flex items-center justify-between w-full mb-3 group">
                    <span className="text-sm font-bold text-[#222222]">Categories</span>
                    <span className="material-symbols-outlined text-[#222222] group-hover:text-[#FF6D1F] transition-colors text-lg">expand_less</span>
                  </button>
                  <div className="space-y-2">
                    {['Design', 'Development', 'Marketing', 'Business'].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" defaultChecked={cat === 'Design'} className="size-4 rounded border-[#a16545] text-[#FF6D1F] focus:ring-[#FF6D1F] bg-white/50" />
                        <span className="text-sm text-[#222222] group-hover:text-[#FF6D1F] transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#a16545]/20 w-full mb-6" />

                {/* level filter */}
                <div className="mb-6">
                  <button className="flex items-center justify-between w-full mb-3 group">
                    <span className="text-sm font-bold text-[#222222]">Level</span>
                    <span className="material-symbols-outlined text-[#222222] group-hover:text-[#FF6D1F] transition-colors text-lg">expand_less</span>
                  </button>
                  <div className="space-y-2">
                    {['Beginner', 'Intermediate', 'Expert'].map((lvl) => (
                      <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" defaultChecked={lvl === 'Beginner'} className="size-4 rounded border-[#a16545] text-[#FF6D1F] focus:ring-[#FF6D1F] bg-white/50" />
                        <span className="text-sm text-[#222222] group-hover:text-[#FF6D1F] transition-colors">{lvl}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#a16545]/20 w-full mb-6" />

                {/* rating filter */}
                <div className="mb-2">
                  <button className="flex items-center justify-between w-full mb-3 group">
                    <span className="text-sm font-bold text-[#222222]">Rating</span>
                    <span className="material-symbols-outlined text-[#222222] group-hover:text-[#FF6D1F] transition-colors text-lg">expand_less</span>
                  </button>
                  <div className="space-y-2">
                    {[4, 3].map((stars) => (
                      <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="rating" defaultChecked={stars === 4} className="size-4 border-[#a16545] text-[#FF6D1F] focus:ring-[#FF6D1F] bg-white/50" />
                        <div className="flex items-center text-[#FF6D1F] text-sm">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={`material-symbols-outlined text-base ${i < stars ? 'fill-current' : ''}`}>star</span>
                          ))}
                          <span className="text-[#222222] ml-2 text-xs">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* course grid section */}
            <div className="flex-1">
              {/* header & sorting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#222222] tracking-tight mb-1">Explore Courses</h1>
                  <p className="text-sm text-[#a16545]">Showing {courses.length} results</p>
                </div>
                <div className="relative inline-block text-left">
                  <button className="group inline-flex justify-between items-center w-full sm:w-48 rounded-lg border border-transparent bg-[#F5E7C6] px-4 py-2.5 text-sm font-medium text-[#222222] hover:bg-[#F5E7C6]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D1F] transition-all">
                    <span className="group-hover:text-[#FF6D1F] transition-colors">Sort by: Popular</span>
                    <span className="material-symbols-outlined text-[#222222] group-hover:text-[#FF6D1F] transition-colors">expand_more</span>
                  </button>
                </div>
              </div>

              {/* active filter chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6D1F] text-[#FAF3E1] text-sm font-medium">
                  Design
                  <button className="hover:bg-white/20 rounded-full p-0.5 transition-colors">
                    <span className="material-symbols-outlined text-sm block">close</span>
                  </button>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6D1F] text-[#FAF3E1] text-sm font-medium">
                  Beginner
                  <button className="hover:bg-white/20 rounded-full p-0.5 transition-colors">
                    <span className="material-symbols-outlined text-sm block">close</span>
                  </button>
                </div>
                <button className="text-sm text-[#FF6D1F] hover:text-[#FF6D1F]/80 font-medium px-2 py-1 underline">Clear All</button>
              </div>

              {/* cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>

              {/* pagination */}
              <div className="flex justify-center mt-12 mb-8">
                <button className="bg-[#F5E7C6] hover:bg-[#FF6D1F] hover:text-white text-[#222222] font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 group">
                  Load More Courses
                  <span className="material-symbols-outlined group-hover:translate-y-0.5 transition-transform">expand_more</span>
                </button>
              </div>
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
            <p className="text-[#a16545] text-sm">© 2023 E-Learning Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}