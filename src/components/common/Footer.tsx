import React from 'react';
import { Shield, Phone, Mail, MapPin, Clock, ExternalLink, Award, FileText, Lock } from 'lucide-react';
import { BusinessConfig } from '../../types';
import { servicesData, serviceAreasData } from '../../data/roofingData';

interface FooterProps {
  business: BusinessConfig;
  onNavigate: (route: string) => void;
}

export function Footer({ business, onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#1D192B] text-[#E7E0EC] pt-16 pb-12 relative overflow-hidden border-t border-[#79747E]/30">
      {/* Subtle organic purple glow in background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6750A4]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Operational Status Callout Bar */}
        <div className="rounded-3xl bg-[#21005D] p-6 sm:p-8 mb-14 shadow-md border border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8E6C9] text-[#1B5E20] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                  STATION OPERATIONAL
                </span>
                <span className="text-xs text-[#EADDFF] font-medium">ID: ENG-CHI-01</span>
              </div>
              <p className="text-sm text-white/80 max-w-xl">
                Operating 24/7 rapid storm containment crews across a {business.serviceRadiusMiles}-mile radius throughout Greater Chicagoland and Northern Illinois.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${business.primaryPhone.replace(/\D/g, '')}`}
                className="px-6 py-3.5 rounded-full bg-[#6750A4] hover:bg-[#6750A4]/90 active:scale-95 text-white text-xs uppercase font-bold tracking-wider transition-all shadow-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Dispatch: {business.primaryPhone}</span>
              </a>
              <button
                onClick={() => onNavigate('/admin')}
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-[#EADDFF] hover:text-white text-xs uppercase font-bold tracking-wider transition-all border border-white/10 flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#EADDFF]" />
                <span>Console</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Technical Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#6750A4] flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Iron<span className="text-[#EADDFF]">Clad</span> Roofing
              </span>
            </div>
            <p className="text-xs text-[#CAC4D0] leading-relaxed">
              Industrial and commercial building envelope specialists. High-performance single-ply TPO, 24-gauge standing seam metal fabrication, and certified aerial infrared diagnostics.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-[#CAC4D0]">
              <div className="text-white font-bold">LICENSE & INSURANCE:</div>
              <div>State License: <span className="text-white font-semibold">{business.licenseNumber}</span></div>
              <div>Coverage: <span className="text-white font-semibold">{business.insuranceCoverage}</span></div>
            </div>
          </div>

          {/* Col 2: Services Navigation */}
          <div>
            <div className="border-b border-white/10 pb-2 mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Core Specifications
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    className="text-[#CAC4D0] hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-[#EADDFF]">›</span>
                    <span>{service.title}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('/services')}
                  className="text-[#EADDFF] font-bold hover:underline pt-1 inline-block cursor-pointer"
                >
                  View All Services →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div>
            <div className="border-b border-white/10 pb-2 mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Service Hubs
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs">
              {serviceAreasData.map((area) => (
                <li key={area.id}>
                  <button
                    onClick={() => onNavigate(`/service-areas/${area.slug}`)}
                    className="text-[#CAC4D0] hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-[#EADDFF]">›</span>
                    <span>{area.city}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('/service-areas')}
                  className="text-[#EADDFF] font-bold hover:underline pt-1 inline-block cursor-pointer"
                >
                  View All Locations →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Contact */}
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-2 mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                HQ & Contact
              </h4>
            </div>
            <div className="space-y-3 text-xs text-[#CAC4D0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EADDFF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">{business.name} HQ</div>
                  <div>{business.address.street}</div>
                  <div>{business.address.city}, {business.address.state} {business.address.zip}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#EADDFF] shrink-0" />
                <a href={`tel:${business.primaryPhone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                  {business.primaryPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EADDFF] shrink-0" />
                <a href={`mailto:${business.primaryEmail}`} className="hover:text-white transition-colors">
                  {business.primaryEmail}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#EADDFF] shrink-0" />
                <span>Office: M-F 7am-6pm | Dispatch: 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Compliance and Navigation Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CAC4D0]">
          <div>
            © {new Date().getFullYear()} {business.name}. All Rights Reserved. Illinois Roofing License #{business.licenseNumber}.
          </div>

          <div className="flex items-center gap-5">
            <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('/terms-of-service')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('/disclaimer')} className="hover:text-white transition-colors">
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
