import React, { useState } from 'react';
import { X, Sparkles, Compass, Wifi, Coffee, Tv, ShieldCheck } from 'lucide-react';
import { SectionInfo } from '../types/seat';

interface ThreeDViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: SectionInfo;
}

export const ThreeDViewerModal: React.FC<ThreeDViewerModalProps> = ({
  isOpen,
  onClose,
  activeSection,
}) => {
  const [viewAngle, setViewAngle] = useState<'front' | 'cockpit' | 'window'>('front');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-2xl bg-[#141518] text-white rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl overflow-hidden flex flex-col gap-6">
        
        {/* Background ambient lighting */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#D4FF3A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4FF3A] text-gray-950 flex items-center justify-center shadow-lg shadow-[#D4FF3A]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Visualización 3D Cabina</h2>
              <p className="text-xs text-gray-400 font-medium">A320NEO · {activeSection.className}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors active:scale-95 cursor-pointer"
            aria-label="Cerrar modal 3D"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Perspective Virtual Cabin Viewport */}
        <div className="relative w-full h-64 md:h-80 rounded-2xl bg-gradient-to-b from-[#1E2026] to-[#0D0E11] border border-white/10 overflow-hidden flex flex-col items-center justify-center select-none shadow-inner">
          
          {/* Ceiling LED mood lighting */}
          <div className="absolute top-0 inset-x-8 h-1.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_20px_#6366F1]" />

          {/* Perspective Plane Corridor Grid */}
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
            style={{
              perspective: '800px',
            }}
          >
            <div
              className="relative w-72 h-44 border border-indigo-500/30 rounded-xl flex flex-col items-center justify-between p-4 bg-gradient-to-b from-indigo-950/40 to-black/60 shadow-2xl transition-all duration-500"
              style={{
                transform:
                  viewAngle === 'front'
                    ? 'rotateX(20deg)'
                    : viewAngle === 'cockpit'
                    ? 'rotateX(30deg) translateY(10px)'
                    : 'rotateY(-25deg) rotateX(15deg)',
              }}
            >
              {/* Virtual Seat rows simulation */}
              <div className="flex justify-between w-full text-center">
                <div className="space-y-2">
                  <div className="w-14 h-9 bg-indigo-600 rounded-lg shadow-md flex items-center justify-center text-xs font-bold text-white">
                    A
                  </div>
                  <div className="w-14 h-9 bg-slate-700 rounded-lg shadow-md flex items-center justify-center text-xs font-bold text-gray-300">
                    B
                  </div>
                </div>

                {/* Central Aisle */}
                <div className="w-10 border-x border-dashed border-indigo-400/40 flex flex-col justify-center items-center">
                  <span className="text-[10px] tracking-widest text-indigo-300 font-mono">PASILLO</span>
                </div>

                <div className="space-y-2">
                  <div className="w-14 h-9 bg-slate-700 rounded-lg shadow-md flex items-center justify-center text-xs font-bold text-gray-300">
                    E
                  </div>
                  <div className="w-14 h-9 bg-indigo-600 rounded-lg shadow-md flex items-center justify-center text-xs font-bold text-white">
                    F
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-gray-400 font-medium">
                {activeSection.name} · Asiento reclinable 120°
              </div>
            </div>
          </div>

          {/* Perspective controls */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span className="text-gray-300 text-[11px]">Ángulo de cámara:</span>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setViewAngle('front')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  viewAngle === 'front' ? 'bg-[#D4FF3A] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                Frontal
              </button>
              <button
                onClick={() => setViewAngle('window')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  viewAngle === 'window' ? 'bg-[#D4FF3A] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                Ventana
              </button>
              <button
                onClick={() => setViewAngle('cockpit')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  viewAngle === 'cockpit' ? 'bg-[#D4FF3A] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                Panorámico
              </button>
            </div>
          </div>
        </div>

        {/* Section Amenities list */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
            <Wifi className="w-4 h-4 text-[#D4FF3A]" />
            <span className="text-xs text-gray-200">WiFi de alta velocidad</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
            <Tv className="w-4 h-4 text-[#D4FF3A]" />
            <span className="text-xs text-gray-200">Pantalla 4K 13"</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
            <Coffee className="w-4 h-4 text-[#D4FF3A]" />
            <span className="text-xs text-gray-200">Bebidas premium</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#D4FF3A]" />
            <span className="text-xs text-gray-200">Embarque prioritario</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#D4FF3A] text-black font-bold text-xs hover:bg-[#c2ed2e] transition-colors shadow-lg shadow-[#D4FF3A]/20 cursor-pointer"
          >
            Regresar a Selección
          </button>
        </div>

      </div>
    </div>
  );
};
