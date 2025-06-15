
import React from "react";

export interface MetricRow {
  label: string | React.ReactElement;
  data: (string | number | React.ReactElement)[];
  isSubcategory?: boolean;
  isCollapsible?: boolean;
  isUndistributed?: boolean;
  isUndistributedSubcategory?: boolean;
}

export interface TabbedSummaryProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  occupancyForecast: Record<number, string>;
  occupancyForecastMethod: string;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  getHistoricalADR: (year: number) => number;
  getForecastADR: (year: number) => number;
  getForecastRevpar: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  fbPerOccupiedRoom: Record<number, string>;
  resortFeePerOccupiedRoom: Record<number, string>;
  otherOperatedPerOccupiedRoom: Record<number, string>;
  miscellaneousPerOccupiedRoom: Record<number, string>;
  allocatedPerOccupiedRoom: Record<number, string>;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
}
