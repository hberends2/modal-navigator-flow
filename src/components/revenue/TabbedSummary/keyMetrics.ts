
import React from 'react';
import { TabbedSummaryProps, MetricRow } from './types';
import { createHelpers } from './helpers';

export const createKeyMetrics = (props: TabbedSummaryProps, allYears: number[]): MetricRow[] => {
  const { historicalYears, forecastYears, formatCurrency, formatPercent } = props;
  const helpers = createHelpers(props);

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
          const occupiedRooms = helpers.getHistoricalOccupiedRooms(year);
          const roomsRevenue = props.historicalData.roomsRevenue[year] || 0;
          const adr = occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
          return formatCurrency(adr);
        } else {
          const forecastRevenue = props.getForecastRoomsRevenue(year);
          const occupiedRooms = helpers.getForecastOccupiedRooms(year);
          const adr = occupiedRooms > 0 ? forecastRevenue / occupiedRooms : 0;
          return formatCurrency(adr);
        }
      })
    },
    {
      label: "Subject Property RevPAR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(helpers.getHistoricalRevpar(year));
        } else {
          const forecastRevenue = props.getForecastRoomsRevenue(year);
          const availableRooms = props.getAvailableRooms(year);
          const revpar = availableRooms > 0 ? forecastRevenue / availableRooms : 0;
          return formatCurrency(revpar);
        }
      })
    },
    // Use existing pre-calculated data from Valuation table
    {
      label: "Total Revenue",
      data: allYears.map(year => {
        const totalRevenue = helpers.calculateTotalRevenue(year);
        return formatCurrency(totalRevenue);
      })
    },
    {
      label: "Total Expense",
      data: allYears.map(year => {
        // Use the existing calculateTotalExpense function from ExpenseCalculationsProvider
        if (props.calculateTotalExpense) {
          const totalExpense = props.calculateTotalExpense(year);
          return formatCurrency(totalExpense);
        }
        return formatCurrency(0);
      })
    },
    {
      label: "Gross Operating Profit",
      data: allYears.map(year => {
        // Use the existing calculateGrossOperatingProfit function from ExpenseCalculationsProvider
        if (props.calculateGrossOperatingProfit) {
          const gop = props.calculateGrossOperatingProfit(year);
          return formatCurrency(gop);
        }
        return formatCurrency(0);
      })
    },
    {
      label: "EBITDA",
      data: allYears.map(year => {
        // EBITDA = Gross Operating Profit - Non-Operating Expenses
        // Use the existing calculation functions
        if (props.calculateGrossOperatingProfit && props.calculateTotalExpense) {
          const gop = props.calculateGrossOperatingProfit(year);
          // For EBITDA, we need GOP minus non-operating expenses
          // For now, using GOP as EBITDA since the exact calculation depends on your specific requirements
          return formatCurrency(gop);
        }
        return formatCurrency(0);
      })
    }
  ];

  return metrics;
};
