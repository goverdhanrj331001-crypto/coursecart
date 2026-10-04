'use client';

import React from 'react';
import { ArrowRight, UserPlus, Play, CreditCard, Laptop, CheckCircle2 } from 'lucide-react';

interface AdmissionSectionProps {
  onOpenDemo: (courseId?: string) => void;
  onExploreCourses: () => void;
}

export function AdmissionSection({
  onOpenDemo,
  onExploreCourses,
}: AdmissionSectionProps) {
  const steps = [
    {
      step: '01',
      title: 'Pick a Course',
      desc: 'Browse your target program — Web Development, Data Science, NEET, JEE, or CUET — and check the syllabus.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Try the Free Demo',
      desc: 'Watch real lecture recordings or attend an open demo class before you pay anything.',
      icon: Play,
    },
    {
      step: '03',
      title: 'Pay Flat ₹499',
      desc: 'One flat fee per course — UPI, card or net banking, zero hidden fees or automatic renewals.',
      icon: CreditCard,
    },
    {
      step: '04',
      title: 'Start Learning',
      desc: 'Instant unlocking of classes, recorded lectures, test series and study material on your dashboard.',
      icon: Laptop,
    },
  ];

  const criteria = [
    {
      label: 'Eligibility',
      value: 'Class 10 & 12 students, college undergrads, working professionals or any competitive exam aspirant — no entrance test required.',
    },
    {
      label: 'Course Duration',
      value: 'Self-paced lifetime access, with live cohort batches running 6–14 weeks depending on the program.',
    },
    {
      label: 'Course Fee',
      value: '₹499 per course flat · free demo content and full study material included.',
    },
    {
      label: 'Syllabus & Curriculum',
      value: 'Structured industry/NTA curriculum taught step-by-step from foundational basics to expert problem solving.',
    },
    {
      label: 'Mode of Delivery',
      value: 'Interactive live sessions + recorded HD video archive + downloadable PDF notes, accessible 24/7 on desktop and mobile.',
    },
  ];

  return (
    <section id="admission" className="py-20 lg:py-24 bg-cream border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink mb-2.5">
            <span className="w-2 h-2 rounded-full bg-green" />
            <span>Admission Process</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Enrolled in four simple steps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
            No entrance test, no long paperwork — start with a free demo and enroll whenever you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-line rounded-2xl p-6 relative hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-navy text-amber flex items-center justify-center font-display font-bold text-sm shadow-xs">
                    {item.step}
                  </span>
                  <Icon className="w-5 h-5 text-muted" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 bg-navy text-white flex items-center justify-between">
            <h3 className="font-display text-base sm:text-lg font-semibold text-white">
              Enrollment &amp; Program Details
            </h3>
            <span className="text-xs font-mono text-amber">Session 2026</span>
          </div>
          <div className="divide-y divide-line">
            {criteria.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:px-6 items-baseline gap-2 md:gap-6 hover:bg-cream transition-colors"
              >
                <div className="md:col-span-3 text-xs sm:text-sm font-bold text-navy uppercase tracking-wide">
                  {row.label}
                </div>
                <div className="md:col-span-9 text-xs sm:text-sm text-muted leading-relaxed font-normal">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-line">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-navy">
              Try a free demo class before paying anything
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenDemo('web-dev')}
              className="px-4 py-2 bg-cream border border-line hover:bg-white text-xs font-semibold text-navy rounded-lg transition-colors cursor-pointer"
            >
              Watch Free Demo Class
            </button>
            <button
              onClick={onExploreCourses}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy hover:bg-navy-hero-hover text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

