'use client';

import React from 'react';
import { ShieldCheck, TrendingUp, BookOpen, Users, ShoppingCart, ArrowRight } from 'lucide-react';
import { OrderRecord } from '@/lib/brainbridge-data';

interface AdminOverviewTabProps {
  razorpayEnabled: boolean;
  totalRevenue: number;
  coursesCount: number;
  categoriesCount: number;
  studentsCount: number;
  orders: OrderRecord[];
  onViewAllOrders: () => void;
}

export function AdminOverviewTab({
  razorpayEnabled,
  totalRevenue,
  coursesCount,
  categoriesCount,
  studentsCount,
  orders,
  onViewAllOrders,
}: AdminOverviewTabProps) {
  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-navy-admin">Admin Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time metrics for students, sales revenue, and razorpay gateway status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Razorpay {razorpayEnabled ? 'Active' : 'Disabled'}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            <span>Total Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-navy-admin">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-600 font-bold">
            100% Successful Razorpay Transactions
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            <span>Total Courses</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-navy-admin">{coursesCount}</div>
          <p className="text-[11px] text-slate-500">Across {categoriesCount} categories</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-navy-admin">{studentsCount}</div>
          <p className="text-[11px] text-slate-500">Active learners in database</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            <span>Successful Orders</span>
            <ShoppingCart className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-navy-admin">{orders.length}</div>
          <p className="text-[11px] text-emerald-600 font-bold">Processed via Razorpay Engine</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-navy-admin">Recent Successful Orders</h2>
          <button
            type="button"
            onClick={onViewAllOrders}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-slate-700 uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Course Title</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Gateway</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-mono font-bold text-slate-900">{ord.id}</td>
                  <td className="p-3 font-bold text-slate-800">{ord.studentName}</td>
                  <td className="p-3 text-slate-700">{ord.courseTitle}</td>
                  <td className="p-3 font-extrabold text-slate-900">₹{ord.amount}</td>
                  <td className="p-3 font-bold text-blue-700">{ord.gateway}</td>
                  <td className="p-3 text-slate-500">{ord.date}</td>
                  <td className="p-3">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

