
import { getHistoricalOccupiedRooms, getForecastOccupiedRooms, getHistoricalADR, getForecastADR } from "./revenueCalculations";

export interface CalculationHelpers {
  getHistoricalOccupiedRoomsForYear: (year: number) => number;
  getForecastOccupiedRoomsForYear: (year: number) => number;
  getHistoricalADRForYear: (year: number) => number;
  getForecastADRForYear: (year: number) => number;
  calculateForecastOtherOperatedRevenue: (year: number, perRoomData: Record<number, string>) => number;
  calculateTotalOtherOperatedRevenue: (year: number, isHistorical: boolean) => number;
  calculateTotalRevenue: (year: number, isHistorical: boolean) => number;
}

export const createCalculationHelpers = (
  getAvailableRooms: (year: number) => number,
  historicalData: any,
  occupancyForecast: Record<number, string>,
  occupancyForecastMethod: string,
  calculateOccupancyFromYoY: (year: number) => number,
  getForecastRoomsRevenue: (year: number) => number,
  fbPerOccupiedRoom: Record<number, string>,
  otherOperatedPerOccupiedRoom: Record<number, string>,
  miscellaneousPerOccupiedRoom: Record<number, string>,
  allocatedPerOccupiedRoom: Record<number, string>
): CalculationHelpers => {
  
  const getHistoricalOccupiedRoomsForYear = (year: number) => {
    try {
      if (!getAvailableRooms || !historicalData?.occupancy) return 0;
      const result = getHistoricalOccupiedRooms(year, getAvailableRooms, historicalData.occupancy[year] || 0);
      console.log('Historical occupied rooms for', year, ':', result);
      return result;
    } catch (error) {
      console.error('Error calculating historical occupied rooms:', error);
      return 0;
    }
  };

  const getForecastOccupiedRoomsForYear = (year: number) => {
    try {
      if (!getAvailableRooms || !occupancyForecast || !calculateOccupancyFromYoY) return 0;
      const occupancyValue = occupancyForecastMethod === "Occupancy" 
        ? occupancyForecast[year] || "0"
        : calculateOccupancyFromYoY(year).toString();
      const result = getForecastOccupiedRooms(year, getAvailableRooms, occupancyValue);
      console.log('Forecast occupied rooms for', year, ':', result);
      return result;
    } catch (error) {
      console.error('Error calculating forecast occupied rooms:', error);
      return 0;
    }
  };

  const getHistoricalADRForYear = (year: number) => {
    try {
      if (!historicalData?.roomsRevenue) return 0;
      const roomsRevenue = historicalData.roomsRevenue[year] || 0;
      const occupiedRooms = getHistoricalOccupiedRoomsForYear(year);
      const result = getHistoricalADR(year, roomsRevenue, occupiedRooms);
      console.log('Historical ADR for', year, ':', result);
      return result;
    } catch (error) {
      console.error('Error calculating historical ADR:', error);
      return 0;
    }
  };

  const getForecastADRForYear = (year: number) => {
    try {
      if (!getForecastRoomsRevenue) return 0;
      const roomsRevenue = getForecastRoomsRevenue(year);
      const occupiedRooms = getForecastOccupiedRoomsForYear(year);
      const result = getForecastADR(roomsRevenue, occupiedRooms);
      console.log('Forecast ADR for', year, ':', result);
      return result;
    } catch (error) {
      console.error('Error calculating forecast ADR:', error);
      return 0;
    }
  };

  const calculateForecastOtherOperatedRevenue = (year: number, perRoomData: Record<number, string>) => {
    try {
      if (!perRoomData) return 0;
      const perRoom = parseFloat(perRoomData[year] || "0");
      const occupiedRooms = getForecastOccupiedRoomsForYear(year);
      return perRoom * occupiedRooms;
    } catch (error) {
      console.error('Error calculating forecast other operated revenue:', error);
      return 0;
    }
  };

  const calculateTotalOtherOperatedRevenue = (year: number, isHistorical: boolean) => {
    try {
      if (isHistorical) {
        if (!historicalData) return 0;
        const fbRevenue = historicalData.fbRevenue?.[year] || 0;
        const otherOperatedRevenue = historicalData.otherOperatedRevenue?.[year] || 0;
        const miscellaneousRevenue = historicalData.miscellaneousRevenue?.[year] || 0;
        const allocatedRevenue = historicalData.allocatedRevenue?.[year] || 0;
        return fbRevenue + otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
      } else {
        const fbRevenue = calculateForecastOtherOperatedRevenue(year, fbPerOccupiedRoom);
        const otherOperatedRevenue = calculateForecastOtherOperatedRevenue(year, otherOperatedPerOccupiedRoom);
        const miscellaneousRevenue = calculateForecastOtherOperatedRevenue(year, miscellaneousPerOccupiedRoom);
        const allocatedRevenue = calculateForecastOtherOperatedRevenue(year, allocatedPerOccupiedRoom);
        return fbRevenue + otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
      }
    } catch (error) {
      console.error('Error calculating total other operated revenue:', error);
      return 0;
    }
  };

  const calculateTotalRevenue = (year: number, isHistorical: boolean) => {
    try {
      const roomsRevenue = isHistorical ? 
        (historicalData?.roomsRevenue?.[year] || 0) : 
        (getForecastRoomsRevenue ? getForecastRoomsRevenue(year) : 0);
      const totalOtherOperatedRevenue = calculateTotalOtherOperatedRevenue(year, isHistorical);
      return roomsRevenue + totalOtherOperatedRevenue;
    } catch (error) {
      console.error('Error calculating total revenue:', error);
      return 0;
    }
  };

  return {
    getHistoricalOccupiedRoomsForYear,
    getForecastOccupiedRoomsForYear,
    getHistoricalADRForYear,
    getForecastADRForYear,
    calculateForecastOtherOperatedRevenue,
    calculateTotalOtherOperatedRevenue,
    calculateTotalRevenue
  };
};
