import React from 'react';
import { Seat } from '../types/seat';

interface SeatIconProps {
  seat: Seat;
  isSelected: boolean;
  isOccupied: boolean;
  onClick: (seat: Seat) => void;
  showSeatNumber?: boolean;
  displayLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SeatIcon: React.FC<SeatIconProps> = ({
  seat,
  isSelected,
  isOccupied,
  onClick,
  showSeatNumber = false,
  displayLabel,
  size = 'md',
}) => {
  const handleClick = () => {
    if (isOccupied) return;
    onClick(seat);
  };

  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-7 h-8 text-[10px]';
      case 'lg':
        return 'w-11 h-12 text-sm';
      case 'md':
      default:
        return 'w-8 h-9 sm:w-9 sm:h-10 text-xs';
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isOccupied}
      aria-label={`Asiento ${seat.id}, ${seat.status}, $${seat.price}`}
      title={`${seat.id} - ${seat.status === 'occupied' ? 'Ocupado' : isSelected ? 'Seleccionado' : 'Disponible ($' + seat.price + ')'}`}
      className={`relative group flex flex-col items-center justify-center transition-all duration-200 select-none ${
        isOccupied
          ? 'cursor-not-allowed opacity-85'
          : 'cursor-pointer hover:scale-105 active:scale-95'
      }`}
    >
      <div
        className={`relative ${getDimensions()} rounded-t-xl rounded-b-lg flex flex-col items-center justify-between p-1 transition-all duration-300 ${
          isSelected
            ? 'bg-gradient-to-b from-[#5844FF] to-[#4330E8] text-white selected-seat-glow shadow-md'
            : isOccupied
            ? 'bg-[#7C8494] shadow-xs'
            : 'bg-[#DDE1E8] hover:bg-[#CFD5DE] shadow-xs'
        }`}
      >
        {/* Seat Headrest / Top area */}
        <div
          className={`w-full flex-1 rounded-t-lg flex items-center justify-center font-bold tracking-tight ${
            isSelected
              ? 'text-white'
              : isOccupied
              ? 'text-transparent'
              : 'text-transparent'
          }`}
        >
          {showSeatNumber && displayLabel ? displayLabel : isSelected ? seat.row : ''}
        </div>

        {/* Seat Bottom Cushion Bar */}
        <div
          className={`w-full h-1.5 sm:h-2 rounded-full mt-0.5 transition-colors ${
            isSelected
              ? 'bg-[#8274FF]/80'
              : isOccupied
              ? 'bg-[#5F6777]'
              : 'bg-[#BAC1CD]'
          }`}
        />
      </div>
    </button>
  );
};
