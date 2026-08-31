import React from 'react';
import { Seat } from '../types/seat';

interface BottomSummaryBarProps {
  selectedSeats: Seat[];
  onRemoveSeat: (seatId: string) => void;
  maxSeats: number;
}

export const BottomSummaryBar: React.FC<BottomSummaryBarProps> = ({
  selectedSeats,
  onRemoveSeat,
  maxSeats,
}) => {
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#111215] text-white rounded-t-[32px] p-5 pb-7 shadow-2xl border-t border-white/10 select-none">
      <div className="max-w-md mx-auto flex flex-col gap-3.5">
        
        {/* Top Drag Handle Indicator */}
        <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto" />

        {/* Selected Seat Chips Row & Counter */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto py-1">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {selectedSeats.length === 0 ? (
              <span className="text-xs text-gray-400 font-medium py-1">
                Selecciona hasta {maxSeats} asientos
              </span>
            ) : (
              selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="bg-[#22242B] border border-gray-700/60 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs shrink-0"
                >
                  <span>{seat.id}</span>
                  <button
                    onClick={() => onRemoveSeat(seat.id)}
                    className="w-3.5 h-3.5 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-[10px] text-white transition-colors cursor-pointer"
                    aria-label={`Eliminar asiento ${seat.id}`}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="text-[11px] font-semibold text-gray-400 shrink-0">
            {selectedSeats.length}/{maxSeats}
          </div>
        </div>

        {/* Total & Confirm Button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              TOTAL
            </span>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              ${totalPrice.toLocaleString('en-US')}
            </span>
          </div>

          <button
            type="button"
            disabled={selectedSeats.length === 0}
            className={`px-7 py-3 rounded-full text-xs font-bold tracking-tight transition-all duration-200 ${
              selectedSeats.length > 0
                ? 'bg-[#D4FF3A] hover:bg-[#c2ed2e] text-gray-950 shadow-lg shadow-[#D4FF3A]/30 active:scale-95 cursor-pointer'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-60'
            }`}
          >
            Confirmar ({selectedSeats.length})
          </button>
        </div>

      </div>
    </div>
  );
};
