
import React from 'react';
import { TabbedSummaryProps, MetricRow } from './types';

export const createKeyMetrics = (props: TabbedSummaryProps, allYears: number[], mainHelpers: any): MetricRow[] => {
  const { 
    historicalYears, 
    forecastYears, 
    formatCurrency, 
    formatPercent, 
    calculateTotalExpense, 
    calculateGrossOperatingProfit,
    historicalData,
    occupancyForecast,
    occupancyForecastMethod,
    calculateOccupancyFromYoY,
    getHistoricalADR,
    getForecastADR,
    getForecastRevpar
  } = props;

  const metrics: MetricRow[] = [
    // Use existing occupancy data directly
    {
      label: "Subject Property Occupancy",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatPercent(historicalData.occupancy[year] || 0, 1);
        } else {
          const occupancyValue = occupancyForecastMethod === "Occupancy" 
            ? parseFloat(occupancyForecast[year] || "0")
            : calculateOccupancyFromYoY(year);
          return formatPercent(occupancyValue, 1);
        }
      })
    },
    // Use existing ADR functions directly
    {
      label: "Subject Property ADR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(getHistoricalADR(year));
        } else {
          return formatCurrency(getForecastADR(year));
        }
      })
    },
    // Use existing RevPAR data and functions directly
    {
      label: "Subject Property RevPAR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalData.revpar[year] || 0);
        } else {
          return formatCurrency(getForecastRevpar(year));
        }
      })
    },
    // Total Revenue - use historical data only, show N/A for forecast years if no direct data available
    {
      label: "Total Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          // Sum historical revenue components if available
          const roomsRevenue = historicalData.roomsRevenue[year] || 0;
          const fbRevenue = historicalData.fbRevenue[year] || 0;
          const resortFeeRevenue = historicalData.resortFeeRevenue[year] || 0;
          const otherOperatedRevenue = historicalData.otherOperatedRevenue[year] || 0;
          const miscellaneousRevenue = historicalData.miscellaneousRevenue[year] || 0;
          const allocatedRevenue = historicalData.allocatedRevenue[year] || 0;
          
          const totalRevenue = roomsRevenue + fbRevenue + resortFeeRevenue + 
                             otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
          return formatCurrency(totalRevenue);
        } else {
          // For forecast years, show N/A since we can't calculate without doing calculations
          return "N/A";
        }
      })
    },
    // Total Expense - only use the prop function if available
    {
      label: "Total Expense",
      data: allYears.map(year => {
        if (calculateTotalExpense) {
          const totalExpense = calculateTotalExpense(year);
          return formatCurrency(totalExpense);
        } else {
          return "N/A";
        }
      })
    },
    // Gross Operating Profit - only use the prop function if available
    {
      label: "Gross Operating Profit",
      data: allYears.map(year => {
        if (calculateGrossOperatingProfit) {
          const gop = calculateGrossOperatingProfit(year);
          return formatCurrency(gop);
        } else {
          return "N/A";
        }
      })
    },
    // EBITDA - same as GOP in this context based on the Valuation table
    {
      label: "EBITDA",
      data: allYears.map(year => {
        if (calculateGrossOperatingProfit) {
          const ebitda = calculateGrossOperatingProfit(year);
          return formatCurrency(ebitda);
        } else {
          return "N/A";
        }
      })
    }
  ];

  return metrics;
};
