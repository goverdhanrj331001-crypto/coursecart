'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Play, Star, BookOpen, BarChart3, Users } from 'lucide-react';

interface HeroProps {
  heading?: string;
  lede?: string;
  onExploreCourses: () => void;
  onOpenDemo: (courseId?: string) => void;
}

export function Hero({
  heading,
  lede,
  onExploreCourses,
  onOpenDemo,
}: HeroProps) {
  return (
    <section id="home" className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          <div className="lg:col-span-7 space-y-6">

            <div className="inline-flex items-center gap-2.5 text-xs font-bold text-ink tracking-widest uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-green" />
              <span>Learn • Grow • Build Your Future</span>
            </div>

            {heading ? (
              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold text-navy tracking-tight leading-[1.08]"
                dangerouslySetInnerHTML={{ __html: heading }}
              />
            ) : (
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold text-navy tracking-tight leading-[1.08]">
                BrainBridge —<br />
                Learn What Moves<br />
                You <span className="italic font-normal text-amber">Forward</span>
              </h1>
            )}

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              {lede ??
                'Personalized learning for a brighter future. Get access to expert-led courses, interactive lessons, and the right support to achieve your goals.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onExploreCourses}
                className="inline-flex items-center gap-2 bg-navy hover:bg-navy-hero-hover text-white px-7 py-3.5 rounded-lg text-sm font-semibold transition-all shadow-xs hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenDemo('web-dev')}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white text-navy border border-navy/30 hover:border-navy px-6 py-3.5 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-navy text-navy ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 pt-8 border-t border-line max-w-2xl">
              <div className="pr-4 sm:pr-6 border-r border-line mb-4 sm:mb-0">
                <div className="font-sans text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                  50+
                </div>
                <div className="text-xs text-muted mt-0.5 font-medium">Expert Courses</div>
              </div>
              <div className="px-4 sm:px-6 sm:border-r border-line mb-4 sm:mb-0">
                <div className="font-sans text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                  10K+
                </div>
                <div className="text-xs text-muted mt-0.5 font-medium">Active Learners</div>
              </div>
              <div className="pr-4 sm:px-6 border-r border-line">
                <div className="font-sans text-2xl sm:text-3xl font-bold text-navy tracking-tight flex items-center gap-1">
                  <span>4.8</span>
                  <Star className="w-4 h-4 fill-amber text-amber -mt-1" />
                </div>
                <div className="text-xs text-muted mt-0.5 font-medium">Average Rating</div>
              </div>
              <div className="pl-4 sm:pl-6">
                <div className="font-sans text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                  100%
                </div>
                <div className="text-xs text-muted mt-0.5 font-medium">Flexible Learning</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">

            <div className="relative w-full max-w-[440px] aspect-4/5">

              <div className="absolute -top-4 left-0 sm:-left-6 z-20 pointer-events-none select-none">
                <div className="font-handwriting text-2xl sm:text-3xl text-ink font-bold leading-tight -rotate-12">
                  Better<br />
                  Skills<br />
                  Brighter<br />
                  Future
                </div>
                <svg className="w-16 h-10 text-amber -mt-2 ml-4 -rotate-12" viewBox="0 0 100 50" fill="none">
                  <path d="M10,40 Q50,0 90,30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-amber/25 -z-10" />

              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/hero_indian_student_1790356905238.jpg"
                  alt="Joyful student learning with BrainBridge"
                  fill
                  className="object-cover object-top"
                  priority
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="absolute top-8 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md border border-line rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-3 z-20 hover:scale-105 transition-transform">
                <div className="w-9 h-9 rounded-lg bg-navy text-amber flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-muted">Learn</div>
                  <div className="text-xs font-bold text-navy">Anytime</div>
                </div>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md border border-line rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-3 z-20 hover:scale-105 transition-transform">
                <div className="w-9 h-9 rounded-lg bg-amber/15 text-amber flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4 text-amber-hover" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-muted">Track</div>
                  <div className="text-xs font-bold text-navy">Progress</div>
                </div>
              </div>

              <div className="absolute bottom-10 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md border border-line rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-3 z-20 hover:scale-105 transition-transform">
                <div className="w-9 h-9 rounded-lg bg-green/15 text-green flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-green" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-muted">Get</div>
                  <div className="text-xs font-bold text-navy">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

