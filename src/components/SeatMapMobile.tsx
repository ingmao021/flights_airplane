import React from 'react';
import { SectionInfo, Seat } from '../types/seat';
import { SeatIcon } from './SeatIcon';

interface SeatMapMobileProps {
  activeSection: SectionInfo;
  seats: Record<string, Seat>;
  selectedSeats: Seat[];
  onToggleSeat: (seat: Seat) => void;
  isMaxWarningActive: boolean;
}

export const SeatMapMobile: React.FC<SeatMapMobileProps> = ({
  activeSection,
  seats,
  selectedSeats,
  onToggleSeat,
  isMaxWarningActive,
}) => {
  const leftCols = ['A', 'B', 'C'];
  const rightCols = ['D', 'E', 'F'];

  return (
    <div className="w-full px-4 pt-2 pb-44 flex flex-col items-center">
      {/* Section Info Card */}
      <div
        className={`w-full bg-white/95 rounded-3xl p-5 border border-gray-200/70 shadow-2xs transition-all duration-300 ${
          isMaxWarningActive ? 'animate-shake ring-2 ring-red-400' : ''
        }`}
      >
        {/* Section Title & Price Info */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
            {activeSection.name}
          </h2>
          <span className="text-xs font-semibold text-gray-400">
            {activeSection.freeSeatsCount} libres &nbsp;·&nbsp; ${activeSection.price} / asiento
          </span>
        </div>

        {/* Column Labels Header */}
        <div className="grid grid-cols-[repeat(3,1fr)_40px_repeat(3,1fr)] gap-2 mb-3 text-center text-xs font-bold text-gray-400">
          {leftCols.map((col) => (
            <span key={col}>{col}</span>
          ))}
          <span className="text-[10px] text-gray-300 font-normal">FILA</span>
          {rightCols.map((col) => (
            <span key={col}>{col}</span>
          ))}
        </div>

        {/* Seat Rows */}
        <div className="flex flex-col gap-3 select-none">
          {activeSection.rows.map((row) => (
            <div
              key={row}
              className="grid grid-cols-[repeat(3,1fr)_40px_repeat(3,1fr)] gap-2 items-center"
            >
              {/* Left 3 seats (A, B, C) */}
              {leftCols.map((col) => {
                const seatId = `${row}${col}`;
                const seat = seats[seatId];
                if (!seat) return <div key={seatId} className="w-9 h-10" />;
                const isSelected = selectedSeats.some((s) => s.id === seatId);

                return (
                  <div key={seatId} className="flex justify-center min-h-[44px] items-center">
                    <SeatIcon
                      seat={seat}
                      isSelected={isSelected}
                      isOccupied={seat.status === 'occupied'}
                      onClick={onToggleSeat}
                      size="md"
                    />
                  </div>
                );
              })}

              {/* Central Row Number */}
              <div className="flex items-center justify-center text-xs font-extrabold text-gray-400">
                {row}
              </div>

              {/* Right 3 seats (D, E, F) */}
              {rightCols.map((col) => {
                const seatId = `${row}${col}`;
                const seat = seats[seatId];
                if (!seat) return <div key={seatId} className="w-9 h-10" />;
                const isSelected = selectedSeats.some((s) => s.id === seatId);

                return (
                  <div key={seatId} className="flex justify-center min-h-[44px] items-center">
                    <SeatIcon
                      seat={seat}
                      isSelected={isSelected}
                      isOccupied={seat.status === 'occupied'}
                      onClick={onToggleSeat}
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
  );
};
