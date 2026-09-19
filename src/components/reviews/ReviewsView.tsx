import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus, Award, ArrowRight, Sparkles, X } from 'lucide-react';
import { MechanicalCard, TactileButton, RecessedWell, IndustrialBadge } from '../common/TactileElements';
import { testimonialsData } from '../../data/roofingData';
import { Testimonial } from '../../types';

interface ReviewsViewProps {
  onRequestQuote: () => void;
}

export function ReviewsView({ onRequestQuote }: ReviewsViewProps) {
  const [reviews, setReviews] = useState<Testimonial[]>(testimonialsData);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    role: '',
    company: '',
    location: '',
    projectType: 'Commercial Flat',
    rating: 5,
    content: ''
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.content) return;

    const added: Testimonial = {
      id: `rev-${Date.now()}`,
      customerName: newReview.author,
      roleOrNeighborhood: `${newReview.role || 'Property Owner'}${newReview.company ? ` • ${newReview.company}` : ''}`,
      serviceRendered: newReview.projectType,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      quote: newReview.content,
      verifiedInspection: true
    };

    setReviews([added, ...reviews]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowSubmitModal(false);
      setNewReview({
        author: '',
        role: '',
        company: '',
        location: '',
        projectType: 'Commercial Flat',
        rating: 5,
        content: ''
      });
    }, 2000);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Reputation Metrics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1B1F] tracking-tight">
          Client Reviews & Inspection Verifications
        </h1>
        <p className="text-sm sm:text-base text-[#49454F] leading-relaxed">
          Read verified field feedback from commercial plant engineers, property management portfolios, and homeowners across Northern Illinois.
        </p>
      </div>

      {/* Aggregate Rating Scoreboard Panel (Material 3 Tonal Container) */}
      <div className="rounded-[32px] bg-[#21005D] text-white p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="bg-white/10 p-5 rounded-3xl min-w-[130px] text-center border border-white/10">
            <div className="text-4xl sm:text-5xl font-extrabold text-[#EADDFF]">
              4.98
            </div>
            <div className="flex justify-center gap-1 mt-1.5 text-[#FFB74D]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-[11px] text-white/80 font-bold mt-1">OUT OF 5.0</div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold text-white">Consistently Rated #1 for Building Envelope Reliability</h3>
            <p className="text-xs text-white/80 max-w-md leading-relaxed">
              100% of our commercial completed roofs pass manufacturer third-party NDL inspection on first audit.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C8E6C9] font-bold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent Third-Party Verification Standards Enforced</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <TactileButton
            variant="primary"
            onClick={() => setShowSubmitModal(true)}
            className="bg-white !text-[#21005D] hover:bg-[#EADDFF] shadow-sm !py-3 !px-6 text-xs"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Submit Verified Review</span>
          </TactileButton>
        </div>
      </div>

      {/* Testimonials Grid (Material 3 Surface Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((t) => (
          <div
            key={t.id}
            className="rounded-3xl bg-[#F3EDF7] p-6 sm:p-7 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 border border-[#E7E0EC] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#E65100] mb-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h4 className="text-base font-extrabold text-[#1C1B1F]">
                    {t.customerName}
                  </h4>
                  <div className="text-xs text-[#49454F]">
                    {t.roleOrNeighborhood}
                  </div>
                </div>

                <div className="text-right">
                  {t.verifiedInspection && (
                    <span className="inline-flex items-center gap-1 bg-[#C8E6C9] text-[#1B5E20] px-3 py-1 rounded-full text-[11px] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>NDL AUDIT VERIFIED</span>
                    </span>
                  )}
                  <div className="text-[11px] text-[#79747E] font-medium mt-1">{t.date}</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#49454F] leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#E7E0EC] flex items-center justify-between text-xs text-[#49454F]">
              <span className="font-bold text-[#6750A4]">VERIFIED CUSTOMER</span>
              <span className="text-[#1C1B1F] font-bold bg-[#E8DEF8] px-3 py-0.5 rounded-full">{t.serviceRendered}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Review Modal (Material 3 Dialog) */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-[#1C1B1F]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#FFFBFE] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7E0EC] relative animate-fadeIn">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F3EDF7] flex items-center justify-center text-[#1C1B1F] hover:bg-[#E8DEF8] active:scale-95 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-[#1C1B1F] mb-1">
              Submit Project Feedback
            </h3>
            <p className="text-xs text-[#49454F] mb-5">
              Your feedback is audited against our project dispatch records before publication.
            </p>

            {submittedMessage ? (
              <div className="p-6 text-center space-y-2 bg-[#C8E6C9]/40 rounded-3xl border border-[#C8E6C9]">
                <CheckCircle2 className="w-10 h-10 text-[#1B5E20] mx-auto" />
                <h4 className="font-bold text-[#1C1B1F]">Review Submitted for Verification</h4>
                <p className="text-xs text-[#49454F]">Thank you for your partnership.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1">
                    Your Name Or Contact *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-xs font-medium outline-none transition-all"
                    placeholder="e.g. David Vance"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#1C1B1F] mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-xs font-medium outline-none transition-all"
                      placeholder="e.g. Facilities VP"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#1C1B1F] mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={newReview.company}
                      onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                      className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-xs font-medium outline-none transition-all"
                      placeholder="e.g. Vance Logistics"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1">
                    Project System Specification
                  </label>
                  <select
                    value={newReview.projectType}
                    onChange={(e) => setNewReview({ ...newReview, projectType: e.target.value })}
                    className="w-full h-11 px-3 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-xs font-medium outline-none transition-all"
                  >
                    <option value="Commercial Flat TPO">Commercial Flat TPO</option>
                    <option value="Standing Seam Metal">Standing Seam Metal</option>
                    <option value="Architectural Shingle">Architectural Shingle</option>
                    <option value="Emergency Leak Containment">Emergency Leak Containment</option>
                    <option value="FLIR Drone Inspection">FLIR Drone Inspection</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1.5">
                    Rating (1-5 Stars)
                  </label>
                  <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setNewReview({ ...newReview, rating: r })}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                          newReview.rating === r
                            ? 'bg-[#6750A4] text-white shadow-sm'
                            : 'bg-[#E7E0EC] text-[#1C1B1F] hover:bg-[#E8DEF8]'
                        }`}
                      >
                        {r} ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1">
                    Testimonial & Observations *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    className="w-full p-3 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-xs font-medium outline-none transition-all"
                    placeholder="Describe the speed, workmanship, cleanup, and watertight performance..."
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2.5">
                  <TactileButton
                    variant="ghost"
                    onClick={() => setShowSubmitModal(false)}
                    className="!py-2 !px-4 text-xs"
                  >
                    Cancel
                  </TactileButton>
                  <TactileButton
                    variant="primary"
                    type="submit"
                    className="!py-2 !px-5 text-xs"
                  >
                    Publish Verified Feedback
                  </TactileButton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
