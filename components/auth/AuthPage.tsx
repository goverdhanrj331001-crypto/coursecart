'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react';
import { SessionUser, setSession, findStudentByEmail, getStudents, saveStudents, Student } from '@/lib/brainbridge-data';
import { dbSignUpStudent, dbSignInStudent, dbSaveStudent } from '@/lib/supabase-service';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onBackHome: () => void;
  onSuccess: (session: SessionUser) => void;
}

export function AuthPage({ initialMode = 'login', onBackHome, onSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(
    initialMode === 'signup' ? 'signup' : 'login'
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [targetExam, setTargetExam] = useState('Full Stack Web Dev');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          setErrorMsg('Please enter your full name.');
          setIsLoading(false);
          return;
        }

        const students = getStudents();
        const existing = students.find((s) => s.email.toLowerCase() === email.trim().toLowerCase());

        if (existing) {
          setErrorMsg('An account with this email already exists. Please login instead.');
          setIsLoading(false);
          return;
        }

        const newStudent: Student = {
          id: 'st_' + Date.now(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || '9876543210',
          joinDate: new Date().toISOString().slice(0, 10),
          courses: [],
        };

        students.push(newStudent);
        saveStudents(students);

        const signupRes = await dbSignUpStudent(email.trim(), password, name.trim());
        if (signupRes && signupRes.error) {
          setErrorMsg(signupRes.error);
          setIsLoading(false);
          return;
        }
        await dbSaveStudent(newStudent);

        const sess: SessionUser = {
          email: newStudent.email,
          name: newStudent.name,
          role: 'student',
        };
        setSession(sess);
        setIsLoading(false);
        onSuccess(sess);
      } else {

        const loginRes = await dbSignInStudent(email.trim(), password);
        if (loginRes && loginRes.error) {
          setErrorMsg(loginRes.error);
          setIsLoading(false);
          return;
        }

        const student = findStudentByEmail(email.trim());
        const sessName = student ? student.name : email.split('@')[0];
        const sess: SessionUser = {
          email: email.trim(),
          name: sessName,
          role: 'student',
        };
        setSession(sess);
        setIsLoading(false);
        onSuccess(sess);
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-[cream] flex flex-col justify-between">

      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[navy] text-amber-400 flex items-center justify-center font-bold text-xs">
              BB
            </div>
            <span className="font-extrabold text-base text-[navy] tracking-tight">BrainBridge</span>
          </div>

          <div className="text-xs font-semibold text-slate-500 hidden sm:block">
            {mode === 'signup' ? 'Already have an account?' : 'Need an account?'}
            <button
              onClick={() => {
                setErrorMsg('');
                setMode(mode === 'signup' ? 'login' : 'signup');
              }}
              className="ml-1.5 font-bold text-[navy] hover:underline cursor-pointer"
            >
              {mode === 'signup' ? 'Log In' : 'Sign Up Free'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">

          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[620px] bg-slate-900 overflow-hidden">
            <Image
              src="/images/hero_indian_student_1790356905238.jpg"
              alt="BrainBridge Student"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />
          </div>

          <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-center space-y-6">

            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-md">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setMode('login');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[navy] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setMode('signup');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-[navy] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[navy]">
                {mode === 'signup'
                  ? 'Create Your Account'
                  : 'Welcome Back'}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {mode === 'signup'
                  ? 'Fill in your details below to get instant access to courses.'
                  : 'Enter your credentials to access your enrolled courses.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[navy] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[navy] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    WhatsApp / Mobile No. *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[navy] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Primary Learning Target
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <select
                      value={targetExam}
                      onChange={(e) => setTargetExam(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[navy] focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Full Stack Web Dev">Full Stack Web Development</option>
                      <option value="Data Science & AI">Data Science &amp; Machine Learning</option>
                      <option value="JEE Advanced & Physics">JEE / NEET Entrance Prep</option>
                      <option value="Board Exams (Class 10-12)">Class 10th/12th Board Exams</option>
                      <option value="Digital Marketing">Digital Marketing &amp; SEO</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Password *</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to your registered email address.')}
                      className="text-[11px] text-blue-600 hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[navy] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                <input
                  type="checkbox"
                  id="chkRemember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[navy] focus:ring-[navy]"
                />
                <label htmlFor="chkRemember" className="cursor-pointer">
                  {mode === 'signup' ? (
                    <span>
                      I agree to the{' '}
                      <a href="#/terms" className="text-slate-900 underline font-bold">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#/privacy" className="text-slate-900 underline font-bold">
                        Privacy Policy
                      </a>
                    </span>
                  ) : (
                    <span>Keep me logged in on this browser</span>
                  )}
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[navy] hover:bg-navy-admin-hover text-white py-3.5 rounded-xl font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === 'signup'
                        ? 'Create Free Account'
                        : 'Sign In to Dashboard'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

