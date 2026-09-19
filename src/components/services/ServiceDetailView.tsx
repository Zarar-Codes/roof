import React from 'react';
import { ArrowLeft, CheckCircle2, Shield, Wrench, FileText, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, RecessedWell, IndustrialBadge } from '../common/TactileElements';
import { Service } from '../../types';

interface ServiceDetailViewProps {
  service: Service;
  onNavigate: (route: string) => void;
  onSelectForQuote: (serviceSlug: string) => void;
}

export function ServiceDetailView({
  service,
  onNavigate,
  onSelectForQuote
}: ServiceDetailViewProps) {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
      {/* Back button and breadcrumbs */}
      <div className="flex items-center gap-3 text-xs font-bold text-[#49454F]">
        <button
          onClick={() => onNavigate('/services')}
          className="hover:text-[#6750A4] flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ALL SERVICES</span>
        </button>
        <span>/</span>
        <span className="text-[#1C1B1F]">{service.title}</span>
      </div>

      {/* Service Hero Header Banner (Material 3 Tonal Container) */}
      <div className="relative rounded-[32px] overflow-hidden bg-[#21005D] text-white shadow-md">
        <div className="absolute inset-0 opacity-20">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#21005D] via-[#21005D]/90 to-transparent" />

        <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#EADDFF]" />
            <span>Specification #{service.id.toUpperCase()}</span>
            <span className="text-[#C8E6C9]">● {service.warrantyYears}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            {service.tagline}
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <TactileButton
              variant="primary"
              onClick={() => onSelectForQuote(service.slug)}
              className="bg-white !text-[#21005D] hover:bg-[#EADDFF] shadow-sm"
            >
              <span>Request Specification Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </TactileButton>

            <TactileButton
              variant="secondary"
              onClick={() => onNavigate('/schedule-inspection')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <span>Schedule On-Site Inspection</span>
            </TactileButton>
          </div>
        </div>
      </div>

      {/* Technical Specifications Grid (Material 3 Surface Containers) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {service.technicalSpecs.map((spec, i) => (
          <div key={i} className="rounded-3xl bg-[#F3EDF7] p-6 border border-[#E7E0EC] shadow-sm">
            <div className="text-xs uppercase text-[#49454F] font-bold tracking-wider">
              {spec.label}
            </div>
            <div className="text-xl font-extrabold text-[#1C1B1F] mt-1">
              {spec.value}
            </div>
          </div>
        ))}
      </div>

      {/* Service Explanation & Engineering Scope */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
              Engineering Scope
            </div>
            <h2 className="text-2xl font-extrabold text-[#1C1B1F] tracking-tight">
              Structural Overview & Methodology
            </h2>
            <p className="text-sm sm:text-base text-[#49454F] leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Approved Materials list */}
            <div className="mt-6 pt-6 border-t border-[#E7E0EC]">
              <h3 className="text-xs font-bold uppercase text-[#1C1B1F] mb-3 tracking-wide">
                Approved Tier-1 Materials & Membranes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.materials.map((mat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs bg-white/70 p-3 rounded-2xl border border-[#E7E0EC]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span className="font-bold text-[#1C1B1F]">{mat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Step Installation Protocol */}
          <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
              Installation Protocol
            </div>
            <h2 className="text-2xl font-extrabold text-[#1C1B1F] tracking-tight">
              Quality Assurance & Field Workflow
            </h2>
            <div className="space-y-3.5">
              {service.processSteps.map((step) => (
                <div key={step.step} className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-[#E7E0EC]">
                  <div className="w-8 h-8 rounded-full bg-[#6750A4] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    0{step.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1C1B1F]">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#49454F] mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: System Layers & Direct Quote CTA */}
        <div className="lg:col-span-5 space-y-6">
          {service.systemLayers && (
            <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
                Assembly Cross-Section
              </div>
              <h3 className="text-xl font-extrabold text-[#1C1B1F]">
                {service.diagramTitle || "Engineered Assembly Layers"}
              </h3>
              <div className="space-y-2.5 text-xs">
                {service.systemLayers.map((layer) => (
                  <div key={layer.layer} className="p-3.5 rounded-2xl bg-white/80 border border-[#E7E0EC] shadow-xs">
                    <div className="flex items-center justify-between text-[#6750A4] font-bold mb-1">
                      <span>LAYER 0{layer.layer}</span>
                      <span className="text-[11px] text-[#49454F] bg-[#E8DEF8] px-2 py-0.5 rounded-full">ASTM TESTED</span>
                    </div>
                    <div className="font-bold text-[#1C1B1F] text-sm">
                      {layer.name}
                    </div>
                    <div className="text-[11px] text-[#49454F] mt-0.5">
                      {layer.function}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Specific FAQ Accordion */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-4">
              <h3 className="text-lg font-extrabold text-[#1C1B1F] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#6750A4]" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-3 text-xs">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-white/70 rounded-2xl border border-[#E7E0EC]">
                    <div className="font-bold text-[#1C1B1F] mb-1">
                      {faq.question}
                    </div>
                    <div className="text-[#49454F] leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Action Box (Material 3 Dark Tonal) */}
          <div className="p-8 rounded-[32px] bg-[#21005D] text-white shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold">Ready to Engineer Your Roof?</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              We provide formal non-obligation project bids, CAD tapered insulation slope drawings, and third-party NDL warranty submittals.
            </p>
            <TactileButton
              variant="primary"
              fullWidth
              onClick={() => onSelectForQuote(service.slug)}
              className="bg-white !text-[#21005D] hover:bg-[#EADDFF] shadow-sm"
            >
              <span>Get Formal Estimate →</span>
            </TactileButton>
          </div>
        </div>
      </div>
    </div>
  );
}
