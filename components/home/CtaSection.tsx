'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  onGetStarted: () => void;
  onExploreCourses: () => void;
}

export function CtaSection({
  onGetStarted,
  onExploreCourses,
}: CtaSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy text-white overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">

            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green">
                <span className="w-2 h-2 rounded-full bg-green" />
                <span>Your Future Starts Here</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-tight">
                Ready to Build a Better You?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                Join thousands of learners and take the first step towards your goals.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center gap-2 bg-amber hover:bg-amber-hover text-navy px-6 py-3.5 rounded-lg text-sm font-bold transition-all shadow-xs cursor-pointer hover:shadow"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onExploreCourses}
                  className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white px-6 py-3.5 rounded-lg text-sm font-semibold transition-all hover:bg-white/5 cursor-pointer"
                >
                  <span>Explore Courses</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[320px] w-full">
              <Image
                src="/images/cta_desk_workspace_1790356932349.jpg"
                alt="Workspace with study books, laptop and coffee"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-linear-to-r from-navy via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

