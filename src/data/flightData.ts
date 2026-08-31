import { SectionInfo, FlightInfo, Seat } from '../types/seat';

export const FLIGHT_INFO: FlightInfo = {
  origin: 'BOG',
  destination: 'MDE',
  aircraft: 'A320NEO',
  date: '12 SEP',
  status: 'Check-in abierto',
  passengerInitials: 'JR',
};

export const SECTIONS_DATA: SectionInfo[] = [
  {
    id: 1,
    name: 'Section 1 (First Class)',
    className: 'First Class',
    price: 480,
    tag: 'FIRST',
    description: 'Máximo confort y espacio privado en la cabina delantera',
    freeSeatsCount: 35,
    rows: [1, 2, 3, 4, 5, 6, 7, 8],
    columns: ['A', 'B', 'C', 'D', 'E', 'F'],
    airplanePosition: {
      mobileLeftPercent: 7,
      mobileWidthPercent: 30,
      desktopLeftPercent: 8,
      desktopWidthPercent: 24,
    },
  },
  {
    id: 2,
    name: 'Section 2 (Business Class)',
    className: 'Business Class',
    price: 240,
    tag: 'BUSINESS',
    description: 'Asientos reclinables y servicio premium en zona central',
    freeSeatsCount: 44,
    rows: [9, 10, 11, 12, 13, 14, 15, 16],
    columns: ['A', 'B', 'C', 'D', 'E', 'F'],
    airplanePosition: {
      mobileLeftPercent: 36,
      mobileWidthPercent: 30,
      desktopLeftPercent: 34,
      desktopWidthPercent: 26,
    },
  },
  {
    id: 3,
    name: 'Section 3 (Economy Class)',
    className: 'Economy Class',
    price: 140,
    tag: 'ECONOMY',
    description: 'Excelente relación valor y comodidad en zona posterior',
    freeSeatsCount: 44,
    rows: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    columns: ['A', 'B', 'C', 'D', 'E', 'F'],
    airplanePosition: {
      mobileLeftPercent: 65,
      mobileWidthPercent: 30,
      desktopLeftPercent: 62,
      desktopWidthPercent: 26,
    },
  },
];

export function generateInitialSeats(): Record<string, Seat> {
  const seats: Record<string, Seat> = {};

  const occupiedSet = new Set([
    // Section 1
    '1E', '1F', '2C', '3C', '4C', '5C', '6C', '7C', '8C',
    '2D', '4D', '6D', '7D', '3E', '5E', '7E', '8F', '5A', '7A', '8A',

    // Section 2
    '9E', '9F', '10C', '10D', '11A', '12E', '12F', '13B', '13C',
    '15D', '15E', '15F', '16A', '16B',

    // Section 3
    '17A', '17B', '18E', '18F', '19C', '19D', '20B', '21E', '22A', '23D', '24C', '25E', '26A', '27B', '28F'
  ]);

  const initialSelected = new Set(['1A', '2A', '3A', '4A']);

  SECTIONS_DATA.forEach((sec) => {
    sec.rows.forEach((row) => {
      sec.columns.forEach((col) => {
        const id = `${row}${col}`;
        const isOccupied = occupiedSet.has(id);
        const isSelected = !isOccupied && initialSelected.has(id);

        seats[id] = {
          id,
          row,
          col,
          sectionId: sec.id,
          status: isOccupied ? 'occupied' : isSelected ? 'selected' : 'available',
          price: sec.price,
          classType: sec.id === 1 ? 'first' : sec.id === 2 ? 'business' : 'economy',
        };
      });
    });
  });

  return seats;
}
