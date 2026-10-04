'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  Smartphone,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import {
  BB_OWNER,
  Course,
  getStoredCourses,
  findStudentByEmail,
  findStudentByPhone,
  getStudents,
  saveStudents,
  setSession,
  addNotification,
  SessionUser,
} from '@/lib/brainbridge-data';
import { isSupabaseConfigured } from '@/lib/supabase';
import { dbSignUpStudent, dbSignInStudent, dbSaveStudent, dbGetCourses } from '@/lib/supabase-service';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup' | 'owner';
  onClose: () => void;
  onSuccess: (session: SessionUser) => void;
}

export function AuthModal({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'owner'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [courseChoice, setCourseChoice] = useState('');

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredCourses();
      if (stored.length > 0) {
        setCoursesList(stored);
        setCourseChoice((prev) => prev || stored[0]?.id || '');
      }
      dbGetCourses().then((dbC) => {
        if (dbC && dbC.length > 0) {
          setCoursesList(dbC);
          setCourseChoice((prev) => prev || dbC[0]?.id || '');
        }
      });
    }
  }, [isOpen]);

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpStep, setOtpStep] = useState<'phone' | 'code'>('phone');
  const [otpPhone, setOtpPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState<'id' | 'code' | 'newpass'>('id');
  const [forgotId, setForgotId] = useState('');
  const [forgotCode, setForgotCode] = useState('');
  const [generatedForgotCode, setGeneratedForgotCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleTabChange = (newMode: 'login' | 'signup' | 'owner') => {
    setMode(newMode);
    setErrorMsg('');
    if (newMode === 'owner') {
      setEmailOrPhone(BB_OWNER.email);
      setPassword('');
    } else {
      if (emailOrPhone === BB_OWNER.email) setEmailOrPhone('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const inputId = emailOrPhone.trim();

      if (mode === 'signup') {
        if (!fullName.trim()) {
          setLoading(false);
          setErrorMsg('Please enter your full name.');
          return;
        }
        if (!/^[0-9]{10}$/.test(phone.trim())) {
          setLoading(false);
          setErrorMsg('Please enter a valid 10-digit mobile number.');
          return;
        }
        if (findStudentByEmail(inputId)) {
          setLoading(false);
          setErrorMsg('An account with this email already exists. Please log in.');
          return;
        }
        if (findStudentByPhone(phone)) {
          setLoading(false);
          setErrorMsg('An account with this phone already exists. Please log in.');
          return;
        }
        if (password.length < 6) {
          setLoading(false);
          setErrorMsg('Password must be at least 6 characters.');
          return;
        }

        const students = getStudents();
        const newStudent = {
          id: 'st_' + Date.now(),
          name: fullName.trim(),
          email: inputId.toLowerCase(),
          phone: phone.trim(),
          password: password,
          joinDate: new Date().toISOString().slice(0, 10),
          courses: [],
        };

        const signupRes = await dbSignUpStudent(inputId.toLowerCase(), password, fullName.trim());
        if (signupRes && signupRes.error) {
          setLoading(false);
          setErrorMsg(signupRes.error);
          return;
        }

        await dbSaveStudent(newStudent);
        students.push(newStudent);
        saveStudents(students);
        addNotification(newStudent, 'signup');

        const sessionUser: SessionUser = {
          email: newStudent.email,
          role: 'student',
          name: newStudent.name,
        };
        setSession(sessionUser);
        setLoading(false);
        onSuccess(sessionUser);
        return;
      }

      if (mode === 'login') {
        if (
          inputId.toLowerCase() === BB_OWNER.email.toLowerCase() &&
          password === BB_OWNER.password
        ) {
          const userSession: SessionUser = {
            email: BB_OWNER.email,
            role: 'owner',
            name: BB_OWNER.name,
          };
          setSession(userSession);
          setLoading(false);
          onSuccess(userSession);
          return;
        }

        const loginRes = await dbSignInStudent(inputId, password);
        if (loginRes && loginRes.error) {
          setLoading(false);
          setErrorMsg(loginRes.error);
          return;
        }

        const student = findStudentByEmail(inputId) || findStudentByPhone(inputId);
        const sessName = student ? student.name : inputId.split('@')[0];
        const sessionUser: SessionUser = {
          email: student?.email || inputId,
          role: 'student',
          name: sessName,
        };
        setSession(sessionUser);
        setLoading(false);
        onSuccess(sessionUser);
        return;
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err?.message || 'Authentication failed. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      const googleUser = {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@gmail.com',
        phone: '9876543210',
      };
      let student = findStudentByEmail(googleUser.email);
      if (!student) {
        const students = getStudents();
        student = {
          id: Date.now(),
          name: googleUser.name,
          email: googleUser.email,
          phone: googleUser.phone,
          password: 'google_oauth_user',
          joinDate: new Date().toISOString().slice(0, 10),
          courses: [
            {
              courseId: 'neet',
              purchaseDate: new Date().toISOString().slice(0, 10),
              expiryDate: new Date(Date.now() + 90 * 86400000)
                .toISOString()
                .slice(0, 10),
              progressPercent: 5,
            },
          ],
        };
        students.push(student);
        saveStudents(students);
        addNotification(student, 'google-oauth');
      }

      const sessionUser: SessionUser = {
        email: student.email,
        role: 'student',
        name: student.name,
      };
      setSession(sessionUser);
      setLoading(false);
      onSuccess(sessionUser);
    }, 500);
  };

  const handleSendOtp = () => {
    if (!/^[0-9]{10}$/.test(otpPhone.trim())) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    const generated = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(generated);
    setOtpStep('code');
  };

  const handleVerifyOtp = () => {
    if (otpCode.trim() !== generatedOtp) {
      alert('Incorrect OTP code. Please enter the simulated code shown.');
      return;
    }

    let student = findStudentByPhone(otpPhone.trim());
    if (!student) {
      const students = getStudents();
      student = {
        id: Date.now(),
        name: `Student (${otpPhone.slice(-4)})`,
        email: `${otpPhone.trim()}@otp.brainbridge.in`,
        phone: otpPhone.trim(),
        password: '',
        joinDate: new Date().toISOString().slice(0, 10),
        courses: [],
      };
      students.push(student);
      saveStudents(students);
      addNotification(student, 'otp-signup');
    }

    const sessionUser: SessionUser = {
      email: student.email,
      role: 'student',
      name: student.name,
    };
    setSession(sessionUser);
    setOtpModalOpen(false);
    onSuccess(sessionUser);
  };

  const handleForgotIdentify = () => {
    const s =
      findStudentByEmail(forgotId.trim()) ||
      findStudentByPhone(forgotId.trim());
    if (!s) {
      alert('No student account found with this email or mobile number.');
      return;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedForgotCode(code);
    setForgotStep('code');
  };

  const handleForgotVerifyCode = () => {
    if (forgotCode.trim() !== generatedForgotCode) {
      alert('Incorrect code entered.');
      return;
    }
    setForgotStep('newpass');
  };

  const handleForgotSavePass = () => {
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters.');
      return;
    }
    const students = getStudents();
    const idx = students.findIndex(
      (s) =>
        s.email.toLowerCase() === forgotId.toLowerCase() ||
        (s.phone && s.phone === forgotId)
    );
    if (idx !== -1) {
      students[idx].password = newPassword;
      saveStudents(students);
    }
    alert('Password updated successfully! Please log in with your new password.');
    setForgotModalOpen(false);
    setMode('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[cream] w-full max-w-md rounded-2xl border border-[line] shadow-2xl overflow-hidden relative">

        <div className="bg-[navy] text-[cream] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-md bg-[amber] text-[navy] font-mono font-bold text-xs flex items-center justify-center">
              Bb
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              BrainBridge
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome back' : 'Start Learning'}
          </h2>
          <p className="text-xs text-[cream]/75 mt-1">
            {mode === 'login'
              ? 'Log in to access your enrolled courses and study material.'
              : 'Create your student account to access courses and resources.'}
          </p>

          <div className="flex items-center gap-1 mt-4 p-1 bg-white/10 rounded-lg">
            <button
              type="button"
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-[amber] text-[navy] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[amber] text-[navy] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[navy] mb-1 font-mono">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your student name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[line] text-sm text-[ink] focus:outline-none focus:border-[navy]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[navy] mb-1 font-mono">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[line] text-sm text-[ink] focus:outline-none focus:border-[navy]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[navy] mb-1 font-mono">
                    Starting Course Focus
                  </label>
                  <select
                    value={courseChoice}
                    onChange={(e) => setCourseChoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[line] text-sm text-[ink] focus:outline-none focus:border-[navy]"
                  >
                    {coursesList.length === 0 ? (
                      <option value="">No courses available</option>
                    ) : (
                      coursesList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} (₹{c.price})
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-[navy] mb-1 font-mono">
                {mode === 'owner' ? 'Institute Owner Email' : 'Email or Mobile Number'}
              </label>
              <input
                type={mode === 'owner' ? 'email' : 'text'}
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder={
                  mode === 'owner' ? 'owner@brainbridge.in' : 'student@example.com / 9990011111'
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[line] text-sm text-[ink] focus:outline-none focus:border-[navy]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[navy] mb-1 font-mono">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-lg bg-white border border-[line] text-sm text-[ink] focus:outline-none focus:border-[navy]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[muted] hover:text-[navy]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-[muted] cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-[navy]" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotModalOpen(true);
                    setForgotStep('id');
                    setForgotId(emailOrPhone || '');
                  }}
                  className="font-semibold text-[navy] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[navy] hover:bg-[navy-dark] text-[cream] rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow disabled:opacity-60 cursor-pointer"
            >
              {loading
                ? 'Processing...'
                : mode === 'login'
                ? 'Log In'
                : mode === 'signup'
                ? 'Create Student Account'
                : 'Sign In to Owner Portal'}
            </button>
          </form>

          {mode !== 'owner' && (
            <div className="mt-5 pt-4 border-t border-[line] space-y-3">
              <div className="text-center">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[muted]">
                  Or Fast Login
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white border border-[line] hover:bg-[cream] text-xs font-semibold text-[ink] transition-colors cursor-pointer"
                >
                  <span className="text-blue-600 font-bold">G</span>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOtpModalOpen(true);
                    setOtpStep('phone');
                  }}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white border border-[line] hover:bg-[cream] text-xs font-semibold text-[ink] transition-colors cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[green]" />
                  <span>OTP Login</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {otpModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border border-[line] shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-[navy]">
                Login via Mobile OTP
              </h3>
              <button onClick={() => setOtpModalOpen(false)}>
                <X className="w-5 h-5 text-[muted]" />
              </button>
            </div>

            {otpStep === 'phone' ? (
              <div className="space-y-4">
                <p className="text-xs text-[muted]">
                  Enter your 10-digit mobile number. A 6-digit OTP code will be simulated for testing.
                </p>
                <input
                  type="tel"
                  placeholder="e.g. 9990011111"
                  value={otpPhone}
                  onChange={(e) => setOtpPhone(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[line] text-sm focus:outline-none focus:border-[navy]"
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-2.5 bg-[navy] text-white rounded-lg text-xs font-bold"
                >
                  Generate OTP Code
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  <span>Simulated OTP Code: </span>
                  <strong className="font-mono text-sm">{generatedOtp}</strong>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full p-3 text-center tracking-widest font-mono text-lg rounded-lg border border-[line]"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full py-2.5 bg-[navy] text-white rounded-lg text-xs font-bold"
                >
                  Verify &amp; Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {forgotModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border border-[line] shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-[navy]">
                Reset Password
              </h3>
              <button onClick={() => setForgotModalOpen(false)}>
                <X className="w-5 h-5 text-[muted]" />
              </button>
            </div>

            {forgotStep === 'id' && (
              <div className="space-y-4">
                <p className="text-xs text-[muted]">
                  Enter the email or phone number associated with your student account.
                </p>
                <input
                  type="text"
                  placeholder="Email or phone"
                  value={forgotId}
                  onChange={(e) => setForgotId(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[line] text-sm"
                />
                <button
                  type="button"
                  onClick={handleForgotIdentify}
                  className="w-full py-2.5 bg-[navy] text-white rounded-lg text-xs font-bold"
                >
                  Send Reset Code
                </button>
              </div>
            )}

            {forgotStep === 'code' && (
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                  <span>Simulated Reset Code: </span>
                  <strong className="font-mono text-sm">{generatedForgotCode}</strong>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  value={forgotCode}
                  onChange={(e) => setForgotCode(e.target.value)}
                  className="w-full p-3 text-center tracking-widest font-mono text-lg rounded-lg border border-[line]"
                />
                <button
                  type="button"
                  onClick={handleForgotVerifyCode}
                  className="w-full py-2.5 bg-[navy] text-white rounded-lg text-xs font-bold"
                >
                  Verify Code
                </button>
              </div>
            )}

            {forgotStep === 'newpass' && (
              <div className="space-y-4">
                <p className="text-xs text-[muted]">
                  Enter your new password (minimum 6 characters).
                </p>
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[line] text-sm"
                />
                <button
                  type="button"
                  onClick={handleForgotSavePass}
                  className="w-full py-2.5 bg-[navy] text-white rounded-lg text-xs font-bold"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

