import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, ShieldAlert, Layers, Gauge, Sparkles } from 'lucide-react';
import { MechanicalCard, RecessedWell, TactileButton } from '../common/TactileElements';
import { trackEvent } from '../../utils/analytics';

interface CostEstimatorProps {
  onProceedToQuote: (params: {
    sqFt: number;
    pitch: 'flat' | 'low' | 'medium' | 'steep';
    material: string;
    lowEst: number;
    highEst: number;
  }) => void;
}

export function CostEstimator({ onProceedToQuote }: CostEstimatorProps) {
  const [sqFt, setSqFt] = useState<number>(12500);
  const [pitch, setPitch] = useState<'flat' | 'low' | 'medium' | 'steep'>('flat');
  const [material, setMaterial] = useState<string>('Carlisle 60-mil TPO Membrane');

  const materialsList = [
    { name: 'Carlisle 60-mil TPO Membrane', baseRate: 6.20, warranty: '20-Year NDL', category: 'Commercial Low-Slope' },
    { name: 'Sika Sarnafil 80-mil PVC Membrane', baseRate: 7.80, warranty: '30-Year NDL', category: 'Commercial High-Chem' },
    { name: '24-Gauge Standing Seam Galvalume Metal', baseRate: 12.50, warranty: '50-Year Substrate', category: 'Architectural Metal' },
    { name: 'CertainTeed Class 4 Impact Shingles', baseRate: 4.85, warranty: '50-Year Lifetime', category: 'Residential / Steep' }
  ];

  const selectedMatObj = materialsList.find(m => m.name === material) || materialsList[0];

  // Mathematical estimate calculation
  let pitchMultiplier = 1.0;
  if (pitch === 'low') pitchMultiplier = 1.05;
  if (pitch === 'medium') pitchMultiplier = 1.18;
  if (pitch === 'steep') pitchMultiplier = 1.35;

  const baseTotal = sqFt * selectedMatObj.baseRate * pitchMultiplier;
  const lowEst = Math.round(baseTotal * 0.92);
  const highEst = Math.round(baseTotal * 1.15);
  const estimatedDays = Math.max(1, Math.ceil(sqFt / 5500));

  const handleProceed = () => {
    trackEvent('quote_start', '/calculator', { sqFt, pitch, material, lowEst, highEst });
    onProceedToQuote({
      sqFt,
      pitch,
      material,
      lowEst,
      highEst
    });
  };

  return (
    <div className="w-full rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E7E0EC]">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
        {/* Input Parameters Controls */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5 text-[#6750A4]" />
              <span>ROOF ENVELOPE SPECIFICATION CALCULATOR</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1F] tracking-tight">
              Instant Budget & Material Estimator
            </h3>
            <p className="text-sm text-[#49454F] mt-1">
              Select your structural parameters to evaluate material options, labor schedule, and verified budget thresholds.
            </p>
          </div>

          {/* Square Footage Slider & Manual Entry */}
          <div className="space-y-3 p-4 rounded-2xl bg-[#E7E0EC]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-[#1C1B1F]">
                Approximate Roof Area
              </label>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#CAC4D0] font-sans text-sm font-bold text-[#1C1B1F]">
                <input
                  type="number"
                  min="500"
                  max="150000"
                  step="500"
                  value={sqFt}
                  onChange={(e) => setSqFt(Math.max(500, Number(e.target.value) || 0))}
                  className="w-20 bg-transparent text-right font-bold focus:outline-none"
                />
                <span className="text-[#49454F] text-xs">SQ FT</span>
              </div>
            </div>

            <input
              type="range"
              min="1000"
              max="80000"
              step="1000"
              value={sqFt}
              onChange={(e) => setSqFt(Number(e.target.value))}
              className="w-full h-2.5 bg-[#CAC4D0] rounded-full appearance-none cursor-pointer accent-[#6750A4]"
            />
            <div className="flex justify-between text-[11px] font-medium text-[#49454F]">
              <span>1,000 SQ FT (Residential)</span>
              <span>25,000 SQ FT (Commercial)</span>
              <span>80,000+ SQ FT (Logistics)</span>
            </div>
          </div>

          {/* Roof Pitch / Slope Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-[#1C1B1F]">
              Roof Pitch & Profile
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'flat', label: 'Flat / Low Slope', sub: '≤ 1/4:12 Pitch' },
                { id: 'low', label: 'Low Pitch', sub: '2:12 to 4:12' },
                { id: 'medium', label: 'Medium Pitch', sub: '5:12 to 8:12' },
                { id: 'steep', label: 'Steep Pitch', sub: '9:12+ Architectural' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPitch(p.id as any)}
                  className={`p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer active:scale-95 ${
                    pitch === p.id
                      ? 'bg-[#6750A4] text-white shadow-sm'
                      : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{p.label}</div>
                  <div className={`text-[10px] mt-0.5 ${pitch === p.id ? 'text-white/80' : 'text-[#49454F]'}`}>
                    {p.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Material System */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-[#1C1B1F]">
              Engineered Membrane Or Material Assembly
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {materialsList.map((mat) => (
                <button
                  key={mat.name}
                  type="button"
                  onClick={() => setMaterial(mat.name)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer active:scale-95 ${
                    material === mat.name
                      ? 'bg-[#6750A4] text-white shadow-sm'
                      : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold">{mat.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      material === mat.name
                        ? 'bg-white/20 text-white'
                        : 'bg-[#E8DEF8] text-[#6750A4]'
                    }`}>
                      {mat.warranty}
                    </span>
                  </div>
                  <div className={`text-[11px] mt-1 ${
                    material === mat.name ? 'text-white/80' : 'text-[#49454F]'
                  }`}>
                    {mat.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Readout Panel (Material 3 Tonal Surface) */}
        <div className="lg:w-96 flex flex-col justify-between rounded-3xl bg-[#21005D] p-6 sm:p-7 text-white shadow-md relative">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#C8E6C9]" />
                <span className="text-xs font-bold text-[#EADDFF] uppercase tracking-wider">
                  Estimate Breakdown
                </span>
              </div>
              <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full text-white/80">
                Algorithm V4.2
              </span>
            </div>

            {/* Price Output Well */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
              <div className="text-[11px] uppercase tracking-wider text-[#EADDFF] font-bold">
                Estimated Investment Range
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                ${lowEst.toLocaleString()} – ${highEst.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#C8E6C9] mt-1.5 font-medium">
                Includes full tear-off, code insulation, labor & warranty
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#EADDFF]">Gross Area:</span>
                <span className="text-white font-bold">{sqFt.toLocaleString()} SQ FT</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#EADDFF]">Slope Multiplier:</span>
                <span className="text-white font-bold">{pitchMultiplier.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#EADDFF]">Manufacturer Warranty:</span>
                <span className="text-[#C8E6C9] font-bold">{selectedMatObj.warranty}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#EADDFF]">Estimated Duration:</span>
                <span className="text-white font-bold">{estimatedDays}–{estimatedDays + 2} Business Days</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/15 space-y-2">
            <TactileButton
              variant="primary"
              fullWidth
              onClick={handleProceed}
              className="!py-3.5 !text-sm bg-white !text-[#21005D] hover:bg-[#E8DEF8] active:bg-[#EADDFF]"
            >
              <span>Lock In Specification →</span>
            </TactileButton>
            <p className="text-[11px] text-center text-white/70">
              Formal bids require on-site core verification and drone moisture mapping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
