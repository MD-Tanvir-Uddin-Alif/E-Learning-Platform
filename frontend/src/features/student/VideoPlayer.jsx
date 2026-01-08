import React from 'react';

export default function VideoPlayer() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* ----------  TOP NAV  ---------- */}
      <header
        className="shrink-0 z-20 border-b px-6 py-3 flex items-center justify-between"
        style={{ backgroundColor: '#FAF3E1', borderColor: '#F5E7C7' }}
      >
        <div className="flex items-center gap-4" style={{ color: '#222222' }}>
          <div className="size-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#ff6d1f' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>school</span>
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight tracking-tight" style={{ color: '#222222' }}>UX Design Mastery</h2>
            <p className="text-xs" style={{ color: 'rgba(34,34,34,.6)' }}>Module 2: The Process</p>
          </div>
        </div>

        {/* Global Progress */}
        <div className="hidden md:flex flex-col gap-1 w-1/3 max-w-md">
          <div className="flex justify-between text-xs font-medium" style={{ color: 'rgba(34,34,34,.7)' }}>
            <span>Course Progress</span>
            <span>35%</span>
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#F5E7C7' }}>
            <div className="h-full rounded-full" style={{ width: '35%', backgroundColor: '#ff6d1f' }} />
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <button
            className="h-10 px-4 flex items-center gap-2 rounded-lg text-white font-bold hover:bg-opacity-90 transition"
            style={{ backgroundColor: '#ff6d1f' }}
          >
            <div className="size-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,.2)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>
            </div>
            <span className="text-sm">My Profile</span>
          </button>
        </div>
      </header>

      {/* ----------  CONTENT AREA  ---------- */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT: Video & Actions */}
        <main
          className="flex-1 flex flex-col overflow-y-auto p-6 lg:p-8 scroll-smooth"
          style={{ backgroundColor: '#FAF3E1' }}
        >
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg group">
              {/* Poster */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAI9tx7WOaqBsSEXIwYQMbd0m0tKplu949lb-iuppYV3g7c0d5YXqo8uq5dYSBpCHeWK-Pk3j_Erz9WVPEw0Od-7HQvIN8qSXc2RmCPOrIL06TMS56KKzHKRXzgSTH83CdReiGkVf6pAGgJydAwMmybNhx_v0RMS8XiQg5in4bLA5wbwk2ShiJt0lhisutSaksst1zP_CfgzEy57U3WOWonALGhhRkBRrYj6xv5p6dKh-uLm4pCG-qyTFXIG2Qqc__owere8j1Zjuw')",
                  opacity: 0.8,
                }}
              />

              {/* Big Play */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <button className="size-20 rounded-full text-white flex items-center justify-center hover:scale-105 transition shadow-xl pl-1" style={{ backgroundColor: '#ff6d1f' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 48 }}>play_arrow</span>
                </button>
              </div>

              {/* Control Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 pb-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.8), transparent)' }}>
                {/* Progress */}
                <div className="group/slider relative h-1.5 rounded-full cursor-pointer mb-4 hover:h-2 transition-all" style={{ backgroundColor: 'rgba(255,255,255,.3)' }}>
                  <div className="absolute h-full rounded-full" style={{ width: '35%', backgroundColor: '#ff6d1f' }} />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[35%] size-3 bg-white rounded-full shadow scale-0 group-hover/slider:scale-100 transition-transform" />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button className="hover:text-primary transition">
                      <span className="material-symbols-outlined">play_arrow</span>
                    </button>
                    <button className="hover:text-primary transition">
                      <span className="material-symbols-outlined">volume_up</span>
                    </button>
                    <div className="text-sm font-medium">
                      <span>04:20</span> <span className="opacity-50 mx-1">/</span> <span className="opacity-70">12:45</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="hover:text-primary transition flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,.1)' }}>
                      1x
                    </button>
                    <button className="hover:text-primary transition">
                      <span className="material-symbols-outlined">closed_caption</span>
                    </button>
                    <button className="hover:text-primary transition">
                      <span className="material-symbols-outlined">settings</span>
                    </button>
                    <button className="hover:text-primary transition">
                      <span className="material-symbols-outlined">fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#222222' }}>Lesson 2: The Double Diamond Model</h1>
                <p className="leading-relaxed max-w-2xl" style={{ color: 'rgba(34,34,34,.7)' }}>
                  In this lesson, we explore the divergent and convergent stages of the design thinking process. Understanding how to broaden your scope before narrowing down solutions is key to effective UX.
                </p>
              </div>

              {/* Action Panel */}
              <div className="flex flex-col gap-4 min-w-[280px]">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="flex items-center justify-center gap-2 h-10 rounded-lg font-semibold text-sm hover:bg-[#e0d2b4] transition"
                    style={{ backgroundColor: '#F5E7C7', color: '#222222' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                    Prev
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 h-10 rounded-lg font-semibold text-sm hover:bg-[#e0d2b4] transition"
                    style={{ backgroundColor: '#F5E7C7', color: '#222222' }}
                  >
                    Next
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ----------  RIGHT SIDEBAR  ---------- */}
        <aside
          className="w-80 border-l flex flex-col shrink-0 hidden lg:flex"
          style={{ backgroundColor: '#FAF3E1', borderColor: '#F5E7C7' }}
        >
          <div className="p-5 border-b" style={{ borderColor: '#F5E7C7' }}>
            <h3 className="font-bold text-lg" style={{ color: '#222222' }}>Course Content</h3>
            <p className="text-xs mt-1" style={{ color: 'rgba(34,34,34,.6)' }}>2/8 Lessons Completed</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            {/* Module 1 */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(34,34,34,.5)' }}>
                Module 1: Introduction
              </h4>

              {/* Lesson 1 (Completed) */}
              <div className="flex gap-3 p-3 rounded-lg hover:bg-[#F5E7C7]/30 transition cursor-pointer group opacity-60">
                <div className="mt-0.5">
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#ff6d1f' }}>check_circle</span>
                </div>
                <div>
                  <p className="text-sm font-bold line-through decoration-[rgba(34,34,34,.5)] group-hover:no-underline" style={{ color: '#222222' }}>
                    What is UX Design?
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(34,34,34,.5)' }}>5:30 • Video</p>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(34,34,34,.5)' }}>
                Module 2: The Process
              </h4>

              {/* Lesson 2 (Active) */}
              <div
                className="relative flex gap-3 p-3 rounded-lg cursor-pointer shadow-sm border-l-4"
                style={{ backgroundColor: 'rgba(245,231,199,.4)', borderColor: '#ff6d1f' }}
              >
                <div className="mt-0.5">
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#ff6d1f' }}>play_circle</span>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#222222' }}>The Double Diamond Model</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(34,34,34,.5)' }}>12:45 • Video</p>
                </div>
              </div>

              {/* Lesson 3 */}
              <div className="flex gap-3 p-3 rounded-lg hover:bg-[#F5E7C7]/30 transition cursor-pointer group">
                <div className="mt-0.5">
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'rgba(34,34,34,.4)' }}>lock</span>
                </div>
                <div>
                  <p className="text-sm font-medium group-hover:text-primary transition" style={{ color: '#222222' }}>
                    User Research Basics
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(34,34,34,.5)' }}>8:15 • Video</p>
                </div>
              </div>

              {/* Lesson 4 */}
              <div className="flex gap-3 p-3 rounded-lg hover:bg-[#F5E7C7]/30 transition cursor-pointer group">
                <div className="mt-0.5">
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'rgba(34,34,34,.4)' }}>lock</span>
                </div>
                <div>
                  <p className="text-sm font-medium group-hover:text-primary transition" style={{ color: '#222222' }}>
                    Creating Personas
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(34,34,34,.5)' }}>10:00 • Video</p>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(34,34,34,.5)' }}>
                Module 3: Design
              </h4>

              {/* Lesson 5 */}
              <div className="flex gap-3 p-3 rounded-lg hover:bg-[#F5E7C7]/30 transition cursor-pointer group">
                <div className="mt-0.5">
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'rgba(34,34,34,.4)' }}>lock</span>
                </div>
                <div>
                  <p className="text-sm font-medium group-hover:text-primary transition" style={{ color: '#222222' }}>
                    Wireframing Tools
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(34,34,34,.5)' }}>15:20 • Video</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ----------  NOTES PANEL (HIDDEN)  ---------- */}
      <div
        id="notes-panel"
        className="hidden fixed top-[65px] bottom-0 right-0 w-80 shadow-2xl z-30 flex-col border-l"
        style={{ backgroundColor: '#FAF3E1', borderColor: '#F5E7C7' }}
      >
        <div className="p-5 border-b flex justify-between items-center" style={{ borderColor: '#F5E7C7' }}>
          <h3 className="font-bold text-lg flex items-center gap-2" style={{ color: '#222222' }}>
            <span className="material-symbols-outlined">edit_note</span> My Notes
          </h3>
          <button className="hover:text-text-dark" style={{ color: 'rgba(34,34,34,.5)' }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="p-3 rounded shadow-sm border mb-3" style={{ backgroundColor: '#ffffff', borderColor: '#F5E7C7' }}>
            <div className="flex justify-between items-center mb-1">
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: 'rgba(255,109,31,.1)', color: '#ff6d1f' }}
              >
                02:15
              </span>
              <span className="text-xs" style={{ color: 'rgba(34,34,34,.4)' }}>Just now</span>
            </div>
            <p className="text-sm" style={{ color: '#222222' }}>Don't forget the convergent phase!</p>
          </div>
          <textarea
            className="w-full h-32 p-3 text-sm border rounded-lg resize-none focus:outline-none"
            style={{ backgroundColor: '#ffffff', borderColor: '#F5E7C7', color: '#222222' }}
            placeholder="Type your note here..."
          />
          <button
            className="w-full mt-3 py-2 font-bold rounded-lg text-sm hover:bg-opacity-90"
            style={{ backgroundColor: '#ff6d1f', color: '#ffffff' }}
          >
            Save Note
          </button>
        </div>
      </div>

      {/* ----------  COMPLETION MODAL (HIDDEN)  ---------- */}
      <div
        id="completion-modal"
        className="hidden fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0,0,0,.6)' }}
      >
        <div
          className="p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center relative overflow-hidden border"
          style={{ backgroundColor: '#FAF3E1', borderColor: '#F5E7C7' }}
        >
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(255,109,31,.1)' }} />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(255,109,31,.1)' }} />
          <div className="mx-auto size-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(255,109,31,.1)', color: '#ff6d1f' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 32 }}>celebration</span>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#222222' }}>Lesson Completed!</h2>
          <p className="mb-6" style={{ color: 'rgba(34,34,34,.7)' }}>
            Great job! You've finished "The Double Diamond Model". Ready for the next challenge?
          </p>
          <div className="flex flex-col gap-3">
            <button
              className="w-full py-3 font-bold rounded-lg text-sm hover:scale-[1.02] transition shadow-lg"
              style={{ backgroundColor: '#ff6d1f', color: '#ffffff', boxShadow: '0 10px 15px -3px rgba(255,109,31,.2)' }}
            >
              Play Next Lesson
            </button>
            <button
              className="w-full py-3 font-medium text-sm rounded-lg hover:bg-[#F5E7C7]/50 transition"
              style={{ backgroundColor: 'transparent', color: '#222222' }}
            >
              Stay Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}