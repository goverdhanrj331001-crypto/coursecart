import { supabase, isSupabaseConfigured } from './supabase';
import { Course, CourseCategory, OrderRecord, Student, RazorpayConfig, SiteContent, Testimonial } from './brainbridge-data';

export async function dbGetCourses(): Promise<Course[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('Supabase fetch courses error:', error);
      return null;
    }

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      badge: item.badge || 'Popular',
      badgeColor: item.badge_color || 'amber',
      price: Number(item.price) || 499,
      originalPrice: Number(item.original_price) || 4999,
      validityDays: Number(item.validity_days) || 90,
      duration: item.duration || '10 Weeks',
      level: item.level || 'Beginner',
      rating: Number(item.rating) || 4.9,
      reviewsCount: item.reviews_count || '1.2k',
      faculty: item.faculty,
      image: item.image,
      modulesCount: Number(item.modules_count) || 10,
      testsCount: Number(item.tests_count) || 15,
      pdfNotesCount: Number(item.pdf_notes_count) || 20,
      description: item.description || '',
      videoUrl: item.video_url || (Array.isArray(item.video_urls) && item.video_urls[0]) || '',
      videoUrls: Array.isArray(item.video_urls)
        ? item.video_urls
        : item.video_url
        ? [item.video_url]
        : [],
      aboutCourse: item.about_course || item.description || '',
      whatYouWillLearn: Array.isArray(item.what_you_will_learn) ? item.what_you_will_learn : [],
      curriculumList: Array.isArray(item.curriculum_list)
        ? item.curriculum_list.map((m: any) => ({
            id: m.id,
            title: m.title,
            lectures: m.lectures === '8 Lectures' ? undefined : m.lectures,
            duration: m.duration === '4 Hours' || m.duration === '4h 20m' ? undefined : m.duration,
            details: [],
          }))
        : [],
      instructorTitle: item.instructor_title || '',
      instructorImage: item.instructor_image || '',
      instructorBio: item.instructor_bio || '',
      digitalAssetUrl: item.digital_asset_url || '',
      digitalAssetName: item.digital_asset_name || '',
      digitalAssetType: item.digital_asset_type || 'pdf',
    }));
  } catch (err) {
    console.error('dbGetCourses exception:', err);
    return null;
  }
}

export async function dbSaveCourse(course: Course): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: course.id,
      name: course.name,
      category: course.category,
      badge: course.badge,
      badge_color: course.badgeColor || 'amber',
      price: course.price,
      original_price: course.originalPrice,
      validity_days: course.validityDays,
      duration: course.duration,
      level: course.level,
      rating: course.rating,
      reviews_count: course.reviewsCount,
      faculty: course.faculty,
      image: course.image,
      modules_count: course.modulesCount,
      tests_count: course.testsCount,
      pdf_notes_count: course.pdfNotesCount,
      description: course.description,
      video_url: course.videoUrl || (course.videoUrls && course.videoUrls[0]) || '',
      video_urls: course.videoUrls || (course.videoUrl ? [course.videoUrl] : []),
      about_course: course.aboutCourse,
      what_you_will_learn: course.whatYouWillLearn || [],
      curriculum_list: course.curriculumList || [],
      instructor_title: course.instructorTitle,
      instructor_image: course.instructorImage,
      instructor_bio: course.instructorBio,
      digital_asset_url: course.digitalAssetUrl,
      digital_asset_name: course.digitalAssetName,
      digital_asset_type: course.digitalAssetType || 'pdf',
    };

    const { error } = await supabase.from('courses').upsert(payload);
    if (error) {
      console.error('dbSaveCourse error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('dbSaveCourse exception:', err);
    return false;
  }
}

export async function dbDeleteCourse(courseId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('courses').delete().eq('id', courseId);
    if (error) {
      console.error('dbDeleteCourse error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('dbDeleteCourse exception:', err);
    return false;
  }
}

export async function dbGetCategories(): Promise<CourseCategory[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error || !data) return null;
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description || '',
    }));
  } catch (err) {
    console.error('dbGetCategories exception:', err);
    return null;
  }
}

export async function dbSaveCategory(category: CourseCategory): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('categories').upsert({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
    return !error;
  } catch (err) {
    return false;
  }
}

export async function dbDeleteCategory(catId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('categories').delete().eq('id', catId);
    return !error;
  } catch (err) {
    return false;
  }
}

export async function dbGetOrders(): Promise<OrderRecord[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((o: any) => ({
      id: o.id,
      studentName: o.student_name,
      studentEmail: o.student_email,
      studentPhone: o.student_phone || '',
      courseId: o.course_id,
      courseTitle: o.course_title,
      amount: Number(o.amount),
      gateway: o.gateway || 'Razorpay',
      paymentId: o.payment_id,
      date: o.date,
      status: o.status || 'SUCCESS',
    }));
  } catch (err) {
    return null;
  }
}

export async function dbSaveOrder(order: OrderRecord): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('orders').upsert({
      id: order.id,
      student_name: order.studentName,
      student_email: order.studentEmail,
      student_phone: order.studentPhone,
      course_id: order.courseId,
      course_title: order.courseTitle,
      amount: order.amount,
      gateway: order.gateway,
      payment_id: order.paymentId,
      date: order.date,
      status: order.status,
    });
    return !error;
  } catch (err) {
    return false;
  }
}

export async function dbGetStudents(): Promise<Student[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('students').select('*');
    if (error || !data) return null;

    return data.map((s: any) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      phone: s.phone || '',
      password: s.password || '',
      joinDate: s.join_date || '',
      courses: Array.isArray(s.courses) ? s.courses : [],
    }));
  } catch (err) {
    return null;
  }
}

export async function dbSaveStudent(student: Student): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('students').upsert({
      id: String(student.id),
      name: student.name,
      email: student.email,
      phone: student.phone,
      password: student.password,
      join_date: student.joinDate,
      courses: student.courses,
    });
    return !error;
  } catch (err) {
    return false;
  }
}

export async function dbDeleteStudent(studentId: string | number): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('students').delete().eq('id', String(studentId));
    return !error;
  } catch (err) {
    return false;
  }
}

export async function dbGetRazorpayConfig(): Promise<RazorpayConfig | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('razorpay_config')
      .select('*')
      .eq('id', 'primary')
      .maybeSingle();

    if (error || !data) return null;

    return {
      enabled: Boolean(data.enabled),
      keyId: data.key_id,
      keySecret: data.key_secret,
    };
  } catch (err) {
    return null;
  }
}

export async function dbSaveRazorpayConfig(config: RazorpayConfig): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('razorpay_config').upsert({
      id: 'primary',
      enabled: config.enabled,
      key_id: config.keyId,
      key_secret: config.keySecret,
    });
    return !error;
  } catch (err) {
    return false;
  }
}

export async function dbGetSiteContent(): Promise<SiteContent | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('id', 'primary')
      .maybeSingle();

    if (error || !data) return null;

    return {
      heroHeading: data.hero_heading || '',
      heroLede: data.hero_lede || '',
      contactPhone: data.contact_phone || '',
      contactEmail: data.contact_email || '',
      heroImage: data.hero_image || '',
      promoVideoUrl: data.promo_video_url || '',
    };
  } catch (err) {
    return null;
  }
}

export async function dbSaveSiteContent(content: SiteContent): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('site_content').upsert({
      id: 'primary',
      hero_heading: content.heroHeading,
      hero_lede: content.heroLede,
      contact_phone: content.contactPhone,
      contact_email: content.contactEmail,
      hero_image: content.heroImage,
      promo_video_url: content.promoVideoUrl,
    });
    return !error;
  } catch (err) {
    return false;
  }
}

export async function dbGetTestimonials(): Promise<Testimonial[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data) return null;

    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      role: t.role || 'Student',
      initials: t.initials || 'S',
      avatarBg: t.avatar_bg || 'bg-emerald-100 text-emerald-800',
      quote: t.quote,
      rating: Number(t.rating) || 5,
    }));
  } catch (err) {
    return null;
  }
}

export async function dbSaveTestimonial(testimonial: Testimonial): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload: any = {
      name: testimonial.name,
      role: testimonial.role,
      initials: testimonial.initials,
      avatar_bg: testimonial.avatarBg,
      quote: testimonial.quote,
      rating: testimonial.rating || 5,
    };
    if (testimonial.id) {
      payload.id = testimonial.id;
    }
    const { error } = await supabase.from('testimonials').upsert(payload);
    return !error;
  } catch (err) {
    return false;
  }
}

export async function dbDeleteTestimonial(id: string | number): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    return !error;
  } catch (err) {
    return false;
  }
}

export async function dbSignUpStudent(email: string, password: string, name: string) {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'student' },
      },
    });
    if (error) {
      console.warn('Supabase auth signUp error:', error.message);
      return { user: null, error: error.message };
    }
    return { user: data.user, error: null };
  } catch (err: any) {
    return { user: null, error: err?.message || 'Authentication error' };
  }
}

export async function dbSignInStudent(email: string, password: string) {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.warn('Supabase auth signIn error:', error.message);
      return { user: null, error: error.message };
    }
    return { user: data.user, error: null };
  } catch (err: any) {
    return { user: null, error: err?.message || 'Authentication error' };
  }
}

export async function dbSignOutStudent() {
  if (!isSupabaseConfigured()) return;
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Supabase signOut error:', err);
  }
}

export async function uploadFileToSupabaseStorage(
  file: File,
  folder: string = 'courses'
): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const rawExt = file.name.split('.').pop() || 'png';
    const cleanExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanBaseName = file.name
      .substring(0, file.name.lastIndexOf('.'))
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_');
    const fileName = `${folder}/${Date.now()}_${cleanBaseName || 'file'}.${cleanExt}`;

    const { error: uploadError } = await supabase.storage
      .from('course-assets')
      .upload(fileName, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      console.error('Supabase Storage Upload Error:', uploadError.message || uploadError);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('course-assets')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('uploadFileToSupabaseStorage exception:', err);
    return null;
  }
}

