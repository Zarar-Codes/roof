import React from 'react';
import { ArrowLeft, MapPin, Shield, CheckCircle2, Phone, ArrowRight, FileCheck, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, IndustrialBadge } from '../common/TactileElements';
import { ServiceArea, BusinessConfig } from '../../types';
import { projectsData } from '../../data/roofingData';

interface ServiceAreaDetailViewProps {
  area: ServiceArea;
  business: BusinessConfig;
  onNavigate: (route: string) => void;
  onRequestQuote: (areaName: string) => void;
}

export function ServiceAreaDetailView({
  area,
  business,
  onNavigate,
  onRequestQuote
}: ServiceAreaDetailViewProps) {
  // Find local projects if any match location
  const localProjects = projectsData.filter(p =>
    p.location.toLowerCase().includes(area.city.toLowerCase().split(',')[0])
  );

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-3 text-xs font-bold text-[#49454F]">
        <button
          onClick={() => onNavigate('/service-areas')}
          className="hover:text-[#6750A4] flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ALL SERVICE HUBS</span>
        </button>
        <span>/</span>
        <span className="text-[#1C1B1F]">{area.city}</span>
      </div>

      {/* Hero Banner (Material 3 Dark Tonal Container) */}
      <div className="rounded-[32px] bg-[#21005D] text-white p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#EADDFF]" />
            <span>{area.county} Dispatch Sector</span>
            <span className="text-[#C8E6C9]">● {area.turnaroundTime} RESPONSE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Commercial & Residential Roofing in {area.city}
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
            {area.description} IronClad enforces strict compliance with local municipal amendments, high-velocity wind fastening patterns, and cold-climate drainage requirements.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <TactileButton
              variant="primary"
              onClick={() => onRequestQuote(area.city)}
              className="bg-white !text-[#21005D] hover:bg-[#EADDFF] shadow-sm"
            >
              <span>Request Local Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </TactileButton>

            <a
              href={`tel:${business.primaryPhone.replace(/\D/g, '')}`}
              className="px-6 py-3.5 rounded-full bg-white/10 text-white text-xs uppercase font-bold tracking-wider hover:bg-white/20 border border-white/20 inline-flex items-center gap-2 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 text-[#C8E6C9]" />
              <span>Direct Dispatch: {business.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Building Codes & Engineering Parameters (Material 3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
            Municipal Code Enforcement
          </div>
          <h2 className="text-xl font-extrabold text-[#1C1B1F]">
            Building Codes & Permitting Compliance
          </h2>
          <p className="text-xs sm:text-sm text-[#49454F] leading-relaxed">
            IronClad pulls all necessary building permits directly through the local municipal building department and arranges mandatory intermediate insulation and final watertight inspections.
          </p>
          <div className="space-y-2.5 text-xs pt-2">
            <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0EC]">
              <strong className="text-[#6750A4]">MUNICIPAL CODES: </strong>
              <span className="text-[#1C1B1F]">IBC 2024 / Local Municipal Code Amendments & IECC R-30+</span>
            </div>
            <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0EC]">
              <strong className="text-[#6750A4]">STATE LICENSE: </strong>
              <span className="text-[#1C1B1F]">{business.licenseNumber} (Active & Bonded)</span>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
            Environmental Defense
          </div>
          <h2 className="text-xl font-extrabold text-[#1C1B1F]">
            Substrate & Thermal Stress Factors
          </h2>
          <p className="text-xs sm:text-sm text-[#49454F] leading-relaxed">
            Structural roofs in {area.city} must withstand localized freeze-thaw shifts, heavy wet snow packing, and severe summer thermal swings.
          </p>
          <div className="p-4 bg-white/80 rounded-2xl border border-[#E7E0EC] space-y-1 text-xs">
            <div className="text-[#1C1B1F] font-bold">LOCAL CLIMATE VULNERABILITIES:</div>
            <p className="text-[#49454F] leading-relaxed font-medium">{area.climateFactors.join(' • ')}</p>
          </div>
        </div>
      </div>

      {/* Local Projects in Area if any */}
      {localProjects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold text-[#1C1B1F] tracking-tight">
            Recent Certified Projects in {area.city}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localProjects.map((p) => (
              <div key={p.id} className="rounded-3xl bg-[#F3EDF7] p-5 border border-[#E7E0EC] shadow-sm">
                <div className="h-44 rounded-2xl overflow-hidden mb-3 shadow-inner">
                  <img src={p.afterImage} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs text-[#6750A4] font-bold uppercase tracking-wider">{p.serviceCategory}</div>
                <h4 className="text-lg font-extrabold text-[#1C1B1F] mt-0.5">{p.title}</h4>
                <p className="text-xs text-[#49454F] mt-1">{p.material} • {p.sqFt.toLocaleString()} SQ FT</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
