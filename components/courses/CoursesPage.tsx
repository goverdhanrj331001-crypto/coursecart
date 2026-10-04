'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Award,
  Zap,
} from 'lucide-react';
import { Course, getStoredCourses, getCategories } from '@/lib/brainbridge-data';
import { dbGetCourses, dbGetCategories } from '@/lib/supabase-service';

interface CoursesPageProps {
  onSelectCourse: (courseId: string) => void;
  onEnrollCourse: (course: Course) => void;
}

export function CoursesPage({ onSelectCourse, onEnrollCourse }: CoursesPageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);

      const localC = getStoredCourses();
      const localCats = getCategories();
      if (localC && localC.length > 0) setCourses(localC);
      if (localCats && localCats.length > 0) {
        setCategoriesList(['All', ...localCats.map((c) => c.name)]);
      }

      const [dbC, dbCats] = await Promise.all([dbGetCourses(), dbGetCategories()]);
      if (isMounted) {
        if (dbC && dbC.length > 0) setCourses(dbC);
        if (dbCats && dbCats.length > 0) {
          setCategoriesList(['All', ...dbCats.map((c) => c.name)]);
        }
        setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.faculty && course.faculty.toLowerCase().includes(searchQuery.toLowerCase()));

    const cleanCat = (course.category || '').toLowerCase().replace(/[:\s]+$/, '');
    const cleanSel = selectedCategory.toLowerCase().replace(/[:\s]+$/, '');

    const matchesCategory =
      selectedCategory === 'All' ||
      cleanCat === cleanSel ||
      cleanCat.includes(cleanSel) ||
      cleanSel.includes(cleanCat);

    const matchesLevel =
      selectedLevel === 'All' || course.level.toLowerCase() === selectedLevel.toLowerCase();

    return matchesSearch && matchesCategory && matchesLevel;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 499) - (b.price || 499);
    if (sortBy === 'price-high') return (b.price || 499) - (a.price || 499);
    if (sortBy === 'rating') return (b.rating || 4.8) - (a.rating || 4.8);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[cream] pb-20">

      <div className="bg-[navy] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Explore 50+ Career-Ready Courses</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Find the Perfect Course for Your Career &amp; Board Exams
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Learn from India&apos;s top educators with structured curriculums, live doubt solving, hands-on projects, and verified certifications.
          </p>

          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course name, topic, or instructor name..."
                className="w-full bg-white text-slate-900 placeholder:text-slate-400 pl-12 pr-4 py-3.5 rounded-2xl shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
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
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shadow-2xs shrink-0 ${
                  isActive
                    ? 'bg-[navy] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{cleanName}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white font-extrabold' : 'bg-slate-100 text-slate-600 font-semibold'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-4 border-b border-slate-200 mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="font-bold">Showing {filteredCourses.length} Courses</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
              <span className="text-slate-500 font-medium">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
              <span className="text-slate-500 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-2/3" />
                  <div className="h-8 bg-slate-100 rounded w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <BookOpen className="w-14 h-14 text-slate-200 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">0 Courses Available</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Abhi koi bhi course available nahi hai. Admin dashboard se courses add karein.
            </p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">0 courses match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Filters ya search query badal ke dobara try karein.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="bg-[navy] text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >

                <div className="relative h-48 bg-slate-900 overflow-hidden shrink-0">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[navy] text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-xs">
                    {course.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-[navy] line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.duration || '10 Weeks'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{course.faculty || 'Expert Faculty'}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-slate-400 line-through mr-1.5">
                        ₹{course.originalPrice || 4999}
                      </span>
                      <span className="text-xl font-black text-[navy]">
                        ₹{course.price || 499}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectCourse(course.id)}
                        className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onEnrollCourse(course)}
                        className="px-4 py-2 rounded-xl bg-[navy] hover:bg-[navy-dark] text-white text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-[navy] to-[navy-dark] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-amber-400/20 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-400/30 inline-block">
              Free Academic Counseling
            </span>
            <h3 className="text-2xl font-extrabold">Need Help Choosing the Right Stream or Course?</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Talk to our expert mentors to discuss course roadmap, job placement support, or board exam preparation strategy.
            </p>
          </div>

          <a
            href="tel:+919876543210"
            className="shrink-0 bg-white hover:bg-slate-100 text-[navy] font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
          >
            <span>Call Admissions +91 98765 43210</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

