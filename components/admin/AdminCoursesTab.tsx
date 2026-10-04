'use client';

import React from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Course } from '@/lib/brainbridge-data';

interface AdminCoursesTabProps {
  courses: Course[];
  courseSearch: string;
  setCourseSearch: (val: string) => void;
  onOpenAddCourse: () => void;
  onOpenEditCourse: (c: Course) => void;
  onDeleteCourse: (cId: string) => void;
}

export function AdminCoursesTab({
  courses,
  courseSearch,
  setCourseSearch,
  onOpenAddCourse,
  onOpenEditCourse,
  onDeleteCourse,
}: AdminCoursesTabProps) {
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-navy-admin">Courses Catalog</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage active courses, add new courses, or edit pricing and details.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddCourse}
          className="bg-navy-admin hover:bg-navy-admin-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Course</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={courseSearch}
            onChange={(e) => setCourseSearch(e.target.value)}
            placeholder="Search course title or faculty..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-navy-admin"
          />
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Course Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Faculty</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses
                .filter(
                  (c) =>
                    c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
                    c.faculty?.toLowerCase().includes(courseSearch.toLowerCase())
                )
                .map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div>{c.name}</div>
                      {c.badge && (
                        <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                          {c.badge}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-600">{c.category}</td>
                    <td className="p-3.5 font-black text-slate-900">₹{c.price || 499}</td>
                    <td className="p-3.5 text-slate-600">{c.faculty || 'Surendra Sir'}</td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => onOpenEditCourse(c)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteCourse(c.id)}
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
    </div>
  );
}

