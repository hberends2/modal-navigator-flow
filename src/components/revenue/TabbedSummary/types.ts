
import React from "react";

export interface TabbedSummaryProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    roomsRevenue: Record<number, number>;
    occupancy: Record<number, number>;
    fbRevenue: Record<number, number>;
    resortFeeRevenue: Record<number, number>;
    otherOperatedRevenue: Record<number, number>;
    miscellaneousRevenue: Record<number, number>;
    allocatedRevenue: Record<number, number>;
  };
  occupancyForecast: Record<number, string>;
  occupancyForecastMethod: string;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  getHistoricalADR: (year: number) => number;
  getForecastADR: (year: number) => number;
  getForecastRevpar: (year: number) => number;
  fbPerOccupiedRoom: Record<number, string>;
  resortFeePerOccupiedRoom: Record<number, string>;
  otherOperatedPerOccupiedRoom: Record<number, string>;
  miscellaneousPerOccupiedRoom: Record<number, string>;
  allocatedPerOccupiedRoom: Record<number, string>;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
}

export interface MetricRow {
  label: string | React.ReactNode;
  data: string[];
  isCollapsible?: boolean;
  isSubcategory?: boolean;
}
