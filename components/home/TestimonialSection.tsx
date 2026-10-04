'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial, getTestimonials } from '@/lib/brainbridge-data';
import { dbGetTestimonials } from '@/lib/supabase-service';

export function TestimonialSection() {
  const [activePage, setActivePage] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getTestimonials());

  useEffect(() => {
    let isMounted = true;
    dbGetTestimonials().then((dbT) => {
      if (isMounted && dbT && dbT.length > 0) {
        setTestimonials(dbT);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage) || 1;
  const safeActivePage = activePage >= totalPages ? 0 : activePage;

  const currentTestimonials = testimonials.slice(
    safeActivePage * itemsPerPage,
    (safeActivePage + 1) * itemsPerPage
  );

  return (
    <section className="py-20 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink mb-2.5">
            <span className="w-2 h-2 rounded-full bg-green" />
            <span>Testimonials</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            What Our Learners Say
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted">
            Real stories from real people who have transformed their lives with BrainBridge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 minimum-h-[280px]">
          {currentTestimonials.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-white border border-line rounded-2xl p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>

                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className={`w-11 h-11 rounded-full ${item.avatarBg || 'bg-slate-100 text-slate-800'} font-display font-bold text-sm flex items-center justify-center shrink-0 border border-black/5`}
                  >
                    {item.initials || item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-navy leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted">{item.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4 text-amber">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber text-amber" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-ink leading-relaxed font-normal italic">
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => setActivePage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))}
              className="w-9 h-9 rounded-full border border-line bg-white hover:bg-slate-50 flex items-center justify-center text-navy transition-colors cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    safeActivePage === i ? 'w-4 bg-navy' : 'bg-dot-gray'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActivePage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))}
              className="w-9 h-9 rounded-full border border-line bg-white hover:bg-slate-50 flex items-center justify-center text-navy transition-colors cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

