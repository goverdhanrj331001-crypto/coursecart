'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  ArrowRight,
  Sparkles,
  QrCode,
  Tag,
  Check,
  Clock,
  CheckCircle,
  HelpCircle,
  Award,
  BookOpen,
  Zap,
  Phone,
  Mail,
  User,
  ShieldAlert,
  Download,
  FileText,
} from 'lucide-react';
import { Course, SessionUser, addNotification, addOrder, getRazorpayConfig } from '@/lib/brainbridge-data';

interface CourseCheckoutPageProps {
  course?: Course | null;
  session: SessionUser | null;
  onBack: () => void;
  onCompleteEnrollment: (course: Course, studentData: { name: string; email: string; phone: string }) => void;
  onRequireAuth?: (mode?: 'login' | 'signup') => void;
}

export function CourseCheckoutPage({
  course,
  session,
  onBack,
  onCompleteEnrollment,
  onRequireAuth,
}: CourseCheckoutPageProps) {
  const [name, setName] = useState(session?.name || '');
  const [email, setEmail] = useState(session?.email || '');
  const [phone, setPhone] = useState(session?.phone || '');
  const [city, setCity] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  if (!course) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-navy">No Course Selected for Checkout</h2>
          <p className="text-xs text-slate-500">
            Database me is course ka data uplabdh nahi hai ya koi course select nahi hua hai.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-navy text-white rounded-xl text-xs font-bold hover:bg-navy-dark transition-colors cursor-pointer"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const originalPrice = course.originalPrice || 4999;
  const finalPrice = course.price || 499;

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      if (onRequireAuth) {
        onRequireAuth('signup');
      }
      return;
    }

    if (!email.trim() || !name.trim()) {
      alert('Please enter your name and email address to proceed.');
      return;
    }

    setIsProcessing(true);

    try {
      const rzpConfig = getRazorpayConfig();
      const keyId = rzpConfig.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (rzpConfig.enabled && keyId && keyId.startsWith('rzp_')) {
        const loaded = await loadRazorpayScript();
        if (loaded && (window as any).Razorpay) {
          const options = {
            key: keyId,
            amount: finalPrice * 100,
            currency: 'INR',
            name: 'BrainBridge',
            description: `Course Enrollment: ${course.name}`,
            image: '/images/hero_student.jpg',
            handler: function (response: any) {
              const paymentId = response.razorpay_payment_id || 'PAY_' + Date.now();
              setTxnId(paymentId);
              setIsProcessing(false);
              setIsSuccess(true);
              addNotification({ name, email, phone }, `Course Checkout Paid: ${course.name}`);
              addOrder({
                studentName: name,
                studentEmail: email,
                studentPhone: phone,
                courseId: course.id,
                courseTitle: course.name,
                amount: finalPrice,
                gateway: 'Razorpay',
                paymentId,
              });
            },
            prefill: {
              name,
              email,
              contact: phone,
            },
            theme: {
              color: 'navy',
            },
            modal: {
              ondismiss: function () {
                setIsProcessing(false);
              },
            },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
          return;
        }
      }

      setTimeout(() => {
        const generatedTxn = 'TXN_BB_' + Math.floor(100000 + Math.random() * 900000);
        setTxnId(generatedTxn);
        setIsProcessing(false);
        setIsSuccess(true);

        addNotification({ name, email, phone }, `Full-Page Course Checkout: ${course.name}`);
        addOrder({
          studentName: name,
          studentEmail: email,
          studentPhone: phone,
          courseId: course.id,
          courseTitle: course.name,
          amount: finalPrice,
          gateway: 'Razorpay',
          paymentId: generatedTxn,
        });
      }, 1000);
    } catch (err) {
      setIsProcessing(false);
      const generatedTxn = 'TXN_BB_' + Math.floor(100000 + Math.random() * 900000);
      setTxnId(generatedTxn);
      setIsSuccess(true);
    }
  };

  const handleGoToPortal = () => {
    onCompleteEnrollment(course, { name, email, phone });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[cream] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 inline-block">
              Payment Successful &amp; Enrolled
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[navy]">
              Welcome to {course.name}!
            </h1>
            <p className="text-sm text-slate-600">
              Your enrollment has been confirmed. A confirmation receipt and login credentials have been sent to{' '}
              <strong className="text-slate-900">{email}</strong>.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-3 font-mono">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-sans">Transaction ID</span>
              <span className="font-bold text-slate-900">{txnId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-sans">Student Name</span>
              <span className="font-bold text-slate-900">{name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-sans">Course</span>
              <span className="font-bold text-slate-900 font-sans line-clamp-1">{course.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-sans">Amount Paid</span>
              <span className="font-extrabold text-emerald-700 text-sm font-sans">₹{finalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Access Validity</span>
              <span className="font-bold text-slate-900 font-sans">{course.validityDays || 90} Days (Unlimited Access)</span>
            </div>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-5 text-left space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-sm text-[navy]">
                  🎁 Unlocked Digital Content Asset
                </h3>
              </div>
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Ready to Download
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="font-bold text-xs text-[navy] block truncate">
                    {course.digitalAssetName || `${course.name}_Master_Study_Package.pdf`}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Format: {(course.digitalAssetType || 'pdf').toUpperCase()} Asset
                  </span>
                </div>
              </div>

              <a
                href={course.digitalAssetUrl || course.image || '/images/course_web_dev.jpg'}
                download={course.digitalAssetName || `${course.name}_Asset`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Now</span>
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleGoToPortal}
              className="w-full inline-flex items-center justify-center gap-2 bg-[navy] hover:bg-[navy-dark] text-white py-4 rounded-xl font-bold text-base shadow-lg transition-all cursor-pointer"
            >
              <span>Go to My Learning Portal</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[cream] pb-16">

      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Course Details</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[navy] text-white flex items-center justify-center font-bold text-xs">
              BB
            </div>
            <span className="font-extrabold text-base text-[navy] tracking-tight">BrainBridge</span>
            <span className="hidden sm:inline-block text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono border border-slate-200">
              CHECKOUT
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[navy]">
            Complete Your Course Enrollment
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Instant lifetime access to video lessons, code files, notes, and direct mentor support.
          </p>
        </div>

        <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-7 space-y-6">

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[navy] text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[navy]">Student &amp; Billing Details</h2>
                    <p className="text-xs text-slate-500">
                      Your course dashboard and certificate will be created under these details.
                    </p>
                  </div>
                </div>
                {session ? (
                  <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                    ✓ Logged in as Student
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onRequireAuth?.('login')}
                    className="text-xs text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
                  >
                    Already have an account? Login
                  </button>
                )}
              </div>

              {!session && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🔐</span>
                    <span>
                      To enroll in a course, you must have a <strong>Login</strong> or <strong>Account</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRequireAuth?.('signup')}
                    className="bg-[navy] hover:bg-[navy-dark] text-white px-3.5 py-1.5 rounded-lg font-bold text-xs shrink-0 cursor-pointer shadow-xs"
                  >
                    Create Account
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[navy] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[navy] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mobile / WhatsApp No. <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[navy] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">City / State</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[navy] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-[navy] text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h2 className="text-base font-bold text-[navy]">Select Payment Gateway</h2>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border-2 border-[navy] bg-[navy]/5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[navy] text-white flex items-center justify-center font-black text-lg shadow-sm">
                    R
                  </div>
                  <span className="font-extrabold text-[navy] text-lg sm:text-xl tracking-tight">
                    Razorpay
                  </span>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-emerald-950">7-Day Money Back Guarantee</h4>
                  <p className="text-emerald-800 mt-0.5">
                    If you feel the course is not suitable for you within 7 days, get a 100% full refund with no questions asked.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
                <Zap className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-blue-950">Instant Automatic Access</h4>
                  <p className="text-blue-800 mt-0.5">
                    No waiting period! Your course dashboard unlocks instantly as soon as payment is completed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 space-y-5">
              <h3 className="text-base font-extrabold text-[navy] border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                  1 Item
                </span>
              </h3>

              <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                    {course.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{course.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{course.duration || '12 Weeks'}</span>
                    <span>•</span>
                    <Award className="w-3 h-3 text-slate-400" />
                    <span>Verified Cert</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex justify-between font-medium">
                  <span>Course Enrolment Fee</span>
                  <span className="font-bold text-slate-900">₹{finalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Study Notes &amp; Code Repository</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-extrabold text-[navy] block">Total Amount Payable</span>
                    <span className="text-[10px] text-slate-400">Net total price</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[navy]">₹{finalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full inline-flex items-center justify-center gap-2 bg-[navy] hover:bg-[navy-dark] text-white py-4 rounded-xl text-base font-extrabold shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting to Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Pay ₹{finalPrice} via Razorpay</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2.5 text-xs text-slate-700 font-medium">
                <span className="font-bold text-slate-900 block mb-1">What happens after payment:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant access to 50+ video lectures &amp; modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Downloadable PDF revision notes &amp; formula cheat sheets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Access to WhatsApp student doubt clearing group</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official Course Completion Certificate</span>
                </div>
              </div>

              <div className="text-center pt-1 border-t border-slate-100">
                <p className="text-[11px] text-slate-500">
                  Questions? Call/WhatsApp Admissions Helpline at{' '}
                  <a href="tel:+919876543210" className="font-bold text-[navy] hover:underline">
                    +91 98765 43210
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

