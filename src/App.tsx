import React, { useState } from 'react';
import { FLIGHT_INFO, SECTIONS_DATA, generateInitialSeats } from './data/flightData';
import { Seat } from './types/seat';
import { Header } from './components/Header';
import { AirplaneView } from './components/AirplaneView';
import { SectionTabs } from './components/SectionTabs';
import { SeatMapDesktop } from './components/SeatMapDesktop';
import { SeatMapMobile } from './components/SeatMapMobile';
import { BottomSummaryBar } from './components/BottomSummaryBar';
import { ThreeDViewerModal } from './components/ThreeDViewerModal';
import { MaxSeatsToast } from './components/MaxSeatsToast';

export function App() {
  const [activeSectionId, setActiveSectionId] = useState<number>(1);
  const [seats] = useState<Record<string, Seat>>(() => generateInitialSeats());
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(['1A', '2A', '3A', '4A']);
  const [is3DModalOpen, setIs3DModalOpen] = useState<boolean>(false);
  const [showMaxToast, setShowMaxToast] = useState<boolean>(false);
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);

  const MAX_SEATS = 4;

  const activeSection =
    SECTIONS_DATA.find((s) => s.id === activeSectionId) || SECTIONS_DATA[0];

  // List of full selected seat objects
  const selectedSeats = selectedSeatIds
    .map((id) => seats[id])
    .filter(Boolean) as Seat[];

  // Handle seat selection/deselection
  const handleToggleSeat = (seat: Seat) => {
    if (seat.status === 'occupied') return;

    if (selectedSeatIds.includes(seat.id)) {
      // Deselect seat
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    } else {
      // Check max limit
      if (selectedSeatIds.length >= MAX_SEATS) {
        setShowMaxToast(true);
        setShakeTrigger(true);
        setTimeout(() => setShakeTrigger(false), 500);
        setTimeout(() => setShowMaxToast(false), 2500);
        return;
      }
      // Select seat
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    }
  };

  // Remove seat directly from chip
  const handleRemoveSeat = (seatId: string) => {
    setSelectedSeatIds((prev) => prev.filter((id) => id !== seatId));
  };

  // Switch section and if section changes, optionally adjust view
  const handleSelectSection = (sectionId: number) => {
    setActiveSectionId(sectionId);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-0 md:p-6 lg:p-10 font-sans">
      
      {/* Toast Alert for Max Selection */}
      <MaxSeatsToast
        isVisible={showMaxToast}
        message="Has alcanzado el límite máximo de 4 asientos"
      />

      {/* 3D Cabin Walkthrough Modal */}
      <ThreeDViewerModal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
        activeSection={activeSection}
      />

      {/* Main App Container */}
      <div className="w-full max-w-6xl bg-white md:bg-[#FAFAFC] rounded-none md:rounded-[36px] shadow-none md:shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:border md:border-gray-200/80 overflow-hidden flex flex-col min-h-screen md:min-h-0">
        
        {/* Header */}
        <Header flightInfo={FLIGHT_INFO} />

        {/* Airplane Interactive Silhouette Viewport */}
        <AirplaneView
          sections={SECTIONS_DATA}
          activeSectionId={activeSectionId}
          onSelectSection={handleSelectSection}
          onOpen3DModal={() => setIs3DModalOpen(true)}
        />

        {/* Section Tabs (1, 2, 3) + Status Legend */}
        <SectionTabs
          sections={SECTIONS_DATA}
          activeSectionId={activeSectionId}
          onSelectSection={handleSelectSection}
        />

        {/* Desktop View (>= md / lg) */}
        <div className="hidden md:block">
          <SeatMapDesktop
            activeSection={activeSection}
            seats={seats}
            selectedSeats={selectedSeats}
            onToggleSeat={handleToggleSeat}
            onRemoveSeat={handleRemoveSeat}
            onOpen3DModal={() => setIs3DModalOpen(true)}
            isMaxWarningActive={shakeTrigger}
          />
        </div>

        {/* Mobile View (< md) */}
        <div className="block md:hidden">
          <SeatMapMobile
            activeSection={activeSection}
            seats={seats}
            selectedSeats={selectedSeats}
            onToggleSeat={handleToggleSeat}
            isMaxWarningActive={shakeTrigger}
          />
          <BottomSummaryBar
            selectedSeats={selectedSeats}
            onRemoveSeat={handleRemoveSeat}
            maxSeats={MAX_SEATS}
          />
        </div>

      </div>
    </main>
  );
}

export default App;
