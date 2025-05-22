
import { HistoricalData, HistoricalGrowthRate, OccupancyData } from "./types";

// Calculate occupied rooms
export function calculateOccupiedRooms(occupancy: number, totalRooms = 108) {
  const annualAvailableRooms = totalRooms * 365;
  return Math.round(annualAvailableRooms * occupancy);
}

// Format percentage for display
export function formatPercent(value: number, decimalPlaces = 1) {
  return (value * 100).toFixed(decimalPlaces) + '%';
}

// Format number with commas
export function formatNumber(value: number) {
  return value.toLocaleString();
}

// Calculate historical growth rates
export function calculateHistoricalGrowthRates(historicalData: HistoricalData[]): HistoricalGrowthRate[] {
  return historicalData.slice(1).map((data, index) => {
    const prevOccupancy = historicalData[index].occupancy;
    const currentOccupancy = data.occupancy;
    return {
      year: data.year,
      growthRate: ((currentOccupancy - prevOccupancy) / prevOccupancy) * 100
    };
  });
}

// Calculate average historical occupancy
export function calculateAvgHistoricalOccupancy(historicalData: HistoricalData[]): number {
  return historicalData.reduce(
    (sum, data) => sum + data.occupancy, 0
  ) / historicalData.length;
}

// Calculate average historical growth rate
export function calculateAvgHistoricalGrowthRate(growthRates: HistoricalGrowthRate[]): number {
  return growthRates.reduce(
    (sum, curr) => sum + curr.growthRate, 0
  ) / growthRates.length;
}

// Calculate average historical occupied rooms
export function calculateAvgHistoricalOccupiedRooms(historicalData: HistoricalData[]): number {
  return Math.round(
    historicalData.reduce(
      (sum, data) => sum + calculateOccupiedRooms(data.occupancy, data.rooms), 0
    ) / historicalData.length
  );
}

// Update occupancy values based on growth rates
export function applyGrowthRates(
  occupancyValues: OccupancyData[],
  lastHistoricalOccupancy: number
): OccupancyData[] {
  const newValues = [...occupancyValues];
  
  newValues.forEach((item, index) => {
    const growthFactor = 1 + (item.growthRate / 100);
    if (index === 0) {
      item.occupancy = lastHistoricalOccupancy * growthFactor;
    } else {
      item.occupancy = newValues[index - 1].occupancy * growthFactor;
    }
  });
  
  return newValues;
}
