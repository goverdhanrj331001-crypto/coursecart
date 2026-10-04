'use client';

import React, { useState } from 'react';
import { Plus, Search, Trash2, Star } from 'lucide-react';
import { Testimonial } from '@/lib/brainbridge-data';

interface AdminTestimonialsTabProps {
  testimonials: Testimonial[];
  onSaveTestimonial: (t: Omit<Testimonial, 'id'> & { id?: string | number }) => Promise<void>;
  onDeleteTestimonial: (id: string | number) => Promise<void>;
}

export function AdminTestimonialsTab({
  testimonials,
  onSaveTestimonial,
  onDeleteTestimonial,
}: AdminTestimonialsTabProps) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | number | undefined>(undefined);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [colorScheme, setColorScheme] = useState('bg-emerald-100 text-emerald-800');

  const avatarColors = [
    { label: 'Green', value: 'bg-emerald-100 text-emerald-800' },
    { label: 'Blue', value: 'bg-blue-100 text-blue-800' },
    { label: 'Amber', value: 'bg-amber-100 text-amber-800' },
    { label: 'Rose', value: 'bg-rose-100 text-rose-800' },
    { label: 'Purple', value: 'bg-purple-100 text-purple-800' },
  ];

  const handleOpenAdd = () => {
    setEditingId(undefined);
    setName('');
    setRole('Student');
    setRating(5);
    setQuote('');
    setColorScheme('bg-emerald-100 text-emerald-800');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setName(t.name);
    setRole(t.role);
    setRating(t.rating || 5);
    setQuote(t.quote);
    setColorScheme(t.avatarBg);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      alert('Please fill name and review text.');
      return;
    }

    const parts = name.split(' ');
    const initials = parts.map((p) => p[0]).join('').substring(0, 2).toUpperCase() || 'S';

    await onSaveTestimonial({
      id: editingId,
      name,
      role,
      initials,
      avatarBg: colorScheme,
      quote,
      rating,
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-navy-admin">Student Reviews &amp; Testimonials</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage featured student testimonials, ratings, and success stories across the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="bg-navy-admin hover:bg-navy-admin-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or review..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-navy-admin"
          />
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-slate-700 uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Reviewer</th>
                <th className="p-3.5">Designation</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5">Quote / Review</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {testimonials
                .filter(
                  (t) =>
                    t.name.toLowerCase().includes(search.toLowerCase()) ||
                    t.quote.toLowerCase().includes(search.toLowerCase())
                )
                .map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${t.avatarBg} font-bold text-[10px] flex items-center justify-center`}>
                          {t.initials}
                        </div>
                        <span className="font-bold text-slate-900">{t.name}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600">{t.role}</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{t.rating || 5}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-500 max-w-xs truncate">{t.quote}</td>
                    <td className="p-3.5 text-right space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(t)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-[11px] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this review?')) {
                            await onDeleteTestimonial(t.id!);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 font-bold"
                        title="Delete testimonial"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-navy-admin text-white p-5 flex items-center justify-between">
              <h3 className="font-extrabold text-sm tracking-tight text-white">
                {editingId ? 'Edit Testimonial' : 'Create New Testimonial'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white font-bold text-xs"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4">

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Student Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aman Saini"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-navy-admin"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Designation / Role *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. NEET Ranker, Web Developer"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-navy-admin"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Rating Stars</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-navy-admin"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Avatar Color</label>
                  <select
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-navy-admin"
                  >
                    {avatarColors.map((col) => (
                      <option key={col.value} value={col.value}>
                        {col.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Quote / Review Content *</label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Write student testimonial or success story here..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-navy-admin resize-none"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-admin hover:bg-navy-admin-hover text-white rounded-xl text-xs font-bold"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

