import React, { useState } from 'react';
import { Calendar, Crosshair, CheckCircle2, ShieldAlert, Clock, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, RecessedWell, IndustrialBadge } from '../common/TactileElements';
import { trackEvent } from '../../utils/analytics';

interface ScheduleInspectionViewProps {
  onNavigate: (route: string) => void;
}

export function ScheduleInspectionView({ onNavigate }: ScheduleInspectionViewProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyAddress: '',
    propertyType: 'commercial' as 'commercial' | 'industrial' | 'residential',
    preferredDate: '',
    preferredTime: 'morning' as 'morning' | 'afternoon',
    thermalDroneRequested: true,
    activeLeaks: false,
    notes: '',
    _hp: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Default date to 2 days from now (YYYY-MM-DD)
  const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/inspections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to schedule inspection.');
      }

      setResult(data.inspection);
      trackEvent('inspection_submit', '/schedule-inspection', {
        drone: formData.thermalDroneRequested,
        leaks: formData.activeLeaks
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error transmitting schedule request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Diagnostic Roof Survey</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B1F] tracking-tight">
          Schedule Comprehensive Roof Inspection
        </h1>
        <p className="text-sm text-[#49454F] max-w-xl mx-auto">
          Book certified physical core sampling or high-resolution FAA Part 107 FLIR drone infrared radiometry to detect hidden sub-membrane moisture traps.
        </p>
      </div>

      {result ? (
        <div className="rounded-[32px] bg-[#F3EDF7] text-center p-8 sm:p-12 shadow-sm border border-[#E7E0EC] space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#C8E6C9] text-[#1B5E20] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="text-xs text-[#6750A4] font-bold uppercase tracking-wider">
              Inspection Dispatch Confirmation #{result.id.toUpperCase()}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1F] mt-1">
              Inspection Booking Logged in Central Dispatch
            </h2>
            <p className="text-sm text-[#49454F] mt-2 max-w-md mx-auto">
              Our operations dispatcher will call <span className="font-bold text-[#1C1B1F]">{result.phone}</span> within 60 minutes to confirm site access logistics and aerial flight clearance.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-[#21005D] text-white p-6 rounded-3xl space-y-2.5 text-left text-xs shadow-sm">
            <div>Target Address: <span className="text-white font-bold">{result.propertyAddress}</span></div>
            <div>Requested Date: <span className="text-[#C8E6C9] font-bold">{result.preferredDate} ({result.preferredTime.toUpperCase()})</span></div>
            <div>FLIR Drone Scan: <span className="text-[#C8E6C9] font-bold">{result.thermalDroneRequested ? 'CONFIRMED' : 'PHYSICAL WALK ONLY'}</span></div>
            <div>Active Leaks: <span className={result.activeLeaks ? 'text-[#FFD8E4] font-bold' : 'text-white/80'}>{result.activeLeaks ? 'PRIORITY LEAK TRIAGE' : 'ROUTINE EVALUATION'}</span></div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <TactileButton variant="primary" onClick={() => onNavigate('/')}>
              <span>Return to Home</span>
            </TactileButton>
          </div>
        </div>
      ) : (
        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-10 shadow-sm border border-[#E7E0EC]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field */}
            <input
              type="text"
              name="_hp"
              value={formData._hp}
              onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Drone Inspection Toggle (Material 3 Surface) */}
            <div className="p-5 rounded-3xl bg-[#21005D] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Crosshair className="w-6 h-6 text-[#EADDFF]" />
                </div>
                <div>
                  <div className="text-sm font-bold">Include High-Resolution FLIR Infrared Drone Scan?</div>
                  <div className="text-xs text-[#EADDFF]">
                    Identifies trapped saturated water insulation without destructive invasive drilling.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, thermalDroneRequested: !formData.thermalDroneRequested })}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer active:scale-95 ${
                  formData.thermalDroneRequested
                    ? 'bg-[#C8E6C9] text-[#1B5E20] shadow-sm'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {formData.thermalDroneRequested ? '✓ INCLUDED' : 'OMIT SCAN'}
              </button>
            </div>

            {/* Property Classification */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-2 tracking-wide">
                Property Classification
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'commercial', label: 'Commercial Low-Slope' },
                  { id: 'industrial', label: 'Industrial / Warehouse' },
                  { id: 'residential', label: 'Residential / Steep' }
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setFormData({ ...formData, propertyType: t.id as any })}
                    className={`p-3.5 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer active:scale-95 ${
                      formData.propertyType === t.id
                        ? 'bg-[#6750A4] text-white shadow-sm'
                        : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                  Preferred Inspection Date *
                </label>
                <input
                  type="date"
                  required
                  min={minDate}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                  Preferred Window
                </label>
                <div className="grid grid-cols-2 gap-2 h-12">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredTime: 'morning' })}
                    className={`rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      formData.preferredTime === 'morning'
                        ? 'bg-[#6750A4] text-white shadow-sm'
                        : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                    }`}
                  >
                    Morning (8am - 12pm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredTime: 'afternoon' })}
                    className={`rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      formData.preferredTime === 'afternoon'
                        ? 'bg-[#6750A4] text-white shadow-sm'
                        : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                    }`}
                  >
                    Afternoon (1pm - 5pm)
                  </button>
                </div>
              </div>
            </div>

            {/* Active Leak Checkbox Toggle */}
            <div className="p-4 rounded-2xl bg-[#E7E0EC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className={`w-5 h-5 ${formData.activeLeaks ? 'text-[#BA1A1A]' : 'text-[#49454F]'}`} />
                <div>
                  <div className="text-xs font-bold text-[#1C1B1F]">Is water actively leaking inside the facility right now?</div>
                  <div className="text-[11px] text-[#49454F]">Flags ticket for rapid triage dispatch truck.</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.activeLeaks}
                onChange={(e) => setFormData({ ...formData, activeLeaks: e.target.checked })}
                className="w-5 h-5 rounded accent-[#BA1A1A] cursor-pointer"
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                  Contact Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sandra Mitchell"
                  className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                  Primary Mobile Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(312) 555-0199"
                  className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="s.mitchell@facility-management.com"
                  className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                  Property Street Address & City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  placeholder="e.g. 1500 Commerce Way, Schaumburg, IL"
                  className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                Inspection Focus / Access Notes
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Rooftop hatch location, security check-in procedures, ladder access restrictions..."
                className="w-full p-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
              />
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-[#FFDAD6] text-[#BA1A1A] text-xs font-medium rounded-2xl">
                {errorMsg}
              </div>
            )}

            <div className="pt-2">
              <TactileButton
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                fullWidth
                className="!py-4 text-sm"
              >
                <span>{isSubmitting ? 'Transmitting Schedule Request...' : 'Confirm Diagnostic Inspection Booking'}</span>
                <ArrowRight className="w-4 h-4" />
              </TactileButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
