'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { TrustBanner } from '@/components/home/TrustBanner';
import { SolutionSection } from '@/components/home/SolutionSection';
import { CoursesSection } from '@/components/home/CoursesSection';
import { CourseDetailPage } from '@/components/course/CourseDetailPage';
import { CourseCheckoutPage } from '@/components/course/CourseCheckoutPage';
import { StudyMaterialSection } from '@/components/home/StudyMaterialSection';
import { AdmissionSection } from '@/components/home/AdmissionSection';
import { BrochureCard } from '@/components/home/BrochureCard';
import { AboutSection } from '@/components/home/AboutSection';
import { FaqSection } from '@/components/home/FaqSection';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { OwnerMediaSection } from '@/components/home/OwnerMediaSection';
import { CtaSection } from '@/components/home/CtaSection';
import { AuthModal } from '@/components/auth/AuthModal';
import { StudentDashboard } from '@/components/student/StudentDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { CoursePlayerModal } from '@/components/shared/CoursePlayerModal';
import { CoursesPage } from '@/components/courses/CoursesPage';
import { AuthPage } from '@/components/auth/AuthPage';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { TermsPage } from '@/components/legal/TermsPage';
import { PrivacyPage } from '@/components/legal/PrivacyPage';
import {
  Course,
  Student,
  SessionUser,
  SiteContent,
  getStoredCourses,
  getSession,
  setSession,
  clearSession,
  getStudents,
  saveStudents,
  findStudentByEmail,
  getSiteContent,
} from '@/lib/brainbridge-data';
import { dbGetCourses } from '@/lib/supabase-service';

export default function HomePage() {
  const [session, setSessionState] = useState<SessionUser | null>(null);

  const [currentView, setCurrentView] = useState<
    | 'home'
    | 'courses'
    | 'course-detail'
    | 'checkout'
    | 'login'
    | 'register'
    | 'profile'
    | 'student'
    | 'admin'
    | 'terms'
    | 'privacy'
  >('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('web-dev');
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const checkoutCourseRef = useRef<Course | null>(null);

  const setCheckoutCourseWithRef = (course: Course | null) => {
    checkoutCourseRef.current = course;
    setCheckoutCourse(course);
  };

  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [siteContent, setSiteContent] = useState<SiteContent>(getSiteContent);

  useEffect(() => {
    const timer = setTimeout(() => {
      const sess = getSession();
      if (sess) {
        setSessionState(sess);
        if (sess.role === 'student') {
          setCurrentStudent(findStudentByEmail(sess.email) || null);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'owner'>('login');

  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [playerCourseId, setPlayerCourseId] = useState('web-dev');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/course/')) {
        const cId = hash.replace('#/course/', '');
        setSelectedCourseId(cId || 'web-dev');
        setCurrentView('course-detail');
      } else if (hash.startsWith('#/checkout/')) {
        const cId = hash.replace('#/checkout/', '');
        setCurrentView('checkout');
        // Skip update if current course ref is already set
        if (checkoutCourseRef.current?.id === cId) return;
        // Attempt fast retrieval from local storage cache
        const localFound = getStoredCourses().find((c) => c.id === cId) || null;
        if (localFound) {
          setCheckoutCourseWithRef(localFound);
        } else {
          // Fallback to Supabase remote database fetch for production
          dbGetCourses().then((dbC) => {
            if (dbC) {
              const dbFound = dbC.find((c) => c.id === cId) || null;
              setCheckoutCourseWithRef(dbFound);
            }
          });
        }
      } else if (hash === '#/checkout') {
        setCurrentView('checkout');
      } else if (hash.startsWith('#/')) {
        const view = hash.replace('#/', '');
        const currentSession = getSession();
        if (view === 'student' && currentSession?.role === 'student') {
          setCurrentView('student');
        } else if (view === 'krishnacourse') {
          setCurrentView('admin');
        } else if (view === 'admin') {
          // Block /admin - redirect to home so nobody can guess the secret admin portal
          setCurrentView('home');
          window.location.hash = '/home';
        } else if (view === 'login') {
          setCurrentView('login');
        } else if (view === 'register' || view === 'signup') {
          setCurrentView('register');
        } else if (view === 'profile') {
          setCurrentView('profile');
        } else if (view === 'terms') {
          setCurrentView('terms');
        } else if (view === 'privacy') {
          setCurrentView('privacy');
        } else if (view === 'courses') {
          setCurrentView('courses');
        } else if (view === 'home') {
          setCurrentView('home');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenAuth = (mode: 'login' | 'signup' | 'owner' = 'login') => {
    if (mode === 'signup') {
      setCurrentView('register');
      window.location.hash = '/register';
    } else if (mode === 'login') {
      setCurrentView('login');
      window.location.hash = '/login';
    } else {
      setAuthMode('owner');
      setAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = (newSession: SessionUser) => {
    setSessionState(newSession);
    setAuthModalOpen(false);

    if (newSession.role === 'owner') {
      setCurrentView('admin');
      window.location.hash = '/krishnacourse';
    } else {
      const student = findStudentByEmail(newSession.email);
      if (student) setCurrentStudent(student);

      if (checkoutCourse) {
        setCurrentView('checkout');
        window.location.hash = `/checkout/${checkoutCourse.id}`;
      } else {
        setCurrentView('student');
        window.location.hash = '/student';
      }
    }
  };

  const handleLogout = () => {
    clearSession();
    setSessionState(null);
    setCurrentStudent(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('bb_session');
      localStorage.removeItem('bb_session');
      window.dispatchEvent(new Event('admin_logout'));
    }
    setCurrentView('home');
    window.location.hash = '/home';
  };

  const handleOpenCourseDetail = (courseId: string = 'web-dev') => {
    setSelectedCourseId(courseId);
    setCurrentView('course-detail');
    window.location.hash = `/course/${courseId}`;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenDemo = (courseId: string = 'web-dev') => {
    handleOpenCourseDetail(courseId);
  };

  const handleEnrollCourse = (course: Course) => {
    setCheckoutCourseWithRef(course);
    setCurrentView('checkout');
    window.location.hash = `/checkout/${course.id}`;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteEnrollment = (
    course: Course,
    studentInfo: { name: string; email: string; phone: string }
  ) => {
    const students = getStudents();
    let idx = students.findIndex((s) => s.email.toLowerCase() === studentInfo.email.trim().toLowerCase());

    const newCourseItem = {
      courseId: course.id,
      purchaseDate: new Date().toISOString().slice(0, 10),
      expiryDate: new Date(Date.now() + (course.validityDays || 90) * 86400000)
        .toISOString()
        .slice(0, 10),
      progressPercent: 0,
    };

    if (idx !== -1) {
      const alreadyHas = students[idx].courses.some((c) => c.courseId === course.id);
      if (!alreadyHas) {
        students[idx].courses.push(newCourseItem);
      }
      saveStudents(students);
      setCurrentStudent(students[idx]);

      const newSess: SessionUser = {
        email: students[idx].email,
        name: students[idx].name,
        role: 'student',
      };
      setSession(newSess);
      setSessionState(newSess);
    } else {
      const newStudent: Student = {
        id: 'st_' + Date.now(),
        name: studentInfo.name,
        email: studentInfo.email,
        phone: studentInfo.phone,
        joinDate: new Date().toISOString().slice(0, 10),
        courses: [newCourseItem],
      };
      students.push(newStudent);
      saveStudents(students);
      setCurrentStudent(newStudent);

      const newSess: SessionUser = {
        email: newStudent.email,
        name: newStudent.name,
        role: 'student',
      };
      setSession(newSess);
      setSessionState(newSess);
    }

    setCurrentView('student');
    window.location.hash = '/student';
  };

  const handleExploreCourses = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('courses');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('courses');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">

      {currentView !== 'checkout' && currentView !== 'login' && currentView !== 'register' && currentView !== 'admin' && (
        <Navbar
          session={session}
          currentView={currentView}
          onNavigateView={(view) => {
            setCurrentView(view);
            if (view === 'admin') {
              window.location.hash = '/krishnacourse';
            } else {
              window.location.hash = `/${view}`;
            }
          }}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-1">
        {currentView === 'home' && (
          <>

            <Hero
              heading={siteContent.heroHeading}
              lede={siteContent.heroLede}
              onExploreCourses={handleExploreCourses}
              onOpenDemo={handleOpenCourseDetail}
            />

            <TrustBanner />

            <SolutionSection />

            <CoursesSection
              onOpenDemo={handleOpenCourseDetail}
              onSelectCourse={handleOpenCourseDetail}
              onEnroll={handleEnrollCourse}
            />

            <StudyMaterialSection />

            <AdmissionSection
              onOpenDemo={handleOpenCourseDetail}
              onExploreCourses={handleExploreCourses}
            />

            <BrochureCard />

            <AboutSection
              onOpenVideo={() => handleOpenCourseDetail('web-dev')}
              onLearnMore={handleExploreCourses}
            />

            <FaqSection />

            <TestimonialSection />

            <OwnerMediaSection
              heroImage={siteContent.heroImage}
              promoVideoUrl={siteContent.promoVideoUrl}
            />

            <CtaSection
              onGetStarted={() => handleOpenAuth('signup')}
              onExploreCourses={handleExploreCourses}
            />
          </>
        )}

        {currentView === 'courses' && (
          <CoursesPage
            onSelectCourse={handleOpenCourseDetail}
            onEnrollCourse={handleEnrollCourse}
          />
        )}

        {(currentView === 'login' || currentView === 'register') && (
          <AuthPage
            initialMode={currentView === 'register' ? 'signup' : 'login'}
            onBackHome={() => {
              setCurrentView('home');
              window.location.hash = '/home';
            }}
            onSuccess={handleAuthSuccess}
          />
        )}

        {currentView === 'profile' && (
          currentStudent ? (
            <ProfilePage
              student={currentStudent}
              session={session}
              onUpdateStudent={(updated) => setCurrentStudent(updated)}
              onNavigateHome={() => {
                setCurrentView('home');
                window.location.hash = '/home';
              }}
              onNavigateCourses={() => {
                setCurrentView('courses');
                window.location.hash = '/courses';
              }}
              onLogout={handleLogout}
            />
          ) : (
            <div className="min-h-screen bg-cream flex items-center justify-center p-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-md w-full text-center space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-navy">Profile Not Found</h2>
                <p className="text-xs text-slate-500">Aapka profile data load nahi ho saka. Please login karein.</p>
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="px-6 py-2.5 bg-navy text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>
          )
        )}

        {currentView === 'terms' && (
          <TermsPage
            onBackHome={() => {
              setCurrentView('home');
              window.location.hash = '/home';
            }}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyPage
            onBackHome={() => {
              setCurrentView('home');
              window.location.hash = '/home';
            }}
          />
        )}

        {currentView === 'course-detail' && (
          <CourseDetailPage
            courseId={selectedCourseId}
            session={session}
            onBack={() => {
              setCurrentView('courses');
              window.location.hash = '/courses';
            }}
            onEnroll={handleEnrollCourse}
            onSelectCourse={handleOpenCourseDetail}
          />
        )}

        {currentView === 'checkout' && (
          <CourseCheckoutPage
            course={checkoutCourse || null}
            session={session}
            onBack={() => {
              if (selectedCourseId) {
                setCurrentView('course-detail');
                window.location.hash = `/course/${selectedCourseId}`;
              } else {
                setCurrentView('courses');
                window.location.hash = '/courses';
              }
            }}
            onCompleteEnrollment={handleCompleteEnrollment}
            onRequireAuth={(mode) => handleOpenAuth(mode || 'signup')}
          />
        )}

        {currentView === 'student' && currentStudent && (
          <StudentDashboard
            student={currentStudent}
            onUpdateStudent={(updated) => setCurrentStudent(updated)}
            onOpenPlayer={(cId) => {
              setPlayerCourseId(cId);
              setPlayerModalOpen(true);
            }}
            onNavigateHome={() => {
              setCurrentView('home');
              window.location.hash = '/home';
            }}
            onLogout={handleLogout}
          />
        )}

        {currentView === 'admin' && (
          <AdminAuthGuard
            onNavigateHome={() => {
              setCurrentView('home');
              window.location.hash = '/home';
            }}
          >
            <AdminDashboard
              siteContent={siteContent}
              onUpdateSiteContent={(updated) => setSiteContent(updated)}
              onNavigateHome={() => {
                setCurrentView('home');
                window.location.hash = '/home';
              }}
              onLogout={handleLogout}
            />
          </AdminAuthGuard>
        )}
      </main>

      {currentView !== 'checkout' && currentView !== 'login' && currentView !== 'register' && currentView !== 'admin' && (
        <Footer
          onOpenAuth={handleOpenAuth}
          onNavigateView={(view) => {
            setCurrentView(view);
            if (view === 'admin') {
              window.location.hash = '/krishnacourse';
            } else {
              window.location.hash = `/${view}`;
            }
          }}
        />
      )}

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <CoursePlayerModal
        courseId={playerCourseId}
        isOpen={playerModalOpen}
        onClose={() => setPlayerModalOpen(false)}
      />
    </div>
  );
}

