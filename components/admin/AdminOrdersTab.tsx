'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { OrderRecord } from '@/lib/brainbridge-data';

interface AdminOrdersTabProps {
  orders: OrderRecord[];
  orderSearch: string;
  setOrderSearch: (val: string) => void;
}

export function AdminOrdersTab({
  orders,
  orderSearch,
  setOrderSearch,
}: AdminOrdersTabProps) {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-navy-admin">Successful Payment Orders</h1>
          <p className="text-xs text-slate-500 mt-1">
            All verified course purchase transactions via Razorpay.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            placeholder="Search by student name or order ID..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-navy-admin"
          />
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-slate-700 uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Student Details</th>
                <th className="p-3.5">Course Purchased</th>
                <th className="p-3.5">Amount Paid</th>
                <th className="p-3.5">Gateway</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders
                .filter(
                  (o) =>
                    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                    o.studentName.toLowerCase().includes(orderSearch.toLowerCase()) ||
                    o.studentEmail.toLowerCase().includes(orderSearch.toLowerCase())
                )
                .map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{o.id}</td>
                    <td className="p-3.5">
                      <strong className="text-slate-900 block font-bold">{o.studentName}</strong>
                      <span className="text-slate-500 text-[11px]">{o.studentEmail}</span>
                    </td>
                    <td className="p-3.5 text-slate-800 font-medium">{o.courseTitle}</td>
                    <td className="p-3.5 font-black text-slate-900">₹{o.amount}</td>
                    <td className="p-3.5 font-bold text-blue-700">{o.gateway}</td>
                    <td className="p-3.5 text-slate-500">{o.date}</td>
                    <td className="p-3.5">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                        {o.status}
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

