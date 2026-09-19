import React, { useState } from 'react';
import { Phone, Shield, Menu, X, Lock, Calendar, Calculator, Sparkles } from 'lucide-react';
import { StatusLed, TactileButton } from './TactileElements';
import { BusinessConfig } from '../../types';
import { trackEvent } from '../../utils/analytics';

interface HeaderProps {
  business: BusinessConfig;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenEmergencyModal?: () => void;
}

export function Header({
  business,
  currentRoute,
  onNavigate,
  onOpenEmergencyModal
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Services', route: '/services' },
    { label: 'Service Areas', route: '/service-areas' },
    { label: 'Projects', route: '/projects' },
    { label: 'Gallery', route: '/gallery' },
    { label: 'Reviews', route: '/reviews' },
    { label: 'FAQ', route: '/faq' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', currentRoute, { phone: business.primaryPhone });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFBFE]/90 backdrop-blur-md border-b border-[#E7E0EC] shadow-sm transition-all duration-300">
      {/* Top Tonal Status Banner */}
      <div className="bg-[#6750A4] text-white py-1.5 px-4 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C8E6C9] animate-pulse" />
              24/7 RAPID DISPATCH READY
            </span>
            <span className="hidden md:inline text-white/60">|</span>
            <span className="hidden md:inline font-medium text-white/90">
              IL License: <strong className="text-white font-bold">{business.licenseNumber}</strong>
            </span>
            <span className="hidden lg:inline text-white/60">|</span>
            <span className="hidden lg:inline text-white/90">
              NDL Master Applicator
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={`tel:${business.emergencyPhone.replace(/\D/g, '')}`}
              onClick={handlePhoneClick}
              className="flex items-center gap-1.5 text-white hover:text-[#E8DEF8] font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#EADDFF]" />
              <span>EMERGENCY: {business.emergencyPhone}</span>
            </a>
            <span className="text-white/40">|</span>
            <button
              onClick={() => onNavigate('/admin')}
              className="flex items-center gap-1 text-white/80 hover:text-white transition-colors cursor-pointer font-medium"
              title="Operations & Dispatch Portal"
            >
              <Lock className="w-3 h-3 text-[#EADDFF]" />
              <span className="hidden sm:inline">Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Material You App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Lockup */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#6750A4] p-2 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#1C1B1F]">
                Iron<span className="text-[#6750A4]">Clad</span>
              </span>
              <span className="text-[10px] bg-[#E8DEF8] text-[#1D192B] font-bold px-2 py-0.5 rounded-full">
                ROOFING
              </span>
            </div>
            <div className="text-[11px] tracking-wide text-[#49454F] font-medium">
              Commercial & Industrial Systems
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links (Pill Chips) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F3EDF7] p-1 rounded-full border border-[#E7E0EC]">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#E8DEF8] text-[#1D192B] shadow-sm'
                    : 'text-[#49454F] hover:text-[#1C1B1F] hover:bg-[#6750A4]/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Pill Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <TactileButton
            variant="secondary"
            onClick={() => handleNavClick('/schedule-inspection')}
            className="!py-2 !px-4 text-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#6750A4]" />
            <span>Inspection</span>
          </TactileButton>

          <TactileButton
            variant="primary"
            onClick={() => handleNavClick('/request-a-quote')}
            className="!py-2 !px-5 text-xs"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Get Quote</span>
          </TactileButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => handleNavClick('/request-a-quote')}
            className="sm:hidden px-4 py-2 bg-[#6750A4] text-white text-xs font-bold rounded-full shadow-sm active:scale-95"
          >
            Quote
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-[#F3EDF7] flex items-center justify-center text-[#1C1B1F] hover:bg-[#E8DEF8] active:scale-95 transition-all"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Surface Container) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F3EDF7] border-t border-[#E7E0EC] p-6 shadow-md animate-fadeIn">
          <div className="flex flex-col gap-2 mb-6">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-left px-5 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#E8DEF8] text-[#1D192B] shadow-sm'
                      : 'bg-white/50 text-[#1C1B1F] hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E7E0EC] flex flex-col gap-3">
            <TactileButton
              variant="primary"
              fullWidth
              onClick={() => handleNavClick('/request-a-quote')}
            >
              <Calculator className="w-4 h-4" />
              <span>Request Detailed Estimate</span>
            </TactileButton>

            <TactileButton
              variant="secondary"
              fullWidth
              onClick={() => handleNavClick('/schedule-inspection')}
            >
              <Calendar className="w-4 h-4 text-[#6750A4]" />
              <span>Schedule Roof Inspection</span>
            </TactileButton>

            <a
              href={`tel:${business.primaryPhone.replace(/\D/g, '')}`}
              onClick={handlePhoneClick}
              className="py-3 px-5 rounded-full bg-[#1C1B1F] text-white flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide hover:bg-[#6750A4] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C8E6C9]" />
              <span>Call Dispatch: {business.primaryPhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
