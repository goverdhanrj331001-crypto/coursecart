'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Award,
  Clock,
  ShieldCheck,
  KeyRound,
  Bell,
  Save,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import {
  Student,
  SessionUser,
  saveStudents,
  getStudents,
  getStoredCourses,
  setSession,
} from '@/lib/brainbridge-data';

interface ProfilePageProps {
  student: Student;
  session: SessionUser | null;
  onUpdateStudent: (updated: Student) => void;
  onNavigateHome: () => void;
  onNavigateCourses: () => void;
  onLogout: () => void;
}

export function ProfilePage({
  student,
  session,
  onUpdateStudent,
  onNavigateHome,
  onNavigateCourses,
  onLogout,
}: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'courses'>('details');

  const [name, setName] = useState(student.name || '');
  const [email, setEmail] = useState(student.email || '');
  const [phone, setPhone] = useState(student.phone || '');
  const [city, setCity] = useState('New Delhi, India');
  const [bio, setBio] = useState('Passionate learner preparing for tech engineering & web dev roles.');
  const [targetGoal, setTargetGoal] = useState('Full Stack Web Development');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Student = {
      ...student,
      name,
      email,
      phone,
    };

    const students = getStudents();
    const idx = students.findIndex((s) => s.id === student.id || s.email === student.email);
    if (idx !== -1) {
      students[idx] = updated;
      saveStudents(students);
    }

    onUpdateStudent(updated);

    if (session) {
      const newSess: SessionUser = {
        ...session,
        name: updated.name,
        email: updated.email,
      };
      setSession(newSess);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-cream pb-20">

      <div className="bg-navy-admin text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl bg-amber-400 text-navy-admin flex items-center justify-center text-3xl font-black shadow-xl border-4 border-white/10 shrink-0">
              {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-extrabold">{student.name}</h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  Verified Student
                </span>
              </div>
              <p className="text-xs text-slate-300">{student.email} • {student.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateCourses}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Browse Courses
            </button>
            <button
              onClick={onLogout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-3 sm:p-4 space-y-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-navy-admin text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Personal Profile &amp; Bio</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'courses'
                    ? 'bg-navy-admin text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  <span>My Enrolled Courses</span>
                </div>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {student.courses.length}
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">

            {activeTab === 'details' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-navy-admin">Personal Information</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update your account contact details, target goal, and profile information.
                  </p>
                </div>

                {saveSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Profile details saved successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveDetails} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-navy-admin focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-navy-admin focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-navy-admin focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">City / Location</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-navy-admin focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Learning Goal</label>
                    <input
                      type="text"
                      value={targetGoal}
                      onChange={(e) => setTargetGoal(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-navy-admin focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">About You / Short Bio</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-navy-admin focus:bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-navy-admin hover:bg-navy-admin-hover text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-navy-admin">Enrolled Courses</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Track your learning progress, resume video lectures, and access study materials.
                  </p>
                </div>

                <div className="space-y-4">
                  {(!student.courses || student.courses.length === 0) ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                      <p className="text-sm font-bold text-navy-admin">0 Enrolled Courses</p>
                      <p className="text-xs text-slate-500 mt-1">Aapne abhi tak kisi course me enroll nahi kiya hai.</p>
                      <button
                        onClick={onNavigateCourses}
                        className="mt-3 px-4 py-2 bg-navy text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Explore Courses
                      </button>
                    </div>
                  ) : (
                    student.courses.map((item) => {
                      const matched = getStoredCourses().find((c) => c.id === item.courseId);
                      return (
                        <div
                          key={item.courseId}
                          className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            {matched?.image ? (
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                                <Image
                                  src={matched.image}
                                  alt={matched.name}
                                  fill
                                  className="object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center shrink-0 text-slate-400 font-bold text-xs">
                                No Img
                              </div>
                            )}
                            <div>
                              <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                                {matched?.category || 'Course'}
                              </span>
                              <h3 className="text-sm font-extrabold text-navy-admin">{matched?.name || item.courseId}</h3>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Validity: {item.expiryDate || 'Unlimited Access'}
                              </p>
                            </div>
                          </div>

                          <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2">
                            <div className="w-full sm:w-36 bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-emerald-500 h-full rounded-full"
                                style={{ width: `${item.progressPercent || 25}%` }}
                              />
                            </div>
                            <span className="text-[11px] text-slate-600 font-bold">
                              {item.progressPercent || 25}% Completed
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

