'use client';

import React from 'react';
import {
  BookOpen,
  ArrowRight,
  LogOut,
  Sparkles,
  Download,
} from 'lucide-react';
import {
  Student,
  getCourseById,
  getDaysLeft,
  getStatusFromDaysLeft,
} from '@/lib/brainbridge-data';

interface StudentDashboardProps {
  student: Student;
  onUpdateStudent?: (updated: Student) => void;
  onOpenPlayer?: (courseId: string) => void;
  onNavigateHome: () => void;
  onLogout: () => void;
}

export function StudentDashboard({
  student,
  onNavigateHome,
  onLogout,
}: StudentDashboardProps) {

  const totalCourses = student.courses.length;

  return (
    <div className="min-h-screen bg-cream-student py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <div className="bg-navy-student text-cream-student rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-student-deep/20 text-amber-student text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Learning Portal</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Namaste, {student.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-cream-student/75">
              Welcome back to your enrolled batches. Pick up right where you left off.
            </p>
          </div>

          <div className="flex items-center gap-3 relative">
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold border border-white/20 transition-colors"
            >
              Browse More Courses
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg text-xs font-semibold border border-red-400/20 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-line-student rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl font-mono">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-muted-student font-semibold uppercase tracking-wider font-mono">
                Enrolled Courses
              </div>
              <div className="font-mono text-2xl font-bold text-navy-student">
                {totalCourses} {totalCourses === 1 ? 'Course' : 'Courses'}
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateHome}
            className="inline-flex items-center justify-center gap-2 bg-navy-student text-cream-student px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-navy-student-hover transition-colors cursor-pointer"
          >
            <span>Explore Course Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-student" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-navy-student">
              My Courses
            </h2>
            <button
              onClick={onNavigateHome}
              className="text-xs font-semibold text-navy-student hover:underline flex items-center gap-1"
            >
              <span>Explore course catalog</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {student.courses.length === 0 ? (
            <div className="bg-white border border-dashed border-line-student rounded-2xl p-10 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-muted-student/40 mx-auto" />
              <h3 className="font-display text-lg font-bold text-navy-student">
                No Enrolled Courses Yet
              </h3>
              <p className="text-xs sm:text-sm text-muted-student max-w-md mx-auto">
                You haven&apos;t enrolled in any course yet. Browse our NEET, JEE, CUET, or Board courses for flat ₹499 and start attending live sessions today.
              </p>
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 bg-navy-student text-cream-student px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-navy-student-hover"
              >
                <span>Browse Courses (₹499)</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-student" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {student.courses.map((sc) => {
                const course = getCourseById(sc.courseId);
                const days = getDaysLeft(sc.expiryDate);
                const status = getStatusFromDaysLeft(days);
                const daysLabel =
                  days < 0
                    ? `Expired ${Math.abs(days)} days ago`
                    : `${days} days remaining`;

                return (
                  <div
                    key={sc.courseId}
                    className="bg-white border border-line-student rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow"
                  >
                    <div>

                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="text-[11px] font-mono text-muted-student uppercase tracking-wider font-semibold">
                            {course?.category || 'Competitive Exam'}
                          </span>
                          <h3 className="font-display text-xl font-bold text-navy-student mt-0.5">
                            {course?.name || sc.courseId}
                          </h3>
                        </div>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-mono font-semibold tracking-wide ${status.badgeClass}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <div className="text-xs text-muted-student space-y-1 pt-2">
                        <div className="flex items-center justify-between">
                          <span>Purchased On:</span>
                          <span className="font-mono text-ink-soft font-medium">
                            {sc.purchaseDate}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Valid Until:</span>
                          <span className="font-mono text-ink-soft font-medium">
                            {sc.expiryDate} ({daysLabel})
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-emerald-50/90 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Download className="w-5 h-5" />
                          </div>
                          <div className="truncate">
                            <span className="font-bold text-navy-student block text-sm truncate">
                              {course?.digitalAssetName || `${course?.name || 'Course'}_Master_Bundle.pdf`}
                            </span>
                            <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 mt-0.5">
                              <span>✅ Purchased Course Material</span>
                            </span>
                          </div>
                        </div>

                        <a
                          href={course?.digitalAssetUrl || course?.image || '/images/course_web_dev.jpg'}
                          download={course?.digitalAssetName || `${course?.name}_Digital_Asset`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download File</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

