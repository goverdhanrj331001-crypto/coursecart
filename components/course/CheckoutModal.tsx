'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
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
} from 'lucide-react';
import { Course, SessionUser, addNotification } from '@/lib/brainbridge-data';

interface CheckoutModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  session: SessionUser | null;
  onSuccess: (course: Course, studentData: { name: string; email: string; phone: string }) => void;
}

export function CheckoutModal({
  course,
  isOpen,
  onClose,
  session,
  onSuccess,
}: CheckoutModalProps) {

  const [name, setName] = useState(session?.name || '');
  const [email, setEmail] = useState(session?.email || '');
  const [phone, setPhone] = useState(session?.phone || '');

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiOption, setUpiOption] = useState<'qr' | 'id'>('qr');
  const [upiId, setUpiId] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      alert('Please enter your name and email address to proceed.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxn = 'TXN_BB_' + Math.floor(100000 + Math.random() * 900000);
      setTxnId(generatedTxn);
      setIsProcessing(false);
      setIsSuccess(true);

      addNotification({ name, email, phone }, `Course Checkout: ${course.name}`);
    }, 1400);
  };

  const handleFinishSuccess = () => {
    onSuccess(course, { name, email, phone });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[navy] text-white flex items-center justify-center text-xs font-bold font-mono">
              BB
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <span>Secure Checkout</span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                  <Lock className="w-2.5 h-2.5" />
                  256-Bit SSL Encrypted
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">BrainBridge Learning Platform · Course Admission</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {!isSuccess ? (
            <form onSubmit={handlePay} className="space-y-6">

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                      {course.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{course.name}</h4>
                    <span className="text-xs text-slate-500">{course.duration} • 90 Days Validity &amp; Free Updates</span>
                  </div>
                </div>

                <div className="text-right sm:border-l border-slate-200 sm:pl-4 shrink-0">
                  <div className="text-xs text-slate-400 line-through">₹{course.originalPrice || 4999}</div>
                  <div className="text-xl font-extrabold text-[navy]">₹{course.price || 499}</div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    90% Savings
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  1. Student Account Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[navy]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Email (for Login &amp; Notes)</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya@example.com"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[navy]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Mobile / WhatsApp No.</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[navy]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Select Payment Method
                </h4>

                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'upi'
                        ? 'border-[navy] bg-blue-50/50 text-[navy] font-bold shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span className="text-xs">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-[navy] bg-blue-50/50 text-[navy] font-bold shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span className="text-xs">Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'netbanking'
                        ? 'border-[navy] bg-blue-50/50 text-[navy] font-bold shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Building className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs">NetBanking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'wallet'
                        ? 'border-[navy] bg-blue-50/50 text-[navy] font-bold shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Wallet className="w-4 h-4 text-purple-600" />
                    <span className="text-xs">Wallets</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                        <button
                          type="button"
                          onClick={() => setUpiOption('qr')}
                          className={`text-xs font-semibold px-3 py-1 rounded-md transition-colors ${
                            upiOption === 'qr' ? 'bg-[navy] text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Scan UPI QR Code
                        </button>
                        <button
                          type="button"
                          onClick={() => setUpiOption('id')}
                          className={`text-xs font-semibold px-3 py-1 rounded-md transition-colors ${
                            upiOption === 'id' ? 'bg-[navy] text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Enter UPI ID
                        </button>
                      </div>

                      {upiOption === 'qr' ? (
                        <div className="flex flex-col sm:flex-row items-center gap-5">

                          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs shrink-0 text-center">
                            <div className="w-28 h-28 bg-slate-900 text-white rounded-lg flex flex-col items-center justify-center p-2 font-mono text-[9px] relative">
                              <QrCode className="w-20 h-20 text-white opacity-95" />
                              <span className="absolute bottom-1 bg-amber-400 text-slate-900 px-1 font-bold rounded">
                                ₹{course.price || 499}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono block mt-1">
                              UPI: 9024303988@upi
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-slate-600">
                            <p className="font-semibold text-slate-900">
                              Scan with any UPI App on your phone:
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-700">
                              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded font-medium">Google Pay</span>
                              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded font-medium">PhonePe</span>
                              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded font-medium">Paytm</span>
                              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded font-medium">BHIM</span>
                              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded font-medium">CRED</span>
                            </div>
                            <p className="text-[11px] text-emerald-700 pt-1">
                              ✓ Automatic instant course enrollment upon confirmation.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-slate-700">Enter your UPI VPA / ID</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. yourname@okhdfcbank or 9990011111@paytm"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[navy]"
                          />
                          <p className="text-[11px] text-slate-500">
                            We will send a payment collect request directly to your UPI mobile app.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-[navy]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">Expires (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-[navy]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">CVV / CVC</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-[navy]"
                          />
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Supports Visa, MasterCard, RuPay, Maestro &amp; Corporate Cards.
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-slate-700">Select Bank</label>
                      <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[navy]">
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                        <option>Punjab National Bank</option>
                      </select>
                      <p className="text-[11px] text-slate-500">
                        You will be redirected to your secure bank net banking portal.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <button type="button" className="p-2 border border-slate-200 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100">
                          Paytm Wallet
                        </button>
                        <button type="button" className="p-2 border border-slate-200 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100">
                          Mobikwik
                        </button>
                        <button type="button" className="p-2 border border-slate-200 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100">
                          Amazon Pay
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700">Total Payable Amount:</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[navy]">
                      ₹{course.price || 499}
                    </span>
                    <span className="text-[11px] text-slate-500 block">All inclusive · Zero hidden fee</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[navy] hover:bg-[navy-dark] text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Payment with Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ₹{course.price || 499} &amp; Start Learning</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center gap-1 text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>30-Day Money Back Guarantee</span>
                  </div>
                  <span>•</span>
                  <span>Instant Activation</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 px-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Payment Successful!</span>
                <h3 className="text-2xl font-bold text-slate-900">
                  Welcome to {course.name} 🎉
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your enrollment is confirmed. We have sent the login credentials and tax receipt to{' '}
                  <strong className="text-slate-900">{email}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 max-w-md mx-auto text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-bold text-slate-900">{txnId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">₹{course.price || 499}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Course Validity:</span>
                  <span className="text-slate-900">{course.validityDays || 90} Days Full Access</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="text-slate-900">{name}</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleFinishSuccess}
                  className="inline-flex items-center gap-2 bg-[navy] hover:bg-[navy-dark] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Go to My Learning Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

