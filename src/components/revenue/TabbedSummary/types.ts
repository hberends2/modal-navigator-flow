import React from "react";

export interface MetricRow {
  label: React.ReactNode;
  data: (string | number | React.ReactNode)[];
  isCollapsible?: boolean;
  isSubcategory?: boolean;
  isUndistributed?: boolean;
  isUndistributedSubcategory?: boolean;
}

export interface TabbedSummaryProps {
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  occupancyForecast: Record<number, string>;
  occupancyForecastMethod: string;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  // Add expense calculation functions
  calculateTotalExpense?: (year: number) => number;
  calculateGrossOperatingProfit?: (year: number) => number;
}
