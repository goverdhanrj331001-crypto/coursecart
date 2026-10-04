'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight, UserCircle, LogOut, Search, ShieldCheck } from 'lucide-react';
import { SessionUser } from '@/lib/brainbridge-data';

interface NavbarProps {
  session: SessionUser | null;
  currentView: string;
  onNavigateView: (view: 'home' | 'courses' | 'student' | 'admin' | 'profile' | 'terms' | 'privacy' | 'login' | 'register') => void;
  onOpenAuth: (mode?: 'login' | 'signup' | 'owner') => void;
  onLogout: () => void;
}

export function Navbar({
  session,
  currentView,
  onNavigateView,
  onOpenAuth,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (viewOrHash: string) => {
    setMobileMenuOpen(false);
    if (viewOrHash === 'courses') {
      onNavigateView('courses');
      window.location.hash = '/courses';
    } else if (viewOrHash === 'home') {
      onNavigateView('home');
      window.location.hash = '/home';
    } else {
      if (currentView !== 'home') {
        onNavigateView('home');
        setTimeout(() => {
          const el = document.querySelector(viewOrHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(viewOrHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-line transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <button
            onClick={() => onNavigateView('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-2 focus-visible:outline-amber rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-navy text-amber flex items-center justify-center font-display font-bold text-sm tracking-tight shadow-xs">
              BB
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-navy group-hover:text-navy-hero-hover transition-colors">
              BrainBridge
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-navy font-bold' : 'text-muted hover:text-navy'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('courses')}
              className={`text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'courses' ? 'text-navy font-bold' : 'text-muted hover:text-navy'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => handleNavClick('#features')}
              className="text-xs sm:text-sm font-medium text-muted hover:text-navy transition-colors cursor-pointer"
            >
              Why Us
            </button>
            <button
              onClick={() => handleNavClick('#admission')}
              className="text-xs sm:text-sm font-medium text-muted hover:text-navy transition-colors cursor-pointer"
            >
              Admission
            </button>
          </nav>

          <div className="hidden xl:flex items-center relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search courses..."
              onFocus={() => handleNavClick('courses')}
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-navy transition-all cursor-pointer"
            />
          </div>

          <div className="hidden sm:flex items-center gap-2.5">
            {session ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateView('profile')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    currentView === 'profile'
                      ? 'bg-navy-admin text-white border-navy-admin'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  My Profile
                </button>
                <button
                  onClick={() => onNavigateView(session.role === 'owner' ? 'admin' : 'student')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-navy text-white hover:bg-navy-hero-hover transition-all shadow-xs"
                >
                  <UserCircle className="w-4 h-4 text-amber" />
                  <span>{session.role === 'owner' ? 'Owner Portal' : 'My Learning'}</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Log out"
                  className="p-2 text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-xs sm:text-sm font-semibold text-ink hover:text-navy transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-slate-100/80"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="inline-flex items-center gap-1.5 bg-navy-admin hover:bg-navy-admin-hover text-white px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>Register</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            {session && (
              <button
                onClick={() => onNavigateView(session.role === 'owner' ? 'admin' : 'student')}
                className="p-2 text-navy bg-white border border-line rounded-lg"
              >
                <UserCircle className="w-5 h-5 text-amber" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy hover:bg-line/60 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-navy" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-line bg-cream px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('#home')}
              className="text-left px-3 py-2 text-sm font-medium text-ink hover:bg-white rounded-lg transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('#courses')}
              className="text-left px-3 py-2 text-sm font-medium text-ink hover:bg-white rounded-lg transition-colors"
            >
              Courses
            </button>
            <button
              onClick={() => handleNavClick('#features')}
              className="text-left px-3 py-2 text-sm font-medium text-ink hover:bg-white rounded-lg transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('#material')}
              className="text-left px-3 py-2 text-sm font-medium text-ink hover:bg-white rounded-lg transition-colors"
            >
              Study Material
            </button>
            <button
              onClick={() => handleNavClick('#admission')}
              className="text-left px-3 py-2 text-sm font-medium text-ink hover:bg-white rounded-lg transition-colors"
            >
              Admission
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="text-left px-3 py-2 text-sm font-medium text-ink hover:bg-white rounded-lg transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="text-left px-3 py-2 text-sm font-medium text-ink hover:bg-white rounded-lg transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="text-left px-3 py-2 text-sm font-medium text-ink hover:bg-white rounded-lg transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="pt-3 border-t border-line flex flex-col gap-2">
            {session ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView(session.role === 'owner' ? 'admin' : 'student');
                  }}
                  className="w-full py-2.5 px-4 bg-navy text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <UserCircle className="w-4 h-4 text-amber" />
                  <span>{session.role === 'owner' ? 'Owner Portal' : 'My Dashboard'}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 text-center text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 px-4 bg-white border border-line text-navy rounded-lg text-sm font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2.5 px-4 bg-navy text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

