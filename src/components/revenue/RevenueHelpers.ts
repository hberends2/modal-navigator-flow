
import { 
  getAvailableRooms, 
  calculateOccupancyFromYoY, 
  calculateForecastADR, 
  calculateRoomsRevenue, 
  calculateRevpar,
  calculateHistoricalADR,
  formatCurrency,
  formatPercent
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
  
  const getHistoricalADRForYear = (year: number) => {
    const roomsRevenue = historicalData.roomsRevenue[year] || 0;
    const occupiedRooms = Math.round(getAvailableRooms(year) * (historicalData.occupancy[year] || 0) / 100);
    return calculateHistoricalADR(roomsRevenue, occupiedRooms);
  };

  const getHistoricalOccupiedRoomsForYear = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancyPercent = historicalData.occupancy[year] || 0;
    const occupancyDecimal = occupancyPercent / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const getForecastOccupiedRoomsForYear = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancyValue = revenueCalculations.occupancyForecastMethod === "Occupancy" 
      ? parseFloat(revenueCalculations.occupancyForecast[year] || "0")
      : calculateOccupancyFromYoYForYear(year);
    const occupancyDecimal = occupancyValue / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const calculateTotalOtherOperatedRevenue = (year: number, isHistorical: boolean) => {
    if (isHistorical) {
      return (historicalData.fbRevenue[year] || 0) +
             (historicalData.resortFeeRevenue[year] || 0) +
             (historicalData.otherOperatedRevenue[year] || 0) +
             (historicalData.miscellaneousRevenue[year] || 0) +
             (historicalData.allocatedRevenue[year] || 0);
    } else {
      const occupiedRooms = getForecastOccupiedRoomsForYear(year);
      const fbRevenue = (parseFloat(revenueCalculations.fbPerOccupiedRoom[year] || "0")) * occupiedRooms;
      const resortFeeRevenue = (parseFloat(revenueCalculations.resortFeePerOccupiedRoom[year] || "0")) * occupiedRooms;
      const otherOperatedRevenue = (parseFloat(revenueCalculations.otherOperatedPerOccupiedRoom[year] || "0")) * occupiedRooms;
      const miscellaneousRevenue = (parseFloat(revenueCalculations.miscellaneousPerOccupiedRoom[year] || "0")) * occupiedRooms;
      const allocatedRevenue = (parseFloat(revenueCalculations.allocatedPerOccupiedRoom[year] || "0")) * occupiedRooms;
      return fbRevenue + resortFeeRevenue + otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
    }
  };

  const calculateTotalRevenue = (year: number, isHistorical: boolean) => {
    if (isHistorical) {
      const roomsRevenue = historicalData.roomsRevenue[year] || 0;
      const totalOtherOperatedRevenue = calculateTotalOtherOperatedRevenue(year, true);
      return roomsRevenue + totalOtherOperatedRevenue;
    } else {
      const roomsRevenue = getForecastRoomsRevenueForYear(year);
      const totalOtherOperatedRevenue = calculateTotalOtherOperatedRevenue(year, false);
      return roomsRevenue + totalOtherOperatedRevenue;
    }
  };

  return {
    // TabbedSummary expected functions
    getAvailableRooms: getAvailableRoomsForYear,
    getForecastRevpar: getForecastRevparForYear,
    getForecastRoomsRevenue: getForecastRoomsRevenueForYear,
    calculateOccupancyFromYoY: calculateOccupancyFromYoYForYear,
    formatCurrency,
    formatPercent,
    getHistoricalADR: getHistoricalADRForYear,
    getForecastADR: getForecastADRForYear,
    // CalculationHelpers interface functions
    getHistoricalOccupiedRoomsForYear,
    getForecastOccupiedRoomsForYear,
    getHistoricalADRForYear,
    getForecastADRForYear,
    calculateTotalOtherOperatedRevenue,
    calculateTotalRevenue
  };
};
