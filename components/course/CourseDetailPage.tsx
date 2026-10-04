'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  BarChart,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
  ArrowRight,
  Link as LinkIcon,
  Video,
  Code2,
  Download,
  Award,
  Users2,
  RefreshCw,
  Search,
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook,
  X,
  Volume2,
  VolumeX,
  BookOpen,
} from 'lucide-react';
import {
  Course,
  getStoredCourses,
  getCourseCurriculum,
  CourseLesson,
  SessionUser,
} from '@/lib/brainbridge-data';
import { dbGetCourses } from '@/lib/supabase-service';

interface CourseDetailPageProps {
  courseId: string;
  session?: SessionUser | null;
  onBack: () => void;
  onEnroll: (course: Course) => void;
  onSelectCourse: (newCourseId: string) => void;
}

export function CourseDetailPage({
  courseId,
  session,
  onBack,
  onEnroll,
  onSelectCourse,
}: CourseDetailPageProps) {
  const [coursesList, setCoursesList] = useState<Course[]>(() => {
    return getStoredCourses();
  });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    let isMounted = true;
    dbGetCourses()
      .then((dbC) => {
        if (isMounted) {
          if (dbC && dbC.length > 0) {
            setCoursesList(dbC);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const course = coursesList.find((c) => c.id === courseId);

  const [selectedVideoIdx, setSelectedVideoIdx] = useState(0);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'projects'>('overview');
  const [expandedModules, setExpandedModules] = useState<Record<string | number, boolean>>({
    0: true,
    m1: true,
  });

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&rel=0`
      : null;
  };

  const toggleModule = (modId: string | number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const scrollToSection = (id: string, tab: typeof activeTab) => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center p-8">
        <div className="animate-pulse space-y-4 max-w-md w-full text-center">
          <div className="h-8 bg-slate-100 rounded-lg w-3/4 mx-auto" />
          <div className="h-4 bg-slate-100 rounded-lg w-1/2 mx-auto" />
          <div className="h-40 bg-slate-100 rounded-2xl w-full" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-[navy]">Course Details Not Available</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          Database me is course ka data uplabdh nahi hai (0 course data found).
        </p>
        <button
          onClick={onBack}
          className="mt-6 px-6 py-2.5 bg-[navy] text-white rounded-xl text-xs font-bold hover:bg-[navy-dark] transition-colors cursor-pointer"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const videoList = (course.videoUrls && course.videoUrls.length > 0)
    ? course.videoUrls
    : (course.videoUrl ? [course.videoUrl] : []);

  const currentVideoUrl = videoList[selectedVideoIdx] || course.videoUrl;
  const ytEmbedUrl = getYouTubeEmbedUrl(currentVideoUrl);

  const activeCurriculum = Array.isArray(course.curriculumList) && course.curriculumList.length > 0
    ? course.curriculumList
    : [];

  const activeWhatYoullLearn = Array.isArray(course.whatYouWillLearn)
    ? course.whatYouWillLearn
    : [];

  return (
    <div className="bg-white text-[ink] min-h-screen pb-20 font-sans selection:bg-blue-100">

      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={onBack}
              className="text-slate-600 hover:text-[navy] font-medium flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-slate-300 font-mono">&gt;</span>
            <button onClick={onBack} className="hover:text-[navy] cursor-pointer">
              Courses
            </button>
            <span className="text-slate-300 font-mono">&gt;</span>
            <span className="text-slate-500">{course.category || 'Engineering & Tech'}</span>
            <span className="text-slate-300 font-mono">&gt;</span>
            <span className="text-[navy] font-semibold truncate max-w-xs">{course.name}</span>
          </div>

          <button
            onClick={onBack}
            className="text-xs text-slate-500 hover:text-[navy] font-medium underline sm:hidden"
          >
            ← Back
          </button>
        </div>
      </div>

      <section className="bg-gradient-to-b from-[cream] via-[cream] to-white border-b border-slate-100 pt-8 pb-12 lg:pt-10 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            <div className="lg:col-span-7 space-y-4">

              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[amber] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-2xs tracking-wider uppercase">
                  BESTSELLER
                </span>
                <span className="bg-[cream] text-[navy] text-xs font-semibold px-2.5 py-0.5 rounded">
                  {course.category || 'Engineering & Tech'}
                </span>
                <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-0.5 rounded">
                  {course.name}
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[navy] tracking-tight leading-tight">
                  {course.name}
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-[ink] mt-1.5">
                  Complete Guide from Basics to Advanced
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {course.aboutCourse || course.description || 'Learn modern technologies with hands-on practice.'}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onEnroll(course)}
                  className="inline-flex items-center gap-2 bg-[navy] hover:bg-[navy-dark] text-white px-7 py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Enroll Now ₹{course.price || 499}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xl">
                {ytEmbedUrl ? (
                  <iframe
                    key={currentVideoUrl}
                    src={ytEmbedUrl}
                    title={`Course Preview Video ${selectedVideoIdx + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div
                    onClick={() => setIsVideoModalOpen(true)}
                    className="relative w-full h-full cursor-pointer group"
                  >
                    <Image
                      src={course.image || '/images/course_web_dev_1790356954573.jpg'}
                      alt={course.name}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />

                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-md">
                      Free Demo Class
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/85 text-[navy] flex items-center justify-center shadow-2xl backdrop-blur-xs group-hover:scale-110 group-hover:bg-white transition-all">
                        <Play className="w-7 h-7 fill-[navy] text-[navy] ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {videoList.length > 1 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[navy] flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-red-500" />
                      <span>Demo Classes ({videoList.length} Videos)</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      Playing {selectedVideoIdx + 1} of {videoList.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {videoList.map((vidUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedVideoIdx(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                          selectedVideoIdx === idx
                            ? 'bg-[navy] text-amber-400 shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Play className="w-3 h-3" />
                        <span>Video {idx + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-20 z-20 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-8 overflow-x-auto text-sm font-medium text-slate-500 py-0 scrollbar-none">
            <button
              onClick={() => scrollToSection('sec-overview', 'overview')}
              className={`py-3.5 transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-[navy] text-[navy] font-bold'
                  : 'border-transparent hover:text-[navy]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('sec-curriculum', 'curriculum')}
              className={`py-3.5 transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'curriculum'
                  ? 'border-[navy] text-[navy] font-bold'
                  : 'border-transparent hover:text-[navy]'
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => scrollToSection('sec-instructor', 'instructor')}
              className={`py-3.5 transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'instructor'
                  ? 'border-[navy] text-[navy] font-bold'
                  : 'border-transparent hover:text-[navy]'
              }`}
            >
              Instructor
            </button>
            <button
              onClick={() => scrollToSection('sec-projects', 'projects')}
              className={`py-3.5 transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-[navy] text-[navy] font-bold'
                  : 'border-transparent hover:text-[navy]'
              }`}
            >
              What You&apos;ll Learn
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          <div className="lg:col-span-8 space-y-12">

            <section id="sec-overview" className="scroll-mt-36 space-y-4">
              <h2 className="text-2xl font-bold text-[navy] tracking-tight">
                About This Course
              </h2>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3">
                <p>{course.aboutCourse || course.description}</p>
              </div>
            </section>

            <section id="sec-projects" className="scroll-mt-36 space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[navy] tracking-tight">
                  What You&apos;ll Learn
                </h2>
              </div>

              {activeWhatYoullLearn.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeWhatYoullLearn.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 px-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    No learning outcomes added for this course yet.
                  </p>
                </div>
              )}
            </section>

            <section id="sec-curriculum" className="scroll-mt-36 space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h2 className="text-2xl font-bold text-[navy] tracking-tight">
                  Course Curriculum
                </h2>
                {activeCurriculum.length > 0 && (
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">
                    {activeCurriculum.length} Modules
                  </span>
                )}
              </div>

              {activeCurriculum.length > 0 ? (
                <div className="space-y-2.5 pt-1">
                  {activeCurriculum.map((mod, idx) => (
                    <div
                      key={mod.id || idx}
                      className="border border-slate-200/90 rounded-xl overflow-hidden bg-white shadow-2xs px-4 py-3.5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[navy]">
                          {mod.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 px-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    No curriculum modules available for this course yet.
                  </p>
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-amber-200">
                  Limited Time Offer
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  SPECIAL PRICE
                </span>
              </div>

              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl font-extrabold text-[navy] tracking-tight">
                  ₹{course.price || 499}
                </span>
                <span className="text-base text-slate-400 line-through">
                  ₹{course.originalPrice || 4999}
                </span>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => onEnroll(course)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[navy] hover:bg-[navy-dark] text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Enroll Now ₹{course.price || 499}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{course.duration || '10 Weeks'} Access</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Downloadable Notes &amp; Code</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Certificate of Completion</span>
                </div>
              </div>
            </div>

            <div id="sec-instructor" className="scroll-mt-36 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <h3 className="text-base font-bold text-[navy]">Instructor</h3>

              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <Image
                    src={course.instructorImage || '/images/about_indian_learner_1790356918835.jpg'}
                    alt={course.faculty || 'Instructor'}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[navy]">{course.faculty || 'Surendra Kumar Saini'}</h4>
                  <p className="text-xs text-slate-500">{course.instructorTitle || 'Lead Faculty & Mentor'}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {course.instructorBio || `With extensive industry and teaching experience, ${course.faculty || 'Instructor'} has mentored thousands of students to master core concepts and land high-paying software jobs.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[navy] text-white w-full max-w-4xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">

            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-lg">
                  {course.name} - Free Demo
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-slate-950 flex flex-col justify-between">
              {ytEmbedUrl ? (
                <iframe
                  src={ytEmbedUrl}
                  title={course.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="relative w-full h-full flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between text-xs text-white/80 z-10">
                    <span className="bg-black/60 px-2.5 py-1 rounded border border-white/10">
                      Topic: {course.name} Demo
                    </span>
                    <span className="font-mono text-amber-300">Free Preview Demo</span>
                  </div>

                  <div className="my-auto text-center space-y-3 z-10">
                    <div className="text-xs text-slate-400 font-mono">BrainBridge Online Classroom</div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white max-w-md mx-auto">
                      {course.name}
                    </h4>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 rounded-full bg-white text-[navy] inline-flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer mt-2"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current text-[navy]" />
                      ) : (
                        <Play className="w-6 h-6 fill-current text-[navy] ml-1" />
                      )}
                    </button>
                  </div>

                  <div className="z-10 bg-gradient-to-t from-black/90 to-transparent p-3 -mx-6 -mb-6 space-y-2">
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all"
                        style={{ width: isPlaying ? '45%' : '45%' }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/80 px-1">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white">
                          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span className="font-mono text-[11px] text-slate-300">
                          05:40 / 15:00
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsVideoModalOpen(false);
                          onEnroll(course);
                        }}
                        className="bg-amber-400 hover:bg-amber-500 text-[navy] font-bold px-3 py-1 rounded text-xs transition-colors cursor-pointer"
                      >
                        Enroll Now (₹{course.price || 499})
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">

          <div className="min-w-0 flex-1">
            <span className="font-bold text-xs sm:text-sm text-[navy] truncate block">
              {course.name}
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-sm sm:text-base font-extrabold text-[navy]">
                ₹{course.price || 499}
              </span>
              <span className="text-[11px] text-slate-400 line-through">
                ₹{course.originalPrice || 4999}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1 rounded">
                90% OFF
              </span>
            </div>
          </div>

          <button
            onClick={() => onEnroll(course)}
            className="inline-flex items-center justify-center gap-1.5 bg-[navy] hover:bg-[navy-dark] text-white px-4 py-2.5 rounded-lg text-xs font-bold shrink-0 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span>Enroll Now ₹{course.price || 499}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

