
// Types for our occupancy data
export interface OccupancyData {
  year: number;
  occupancy: number;
  growthRate: number;
}

export interface HistoricalData {
  year: number;
  occupancy: number;
  rooms: number;
}

export interface HistoricalGrowthRate {
  year: number;
  growthRate: number;
}
