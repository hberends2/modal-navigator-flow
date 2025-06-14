
import React from 'react';
import { ChevronDown, ChevronRight } from "lucide-react";
import { MetricRow, TabbedSummaryProps } from './types';
import { createHelpers } from './helpers';

export const createOccupancyMetrics = (
  props: TabbedSummaryProps,
  allYears: number[]
): MetricRow[] => {
  const { roomsKeys, historicalYears, getAvailableRooms, formatPercent } = props;
  const helpers = createHelpers(props);

  return [
    {
      label: "Rooms/Keys",
      data: allYears.map(() => roomsKeys.toLocaleString())
    },
    {
      label: "Available Rooms",
      data: allYears.map(year => getAvailableRooms(year).toLocaleString())
    },
    {
      label: "Occupied Rooms",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return helpers.getHistoricalOccupiedRooms(year).toLocaleString();
        } else {
          return helpers.getForecastOccupiedRooms(year).toLocaleString();
        }
      })
    },
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
    }
  ];
};

export const createRevenueMetrics = (
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
    getForecastRevpar, 
    getForecastRoomsRevenue 
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
      label: "Rooms Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.roomsRevenue[year] || 0);
        } else {
          return formatCurrency(getForecastRoomsRevenue(year));
        }
      })
    },
    {
      label: (
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setIsOtherOperatedExpanded(!isOtherOperatedExpanded)}
        >
          {isOtherOperatedExpanded ? (
            <ChevronDown className="h-3 w-3 mr-1" />
          ) : (
            <ChevronRight className="h-3 w-3 mr-1" />
          )}
          Total Other Operated Revenue
        </div>
      ),
      data: allYears.map(year => formatCurrency(helpers.calculateTotalOtherOperatedRevenue(year))),
      isCollapsible: true
    }
  ];
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
    formatCurrency
  } = props;
  const helpers = createHelpers(props);

  // Hard-coded historical expense data (matching ExpenseSection.tsx)
  const historicalExpenseData = {
    rooms: { 2021: 2500000, 2022: 2650000, 2023: 2800000, 2024: 2900000 },
    fb: { 2021: 1200000, 2022: 1280000, 2023: 1350000, 2024: 1400000 },
    resortFee: { 2021: 150000, 2022: 160000, 2023: 170000, 2024: 175000 },
    otherOperated: { 2021: 800000, 2022: 850000, 2023: 900000, 2024: 920000 },
    miscellaneous: { 2021: 100000, 2022: 105000, 2023: 110000, 2024: 115000 },
    allocated: { 2021: 600000, 2022: 630000, 2023: 660000, 2024: 680000 }
  };

  const calculateForecastExpense = (year: number, expenseType: string) => {
    // For now, return 0 for forecast years since we don't have expense forecast logic in TabbedSummary
    // This would need to be connected to the actual expense calculation logic
    return 0;
  };

  const calculateTotalOtherOperatedExpense = (year: number) => {
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
      label: (
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setIsOtherOperatedExpanded(!isOtherOperatedExpanded)}
        >
          {isOtherOperatedExpanded ? (
            <ChevronDown className="h-3 w-3 mr-1" />
          ) : (
            <ChevronRight className="h-3 w-3 mr-1" />
          )}
          Total Other Operated Expense
        </div>
      ),
      data: allYears.map(year => formatCurrency(calculateTotalOtherOperatedExpense(year))),
      isCollapsible: true
    }
  ];
};

export const createSubcategoryMetrics = (
  props: TabbedSummaryProps,
  allYears: number[]
): MetricRow[] => {
  const { historicalYears, formatCurrency } = props;
  const helpers = createHelpers(props);

  return [
    {
      label: "Food & Beverage Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.fbRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.fbPerOccupiedRoom));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Resort Fee Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.resortFeeRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.resortFeePerOccupiedRoom));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Other Operated Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.otherOperatedRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.otherOperatedPerOccupiedRoom));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Miscellaneous Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.miscellaneousRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.miscellaneousPerOccupiedRoom));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Allocated Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.allocatedRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.allocatedPerOccupiedRoom));
        }
      }),
      isSubcategory: true
    }
  ];
};

export const createExpenseSubcategoryMetrics = (
  props: TabbedSummaryProps,
  allYears: number[]
): MetricRow[] => {
  const { historicalYears, formatCurrency } = props;

  // Hard-coded historical expense data (matching ExpenseSection.tsx)
  const historicalExpenseData = {
    fb: { 2021: 1200000, 2022: 1280000, 2023: 1350000, 2024: 1400000 },
    resortFee: { 2021: 150000, 2022: 160000, 2023: 170000, 2024: 175000 },
    otherOperated: { 2021: 800000, 2022: 850000, 2023: 900000, 2024: 920000 },
    miscellaneous: { 2021: 100000, 2022: 105000, 2023: 110000, 2024: 115000 },
    allocated: { 2021: 600000, 2022: 630000, 2023: 660000, 2024: 680000 }
  };

  const calculateForecastExpense = (year: number, expenseType: string) => {
    // For now, return 0 for forecast years since we don't have expense forecast logic in TabbedSummary
    return 0;
  };

  return [
    {
      label: "Food & Beverage Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.fb[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'fb'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Resort Fee Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.resortFee[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'resortFee'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Other Operated Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.otherOperated[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'otherOperated'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Miscellaneous Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.miscellaneous[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'miscellaneous'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Allocated Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.allocated[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'allocated'));
        }
      }),
      isSubcategory: true
    }
  ];
};
