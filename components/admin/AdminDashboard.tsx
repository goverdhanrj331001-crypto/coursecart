'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  Student,
  Course,
  SiteContent,
  CourseCategory,
  OrderRecord,
  RazorpayConfig,
  Testimonial,
  getStudents,
  saveStudents,
  getCategories,
  saveCategories,
  getStoredCourses,
  saveStoredCourses,
  getOrders,
  getRazorpayConfig,
  saveRazorpayConfig,
  getTestimonials,
  saveTestimonials,
} from '@/lib/brainbridge-data';

import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminCategoriesTab } from './AdminCategoriesTab';
import { AdminCoursesTab } from './AdminCoursesTab';
import { AdminPaymentTab } from './AdminPaymentTab';
import { AdminOrdersTab } from './AdminOrdersTab';
import { AdminUsersTab } from './AdminUsersTab';
import { AdminTestimonialsTab } from './AdminTestimonialsTab';
import { AdminCourseFormTab, CourseFormData } from './AdminCourseFormTab';
import {
  dbGetCourses,
  dbGetCategories,
  dbGetOrders,
  dbGetStudents,
  dbGetRazorpayConfig,
  dbSaveCourse,
  dbDeleteCourse,
  dbDeleteCategory,
  dbDeleteStudent,
  dbGetTestimonials,
  dbSaveTestimonial,
  dbDeleteTestimonial,
} from '@/lib/supabase-service';

interface AdminDashboardProps {
  siteContent: SiteContent;
  onUpdateSiteContent: (content: SiteContent) => void;
  onNavigateHome: () => void;
  onLogout: () => void;
}

export function AdminDashboard({
  siteContent,
  onUpdateSiteContent,
  onNavigateHome,
  onLogout,
}: AdminDashboardProps) {

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [razorpayConfig, setRazorpayConfig] = useState<RazorpayConfig>({
    enabled: true,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your-razorpay-key-id',
    keySecret: process.env.RAZORPAY_KEY_SECRET || 'your-razorpay-secret',
  });

  useEffect(() => {
    let isMounted = true;
    async function loadAllData() {

      setCourses(getStoredCourses());
      setCategories(getCategories());
      setOrders(getOrders());
      setStudents(getStudents());
      setTestimonials(getTestimonials());
      setRazorpayConfig(getRazorpayConfig());

      const [dbC, dbCat, dbO, dbS, dbR, dbT] = await Promise.all([
        dbGetCourses(),
        dbGetCategories(),
        dbGetOrders(),
        dbGetStudents(),
        dbGetRazorpayConfig(),
        dbGetTestimonials(),
      ]);

      if (isMounted) {
        if (dbC && dbC.length > 0) setCourses(dbC);
        if (dbCat && dbCat.length > 0) setCategories(dbCat);
        if (dbO && dbO.length > 0) setOrders(dbO);
        if (dbS && dbS.length > 0) setStudents(dbS);
        if (dbR) setRazorpayConfig(dbR);
        if (dbT && dbT.length > 0) setTestimonials(dbT);
      }
    }

    loadAllData();
    return () => {
      isMounted = false;
    };
  }, []);

  const [courseSearch, setCourseSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<CourseFormData>({
    name: '',
    category: 'Web Development',
    badge: '',
    badgeColor: 'amber',
    price: 0,
    originalPrice: 0,
    validityDays: 365,
    duration: '',
    level: 'Beginner',
    rating: 5.0,
    reviewsCount: '',
    faculty: '',
    image: '',
    modulesCount: 0,
    testsCount: 0,
    pdfNotesCount: 0,
    description: '',
    videoUrl: '',
    videoUrlsRaw: '',
    aboutCourse: '',
    whatYouWillLearnRaw: '',
    curriculumRaw: '',
    instructorTitle: '',
    instructorImage: '',
    instructorBio: '',
    digitalAssetUrl: '',
    digitalAssetName: '',
    digitalAssetType: 'pdf',
  });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
  });

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserCourseId, setNewUserCourseId] = useState('web-dev');

  const [successToast, setSuccessToast] = useState('');

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleOpenAddCategory = () => {
    setEditingCatId(null);
    setCategoryForm({ name: '', description: '' });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: CourseCategory) => {
    setEditingCatId(cat.id);
    setCategoryForm({ name: cat.name, description: cat.description });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;

    if (editingCatId) {
      const updated = categories.map((c) =>
        c.id === editingCatId
          ? {
              ...c,
              name: categoryForm.name.trim(),
              slug: categoryForm.name.toLowerCase().replace(/\s+/g, '-'),
              description: categoryForm.description.trim(),
            }
          : c
      );
      setCategories(updated);
      saveCategories(updated);
      triggerToast('Category updated successfully!');
    } else {
      const newCat: CourseCategory = {
        id: 'cat-' + Date.now(),
        name: categoryForm.name.trim(),
        slug: categoryForm.name.toLowerCase().replace(/\s+/g, '-'),
        description: categoryForm.description.trim(),
      };
      const updated = [...categories, newCat];
      setCategories(updated);
      saveCategories(updated);
      triggerToast('New category added successfully!');
    }
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = (catId: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    const updated = categories.filter((c) => c.id !== catId);
    setCategories(updated);
    saveCategories(updated);
    dbDeleteCategory(catId);
    triggerToast('Category deleted.');
  };

  const handleOpenAddCourse = () => {
    setEditingCourseId(null);
    setCourseForm({
      name: '',
      category: categories[0]?.name || 'Web Development',
      badge: '',
      badgeColor: 'amber',
      price: 0,
      originalPrice: 0,
      validityDays: 365,
      duration: '',
      level: 'Beginner',
      rating: 5.0,
      reviewsCount: '',
      faculty: '',
      image: '',
      modulesCount: 0,
      testsCount: 0,
      pdfNotesCount: 0,
      description: '',
      videoUrl: '',
      videoUrlsRaw: '',
      aboutCourse: '',
      whatYouWillLearnRaw: '',
      curriculumRaw: '',
      instructorTitle: '',
      instructorImage: '',
      instructorBio: '',
      digitalAssetUrl: '',
      digitalAssetName: '',
      digitalAssetType: 'pdf',
    });
    setActiveTab('course-form');
  };

  const handleOpenEditCourse = (c: Course) => {
    setEditingCourseId(c.id);
    const videoUrlsText = c.videoUrls && c.videoUrls.length > 0
      ? c.videoUrls.join('\n')
      : c.videoUrl || '';

    setCourseForm({
      name: c.name,
      category: c.category,
      badge: c.badge || 'Popular',
      badgeColor: (c.badgeColor as 'amber' | 'emerald' | 'blue') || 'amber',
      price: c.price || 499,
      originalPrice: c.originalPrice || 4999,
      validityDays: c.validityDays || 90,
      duration: c.duration || '10 Weeks',
      level: c.level || 'Beginner',
      rating: c.rating || 4.9,
      reviewsCount: c.reviewsCount || '1.5k',
      faculty: c.faculty || 'Surendra Kumar Saini',
      image: c.image || '',
      modulesCount: c.modulesCount || 10,
      testsCount: c.testsCount || 15,
      pdfNotesCount: c.pdfNotesCount || 20,
      description: c.description || '',
      videoUrl: c.videoUrl || (c.videoUrls && c.videoUrls[0]) || '',
      videoUrlsRaw: videoUrlsText,
      aboutCourse: c.aboutCourse || c.description || '',
      whatYouWillLearnRaw: c.whatYouWillLearn
        ? c.whatYouWillLearn.join('\n')
        : 'HTML5 & Semantic Structure\nNext.js 14 & App Router\nCSS3, Flexbox & Responsive Grid',
      curriculumRaw: c.curriculumList && c.curriculumList.length > 0
        ? c.curriculumList
            .map((m) => {
              const parts = [m.title];
              if (m.lectures) parts.push(m.lectures);
              if (m.duration) parts.push(m.duration);
              return parts.join('; ');
            })
            .join('\n')
        : '',
      instructorTitle: c.instructorTitle || 'Full Stack Developer & Senior Mentor',
      instructorImage: c.instructorImage || '/images/about_indian_learner_1790356918835.jpg',
      instructorBio:
        c.instructorBio ||
        'With 8+ years of industry experience, Surendra Saini has trained thousands of students in full stack engineering.',
      digitalAssetUrl: c.digitalAssetUrl || '',
      digitalAssetName:
        c.digitalAssetName || `${c.name.replace(/\s+/g, '_')}_Complete_Digital_Bundle.pdf`,
      digitalAssetType: (c.digitalAssetType as any) || 'pdf',
    });
    setActiveTab('course-form');
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.name.trim()) return;

    const parsedLearn = courseForm.whatYouWillLearnRaw
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const parsedCurriculum = courseForm.curriculumRaw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line, idx) => {
        const parts = line.split(';').map((p) => p.trim());
        const title = parts[0] || `Module ${idx + 1}`;
        const lectures = parts.length > 1 && parts[1] ? parts[1] : undefined;
        const duration = parts.length > 2 && parts[2] ? parts[2] : undefined;
        return {
          id: 'mod-' + (idx + 1),
          title,
          lectures,
          duration,
          details: [],
        };
      });

    const parsedVideoUrls = (courseForm.videoUrlsRaw || courseForm.videoUrl)
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    const primaryVideoUrl = parsedVideoUrls[0] || courseForm.videoUrl.trim() || '';

    const courseDataToSave = {
      name: courseForm.name.trim(),
      category: courseForm.category,
      badge: courseForm.badge,
      badgeColor: courseForm.badgeColor,
      price: Number(courseForm.price),
      originalPrice: Number(courseForm.originalPrice),
      validityDays: Number(courseForm.validityDays) || 365,
      duration: courseForm.duration || 'Self-Paced',
      level: courseForm.level,
      rating: Number(courseForm.rating),
      reviewsCount: courseForm.reviewsCount,
      faculty: courseForm.faculty,
      image: courseForm.image || '/images/course_web_dev_1790356954573.jpg',
      modulesCount: Number(courseForm.modulesCount),
      testsCount: Number(courseForm.testsCount),
      pdfNotesCount: Number(courseForm.pdfNotesCount),
      description: courseForm.description,
      videoUrl: primaryVideoUrl,
      videoUrls: parsedVideoUrls,
      aboutCourse: courseForm.aboutCourse.trim() || courseForm.description,
      whatYouWillLearn: parsedLearn,
      curriculumList: parsedCurriculum,
      instructorTitle: courseForm.instructorTitle.trim(),
      instructorImage: courseForm.instructorImage.trim(),
      instructorBio: courseForm.instructorBio.trim(),
      digitalAssetUrl:
        courseForm.digitalAssetUrl.trim() || courseForm.image || '/images/course_web_dev_1790356954573.jpg',
      digitalAssetName:
        courseForm.digitalAssetName.trim() ||
        `${courseForm.name.replace(/\s+/g, '_')}_Digital_Content.pdf`,
      digitalAssetType: courseForm.digitalAssetType || 'pdf',
    };

    if (editingCourseId) {
      const fullUpdatedCourse: Course = {
        ...courses.find((c) => c.id === editingCourseId)!,
        id: editingCourseId,
        ...courseDataToSave,
      };
      const updated = courses.map((c) => (c.id === editingCourseId ? fullUpdatedCourse : c));
      setCourses(updated);
      saveStoredCourses(updated);
      await dbSaveCourse(fullUpdatedCourse);
      triggerToast('Course updated and saved to Database!');
    } else {
      const newC: Course = {
        id: 'course-' + Date.now(),
        ...courseDataToSave,
      };
      const updated = [newC, ...courses];
      setCourses(updated);
      saveStoredCourses(updated);
      await dbSaveCourse(newC);
      triggerToast('New course added and published to Database!');
    }
    setActiveTab('courses');
  };

  const handleDeleteCourse = (cId: string) => {
    if (!window.confirm('Delete this course permanently from BrainBridge catalog?')) return;
    const updated = courses.filter((c) => c.id !== cId);
    setCourses(updated);
    saveStoredCourses(updated);
    dbDeleteCourse(cId);
    triggerToast('Course deleted.');
  };

  const handleSaveRazorpay = (e: React.FormEvent) => {
    e.preventDefault();
    saveRazorpayConfig(razorpayConfig);
    triggerToast('Razorpay Gateway settings updated successfully!');
  };

  const handleToggleRazorpay = () => {
    const updated = {
      ...razorpayConfig,
      enabled: !razorpayConfig.enabled,
    };
    setRazorpayConfig(updated);
    saveRazorpayConfig(updated);
    triggerToast(`Razorpay Gateway ${updated.enabled ? 'Enabled' : 'Disabled'}.`);
  };

  const handleSaveNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newStudent: Student = {
      id: 'st_' + Date.now(),
      name: newUserName.trim(),
      email: newUserEmail.trim().toLowerCase(),
      phone: newUserPhone.trim() || '9876543210',
      joinDate: new Date().toISOString().slice(0, 10),
      courses: [
        {
          courseId: newUserCourseId,
          purchaseDate: new Date().toISOString().slice(0, 10),
          expiryDate: new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
          progressPercent: 0,
        },
      ],
    };

    const updated = [newStudent, ...students];
    setStudents(updated);
    saveStudents(updated);
    triggerToast('New student added successfully!');
    setIsUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
  };

  const handleDeleteUser = (userId: string | number) => {
    if (!window.confirm('Delete this user account? Access will be removed.')) return;
    const updated = students.filter((s) => String(s.id) !== String(userId));
    setStudents(updated);
    saveStudents(updated);
    dbDeleteStudent(userId);
    triggerToast('User account deleted.');
  };

  const handleSaveTestimonial = async (t: Omit<Testimonial, 'id'> & { id?: string | number }) => {
    if (t.id) {
      const updated = testimonials.map((item) => (item.id === t.id ? { ...item, ...t } : item));
      setTestimonials(updated);
      saveTestimonials(updated);
      await dbSaveTestimonial(t as Testimonial);
      triggerToast('Review updated successfully!');
    } else {
      const newT: Testimonial = {
        id: Date.now(),
        ...t,
      };
      const updated = [...testimonials, newT];
      setTestimonials(updated);
      saveTestimonials(updated);
      await dbSaveTestimonial(newT);
      triggerToast('New student review added to Supabase!');
    }
  };

  const handleDeleteTestimonial = async (id: string | number) => {
    const updated = testimonials.filter((item) => item.id !== id);
    setTestimonials(updated);
    saveTestimonials(updated);
    await dbDeleteTestimonial(id);
    triggerToast('Review deleted successfully.');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  const handleGlobalLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('krishna_admin_authenticated');
      localStorage.removeItem('krishna_admin_authenticated');
      sessionStorage.removeItem('bb_session');
      localStorage.removeItem('bb_session');
      window.dispatchEvent(new Event('admin_logout'));
    }
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col lg:flex-row">

      {successToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 border border-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        coursesCount={courses.length}
        ordersCount={orders.length}
        studentsCount={students.length}
        razorpayEnabled={razorpayConfig.enabled}
        onNavigateHome={onNavigateHome}
        onLogout={handleGlobalLogout}
      />

      <main className="flex-1 bg-[#F8FAFC] text-slate-900 p-6 sm:p-10 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <AdminOverviewTab
            razorpayEnabled={razorpayConfig.enabled}
            totalRevenue={totalRevenue}
            coursesCount={courses.length}
            categoriesCount={categories.length}
            studentsCount={students.length}
            orders={orders}
            onViewAllOrders={() => setActiveTab('orders')}
          />
        )}

        {activeTab === 'categories' && (
          <AdminCategoriesTab
            categories={categories}
            courses={courses}
            onOpenAddCategory={handleOpenAddCategory}
            onOpenEditCategory={handleOpenEditCategory}
            onDeleteCategory={handleDeleteCategory}
            isCategoryModalOpen={isCategoryModalOpen}
            setIsCategoryModalOpen={setIsCategoryModalOpen}
            editingCatId={editingCatId}
            categoryForm={categoryForm}
            setCategoryForm={setCategoryForm}
            onSaveCategory={handleSaveCategory}
          />
        )}

        {activeTab === 'courses' && (
          <AdminCoursesTab
            courses={courses}
            courseSearch={courseSearch}
            setCourseSearch={setCourseSearch}
            onOpenAddCourse={handleOpenAddCourse}
            onOpenEditCourse={handleOpenEditCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        )}

        {activeTab === 'payment' && (
          <AdminPaymentTab
            razorpayConfig={razorpayConfig}
            setRazorpayConfig={setRazorpayConfig}
            onToggleRazorpay={handleToggleRazorpay}
            onSaveRazorpay={handleSaveRazorpay}
          />
        )}

        {activeTab === 'orders' && (
          <AdminOrdersTab
            orders={orders}
            orderSearch={orderSearch}
            setOrderSearch={setOrderSearch}
          />
        )}

        {activeTab === 'users' && (
          <AdminUsersTab
            students={students}
            courses={courses}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            onOpenAddUser={() => setIsUserModalOpen(true)}
            onDeleteUser={handleDeleteUser}
            isUserModalOpen={isUserModalOpen}
            setIsUserModalOpen={setIsUserModalOpen}
            newUserName={newUserName}
            setNewUserName={setNewUserName}
            newUserEmail={newUserEmail}
            setNewUserEmail={setNewUserEmail}
            newUserPhone={newUserPhone}
            setNewUserPhone={setNewUserPhone}
            newUserCourseId={newUserCourseId}
            setNewUserCourseId={setNewUserCourseId}
            onSaveNewUser={handleSaveNewUser}
          />
        )}

        {activeTab === 'testimonials' && (
          <AdminTestimonialsTab
            testimonials={testimonials}
            onSaveTestimonial={handleSaveTestimonial}
            onDeleteTestimonial={handleDeleteTestimonial}
          />
        )}

        {activeTab === 'course-form' && (
          <AdminCourseFormTab
            editingCourseId={editingCourseId}
            courseForm={courseForm}
            setCourseForm={setCourseForm}
            categories={categories}
            onSaveCourse={handleSaveCourse}
            onCancel={() => setActiveTab('courses')}
          />
        )}
      </main>
    </div>
  );
}

