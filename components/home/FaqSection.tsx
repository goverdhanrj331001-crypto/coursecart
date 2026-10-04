'use client';

import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      q: 'Is the free demo really free?',
      a: 'Yes. Every course includes free demo content — a live or recorded class and a sample of the study material — before you pay anything.',
    },
    {
      q: 'What does the ₹499 course fee include?',
      a: 'Live classes, recorded lectures, a test series, doubt-solving access and downloadable study material PDFs for that course.',
    },
    {
      q: 'Do I need to clear an entrance test to join?',
      a: 'No. Any student, college learner, or competitive exam aspirant can enroll directly after the free demo.',
    },
    {
      q: 'Can I study at my own pace?',
      a: 'Yes. Recorded lectures and PDFs stay available anytime on your dashboard, alongside scheduled live classes for students who want a fixed routine.',
    },
    {
      q: 'How do I get my doubts solved?',
      a: 'Post your question from the dashboard and faculty responds directly — no waiting on a public forum.',
    },
    {
      q: 'Can I access the courses and test series on mobile phones?',
      a: 'Yes. The entire BrainBridge platform is responsive and optimized for mobile devices, tablets, and desktops. You can attend classes and practice test series smoothly on any standard mobile browser.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 lg:py-24 bg-cream border-t border-line">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink mb-2.5">
            <span className="w-2 h-2 rounded-full bg-green" />
            <span>FAQ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Frequently asked questions
          </h2>

          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. demo, fee, doubts)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-line text-ink focus:outline-none focus:border-navy"
            />
          </div>
        </div>

        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-line rounded-2xl bg-white overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-display font-semibold text-base sm:text-lg text-navy hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-cream border border-line flex items-center justify-center text-navy shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-navy text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted leading-relaxed border-t border-line">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

