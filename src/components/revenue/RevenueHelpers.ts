
import { 
  getAvailableRooms, 
  calculateOccupancyFromYoY, 
  calculateForecastADR, 
  calculateRoomsRevenue, 
  calculateRevpar,
  calculateHistoricalADR
} from "../../utils/calculationUtils";

export const createRevenueHelpers = (
  revenueCalculations: any,
  historicalData: any
) => {
  const getAvailableRoomsForYear = (year: number) => getAvailableRooms(year);
  
  const calculateOccupancyFromYoYForYear = (year: number) => 
    calculateOccupancyFromYoY(year, revenueCalculations.occupancyYoYGrowth, historicalData.occupancy[2024] || 0);
  
  const getForecastADRForYear = (year: number) => {
    const baseADR = calculateHistoricalADR(
      historicalData.roomsRevenue[2024] || 0, 
      Math.round(getAvailableRooms(2024) * (historicalData.occupancy[2024] || 0) / 100)
    );
    return calculateForecastADR(
      year, 
      baseADR, 
      revenueCalculations.adrGrowthType, 
      revenueCalculations.flatAdrGrowth, 
      revenueCalculations.yearlyAdrGrowth
    );
  };
  
  const getForecastRoomsRevenueForYear = (year: number) => {
    const adr = getForecastADRForYear(year);
    const occupancyValue = revenueCalculations.occupancyForecastMethod === "Occupancy" 
      ? parseFloat(revenueCalculations.occupancyForecast[year] || "0")
      : calculateOccupancyFromYoYForYear(year);
    const occupiedRooms = Math.round(getAvailableRooms(year) * occupancyValue / 100);
    return calculateRoomsRevenue(adr, occupiedRooms);
  };
  
  const getForecastRevparForYear = (year: number) => {
    const roomsRevenue = getForecastRoomsRevenueForYear(year);
    return calculateRevpar(roomsRevenue, getAvailableRooms(year));
  };
  
  const getHistoricalADRForYearCalculated = (year: number) => {
    const roomsRevenue = historicalData.roomsRevenue[year] || 0;
    const occupiedRooms = Math.round(getAvailableRooms(year) * (historicalData.occupancy[year] || 0) / 100);
    return calculateHistoricalADR(roomsRevenue, occupiedRooms);
  };

  return {
    getAvailableRoomsForYear,
    calculateOccupancyFromYoYForYear,
    getForecastADRForYear,
    getForecastRoomsRevenueForYear,
    getForecastRevparForYear,
    getHistoricalADRForYearCalculated
  };
};
