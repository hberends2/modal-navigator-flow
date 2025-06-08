
import { getAvailableRooms } from '../../utils/calculationUtils';

export const getHistoricalOccupiedRooms = (year: number, getAvailableRoomsFunc: (year: number) => number, occupancyPercent: number): number => {
  const availableRooms = getAvailableRoomsFunc(year);
  const occupancyDecimal = occupancyPercent / 100;
  return Math.round(availableRooms * occupancyDecimal);
};

export const getForecastOccupiedRooms = (year: number, getAvailableRoomsFunc: (year: number) => number, occupancyValue: string): number => {
  const availableRooms = getAvailableRoomsFunc(year);
  const occupancyDecimal = parseFloat(occupancyValue) / 100;
  return Math.round(availableRooms * occupancyDecimal);
};

export const getHistoricalADR = (year: number, roomsRevenue: number, occupiedRooms: number): number => {
  return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
};

export const getForecastADR = (roomsRevenue: number, occupiedRooms: number): number => {
  return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
};
