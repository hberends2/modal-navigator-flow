
import React from 'react';
import { TabbedSummaryProps, MetricRow } from './types';

export const createKeyMetrics = (props: TabbedSummaryProps, allYears: number[], mainHelpers: any): MetricRow[] => {
  const { historicalYears, forecastYears, formatCurrency, formatPercent, calculateTotalExpense, calculateGrossOperatingProfit } = props;

  const metrics: MetricRow[] = [
    // Standard first three rows (same as Revenue and Expense tabs)
    {
      label: "Subject Property Occupancy",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatPercent(props.historicalData.occupancy[year] || 0, 1);
        } else {
          const occupancyValue = props.occupancyForecastMethod === "Occupancy" 
            ? props.occupancyForecast[year] || "0"
            : props.calculateOccupancyFromYoY(year).toString();
          return formatPercent(parseFloat(occupancyValue), 1);
        }
      })
    },
    {
      label: "Subject Property ADR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          const occupiedRooms = mainHelpers.getHistoricalOccupiedRoomsForYear(year);
          const roomsRevenue = props.historicalData.roomsRevenue[year] || 0;
          const adr = occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
          return formatCurrency(adr);
        } else {
          const forecastRevenue = props.getForecastRoomsRevenue(year);
          const occupiedRooms = mainHelpers.getForecastOccupiedRoomsForYear(year);
          const adr = occupiedRooms > 0 ? forecastRevenue / occupiedRooms : 0;
          return formatCurrency(adr);
        }
      })
    },
    {
      label: "Subject Property RevPAR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          const roomsRevenue = props.historicalData.roomsRevenue[year] || 0;
          const availableRooms = props.getAvailableRooms(year);
          const revpar = availableRooms > 0 ? roomsRevenue / availableRooms : 0;
          return formatCurrency(revpar);
        } else {
          const forecastRevenue = props.getForecastRoomsRevenue(year);
          const availableRooms = props.getAvailableRooms(year);
          const revpar = availableRooms > 0 ? forecastRevenue / availableRooms : 0;
          return formatCurrency(revpar);
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
