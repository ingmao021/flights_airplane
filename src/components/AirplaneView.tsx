import React, { useEffect, useState } from 'react';
import { SectionInfo } from '../types/seat';

interface AirplaneViewProps {
  sections: SectionInfo[];
  activeSectionId: number;
  onSelectSection: (sectionId: number) => void;
  onOpen3DModal?: () => void;
}

export const AirplaneView: React.FC<AirplaneViewProps> = ({
  sections,
  activeSectionId,
  onSelectSection,
  onOpen3DModal,
}) => {
  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const highlightStyle = isMobile
    ? {
        left: `${activeSection.airplanePosition.mobileLeftPercent}%`,
        width: `${activeSection.airplanePosition.mobileWidthPercent}%`,
      }
    : {
        left: `${activeSection.airplanePosition.desktopLeftPercent}%`,
        width: `${activeSection.airplanePosition.desktopWidthPercent}%`,
      };

  return (
    <div className="relative w-full px-3 md:px-8 py-2 md:py-4">
      {/* Background card */}
      <div className="relative w-full bg-[#F5F6F8]/70 md:bg-white rounded-3xl md:rounded-[28px] border border-gray-200/70 p-2 md:p-8 shadow-xs overflow-hidden">
        
        {/* Dotted Grid Background - ONLY for Desktop / Web Mode */}
        <div className="hidden md:block absolute inset-0 bg-grid-dots-desktop pointer-events-none z-0" />

        {/* Looping Bright White Vertical Line with Glow & Shadow Effect */}
        <div className="absolute top-0 bottom-0 animate-vertical-beam pointer-events-none z-10">
          <div className="h-full vertical-glowing-line" />
        </div>

        {/* Floating control buttons (desktop left side) */}
        <div className="hidden lg:flex flex-col gap-2.5 absolute left-5 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => onSelectSection(activeSectionId === 3 ? 1 : activeSectionId + 1)}
            title="Cambiar sección"
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-xs hover:shadow-md flex items-center justify-center text-gray-700 hover:text-black transition-all active:scale-95 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
              <path
                d="M12 3.3L18.7 12L12 20.7L5.3 12L12 3.3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={onOpen3DModal}
            title="Ver cabina 3D"
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-xs hover:shadow-md flex items-center justify-center text-gray-700 hover:text-black transition-all active:scale-95 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path d="M12 2.5A9.5 9.5 0 0 1 21.5 12H2.5A9.5 9.5 0 0 1 12 2.5Z" fill="black" />
              <path d="M12 21.5A9.5 9.5 0 0 1 2.5 12H21.5A9.5 9.5 0 0 1 12 21.5Z" fill="white" />
            </svg>
          </button>
        </div>

        {/* Airplane Container */}
        <div className="relative max-w-4xl mx-auto py-5 md:py-9 flex items-center justify-center select-none z-10">
          
          {/* Main Airplane Canvas */}
          <div className="relative w-full max-w-[840px] h-16 md:h-28 flex items-center">
            
            {/* SVG Wings & Tail Background Layer */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 840 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="wingGradTop" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#E2E5EA" />
                  <stop offset="100%" stopColor="#ECEEF2" />
                </linearGradient>
                <linearGradient id="wingGradBottom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D5D9E0" />
                  <stop offset="100%" stopColor="#ECEEF2" />
                </linearGradient>
              </defs>

              {/* Main Top Wing */}
              <polygon
                points="420,60 560,0 500,0 360,60"
                fill="url(#wingGradTop)"
                className="opacity-90"
              />

              {/* Main Bottom Wing */}
              <polygon
                points="420,60 560,120 500,120 360,60"
                fill="url(#wingGradBottom)"
                className="opacity-90"
              />

              {/* Tail Upper Stabilizer */}
              <polygon
                points="680,60 760,15 725,15 650,60"
                fill="url(#wingGradTop)"
                className="opacity-80"
              />

              {/* Tail Lower Stabilizer */}
              <polygon
                points="680,60 760,105 725,105 650,60"
                fill="url(#wingGradBottom)"
                className="opacity-80"
              />
            </svg>

            {/* Fuselage (Body) */}
            <div className="relative w-full h-11 md:h-14 rounded-full bg-gradient-to-b from-white via-[#F8F9FA] to-[#E2E5EA] shadow-[0_8px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] border border-gray-200/90 flex items-center overflow-hidden">
              
              {!isMobile && (
                <div className="absolute left-2 md:left-3 w-5 md:w-6 h-2 md:h-2.5 rounded-full bg-slate-400/80 shadow-inner z-10" />
              )}

              {/* Passenger Window Dots */}
              {isMobile ? (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between z-0 px-1">
                  {Array.from({ length: 15 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-slate-300/90 shadow-2xs shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full flex items-center justify-evenly px-10 md:px-14 z-0">
                  {Array.from({ length: 26 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-slate-300/90 shadow-2xs shrink-0"
                    />
                  ))}
                </div>
              )}

              {/* Clickable Section Zones */}
              <div className="absolute inset-0 flex z-20">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => onSelectSection(sec.id)}
                    className="flex-1 h-full cursor-pointer hover:bg-indigo-500/5 transition-colors focus:outline-none"
                    aria-label={`Seleccionar ${sec.className}`}
                  />
                ))}
              </div>
            </div>

            {/* Dynamic Highlight Box with Smooth Position Transition */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[calc(100%+2px)] md:h-[calc(100%+24px)] border-[3px] border-gray-900 bg-transparent rounded-[6px] md:rounded-xl pointer-events-none transition-all duration-500 ease-out z-30 shadow-[0_0_0_1px_rgba(17,24,39,0.05)]"
              style={highlightStyle}
            />

          </div>
        </div>
      </div>
    </div>
  );
};
