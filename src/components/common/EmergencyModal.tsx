import React, { useState } from 'react';
import { AlertTriangle, Phone, X, CheckCircle2, Send, ShieldAlert } from 'lucide-react';
import { TactileButton } from './TactileElements';
import { BusinessConfig } from '../../types';
import { trackEvent } from '../../utils/analytics';

interface EmergencyModalProps {
  isOpen: boolean;
  business: BusinessConfig;
  onClose: () => void;
}

export function EmergencyModal({ isOpen, business, onClose }: EmergencyModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    propertyAddress: '',
    emergencyType: 'Active Commercial Membrane Leak',
    notes: '',
    _hp: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          urgency: 'urgent',
          serviceRequested: 'emergency-leak-repair',
          source: 'Emergency Dispatch Modal'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to dispatch emergency ticket.');

      setSubmitted(true);
      trackEvent('cta_click', '/emergency', { type: formData.emergencyType });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error transmitting dispatch ticket. Please call hotline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1B1F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#FFFBFE] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7E0EC] relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F3EDF7] flex items-center justify-center text-[#1C1B1F] hover:bg-[#E8DEF8] active:scale-95 transition-all cursor-pointer"
          aria-label="Close emergency modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#BA1A1A] text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#BA1A1A] uppercase tracking-wide">
              <span>Rapid Storm Triage Dispatch</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1C1B1F]">
              24/7 Emergency Leak Containment
            </h3>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#C8E6C9] flex items-center justify-center mx-auto text-[#1B5E20]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-extrabold text-[#1C1B1F]">Emergency Ticket Dispatched</h4>
            <p className="text-sm text-[#49454F] max-w-sm mx-auto">
              Our on-call commercial superintendent has been paged with your coordinates. Expect a direct callback within 15 minutes.
            </p>
            <div className="pt-3">
              <TactileButton variant="primary" onClick={onClose} className="!py-3 !px-8 text-sm">
                Dismiss Window
              </TactileButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Honeypot */}
            <input
              type="text"
              name="_hp"
              value={formData._hp}
              onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="block font-bold text-[#1C1B1F] mb-1.5 uppercase tracking-wide">
                Direct Hotline (Immediate Answer):
              </label>
              <a
                href={`tel:${business.emergencyPhone.replace(/\D/g, '')}`}
                className="w-full py-3 px-4 bg-[#BA1A1A] text-white hover:bg-[#BA1A1A]/90 active:scale-95 rounded-full flex items-center justify-center gap-2 font-bold text-sm tracking-wide shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call {business.emergencyPhone} (24/7 Direct)</span>
              </a>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#E7E0EC]"></div>
              <span className="flex-shrink mx-3 text-[11px] text-[#49454F] uppercase font-bold tracking-wider">
                Or Submit Digital Priority Ticket
              </span>
              <div className="flex-grow border-t border-[#E7E0EC]"></div>
            </div>

            {/* Contact Name (Material 3 filled style) */}
            <div>
              <label className="block font-bold text-[#1C1B1F] mb-1">Contact Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Full Name or Facility Director"
                className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-bold text-[#1C1B1F] mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(312) 555-0192"
                  className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1C1B1F] mb-1">Classification</label>
                <select
                  value={formData.emergencyType}
                  onChange={(e) => setFormData({ ...formData, emergencyType: e.target.value })}
                  className="w-full h-12 px-3 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-xs font-medium outline-none transition-all"
                >
                  <option value="Active Commercial Membrane Leak">Active Membrane Leak</option>
                  <option value="Severe Wind Tear / Membrane Blow-off">Severe Wind Tear / Blow-off</option>
                  <option value="HVAC Curb Flashing Failure">HVAC Curb Flashing Failure</option>
                  <option value="Hail Penetration / Puncture">Hail Penetration / Puncture</option>
                  <option value="Drain Scupper Clog / Standing Ponding">Drain Clog / Water Ponding</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1C1B1F] mb-1">Street Address & City *</label>
              <input
                type="text"
                required
                value={formData.propertyAddress}
                onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                placeholder="Property location where dispatch crews should report"
                className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-[#FFDAD6] text-[#BA1A1A] text-xs rounded-2xl font-medium">
                {errorMsg}
              </div>
            )}

            <div className="pt-2">
              <TactileButton
                variant="danger"
                type="submit"
                disabled={isSubmitting}
                fullWidth
                className="!py-3.5 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Paging On-Call Crews...' : 'Transmit Priority Emergency Ticket'}</span>
              </TactileButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
