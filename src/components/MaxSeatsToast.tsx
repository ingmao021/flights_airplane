import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MaxSeatsToastProps {
  isVisible: boolean;
  message: string;
}

export const MaxSeatsToast: React.FC<MaxSeatsToastProps> = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-gray-950 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-[#D4FF3A]" />
        <span>{message}</span>
      </div>
    </div>
  );
};
