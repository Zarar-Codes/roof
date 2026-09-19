import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Wrench, Layers, Building2, Home, Scan, ShieldAlert, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, IndustrialBadge } from '../common/TactileElements';
import { Service, ServiceCategory } from '../../types';

interface ServicesListViewProps {
  services: Service[];
  onNavigate: (route: string) => void;
  onSelectService: (slug: string) => void;
}

export function ServicesListView({
  services,
  onNavigate,
  onSelectService
}: ServicesListViewProps) {
  const [filter, setFilter] = useState<'all' | ServiceCategory>('all');

  const filteredServices = filter === 'all'
    ? services
    : services.filter(s => s.category === filter);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5 text-white" />;
      case 'Layers': return <Layers className="w-5 h-5 text-white" />;
      case 'Home': return <Home className="w-5 h-5 text-white" />;
      case 'Scan': return <Scan className="w-5 h-5 text-white" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-white" />;
      default: return <Wrench className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Technical Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1B1F] tracking-tight">
          Roofing Systems & Engineering Specifications
        </h1>
        <p className="text-sm sm:text-base text-[#49454F] leading-relaxed">
          IronClad engineers commercial flat membranes, standing seam architectural metal, impact-rated shingle assemblies, and aerial infrared thermography surveys.
        </p>

        {/* Filter buttons as Material 3 Filter Chips */}
        <div className="pt-4 flex flex-wrap justify-center gap-2.5">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'commercial', label: 'Commercial Flat' },
            { id: 'specialty', label: 'Standing Seam Metal' },
            { id: 'residential', label: 'Residential Systems' },
            { id: 'emergency', label: 'Emergency Repair' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
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

      {/* Services Grid (Material 3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl bg-[#F3EDF7] p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-300 border border-[#E7E0EC] flex flex-col justify-between group"
          >
            <div className="space-y-4">
              {/* Image Thumbnail */}
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-[#6750A4] flex items-center justify-center shadow-md">
                  {getIcon(service.iconName)}
                </div>
                <div className="absolute bottom-3 right-3 bg-[#1C1B1F]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#C8E6C9]">
                  {String(service.warrantyYears).split(' ')[0]} WARRANTY
                </div>
                <div className="absolute top-3 right-3 bg-[#6750A4] text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  {service.category}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#1C1B1F] tracking-tight group-hover:text-[#6750A4] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-[#49454F] mt-2 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>

              {/* Material Badges */}
              <div className="pt-3 border-t border-[#E7E0EC]">
                <div className="text-[11px] uppercase text-[#49454F] font-bold mb-1.5">
                  Core Specifications:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {service.materials.slice(0, 3).map((mat, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium bg-[#E8DEF8] px-3 py-1 rounded-full text-[#1D192B]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-[#E7E0EC] flex items-center justify-between gap-3">
              <button
                onClick={() => onSelectService(service.slug)}
                className="text-xs font-bold text-[#6750A4] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Specification Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <TactileButton
                variant="secondary"
                onClick={() => onNavigate('/request-a-quote')}
                className="!py-2 !px-4 text-xs"
              >
                <span>Estimate</span>
              </TactileButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
