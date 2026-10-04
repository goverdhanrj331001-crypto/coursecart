'use client';

import React from 'react';
import Image from 'next/image';
import { Video } from 'lucide-react';
import { convertToEmbedUrl } from '@/lib/brainbridge-data';

interface OwnerMediaSectionProps {
  heroImage?: string;
  promoVideoUrl?: string;
}

export function OwnerMediaSection({
  heroImage,
  promoVideoUrl,
}: OwnerMediaSectionProps) {
  const embedUrl = convertToEmbedUrl(promoVideoUrl || '');

  if (!heroImage && !embedUrl) {
    return null;
  }

  return (
    <section className="py-16 bg-cream border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink mb-2">
            <Video className="w-3.5 h-3.5 text-amber" />
            <span>Institute Showcase</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
            Inside BrainBridge Academy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {heroImage ? (
            <div className="relative rounded-2xl overflow-hidden border border-line h-72 sm:h-96 shadow-md bg-slate-100">
              <Image
                src={heroImage}
                alt="BrainBridge Academy Campus & Mentorship"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}

          {embedUrl ? (
            <div className="rounded-2xl overflow-hidden border border-line shadow-md bg-black aspect-video w-full">
              <iframe
                src={embedUrl}
                title="BrainBridge Academy Overview"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

