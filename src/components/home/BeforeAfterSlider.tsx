import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, MoveHorizontal, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Project } from '../../types';

interface BeforeAfterSliderProps {
  projects: Project[];
}

export function BeforeAfterSlider({ projects }: BeforeAfterSliderProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProject = projects[activeProjectIndex] || projects[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos(prev => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="w-full rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E7E0EC]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEF8] text-[#1D192B] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
            <span>Before & After Restoration Comparison</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1F] tracking-tight">
            {currentProject.title}
          </h3>
          <p className="text-sm text-[#49454F] mt-1 font-medium">
            {currentProject.location} • {currentProject.sqFt.toLocaleString()} SQ FT • {currentProject.material}
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#E7E0EC] rounded-full overflow-x-auto">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setActiveProjectIndex(idx);
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-95 ${
                activeProjectIndex === idx
                  ? 'bg-[#6750A4] text-white shadow-sm'
                  : 'text-[#49454F] hover:text-[#1C1B1F] hover:bg-white/50'
              }`}
            >
              Project 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Dual-Image Container */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        className="relative w-full h-[340px] sm:h-[460px] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-[#CAC4D0] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6750A4]"
        aria-label="Before and after roof comparison slider. Use left and right arrow keys to adjust split."
      >
        {/* Underneath: AFTER image (full width) */}
        <img
          src={currentProject.afterImage}
          alt={`After: ${currentProject.title} completed roof restoration`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
        />

        {/* On Top: BEFORE image clipped to sliderPos */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={currentProject.beforeImage}
            alt={`Before: ${currentProject.title} prior to roof replacement`}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            loading="lazy"
          />
        </div>

        {/* Slider Divider Line & Pill Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#6750A4] border-2 border-white shadow-lg flex items-center justify-center text-white">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Material 3 Tonal Badges */}
        <div className="absolute top-4 left-4 pointer-events-none bg-[#1C1B1F]/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
          Prior Condition: Aged & Failing
        </div>

        <div className="absolute top-4 right-4 pointer-events-none bg-[#2E7D32]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>Restored: NDL Certified</span>
        </div>

        {/* Drag Helper Tip on Bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-[#1C1B1F]/70 px-4 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md hidden sm:block">
          Drag or use arrow keys to reveal specification
        </div>
      </div>

      {/* Engineering Highlights Bar Below Slider */}
      <div className="mt-6 pt-6 border-t border-[#E7E0EC] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#1C1B1F]">
        {currentProject.technicalHighlights.map((highlight, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-[#E7E0EC] p-3 rounded-2xl">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6750A4] shrink-0" />
            <span className="font-bold">{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
