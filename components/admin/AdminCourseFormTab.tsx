'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Save,
  BookOpen,
  Tag,
  User,
  Zap,
  Video,
  FolderTree,
  Download,
  Lock,
  Upload,
  Loader2,
  ImageIcon,
} from 'lucide-react';
import { CourseCategory } from '@/lib/brainbridge-data';
import { uploadFileToSupabaseStorage } from '@/lib/supabase-service';

export interface CourseFormData {
  name: string;
  category: string;
  badge: string;
  badgeColor: 'amber' | 'emerald' | 'blue';
  price: number;
  originalPrice: number;
  validityDays: number;
  duration: string;
  level: string;
  rating: number;
  reviewsCount: string;
  faculty: string;
  image: string;
  modulesCount: number;
  testsCount: number;
  pdfNotesCount: number;
  description: string;
  videoUrl: string;
  videoUrlsRaw: string;
  aboutCourse: string;
  whatYouWillLearnRaw: string;
  curriculumRaw: string;
  instructorTitle: string;
  instructorImage: string;
  instructorBio: string;

  digitalAssetUrl: string;
  digitalAssetName: string;
  digitalAssetType: 'pdf' | 'image' | 'zip' | 'document' | 'link';
}

interface AdminCourseFormTabProps {
  editingCourseId: string | null;
  courseForm: CourseFormData;
  setCourseForm: React.Dispatch<React.SetStateAction<CourseFormData>>;
  categories: CourseCategory[];
  onSaveCourse: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function AdminCourseFormTab({
  editingCourseId,
  courseForm,
  setCourseForm,
  categories,
  onSaveCourse,
  onCancel,
}: AdminCourseFormTabProps) {
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingInstructor, setUploadingInstructor] = useState(false);
  const [uploadingAsset, setUploadingAsset] = useState(false);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBanner(true);
    try {
      const publicUrl = await uploadFileToSupabaseStorage(file, 'banners');
      if (publicUrl) {
        setCourseForm((prev: CourseFormData) => ({ ...prev, image: publicUrl }));
      } else {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            setCourseForm((prev: CourseFormData) => ({ ...prev, image: event.target!.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('Banner upload error:', err);
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleInstructorPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingInstructor(true);
    try {
      const publicUrl = await uploadFileToSupabaseStorage(file, 'instructors');
      if (publicUrl) {
        setCourseForm((prev: CourseFormData) => ({ ...prev, instructorImage: publicUrl }));
      } else {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            setCourseForm((prev: CourseFormData) => ({ ...prev, instructorImage: event.target!.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('Instructor photo upload error:', err);
    } finally {
      setUploadingInstructor(false);
    }
  };

  const handleDigitalAssetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAsset(true);
    try {
      let fileType: 'pdf' | 'zip' | 'image' | 'document' | 'link' = 'document';
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (ext === 'pdf') fileType = 'pdf';
      else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) fileType = 'zip';
      else if (['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'].includes(ext)) fileType = 'image';
      else if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) fileType = 'document';

      const publicUrl = await uploadFileToSupabaseStorage(file, 'digital-assets');
      if (publicUrl) {
        setCourseForm((prev: CourseFormData) => ({
          ...prev,
          digitalAssetUrl: publicUrl,
          digitalAssetName: file.name,
          digitalAssetType: fileType,
        }));
      } else {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            setCourseForm((prev: CourseFormData) => ({
              ...prev,
              digitalAssetUrl: event.target!.result as string,
              digitalAssetName: file.name,
              digitalAssetType: fileType,
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('Digital asset upload error:', err);
    } finally {
      setUploadingAsset(false);
    }
  };

  return (
    <div className="space-y-6 w-full">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title="Back to Courses List"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-navy-admin">
              {editingCourseId ? 'Edit Course Details' : 'Add New Course'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure course information, pricing, faculty, assets, curriculum, and multiple demo video URLs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSaveCourse}
            className="bg-navy-admin hover:bg-navy-admin-hover text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Save Course</span>
          </button>
        </div>
      </div>

      <form onSubmit={onSaveCourse} className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-8 space-y-6">

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h3 className="font-extrabold text-sm text-navy-admin">1. Basic Course Details</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Course Title *</label>
                <input
                  type="text"
                  required
                  value={courseForm.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseForm({ ...courseForm, name: e.target.value })}
                  placeholder="e.g. Complete Full Stack Web Development"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Category *</label>
                  <select
                    value={courseForm.category}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Target Skill Level
                  </label>
                  <select
                    value={courseForm.level}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCourseForm({ ...courseForm, level: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white cursor-pointer"
                  >
                    <option value="Beginner">Beginner Level</option>
                    <option value="Intermediate">Intermediate Level</option>
                    <option value="Advanced">Advanced / Expert</option>
                    <option value="All Levels">All Skill Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Badge Tag (e.g. Popular, Best Seller)
                  </label>
                  <input
                    type="text"
                    value={courseForm.badge}
                    onChange={(e) => setCourseForm({ ...courseForm, badge: e.target.value })}
                    placeholder="Popular / Hot / New"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Tag className="w-4 h-4 text-emerald-600" />
              <h3 className="font-extrabold text-sm text-navy-admin">2. Pricing Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Offer Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={courseForm.price || ''}
                  onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                  placeholder="e.g. 499"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-extrabold focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  value={courseForm.originalPrice || ''}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, originalPrice: Number(e.target.value) })
                  }
                  placeholder="e.g. 4999"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <span className="text-xs font-bold text-emerald-900">Calculated Discount:</span>
                <span className="text-sm font-black text-emerald-700">
                  {courseForm.originalPrice > courseForm.price
                    ? `${Math.round(
                        ((courseForm.originalPrice - courseForm.price) /
                          courseForm.originalPrice) *
                          100
                      )}% OFF`
                    : 'Flat Price'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-amber-600" />
              <h3 className="font-extrabold text-sm text-navy-admin">
                3. Instructor &amp; Learning Assets
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1.5">
                  Lead Instructor / Faculty *
                </label>
                <input
                  type="text"
                  required
                  value={courseForm.faculty}
                  onChange={(e) => setCourseForm({ ...courseForm, faculty: e.target.value })}
                  placeholder="e.g. Surendra Kumar Saini"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Star Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={courseForm.rating || ''}
                  onChange={(e) => setCourseForm({ ...courseForm, rating: Number(e.target.value) })}
                  placeholder="e.g. 5.0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Modules Count</label>
                <input
                  type="number"
                  value={courseForm.modulesCount || ''}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, modulesCount: Number(e.target.value) })
                  }
                  placeholder="e.g. 10"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Tests Count</label>
                <input
                  type="number"
                  value={courseForm.testsCount || ''}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, testsCount: Number(e.target.value) })
                  }
                  placeholder="e.g. 15"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">PDF Notes Count</label>
                <input
                  type="number"
                  value={courseForm.pdfNotesCount || ''}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, pdfNotesCount: Number(e.target.value) })
                  }
                  placeholder="e.g. 20"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="font-extrabold text-sm text-navy-admin">4. Banner Image</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Banner Image URL *
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    required
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                    placeholder="Upload image or enter Image URL"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-navy-admin focus:bg-white"
                  />
                  <label className="bg-navy-admin hover:bg-navy-admin-hover text-white px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer flex items-center justify-center gap-2 shrink-0 transition-all shadow-xs">
                    {uploadingBanner ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-amber-400" />
                        <span>Upload Image</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerUpload}
                      disabled={uploadingBanner}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Video className="w-4 h-4 text-video-red" />
              <h3 className="font-extrabold text-sm text-navy-admin">
                5. Side Demo Video (Multiple YouTube URLs)
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-bold text-slate-700">
                YouTube Video URLs (One URL per line for demo carousel slider)
              </label>
              <textarea
                rows={3}
                value={courseForm.videoUrlsRaw || courseForm.videoUrl}
                onChange={(e) => {
                  const val = e.target.value;
                  const firstUrl = val.split('\n').map((s) => s.trim()).find((s) => s.length > 0) || '';
                  setCourseForm({
                    ...courseForm,
                    videoUrlsRaw: val,
                    videoUrl: firstUrl,
                  });
                }}
                placeholder="https://www.youtube.com/watch?v=...&#10;https://www.youtube.com/watch?v=..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-mono leading-relaxed focus:outline-none focus:border-navy-admin focus:bg-white"
              />
              <p className="text-[11px] text-slate-500">
                Aap jitne chahe YouTube URLs daal sakte hain. Students frontend par sabhi demo videos carousel slider me dekh sakenge.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h3 className="font-extrabold text-sm text-navy-admin">
                6. About This Course &amp; What You&apos;ll Learn
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  About This Course (Text)
                </label>
                <textarea
                  rows={3}
                  value={courseForm.aboutCourse}
                  onChange={(e) => setCourseForm({ ...courseForm, aboutCourse: e.target.value })}
                  placeholder="Detailed overview for 'About This Course' section on frontend..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 leading-relaxed focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  What You&apos;ll Learn (1 Topic Per Line)
                </label>
                <textarea
                  rows={4}
                  value={courseForm.whatYouWillLearnRaw}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, whatYouWillLearnRaw: e.target.value })
                  }
                  placeholder="HTML5 & Semantic Structure&#10;Next.js 14 App Router&#10;CSS Flexbox & Grid..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-mono leading-relaxed focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FolderTree className="w-4 h-4 text-emerald-600" />
              <h3 className="font-extrabold text-sm text-navy-admin">7. Course Curriculum</h3>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-bold text-slate-700">
                Curriculum Modules (1 Module per line - Title only OR Title; Lectures; Duration)
              </label>
              <textarea
                rows={6}
                value={courseForm.curriculumRaw}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, curriculumRaw: e.target.value })
                }
                placeholder="Module 1: Introduction & Basics&#10;Module 2: Advanced Concepts&#10;Module 3: Full Stack Project&#10;Optional format: Module 4: Deployment; 5 Lectures; 2 Hours"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-mono leading-relaxed focus:outline-none focus:border-navy-admin focus:bg-white"
              />
              <p className="text-[11px] text-slate-500">
                Yaha jo module titles aap likhenge, keval wahi frontend par bina kisi static data ke display honge.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-purple-600" />
              <h3 className="font-extrabold text-sm text-navy-admin">
                8. Instructor Profile &amp; Photo
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Instructor Title / Role
                  </label>
                  <input
                    type="text"
                    value={courseForm.instructorTitle}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, instructorTitle: e.target.value })
                    }
                    placeholder="Full Stack Developer & Senior Mentor"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-navy-admin focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Instructor Photo URL
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={courseForm.instructorImage}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, instructorImage: e.target.value })
                      }
                      placeholder="Upload photo or enter image URL"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-navy-admin focus:bg-white"
                    />
                    <label className="bg-purple-900 hover:bg-purple-950 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-xs">
                      {uploadingInstructor ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-300" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5 text-purple-300" />
                          <span>Upload Photo</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleInstructorPhotoUpload}
                        disabled={uploadingInstructor}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Instructor Bio</label>
                <textarea
                  rows={3}
                  value={courseForm.instructorBio}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, instructorBio: e.target.value })
                  }
                  placeholder="Brief bio about instructor background and experience..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 leading-relaxed focus:outline-none focus:border-navy-admin focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border-2 border-emerald-500/30 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-sm text-navy-admin">
                  9. Digital File Asset (Delivered Immediately After Payment)
                </h3>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Locked Until Paid</span>
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Upload digital file (PDF notes, source code zip, image, e-book, or Drive link).
              Student payment confirm hote hi direct download link unlock ho jayega.
            </p>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Digital Asset Title / File Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.digitalAssetName}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, digitalAssetName: e.target.value })
                    }
                    placeholder="e.g. Complete_FullStack_Notes_and_SourceCode.pdf"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">File Format Type</label>
                  <select
                    value={courseForm.digitalAssetType}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        digitalAssetType: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-navy-admin focus:bg-white cursor-pointer"
                  >
                    <option value="pdf">📄 PDF Document</option>
                    <option value="zip">📦 ZIP Archive / Code</option>
                    <option value="image">🖼️ Image Asset</option>
                    <option value="document">📝 Text / Word Doc</option>
                    <option value="link">🔗 Google Drive / External Link</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Digital Asset File URL / Cloud Link *
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    required
                    value={courseForm.digitalAssetUrl}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, digitalAssetUrl: e.target.value })
                    }
                    placeholder="https://drive.google.com/... or Storage URL"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-navy-admin focus:bg-white"
                  />
                  <label className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer flex items-center justify-center gap-2 shrink-0 transition-all shadow-xs">
                    {uploadingAsset ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Uploading File...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-white" />
                        <span>Upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.zip,.rar,.7z,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp"
                      onChange={handleDigitalAssetUpload}
                      disabled={uploadingAsset}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="sticky top-6 bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black text-navy-admin uppercase tracking-wider">
                Live Card Preview
              </span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                Student View
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
              <div className="relative h-40 bg-slate-800">
                {courseForm.image ? (
                  <Image
                    src={courseForm.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-900">
                    <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
                    <span className="text-[11px] font-medium opacity-60">No Banner Image</span>
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-navy-admin/85 text-amber-400 font-extrabold text-[10px] px-2.5 py-1 rounded-md">
                  {courseForm.category || 'Category'}
                </span>
                {courseForm.badge && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-white font-black text-[10px] px-2 py-0.5 rounded">
                    {courseForm.badge}
                  </span>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-extrabold text-sm text-navy-admin line-clamp-1">
                    {courseForm.name || 'Course Title Preview'}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {courseForm.description || 'Description snippet preview...'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span className="truncate font-semibold">
                    👨‍🏫 {courseForm.faculty || 'Instructor'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-1">
                      ₹{courseForm.originalPrice || 4999}
                    </span>
                    <span className="text-lg font-black text-navy-admin">
                      ₹{courseForm.price || 499}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bg-navy-admin text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full bg-navy-admin hover:bg-navy-admin-hover text-white py-3 rounded-xl font-extrabold text-xs shadow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Publish / Save Course</span>
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
              >
                Back to Courses Catalog
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

