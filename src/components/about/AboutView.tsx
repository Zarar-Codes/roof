import React from 'react';
import { Shield, Award, CheckCircle2, Wrench, HardHat, FileText, ArrowRight, Truck, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, IndustrialBadge } from '../common/TactileElements';
import { BusinessConfig } from '../../types';

interface AboutViewProps {
  business: BusinessConfig;
  onNavigate: (route: string) => void;
}

export function AboutView({ business, onNavigate }: AboutViewProps) {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Engineering Integrity</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1B1F] tracking-tight">
          About IronClad Industrial Roofing
        </h1>
        <p className="text-sm sm:text-base text-[#49454F] leading-relaxed">
          Founded on structural engineering principles, IronClad delivers commercial building envelope solutions designed to resist extreme Midwest thermal shocks, torrential rains, and hurricane-velocity wind uplift.
        </p>
      </div>

      {/* Core Credentials Banner (Material 3 Tonal Hero Container) */}
      <div className="rounded-[32px] bg-[#21005D] text-white p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-[#EADDFF] text-xs font-bold tracking-wider uppercase">
              Certified & Licensed Unlimited Industrial Contractor
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              We Don't Guess. We Measure, Calculate & Engineer.
            </h2>
            <p className="text-sm text-white/80 leading-relaxed font-normal">
              Unlike residential volume sales outfits, IronClad operates as a specialized commercial building envelope contractor. Every commercial re-roof undergoes core drill moisture sampling, ASTM positive slope tapered insulation layouts, and robotic automated seam welding with continuous peel-test calibration.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2 text-xs">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <div className="text-[#EADDFF] font-bold">STATE LICENSE</div>
                <div className="text-white font-extrabold text-sm mt-0.5">{business.licenseNumber}</div>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <div className="text-[#EADDFF] font-bold">GENERAL LIABILITY</div>
                <div className="text-white font-extrabold text-sm mt-0.5">{business.insuranceCoverage}</div>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 col-span-2 sm:col-span-1">
                <div className="text-[#EADDFF] font-bold">SAFETY RECORD</div>
                <div className="text-[#C8E6C9] font-extrabold text-sm mt-0.5">0.74 EMR Rating</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <TactileButton
              variant="primary"
              onClick={() => onNavigate('/request-a-quote')}
              className="bg-white !text-[#21005D] hover:bg-[#EADDFF] shadow-sm"
            >
              <span>Request Project Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </TactileButton>

            <TactileButton
              variant="secondary"
              onClick={() => onNavigate('/schedule-inspection')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <span>Book FLIR Drone Audit</span>
            </TactileButton>
          </div>
        </div>
      </div>

      {/* 4 Pillars of IronClad (Material 3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: HardHat,
            tag: 'PILLAR 01',
            title: 'OSHA-30 Safety Culture',
            desc: 'All project superintendents hold OSHA-30 certifications. Every job site operates under 100% active fall protection, daily safety hazard analysis (JHA), and zero OSHA violations.'
          },
          {
            icon: Wrench,
            tag: 'PILLAR 02',
            title: 'Robotic Heat-Welding',
            desc: 'We use calibrated Leister Varimat robotic hot-air welders to fuse single-ply TPO and PVC seams at 1,000°F, creating a monolithic waterproof sheet stronger than the parent material.'
          },
          {
            icon: Award,
            tag: 'PILLAR 03',
            title: 'Master Contractor Status',
            desc: 'Factory authorized by Carlisle SynTec, Sika Sarnafil, and GAF. This elite status allows us to issue genuine 20 to 30-Year No Dollar Limit (NDL) manufacturer backed warranties.'
          },
          {
            icon: Truck,
            tag: 'PILLAR 04',
            title: 'Dedicated Fleet & Equipment',
            desc: 'In-house computerized CNC sheet metal brakes, hydraulic roll-formers for custom standing seam panels, crane hoisting equipment, and dedicated emergency rapid containment trucks.'
          }
        ].map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div
              key={i}
              className="rounded-3xl bg-[#F3EDF7] p-6 border border-[#E7E0EC] shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8DEF8] text-[#6750A4] flex items-center justify-center mb-4 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-[11px] font-bold text-[#6750A4] uppercase tracking-wider mb-1">
                  {pillar.tag}
                </div>
                <h3 className="text-lg font-extrabold text-[#1C1B1F]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#49454F] mt-2 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Protocols Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
              Quality Control Protocols
            </div>
            <h3 className="text-2xl font-extrabold text-[#1C1B1F]">
              The 5-Stage Zero-Defect Inspection Matrix
            </h3>
            <div className="space-y-3 text-xs">
              {[
                {
                  stage: "01",
                  title: "Pre-Installation Core & Deck Testing",
                  desc: "Physical core sampling to identify saturated sub-insulation and structural steel deck deflection testing before any fastening begins."
                },
                {
                  stage: "02",
                  title: "Tapered Positive Drainage Verification",
                  desc: "Laser grade-checked 1/4\" slope installation to primary scuppers and internal roof drains, eliminating standing ponding water."
                },
                {
                  stage: "03",
                  title: "Continuous Destructive Seam Peel Testing",
                  desc: "Mandatory morning and midday 2-inch test weld samples pulled to complete film failure to verify robotic heat consistency."
                },
                {
                  stage: "04",
                  title: "High-Definition FLIR Thermal Radiometry",
                  desc: "Evening post-installation infrared aerial scanning to confirm 100% dry substrate and seamless thermal envelope continuity."
                },
                {
                  stage: "05",
                  title: "Independent Manufacturer Technical Sign-Off",
                  desc: "Final on-site audit by factory technical representative prior to executing the 20 to 30-Year NDL warranty."
                }
              ].map((s) => (
                <div key={s.stage} className="p-4 bg-white/70 rounded-2xl border border-[#E7E0EC] flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#6750A4] text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {s.stage}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1C1B1F] text-sm">{s.title}</h4>
                    <p className="text-[#49454F] mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
              Manufacturer Credentials
            </div>
            <h3 className="text-xl font-extrabold text-[#1C1B1F]">
              Tier-1 Authorized Partner
            </h3>
            <p className="text-xs text-[#49454F] leading-relaxed">
              We exclusively install verified commercial systems backed by the largest building envelope manufacturers in North America.
            </p>
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0EC] flex justify-between items-center">
                <span className="font-extrabold text-[#1C1B1F]">Carlisle SynTec Systems</span>
                <span className="bg-[#E8DEF8] text-[#6750A4] font-bold text-[11px] px-2.5 py-0.5 rounded-full">Authorized Applicator</span>
              </div>
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0EC] flex justify-between items-center">
                <span className="font-extrabold text-[#1C1B1F]">Sika Sarnafil</span>
                <span className="bg-[#E8DEF8] text-[#6750A4] font-bold text-[11px] px-2.5 py-0.5 rounded-full">Elite Contractor</span>
              </div>
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0EC] flex justify-between items-center">
                <span className="font-extrabold text-[#1C1B1F]">GAF Commercial & Master Elite</span>
                <span className="bg-[#E8DEF8] text-[#6750A4] font-bold text-[11px] px-2.5 py-0.5 rounded-full">Top 2% in US</span>
              </div>
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0EC] flex justify-between items-center">
                <span className="font-extrabold text-[#1C1B1F]">FAA Part 107 Remote Pilot</span>
                <span className="bg-[#C8E6C9] text-[#1B5E20] font-bold text-[11px] px-2.5 py-0.5 rounded-full">Certified Aerial Ops</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[32px] bg-[#21005D] text-white space-y-3 shadow-sm">
            <h4 className="text-lg font-extrabold">Need Credentials for General Contractor Bidding?</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              We provide certificates of insurance (COI), OSHA-30 cards, state licenses, and bonding verification packages within 2 hours.
            </p>
            <div className="pt-2">
              <TactileButton variant="primary" fullWidth onClick={() => onNavigate('/contact')} className="bg-white !text-[#21005D] hover:bg-[#EADDFF]">
                <span>Contact Engineering Desk</span>
              </TactileButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
