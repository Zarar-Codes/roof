import React from 'react';

/**
 * Material You (Material Design 3) Component Primitives
 * Seed: Purple/Violet (#6750A4)
 * Surface: #FFFBFE | Surface Container: #F3EDF7 | Secondary Container: #E8DEF8
 */

export interface ScrewHeadProps {
  rotation?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Decorative Material 3 micro-accent point
 */
export function ScrewHead({ size = 'sm', className = '' }: ScrewHeadProps) {
  const sizeMap = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5'
  };

  return (
    <div
      className={`rounded-full shrink-0 bg-[#6750A4]/20 border border-[#6750A4]/30 ${sizeMap[size]} ${className}`}
      aria-hidden="true"
    />
  );
}

export function VentSlots({ count = 3, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-1 rounded-full bg-[#E8DEF8]" />
      ))}
    </div>
  );
}

/**
 * Material 3 Status Pill Indicator
 */
export function StatusLed({
  status = 'green',
  label,
  pulse = true,
  className = ''
}: {
  status?: 'green' | 'amber' | 'red';
  label?: string;
  pulse?: boolean;
  className?: string;
}) {
  const styles = {
    green: {
      bg: 'bg-[#2E7D32]',
      container: 'bg-[#C8E6C9] text-[#1B5E20]'
    },
    amber: {
      bg: 'bg-[#E65100]',
      container: 'bg-[#FFE0B2] text-[#E65100]'
    },
    red: {
      bg: 'bg-[#BA1A1A]',
      container: 'bg-[#FFDAD6] text-[#410002]'
    }
  };

  const current = styles[status] || styles.green;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-sans ${current.container} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.bg} opacity-75`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${current.bg}`} />
      </span>
      {label && <span className="tracking-wide uppercase text-[11px]">{label}</span>}
    </div>
  );
}

/**
 * Material 3 Surface Container Low (Recessed container)
 */
export function RecessedWell({
  children,
  className = '',
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`rounded-2xl bg-[#E7E0EC] p-5 text-[#1C1B1F] transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Material 3 Surface Container Card
 * Elevation 1 (shadow-sm) transitioning to Elevation 2 (shadow-md) on hover
 * Rounded-3xl (24px) with subtle hover scale
 */
export function MechanicalCard({
  children,
  className = '',
  bolted = false,
  elevated = false,
  tag,
  id
}: {
  children: React.ReactNode;
  className?: string;
  bolted?: boolean;
  elevated?: boolean;
  tag?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`relative rounded-3xl p-6 md:p-7 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-[1.015] ${
        elevated
          ? 'bg-[#F3EDF7] shadow-md hover:shadow-lg'
          : 'bg-[#F3EDF7] shadow-sm hover:shadow-md'
      } ${className}`}
    >
      {tag && (
        <div className="absolute -top-3 right-6 bg-[#6750A4] text-white text-[11px] font-bold font-sans uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
          {tag}
        </div>
      )}

      {children}
    </div>
  );
}

/**
 * Material You Pill Buttons
 * ALL buttons must be rounded-full with state layers and active:scale-95
 */
export function TactileButton({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  className = '',
  id,
  title
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outlined';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  className?: string;
  id?: string;
  title?: string;
}) {
  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#6750A4] text-white hover:bg-[#6750A4]/90 active:bg-[#6750A4]/80 shadow-sm hover:shadow-md';
      case 'secondary':
        return 'bg-[#E8DEF8] text-[#1D192B] hover:bg-[#E8DEF8]/85 active:bg-[#E8DEF8]/70 hover:shadow-sm';
      case 'outlined':
        return 'bg-transparent text-[#6750A4] border border-[#79747E] hover:bg-[#6750A4]/10 active:bg-[#6750A4]/15';
      case 'danger':
        return 'bg-[#BA1A1A] text-white hover:bg-[#BA1A1A]/90 active:bg-[#BA1A1A]/80 shadow-sm hover:shadow-md';
      case 'ghost':
        return 'bg-transparent text-[#6750A4] hover:bg-[#6750A4]/10 active:bg-[#6750A4]/15';
    }
  };

  return (
    <button
      id={id}
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold font-sans text-sm tracking-wide transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6750A4] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${
        fullWidth ? 'w-full' : ''
      } ${getStyles()} ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Material 3 Pill Chip / Badge
 */
export function IndustrialBadge({
  children,
  color = 'neutral',
  className = ''
}: {
  children: React.ReactNode;
  color?: 'neutral' | 'accent' | 'success';
  className?: string;
}) {
  const colorMap = {
    neutral: 'bg-[#E8DEF8] text-[#1D192B]',
    accent: 'bg-[#6750A4]/15 text-[#6750A4]',
    success: 'bg-[#C8E6C9] text-[#1B5E20]'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-sans tracking-wide uppercase ${colorMap[color]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Material 3 Floating Action Button (FAB)
 */
export function MaterialFAB({
  children,
  onClick,
  title,
  className = ''
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`h-14 px-5 rounded-2xl bg-[#7D5260] text-white font-bold font-sans shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] inline-flex items-center justify-center gap-2.5 z-40 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Organic layered atmospheric background shapes
 * Signature Material You technique: multiple blur shapes layered with radial gradients
 */
export function AtmosphericBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {/* Primary Purple Blob */}
      <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#6750A4]/15 blur-3xl" />
      {/* Secondary Lavender Blob */}
      <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#E8DEF8]/50 blur-3xl" />
      {/* Tertiary Mauve Blob */}
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-[#7D5260]/12 blur-3xl" />
      {/* Subtle radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(232,222,248,0.4)_0%,_transparent_50%)]" />
    </div>
  );
}
