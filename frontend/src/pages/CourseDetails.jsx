import React from 'react';

export default function CourseDetail() {
  return (
    <>
      {/* ------------------  HERO  ------------------ */}
      <div className="py-12" style={{ backgroundColor: '#F5E7C6' }}>
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[2fr_1fr]">
          {/* left */}
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ring-1"
                style={{ backgroundColor: 'rgba(255,109,31,.1)', color: '#FF6D1F', borderColor: 'rgba(255,109,31,.2)' }}
              >
                Bestseller
              </span>
              <span className="text-sm font-medium text-gray-600">Last updated November 2023</span>
            </div>

            <h1 className="text-4xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl" style={{ color: '#222222' }}>
              Master Web Design in 30 Days: From Zero to Hero
            </h1>

            <p className="text-lg leading-relaxed text-gray-700 md:w-5/6">
              Learn UI/UX design from scratch with industry experts. Over 30 hours of video content covering Figma, prototyping, and design systems.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-1" style={{ color: '#FF6D1F' }}>
                <span className="text-lg font-bold">4.8</span>
                <div className="flex items-center">
                  <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[18px]">star_half</span>
                </div>
                <span className="ml-1 text-gray-600 underline decoration-gray-400 decoration-dotted underline-offset-2">(2,453 ratings)</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <span className="material-symbols-outlined text-[20px]">group</span>
                <span>12,890 Students</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <span className="material-symbols-outlined text-[20px]">language</span>
                <span>English</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <img
                alt="Jane Doe"
                className="size-10 rounded-full border-2 border-white shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJr2GSjQsOTgYeKmp3DiSZVO2YdUkJqYQtTlqqsx_SeCYAxtRw-3l3Md6FoNWYYdQWwD0CvGiQuLpACQvbHBhs51i7Kt_5M3upbxiMz6zyjTzh-z5Hf9WYQdAz-Defe9T01bvX7LXgZynoTWenX4OJcigJuMTeSWBHVkAqgVcIOkNZV4TccV26ZPkHxDGqsxKQJB26Y2TzwJSN6vP6NsDAOERb11yrtLz-eSDZcbGUD3pkLuEn0nExeNJsx2oGFgg6P8qAn_a_WDc"
              />
              <div>
                <p className="text-xs text-gray-500">Created by</p>
                <a className="font-bold hover:underline decoration-2 underline-offset-2" style={{ color: '#222222' }} href="#instructor">
                  Jane Doe
                </a>
              </div>
            </div>
          </div>

          {/* right (video preview) */}
          <div className="relative hidden lg:block cursor-pointer overflow-hidden rounded-xl shadow-2xl ring-4 ring-white/50 group">
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-all group-hover:bg-black/30">
              <div className="flex size-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-4xl ml-1" style={{ color: '#FF6D1F' }}>play_arrow</span>
              </div>
            </div>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwhVxy3DDI6S8gn9VNEz3x_gmbkMSl3d-M0ooml3Ia3Qag1h-NHQAgeth8YKPWNAKuj7_aGxH5rKt3M38c7A4SX4kGuTJ29hf1a-SfKraJGOcMhgnf7pXug9C3dtaxqHFoDzw2duAnOc76JlDObCd4ng6myqWpFz5TFc9MU81VM_CCXGf1NncspYvhI97ed3F6K5H2rtjlvI5QXitW-ax7FP0yqwlKzKnRY2AzzbtQaNsFMeiAzRL2dUN3BZ31AxKHyALGIbsQAB0')",
                minHeight: 300,
              }}
            />
          </div>
        </div>
      </div>

      {/* ------------------  CONTENT  ------------------ */}
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid gap-12 pt-8 lg:grid-cols-[2fr_1fr]">
          {/* left */}
          <div className="flex flex-col gap-10">
            {/* tabs */}
            <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-sm pt-2">
              <div className="flex border-b border-gray-200">
                <a
                  className="flex items-center gap-2 border-b-[3px] px-4 pb-3 pt-2 text-sm font-bold"
                  style={{ borderColor: '#FF6D1F', color: '#222222' }}
                  href="#curriculum"
                >
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  Curriculum
                </a>
                <a
                  className="flex items-center gap-2 border-b-[3px] border-transparent px-4 pb-3 pt-2 text-sm font-bold text-gray-500 hover:text-primary hover:border-primary/30 transition-all"
                  href="#reviews"
                >
                  <span className="material-symbols-outlined text-[20px]">star</span>
                  Reviews
                </a>
                <a
                  className="flex items-center gap-2 border-b-[3px] border-transparent px-4 pb-3 pt-2 text-sm font-bold text-gray-500 hover:text-primary hover:border-primary/30 transition-all"
                  href="#instructor"
                >
                  <span className="material-symbols-outlined text-[20px]">person</span>
                  Instructor
                </a>
              </div>
            </div>

            {/* what you will learn */}
            <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold" style={{ color: '#222222' }}>What you'll learn</h3>
              <div className="grid gap-x-4 gap-y-3 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 material-symbols-outlined text-[20px]" style={{ color: '#FF6D1F' }}>check</span>
                  <span className="text-sm text-gray-700">Build a complete design system from scratch</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 material-symbols-outlined text-[20px]" style={{ color: '#FF6D1F' }}>check</span>
                  <span className="text-sm text-gray-700">Master Figma auto-layout and components</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 material-symbols-outlined text-[20px]" style={{ color: '#FF6D1F' }}>check</span>
                  <span className="text-sm text-gray-700">Understand UX principles and accessibility</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 material-symbols-outlined text-[20px]" style={{ color: '#FF6D1F' }}>check</span>
                  <span className="text-sm text-gray-700">Create interactive high-fidelity prototypes</span>
                </div>
              </div>
            </section>

            {/* curriculum */}
            <section id="curriculum">
              <div className="mb-5 flex items-end justify-between">
                <h2 className="text-2xl font-bold" style={{ color: '#222222' }}>Course Content</h2>
                <p className="text-sm font-medium text-gray-500">12 Sections • 45 Lectures • 30h 15m total length</p>
              </div>
              <div className="flex flex-col gap-4">
                {/* module 1 */}
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="bg-gray-50 px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-400">expand_more</span>
                      <h4 className="font-bold" style={{ color: '#222222' }}>Module 1: Introduction to Web Design</h4>
                    </div>
                    <span className="text-xs font-medium text-gray-500">3 lectures • 45min</span>
                  </div>
                  <div className="bg-white">
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 hover:bg-[#faf3e1]/50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]" style={{ color: '#FF6D1F' }}>play_circle</span>
                        <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">Welcome to the course</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className="rounded px-2 py-0.5 text-[10px] font-bold uppercase"
                          style={{ backgroundColor: 'rgba(255,109,31,.1)', color: '#FF6D1F' }}
                        >
                          Preview
                        </span>
                        <span className="text-xs text-gray-500">05:20</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3" style={{ backgroundColor: '#FAF3E1' }}>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]" style={{ color: '#FF6D1F' }}>check_circle</span>
                        <span className="text-sm text-gray-700 font-medium">Setting up your workspace</span>
                      </div>
                      <span className="text-xs text-gray-500">12:45</span>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">lock</span>
                        <span className="text-sm text-gray-700">Design thinking principles</span>
                      </div>
                      <span className="text-xs text-gray-500">28:10</span>
                    </div>
                  </div>
                </div>

                {/* module 2 */}
                <div className="overflow-hidden rounded-xl border border-gray-200 opacity-80">
                  <div className="bg-gray-50 px-5 py-4 flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                      <h4 className="font-bold" style={{ color: '#222222' }}>Module 2: Typography & Color Theory</h4>
                    </div>
                    <span className="text-xs font-medium text-gray-500">5 lectures • 2h 15min</span>
                  </div>
                </div>
              </div>
            </section>

            {/* instructor */}
            <section id="instructor" className="scroll-mt-24">
              <h2 className="mb-5 text-2xl font-bold" style={{ color: '#222222' }}>Your Instructor</h2>
              <div className="rounded-xl border-l-4 p-6 md:p-8" style={{ borderColor: '#FF6D1F', backgroundColor: '#FAF3E1' }}>
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <img
                    alt="Jane Doe"
                    className="size-24 rounded-full border-4 border-white shadow-md object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-LExpsy9OH773yfiN8jOdPL8UmEOVOTnxlp6VkgzECQ041-RNcG4syNlBV-iMT4BiqzuFCxw-QXLXmJZ6Dlsk8e2O_l_QkAoCje4iYr7faPLbCmf2MmcuIdNXVD9-aLVqlQ0nrp5_i3EL3rJn0gJkfiVFTqdtRdykF4WCiBwyXhFBSsRiG80LBE05Bm42yfSX30-aZwu9zsK7KLr5UDby4xRckplrwqjOh-Faar_vYdGjT4TBy5quW8Y35S0PqV484eSixCiWh2g"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold" style={{ color: '#222222' }}>Jane Doe</h3>
                    <p className="mb-3 text-sm font-medium" style={{ color: '#FF6D1F' }}>Senior Product Designer at TechCorp</p>
                    <div className="mb-4 flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] fill-current" style={{ color: '#FF6D1F' }}>star</span>
                        <span>4.9 Rating</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">school</span>
                        <span>15 Courses</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">group</span>
                        <span>45k Students</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700">
                      Jane has over 10 years of experience in product design and has worked with Fortune 500 companies. She is passionate about teaching and has helped thousands of students transition into UX/UI design careers. Her teaching style is practical, project-based, and easy to follow.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* reviews */}
            <section id="reviews" className="scroll-mt-24 mb-10">
              <div className="mb-6 flex items-center gap-4">
                <h2 className="text-2xl font-bold" style={{ color: '#222222' }}>Student Feedback</h2>
                <div className="flex items-center gap-2 rounded-lg px-3 py-1" style={{ backgroundColor: '#FAF3E1', color: '#FF6D1F' }}>
                  <span className="font-bold">4.8</span>
                  <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* card 1 */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">MR</div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: '#222222' }}>Mark Robinson</p>
                        <p className="text-xs text-gray-500">2 weeks ago</p>
                      </div>
                    </div>
                    <div className="flex" style={{ color: '#FF6D1F' }}>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Absolutely the best web design course I've taken. The section on auto-layout was a game changer for me. Highly recommended!"
                  </p>
                </div>

                {/* card 2 */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        alt="Sarah L."
                        className="size-10 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGAA84XABCkbVWAjIYWDri6yP38A5Hl1zKYuGKnfFKAkQjxXBUz7ysa2BZeERJuAOne55K6OQD6NB7vTs98t69TstBLjGMffKCiPOVCh4tBmoQ9yqPrWrayBvP_J4W8H2NLybGpcJFqguv7YCByzbF9pOp8qtlnIbsdMuPMVwsClYlE6cjO_rZI2betWRYBK0VecwPe276ghcSaYteqlEHPSHqQv-wd6X0DKbCeZmcrdBtbcS40yKLfkWNvQO_QB6OVsNbSgKu2i4"
                      />
                      <div>
                        <p className="text-sm font-bold" style={{ color: '#222222' }}>Sarah Lee</p>
                        <p className="text-xs text-gray-500">1 month ago</p>
                      </div>
                    </div>
                    <div className="flex" style={{ color: '#FF6D1F' }}>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Great content, very detailed. I just wish there were more assignments in the later modules. Overall great value."
                  </p>
                </div>
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50">
                See all reviews
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </section>
          </div>

          {/* ------------------  STICKY SIDEBAR  ------------------ */}
          <div className="relative hidden lg:block">
            <div
              className="sticky top-24 rounded-2xl border border-gray-200 p-6 shadow-xl"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)' }}
            >
              {/* price */}
              <div className="mb-6 flex items-end gap-3">
                <h2 className="text-4xl font-black" style={{ color: '#222222' }}>$12.99</h2>
                <span className="mb-1 text-lg font-medium text-gray-400 line-through">$84.99</span>
                <span className="mb-1 rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">85% OFF</span>
              </div>

              {/* buttons */}
              <div className="mb-6 flex flex-col gap-3">
                <button
                  className="flex h-12 w-full items-center justify-center rounded-lg text-base font-bold shadow-lg transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: '#FF6D1F', color: '#FAF3E1', boxShadow: '0 10px 15px -3px rgba(255,109,31,.3)' }}
                >
                  Enroll Now
                </button>
                <button
                  className="flex h-12 w-full items-center justify-center rounded-lg border-2 text-base font-bold transition-all hover:bg-primary/5"
                  style={{ borderColor: '#FF6D1F', color: '#FF6D1F' }}
                >
                  Add to Cart
                </button>
              </div>

              <p className="mb-6 text-center text-xs font-medium text-gray-500">30-Day Money-Back Guarantee</p>

              {/* features */}
              <div className="mb-6 flex flex-col gap-3 border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold" style={{ color: '#222222' }}>This course includes:</h4>
                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="material-symbols-outlined text-[18px] text-gray-400">ondemand_video</span>
                    30.5 hours on-demand video
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="material-symbols-outlined text-[18px] text-gray-400">description</span>
                    15 articles & 8 downloadable resources
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="material-symbols-outlined text-[18px] text-gray-400">devices</span>
                    Access on mobile and TV
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="material-symbols-outlined text-[18px] text-gray-400">all_inclusive</span>
                    Full lifetime access
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="material-symbols-outlined text-[18px] text-gray-400">workspace_premium</span>
                    Certificate of completion
                  </li>
                </ul>
              </div>

              {/* sslcommerz placeholder */}
              <div
                className="rounded-lg border border-dashed p-4"
                style={{ borderColor: 'rgba(255,109,31,.5)', backgroundColor: '#FAF3E1' }}
              >
                <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  Secure Payment
                </div>
                <div className="flex justify-center gap-2 opacity-70 grayscale transition-all hover:grayscale-0">
                  {/* visa */}
                  <div
                    className="h-6 w-10 rounded bg-white shadow-sm bg-cover"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBe_yR89Qk64JcenvV_XN4yfMZ4Pu5X7696QvAx2ihBaIG79y6e-ZKbuSaFCYNw-MMul0cp_hm7D_Z1ExSobrycXLIf7yviXJU9MsvTIMEoZyqoPnNCNN1go0SRLtKEynArthJagM8j7bydqhD1OGuBmA-mHxGQ8kG8_l2Rx5tJtg0azNave-0H9dTe-H8wHcTVW_ZspSmmVkvSoiVObO2wARpVxOfVpKrtViE6gI1uaaEAbv_aYQnlYMew9JOSbdlCWeXyNtdN8J0')",
                    }}
                  />
                  {/* mastercard */}
                  <div
                    className="h-6 w-10 rounded bg-white shadow-sm bg-cover"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwcDejj202Rx_IR2mCcjCvPXW4xuHovgj0V_RZWpIRwbpAnyL-CPfyPkXwANaOJOOHbx33uFqctexQBZZLNDqCHXW3QRC95yvOpFju0lNo-lzWcNcxJsNrDH9CMCrRGGx3f5ngF7JV8-fTPQI2xx9ZZBJFBXdn3h07b6izjDkR7mQreLs8JlLP8KvMqo0Z2cGM3OxsFV7mewYu32R41JkA0W1SEqGe5jiPJx_iKcw5Sp_bFWRj1KwQNWmNCv0ogh7lOrYgcCirpnk')",
                    }}
                  />
                  {/* amex */}
                  <div
                    className="h-6 w-10 rounded bg-white shadow-sm bg-cover"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCND0iR_jDEABBejjbAHNC7KbVZ6ukMGO5lLE4i07GbIbtLpvdyThZmWObGGly4bw9Vs3dwPeIWBKpwBd-52RyD4VI0K-tXCjDeStVBdyl7G7vAYoTN6dif3OvLc65wxBnE8owLI7X7iL_UwCfgvGrW8NSvF42PNN7kjJErRCXYf8zFddW-GnDea9UPoCnR0-8BS0qckhdMuR3rytmy9guV4qkmez77EsOq_tg8jlp6n87mUDmj898aMjLEFYby32Wr5mP4EgX9tJY')",
                    }}
                  />
                  {/* paypal */}
                  <div
                    className="h-6 w-10 rounded bg-white shadow-sm bg-cover"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3Ig0sELx2YCJ6MFfArm60UlsR8PcFH06I5jMFEXrNklRJwCGrDWRneu7BnvVDjof0OyIce4YbiDHYuv20HM-WeKWQY3tjzWeCDUMPj2JyAyC3wT57jhU1BfZH3_mwADUKReMxUHXyPfXtw6DoRh8T6iZ3iow4GUycePNuqfmJwL7dU570ubw8qekQZOha3xj-cmpj3lYgAOSTB9tgtvLsYHarQFusazJUG7PXxyBCfgpNK-0W3VbFRvySnVyRRsbdpOiiMHB88to')",
                    }}
                  />
                </div>
                <p className="mt-2 text-center text-[10px] text-gray-400">Powered by SSLCommerz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}