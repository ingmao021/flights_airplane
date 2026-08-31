import React from 'react';
import { Box, Layers } from 'lucide-react';
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

  return (
    <div className="relative w-full px-3 md:px-8 py-2 md:py-4">
      {/* Background card with subtle dot grid */}
      <div className="relative w-full bg-[#F5F6F8]/70 md:bg-white rounded-3xl md:rounded-[28px] border border-gray-200/70 p-4 md:p-8 shadow-xs overflow-hidden bg-grid-dots">
        
        {/* Floating control buttons (desktop left side) */}
        <div className="hidden lg:flex flex-col gap-2.5 absolute left-5 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => onSelectSection(activeSectionId === 3 ? 1 : activeSectionId + 1)}
            title="Cambiar sección"
            className="w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-xs hover:shadow-md flex items-center justify-center text-gray-700 hover:text-black transition-all active:scale-95 cursor-pointer"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={onOpen3DModal}
            title="Ver cabina 3D"
            className="w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-xs hover:shadow-md flex items-center justify-center text-gray-700 hover:text-black transition-all active:scale-95 cursor-pointer"
          >
            <Box className="w-4 h-4" />
          </button>
        </div>

        {/* Airplane Container */}
        <div className="relative max-w-4xl mx-auto py-5 md:py-9 flex items-center justify-center select-none">
          
          {/* Main Airplane Canvas */}
          <div className="relative w-full max-w-[840px] h-20 md:h-28 flex items-center">
            
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
              
              {/* Animated Light Sweep Reflection */}
              <div className="absolute inset-0 w-36 md:w-56 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none animate-light-sweep z-10" />

              {/* Cockpit Window (Left Nose) */}
              <div className="absolute left-2 md:left-3 w-5 md:w-6 h-2 md:h-2.5 rounded-full bg-slate-400/80 shadow-inner z-10" />

              {/* Passenger Window Dots */}
              <div className="w-full flex items-center justify-evenly px-10 md:px-14 z-0">
                {Array.from({ length: 26 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-1.5 h-1.5 rounded-full bg-slate-300/90 shadow-2xs shrink-0"
                  />
                ))}
              </div>

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
              className="absolute -top-3 md:-top-4 h-[calc(100%+24px)] md:h-[calc(100%+32px)] border-2 border-gray-900 bg-black/[0.03] backdrop-blur-[0.5px] rounded-2xl md:rounded-3xl pointer-events-none transition-all duration-500 ease-out z-30 shadow-xs flex flex-col items-center justify-start"
              style={{
                left: `${activeSection.airplanePosition.desktopLeftPercent}%`,
                width: `${activeSection.airplanePosition.desktopWidthPercent}%`,
              }}
            >
              {/* Badge on Top of Highlight Box */}
              <div className="-mt-3 px-3 py-0.5 bg-gray-950 text-white rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1">
                <span>{activeSection.tag}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
