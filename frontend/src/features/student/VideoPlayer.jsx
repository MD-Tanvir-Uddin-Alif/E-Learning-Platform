import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEnrolledCourseDetails, updateVideoProgress, getCourseProgress } from '../../api/axios'; // Ensure path matches your project

// Base URL for video assets
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export default function VideoPlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const videoRef = useRef(null);
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [hasMarkedComplete, setHasMarkedComplete] = useState(false); // Prevents multiple API calls for same video

  // 1. Fetch course details with videos
  const { data: courseData, isLoading: isLoadingCourse, isError } = useQuery({
    queryKey: ['enrolled-course', courseId],
    queryFn: () => getEnrolledCourseDetails(courseId),
    enabled: !!courseId,
  });

  // 2. Fetch video progress
  const { data: progressData, isLoading: isLoadingProgress } = useQuery({
    queryKey: ['course-progress', courseId],
    queryFn: () => getCourseProgress(courseId),
    enabled: !!courseId,
  });

  // 3. Mutation to mark video as watched
  const markWatchedMutation = useMutation({
    mutationFn: (videoId) => updateVideoProgress(videoId, true),
    onSuccess: (_, videoId) => {
      setWatchedVideos(prev => {
        const newSet = new Set([...prev, videoId]);
        return newSet;
      });
      // Invalidate queries to refresh progress bars/locks
      queryClient.invalidateQueries(['course-progress', courseId]);
      queryClient.invalidateQueries(['my-enrollments']);
    },
  });

  // 4. Initialize State from API Data
  useEffect(() => {
    if (progressData?.videos && courseData?.videos) {
      // Build set of watched IDs
      const watched = new Set(
        progressData.videos
          .filter(v => v.watched)
          .map(v => v.id)
      );
      setWatchedVideos(watched);

      // Auto-jump to first unwatched video if just loading
      // (Optional logic: can be removed if you want to always start at 0)
      if (currentVideoIndex === 0 && watched.size > 0 && watched.size < courseData.videos.length) {
         const firstUnwatchedIndex = courseData.videos.findIndex(
           video => !watched.has(video.id)
         );
         if (firstUnwatchedIndex !== -1) {
           setCurrentVideoIndex(firstUnwatchedIndex);
         }
      }
    }
  }, [progressData, courseData]);

  // Reset local completion flag when switching videos
  useEffect(() => {
    setHasMarkedComplete(false);
  }, [currentVideoIndex]);

  // 5. Track video progress (The 90% Rule)
  useEffect(() => {
    const video = videoRef.current;
    const videos = courseData?.videos || [];
    const currentVideo = videos[currentVideoIndex];
    
    if (!video || !currentVideo) return;

    const handleTimeUpdate = () => {
      if (video.duration > 0) {
        const watchedPercentage = (video.currentTime / video.duration) * 100;
        
        // Mark as complete if > 90%, not already watched, and not already submitting
        if (watchedPercentage >= 90 && !watchedVideos.has(currentVideo.id) && !hasMarkedComplete) {
          setHasMarkedComplete(true);
          markWatchedMutation.mutate(currentVideo.id);
          setShowCompletionModal(true); // This triggers the modal
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentVideoIndex, courseData, watchedVideos, hasMarkedComplete, markWatchedMutation]);


  if (isLoadingCourse || isLoadingProgress) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF3E1' }}>
        <div className="text-center">
          <div className="animate-spin size-12 border-4 border-[#ff6d1f] border-t-transparent rounded-full mx-auto mb-4" />
          <p style={{ color: '#222222' }}>Loading classroom...</p>
        </div>
      </div>
    );
  }

  if (isError || !courseData) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF3E1' }}>
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load course content.</p>
          <button
            onClick={() => navigate('/student/course')} // Or student dashboard
            className="px-6 py-2 rounded-lg font-bold"
            style={{ backgroundColor: '#ff6d1f', color: '#ffffff' }}
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }


  const videos = courseData.videos || [];
  const currentVideo = videos[currentVideoIndex];
  const totalVideos = videos.length;
  // Calculate percentage from API data if available, else local
  const progressPercentage = progressData ? progressData.completion_percentage : 0;

  // Check if course is fully completed (all videos watched)
  // We assume success of current video mutation makes watchedVideos size increase by 1
  // If user just finished the last video, watchedVideos might not be updated in render yet,
  // so we check if (watchedVideos.size + (hasMarkedComplete ? 1 : 0)) >= totalVideos
  // But safest is simply checking if it's the last video AND it's being marked complete.
  const isLastVideo = currentVideoIndex === videos.length - 1;
  const isCourseCompleted = isLastVideo && (hasMarkedComplete || watchedVideos.has(currentVideo?.id));

  // console.log(isCourseCompleted);


  const isVideoUnlocked = (index) => {
    if (index === 0) return true;
    const previousVideoId = videos[index - 1]?.id;
    return watchedVideos.has(previousVideoId);
  };

  const handleNextVideo = () => {
    setShowCompletionModal(false);
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const handleVideoSelect = (index) => {
    if (isVideoUnlocked(index)) {
      setCurrentVideoIndex(index);
    }
  };

  // console.log("isCourseCompleted", isCourseCompleted)

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />
      
      {/* ----------  TOP NAV  ---------- */}
      <header
        className="shrink-0 z-20 border-b px-6 py-3 flex items-center justify-between"
        style={{ backgroundColor: '#FAF3E1', borderColor: '#F5E7C7' }}
      >
        <div className="flex items-center gap-4" style={{ color: '#222222' }}>
          <button
            onClick={() => navigate('/student/course')} // Adjust route as needed
            className="size-8 rounded-lg flex items-center justify-center hover:bg-[#F5E7C7] transition"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
          </button>
          <div className="size-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#ff6d1f' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>school</span>
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight tracking-tight" style={{ color: '#222222' }}>
              {courseData.title}
            </h2>
            <p className="text-xs" style={{ color: 'rgba(34,34,34,.6)' }}>
              Video {currentVideoIndex + 1} of {totalVideos}
            </p>
          </div>
        </div>

        {/* Global Progress */}
        <div className="hidden md:flex flex-col gap-1 w-1/3 max-w-md">
          <div className="flex justify-between text-xs font-medium" style={{ color: 'rgba(34,34,34,.7)' }}>
            <span>Course Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#F5E7C7' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%`, backgroundColor: '#ff6d1f' }} />
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {Math.round(progressPercentage) ==100 && (
            <button
              onClick={() => navigate(`/certificate/${courseId}`)}
              className="h-10 px-4 flex items-center gap-2 rounded-lg font-bold hover:bg-opacity-90 transition animate-in fade-in"
              style={{ backgroundColor: '#222222', color: '#ffffff' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>workspace_premium</span>
              <span className="text-sm">Get Certificate</span>
            </button>
          )}
          {/* <button
            onClick={() => navigate('/profile')}
            className="h-10 px-4 flex items-center gap-2 rounded-lg text-white font-bold hover:bg-opacity-90 transition"
            style={{ backgroundColor: '#ff6d1f' }}
          >
            <div className="size-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,.2)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>
            </div>
            <span className="text-sm">My Profile</span>
          </button> */}
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
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              {currentVideo ? (
                <video
                  ref={videoRef}
                  key={currentVideo.id} // Ensures player resets on video change
                  className="w-full h-full"
                  controls
                  autoPlay={false} // Autoplay often blocked by browsers, safer false or muted
                  src={getMediaUrl(currentVideo.video_url)}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p>No video available</p>
                </div>
              )}
            </div>

            {/* Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#222222' }}>
                  {currentVideo?.title || 'Video Title'}
                </h1>
                <p className="leading-relaxed max-w-2xl" style={{ color: 'rgba(34,34,34,.7)' }}>
                  {courseData.description}
                </p>
              </div>

              {/* Action Panel */}
              <div className="flex flex-col gap-4 min-w-[280px]">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handlePrevVideo}
                    disabled={currentVideoIndex === 0}
                    className="flex items-center justify-center gap-2 h-10 rounded-lg font-semibold text-sm hover:bg-[#e0d2b4] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#F5E7C7', color: '#222222' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                    Prev
                  </button>
                  <button
                    onClick={handleNextVideo}
                    // Next button disabled if it's the last video OR next video is locked
                    disabled={currentVideoIndex === videos.length - 1 || !isVideoUnlocked(currentVideoIndex + 1)}
                    className="flex items-center justify-center gap-2 h-10 rounded-lg font-semibold text-sm hover:bg-[#e0d2b4] transition disabled:opacity-50 disabled:cursor-not-allowed"
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
            <p className="text-xs mt-1" style={{ color: 'rgba(34,34,34,.6)' }}>
              {watchedVideos.size}/{totalVideos} Videos Completed
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {videos.map((video, index) => {
              const isWatched = watchedVideos.has(video.id);
              const isActive = index === currentVideoIndex;
              const isLocked = !isVideoUnlocked(index);

              return (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(index)}
                  className={`relative flex gap-3 p-3 rounded-lg transition cursor-pointer ${
                    isActive ? 'shadow-sm border-l-4' : 'hover:bg-[#F5E7C7]/30'
                  } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={isActive ? { 
                    backgroundColor: 'rgba(245,231,199,.4)', 
                    borderColor: '#ff6d1f' 
                  } : {}}
                >
                  <div className="mt-0.5">
                    {isLocked ? (
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'rgba(34,34,34,.4)' }}>
                        lock
                      </span>
                    ) : isWatched ? (
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#ff6d1f' }}>
                        check_circle
                      </span>
                    ) : isActive ? (
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#ff6d1f' }}>
                        play_circle
                      </span>
                    ) : (
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'rgba(34,34,34,.4)' }}>
                        play_circle
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p 
                      className={`text-sm font-${isActive ? 'bold' : 'medium'} ${isWatched ? 'line-through decoration-[#ff6d1f]/30' : ''}`} 
                      style={{ color: '#222222' }}
                    >
                      {video.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(34,34,34,.5)' }}>
                      Video {index + 1}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* ----------  COMPLETION MODAL  ---------- */}
      {showCompletionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
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
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#222222' }}>
              {isCourseCompleted ? 'Course Completed!' : 'Video Completed!'}
            </h2>
            <p className="mb-6" style={{ color: 'rgba(34,34,34,.7)' }}>
              {isCourseCompleted
                ? "Congratulations! You've finished all videos in this course."
                : `Great job! You've finished "${currentVideo?.title}". Ready for the next video?`
              }
            </p>
            <div className="flex flex-col gap-3">
              {!isCourseCompleted ? (
                <button
                  onClick={handleNextVideo}
                  className="w-full py-3 font-bold rounded-lg text-sm hover:scale-[1.02] transition shadow-lg"
                  style={{ backgroundColor: '#ff6d1f', color: '#ffffff', boxShadow: '0 10px 15px -3px rgba(255,109,31,.2)' }}
                >
                  Play Next Video
                </button>
              ) : (
                <button
                  onClick={() => navigate('/student/course')}
                  className="w-full py-3 font-bold rounded-lg text-sm hover:scale-[1.02] transition shadow-lg"
                  style={{ backgroundColor: '#ff6d1f', color: '#ffffff', boxShadow: '0 10px 15px -3px rgba(255,109,31,.2)' }}
                >
                  Back to My Courses
                </button>
              )}
              <button
                onClick={() => setShowCompletionModal(false)}
                className="w-full py-3 font-medium text-sm rounded-lg hover:bg-[#F5E7C7]/50 transition"
                style={{ backgroundColor: 'transparent', color: '#222222' }}
              >
                Stay Here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}