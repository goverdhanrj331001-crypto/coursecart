'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Clock, User, BookOpen } from 'lucide-react';
import { Course, getStoredCourses, getCategories } from '@/lib/brainbridge-data';
import { dbGetCourses, dbGetCategories } from '@/lib/supabase-service';

interface CoursesSectionProps {
  onOpenDemo: (courseId: string) => void;
  onSelectCourse?: (courseId: string) => void;
  onEnroll: (course: Course) => void;
}

export function CoursesSection({ onOpenDemo, onSelectCourse, onEnroll }: CoursesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [courses, setCourses] = useState<Course[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const localC = getStoredCourses();
    if (localC.length > 0) {
      setCourses(localC);
      const localCats = getCategories().map((c) => c.name);
      const courseCats = Array.from(new Set(localC.map((c) => c.category).filter(Boolean)));
      const combined = Array.from(new Set([...localCats, ...courseCats]));
      setCategoriesList(['All', ...combined]);
    }

    Promise.all([dbGetCourses(), dbGetCategories()]).then(([dbC, dbCats]) => {
      if (!isMounted) return;
      if (dbC && dbC.length > 0) {
        setCourses(dbC);
        const loadedCats = dbCats && dbCats.length > 0 ? dbCats.map((c) => c.name) : getCategories().map((c) => c.name);
        const courseCats = Array.from(new Set(dbC.map((c) => c.category).filter(Boolean)));
        const combined = Array.from(new Set([...loadedCats, ...courseCats]));
        setCategoriesList(['All', ...combined]);
      } else if (localC.length === 0) {
        setCourses([]);
        setCategoriesList(['All']);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);


  const handleCardClick = (courseId: string) => {
    if (onSelectCourse) {
      onSelectCourse(courseId);
    } else {
      onOpenDemo(courseId);
    }
  };

  const filteredCourses = courses.filter((course) => {
    if (selectedCategory === 'All') return true;

    const cleanCat = (course.category || '').toLowerCase().replace(/[:\s]+$/, '');
    const cleanSel = selectedCategory.toLowerCase().replace(/[:\s]+$/, '');

    if (cleanCat === cleanSel || cleanCat.includes(cleanSel) || cleanSel.includes(cleanCat)) {
      return true;
    }

    if (
      cleanSel.includes('tech') ||
      cleanSel.includes('skills')
    ) {
      if (
        cleanCat.includes('tech') ||
        cleanCat.includes('web') ||
        cleanCat.includes('data') ||
        cleanCat.includes('design') ||
        cleanCat.includes('marketing') ||
        cleanCat.includes('development')
      ) {
        return true;
      }
    }

    return false;
  });

  const getBadgeStyle = (badgeColor?: string) => {
    switch (badgeColor) {
      case 'emerald':
        return 'bg-green text-white';
      case 'blue':
        return 'bg-sky-600 text-white';
      case 'amber':
      default:
        return 'bg-amber text-white';
    }
  };

  return (
    <section id="courses" className="py-20 lg:py-24 bg-cream border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink mb-2.5">
                <span className="w-2 h-2 rounded-full bg-green" />
                <span>Featured Courses</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
                Popular Courses
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted max-w-2xl">
                Explore our most loved courses and start your learning journey today.
              </p>
            </div>

            {courses.length > 0 && (
              <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-2xs self-start sm:self-auto">
                {courses.length} {courses.length === 1 ? 'Course' : 'Courses'} Available
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
            {categoriesList.map((cat) => {
              const isAll = cat === 'All';
              const cleanName = cat.replace(/[:\s]+$/, '').trim();
              const count = isAll
                ? courses.length
                : courses.filter((c) => {
                    const cCat = (c.category || '').toLowerCase().replace(/[:\s]+$/, '');
                    const tCat = cat.toLowerCase().replace(/[:\s]+$/, '');
                    return cCat === tCat || cCat.includes(tCat) || tCat.includes(cCat);
                  }).length;

              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs shrink-0 ${
                    isActive
                      ? 'bg-navy text-white shadow-sm ring-1 ring-navy scale-[1.02]'
                      : 'bg-white border border-slate-200/90 text-slate-700 hover:border-slate-300 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  <span>{cleanName}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white font-extrabold'
                        : 'bg-slate-100 text-slate-600 font-semibold'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-line rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-slate-100" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-5 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-slate-300" />
            </div>
            <div>
              <p className="text-base font-bold text-navy">0 Courses Available</p>
              <p className="text-sm text-muted mt-1">Koi bhi course abhi available nahi hai. Admin se courses add karwayein.</p>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 space-y-3">
            <p className="text-base font-bold text-navy">Is category me 0 courses hain</p>
            <p className="text-xs text-muted">Doosri category select karein ya sabhi courses dekhein.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-2 px-4 py-2 bg-navy text-white rounded-xl text-xs font-bold"
            >
              Sab Courses Dikhao
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  onClick={() => handleCardClick(course.id)}
                  className="cursor-pointer"
                >

                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-xs ${getBadgeStyle(
                          course.badgeColor
                        )}`}
                      >
                        {course.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[11px] font-mono text-muted block mb-0.5">
                        {course.category}
                      </span>
                      <h3 className="font-display text-lg font-bold text-navy group-hover:text-navy-hero-hover transition-colors line-clamp-1">
                        {course.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted pt-1 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-muted" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-muted" />
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-line flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through mr-1.5">
                        ₹{course.originalPrice || 4999}
                      </span>
                      <span className="text-base font-black text-navy">
                        ₹{course.price || 499}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCardClick(course.id)}
                        className="text-xs font-bold text-navy hover:text-amber transition-colors px-2 py-1 cursor-pointer"
                      >
                        Demo Class
                      </button>
                      <button
                        onClick={() => handleCardClick(course.id)}
                        title={`View full details for ${course.name}`}
                        className="w-8 h-8 rounded-lg bg-navy hover:bg-navy-hero-hover text-white flex items-center justify-center transition-all shadow-xs group-hover:scale-105 cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

