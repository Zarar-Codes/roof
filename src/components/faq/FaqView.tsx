import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, IndustrialBadge } from '../common/TactileElements';
import { faqsData } from '../../data/roofingData';
import { FAQItem } from '../../types';

interface FaqViewProps {
  onRequestQuote: () => void;
  onScheduleInspection: () => void;
}

export function FaqView({ onRequestQuote, onScheduleInspection }: FaqViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(faqsData[0].id);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'inspection', label: 'Diagnostics & Drones' },
    { id: 'commercial', label: 'Commercial Low-Slope' },
    { id: 'replacement', label: 'Replacement & Lifespans' },
    { id: 'storm', label: 'Storm Damage & Leaks' }
  ];

  const filtered = faqsData.filter((item: FAQItem) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1B1F] tracking-tight">
          Technical FAQs & Operational Guidelines
        </h1>
        <p className="text-sm sm:text-base text-[#49454F] leading-relaxed">
          Comprehensive answers to common architectural specifications, ASTM standards, NDL warranty stipulations, and infrared moisture survey methodologies.
        </p>

        {/* Search input in Material 3 Pill Container */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="relative flex items-center bg-[#E7E0EC] rounded-full px-4 h-12 shadow-sm border border-[#CAC4D0] focus-within:border-[#6750A4] focus-within:bg-[#ECE6F0] transition-all">
            <Search className="w-5 h-5 text-[#49454F] ml-1 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search specifications, TPO, warranty, drone, hail..."
              className="w-full bg-transparent px-3 py-1.5 text-sm text-[#1C1B1F] placeholder-[#49454F] outline-none font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-[#6750A4] font-bold mr-2 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories tabs (Material 3 Chips) */}
        <div className="pt-3 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-[#6750A4] text-white shadow-sm'
                  : 'bg-[#E8DEF8] text-[#1D192B] hover:bg-[#EADDFF]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion list (Material 3 Cards) */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#49454F] text-sm">
            No specifications found matching "{searchTerm}". Try another keyword or contact engineering directly.
          </div>
        ) : (
          filtered.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-3xl bg-[#F3EDF7] p-5 sm:p-6 border border-[#E7E0EC] shadow-sm transition-all duration-200 ${
                  isOpen ? 'bg-[#ECE6F0]' : ''
                }`}
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-full bg-[#6750A4] text-white text-xs font-extrabold flex items-center justify-center shrink-0 shadow-xs">
                      Q
                    </span>
                    <span className="font-extrabold text-sm sm:text-base text-[#1C1B1F]">
                      {item.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#1C1B1F] shrink-0 shadow-xs">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#6750A4]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-[#E7E0EC] pl-11 pr-2 text-xs sm:text-sm text-[#49454F] leading-relaxed animate-fadeIn space-y-2">
                    <p>{item.answer}</p>
                    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[11px] font-bold text-[#6750A4] uppercase">
                      CATEGORY: {item.category} • ENFORCED STANDARDS
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Need more answers panel (Material 3 Dark Tonal) */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-[#21005D] text-white text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-extrabold">Have Specific Architectural or Submittal Questions?</h3>
        <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
          Our engineering desk assists general contractors, insurance adjusters, and facility directors with load calculations, tapered slope CAD layouts, and FM Global compliance.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <TactileButton variant="primary" onClick={onRequestQuote} className="bg-white !text-[#21005D] hover:bg-[#EADDFF]">
            <span>Submit Technical Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </TactileButton>
          <TactileButton variant="secondary" onClick={onScheduleInspection} className="bg-white/10 hover:bg-white/20 text-white border-white/20">
            <span>Book On-Site Diagnostic Scan</span>
          </TactileButton>
        </div>
      </div>
    </div>
  );
}
