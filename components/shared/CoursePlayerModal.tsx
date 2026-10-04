'use client';

import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  CheckCircle2,
  FileText,
  MessageSquare,
  Sparkles,
  Volume2,
  Maximize2,
  Send,
  Download,
} from 'lucide-react';
import { getCourseById } from '@/lib/brainbridge-data';

interface CoursePlayerModalProps {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CoursePlayerModal({
  courseId,
  isOpen,
  onClose,
}: CoursePlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [doubtText, setDoubtText] = useState('');
  const [doubtSent, setDoubtSent] = useState(false);

  if (!isOpen) return null;

  const course = getCourseById(courseId);

  if (!course) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="bg-navy-student text-cream-student rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/10 text-center space-y-4">
          <h3 className="font-display font-bold text-lg text-white">Course Details Not Found</h3>
          <p className="text-xs text-cream-student/75">
            Database me is course ka video content uplabdh nahi hai (0 data found).
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-student text-navy-student rounded-xl text-xs font-bold hover:bg-amber-student-deep transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const lessons = (course.curriculumList && course.curriculumList.length > 0)
    ? course.curriculumList.map((m, idx) => ({
        title: m.title,
        duration: m.duration || '45 mins',
        freeDemo: idx === 0,
        topic: m.lectures || `Module ${idx + 1}`,
      }))
    : [
        {
          title: `Lecture 01: Introduction to ${course.name}`,
          duration: course.duration || '45 mins',
          freeDemo: true,
          topic: course.description || 'Core concepts overview',
        },
      ];

  const handleSendDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    setDoubtSent(true);
    setTimeout(() => {
      setDoubtText('');
      setDoubtSent(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-navy-student text-cream-student w-full max-w-5xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-student-deep text-navy-student font-mono font-bold text-xs flex items-center justify-center">
              Bb
            </span>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white line-clamp-1">
                {course.name}
              </h3>
              <p className="text-xs text-amber-student/80">
                {course.faculty} · ₹499 Complete Cohort
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">

          <div className="lg:col-span-8 p-4 sm:p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-white/10">

            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-inner border border-white/10 group flex items-center justify-center">

              <div className="absolute inset-0 bg-radial from-slate-900 to-black p-6 flex flex-col justify-between text-white/90">
                <div className="flex justify-between items-center text-xs font-mono text-amber-student">
                  <span>BRAINBRIDGE LIVE STREAM</span>
                  <span>1080p HD · 60fps</span>
                </div>
                <div className="text-center space-y-2">
                  <span className="inline-block px-2.5 py-1 bg-amber-student-deep/20 text-amber-student rounded text-xs font-mono font-semibold">
                    {lessons[activeLessonIdx].title}
                  </span>
                  <p className="text-xs text-white/70 max-w-md mx-auto">
                    {lessons[activeLessonIdx].topic}
                  </p>
                  <p className="text-[11px] text-white/40 font-mono">
                    Faculty: {course.faculty}
                  </p>
                </div>
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>Unit: Mechanics &amp; Problem Solving</span>
                  <span>Audio: Active</span>
                </div>
              </div>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative z-10 w-16 h-16 rounded-full bg-amber-student-deep text-navy-student flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-navy-student" />
                ) : (
                  <Play className="w-7 h-7 fill-navy-student ml-1" />
                )}
              </button>

              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black via-black/70 to-transparent p-3 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px]">18:34 / {lessons[activeLessonIdx].duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4" />
                  <span className="px-1.5 py-0.5 rounded bg-white/20 font-mono text-[10px]">1.0x</span>
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-display font-bold text-lg text-white">
                  {lessons[activeLessonIdx].title}
                </h4>
              </div>
              <p className="text-xs text-cream-student/70">
                {lessons[activeLessonIdx].topic}
              </p>

              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span className="flex items-center gap-1.5 text-amber-student">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask Faculty a Doubt</span>
                  </span>
                  <span className="text-[11px] font-mono text-white/50">Response within 24h</span>
                </div>

                {doubtSent ? (
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Doubt submitted! Dr. Sharma will address this in the next live segment.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSendDoubt} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your question or formula confusion..."
                      value={doubtText}
                      onChange={(e) => setDoubtText(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-student-deep"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-lg bg-amber-student-deep hover:bg-amber-student text-navy-student text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-4 sm:p-6 space-y-4 bg-white/5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="font-display font-bold text-sm text-white">
                  Course Lectures
                </h4>
                <span className="text-xs font-mono text-amber-student">
                  {lessons.length} Modules
                </span>
              </div>

              <div className="space-y-2">
                {lessons.map((lesson, idx) => {
                  const isActive = activeLessonIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveLessonIdx(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-student-deep/20 border-amber-student-deep text-white shadow-xs'
                          : 'bg-black/20 border-white/10 hover:bg-white/10 text-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono font-semibold text-amber-student">
                          Session {idx + 1}
                        </span>
                        <span className="text-[11px] text-white/60 font-mono">
                          {lesson.duration}
                        </span>
                      </div>
                      <div className="text-xs font-medium line-clamp-1">{lesson.title}</div>
                      <div className="text-[11px] text-white/50 mt-1 flex items-center justify-between">
                        <span>{lesson.freeDemo ? 'Free Preview' : 'Cohort Only'}</span>
                        {isActive && <span className="text-emerald-400 font-bold">Now Playing</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono">
              <span>Full Batch Access</span>
              <span className="text-emerald-400">Lifetime Validity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

