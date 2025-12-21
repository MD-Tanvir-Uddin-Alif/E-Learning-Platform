import React from 'react'

const Home = () => {
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
          <button className="rounded-full bg-[#F5E7C6] px-6 py-2.5 text-sm font-semibold text-[#222222] transition-all hover:bg-[#FF6D1F] hover:text-white">Development</button>
          <button className="rounded-full bg-[#F5E7C6] px-6 py-2.5 text-sm font-semibold text-[#222222] transition-all hover:bg-[#FF6D1F] hover:text-white">Design</button>
          <button className="rounded-full bg-[#F5E7C6] px-6 py-2.5 text-sm font-semibold text-[#222222] transition-all hover:bg-[#FF6D1F] hover:text-white">Business</button>
          <button className="rounded-full bg-[#F5E7C6] px-6 py-2.5 text-sm font-semibold text-[#222222] transition-all hover:bg-[#FF6D1F] hover:text-white">Marketing</button>
          <button className="rounded-full bg-[#F5E7C6] px-6 py-2.5 text-sm font-semibold text-[#222222] transition-all hover:bg-[#FF6D1F] hover:text-white">Photography</button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Course Card 1 */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#FAF3E1] border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6D1F]/30 hover:shadow-lg hover:shadow-[#FF6D1F]/10">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7lwfetIVcrtDNkI8uBzv8hfC-XFfyPYVSPazlfD4L9RPwCSf4M99TFk5RcCug138lU5ZPn7yYioXVr37NfhE4H6kItCY6FH_gS5QQcygMrNFjCSBmkIVr-A2wqkFxXmiv3CUNNwMqAKclkKCgJNTHgJw9FTQlkLW3fVin_8j7PF_N8tGRHrkDtElAm6D6_AAtKs4x2X7TfNpFgpa0zaPj0lW6hhP4ccoqifl_v2N32FlEFFUS-OGt2Yplobd5yaSPuOMSX6yfR1g" alt="Course" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-[#FF6D1F] px-6 py-2 text-sm font-bold text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Start Learning</button>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6D1F] shadow-sm">Development</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="text-xs font-bold">4.8</span>
                  <span className="text-[10px] text-[#222222]/50">(1.2k)</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight group-hover:text-[#FF6D1F] transition-colors">Complete Python Bootcamp: From Zero to Hero</h3>
              <div className="mt-4 flex items-center gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4J1ubXCuGsBm-7ZewMVx84OlyNmoOJDLovy8elku27w_STPp8QhaUgmBnraw5_OxTylXjEywEAMW-V2yrF18cqXKRuyPyJDUEFNzC5s6F7I8gIwTe3UZnuD9TPEyT1JJEcau5lpjjN12nDYnF4rQGB-bCwzi0om-uCTjlTIi1YM8RCD5bpKAMOVoToiS5T738ZN8zTsfA5HzMPId2XI9UfOEQMhNO1ZlpiVjayfTAz48KC21vNQCa0CpWPwPC4VAbtZ7VvN41308" alt="Instructor" className="h-6 w-6 rounded-full" />
                <span className="text-xs font-medium text-[#222222]/70">Jose Portilla</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222222]/5">
                <span className="text-lg font-bold">$19.99</span>
                <span className="text-xs font-medium text-[#222222]/50 line-through">$84.99</span>
              </div>
            </div>
          </div>

          {/* Course Card 2 */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#FAF3E1] border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6D1F]/30 hover:shadow-lg hover:shadow-[#FF6D1F]/10">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsKmecf68D8wkxwXKTz5VFqNSRezaKjJn_gvAzMI0b-CClLTY3Dp-AIp0utDejAddYS4DqJz1GX4EM2fQ-mnuvrg-7Ov4hfP1JrtgAc1ZSRYjPezWDgMMo1Q5kcdW4pBq6UE2ucoqHJywnlDHajEjWyI8Z1KF-LIX3jvLSNdkdY0fpmGD06Zsig8UY2Gntj0VXSrmZK3pEDp956xVyq4MYWxtTv9OwTTYOpG605pGyLxtrvCXd2A_3eE2iOW_EN3YEtDPi7UOn54Y" alt="Course" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-[#FF6D1F] px-6 py-2 text-sm font-bold text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Start Learning</button>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6D1F] shadow-sm">Design</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="text-xs font-bold">4.9</span>
                  <span className="text-[10px] text-[#222222]/50">(850)</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight group-hover:text-[#FF6D1F] transition-colors">UI/UX Design Masterclass: Adobe XD & Figma</h3>
              <div className="mt-4 flex items-center gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJmZVii2rtDemSflr5tM3lmaJKSYP1ij-62V6BEQ7zxHrQrRRjsO66Pw6TTABW6skzTbc7zb07nL4MoWVOL_a-EeraqptYIvdVyj2h4ZgpXz3SGYvRm1vgPjghDmv3kQmn9Rd4uazp2QtERLaWXHL-BjI_I-3Gp9hg7MuQp4SK01OlmSGtG0jV3DHKzuyargNV82v0UQj2A2nGPvEavSkTZ9PrvSiim7j1nH4K0y400IhCVWdQCK2Q5kdlp9CUtBNwhbN7mp6jU7A" alt="Instructor" className="h-6 w-6 rounded-full" />
                <span className="text-xs font-medium text-[#222222]/70">Andrei Neagoie</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222222]/5">
                <span className="text-lg font-bold">$24.99</span>
                <span className="text-xs font-medium text-[#222222]/50 line-through">$99.99</span>
              </div>
            </div>
          </div>

          {/* Course Card 3 */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#FAF3E1] border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6D1F]/30 hover:shadow-lg hover:shadow-[#FF6D1F]/10">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxD1Qtcvvsxx_sbFNpJOdgvZtTOQ-Pa44gwDyzsO9NOO8QPoCOb7iXr5DpARLXPsQrIgPLShW_NPgJaph-LwdszKdk4lfGJZd7hTKIyevWKcmPii3PtF5STVjKButed8W1rQAGjUgQoOyzj37DK-OmICeWPrrrYMDBj7Hb2EjOwFle2jCEFPHhMF7a2RyQVDvCb1ZiCQtJdgXuR3e3zu6vvVoH2G-3gKMu9KxI_SjqTnOIm8NKIptqAYrdnQafCGAArJBol7Pnhbo" alt="Course" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-[#FF6D1F] px-6 py-2 text-sm font-bold text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Start Learning</button>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6D1F] shadow-sm">Business</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="text-xs font-bold">4.7</span>
                  <span className="text-[10px] text-[#222222]/50">(2.4k)</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight group-hover:text-[#FF6D1F] transition-colors">MBA in a Box: Business Lessons from a CEO</h3>
              <div className="mt-4 flex items-center gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNrlYo6cc5syRRULgfzy-TO-ZW4zjMPbvh0kttCYoLE8-zkcwIbY1FG3Anf7YOymHuTnzQtP8Gwa791emg7-n5nnz1xvYy-oIKWA5Hdu-DdTVj9mShwKTNAfikQzlW7_HhZcWdm2As22d0fdgBijtTj_rwp46n5cpLn-56FV_BuNH1ixNJjlKtlOG4hkPK8ecpooepeGBMSB_YChfuf29jCAWLw3X730ZpCLyNNRo9BgOmH1Ji9gXRmFQB2GqwyKWfR_YIWOd48J4" alt="Instructor" className="h-6 w-6 rounded-full" />
                <span className="text-xs font-medium text-[#222222]/70">Chris Haroun</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222222]/5">
                <span className="text-lg font-bold">$14.99</span>
                <span className="text-xs font-medium text-[#222222]/50 line-through">$49.99</span>
              </div>
            </div>
          </div>

          {/* Course Card 4 */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#FAF3E1] border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6D1F]/30 hover:shadow-lg hover:shadow-[#FF6D1F]/10">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX2ACBecgmqnCGlOQRTp_iTdxdoON_Um-Nwmlss7abjOBKiHXvgQns4JX-dUNIRhul6OPCXQA_CGIH2HF-ASpEzLM-xIK9ThH6N8Y3viqskIwBrfzgr94MhQ7fZ1UUAOgp1CWKZpRfFgSQtYaRSK8NhUHFNYCDvE2H5tIwgcXzcGa24-C0CTbMeE8ysjIk1T-ot5qmDYmfR9eO1rg_2JKcLkvllHI6QZBOj0dWg9_o4XrJIionESvAahFEHZ4ZFncVa5gkKlClBOU" alt="Course" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-[#FF6D1F] px-6 py-2 text-sm font-bold text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Start Learning</button>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6D1F] shadow-sm">Marketing</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="text-xs font-bold">4.6</span>
                  <span className="text-[10px] text-[#222222]/50">(500)</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight group-hover:text-[#FF6D1F] transition-colors">Digital Marketing Masterclass: 23 Courses in 1</h3>
              <div className="mt-4 flex items-center gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJre23LvVy6zJutejrnHRyzlpNj6QsckZ02djzRyAw4rfSEdGUmqWK56zUJTmeM14R7WWk7bzi2iPiCwihlOCETu54Orx3F1IMszafcgUvYBYuQBzbugh0sBbJ9PIQ5so9XmjpPOfNszecScw-eCPDiDvQDZK5qvS776dbV1JmLBLlM1aAnPmIZyV2WPFBcxWl8mFpNYjI642qrEqoCMrEKKxwBelwN0aMl38m6uKamdiBiO8_Wtegsn6R7fMNEsc_v3qkmPwsPZA" alt="Instructor" className="h-6 w-6 rounded-full" />
                <span className="text-xs font-medium text-[#222222]/70">Phil Ebiner</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222222]/5">
                <span className="text-lg font-bold">$18.99</span>
                <span className="text-xs font-medium text-[#222222]/50 line-through">$79.99</span>
              </div>
            </div>
          </div>

          {/* Course Card 5 */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#FAF3E1] border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6D1F]/30 hover:shadow-lg hover:shadow-[#FF6D1F]/10">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrmnZdG0FH8WMiyuuclz50vGo7tbNjt8FaK8KVzOJVScD5lz_pFucUebi9ojmJEmAlCNwKZWQgZ04hpkQkyLK1I-whqNLRWIAxMCrLU1BdwQTQyre6ZyaRgE8QTE3NqC2Ez-HFyojfWkJUpv4kUHk3HOkbPcYqbDzgDkeZqvQByvlES9HsOPdnzxBVkTi58i63bTulpjs0F2RuK8R-blONV1ufJdj2CTB29omT5tAXwRq7qe5_2zGEoBVGpJeBD1_6KuY988tsM30" alt="Course" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-[#FF6D1F] px-6 py-2 text-sm font-bold text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Start Learning</button>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6D1F] shadow-sm">Audio</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="text-xs font-bold">4.9</span>
                  <span className="text-[10px] text-[#222222]/50">(320)</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight group-hover:text-[#FF6D1F] transition-colors">Music Production in Logic Pro X</h3>
              <div className="mt-4 flex items-center gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg0rDgT68EKnsgBOq-4DE7B1obXQuClw852U4lEXQaGtOLBwHFalhQzr2adXTenaDWGOHK6LvSM5q3AbM5UQ9Ozti196OzNQBOI6dPgAnE9-QQ_ceQx1bGPXEXMNarmu8lqMkawLaMg3XAJkI3ggiUi9bRAvs93omCGHLrbp6zIpLcZw_XDglP9aU-ZlEy9MDubgneTDtm69hm69AcuXlo5NVXBhVTAXkrM4OempCt0ztnYuP6w0TccP76x41Ft3zmIzQp5kQCHnM" alt="Instructor" className="h-6 w-6 rounded-full" />
                <span className="text-xs font-medium text-[#222222]/70">Tomas George</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222222]/5">
                <span className="text-lg font-bold">$22.99</span>
                <span className="text-xs font-medium text-[#222222]/50 line-through">$89.99</span>
              </div>
            </div>
          </div>

          {/* Course Card 6 */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#FAF3E1] border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6D1F]/30 hover:shadow-lg hover:shadow-[#FF6D1F]/10">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHRIPvw_r14vQjqANkQGYCMDHRflHeyrpbyi1WhtRMxO6IdrZpNRVT1E-IL0CIYTSEwbEseeOKHRse9Xlk1yz7W5cmK-BdYegs2CxNM0g3ux_z1Twidvahiff6FJOwekV76nTwfb46F3pbh7m_97DEt1cBcnpin5wzRlNVPblHAZxUJiU2d-JeRA68nGdV0L91Q6w34StRhYVVl2SFvgjoqC51jObjUrMymT46VUwSQ_2oltAeOrY7uEsWa3mWLDtH44pG4FrS90Y" alt="Course" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-[#FF6D1F] px-6 py-2 text-sm font-bold text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Start Learning</button>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6D1F] shadow-sm">Web Dev</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="text-xs font-bold">4.7</span>
                  <span className="text-[10px] text-[#222222]/50">(900)</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight group-hover:text-[#FF6D1F] transition-colors">The Web Developer Bootcamp 2024</h3>
              <div className="mt-4 flex items-center gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc3LiypYN7fGA3DjG2BJMKS4zZWHiWeEX5u3I8OnnCxTTARS6eXKLz1zfw_f92KyH-QHZBsvUllIjOMS8lymdubDJWSBpSeuM4Oop5x-bSpQ_jYJWCLiaWWb3znlUf4gNsbVF9_TpTz97_ugG7C0h2POOwk4ARgtY9J9i6hAdQ2RHprPLNcBoGe2q5mibqN-W-WxhBTmYHFytIB8J8i8IUCP5eL4usSkrk6usRsJ5543FCah5JfqjO1KAmSYv2ybhuxgTZDVHjGF0" alt="Instructor" className="h-6 w-6 rounded-full" />
                <span className="text-xs font-medium text-[#222222]/70">Colt Steele</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222222]/5">
                <span className="text-lg font-bold">$21.99</span>
                <span className="text-xs font-medium text-[#222222]/50 line-through">$94.99</span>
              </div>
            </div>
          </div>

          {/* Course Card 7 */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#FAF3E1] border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6D1F]/30 hover:shadow-lg hover:shadow-[#FF6D1F]/10">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVcQfNOwpgw4S9fjAmG9bTmlHcWCtHXuqWqcZMyXDSJpM1xTkUwEbXlyz8mdxGBJHEDifwVhevwDc0WzmUlk_2227VEOjmGLatkBCAwLTKklXuzP5JDoRKuvQRwX8nElSISbBTNnzWv1RSQeRChwv0rlqVnXsrazP0g_ZE43o5PsPBckERcTiVSaPkkfi34oyy3X0W2c-EJh7uOQotlt4SIuwLZ35G3mwrAvytxYcSewnfj7g8gkkvqphhBzcSWZ0kjGsX3to-HWQ" alt="Course" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-[#FF6D1F] px-6 py-2 text-sm font-bold text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Start Learning</button>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6D1F] shadow-sm">Health</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="text-xs font-bold">4.8</span>
                  <span className="text-[10px] text-[#222222]/50">(450)</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight group-hover:text-[#FF6D1F] transition-colors">Nutrition and Health Coaching Certification</h3>
              <div className="mt-4 flex items-center gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXU97nyrSo8AbNLJkKwSXIObpq6KX52YDOR-6oL14Loh-R9YOv8RURh3DP1i4lv_baD0ehJ3A86plD5JHuCx-vpC-2j8rydhY-Cg3riA_WLLPwkTnQ2ic3WpdX4RLTj3U0IWOXMF3pSgPq0vMTzoji-8obRjDfK7lfOJMMfemJVOS8XKQFataA_fiy68RJoA0mgOppMxMpDBNXT743-sA4OGWD5pgDJSlU26s1atSTM-7qOBvGKFCjU1epfF43WBv6ZvnckmCidAw" alt="Instructor" className="h-6 w-6 rounded-full" />
                <span className="text-xs font-medium text-[#222222]/70">Felix Harder</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222222]/5">
                <span className="text-lg font-bold">$16.99</span>
                <span className="text-xs font-medium text-[#222222]/50 line-through">$69.99</span>
              </div>
            </div>
          </div>

          {/* Course Card 8 */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#FAF3E1] border border-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6D1F]/30 hover:shadow-lg hover:shadow-[#FF6D1F]/10">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4_3C1201a-jskL7nNOy-m_LV0v3zukjnX8GIgoBhOVoaY2pdgjE7Jup6iF3R6kQo4pY4RynDo2N2FnheawSPsZzF4tZD5Y9owIgQgXiFJoO_k7MSutgcJU46E5n-bnhx_uoqIge-wT9blZisJkHoCXyayQTSgEjTEQiIYroWNvNIez_nn2JJYh6mjshOqSb6lGZfHeeY6mnpb8FjZtCQWeciUkf2u5JC8eCrRYQcwHwTpsbW1PRUvutmSp914D4ZHhM4-BrAHtNs" alt="Course" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-[#FF6D1F] px-6 py-2 text-sm font-bold text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Start Learning</button>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6D1F] shadow-sm">Marketing</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="text-xs font-bold">4.5</span>
                  <span className="text-[10px] text-[#222222]/50">(300)</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight group-hover:text-[#FF6D1F] transition-colors">Social Media Marketing Mastery 2024</h3>
              <div className="mt-4 flex items-center gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA63DUQ4l3yNU5OCSrXEW-bVxMIdwykXtlQvq9-iXsqn4BGMDvZRH4QMllnkwNVawvbtiag_Ez-puihpQ70dqyX2WVGgsAzYQZYhAWIx4D_iKHoHET-I1mYwUxQJAYfH_ZL1-rT8JyC-e8EuSJZEZ8csLzo0wAiuPQo0GaEHnc0NbgsqlBvlUJIlKN8YbtM0mbijbd8-WuCrSepei3Qru7eyuTI8OmZX5944E7wP-94uicQFNSpPWSsv6HVPORufvWepYZZuKBn89Y" alt="Instructor" className="h-6 w-6 rounded-full" />
                <span className="text-xs font-medium text-[#222222]/70">Coursenvy</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222222]/5">
                <span className="text-lg font-bold">$25.99</span>
                <span className="text-xs font-medium text-[#222222]/50 line-through">$99.99</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="flex items-center gap-2 rounded-full border-2 border-[#FF6D1F] bg-transparent px-8 py-3 text-sm font-bold text-[#FF6D1F] transition-all hover:bg-[#FF6D1F] hover:text-white">
            View All Courses
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default Home