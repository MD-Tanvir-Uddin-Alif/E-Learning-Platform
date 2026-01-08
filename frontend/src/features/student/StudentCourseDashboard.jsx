import React from 'react';

export default function StudentCourseDashboard() {
  return (
    <div className="flex h-screen w-full">
      {/* ----------  MAIN CONTENT  ---------- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            {/* Welcome Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#222222' }}>
                Welcome back, Alex! 👋
              </h1>
              <p className="mt-1" style={{ color: 'rgba(34,34,34,.7)' }}>
                You have 2 assignments due today. Let's get learning.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* card 1 */}
              <div
                className="p-6 rounded-xl flex flex-col gap-1 shadow-sm border"
                style={{ backgroundColor: '#F5E7C6', borderColor: '#F5E7C6' }}
              >
                <p className="font-medium" style={{ color: '#222222' }}>Courses in Progress</p>
                <p className="text-3xl font-bold" style={{ color: '#FF6D1F' }}>4</p>
              </div>

              {/* card 2 */}
              <div
                className="p-6 rounded-xl flex flex-col gap-1 shadow-sm border"
                style={{ backgroundColor: '#F5E7C6', borderColor: '#F5E7C6' }}
              >
                <p className="font-medium" style={{ color: '#222222' }}>Hours Learned</p>
                <p className="text-3xl font-bold" style={{ color: '#FF6D1F' }}>32h</p>
              </div>
            </div>

            {/* Main Section Split */}
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Left Column: Courses */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold" style={{ color: '#222222' }}>Continue Learning</h2>
                  <button className="text-sm font-bold hover:underline" style={{ color: '#FF6D1F' }}>
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Course Card 1 */}
                  <div
                    className="group rounded-xl overflow-hidden border flex flex-col shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: '#FAF3E1', borderColor: '#F5E7C6' }}
                  >
                    <div
                      className="h-32 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsAeVMFWkJ0INg3TI7PTPpPj5MLk4mVim58xXEJ1a-ZBAwEE0DZjMNHj4fSVt6K-PM9K6RQRnHF1cmzsMooEjatNbHhfFR_DanYTOrcR5D9Njj3HCVjDl0LPNwppuZoHhgwuNKMpuYATtGzOMI4U1eBJvI4ZaF43OUXO6K0HB5jzKJS1qf_REFABKEyoJ9ydIcc2ekwgMV-eAmnq5AiB8d5BAjKSoai7XmVd8-UcAp76_LkAolAQuH4TGc04oClGGHUf9xMBD8mQE')",
                      }}
                    />
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{ backgroundColor: '#F5E7C6', color: '#FF6D1F' }}
                        >
                          Development
                        </span>
                        <span className="text-xs" style={{ color: 'rgba(34,34,34,.6)' }}>3h remaining</span>
                      </div>
                      <h3 className="font-bold text-lg mb-4" style={{ color: '#222222' }}>Advanced Python</h3>
                      <div className="mt-auto flex flex-col gap-4">
                        <div className="w-full">
                          <div className="flex justify-between text-xs mb-1 font-medium">
                            <span style={{ color: '#222222' }}>Progress</span>
                            <span style={{ color: '#222222' }}>75%</span>
                          </div>
                          <div className="w-full rounded-full h-2" style={{ backgroundColor: '#F5E7C6' }}>
                            <div className="h-2 rounded-full" style={{ width: '75%', backgroundColor: '#FF6D1F' }} />
                          </div>
                        </div>
                        <button
                          className="w-full py-2.5 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-opacity"
                          style={{ backgroundColor: '#FF6D1F', color: '#FAF3E1' }}
                        >
                          Resume Course
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Course Card 2 */}
                  <div
                    className="group rounded-xl overflow-hidden border flex flex-col shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: '#FAF3E1', borderColor: '#F5E7C6' }}
                  >
                    <div
                      className="h-32 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCT-L3ZaH_WLv2NW-tuFkaJvjWK822d0Ux4qu8eyndXrf-RDqr8ZgA6I7P3XCVskPMPIhlJKJsvIde-oOoGf10gLxqoXsJJJwF280y7SDh5bU4YviY3Hl09F67WDC7g1rWsUYLLzObJFGdXDBiM-bBdU9jeImw0ob3yFX2tNkqMWTWHX1KsJcbL0jAxq9kvCM7Ec1JZ-1ypfrM-hxFXCXfw9eKsu42l2b3by1ldbqr1N1gvfPHFtATpt0G1o74npnzhs12EDxWxBNM')",
                      }}
                    />
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{ backgroundColor: '#F5E7C6', color: '#FF6D1F' }}
                        >
                          Design
                        </span>
                        <span className="text-xs" style={{ color: 'rgba(34,34,34,.6)' }}>5h remaining</span>
                      </div>
                      <h3 className="font-bold text-lg mb-4" style={{ color: '#222222' }}>UI/UX Principles</h3>
                      <div className="mt-auto flex flex-col gap-4">
                        <div className="w-full">
                          <div className="flex justify-between text-xs mb-1 font-medium">
                            <span style={{ color: '#222222' }}>Progress</span>
                            <span style={{ color: '#222222' }}>32%</span>
                          </div>
                          <div className="w-full rounded-full h-2" style={{ backgroundColor: '#F5E7C6' }}>
                            <div className="h-2 rounded-full" style={{ width: '32%', backgroundColor: '#FF6D1F' }} />
                          </div>
                        </div>
                        <button
                          className="w-full py-2.5 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-opacity"
                          style={{ backgroundColor: '#FF6D1F', color: '#FAF3E1' }}
                        >
                          Resume Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Tabs / Widgets (placeholder) */}
              <div className="w-full xl:w-96 shrink-0">{/* future content */}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}