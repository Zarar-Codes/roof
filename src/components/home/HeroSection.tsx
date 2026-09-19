import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle2, ChevronRight, Activity, Layers, Crosshair, Sparkles } from 'lucide-react';
import { StatusLed, TactileButton, MechanicalCard, AtmosphericBlobs } from '../common/TactileElements';
import { BusinessConfig } from '../../types';
import { trackEvent } from '../../utils/analytics';

interface HeroSectionProps {
  business: BusinessConfig;
  onNavigate: (route: string) => void;
}

export function HeroSection({ business, onNavigate }: HeroSectionProps) {
  const [activeLayer, setActiveLayer] = useState<number>(3); // 0 to 3

  const roofLayers = [
    {
      id: 0,
      name: "Structural Deck Substrate",
      material: "22-Gauge B-Deck Steel / Reinforced Concrete",
      function: "Engineered load-bearing structural diaphragm resisting positive and negative wind shear pressures up to 120 lbs/sq ft.",
      specs: "FM 1-120 Class 1"
    },
    {
      id: 1,
      name: "Tapered Polyiso Thermal Insulation",
      material: "R-30 Closed-Cell Polyisocyanurate Board",
      function: "Zero-CFC insulation boards configured with 1/4\" per foot positive drainage gradient to prevent water ponding.",
      specs: "ASTM C1289 Type II"
    },
    {
      id: 2,
      name: "High-Density Protection Coverboard",
      material: "1/2\" DensDeck Prime Gypsum Board",
      function: "Puncture barrier protecting insulation from severe hail impact and heavy rooftop mechanical foot traffic.",
      specs: "UL Class A Fire / 900 PSI"
    },
    {
      id: 3,
      name: "Robotic Heat-Welded Membrane",
      material: "Carlisle 80-mil Reinforced TPO / Sika PVC",
      function: "Solar-reflective monolithic thermoplastic waterproof barrier fused at 1,000°F into seamless molecular bonds.",
      specs: "SRI 104 / 30-Yr NDL"
    }
  ];

  const handleEstimateClick = () => {
    trackEvent('cta_click', '/', { cta: 'hero_request_estimate' });
    onNavigate('/request-a-quote');
  };

  const handleInspectionClick = () => {
    trackEvent('cta_click', '/', { cta: 'hero_schedule_inspection' });
    onNavigate('/schedule-inspection');
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Signature Material You Organic Blur Shapes Layer */}
      <AtmosphericBlobs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (60% on desktop: 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Material 3 Tonal Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#6750A4] animate-pulse" />
              <span>CERTIFIED INDUSTRIAL ROOFING SYSTEMS</span>
            </div>

            {/* Main Headline (Display Large, Bold Roboto) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#1C1B1F] tracking-tight leading-[1.12]">
              Engineered Roofing Systems Built for Extreme Midwest Stress.
            </h1>

            {/* Value Proposition Lead */}
            <p className="text-lg text-[#49454F] leading-relaxed max-w-2xl font-normal">
              Commercial single-ply low-slope membranes (TPO/PVC), precision-fabricated 24-gauge standing seam metal, and certified FLIR thermal drone surveys. Guaranteed watertight with 20 to 30-Year Manufacturer No-Dollar-Limit (NDL) warranties.
            </p>

            {/* Material You Pill Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <TactileButton
                variant="primary"
                onClick={handleEstimateClick}
                className="!py-4 !px-8 text-sm"
              >
                <span>Request Detailed Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </TactileButton>

              <TactileButton
                variant="secondary"
                onClick={handleInspectionClick}
                className="!py-4 !px-7 text-sm"
              >
                <Crosshair className="w-4 h-4 text-[#6750A4]" />
                <span>Schedule Drone Inspection</span>
              </TactileButton>
            </div>

            {/* Trust & Credentials Strip */}
            <div className="pt-6 border-t border-[#E7E0EC] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#1C1B1F]">
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F3EDF7]/70">
                <div className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#6750A4]" />
                </div>
                <div>
                  <div className="font-bold">IL-ROOF #104.018932</div>
                  <div className="text-[11px] text-[#49454F]">State Licensed & Bonded</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F3EDF7]/70">
                <div className="w-8 h-8 rounded-full bg-[#C8E6C9] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#1B5E20]" />
                </div>
                <div>
                  <div className="font-bold">$5,000,000 INSURED</div>
                  <div className="text-[11px] text-[#49454F]">Full Workman's Comp</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F3EDF7]/70 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-full bg-[#FFD8E4] flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-[#7D5260]" />
                </div>
                <div>
                  <div className="font-bold">24/7 RAPID DISPATCH</div>
                  <div className="text-[11px] text-[#49454F]">Emergency Containment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (40% on desktop: 5 cols) - Interactive Material 3 System Cross-Section Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-7 shadow-md border border-[#E7E0EC] relative hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6750A4] uppercase tracking-wide">
                  <Layers className="w-4 h-4" />
                  <span>Assembly Cross-Section</span>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#E8DEF8] text-[#1D192B]">
                  ASTM SPEC D6878
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#1C1B1F] mb-1">
                Commercial Membrane System
              </h3>
              <p className="text-xs text-[#49454F] mb-5">
                Click layers to inspect substrate engineering, thermal values, and monolithic seam technology:
              </p>

              {/* Interactive Layer Selector Pills */}
              <div className="space-y-2 mb-6">
                {roofLayers.map((layer, idx) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(idx)}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between text-xs font-bold cursor-pointer ${
                      activeLayer === idx
                        ? 'bg-[#6750A4] text-white shadow-sm'
                        : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        activeLayer === idx ? 'bg-white/20 text-white' : 'bg-white text-[#6750A4]'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{layer.name}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      activeLayer === idx ? 'bg-white/20 text-white' : 'text-[#49454F]'
                    }`}>
                      {layer.specs}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Layer Details Well */}
              <div className="p-4 rounded-2xl bg-[#E7E0EC] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6750A4] uppercase">Material Specification</span>
                  <span className="text-[10px] font-bold bg-[#E8DEF8] px-2.5 py-0.5 rounded-full text-[#1D192B]">
                    {roofLayers[activeLayer].specs}
                  </span>
                </div>
                <div className="font-bold text-sm text-[#1C1B1F]">
                  {roofLayers[activeLayer].material}
                </div>
                <p className="text-xs text-[#49454F] leading-relaxed">
                  {roofLayers[activeLayer].function}
                </p>
              </div>

              {/* Bottom Micro Action */}
              <div className="mt-5 pt-4 border-t border-[#E7E0EC] flex items-center justify-between">
                <span className="text-xs text-[#49454F] font-medium">Warranty Coverage:</span>
                <span className="text-xs font-bold text-[#6750A4]">20 to 30-Year NDL Direct</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
