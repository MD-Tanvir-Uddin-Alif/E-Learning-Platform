// src/About.jsx
import React from 'react';

const About = () => (
  <>
    {/* ------ fonts ------ */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

    {/* gradient background */}
    <div className="min-h-screen bg-gradient-to-b from-[#FAF3E1] to-[#F5E7C6] text-[#222222] font-['Lexend']">
      {/* HERO */}
      <section className="relative px-6 lg:px-8 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">We help you forge new skills</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-[#222222]/80">
            Unlock your potential with expert-led courses designed to help you grow. We are building a community where learning never stops.
          </p>
          <div className="pt-4">
            <button className="bg-[#FF6D1F] text-[#FAF3E1] text-base font-bold px-8 py-3 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Join Our Community
            </button>
          </div>
        </div>
        {/* decorative blurs */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-32 h-32 bg-[#FF6D1F]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/40 rounded-full blur-3xl -z-10" />
      </section>

      {/* CORE PRINCIPLES */}
      <section className="relative px-6 lg:px-8 -mt-20 mb-24 z-10">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5 ring-1 ring-black/5">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Core Principles</h2>
            <p className="text-lg text-[#222222]/70">Driven by a passion for education and a commitment to excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'flag', title: 'Our Mission', text: 'To democratize education for everyone, everywhere, regardless of their background.' },
              { icon: 'visibility', title: 'Our Vision', text: 'A world where learning never stops and knowledge is accessible to all.' },
              { icon: 'favorite', title: 'Our Values', text: 'Integrity, Quality, and Community are the pillars of our platform.' },
            ].map((c) => (
              <div key={c.title} className="flex flex-col gap-4 rounded-2xl bg-[#F5E7C6] p-8 transition-transform hover:-translate-y-1 duration-300">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/50 text-[#FF6D1F]">
                  <span className="material-symbols-outlined text-3xl">{c.icon}</span>
                </div>
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="text-[#222222]/80 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="w-full bg-[#F5E7C6] py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#FF6D1F]/10">
            {[
              { num: '50k+', label: 'Students Enrolled' },
              { num: '100+', label: 'Expert Instructors' },
              { num: '10k+', label: 'Courses Done' },
              { num: '4.9', label: 'Average Rating' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="text-[#FF6D1F] text-4xl md:text-5xl font-bold tracking-tight">{s.num}</span>
                <span className="text-[#222222] font-medium text-lg">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-[32px] font-bold mb-4">How It Works</h2>
            <p className="text-lg text-[#222222]/70 max-w-2xl mx-auto">Get started with our platform in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: 1, title: 'Sign Up', text: 'Create your free account to access our introductory courses and community features instantly.' },
              { step: 2, title: 'Start Learning', text: 'Enroll in expert-led courses, watch video lessons, and complete interactive assignments.' },
              { step: 3, title: 'Achieve Goals', text: 'Track your progress, earn certificates, and advance your career with new skills.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-[20px] p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#FF6D1F] text-[#FAF3E1] rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-[#222222]/70 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-lg text-[#222222]/70 mt-2">How we grew from a small idea to a global community.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-[#FF6D1F]/30" />
            <div className="flex flex-col gap-12">
              {[
                { year: '2018', title: 'The Beginning', text: 'Founded with a simple mission: make coding accessible to everyone.', side: 'left' },
                { year: '2020', title: 'Global Expansion', text: 'Reached 100 countries and launched our mentorship program.', side: 'right' },
                { year: '2022', title: 'Accreditation', text: 'Partnered with top universities to offer accredited certificates.', side: 'left' },
                { year: 'Today', title: 'A Thriving Community', text: 'Over 50,000 students learning new skills every single day.', side: 'right' },
              ].map((e) => (
                <div key={e.year} className="relative flex items-center justify-between w-full">
                  {/* LEFT column: content on "left" side, hidden spacer on "right" side */}
                  <div className={`w-[45%] ${e.side === 'left' ? 'pr-8 text-right' : 'hidden md:block'}`}>
                    {e.side === 'left' && (
                      <div className="bg-[#FAF3E1] border border-[#F5E7C6] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-[#FF6D1F] font-bold text-lg block mb-1">{e.year}</span>
                        <h3 className="font-bold text-lg mb-2">{e.title}</h3>
                        <p className="text-sm text-[#222222]/80">{e.text}</p>
                      </div>
                    )}
                  </div>

                  {/* centre dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FF6D1F] border-4 border-[#FAF3E1] shadow-sm z-10" />

                  {/* RIGHT column: content on "right" side, hidden spacer on "left" side */}
                  <div className={`w-[45%] ${e.side === 'right' ? 'pl-8 text-left' : 'hidden md:block'}`}>
                    {e.side === 'right' && (
                      <div className="bg-[#FAF3E1] border border-[#F5E7C6] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-[#FF6D1F] font-bold text-lg block mb-1">{e.year}</span>
                        <h3 className="font-bold text-lg mb-2">{e.title}</h3>
                        <p className="text-sm text-[#222222]/80">{e.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="bg-[#FF6D1F] pt-16 pb-12 px-6 lg:px-8 rounded-t-[32px] mt-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-[#FAF3E1] text-3xl md:text-4xl font-bold">Ready to start learning?</h2>
          <p className="text-[#FAF3E1]/90 text-lg max-w-xl">Join thousands of students and start your journey towards mastering new skills today.</p>
          <button className="bg-[#FAF3E1] text-[#FF6D1F] text-base font-bold px-8 py-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white">
            Get Started Free
          </button>
          <div className="flex items-center gap-8 mt-8 border-t border-[#FAF3E1]/20 pt-8 w-full justify-center">
            <a className="text-[#FAF3E1]/80 hover:text-white text-sm font-medium transition-colors" href="#">Privacy Policy</a>
            <a className="text-[#FAF3E1]/80 hover:text-white text-sm font-medium transition-colors" href="#">Terms of Service</a>
            <a className="text-[#FAF3E1]/80 hover:text-white text-sm font-medium transition-colors" href="#">Support</a>
          </div>
          {/* <p className="text-[#FAF3E1]/60 text-xs">© 2024 EduForge Inc. All rights reserved.</p> */}
        </div>
      </footer>
    </div>
  </>
);

export default About;