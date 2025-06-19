
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
    // Total Revenue (using main helpers)
    {
      label: "Total Revenue",
      data: allYears.map(year => {
        const isHistorical = historicalYears.includes(year);
        const totalRevenue = mainHelpers.calculateTotalRevenue(year, isHistorical);
        return formatCurrency(totalRevenue);
      })
    },
    // Total Expense (using the working calculation function)
    {
      label: "Total Expense",
      data: allYears.map(year => {
        if (calculateTotalExpense) {
          const totalExpense = calculateTotalExpense(year);
          return formatCurrency(totalExpense);
        } else {
          // Fallback if function is not available
          return formatCurrency(0);
        }
      })
    },
    // Gross Operating Profit (using the working calculation function)
    {
      label: "Gross Operating Profit",
      data: allYears.map(year => {
        if (calculateGrossOperatingProfit) {
          const gop = calculateGrossOperatingProfit(year);
          return formatCurrency(gop);
        } else {
          // Fallback calculation
          const isHistorical = historicalYears.includes(year);
          const totalRevenue = mainHelpers.calculateTotalRevenue(year, isHistorical);
          const totalExpense = calculateTotalExpense ? calculateTotalExpense(year) : 0;
          const gop = totalRevenue - totalExpense;
          return formatCurrency(gop);
        }
      })
    },
    // EBITDA (same as GOP in this context based on the Valuation table)
    {
      label: "EBITDA",
      data: allYears.map(year => {
        if (calculateGrossOperatingProfit) {
          const ebitda = calculateGrossOperatingProfit(year);
          return formatCurrency(ebitda);
        } else {
          // Fallback calculation
          const isHistorical = historicalYears.includes(year);
          const totalRevenue = mainHelpers.calculateTotalRevenue(year, isHistorical);
          const totalExpense = calculateTotalExpense ? calculateTotalExpense(year) : 0;
          const ebitda = totalRevenue - totalExpense;
          return formatCurrency(ebitda);
        }
      })
    }
  ];

  return metrics;
};
