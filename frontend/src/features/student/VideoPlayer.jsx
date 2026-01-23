import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEnrolledCourseDetails, updateVideoProgress, getCourseProgress, submitCourseRating } from '../../api/axios';

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
  const [hasMarkedComplete, setHasMarkedComplete] = useState(false);
  
  // Rating Modal 
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hasRated, setHasRated] = useState(false);
  
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch course details with videos
  const { data: courseData, isLoading: isLoadingCourse, isError } = useQuery({
    queryKey: ['enrolled-course', courseId],
    queryFn: () => getEnrolledCourseDetails(courseId),
    enabled: !!courseId,
  });

  // Fetch video progress
  const { data: progressData, isLoading: isLoadingProgress } = useQuery({
    queryKey: ['course-progress', courseId],
    queryFn: () => getCourseProgress(courseId),
    enabled: !!courseId,
  });

  // Mutation for mark video as watched
  const markWatchedMutation = useMutation({
    mutationFn: (videoId) => updateVideoProgress(videoId, true),
    onSuccess: (_, videoId) => {
      setWatchedVideos(prev => {
        const newSet = new Set([...prev, videoId]);
        return newSet;
      });
      queryClient.invalidateQueries(['course-progress', courseId]);
      queryClient.invalidateQueries(['my-enrollments']);
    },
  });

  // Mutation to submit rating
  const submitRatingMutation = useMutation({
    mutationFn: (data) => submitCourseRating(courseId, data),
    onSuccess: () => {
      setHasRated(true);
      setShowRatingModal(false);
      showToast('success', 'Thank You!', 'Your review has been submitted successfully.');
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.detail || 'Failed to submit rating';
      showToast('error', 'Error', errorMsg);
    }
  });

  // Initialize State from API Data
  useEffect(() => {
    if (progressData?.videos && courseData?.videos) {
      const watched = new Set(
        progressData.videos
          .filter(v => v.watched)
          .map(v => v.id)
      );
      setWatchedVideos(watched);

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

  // Track video progress
  useEffect(() => {
    const video = videoRef.current;
    const videos = courseData?.videos || [];
    const currentVideo = videos[currentVideoIndex];
    
    if (!video || !currentVideo) return;

    const handleTimeUpdate = () => {
      if (video.duration > 0) {
        const watchedPercentage = (video.currentTime / video.duration) * 100;
        
        if (watchedPercentage >= 90 && !watchedVideos.has(currentVideo.id) && !hasMarkedComplete) {
          setHasMarkedComplete(true);
          markWatchedMutation.mutate(currentVideo.id);
          setShowCompletionModal(true);
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentVideoIndex, courseData, watchedVideos, hasMarkedComplete, markWatchedMutation]);

  // Auto-show Rating Modal when progress reaches 100% (only once)
  useEffect(() => {
    const progressPercentage = progressData ? progressData.completion_percentage : 0;
    
    if (Math.round(progressPercentage) === 100 && !hasRated && !showRatingModal) {
      const timer = setTimeout(() => {
        setShowRatingModal(true);
      }, 1000); 
      
      return () => clearTimeout(timer);
    }
  }, [progressData, hasRated, showRatingModal]);

  const renderToast = () => {
    if (!toast) return null;
    const isError = toast.type === 'error';
    
    return (
      <div className="fixed top-5 right-5 z-[70] animate-[slideDown_0.3s_ease-out]">
        <div className="pointer-events-auto w-[320px] rounded-xl shadow-xl border p-4 flex gap-3" 
             style={{ backgroundColor: '#F5E7C6', borderColor: '#ead7cd' }}>
          <div className={`size-6 rounded-full flex items-center justify-center text-white ${isError ? 'bg-red-500' : 'bg-[#FF6D1F]'}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {isError ? 'priority_high' : 'check'}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm" style={{ color: '#222222' }}>
              {toast.title}
            </h3>
            <p className="text-xs" style={{ color: 'rgba(34,34,34,0.8)' }}>
              {toast.message}
            </p>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
          </button>
        </div>
      </div>
    );
  };

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
            onClick={() => navigate('/student/course')}
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
  const progressPercentage = progressData ? progressData.completion_percentage : 0;
  const isLastVideo = currentVideoIndex === videos.length - 1;
  const isCourseCompleted = isLastVideo && (hasMarkedComplete || watchedVideos.has(currentVideo?.id));

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

  const handleCompletionNext = () => {
    if (isCourseCompleted && !hasRated) {
      setShowCompletionModal(false);
      setShowRatingModal(true);
    } else {
      handleNextVideo();
    }
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      showToast('error', 'Missing Rating', 'Please select a star rating');
      return;
    }

    submitRatingMutation.mutate({
      rating,
      comment: comment.trim()
    });
  };

  const handleSkipRating = () => {
    setShowRatingModal(false);
    setHasRated(true); 
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />
      
      {/* Custom Styles */}
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {renderToast()}
      
      {/* ----------  TOP NAV  ---------- */}
      <header
        className="shrink-0 z-20 border-b px-6 py-3 flex items-center justify-between"
        style={{ backgroundColor: '#FAF3E1', borderColor: '#F5E7C7' }}
      >
        <div className="flex items-center gap-4" style={{ color: '#222222' }}>
          <button
            onClick={() => navigate('/student/course')}
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
          {Math.round(progressPercentage) === 100 && (
            <>
              <button
                onClick={() => navigate(`/certificate/${courseId}`)}
                className="h-10 px-4 flex items-center gap-2 rounded-lg font-bold hover:bg-opacity-90 transition animate-in fade-in"
                style={{ backgroundColor: '#222222', color: '#ffffff' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>workspace_premium</span>
                <span className="text-sm">Get Certificate</span>
              </button>
              
              {/* Manual Rating Button (if user skipped it) */}
              {!hasRated && (
                <button
                  onClick={() => setShowRatingModal(true)}
                  className="h-10 px-4 flex items-center gap-2 rounded-lg font-bold hover:bg-opacity-90 transition"
                  style={{ backgroundColor: '#ff6d1f', color: '#ffffff' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>star</span>
                  <span className="text-sm">Rate Course</span>
                </button>
              )}
            </>
          )}
        </div>
      </header>

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
                  key={currentVideo.id}
                  className="w-full h-full"
                  controls
                  autoPlay={false}
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
                  onClick={handleCompletionNext}
                  className="w-full py-3 font-bold rounded-lg text-sm hover:scale-[1.02] transition shadow-lg"
                  style={{ backgroundColor: '#ff6d1f', color: '#ffffff', boxShadow: '0 10px 15px -3px rgba(255,109,31,.2)' }}
                >
                  {hasRated ? 'Back to My Courses' : 'Rate This Course'}
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

      {/* ----------  RATING MODAL  ---------- */}
      {showRatingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0,0,0,.6)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRatingModal(false);
            }
          }}
        >
          <div
            className="p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden border"
            style={{ backgroundColor: '#FAF3E1', borderColor: '#F5E7C7' }}
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(255,109,31,.08)' }} />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(255,109,31,.08)' }} />
            
            <div className="relative">
              <div className="text-center mb-6">
                <div className="mx-auto size-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(255,109,31,.1)', color: '#ff6d1f' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 32 }}>star</span>
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#222222' }}>
                  Rate This Course
                </h2>
                <p className="text-sm" style={{ color: 'rgba(34,34,34,.6)' }}>
                  Share your experience to help other learners
                </p>
              </div>

              {/* Star Rating */}
              <div className="mb-6">
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <span 
                        className="material-symbols-outlined" 
                        style={{ 
                          fontSize: 40,
                          color: (hoverRating || rating) >= star ? '#ff6d1f' : 'rgba(34,34,34,.2)',
                          fontVariationSettings: (hoverRating || rating) >= star ? "'FILL' 1" : "'FILL' 0"
                        }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm font-medium" style={{ color: '#222222' }}>
                  {rating === 0 ? 'Select a rating' : 
                   rating === 1 ? 'Poor' :
                   rating === 2 ? 'Fair' :
                   rating === 3 ? 'Good' :
                   rating === 4 ? 'Very Good' :
                   'Excellent'}
                </p>
              </div>

              {/* Comment Textarea */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: '#222222' }}>
                  Your Review (Optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this course..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border resize-none focus:outline-none transition"
                  style={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: '#F5E7C7',
                    color: '#222222'
                  }}
                  maxLength={500}
                />
                <p className="text-xs mt-1 text-right" style={{ color: 'rgba(34,34,34,.5)' }}>
                  {comment.length}/500
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSubmitRating}
                  disabled={submitRatingMutation.isLoading}
                  className="w-full py-3 font-bold rounded-lg text-sm hover:scale-[1.02] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: '#ff6d1f', 
                    color: '#ffffff', 
                    boxShadow: '0 10px 15px -3px rgba(255,109,31,.2)' 
                  }}
                >
                  {submitRatingMutation.isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin size-4 border-2 border-white border-t-transparent rounded-full" />
                      Submitting...
                    </span>
                  ) : (
                    'Submit Rating'
                  )}
                </button>
                <button
                  onClick={handleSkipRating}
                  disabled={submitRatingMutation.isLoading}
                  className="w-full py-3 font-medium text-sm rounded-lg hover:bg-[#F5E7C7]/50 transition disabled:opacity-50"
                  style={{ backgroundColor: 'transparent', color: '#222222' }}
                >
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}