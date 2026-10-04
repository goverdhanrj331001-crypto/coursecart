'use client';

import React from 'react';
import { Award, BookOpen, GraduationCap, Microscope, Cpu, Compass } from 'lucide-react';

export function TrustBanner() {
  const exams = [
    { label: 'Class 10 & 12 Boards', icon: BookOpen, sub: 'CBSE · ICSE · State' },
    { label: 'NEET Medical', icon: Microscope, sub: 'NTA Exam Prep' },
    { label: 'JEE Main & Advanced', icon: Cpu, sub: 'IIT / NIT Entrance' },
    { label: 'CUET UG', icon: GraduationCap, sub: 'Central Universities' },
    { label: 'CSIR NET / GATE', icon: Compass, sub: 'Post-Graduate & PhD' },
  ];

  return (
    <section className="py-6 bg-white border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink shrink-0">
            <Award className="w-4 h-4 text-amber" />
            <span>Built for students preparing across</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-8">
            {exams.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cream border border-line flex items-center justify-center text-navy shrink-0">
                    <Icon className="w-4 h-4 text-navy" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-navy leading-tight">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-muted font-medium">
                      {item.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

