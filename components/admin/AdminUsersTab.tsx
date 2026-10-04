'use client';

import React from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { Student, Course } from '@/lib/brainbridge-data';

interface AdminUsersTabProps {
  students: Student[];
  courses: Course[];
  userSearch: string;
  setUserSearch: (val: string) => void;
  onOpenAddUser: () => void;
  onDeleteUser: (userId: string | number) => void;
  isUserModalOpen: boolean;
  setIsUserModalOpen: (open: boolean) => void;
  newUserName: string;
  setNewUserName: (val: string) => void;
  newUserEmail: string;
  setNewUserEmail: (val: string) => void;
  newUserPhone: string;
  setNewUserPhone: (val: string) => void;
  newUserCourseId: string;
  setNewUserCourseId: (val: string) => void;
  onSaveNewUser: (e: React.FormEvent) => void;
}

export function AdminUsersTab({
  students,
  courses,
  userSearch,
  setUserSearch,
  onOpenAddUser,
  onDeleteUser,
  isUserModalOpen,
  setIsUserModalOpen,
  newUserName,
  setNewUserName,
  newUserEmail,
  setNewUserEmail,
  newUserPhone,
  setNewUserPhone,
  newUserCourseId,
  setNewUserCourseId,
  onSaveNewUser,
}: AdminUsersTabProps) {
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-navy-admin">Registered Users / Students</h1>
          <p className="text-xs text-slate-500 mt-1">
            Directory of registered students and account management.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddUser}
          className="bg-navy-admin hover:bg-navy-admin-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Student</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Search user name or email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-navy-admin"
          />
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-slate-700 uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Email / Phone</th>
                <th className="p-3.5">Join Date</th>
                <th className="p-3.5">Courses Count</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students
                .filter(
                  (s) =>
                    s.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                    s.email.toLowerCase().includes(userSearch.toLowerCase())
                )
                .map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                    <td className="p-3.5">
                      <div className="text-slate-800 font-medium">{s.email}</div>
                      <div className="text-[11px] text-slate-500">{s.phone}</div>
                    </td>
                    <td className="p-3.5 text-slate-500">{s.joinDate || '2026-01-10'}</td>
                    <td className="p-3.5 font-bold text-slate-800">
                      {s.courses.length} Enrolled
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => onDeleteUser(s.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-navy-admin">Add New Student Account</h3>
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="text-slate-400 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={onSaveNewUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Student Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-navy-admin"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-navy-admin"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-navy-admin"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Enroll in Course</label>
                <select
                  value={newUserCourseId}
                  onChange={(e) => setNewUserCourseId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-navy-admin"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-navy-admin text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow cursor-pointer"
                >
                  Create Student Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

