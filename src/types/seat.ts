export type SeatStatus = 'available' | 'occupied' | 'selected';

export type SeatClass = 'first' | 'business' | 'economy';

export interface Seat {
  id: string; // e.g. "1A", "9B"
  row: number;
  col: string;
  sectionId: number;
  status: SeatStatus;
  price: number;
  classType: SeatClass;
}

export interface SectionInfo {
  id: number;
  name: string;
  className: string;
  price: number;
  tag: string;
  description: string;
  freeSeatsCount: number;
  rows: number[];
  columns: string[];
  airplanePosition: {
    mobileLeftPercent: number;
    mobileWidthPercent: number;
    desktopLeftPercent: number;
    desktopWidthPercent: number;
  };
}

export interface FlightInfo {
  origin: string;
  destination: string;
  aircraft: string;
  date: string;
  status: string;
  passengerInitials: string;
}
