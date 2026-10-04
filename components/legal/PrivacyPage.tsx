'use client';

import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Eye, CheckCircle2 } from 'lucide-react';

interface PrivacyPageProps {
  onBackHome: () => void;
}

export function PrivacyPage({ onBackHome }: PrivacyPageProps) {
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
            <Lock className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">DATA SECURITY &amp; PRIVACY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: January 15, 2026 • We respect your privacy and protect your personal information.
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
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[navy] flex items-center justify-center text-xs font-black">1</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              When you interact with BrainBridge, we collect necessary information to provide you with seamless course access and student support:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Account Registration:</strong> Name, email address, mobile number, and target exam interest.</li>
              <li><strong>Learning Analytics:</strong> Video progress, quiz scores, completed modules, and certificate records.</li>
              <li><strong>Technical Data:</strong> IP address, device browser type, and session timestamps for security monitoring.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-[navy] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[navy] flex items-center justify-center text-xs font-black">2</span>
              <span>How We Use Your Data</span>
            </h2>
            <p>
              Your data is strictly used to enhance your learning journey:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <strong className="text-slate-900 block font-bold">Course Delivery</strong>
                <p className="text-slate-500">To grant instant access to enrolled video modules and downloadable study notes.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <strong className="text-slate-900 block font-bold">Mentor Support</strong>
                <p className="text-slate-500">To connect you with WhatsApp &amp; live chat doubt resolution mentors.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-[navy] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[navy] flex items-center justify-center text-xs font-black">3</span>
              <span>Payment Security Guarantee</span>
            </h2>
            <p>
              BrainBridge <strong>does not store</strong> your debit/credit card numbers, CVVs, or bank netbanking passwords. All payment transactions are processed through 256-Bit SSL Encrypted Razorpay tokenization gateways.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-[navy] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[navy] flex items-center justify-center text-xs font-black">4</span>
              <span>Data Protection &amp; Zero Spam Promise</span>
            </h2>
            <p>
              We promise never to sell, rent, or trade your personal contact details to third-party marketing companies or advertisers.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>To request profile data deletion, contact <strong className="text-slate-900">[your-privacy-contact@domain.com]</strong></span>
            <button
              onClick={onBackHome}
              className="bg-[navy] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[navy-dark] transition-colors"
            >
              Close &amp; Return Home
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

