'use client';

import React from 'react';
import { BookOpen, Smartphone, BarChart3, Users, Star } from 'lucide-react';

export function SolutionSection() {
  const features = [
    {
      title: 'Expert-Led Courses',
      desc: 'Learn from industry experts and experienced mentors.',
      icon: BookOpen,
      iconBg: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Learn Anywhere',
      desc: 'Access your courses on any device, anytime, anywhere.',
      icon: Smartphone,
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'Track Your Progress',
      desc: 'Stay motivated with real-time progress tracking.',
      icon: BarChart3,
      iconBg: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Community Support',
      desc: 'Join a supportive community of learners and mentors.',
      icon: Users,
      iconBg: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Achieve Your Goals',
      desc: 'Build skills, gain confidence, and create new opportunities.',
      icon: Star,
      iconBg: 'bg-rose-100 text-rose-500',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink mb-3">
            <span className="w-2 h-2 rounded-full bg-green" />
            <span>Why Choose BrainBridge</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-navy tracking-tight">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-2xl mx-auto">
            We combine the best of technology and human support to give you learning experience that&apos;s simple, effective, and built around you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-line rounded-2xl p-6 text-center shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
              >

                <div
                  className={`w-14 h-14 rounded-full ${item.iconBg} flex items-center justify-center mb-5 shrink-0 transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-display text-base font-bold text-navy mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-muted leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

