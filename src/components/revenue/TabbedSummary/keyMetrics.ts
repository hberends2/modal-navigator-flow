
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
    getForecastRevpar,
    getForecastRoomsRevenue,
    fbPerOccupiedRoom,
    resortFeePerOccupiedRoom,
    otherOperatedPerOccupiedRoom,
    miscellaneousPerOccupiedRoom,
    allocatedPerOccupiedRoom
  } = props;

  // Helper function to calculate occupied rooms for forecast years
  const getForecastOccupiedRooms = (year: number) => {
    const occupancyValue = occupancyForecastMethod === "Occupancy" 
      ? parseFloat(occupancyForecast[year] || "0")
      : calculateOccupancyFromYoY(year);
    return (occupancyValue / 100) * 365; // Assuming 365 available rooms per year
  };

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
    // Total Revenue - calculate from individual components
    {
      label: "Total Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          // Sum historical revenue components
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
          // Calculate forecast revenue components
          const roomsRevenue = getForecastRoomsRevenue(year);
          const occupiedRooms = getForecastOccupiedRooms(year);
          
          const fbRevenue = parseFloat(fbPerOccupiedRoom[year] || "0") * occupiedRooms;
          const resortFeeRevenue = parseFloat(resortFeePerOccupiedRoom[year] || "0") * occupiedRooms;
          const otherOperatedRevenue = parseFloat(otherOperatedPerOccupiedRoom[year] || "0") * occupiedRooms;
          const miscellaneousRevenue = parseFloat(miscellaneousPerOccupiedRoom[year] || "0") * occupiedRooms;
          const allocatedRevenue = parseFloat(allocatedPerOccupiedRoom[year] || "0") * occupiedRooms;
          
          const totalRevenue = roomsRevenue + fbRevenue + resortFeeRevenue + 
                             otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
          return formatCurrency(totalRevenue);
        }
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
          return formatCurrency(0);
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
          return formatCurrency(0);
        }
      })
    }
  ];

  return metrics;
};
