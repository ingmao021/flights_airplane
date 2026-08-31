import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FlightInfo } from '../types/seat';

interface HeaderProps {
  flightInfo: FlightInfo;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ flightInfo, onBack }) => {
  return (
    <header className="w-full">
      {/* Mobile Header (< md) */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 bg-transparent">
        {/* Back Button */}
        <button
          onClick={onBack}
          aria-label="Volver"
          className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200/80 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Center Title & Route */}
        <div className="text-center">
          <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">
            Choose Seats
          </h1>
          <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mt-0.5">
            {flightInfo.origin} → {flightInfo.destination} &nbsp;·&nbsp; {flightInfo.date}
          </p>
        </div>

        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-[#E3C29E] text-stone-800 font-semibold text-xs flex items-center justify-center shadow-sm">
            {flightInfo.passengerInitials}
          </div>
        </div>
      </div>

      {/* Desktop Header (>= md) */}
      <div className="hidden md:flex items-center justify-between px-8 pt-6 pb-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
            Choose Seats
          </h1>
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mt-1">
            {flightInfo.origin} → {flightInfo.destination} &nbsp;·&nbsp; {flightInfo.aircraft} &nbsp;·&nbsp; {flightInfo.date}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Check-in abierto Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-white/90 shadow-xs text-xs font-semibold text-gray-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{flightInfo.status}</span>
          </div>

          {/* User Avatar */}
          <div className="relative cursor-pointer hover:opacity-95 transition-opacity">
            <div className="w-11 h-11 rounded-full bg-[#E5C4A1] text-stone-900 font-bold text-sm flex items-center justify-center shadow-sm">
              {flightInfo.passengerInitials}
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-gray-900 border-2 border-white rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
};
