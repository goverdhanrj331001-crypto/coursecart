'use client';

import React from 'react';
import { Save } from 'lucide-react';
import { RazorpayConfig } from '@/lib/brainbridge-data';

interface AdminPaymentTabProps {
  razorpayConfig: RazorpayConfig;
  setRazorpayConfig: React.Dispatch<React.SetStateAction<RazorpayConfig>>;
  onToggleRazorpay: () => void;
  onSaveRazorpay: (e: React.FormEvent) => void;
}

export function AdminPaymentTab({
  razorpayConfig,
  setRazorpayConfig,
  onToggleRazorpay,
  onSaveRazorpay,
}: AdminPaymentTabProps) {
  return (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-black text-navy-admin">Payment Gateway Integration</h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure your official Razorpay Payment Engine. Enable or disable Razorpay checkout anytime.
        </p>
      </div>

      <div className="bg-white rounded-3xl border-2 border-navy-admin p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-admin text-white flex items-center justify-center font-black text-xl shadow-md">
              R
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-navy-admin">Razorpay Gateway</h3>
              <p className="text-xs text-slate-500">Official Instant Payment Processor for India</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">
              {razorpayConfig.enabled ? 'Enabled' : 'Disabled'}
            </span>
            <button
              type="button"
              onClick={onToggleRazorpay}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                razorpayConfig.enabled ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                  razorpayConfig.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <form onSubmit={onSaveRazorpay} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Razorpay Key ID *
            </label>
            <input
              type="text"
              required
              value={razorpayConfig.keyId}
              onChange={(e) => setRazorpayConfig({ ...razorpayConfig, keyId: e.target.value })}
              placeholder="rzp_live_xxxxxxxxxxxx"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-navy-admin focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Razorpay Key Secret *
            </label>
            <input
              type="password"
              required
              value={razorpayConfig.keySecret}
              onChange={(e) => setRazorpayConfig({ ...razorpayConfig, keySecret: e.target.value })}
              placeholder="••••••••••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-navy-admin focus:bg-white"
            />
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 space-y-1">
            <strong className="block font-extrabold">Active Modes Supported:</strong>
            <p>
              Google Pay, PhonePe, Paytm, BHIM UPI, Visa/Mastercard/RuPay Debit &amp; Credit Cards, NetBanking (50+ Banks).
            </p>
          </div>

          <button
            type="submit"
            className="bg-navy-admin hover:bg-navy-admin-hover text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Gateway Configuration</span>
          </button>
        </form>
      </div>
    </div>
  );
}

