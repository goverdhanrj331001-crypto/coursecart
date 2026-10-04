'use client';

import React from 'react';
import { ArrowLeft, ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';

interface TermsPageProps {
  onBackHome: () => void;
}

export function TermsPage({ onBackHome }: TermsPageProps) {
  return (
    <div className="min-h-screen bg-[cream] pb-20">

      <div className="bg-[navy] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">LEGAL POLICIES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Terms &amp; Conditions of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: January 15, 2026 • Please read these terms carefully before using BrainBridge services.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 space-y-8 text-sm text-slate-700 leading-relaxed">
          <div className="p-4 bg-amber/10 border border-amber/30 rounded-xl mb-6 text-xs">
            <strong>⚠️ NOTICE:</strong> These are sample template legal texts for demonstration only. Replace with text reviewed by a qualified legal counsel before production use.
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-[navy] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-[navy] flex items-center justify-center text-xs font-black">1</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p>
              By accessing, browsing, registering for, or purchasing any course on <strong>BrainBridge</strong> (&quot;Platform&quot;), you agree to be bound by these Terms &amp; Conditions. If you do not agree to all terms, you may not access or use our educational services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-[navy] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-[navy] flex items-center justify-center text-xs font-black">2</span>
              <span>Student Account &amp; Course Access</span>
            </h2>
            <p>
              When you enroll in a course, you receive a personal, non-exclusive, non-transferable license to view video lectures and access study materials.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Account credentials (email/password) must not be shared with external individuals.</li>
              <li>Unauthorized downloading, recording, or re-distribution of course video modules is strictly prohibited.</li>
              <li>BrainBridge reserves the right to suspend accounts engaged in fraudulent activity or screen recording abuse.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-[navy] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-[navy] flex items-center justify-center text-xs font-black">3</span>
              <span>Payment Terms &amp; Money-Back Guarantee</span>
            </h2>
            <p>
              All payments are processed securely via encrypted gateway engines (Razorpay / Cashfree).
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <strong className="block text-emerald-900 font-extrabold">7-Day Full Refund Guarantee:</strong>
              <p>
                If you are dissatisfied with a purchased course within 7 days of enrollment, you may request a 100% full refund by contacting admissions support at <code>[your-support-contact@domain.com]</code>.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-[navy] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-[navy] flex items-center justify-center text-xs font-black">4</span>
              <span>Intellectual Property Rights</span>
            </h2>
            <p>
              All course curriculums, video materials, source code samples, PDF formula cheat sheets, and logos are the sole intellectual property of BrainBridge Learning Inc. All rights reserved.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-[navy] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-[navy] flex items-center justify-center text-xs font-black">5</span>
              <span>Modifications &amp; Service Updates</span>
            </h2>
            <p>
              BrainBridge continuously updates course content to reflect new industry standards, frameworks, and board exam syllabus revisions. We reserve the right to modify these terms at any time.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>Questions? Email us at <strong className="text-slate-900">[your-legal-contact@domain.com]</strong></span>
            <button
              onClick={onBackHome}
              className="bg-[navy] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[navy-dark] transition-colors"
            >
              I Understand &amp; Agree
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

