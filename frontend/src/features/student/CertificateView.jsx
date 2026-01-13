import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCourseCertificate } from '../../api/axios';
import { useReactToPrint } from 'react-to-print';

export default function CertificateView() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const componentRef = useRef();

  // Fetch Certificate Data
  const { data: cert, isLoading, isError, error } = useQuery({
    queryKey: ['certificate', courseId],
    queryFn: () => getCourseCertificate(courseId),
    enabled: !!courseId,
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Certificate-${cert?.course_name || 'Course'}`,
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#FAF3E1] text-[#222222]/50 font-bold">Generating Certificate...</div>;
  
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF3E1] gap-4">
        <p className="text-red-500 font-bold text-lg">Unable to generate certificate.</p>
        <p className="text-[#222222]/60">{error?.response?.data?.detail || "You may not have completed the course yet."}</p>
        <button 
          onClick={() => navigate('/student/course')}
          className="px-6 py-2 bg-[#FF6D1F] text-white rounded-lg font-bold hover:bg-[#e0560e] transition"
        >
          Back to Course
        </button>
      </div>
    );
  }

  // Generate Certificate ID if not from backend (mock for display)
  const certId = `SF-${courseId}-${new Date(cert.completion_date).getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const formattedDate = new Date(cert.completion_date).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Crimson+Pro:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap" rel="stylesheet" />

      <div className="bg-[#f8f6f5] min-h-screen flex flex-col font-['Lexend']">
        
        {/* Actions Bar (No Print) */}
        <div className="bg-white border-b border-[#F5E7C6] px-8 py-4 flex justify-between items-center shadow-sm no-print">
          {/* <button 
            onClick={() => navigate(`/learn/:${courseId}`)}
            className="flex items-center gap-2 text-[#222222]/60 hover:text-[#FF6D1F] font-bold transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Course
          </button> */}
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#FF6D1F] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-[#e0560e] transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="material-symbols-outlined">download</span>
            Download PDF
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center p-8 overflow-auto">
          
          {/* Certificate Container (Ref for Print) */}
          <div ref={componentRef} className="certificate-container">
            <div 
              className="certificate-canvas rounded-[32px] flex flex-col relative overflow-hidden"
              style={{
                width: '1120px',
                height: '800px',
                background: 'linear-gradient(135deg, #FAF3E1 0%, #F5E7C6 100%)',
                border: '8px solid white',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Watermark */}
              <div 
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAn5cvwFVMTV_EbDcCPdhXMxfoSDcgYqobF7NPbwQr7xVvM5R6xyKeM2O8s0cXn1c4ufQvR1RzsYQQG-NNm2_HYOlnmioub61n-MdlUXv0J9K6mgLt75hgxJlObVtRUFx1sAd9Z9qwuKTdrCJ7y791ntNmgZYIShG43h2j0AJD1fXW508PXnaowi4DmRcwxWrTl5EhRWyk6Yokdl5dn7rBsIfIrLNvE6UYhVIqd1nDMx9TkLuFaZB2sI29Np5ixPR1psZLHdgFz-XQ')",
                    backgroundRepeat: 'repeat'
                }}
              />

              {/* Ornaments */}
              <div className="absolute w-20 h-20 border-[#ff6d1f] top-10 left-10 border-t-2 border-l-2" />
              <div className="absolute w-20 h-20 border-[#ff6d1f] top-10 right-10 border-t-2 border-r-2" />
              <div className="absolute w-20 h-20 border-[#ff6d1f] bottom-10 left-10 border-b-2 border-l-2" />
              <div className="absolute w-20 h-20 border-[#ff6d1f] bottom-10 right-10 border-b-2 border-r-2" />

              {/* Top Ribbon */}
              <div className="w-full bg-[#ff6d1f] py-8 flex justify-center items-center shadow-md relative z-10">
                <h1 className="text-white text-[24px] font-bold tracking-[0.3em] uppercase">Certificate of Completion</h1>
              </div>

              {/* Body */}
              <div className="flex-grow flex flex-col items-center justify-start pt-16 px-20 text-center relative z-10">
                
                {/* Seal */}
                <div className="mb-10 relative">
                  <div className="w-[100px] h-[100px] bg-[#ff6d1f] rounded-full flex items-center justify-center shadow-lg border-4 border-[#FFD700]/30 relative overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
                    <span className="material-symbols-outlined text-white text-[56px]">verified_user</span>
                  </div>
                </div>

                <p className="font-serif italic text-[#222222] text-[20px] mb-6 font-['Crimson_Pro']">This is to certify that</p>
                
                <div className="mb-8 w-full">
                  <h2 className="font-serif text-[#222222] text-[56px] leading-tight font-['Crimson_Pro'] font-bold">
                    {cert.student_name}
                  </h2>
                  <div className="w-full h-1 bg-[#ff6d1f] mt-2 mx-auto max-w-[400px]"></div>
                </div>

                <p className="text-[#222222] text-[22px] mb-4">has successfully completed the course</p>
                
                <h3 className="text-[#ff6d1f] font-bold text-[32px] mb-12 uppercase tracking-wide max-w-4xl leading-tight">
                  {cert.course_name}
                </h3>
                
                <p className="text-[#444444] text-[18px] max-w-[700px] leading-relaxed italic">
                    "May the knowledge you’ve gained here open new doors and inspire continuous growth. Keep forging ahead!"
                </p>
              </div>

              {/* Footer */}
              <div className="px-20 pb-16 flex justify-between items-end relative z-10">
                <div className="flex flex-col gap-2 text-left">
                  <div className="flex gap-4">
                    <p className="text-[#555555] text-[16px] font-medium">Date Issued:</p>
                    <p className="text-[#222222] text-[16px]">{formattedDate}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-[#555555] text-[16px] font-medium">Certificate ID:</p>
                    <p className="text-[#222222] text-[16px] font-mono">{certId}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-8 bg-[#ff6d1f] rounded-full flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-[18px]">school</span>
                    </div>
                    <p className="font-bold text-[#222222]">SkillForge Academy</p>
                  </div>
                  <div className="w-[240px] border-b-2 border-[#222222]/20 mb-2"></div>
                  <p className="text-[#555555] text-[14px] uppercase tracking-widest font-bold">
                    {cert.instructor_name}, Instructor
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>

        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .certificate-container, .certificate-container * {
              visibility: visible;
            }
            .certificate-container {
              position: absolute;
              left: 0;
              top: 0;
              margin: 0;
              padding: 0;
              transform: scale(0.9); /* Adjust scale to fit page if needed */
              transform-origin: top left;
            }
            .certificate-canvas {
                box-shadow: none !important;
            }
            .no-print {
                display: none !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}