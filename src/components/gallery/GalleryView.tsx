import React, { useState } from 'react';
import { X, ZoomIn, Layers, Camera, ShieldCheck, Sparkles } from 'lucide-react';
import { MechanicalCard, IndustrialBadge } from '../common/TactileElements';
import { galleryItemsData } from '../../data/roofingData';
import { GalleryItem } from '../../types';

export function GalleryView() {
  const [filter, setFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filtered = filter === 'all'
    ? galleryItemsData
    : galleryItemsData.filter((img: GalleryItem) => img.category === filter);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Field Archives</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1B1F] tracking-tight">
          Field Installation & Diagnostic Photography
        </h1>
        <p className="text-sm sm:text-base text-[#49454F] leading-relaxed">
          High-resolution documentation of robotic heat-welds, 24-gauge standing seam lock details, calibrated FLIR thermal radiometry, and custom parapet counter-flashings.
        </p>

        {/* Filter categories as Material 3 chips */}
        <div className="pt-4 flex flex-wrap justify-center gap-2.5">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'commercial', label: 'Single-Ply TPO/PVC' },
            { id: 'metal', label: 'Standing Seam Metal' },
            { id: 'residential', label: 'Architectural Shingle' },
            { id: 'drone', label: 'Drone & Thermal' },
            { id: 'flashing', label: 'Parapet & Flashing Detail' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                filter === cat.id
                  ? 'bg-[#6750A4] text-white shadow-sm'
                  : 'bg-[#E8DEF8] text-[#1D192B] hover:bg-[#EADDFF]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-Style Responsive Grid (Material 3 Surface Container) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative rounded-3xl overflow-hidden bg-[#F3EDF7] p-3 shadow-sm border border-[#E7E0EC] cursor-pointer hover:shadow-md hover:scale-[1.015] transition-all duration-300"
          >
            <div className="relative h-60 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#1C1B1F]/0 group-hover:bg-[#1C1B1F]/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-11 h-11 rounded-full bg-[#6750A4] text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-[#1C1B1F]/80 backdrop-blur-sm text-[10px] text-white px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                {item.category}
              </div>
            </div>

            <div className="pt-3.5 px-2 pb-1.5">
              <h4 className="text-sm font-extrabold text-[#1C1B1F] group-hover:text-[#6750A4] transition-colors line-clamp-1">
                {item.title}
              </h4>
              <p className="text-xs text-[#49454F] mt-1 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Zoom Dialog (Material 3 Dialog) */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1B1F]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FFFBFE] rounded-3xl overflow-hidden border border-[#E7E0EC] shadow-2xl text-[#1C1B1F]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#F3EDF7] text-[#1C1B1F] flex items-center justify-center hover:bg-[#E8DEF8] active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-[400px] sm:h-[500px] bg-black">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#F3EDF7] border-t border-[#E7E0EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#6750A4] font-bold uppercase tracking-wider">
                  {activeImage.category} Specification Archive
                </div>
                <h3 className="text-xl font-extrabold text-[#1C1B1F] mt-0.5">
                  {activeImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#49454F] mt-1">
                  {activeImage.caption}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 bg-[#C8E6C9] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1B5E20]">
                <ShieldCheck className="w-4 h-4" />
                <span>FIELD VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
