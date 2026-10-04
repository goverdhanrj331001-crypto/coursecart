'use client';

import React from 'react';
import { Phone, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { SessionUser } from '@/lib/brainbridge-data';

interface UtilityBarProps {
  session: SessionUser | null;
  contactPhone: string;
  contactEmail: string;
  onOpenAuth: (mode?: 'login' | 'signup' | 'owner') => void;
  onNavigateView: (view: 'home' | 'student' | 'admin') => void;
}

export function UtilityBar({
  session,
  contactPhone,
  contactEmail,
  onOpenAuth,
  onNavigateView,
}: UtilityBarProps) {
  return (
    <div className="bg-navy text-slate-200 text-xs border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">

        <div className="flex items-center gap-5">
          <a
            href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-amber transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber" />
            <span className="font-medium tracking-tight">{contactPhone}</span>
          </a>
          <a
            href={`mailto:${contactEmail}`}
            className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-amber transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber" />
            <span className="font-medium">{contactEmail}</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-amber text-[11px] font-mono tracking-wider font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-green" />
            <span>₹499 FLAT FEE · NO HIDDEN CHARGES</span>
          </div>

          <div className="h-3 w-px bg-white/20 hidden md:block" />

          {session ? (
            <button
              onClick={() => onNavigateView(session.role === 'owner' ? 'admin' : 'student')}
              className="flex items-center gap-1.5 text-amber hover:text-white font-medium transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>{session.role === 'owner' ? 'Owner Portal' : 'My Learning'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-slate-300 hover:text-amber font-medium transition-colors cursor-pointer"
              >
                Student Login
              </button>
              <button
                onClick={() => onOpenAuth('owner')}
                className="text-slate-400 hover:text-amber text-[11px] hidden sm:inline-block transition-colors cursor-pointer"
              >
                Owner
              </button>
            </div>
          )}

          <a
            href="#courses"
            className="hidden sm:inline-flex items-center gap-1 bg-amber hover:bg-amber-hover text-navy px-2.5 py-0.5 rounded text-[11.5px] font-bold transition-all shadow-2xs"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

