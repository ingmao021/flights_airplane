import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionInfo, Seat } from '../types/seat';
import { SeatIcon } from './SeatIcon';

interface SeatMapDesktopProps {
  activeSection: SectionInfo;
  seats: Record<string, Seat>;
  selectedSeats: Seat[];
  onToggleSeat: (seat: Seat) => void;
  onRemoveSeat: (seatId: string) => void;
  onOpen3DModal: () => void;
  isMaxWarningActive: boolean;
}

export const SeatMapDesktop: React.FC<SeatMapDesktopProps> = ({
  activeSection,
  seats,
  selectedSeats,
  onToggleSeat,
  onRemoveSeat,
  onOpen3DModal,
  isMaxWarningActive,
}) => {
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const topColumns = ['A', 'B', 'C'];
  const bottomColumns = ['D', 'E', 'F'];

  return (
    <div className="w-full px-8 py-4 grid grid-cols-12 gap-6 items-stretch">
      {/* Left Column: 3D Rendering Card (Cols 4) */}
      <div
        onClick={onOpen3DModal}
        className="col-span-12 lg:col-span-4 bg-[#111215] text-white rounded-[28px] p-7 flex flex-col justify-between shadow-xl relative overflow-hidden group cursor-pointer border border-white/5 hover:border-white/15 transition-all duration-300 min-h-[320px]"
      >
        {/* Glow effect on hover */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#D4FF3A]/15 rounded-full blur-2xl group-hover:bg-[#D4FF3A]/25 transition-all pointer-events-none" />

        {/* Card Top Row */}
        <div className="flex items-center justify-between z-10">
          {/* Neon lime grid icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#D4FF3A] flex items-center justify-center text-gray-950 shadow-md group-hover:scale-105 transition-transform">
            <div className="grid grid-cols-3 gap-1 p-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-950" />
              ))}
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-white/15 flex items-center justify-center text-gray-400 group-hover:text-white transition-all">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Card Bottom Text */}
        <div className="z-10 mt-16">
          <h3 className="text-xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-2">
            3D Rendering
          </h3>
          <p className="text-xs text-gray-400 font-medium leading-relaxed">
            Recorre la cabina de tu avión con visualización 3D y siente lo que te espera a bordo.
          </p>
        </div>
      </div>

      {/* Right Column: Seat Map Board (Cols 8) */}
      <div
        className={`col-span-12 lg:col-span-8 bg-white rounded-[28px] p-7 border border-gray-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
          isMaxWarningActive ? 'animate-shake ring-2 ring-red-400' : ''
        }`}
      >
        {/* Striped safety hatch graphics on left & right margins */}
        <div className="absolute left-0 top-12 bottom-12 w-6 striped-hazard-bg opacity-40 rounded-r-xl pointer-events-none" />
        <div className="absolute right-0 top-12 bottom-12 w-6 striped-hazard-bg opacity-40 rounded-l-xl pointer-events-none" />

        {/* Section Title & Available Seats Counter */}
        <div className="flex items-center justify-between px-4 pb-4">
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            {activeSection.name}
          </h2>
          <span className="text-xs font-semibold text-gray-400">
            {activeSection.freeSeatsCount} libres &nbsp;·&nbsp; ${activeSection.price} / asiento
          </span>
        </div>

        {/* Seat Grid Layout (Rows 1-8 horizontal, Cols A-F) */}
        <div className="px-6 py-2 overflow-x-auto select-none">
          <div className="min-w-[520px] flex flex-col gap-4">
            
            {/* Top row numbers header */}
            <div className="grid grid-cols-[32px_repeat(8,1fr)] gap-2.5 items-center text-center text-xs font-bold text-gray-400">
              <span />
              {activeSection.rows.slice(0, 8).map((row) => (
                <span key={row}>{row}</span>
              ))}
            </div>

            {/* Top Seat Block: Columns A, B, C */}
            <div className="flex flex-col gap-2">
              {topColumns.map((col) => (
                <div key={col} className="grid grid-cols-[32px_repeat(8,1fr)] gap-2.5 items-center">
                  <span className="text-xs font-bold text-gray-400 text-center">{col}</span>
                  {activeSection.rows.slice(0, 8).map((row) => {
                    const seatId = `${row}${col}`;
                    const seat = seats[seatId];
                    if (!seat) return <div key={seatId} className="w-8 h-9" />;
                    const isSelected = selectedSeats.some((s) => s.id === seatId);

                    return (
                      <div key={seatId} className="flex justify-center">
                        <SeatIcon
                          seat={seat}
                          isSelected={isSelected}
                          isOccupied={seat.status === 'occupied'}
                          onClick={onToggleSeat}
                          showSeatNumber={true}
                          displayLabel={isSelected ? String(row) : undefined}
                          size="md"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Central Aisle Divider */}
            <div className="h-5 flex items-center justify-center">
              <div className="w-full border-t border-dashed border-gray-200/80" />
            </div>

            {/* Bottom Seat Block: Columns D, E, F */}
            <div className="flex flex-col gap-2">
              {bottomColumns.map((col) => (
                <div key={col} className="grid grid-cols-[32px_repeat(8,1fr)] gap-2.5 items-center">
                  <span className="text-xs font-bold text-gray-400 text-center">{col}</span>
                  {activeSection.rows.slice(0, 8).map((row) => {
                    const seatId = `${row}${col}`;
                    const seat = seats[seatId];
                    if (!seat) return <div key={seatId} className="w-8 h-9" />;
                    const isSelected = selectedSeats.some((s) => s.id === seatId);

                    return (
                      <div key={seatId} className="flex justify-center">
                        <SeatIcon
                          seat={seat}
                          isSelected={isSelected}
                          isOccupied={seat.status === 'occupied'}
                          onClick={onToggleSeat}
                          showSeatNumber={true}
                          displayLabel={isSelected ? String(row) : undefined}
                          size="md"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Embedded Bottom Summary Bar */}
        <div className="mt-6 bg-[#FAFAFC] border border-gray-200/80 rounded-full p-2.5 px-5 flex items-center justify-between shadow-2xs">
          
          {/* Selected Seat Chips */}
          <div className="flex items-center gap-2 flex-wrap max-w-[50%]">
            {selectedSeats.length === 0 ? (
              <span className="text-xs text-gray-400 font-medium pl-2">
                Selecciona hasta 4 asientos
              </span>
            ) : (
              selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="bg-gray-950 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs group hover:bg-gray-800 transition-colors"
                >
                  <span>{seat.id}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSeat(seat.id);
                    }}
                    className="w-3.5 h-3.5 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-[10px] text-white transition-colors cursor-pointer"
                    aria-label={`Eliminar asiento ${seat.id}`}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Total and Confirm Button */}
          <div className="flex items-center gap-5">
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                TOTAL
              </span>
              <span className="text-lg font-extrabold text-gray-900">
                ${totalPrice.toLocaleString('en-US')}
              </span>
            </div>

            <button
              type="button"
              disabled={selectedSeats.length === 0}
              className={`px-7 py-3 rounded-full text-xs font-bold tracking-tight transition-all duration-200 ${
                selectedSeats.length > 0
                  ? 'bg-[#D4FF3A] hover:bg-[#c2ed2e] text-gray-950 shadow-md shadow-[#D4FF3A]/30 active:scale-95 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-70'
              }`}
            >
              Confirmar ({selectedSeats.length})
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
