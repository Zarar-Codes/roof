import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, RecessedWell, IndustrialBadge } from '../common/TactileElements';
import { BusinessConfig } from '../../types';
import { trackEvent } from '../../utils/analytics';

interface ContactViewProps {
  business: BusinessConfig;
  onNavigate: (route: string) => void;
}

export function ContactView({ business, onNavigate }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Commercial Project Estimation',
    message: '',
    _hp: '' // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch communication.');
      }

      setSubmitSuccess(true);
      trackEvent('contact_submit', '/contact', { subject: formData.subject });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Commercial Project Estimation',
        message: '',
        _hp: ''
      });
    } catch (err: any) {
      setSubmitError(err.message || 'Error transmitting message. Please call our hotline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Communications Terminal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1B1F] tracking-tight">
          Central Dispatch & Engineering Desk
        </h1>
        <p className="text-sm sm:text-base text-[#49454F] leading-relaxed">
          Reach our certified building envelope estimators, schedule an on-site commercial core moisture survey, or connect with our 24/7 emergency leak triage team.
        </p>
      </div>

      {/* Emergency Hotline Alert Banner (Material 3 Tonal Container) */}
      <div className="rounded-3xl bg-[#7D5260] text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-6 h-6 text-[#FFD8E4] animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-[#FFD8E4] font-bold uppercase tracking-wider">
              Active Water Intrusion Or Rooftop Collapse Hazard?
            </div>
            <h3 className="text-xl font-extrabold">
              Immediate 24/7 Emergency Storm Triage Hotline
            </h3>
            <p className="text-xs text-white/80 mt-0.5">
              Dedicated emergency pumps, heavy tarps, and heat-weld patches dispatched within 2 hours.
            </p>
          </div>
        </div>

        <a
          href={`tel:${business.emergencyPhone.replace(/\D/g, '')}`}
          className="px-6 py-3.5 rounded-full bg-white text-[#7D5260] hover:bg-[#FFD8E4] active:scale-95 text-xs uppercase font-bold tracking-wider transition-all shadow-sm shrink-0 flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          <span>Call Emergency: {business.emergencyPhone}</span>
        </a>
      </div>

      {/* Contact Grid: Form & Facilities Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 shadow-sm border border-[#E7E0EC]">
            <h2 className="text-2xl font-extrabold text-[#1C1B1F] mb-1">
              Send an Engineering Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#49454F] mb-6">
              Inquiries are routed to a senior project estimator. Expect a formal response within 2 business hours.
            </p>

            {submitSuccess ? (
              <div className="p-8 text-center space-y-3 bg-[#C8E6C9]/40 rounded-3xl border border-[#C8E6C9]">
                <CheckCircle2 className="w-12 h-12 text-[#1B5E20] mx-auto" />
                <h3 className="text-xl font-extrabold text-[#1C1B1F]">Message Transmitted Successfully</h3>
                <p className="text-xs sm:text-sm text-[#49454F] max-w-md mx-auto">
                  A certified project engineer has received your transmission and will review your specifications shortly.
                </p>
                <div className="pt-2">
                  <TactileButton
                    variant="secondary"
                    onClick={() => setSubmitSuccess(false)}
                    className="!py-2.5 text-xs"
                  >
                    Send Another Inquiry
                  </TactileButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field - hidden from humans */}
                <input
                  type="text"
                  name="_hp"
                  value={formData._hp}
                  onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1B1F] mb-1 tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Michael Henderson"
                      className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1B1F] mb-1 tracking-wide">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(312) 555-0192"
                      className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1B1F] mb-1 tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="m.henderson@company.com"
                      className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1B1F] mb-1 tracking-wide">
                      Subject Of Inquiry
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-12 px-3 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-xs font-medium outline-none transition-all"
                    >
                      <option value="Commercial Project Estimation">Commercial Project Estimation</option>
                      <option value="FLIR Drone Infrared Inspection">FLIR Drone Infrared Inspection</option>
                      <option value="Standing Seam Architectural Metal">Standing Seam Architectural Metal</option>
                      <option value="Storm Damage Assessment">Storm Damage Assessment</option>
                      <option value="Subcontractor / Architect Submittal">Subcontractor / Architect Submittal</option>
                      <option value="Other">Other Operational Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1B1F] mb-1 tracking-wide">
                    Project Details Or Specifications *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide facility square footage, active leak locations, roof age, or architectural requirements..."
                    className="w-full p-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
                  />
                </div>

                {submitError && (
                  <div className="p-3.5 bg-[#FFDAD6] text-[#BA1A1A] text-xs font-medium rounded-2xl">
                    {submitError}
                  </div>
                )}

                <TactileButton
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="!py-3.5 !px-8 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Message'}</span>
                </TactileButton>
              </form>
            )}
          </div>
        </div>

        {/* Right: Operational Headquarters Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 shadow-sm border border-[#E7E0EC]">
            <h3 className="text-xl font-extrabold text-[#1C1B1F] mb-4">
              Facility & Operations Desk
            </h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3 p-4 bg-white/70 rounded-2xl border border-[#E7E0EC]">
                <MapPin className="w-5 h-5 text-[#6750A4] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1C1B1F]">Central Dispatch Facility</div>
                  <div className="text-[#49454F] mt-0.5">{business.dispatchAddress}</div>
                  <div className="text-[11px] text-[#79747E] mt-1">Staging yard, metal brake shop & material logistics</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/70 rounded-2xl border border-[#E7E0EC]">
                <Phone className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1C1B1F]">Primary Hotline</div>
                  <a href={`tel:${business.primaryPhone.replace(/\D/g, '')}`} className="text-[#6750A4] font-bold text-sm block mt-0.5 hover:underline">
                    {business.primaryPhone}
                  </a>
                  <div className="text-[11px] text-[#49454F] mt-0.5">Direct line to estimating team</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/70 rounded-2xl border border-[#E7E0EC]">
                <Mail className="w-5 h-5 text-[#6750A4] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1C1B1F]">Email Specifications</div>
                  <a href={`mailto:${business.email}`} className="text-[#1C1B1F] hover:underline font-bold block mt-0.5">
                    {business.email}
                  </a>
                  <div className="text-[11px] text-[#49454F] mt-0.5">Send architectural PDFs & RFPs</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/70 rounded-2xl border border-[#E7E0EC]">
                <Clock className="w-5 h-5 text-[#49454F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1C1B1F]">Operating Hours</div>
                  <div className="text-[#49454F] mt-0.5">Monday – Friday: {business.hoursWeekday}</div>
                  <div className="text-[#49454F]">Saturday: {business.hoursSaturday}</div>
                  <div className="text-[#2E7D32] font-bold mt-1">24/7 Emergency Storm Dispatch</div>
                </div>
              </div>
            </div>
          </div>

          {/* Licensing verification box (Material 3 Dark Tonal) */}
          <div className="p-6 rounded-3xl bg-[#21005D] text-white space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-[#C8E6C9] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>VERIFIED CREDENTIALS</span>
            </div>
            <div className="text-xs space-y-1 text-white/80">
              <div>Illinois Roofing License: <strong className="text-white">{business.licenseNumber}</strong></div>
              <div>Commercial General Liability: <strong className="text-white">{business.insuranceCoverage}</strong></div>
              <div>FAA Part 107 Commercial Drone Ops</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
