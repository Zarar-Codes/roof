import React from 'react';
import { MapPin, Shield, Phone, ArrowRight, Snowflake, Sun, Wind, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, IndustrialBadge } from '../common/TactileElements';
import { ServiceArea, BusinessConfig } from '../../types';

interface ServiceAreasViewProps {
  serviceAreas: ServiceArea[];
  business: BusinessConfig;
  onNavigate: (route: string) => void;
  onSelectArea: (slug: string) => void;
}

export function ServiceAreasView({
  serviceAreas,
  business,
  onNavigate,
  onSelectArea
}: ServiceAreasViewProps) {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Regional Dispatch Hubs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1B1F] tracking-tight">
          Service Coverage & Climate Engineering
        </h1>
        <p className="text-sm sm:text-base text-[#49454F] leading-relaxed">
          IronClad maintains dedicated commercial crews and emergency leak triage teams dispatched across a {business.serviceRadiusMiles}-mile perimeter from our Central Dispatch facility in Cook County.
        </p>
      </div>

      {/* Regional Climate Factors Banner (Material 3 Surface Container) */}
      <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
          Midwest Environmental Vulnerability Audit
        </div>
        <h2 className="text-2xl font-extrabold text-[#1C1B1F]">
          Midwestern Building Envelope Stress Factors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#49454F] pt-2">
          <div className="bg-white/70 p-5 rounded-2xl border border-[#E7E0EC] space-y-2">
            <div className="flex items-center gap-2 text-[#BA1A1A] font-bold">
              <Snowflake className="w-4 h-4" />
              <span>FREEZE-THAW EXPANSION</span>
            </div>
            <p className="leading-relaxed">
              Chicago winters inflict 40+ annual freeze-thaw transitions. Trapped substrate moisture expands 9%, tearing unreinforced seams and cracking low-grade asphalt.
            </p>
          </div>

          <div className="bg-white/70 p-5 rounded-2xl border border-[#E7E0EC] space-y-2">
            <div className="flex items-center gap-2 text-[#2E7D32] font-bold">
              <Wind className="w-4 h-4" />
              <span>GALE-FORCE LAKE WIND SHEAR</span>
            </div>
            <p className="leading-relaxed">
              Lake Michigan generates sustained wind events exceeding 65 MPH. IronClad installs full FM 1-90 and FM 1-120 perimeter fastener density arrays to prevent roof blow-off.
            </p>
          </div>

          <div className="bg-white/70 p-5 rounded-2xl border border-[#E7E0EC] space-y-2">
            <div className="flex items-center gap-2 text-[#E65100] font-bold">
              <Sun className="w-4 h-4" />
              <span>SUMMER THERMAL CYCLING</span>
            </div>
            <p className="leading-relaxed">
              Rooftop surface temperatures fluctuate between -15°F in January to 165°F in July. Our solar-reflective white TPO reduces surface heat by 60°F and stabilizes internal HVAC loads.
            </p>
          </div>
        </div>
      </div>

      {/* Service Areas Cards Grid (Material 3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {serviceAreas.map((area) => (
          <div
            key={area.id}
            className="rounded-3xl bg-[#F3EDF7] p-6 sm:p-7 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 border border-[#E7E0EC] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#6750A4] font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>{area.county} Sector</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1C1B1F] tracking-tight mt-1">
                    {area.city}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#49454F] font-bold uppercase">Dispatch Time</div>
                  <div className="text-xs font-bold text-[#1B5E20] bg-[#C8E6C9] px-2.5 py-0.5 rounded-full mt-0.5 inline-block">
                    {area.turnaroundTime}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#49454F] leading-relaxed">
                {area.description}
              </p>

              {/* Climate challenge */}
              <div className="p-3.5 bg-white/70 rounded-2xl border border-[#E7E0EC] text-xs">
                <span className="text-[#6750A4] font-bold">LOCAL VULNERABILITY: </span>
                <span className="text-[#1C1B1F] font-medium">{area.climateFactors}</span>
              </div>

              {/* Key zip codes list */}
              <div>
                <div className="text-[11px] text-[#49454F] uppercase font-bold mb-1.5">
                  Covered Postal Codes:
                </div>
                <div className="flex flex-wrap gap-1">
                  {area.zipCodes.map((zip) => (
                    <span
                      key={zip}
                      className="text-[11px] font-medium bg-[#E8DEF8] px-2.5 py-0.5 rounded-full text-[#1D192B]"
                    >
                      {zip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#E7E0EC] flex items-center justify-between gap-3">
              <button
                onClick={() => onSelectArea(area.slug)}
                className="text-xs font-bold text-[#6750A4] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Municipal Codes & Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <TactileButton
                variant="secondary"
                onClick={() => onNavigate('/schedule-inspection')}
                className="!py-2 !px-4 text-xs"
              >
                <span>Schedule</span>
              </TactileButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
