
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface TabbedSummaryProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    roomsRevenue: Record<number, number>;
    occupancy: Record<number, number>;
    fbRevenue: Record<number, number>;
    resortFeeRevenue: Record<number, number>;
    otherOperatedRevenue: Record<number, number>;
    miscellaneousRevenue: Record<number, number>;
    allocatedRevenue: Record<number, number>;
  };
  occupancyForecast: Record<number, string>;
  occupancyForecastMethod: string;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  getHistoricalADR: (year: number) => number;
  getForecastADR: (year: number) => number;
  getForecastRevpar: (year: number) => number;
  fbPerOccupiedRoom: Record<number, string>;
  resortFeePerOccupiedRoom: Record<number, string>;
  otherOperatedPerOccupiedRoom: Record<number, string>;
  miscellaneousPerOccupiedRoom: Record<number, string>;
  allocatedPerOccupiedRoom: Record<number, string>;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
}

const TabbedSummary: React.FC<TabbedSummaryProps> = ({
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  occupancyForecast,
  occupancyForecastMethod,
  calculateOccupancyFromYoY,
  getAvailableRooms,
  getForecastRoomsRevenue,
  getHistoricalADR,
  getForecastADR,
  getForecastRevpar,
  fbPerOccupiedRoom,
  resortFeePerOccupiedRoom,
  otherOperatedPerOccupiedRoom,
  miscellaneousPerOccupiedRoom,
  allocatedPerOccupiedRoom,
  formatCurrency,
  formatPercent
}) => {
  const [activeTab, setActiveTab] = useState("occupancy");

  // Helper functions
  const getHistoricalOccupiedRooms = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancyDecimal = (historicalData.occupancy[year] || 0) / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const getForecastOccupiedRooms = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancyValue = occupancyForecastMethod === "Occupancy" 
      ? occupancyForecast[year] || "0"
      : calculateOccupancyFromYoY(year).toString();
    const occupancyDecimal = parseFloat(occupancyValue) / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const getHistoricalRevpar = (year: number) => {
    const roomsRevenue = historicalData.roomsRevenue[year] || 0;
    const availableRooms = getAvailableRooms(year);
    return roomsRevenue / availableRooms;
  };

  // Calculate revenue totals for forecast years
  const calculateForecastRevenue = (year: number, perRoomData: Record<number, string>) => {
    const perRoom = parseFloat(perRoomData[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  const allYears = [...historicalYears, ...forecastYears];

  // Occupancy metrics
  const occupancyMetrics = [
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
          return getHistoricalOccupiedRooms(year).toLocaleString();
        } else {
          return getForecastOccupiedRooms(year).toLocaleString();
        }
      })
    },
    {
      label: "Subject Property Occupancy",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatPercent(historicalData.occupancy[year] || 0);
        } else {
          const occupancyValue = occupancyForecastMethod === "Occupancy" 
            ? parseFloat(occupancyForecast[year] || "0")
            : calculateOccupancyFromYoY(year);
          return formatPercent(occupancyValue);
        }
      })
    }
  ];

  // Revenue metrics
  const revenueMetrics = [
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
          return formatCurrency(getHistoricalRevpar(year));
        } else {
          return formatCurrency(getForecastRevpar(year));
        }
      })
    },
    {
      label: "Rooms Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalData.roomsRevenue[year] || 0);
        } else {
          return formatCurrency(getForecastRoomsRevenue(year));
        }
      })
    },
    {
      label: "Food & Beverage Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalData.fbRevenue[year] || 0);
        } else {
          return formatCurrency(calculateForecastRevenue(year, fbPerOccupiedRoom));
        }
      })
    },
    {
      label: "Resort Fee Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalData.resortFeeRevenue[year] || 0);
        } else {
          return formatCurrency(calculateForecastRevenue(year, resortFeePerOccupiedRoom));
        }
      })
    },
    {
      label: "Other Operated Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalData.otherOperatedRevenue[year] || 0);
        } else {
          return formatCurrency(calculateForecastRevenue(year, otherOperatedPerOccupiedRoom));
        }
      })
    },
    {
      label: "Miscellaneous Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalData.miscellaneousRevenue[year] || 0);
        } else {
          return formatCurrency(calculateForecastRevenue(year, miscellaneousPerOccupiedRoom));
        }
      })
    },
    {
      label: "Allocated Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalData.allocatedRevenue[year] || 0);
        } else {
          return formatCurrency(calculateForecastRevenue(year, allocatedPerOccupiedRoom));
        }
      })
    }
  ];

  const renderTable = (metrics: typeof occupancyMetrics) => (
    <div className="bg-white rounded-lg shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48 font-semibold text-xs">Metric</TableHead>
            {historicalYears.map(year => (
              <TableHead key={year} className="text-center font-semibold bg-blue-50 text-xs">
                {year}
              </TableHead>
            ))}
            {forecastYears.map(year => (
              <TableHead key={year} className="text-center font-semibold bg-green-50 text-xs">
                {year}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric, index) => (
            <TableRow key={index} className="h-6">
              <TableCell className="font-medium text-xs py-0.5">{metric.label}</TableCell>
              {metric.data.map((value, yearIndex) => {
                const isHistorical = yearIndex < historicalYears.length;
                return (
                  <TableCell 
                    key={yearIndex} 
                    className={`text-center text-xs py-0.5 ${isHistorical ? 'bg-blue-25' : 'bg-green-25'}`}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-0">
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="occupancy" className="mt-0">
          {renderTable(occupancyMetrics)}
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          {renderTable(revenueMetrics)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabbedSummary;
