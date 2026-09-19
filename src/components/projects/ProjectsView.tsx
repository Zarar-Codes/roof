import React, { useState } from 'react';
import { ArrowRight, Layers, MapPin, Calendar, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, IndustrialBadge } from '../common/TactileElements';
import { Project } from '../../types';
import { BeforeAfterSlider } from '../home/BeforeAfterSlider';

interface ProjectsViewProps {
  projects: Project[];
  onNavigate: (route: string) => void;
  onRequestQuote: () => void;
}

export function ProjectsView({
  projects,
  onNavigate,
  onRequestQuote
}: ProjectsViewProps) {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.serviceCategory === filter);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Field Case Studies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1B1F] tracking-tight">
          Engineered Roofing Case Studies
        </h1>
        <p className="text-sm sm:text-base text-[#49454F] leading-relaxed">
          Examine verified building envelope installations across manufacturing logistics facilities, mid-rise commercial properties, and luxury standing seam residences.
        </p>

        {/* Filter Pills as Material 3 Chips */}
        <div className="pt-4 flex flex-wrap justify-center gap-2.5">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'commercial', label: 'Commercial TPO & PVC' },
            { id: 'metal', label: 'Standing Seam Metal' },
            { id: 'residential', label: 'Impact Architectural Shingle' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                filter === item.id
                  ? 'bg-[#6750A4] text-white shadow-sm'
                  : 'bg-[#E8DEF8] text-[#1D192B] hover:bg-[#EADDFF]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Interactive Before/After Component */}
      <div className="pt-2">
        <BeforeAfterSlider projects={projects} />
      </div>

      {/* Detailed Project Cards Grid (Material 3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="rounded-3xl bg-[#F3EDF7] p-6 sm:p-7 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 border border-[#E7E0EC] space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Dual image thumbnail */}
              <div className="grid grid-cols-2 gap-2 h-48 rounded-2xl overflow-hidden shadow-inner">
                <div className="relative overflow-hidden group">
                  <img src={proj.beforeImage} alt={`Before ${proj.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute bottom-2 left-2 bg-[#1C1B1F]/90 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    PRIOR
                  </span>
                </div>
                <div className="relative overflow-hidden group">
                  <img src={proj.afterImage} alt={`After ${proj.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute bottom-2 right-2 bg-[#2E7D32] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    RESTORED
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-[#49454F] font-bold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#6750A4]" />
                    <span>{proj.location}</span>
                  </span>
                  <span className="bg-[#E8DEF8] px-3 py-1 rounded-full text-[#1D192B]">{proj.sqFt.toLocaleString()} SQ FT</span>
                </div>

                <h3 className="text-xl font-extrabold text-[#1C1B1F] mt-2 tracking-tight">
                  {proj.title}
                </h3>

                <p className="text-xs text-[#49454F] mt-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="p-3.5 bg-white/70 rounded-2xl border border-[#E7E0EC] text-xs space-y-1">
                <div><strong className="text-[#6750A4]">SPEC: </strong><span className="font-semibold text-[#1C1B1F]">{proj.material}</span></div>
                <div className="text-[#49454F]"><strong>COMPLETED: </strong>{proj.completedDate} • {proj.pitch}</div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                {proj.technicalHighlights.map((th, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#1C1B1F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                    <span className="font-medium">{th}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E0EC] flex justify-between items-center">
              <span className="text-xs font-bold text-[#6750A4] uppercase tracking-wider">
                {proj.serviceCategory}
              </span>
              <button
                onClick={onRequestQuote}
                className="text-xs font-bold text-[#6750A4] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Request Similar Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA (Material 3 Dark Tonal) */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-[#21005D] text-white text-center space-y-4 shadow-sm">
        <h3 className="text-2xl sm:text-3xl font-extrabold">Have a Similar Facility in Need of Specification?</h3>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
          Our engineering staff will generate full architectural wind uplift calculations and on-site core inspection reports.
        </p>
        <div className="pt-2">
          <TactileButton variant="primary" onClick={onRequestQuote} className="bg-white !text-[#21005D] hover:bg-[#EADDFF]">
            <span>Request Comprehensive Project Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </TactileButton>
        </div>
      </div>
    </div>
  );
}
