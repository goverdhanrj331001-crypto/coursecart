'use client';

import React from 'react';
import Image from 'next/image';
import { FileText, CheckCircle2 } from 'lucide-react';

export function StudyMaterialSection() {
  const materials = [
    {
      type: 'concept' as const,
      tag: 'PDF · Chapter Notes',
      title: 'Concept Notes',
      desc: 'Short, high-yield summaries for every module — core concepts, key formulas, and architecture diagrams without unnecessary padding.',
      pages: '45+ Modules Available',
      badge: 'All Chapters Included',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-navy/90 via-navy/60 to-black/30',
    },
    {
      type: 'formula' as const,
      tag: 'PDF · Quick Revision Sheets',
      title: 'Rapid Revision Sheets',
      desc: 'One-page formula maps and definition digests engineered for last-minute review right before mock tests and entrance assessments.',
      pages: '100% Exam Formulae',
      badge: 'Updated 2026 Edition',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-[#065F46]/90 via-[#047857]/60 to-black/30',
    },
    {
      type: 'practice' as const,
      tag: 'PDF · Question Banks',
      title: 'Graded Question Banks',
      desc: 'Problem sets organized systematically from foundation level to previous 10-year exam questions (PYQs) with step-by-step solutions.',
      pages: '2,500+ Practice MCQs',
      badge: 'Step-by-Step Solutions',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-[#B45309]/90 via-[#D97706]/60 to-black/30',
    },
  ];

  return (
    <section id="material" className="py-20 lg:py-24 bg-cream border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink mb-2.5">
            <span className="w-2 h-2 rounded-full bg-green" />
            <span>Study Material</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Notes built to revise from, <span className="italic font-normal text-amber">not just read once.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
            Every course comes with downloadable PDFs — chapter notes, formula sheets and practice questions you can study offline, anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {materials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-line rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>

                <div className="h-44 sm:h-48 relative overflow-hidden flex flex-col justify-between p-5 text-white">

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} transition-opacity duration-300`} />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-white font-bold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
                      {item.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/25 group-hover:bg-white/30 transition-colors">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block text-xs text-white font-mono font-bold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                      {item.pages}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-display text-xl font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    Included with Enrollment
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

