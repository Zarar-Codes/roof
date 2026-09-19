import React from 'react';
import { ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { BusinessConfig } from '../../types';

export function PrivacyPolicyView({ business, onBack }: { business: BusinessConfig; onBack: () => void }) {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold hover:bg-[#6750A4] hover:text-white transition-all cursor-pointer active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Previous View</span>
      </button>

      <div className="rounded-[32px] bg-[#F3EDF7] p-8 sm:p-12 border border-[#E7E0EC] shadow-sm space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
          Legal Specification
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B1F] tracking-tight">
          Privacy Policy
        </h1>
        <div className="text-xs text-[#49454F] font-medium">
          EFFECTIVE DATE: JANUARY 1, 2026 • {business.legalEntity}
        </div>

        <div className="space-y-5 text-sm text-[#49454F] leading-relaxed">
          <p>
            This Privacy Policy outlines how {business.legalEntity} ("IronClad", "we", "us") collects, secures, and handles property and contact information submitted via our digital portals, estimation tools, and inspection booking forms.
          </p>

          <h3 className="text-lg font-extrabold text-[#1C1B1F] pt-2">1. Data Collection & Field Diagnostics</h3>
          <p>
            When you request an estimate, schedule an infrared drone scan, or submit project plans, we collect contact credentials (name, telephone, email address), property physical coordinates, and architectural roof specifications. We also generate aerial photogrammetry, high-resolution thermal radiometry imagery, and core sampling reports.
          </p>

          <h3 className="text-lg font-extrabold text-[#1C1B1F] pt-2">2. Strict Use of Information</h3>
          <p>
            Your information is strictly utilized to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#49454F]">
            <li>Generate structural load, wind uplift, and budgetary roofing estimates.</li>
            <li>Coordinate FAA-cleared aerial flight paths and on-site inspection teams.</li>
            <li>Submit warranty registrations with tier-1 manufacturers (Carlisle, Sika, GAF).</li>
            <li>Process municipal building permits with local building departments.</li>
          </ul>

          <h3 className="text-lg font-extrabold text-[#1C1B1F] pt-2">3. Zero Third-Party Sale Policy</h3>
          <p>
            IronClad does NOT sell, license, rent, or trade client data to marketing lists, data brokers, or lead-generation aggregators. Client records remain strictly within our private operations infrastructure.
          </p>

          <h3 className="text-lg font-extrabold text-[#1C1B1F] pt-2">4. Communications & Opt-Out</h3>
          <p>
            You may contact our Central Dispatch office at <a href={`mailto:${business.email}`} className="text-[#6750A4] font-bold underline">{business.email}</a> or call {business.primaryPhone} at any time to inspect, update, or purge your records from our systems.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsOfServiceView({ business, onBack }: { business: BusinessConfig; onBack: () => void }) {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold hover:bg-[#6750A4] hover:text-white transition-all cursor-pointer active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Previous View</span>
      </button>

      <div className="rounded-[32px] bg-[#F3EDF7] p-8 sm:p-12 border border-[#E7E0EC] shadow-sm space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
          Terms of Service
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B1F] tracking-tight">
          Terms of Engineering & Service
        </h1>
        <div className="text-xs text-[#49454F] font-medium">
          EFFECTIVE DATE: JANUARY 1, 2026 • LICENSE #{business.licenseNumber}
        </div>

        <div className="space-y-5 text-sm text-[#49454F] leading-relaxed">
          <p>
            Welcome to the digital portal of {business.legalEntity}. By accessing this platform, requesting estimates, or utilizing our interactive calculators, you agree to the following terms and operational conditions.
          </p>

          <h3 className="text-lg font-extrabold text-[#1C1B1F] pt-2">1. Preliminary Estimates vs. Formal Contracts</h3>
          <p>
            Digital estimates generated by our online parametric calculator represent non-binding mathematical approximations based on typical Midwestern building assemblies. Formal binding contracts require physical on-site substrate core drill inspection, perimeter flashing measurement, and certified municipal code verification.
          </p>

          <h3 className="text-lg font-extrabold text-[#1C1B1F] pt-2">2. Warranty Execution & NDL Terms</h3>
          <p>
            Manufacturer No-Dollar-Limit (NDL) warranties and IronClad Workmanship Warranties become fully executed exclusively upon completion of 100% of punch-list items, third-party technical sign-off by the membrane manufacturer, and final settlement of contractual balances.
          </p>

          <h3 className="text-lg font-extrabold text-[#1C1B1F] pt-2">3. Emergency Storm Triage Protocols</h3>
          <p>
            Emergency 24/7 leak containment crews perform stabilization measures (temporary heat-welded patches, mechanical pump extraction, structural tarps) designed to mitigate ongoing interior collateral damage prior to full permanent roof reconstruction.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CookiePolicyView({ onBack }: { onBack: () => void }) {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold hover:bg-[#6750A4] hover:text-white transition-all cursor-pointer active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Previous View</span>
      </button>

      <div className="rounded-[32px] bg-[#F3EDF7] p-8 sm:p-12 border border-[#E7E0EC] shadow-sm space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
          Cookie Audit
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B1F] tracking-tight">
          Cookie & Local Storage Policy
        </h1>
        <div className="text-xs text-[#49454F] font-medium">
          EFFECTIVE DATE: JANUARY 1, 2026
        </div>

        <div className="space-y-5 text-sm text-[#49454F] leading-relaxed">
          <p>
            Our web platform uses minimal essential session tokens and analytics telemetry to provide seamless multi-step quote calculations, preserve user form progress, and secure the authorized operations portal.
          </p>
          <h3 className="text-lg font-extrabold text-[#1C1B1F] pt-2">1. Essential Tokens</h3>
          <p>
            Session storage is utilized exclusively to maintain secure authentication status for operations superintendents and dispatch staff when logged into the admin dashboard.
          </p>
          <h3 className="text-lg font-extrabold text-[#1C1B1F] pt-2">2. Performance Telemetry</h3>
          <p>
            We record non-personally-identifiable aggregate metrics (e.g. calculator completions, emergency phone taps) to analyze dispatch loads across regional sectors.
          </p>
        </div>
      </div>
    </div>
  );
}
