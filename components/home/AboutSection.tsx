'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

interface AboutSectionProps {
  onOpenVideo?: () => void;
  onLearnMore?: () => void;
}

export function AboutSection({ onOpenVideo, onLearnMore }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green">
              <span className="w-2 h-2 rounded-full bg-green" />
              <span>About BrainBridge</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[50px] font-bold text-white tracking-tight leading-tight">
              More Than Just Courses
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              BrainBridge is a modern learning platform designed to help you build real skills, gain confidence, and achieve your goals. We believe in hands-on learning, expert guidance, and a supportive community — because your success matters.
            </p>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber-hover text-navy px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-sans text-white">
                  5+
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Years of Impact</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-sans text-white">
                  50+
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Expert Instructors</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-sans text-white">
                  100K+
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Happy Learners</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-4/3 max-w-xl mx-auto group">
              <Image
                src="/images/about_learner.jpg"
                alt="Learner achieving growth with BrainBridge"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

              <div className="absolute top-6 right-6 z-20 pointer-events-none select-none text-right">
                <span className="font-handwriting text-2xl sm:text-3xl text-white font-bold leading-tight drop-shadow-md inline-block rotate-2">
                  Real People<br />
                  Real Growth
                </span>
              </div>

              <button
                onClick={onOpenVideo}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-amber hover:text-navy transition-all cursor-pointer shadow-lg z-20"
                aria-label="Play video about BrainBridge"
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

