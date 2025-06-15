
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
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  occupancyForecast: Record<number, string>;
  occupancyForecastMethod: string;
  calculateOccupancyFromYoY: (year: number) => number;
  getHistoricalADR: (year: number) => number;
  getForecastADR: (year: number) => number;
  getForecastRevpar: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
}
