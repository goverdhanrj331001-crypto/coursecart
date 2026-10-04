'use client';

import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { CourseCategory, Course } from '@/lib/brainbridge-data';

interface AdminCategoriesTabProps {
  categories: CourseCategory[];
  courses: Course[];
  onOpenAddCategory: () => void;
  onOpenEditCategory: (cat: CourseCategory) => void;
  onDeleteCategory: (catId: string) => void;
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (open: boolean) => void;
  editingCatId: string | null;
  categoryForm: { name: string; description: string };
  setCategoryForm: React.Dispatch<React.SetStateAction<{ name: string; description: string }>>;
  onSaveCategory: (e: React.FormEvent) => void;
}

export function AdminCategoriesTab({
  categories,
  courses,
  onOpenAddCategory,
  onOpenEditCategory,
  onDeleteCategory,
  isCategoryModalOpen,
  setIsCategoryModalOpen,
  editingCatId,
  categoryForm,
  setCategoryForm,
  onSaveCategory,
}: AdminCategoriesTabProps) {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-navy-admin">Category Management</h1>
          <p className="text-xs text-slate-500 mt-1">Create, edit, or delete course categories.</p>
        </div>
        <button
          type="button"
          onClick={onOpenAddCategory}
          className="bg-navy-admin hover:bg-navy-admin-hover text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const count = courses.filter(
            (c) => c.category.toLowerCase() === cat.name.toLowerCase()
          ).length;
          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  {count} Courses
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onOpenEditCategory(cat)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteCategory(cat.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-navy-admin">{cat.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-navy-admin">
                {editingCatId ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-slate-400 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={onSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. Artificial Intelligence"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-navy-admin"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCategoryForm({ ...categoryForm, description: e.target.value })
                  }
                  placeholder="Category overview..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-navy-admin"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-navy-admin text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

