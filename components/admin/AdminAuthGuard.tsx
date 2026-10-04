'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Lock, ArrowRight, CheckCircle2, AlertCircle, LogOut, Mail } from 'lucide-react';

import { isSupabaseConfigured, supabase } from '@/lib/supabase';

// Whitelisted administrator emails verified via Supabase Auth
const ALLOWED_ADMIN_EMAILS = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
  'admin@brainbridge.in,owner@brainbridge.in,apnacollege331002@gmail.com,mukeshp789456@gmail.com'
)
  .split(',')
  .map((email) => email.trim().toLowerCase());

interface AdminAuthGuardProps {
  children?: React.ReactNode;
  onNavigateHome?: () => void;
}

export function AdminAuthGuard({ children, onNavigateHome }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checking, setChecking] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Verify Supabase session on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        if (!isSupabaseConfigured()) {
          setChecking(false);
          return;
        }
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userRole = session.user.user_metadata?.role;
          const userEmail = session.user.email?.toLowerCase() || '';
          const isAdmin =
            userRole === 'owner' ||
            userRole === 'admin' ||
            ALLOWED_ADMIN_EMAILS.includes(userEmail);
          setIsAuthenticated(isAdmin);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };
    verifySession();
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      if (!cleanEmail || !cleanPass) {
        setErrorMsg('Please enter both email and password.');
        return;
      }

      if (!isSupabaseConfigured()) {
        setErrorMsg('Supabase configuration is required for admin authentication.');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass,
      });

      if (error) {
        setErrorMsg('Invalid admin credentials. Please try again.');
        return;
      }

      if (data?.user) {
        const userRole = data.user.user_metadata?.role;
        const userEmail = data.user.email?.toLowerCase() || '';

        const isAllowedAdmin =
          userRole === 'owner' ||
          userRole === 'admin' ||
          ALLOWED_ADMIN_EMAILS.includes(userEmail);

        if (isAllowedAdmin) {
          setIsAuthenticated(true);
        } else {
          await supabase.auth.signOut();
          setErrorMsg('Access denied: Unauthorized administrator account.');
        }
      }
    } catch (err: unknown) {
      setErrorMsg('Authentication error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleLogoutEvent = async () => {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
      setIsAuthenticated(false);
    };
    window.addEventListener('admin_logout', handleLogoutEvent);
    return () => window.removeEventListener('admin_logout', handleLogoutEvent);
  }, []);

  const handleAdminLogout = async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
    } catch {
    }
    setIsAuthenticated(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = '/';
    }
  };

  // Verifying session state - show loading indicator
  if (checking) {
    return (
      <div className="min-h-screen bg-navy-admin flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-admin text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-[#111C38]/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6">

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-navy-admin flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white mt-2">
              BrainBridge Admin Portal
            </h1>
            <p className="text-xs text-slate-400 max-w-xs">
              Kevel authorized admin credentials se hi access kiya ja sakta hai.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Admin Email ID *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="admin@brainbridge.in"
                  className="w-full bg-[#080E1E] border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Admin Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#080E1E] border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-3 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-navy-admin py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {submitting ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                else window.location.href = '/';
              }}
              className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              ← Return to BrainBridge Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">

      <div className="bg-[#080E1E] border-b border-amber-500/30 px-4 py-2 text-xs flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold text-amber-400 font-mono">/krishnacourse</span>
          <span className="text-slate-400 hidden sm:inline">· Protected Admin Portal</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold hidden md:inline-flex items-center gap-1 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Admin Authenticated</span>
          </span>
          <button
            onClick={handleAdminLogout}
            className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
            title="Lock & Exit Admin Panel"
          >
            <LogOut className="w-3 h-3" />
            <span>Lock Admin</span>
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}

