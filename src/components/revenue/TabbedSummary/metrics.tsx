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
      label: "Rooms Expense",
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
          Total Other Operated Expense
        </div>
      ),
      data: allYears.map(year => formatCurrency(helpers.calculateTotalOtherOperatedRevenue(year))),
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
