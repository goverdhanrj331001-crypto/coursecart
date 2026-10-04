'use client';

import React from 'react';
import {
  LayoutDashboard,
  FolderTree,
  BookOpen,
  CreditCard,
  ShoppingCart,
  Users,
  ExternalLink,
  LogOut,
  Star,
} from 'lucide-react';
import { BB_OWNER } from '@/lib/brainbridge-data';

export type AdminTab =
  | 'dashboard'
  | 'categories'
  | 'courses'
  | 'course-form'
  | 'payment'
  | 'orders'
  | 'users'
  | 'testimonials';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  coursesCount: number;
  ordersCount: number;
  studentsCount: number;
  razorpayEnabled: boolean;
  onNavigateHome: () => void;
  onLogout: () => void;
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  coursesCount,
  ordersCount,
  studentsCount,
  razorpayEnabled,
  onNavigateHome,
  onLogout,
}: AdminSidebarProps) {
  return (
    <aside className="w-full lg:w-64 bg-navy-admin border-r border-slate-800 shrink-0 flex flex-col justify-between p-4 space-y-8">
      <div className="space-y-6">

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-navy-admin flex items-center justify-center font-extrabold text-sm shadow-md">
              BB
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight block">
                BrainBridge
              </span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
                ADMIN PANEL
              </span>
            </div>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-amber-400 text-navy-admin shadow-md'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-amber-400 text-navy-admin shadow-md'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Categories</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'courses' || activeTab === 'course-form'
                ? 'bg-amber-400 text-navy-admin shadow-md'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4" />
              <span>Courses Catalog</span>
            </div>
            <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full">
              {coursesCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'payment'
                ? 'bg-amber-400 text-navy-admin shadow-md'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4" />
              <span>Payment Gateway</span>
            </div>
            <span
              className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                razorpayEnabled
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {razorpayEnabled ? 'ENABLED' : 'OFF'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-amber-400 text-navy-admin shadow-md'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-4 h-4" />
              <span>Orders</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-extrabold">
              {ordersCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-amber-400 text-navy-admin shadow-md'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>Users / Students</span>
            </div>
            <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full">
              {studentsCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'testimonials'
                ? 'bg-amber-400 text-navy-admin shadow-md'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Learner Reviews</span>
          </button>
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-400">
            {BB_OWNER.name.charAt(0)}
          </div>
          <div className="truncate">
            <span className="text-xs font-bold text-white block truncate">{BB_OWNER.name}</span>
            <span className="text-[10px] text-slate-400 block truncate">{BB_OWNER.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Site</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Kya aap Admin Panel se Logout karna chahte hain?')) {
                onLogout();
              }
            }}
            className="flex-1 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 hover:text-red-300 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            title="Logout from Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

