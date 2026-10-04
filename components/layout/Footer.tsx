'use client';

import React, { useState } from 'react';
import { ArrowRight, Facebook, Instagram, Linkedin, Youtube, Check } from 'lucide-react';

interface FooterProps {
  onOpenAuth: (mode?: 'login' | 'signup' | 'owner') => void;
  onNavigateView: (view: 'home' | 'courses' | 'student' | 'admin' | 'profile' | 'terms' | 'privacy') => void;
}

export function Footer({
  onOpenAuth,
  onNavigateView,
}: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 3000);
  };

  const handleScrollTo = (id: string) => {
    onNavigateView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer id="contact" className="bg-cream border-t border-line text-ink pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-line">

          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy text-amber flex items-center justify-center font-display font-bold text-sm shadow-xs">
                BB
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-navy">
                BrainBridge
              </span>
            </div>
            <p className="text-sm font-medium text-muted pt-1">
              Learn • Grow • Build Your Future
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-sm text-navy mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted">
              <li>
                <button
                  onClick={() => handleScrollTo('home')}
                  className="hover:text-navy transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateView('courses');
                    window.location.hash = '/courses';
                  }}
                  className="hover:text-navy transition-colors cursor-pointer"
                >
                  All Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('features')}
                  className="hover:text-navy transition-colors cursor-pointer"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('about')}
                  className="hover:text-navy transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="hover:text-navy transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-bold text-sm text-navy mb-4">
              Support &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted">
              <li>
                <button
                  onClick={() => handleScrollTo('faq')}
                  className="hover:text-navy transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateView('terms');
                    window.location.hash = '/terms';
                  }}
                  className="hover:text-navy transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateView('privacy');
                    window.location.hash = '/privacy';
                  }}
                  className="hover:text-navy transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>
            © 2025 BrainBridge. All rights reserved.
          </div>
          <div className="font-medium text-muted">
            Learn • Grow • Build Your Future
          </div>
        </div>
      </div>
    </footer>
  );
}

