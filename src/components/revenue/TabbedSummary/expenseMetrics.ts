
import React from 'react';
import { ChevronDown, ChevronRight } from "lucide-react";
import { MetricRow, TabbedSummaryProps } from './types';
import { createHelpers } from './helpers';

// Hard-coded historical expense data (matching ExpenseSection.tsx)
const historicalExpenseData = {
  rooms: { 2021: 2500000, 2022: 2650000, 2023: 2800000, 2024: 2900000 },
  fb: { 2021: 1200000, 2022: 1280000, 2023: 1350000, 2024: 1400000 },
  resortFee: { 2021: 150000, 2022: 160000, 2023: 170000, 2024: 175000 },
  otherOperated: { 2021: 800000, 2022: 850000, 2023: 900000, 2024: 920000 },
  miscellaneous: { 2021: 100000, 2022: 105000, 2023: 110000, 2024: 115000 },
  allocated: { 2021: 600000, 2022: 630000, 2023: 660000, 2024: 680000 },
  propertyOperations: { 2021: 1500000, 2022: 1575000, 2023: 1650000, 2024: 1700000 },
  administrativeGeneral: { 2021: 900000, 2022: 945000, 2023: 990000, 2024: 1020000 },
  infoTechServices: { 2021: 300000, 2022: 315000, 2023: 330000, 2024: 340000 },
  salesMarketing: { 2021: 600000, 2022: 630000, 2023: 660000, 2024: 680000 },
  utilities: { 2021: 750000, 2022: 787500, 2023: 825000, 2024: 850000 },
  nonOperating: { 2021: 500000, 2022: 525000, 2023: 550000, 2024: 575000 }
};

const calculateForecastExpense = (year: number, expenseType: string) => {
  // For now, return 0 for forecast years since we don't have expense forecast logic in TabbedSummary
  // This would need to be connected to the actual expense calculation logic
  return 0;
};

const calculateTotalOtherOperatedExpense = (year: number, historicalYears: number[]) => {
  if (historicalYears.includes(year)) {
    return (historicalExpenseData.fb[year] || 0) +
           (historicalExpenseData.resortFee[year] || 0) +
           (historicalExpenseData.otherOperated[year] || 0) +
           (historicalExpenseData.miscellaneous[year] || 0) +
           (historicalExpenseData.allocated[year] || 0);
  } else {
    return calculateForecastExpense(year, 'fb') +
           calculateForecastExpense(year, 'resortFee') +
           calculateForecastExpense(year, 'otherOperated') +
           calculateForecastExpense(year, 'miscellaneous') +
           calculateForecastExpense(year, 'allocated');
  }
};

const calculateTotalExpense = (year: number, historicalYears: number[]) => {
  const roomsExpense = historicalYears.includes(year) 
    ? (historicalExpenseData.rooms[year] || 0)
    : calculateForecastExpense(year, 'rooms');
  const totalOtherOperatedExpense = calculateTotalOtherOperatedExpense(year, historicalYears);
  const propertyOperations = historicalYears.includes(year) 
    ? (historicalExpenseData.propertyOperations[year] || 0)
    : calculateForecastExpense(year, 'propertyOperations');
  const administrativeGeneral = historicalYears.includes(year) 
    ? (historicalExpenseData.administrativeGeneral[year] || 0)
    : calculateForecastExpense(year, 'administrativeGeneral');
  const infoTechServices = historicalYears.includes(year) 
    ? (historicalExpenseData.infoTechServices[year] || 0)
    : calculateForecastExpense(year, 'infoTechServices');
  const salesMarketing = historicalYears.includes(year) 
    ? (historicalExpenseData.salesMarketing[year] || 0)
    : calculateForecastExpense(year, 'salesMarketing');
  const utilities = historicalYears.includes(year) 
    ? (historicalExpenseData.utilities[year] || 0)
    : calculateForecastExpense(year, 'utilities');
  const nonOperating = historicalYears.includes(year) 
    ? (historicalExpenseData.nonOperating[year] || 0)
    : calculateForecastExpense(year, 'nonOperating');
  
  return roomsExpense + totalOtherOperatedExpense + propertyOperations + 
         administrativeGeneral + infoTechServices + salesMarketing + 
         utilities + nonOperating;
};

export const createExpenseMetrics = (
  props: TabbedSummaryProps,
  allYears: number[],
  isOtherOperatedExpanded: boolean,
  setIsOtherOperatedExpanded: (expanded: boolean) => void
): MetricRow[] => {
  const { 
    historicalYears, 
    formatPercent, 
    formatCurrency,
    getHistoricalADR, 
    getForecastADR, 
    getForecastRevpar
  } = props;
  const helpers = createHelpers(props);

  return [
    {
      label: "Subject Property Occupancy",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatPercent(props.historicalData.occupancy[year] || 0);
        } else {
          const occupancyValue = props.occupancyForecastMethod === "Occupancy" 
            ? parseFloat(props.occupancyForecast[year] || "0")
            : props.calculateOccupancyFromYoY(year);
          return formatPercent(occupancyValue);
        }
      })
    },
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
    {
      label: "Subject Property RevPAR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(helpers.getHistoricalRevpar(year));
        } else {
          return formatCurrency(getForecastRevpar(year));
        }
      })
    },
    {
      label: "Rooms Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.rooms[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'rooms'));
        }
      })
    },
    {
      label: React.createElement(
        'div', 
        { 
          className: "flex items-center cursor-pointer",
          onClick: () => setIsOtherOperatedExpanded(!isOtherOperatedExpanded)
        },
        isOtherOperatedExpanded ? 
          React.createElement(ChevronDown, { className: "h-3 w-3 mr-1" }) :
          React.createElement(ChevronRight, { className: "h-3 w-3 mr-1" }),
        "Total Other Operated Expense"
      ),
      data: allYears.map(year => formatCurrency(calculateTotalOtherOperatedExpense(year, historicalYears))),
      isCollapsible: true
    },
    {
      label: "Property Operations & Maintenance",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.propertyOperations[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'propertyOperations'));
        }
      })
    },
    {
      label: "Administrative & General",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.administrativeGeneral[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'administrativeGeneral'));
        }
      })
    },
    {
      label: "Info & Tech Services",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.infoTechServices[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'infoTechServices'));
        }
      })
    },
    {
      label: "Sales & Marketing",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.salesMarketing[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'salesMarketing'));
        }
      })
    },
    {
      label: "Utilities",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.utilities[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'utilities'));
        }
      })
    },
    {
      label: "Non-Operating",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.nonOperating[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'nonOperating'));
        }
      })
    },
    {
      label: "Total Expense",
      data: allYears.map(year => formatCurrency(calculateTotalExpense(year, historicalYears)))
    }
  ];
};
