import { getAvailableRooms } from '../../utils/calculationUtils';

export const createRevenueHelpers = (revenueCalculations: any, historicalData: any) => {
  const getAvailableRoomsForYear = (year: number) => {
    return getAvailableRooms(year);
  };

  const calculateOccupancyFromYoYForYear = (year: number) => {
    const { occupancyYoYGrowth } = revenueCalculations;
    const previousYear = year - 1;
    const previousYearOccupancy = historicalData.occupancy[previousYear] || 0;
    const occupancyGrowth = parseFloat(occupancyYoYGrowth[year]) / 100 || 0;
    return previousYearOccupancy + previousYearOccupancy * occupancyGrowth;
  };

  const getForecastRoomsRevenueForYear = (year: number) => {
    const { adrGrowthType, flatAdrGrowth, yearlyAdrGrowth } = revenueCalculations;
  
    // Calculate the historical ADR from the previous year
    const previousYear = year - 1;
    const previousYearRoomsRevenue = historicalData.roomsRevenue[previousYear] || 0;
    const previousYearOccupancy = historicalData.occupancy[previousYear] || 0;
    const previousYearAvailableRooms = getAvailableRooms(previousYear);
    const previousYearOccupiedRooms = (previousYearOccupancy / 100) * previousYearAvailableRooms;
    
    // Calculate historical ADR properly: rooms revenue / occupied rooms
    const historicalADR = previousYearOccupiedRooms > 0 ? previousYearRoomsRevenue / previousYearOccupiedRooms : 0;
  
    // Apply growth rate to the ADR, not to total revenue
    let forecastADR;
    if (adrGrowthType === "flat") {
      const growthRate = parseFloat(flatAdrGrowth) / 100 || 0;
      forecastADR = historicalADR * (1 + growthRate);
    } else {
      const growthRate = parseFloat(yearlyAdrGrowth[year]) / 100 || 0;
      forecastADR = historicalADR * (1 + growthRate);
    }
  
    // Calculate forecast occupied rooms
    const availableRooms = getAvailableRooms(year);
    const occupancyValue = revenueCalculations.occupancyForecastMethod === "Occupancy"
      ? parseFloat(revenueCalculations.occupancyForecast[year] || "0")
      : calculateOccupancyFromYoYForYear(year);
    const occupiedRooms = (occupancyValue / 100) * availableRooms;
  
    // Calculate rooms revenue: ADR × occupied rooms
    return forecastADR * occupiedRooms;
  };

  const getHistoricalADRForYearCalculated = (year: number) => {
    const occupiedRooms = historicalData.occupancy[year] ? (historicalData.occupancy[year] / 100) * getAvailableRoomsForYear(year) : 0;
    return occupiedRooms > 0 ? historicalData.roomsRevenue[year] / occupiedRooms : 0;
  };

  const getForecastADRForYear = (year: number) => {
    const roomsRevenue = getForecastRoomsRevenueForYear(year);
    const availableRooms = getAvailableRooms(year);
    const occupancyValue = revenueCalculations.occupancyForecastMethod === "Occupancy"
      ? parseFloat(revenueCalculations.occupancyForecast[year] || "0")
      : calculateOccupancyFromYoYForYear(year);
    const occupiedRooms = (occupancyValue / 100) * availableRooms;
    return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
  };

  const getForecastRevparForYear = (year: number) => {
    const roomsRevenue = getForecastRoomsRevenueForYear(year);
    const availableRooms = getAvailableRooms(year);
    return roomsRevenue / availableRooms;
  };

  const getForecastOccupiedRoomsForYear = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancyValue = revenueCalculations.occupancyForecastMethod === "Occupancy"
      ? parseFloat(revenueCalculations.occupancyForecast[year] || "0")
      : calculateOccupancyFromYoYForYear(year);
    return (occupancyValue / 100) * availableRooms;
  };

  const calculateTotalRevenue = (year: number, isHistorical: boolean) => {
    if (isHistorical) {
      // Sum historical revenue components
      const roomsRevenue = historicalData.roomsRevenue[year] || 0;
      const fbRevenue = historicalData.fbRevenue[year] || 0;
      const resortFeeRevenue = historicalData.resortFeeRevenue[year] || 0;
      const otherOperatedRevenue = historicalData.otherOperatedRevenue[year] || 0;
      const miscellaneousRevenue = historicalData.miscellaneousRevenue[year] || 0;
      const allocatedRevenue = historicalData.allocatedRevenue[year] || 0;
      
      return roomsRevenue + fbRevenue + resortFeeRevenue + 
             otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
    } else {
      // Calculate forecast revenue components
      const roomsRevenue = getForecastRoomsRevenueForYear(year);
      const occupiedRooms = getForecastOccupiedRoomsForYear(year);
      
      const fbRevenue = parseFloat(revenueCalculations.fbPerOccupiedRoom[year] || "0") * occupiedRooms;
      const resortFeeRevenue = parseFloat(revenueCalculations.resortFeePerOccupiedRoom[year] || "0") * occupiedRooms;
      const otherOperatedRevenue = parseFloat(revenueCalculations.otherOperatedPerOccupiedRoom[year] || "0") * occupiedRooms;
      const miscellaneousRevenue = parseFloat(revenueCalculations.miscellaneousPerOccupiedRoom[year] || "0") * occupiedRooms;
      const allocatedRevenue = parseFloat(revenueCalculations.allocatedPerOccupiedRoom[year] || "0") * occupiedRooms;
      
      return roomsRevenue + fbRevenue + resortFeeRevenue + 
             otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
    }
  };

  return {
    getAvailableRoomsForYear,
    calculateOccupancyFromYoYForYear,
    getForecastRoomsRevenueForYear,
    getHistoricalADRForYearCalculated,
    getForecastADRForYear,
    getForecastRevparForYear,
    calculateTotalRevenue
  };
};
