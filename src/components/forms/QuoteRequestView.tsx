import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, ArrowLeft, CheckCircle2, Shield, AlertCircle, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, RecessedWell, IndustrialBadge } from '../common/TactileElements';
import { trackEvent } from '../../utils/analytics';

interface QuoteRequestViewProps {
  initialParams?: {
    sqFt?: number;
    pitch?: 'flat' | 'low' | 'medium' | 'steep';
    material?: string;
  } | null;
  onNavigate: (route: string) => void;
}

export function QuoteRequestView({ initialParams, onNavigate }: QuoteRequestViewProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyAddress: '',
    propertyType: 'commercial' as 'commercial' | 'industrial' | 'residential',
    approximateSqFt: initialParams?.sqFt || 15000,
    pitchType: initialParams?.pitch || 'flat',
    materialPreference: initialParams?.material || 'Carlisle 60-mil TPO Membrane',
    timeframe: 'immediate' as 'immediate' | '1-3_months' | 'budgeting',
    description: '',
    _hp: '' // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Re-sync if initialParams change
  useEffect(() => {
    if (initialParams) {
      setFormData(prev => ({
        ...prev,
        approximateSqFt: initialParams.sqFt || prev.approximateSqFt,
        pitchType: initialParams.pitch || prev.pitchType,
        materialPreference: initialParams.material || prev.materialPreference
      }));
    }
  }, [initialParams]);

  // Dynamic estimate calculation
  let baseRate = 6.20;
  if (formData.materialPreference.includes('Metal') || formData.materialPreference.includes('Standing Seam')) {
    baseRate = 12.50;
  } else if (formData.materialPreference.includes('Shingle') || formData.materialPreference.includes('Impact')) {
    baseRate = 4.85;
  } else if (formData.materialPreference.includes('PVC')) {
    baseRate = 7.80;
  }

  let pitchMultiplier = 1.0;
  if (formData.pitchType === 'low') pitchMultiplier = 1.05;
  if (formData.pitchType === 'medium') pitchMultiplier = 1.18;
  if (formData.pitchType === 'steep') pitchMultiplier = 1.35;

  const currentLowEst = Math.round(formData.approximateSqFt * baseRate * pitchMultiplier * 0.92);
  const currentHighEst = Math.round(formData.approximateSqFt * baseRate * pitchMultiplier * 1.15);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quote request.');
      }

      setResult(data.quote);
      trackEvent('quote_submit', '/request-a-quote', {
        sqFt: formData.approximateSqFt,
        material: formData.materialPreference
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Transmission error. Please call our hotline.');
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
          <span>Formal Specification Builder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B1F] tracking-tight">
          Request Detailed Project Estimate
        </h1>
        <p className="text-sm text-[#49454F] max-w-xl mx-auto">
          Parametric engineering calculator and formal bid request. Our estimators evaluate historical satellite roof dimensions, pitch geometry, and insulation codes.
        </p>
      </div>

      {result ? (
        /* Success Screen */
        <div className="rounded-[32px] bg-[#F3EDF7] text-center p-8 sm:p-12 shadow-sm border border-[#E7E0EC] space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#C8E6C9] text-[#1B5E20] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="text-xs text-[#6750A4] font-bold uppercase tracking-wider">
              Estimate Transmission #{result.id.toUpperCase()}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1F] mt-1">
              Estimate Specification Received & Logged
            </h2>
            <p className="text-sm text-[#49454F] mt-2 max-w-md mx-auto">
              Thank you, <span className="font-bold text-[#1C1B1F]">{result.fullName}</span>. Your property at <span className="font-bold text-[#1C1B1F]">{result.propertyAddress || 'your designated address'}</span> has been queued for aerial satellite boundary verification.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-[#21005D] text-white p-6 rounded-3xl space-y-3 text-left shadow-sm">
            <div className="text-xs text-[#EADDFF] uppercase tracking-wider font-bold">
              Estimated Budgetary Envelope:
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              ${result.calculatedEstimateLow.toLocaleString()} – ${result.calculatedEstimateHigh.toLocaleString()}
            </div>
            <div className="text-xs text-white/80 border-t border-white/10 pt-2 space-y-1">
              <div>Scope Area: <strong className="text-white">{result.approximateSqFt.toLocaleString()} SQ FT</strong></div>
              <div>Material System: <strong className="text-white">{result.materialPreference}</strong></div>
              <div>Status: Active Queue (Assigned to Engineering Desk)</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <TactileButton variant="primary" onClick={() => onNavigate('/schedule-inspection')}>
              <span>Schedule On-Site Field Verification</span>
              <ArrowRight className="w-4 h-4" />
            </TactileButton>
            <TactileButton variant="secondary" onClick={() => onNavigate('/')}>
              <span>Return to Overview</span>
            </TactileButton>
          </div>
        </div>
      ) : (
        /* Multi-Step Workflow */
        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-10 shadow-sm border border-[#E7E0EC]">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 border-b border-[#E7E0EC] pb-5">
            {[
              { num: 1, title: 'Scope & Geometry' },
              { num: 2, title: 'Material & Timeline' },
              { num: 3, title: 'Contact & Confirmation' }
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-2.5 text-xs font-bold ${
                  step === s.num ? 'text-[#6750A4]' : (step > s.num ? 'text-[#1B5E20]' : 'text-[#49454F]')
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s.num
                      ? 'bg-[#6750A4] text-white shadow-sm'
                      : (step > s.num ? 'bg-[#C8E6C9] text-[#1B5E20]' : 'bg-[#E7E0EC] text-[#49454F]')
                  }`}
                >
                  {s.num}
                </div>
                <span className="hidden sm:inline font-bold">{s.title}</span>
              </div>
            ))}
          </div>

          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
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

            {/* STEP 1: Property Scope & Dimensions */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-2 tracking-wide">
                    Property Classification
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'commercial', label: 'Commercial Low-Slope', sub: 'Retail / Office / Medical' },
                      { id: 'industrial', label: 'Industrial / Logistics', sub: 'Warehouse / Manufacturing' },
                      { id: 'residential', label: 'Residential Steep', sub: 'Architectural / Metal' }
                    ].map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setFormData({ ...formData, propertyType: t.id as any })}
                        className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer active:scale-95 ${
                          formData.propertyType === t.id
                            ? 'bg-[#6750A4] text-white shadow-sm'
                            : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                        }`}
                      >
                        <div className="text-xs font-bold">{t.label}</div>
                        <div className={`text-[11px] mt-1 ${formData.propertyType === t.id ? 'text-white/80' : 'text-[#49454F]'}`}>
                          {t.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#E7E0EC] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase text-[#1C1B1F]">
                      Estimated Square Footage: <strong className="text-[#6750A4]">{formData.approximateSqFt.toLocaleString()} SQ FT</strong>
                    </label>
                    <input
                      type="number"
                      min="500"
                      max="150000"
                      step="500"
                      value={formData.approximateSqFt}
                      onChange={(e) => setFormData({ ...formData, approximateSqFt: Math.max(500, Number(e.target.value) || 0) })}
                      className="w-28 px-3 py-1.5 text-xs font-bold bg-white rounded-full border border-[#CAC4D0] text-right text-[#1C1B1F] focus:outline-none focus:ring-1 focus:ring-[#6750A4]"
                    />
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="80000"
                    step="1000"
                    value={formData.approximateSqFt}
                    onChange={(e) => setFormData({ ...formData, approximateSqFt: Number(e.target.value) })}
                    className="w-full h-2.5 bg-[#CAC4D0] rounded-full appearance-none cursor-pointer accent-[#6750A4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-2 tracking-wide">
                    Roof Pitch & Slope
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'flat', label: 'Flat (≤ 1/4:12)' },
                      { id: 'low', label: 'Low Pitch (2:12–4:12)' },
                      { id: 'medium', label: 'Medium Pitch (5:12–8:12)' },
                      { id: 'steep', label: 'Steep Pitch (9:12+)' }
                    ].map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setFormData({ ...formData, pitchType: p.id as any })}
                        className={`p-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer active:scale-95 ${
                          formData.pitchType === p.id
                            ? 'bg-[#6750A4] text-white shadow-sm'
                            : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <TactileButton variant="primary" type="submit">
                    <span>Next: Select Material & Timeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </TactileButton>
                </div>
              </div>
            )}

            {/* STEP 2: Material & Timeline */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-2 tracking-wide">
                    Select Roofing Membrane Or Material Assembly
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: 'Carlisle 60-mil TPO Membrane', warranty: '20-Yr NDL', desc: 'Solar-reflective commercial standard' },
                      { name: 'Sika Sarnafil 80-mil PVC Membrane', warranty: '30-Yr NDL', desc: 'Chemical, grease & puncture resistant' },
                      { name: '24-Gauge Standing Seam Galvalume Metal', warranty: '50-Yr Warranty', desc: 'Architectural durability, no exposed fasteners' },
                      { name: 'CertainTeed Class 4 Impact Shingles', warranty: '50-Yr Lifetime', desc: 'Severe hail protection for steep slope' }
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.name}
                        onClick={() => setFormData({ ...formData, materialPreference: m.name })}
                        className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer active:scale-95 ${
                          formData.materialPreference === m.name
                            ? 'bg-[#6750A4] text-white shadow-sm'
                            : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold">{m.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            formData.materialPreference === m.name ? 'bg-white/20 text-white' : 'bg-[#E8DEF8] text-[#6750A4]'
                          }`}>
                            {m.warranty}
                          </span>
                        </div>
                        <div className={`text-[11px] mt-1 ${formData.materialPreference === m.name ? 'text-white/80' : 'text-[#49454F]'}`}>
                          {m.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-2 tracking-wide">
                    Project Timeframe
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'immediate', label: 'Emergency / Immediate', sub: 'Urgent leak risk' },
                      { id: '1-3_months', label: '1 to 3 Months', sub: 'Scheduled project' },
                      { id: 'budgeting', label: 'Capital Budgeting', sub: 'Next fiscal year' }
                    ].map((tf) => (
                      <button
                        type="button"
                        key={tf.id}
                        onClick={() => setFormData({ ...formData, timeframe: tf.id as any })}
                        className={`p-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer active:scale-95 ${
                          formData.timeframe === tf.id
                            ? 'bg-[#6750A4] text-white shadow-sm'
                            : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                        }`}
                      >
                        <div>{tf.label}</div>
                        <div className={`text-[10px] mt-0.5 ${formData.timeframe === tf.id ? 'text-white/80' : 'text-[#49454F]'}`}>
                          {tf.sub}
                        </div>
                      </button>
                    ))}
                  </div>
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
                    placeholder="e.g. 2400 Enterprise Dr, Elk Grove Village, IL"
                    className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <TactileButton variant="ghost" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </TactileButton>
                  <TactileButton variant="primary" type="submit">
                    <span>Next: Contact & Budget Readout</span>
                    <ArrowRight className="w-4 h-4" />
                  </TactileButton>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Details & Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Real-time Budget Readout Banner */}
                <div className="p-5 rounded-3xl bg-[#21005D] text-white flex items-center justify-between shadow-sm">
                  <div>
                    <div className="text-[11px] text-[#EADDFF] uppercase font-bold tracking-wider">
                      Calculated Preliminary Estimate
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                      ${currentLowEst.toLocaleString()} – ${currentHighEst.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right text-xs text-[#EADDFF] hidden sm:block font-medium">
                    <div>{formData.approximateSqFt.toLocaleString()} SQ FT</div>
                    <div>{formData.materialPreference.split(' ')[0]} {formData.materialPreference.split(' ')[1]}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Thomas Keller"
                      className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                      Primary Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(312) 555-0182"
                      className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="t.keller@industrial-property.com"
                    className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#1C1B1F] mb-1 tracking-wide">
                    Specific Notes / Roof History
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mention any active leaks, HVAC curb penetrations, ponding water, or upcoming inspection requirements..."
                    className="w-full p-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3.5 bg-[#FFDAD6] text-[#BA1A1A] text-xs font-medium rounded-2xl">
                    {errorMsg}
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center">
                  <TactileButton variant="ghost" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </TactileButton>

                  <TactileButton
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="!py-3.5 !px-8 text-sm"
                  >
                    <span>{isSubmitting ? 'Calculating & Logging...' : 'Transmit Formal Bid Request'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </TactileButton>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
