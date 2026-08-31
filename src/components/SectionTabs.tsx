import React from 'react';
import { SectionInfo } from '../types/seat';

interface SectionTabsProps {
  sections: SectionInfo[];
  activeSectionId: number;
  onSelectSection: (sectionId: number) => void;
}

export const SectionTabs: React.FC<SectionTabsProps> = ({
  sections,
  activeSectionId,
  onSelectSection,
}) => {
  return (
    <div className="w-full px-4 md:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Left: SECTIONS label + Pill Tabs */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
        <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-400 uppercase">
          SECTIONS
        </span>

        <div className="flex items-center bg-[#ECEEF2] p-1 rounded-full border border-gray-200/60 shadow-2xs">
          {sections.map((sec) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`min-w-14 md:min-w-16 py-1.5 px-4 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gray-950 text-white shadow-md scale-100'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {sec.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right (Desktop): Status Legend */}
      <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-gray-300/80 shadow-2xs" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-500 shadow-2xs" />
          <span>Ocupado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 shadow-2xs shadow-indigo-500/40" />
          <span>Tu selección</span>
        </div>
      </div>
    </div>
  );
};
