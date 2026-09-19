import React from 'react';
import {
  Shield, CheckCircle2, Award, Wrench, ArrowRight, Phone,
  FileText, Zap, ChevronRight, Layers, HardHat, Crosshair, AlertTriangle, Star
} from 'lucide-react';
import { HeroSection } from './HeroSection';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { CostEstimator } from './CostEstimator';
import { MechanicalCard, TactileButton, IndustrialBadge, StatusLed } from '../common/TactileElements';
import { BusinessConfig, Service, Project, ServiceArea, Testimonial } from '../../types';

interface HomeViewProps {
  business: BusinessConfig;
  services: Service[];
  projects: Project[];
  serviceAreas: ServiceArea[];
  testimonials: Testimonial[];
  onNavigate: (route: string) => void;
  onSelectService: (slug: string) => void;
  onSelectArea: (slug: string) => void;
  onProceedToQuoteWithParams: (params: any) => void;
  onOpenEmergencyModal: () => void;
}

export function HomeView({
  business,
  services,
  projects,
  serviceAreas,
  testimonials,
  onNavigate,
  onSelectService,
  onSelectArea,
  onProceedToQuoteWithParams,
  onOpenEmergencyModal
}: HomeViewProps) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 60/40 Hero with organic blur shapes and live cross-section panel */}
      <HeroSection business={business} onNavigate={onNavigate} />

      {/* Verified Credentials Ticker Strip (Material 3 Tonal Container) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 relative z-20">
        <div className="rounded-3xl bg-[#21005D] text-white p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#EADDFF]">
                {business.yearsInBusiness}+ YEARS
              </div>
              <div className="text-xs text-white/80 font-medium mt-1">Continuous Midwestern Operations</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {business.licenseNumber}
              </div>
              <div className="text-xs text-white/80 font-medium mt-1">Illinois State License & Bonded</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C8E6C9]">
                {business.insuranceCoverage}
              </div>
              <div className="text-xs text-white/80 font-medium mt-1">Commercial General Liability</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#EADDFF]">
                100% PASS
              </div>
              <div className="text-xs text-white/80 font-medium mt-1">Manufacturer NDL First-Pass Audits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Engineering Specifications / Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <IndustrialBadge color="accent">Core Specifications</IndustrialBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B1F] tracking-tight mt-2">
              Building Envelope Systems & Diagnostics
            </h2>
            <p className="text-sm text-[#49454F] mt-1 max-w-xl">
              Engineered according to strict ASTM material tolerances, FM Global wind uplift tables, and manufacturer 20-30 year NDL warranty requirements.
            </p>
          </div>

          <TactileButton
            variant="secondary"
            onClick={() => onNavigate('/services')}
            className="!py-2.5 !px-5 text-xs shrink-0 self-start md:self-auto"
          >
            <span>View Complete Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </TactileButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-[#F3EDF7] p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-300 border border-[#E7E0EC] flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#1C1B1F]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#C8E6C9]">
                    {service.warrantyYears}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#6750A4] text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {service.category}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1C1B1F] group-hover:text-[#6750A4] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#49454F] mt-2 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E0EC]">
                  <div className="text-[11px] font-bold text-[#49454F] uppercase tracking-wide mb-1.5">
                    Key Materials:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.materials.slice(0, 2).map((m, i) => (
                      <span key={i} className="text-[11px] font-medium bg-[#E8DEF8] px-3 py-1 rounded-full text-[#1D192B]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E0EC] flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service.slug)}
                  className="text-xs font-bold text-[#6750A4] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Specification Sheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('/request-a-quote')}
                  className="text-xs font-bold text-[#49454F] hover:text-[#1C1B1F] bg-[#E7E0EC] px-3 py-1.5 rounded-full hover:bg-[#E8DEF8] transition-colors cursor-pointer"
                >
                  Estimate →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Before & After Restoration Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <BeforeAfterSlider projects={projects} />
      </section>

      {/* Parametric Roof Cost & Material Estimator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <CostEstimator onProceedToQuote={onProceedToQuoteWithParams} />
      </section>

      {/* Why IronClad: Engineering vs Volume Roofing Contractors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 md:p-10 shadow-sm border border-[#E7E0EC]">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <IndustrialBadge color="accent">Technical Superiority Analysis</IndustrialBadge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1B1F] tracking-tight">
              Why Building Managers Specify IronClad
            </h2>
            <p className="text-sm text-[#49454F]">
              Direct comparison between volume residential roofing crews and IronClad's commercial building envelope engineering division.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b-2 border-[#CAC4D0] text-[#49454F] uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3 px-4">Engineering Dimension</th>
                  <th className="py-3 px-4 text-[#6750A4]">IronClad Industrial Specification</th>
                  <th className="py-3 px-4 text-[#79747E]">Standard Volume Contractor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E0EC]">
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#1C1B1F]">Seam Fusion Standard</td>
                  <td className="py-4 px-4 text-[#1B5E20] font-bold">
                    Robotic Leister Varimat hot-air 1,000°F fusion with twice-daily destructive peel testing.
                  </td>
                  <td className="py-4 px-4 text-[#49454F]">
                    Manual hand-roller welding without calibrated temperature regulation.
                  </td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#1C1B1F]">Substrate Moisture Diagnostics</td>
                  <td className="py-4 px-4 text-[#1B5E20] font-bold">
                    FAA Part 107 FLIR radiometric drone thermal mapping + physical core sampling.
                  </td>
                  <td className="py-4 px-4 text-[#49454F]">
                    Visual surface estimation only; saturated insulation left hidden beneath new roof.
                  </td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#1C1B1F]">Wind Uplift Engineering</td>
                  <td className="py-4 px-4 text-[#1B5E20] font-bold">
                    FM 1-90 and FM 1-120 perimeter fastener density arrays rated up to 120 MPH lake shears.
                  </td>
                  <td className="py-4 px-4 text-[#49454F]">
                    Standard uniform spacing across entire deck, violating perimeter wind code.
                  </td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#1C1B1F]">Manufacturer Warranty Backing</td>
                  <td className="py-4 px-4 text-[#1B5E20] font-bold">
                    Genuine 20 to 30-Year No Dollar Limit (NDL) warranties backed directly by Carlisle/Sika.
                  </td>
                  <td className="py-4 px-4 text-[#49454F]">
                    Contractor-only workmanship paper with fine-print exclusions and caps.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Emergency Leak Containment Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-[32px] bg-[#7D5260] text-white p-8 sm:p-10 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 text-white flex items-center justify-center shrink-0 shadow-sm">
              <AlertTriangle className="w-8 h-8 text-[#FFD8E4] animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-1">
                Rapid Response Active
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Commercial Storm Damage or Severe Rooftop Leak?
              </h3>
              <p className="text-sm text-white/80 mt-1 max-w-xl">
                Our 24/7 rapid containment trucks carry extraction pumps, temporary heat-weld membrane patches, and structural heavy tarps.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <TactileButton
              variant="primary"
              onClick={onOpenEmergencyModal}
              className="!py-4 !px-6 bg-white !text-[#7D5260] hover:bg-[#FFD8E4] active:bg-[#FFD8E4]/80 shadow-md"
            >
              <span>1-Click Dispatch Ticket</span>
            </TactileButton>

            <a
              href={`tel:${business.emergencyPhone.replace(/\D/g, '')}`}
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase font-bold tracking-wider transition-all border border-white/20 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C8E6C9]" />
              <span>Call {business.emergencyPhone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <IndustrialBadge color="accent">Field Case Studies</IndustrialBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B1F] tracking-tight mt-2">
              Engineered Installations
            </h2>
            <p className="text-sm text-[#49454F] mt-1 max-w-xl">
              Examine verified field implementations across logistics distribution centers, food manufacturing facilities, and architectural properties.
            </p>
          </div>

          <TactileButton
            variant="secondary"
            onClick={() => onNavigate('/projects')}
            className="!py-2.5 !px-5 text-xs self-start md:self-auto"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </TactileButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl bg-[#F3EDF7] p-6 sm:p-7 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-300 border border-[#E7E0EC] space-y-4"
            >
              <div className="h-56 rounded-2xl overflow-hidden shadow-inner relative">
                <img src={proj.afterImage} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-[#6750A4] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  {proj.serviceCategory}
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-[#49454F] font-bold">
                <span>{proj.location}</span>
                <span className="text-[#1C1B1F] bg-[#E8DEF8] px-3 py-1 rounded-full">{proj.sqFt.toLocaleString()} SQ FT</span>
              </div>
              <h3 className="text-xl font-bold text-[#1C1B1F]">{proj.title}</h3>
              <p className="text-xs text-[#49454F] leading-relaxed line-clamp-2">{proj.description}</p>
              <div className="text-xs font-bold text-[#6750A4]">
                SYSTEM: {proj.material}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Service Hubs Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <IndustrialBadge color="accent">Regional Dispatch Perimeter</IndustrialBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B1F] tracking-tight">
            Chicagoland & Northern Illinois Coverage
          </h2>
          <p className="text-sm text-[#49454F]">
            Rapid response crews stationed across Cook, DuPage, Kane, and Will counties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceAreas.map((area) => (
            <div
              key={area.id}
              onClick={() => onSelectArea(area.slug)}
              className="p-5 rounded-3xl bg-[#F3EDF7] hover:bg-[#E8DEF8] border border-[#E7E0EC] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer space-y-2 active:scale-95"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#6750A4]">{area.county}</span>
                <span className="text-[11px] bg-[#C8E6C9] text-[#1B5E20] px-2.5 py-0.5 rounded-full font-bold">
                  {area.turnaroundTime}
                </span>
              </div>
              <h4 className="text-base font-bold text-[#1C1B1F]">{area.city}</h4>
              <p className="text-xs text-[#49454F] line-clamp-2">{area.description}</p>
              <div className="pt-2 text-xs font-bold text-[#6750A4] flex items-center gap-1">
                <span>View Regional Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials & Third-Party Verifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <IndustrialBadge color="accent">Verified Performance</IndustrialBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B1F] tracking-tight">
            Field Testimonials from Plant & Facility Directors
          </h2>
          <p className="text-sm text-[#49454F]">
            Feedback verified through post-installation independent manufacturer sign-offs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-[#F3EDF7] p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-300 border border-[#E7E0EC] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-[#E65100]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#1B5E20] font-bold text-[11px] bg-[#C8E6C9] px-2.5 py-0.5 rounded-full">
                    NDL Audited
                  </span>
                </div>
                <p className="text-xs text-[#49454F] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E7E0EC] text-xs">
                <div className="font-bold text-[#1C1B1F]">{t.customerName}</div>
                <div className="text-[#49454F] text-[11px]">{t.roleOrNeighborhood}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
