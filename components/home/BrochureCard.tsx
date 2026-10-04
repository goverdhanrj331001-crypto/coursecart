'use client';

import React, { useState } from 'react';
import { Download, CheckCircle2, Sparkles } from 'lucide-react';
import { addNotification } from '@/lib/brainbridge-data';

export function BrochureCard() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [courseGoal, setCourseGoal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !courseGoal) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addNotification(
        {
          name: fullName,
          email: email,
          phone: phone,
        },
        `brochure-${courseGoal}`
      );
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleDownloadPdf = () => {
    const content = `BRAINBRIDGE ACADEMY - OFFICIAL BROCHURE 2026
Learn • Grow • Build Your Future

Popular Courses & Programs (₹499 Flat):
1. Web Development (12 Weeks · Project-Based)
2. Data Science & Machine Learning (10 Weeks · Hands-on)
3. UI/UX Product Design (8 Weeks · Figma)
4. Digital Marketing & Growth (6 Weeks)
5. NEET Medical Foundation & Full Syllabus (14 Weeks)
6. JEE Main & Advanced Mastery (14 Weeks)
7. CUET UG & Board Test Series (10 Weeks)
8. CSIR NET / GATE Physical Sciences (16 Weeks)
9. Class 10 Board Excellence (12 Weeks)

Head Office: Jaipur, Rajasthan, India
Contact: +91-90243-03988
Support: support@brainbridge.in
Director: Surendra Kumar Saini
Applicant Name: ${fullName || 'Student'}
Selected Track: ${courseGoal}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BrainBridge_Brochure_2026_${courseGoal.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 lg:py-20 bg-cream border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy text-white p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">

            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Information Packet</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Download the BrainBridge brochure
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Get the full course list, fee details, demo class timetable and mentor credentials sent directly to your phone and email — no charge, no obligation.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-amber">
                <span>✓ Complete Fee Schedule</span>
                <span>✓ Industry Mentors</span>
                <span>✓ Demo Schedules</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              {submitted ? (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-green mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Brochure Ready for Download!
                  </h3>
                  <p className="text-sm text-slate-300">
                    Thank you, <strong className="text-white">{fullName}</strong>. A copy has been registered for <strong className="text-white">{email}</strong>.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleDownloadPdf}
                      className="inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-hover text-navy px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-md cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Brochure</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-3 text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/90 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/30 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/90 mb-1.5">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/30 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/90 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/30 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/90 mb-1.5">
                        Select Course / Track
                      </label>
                      <select
                        required
                        value={courseGoal}
                        onChange={(e) => setCourseGoal(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-navy border border-white/20 text-white text-sm focus:outline-none focus:border-amber"
                      >
                        <option value="" disabled>Choose course track</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="NEET Medical Foundation">NEET Medical Foundation</option>
                        <option value="JEE Main & Advanced">JEE Main &amp; Advanced</option>
                        <option value="CUET UG / Boards">CUET UG / Boards</option>
                        <option value="CSIR NET / GATE">CSIR NET / GATE</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-hover text-navy py-3.5 px-6 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Preparing Brochure...</span>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Brochure</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-white/50 text-center">
                    By submitting, you agree to be contacted by BrainBridge about this program.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

