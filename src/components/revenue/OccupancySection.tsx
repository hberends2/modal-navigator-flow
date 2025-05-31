
import React from "react";
import MetricRow from "./MetricRow";
import { marketOccupancyData, compSetOccupancyData } from "./revenueData";
import { getMarketOccupancyYoY, getCompSetOccupancyYoY, getHistoricalOccupancyYoY, formatYoYWithColor } from "./revenueCalculations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface OccupancySectionProps {
  historicalYears: number[];
  forecastYears: number[];
  roomsKeys: number;
  historicalData: {
    occupancy: Record<number, number>;
  };
  occupancyForecast: Record<number, string>;
  handleOccupancyChange: (year: number, value: string) => void;
  occupancyForecastMethod: string;
  setOccupancyForecastMethod: (value: string) => void;
  occupancyYoYGrowth: Record<number, string>;
  handleOccupancyYoYChange: (year: number, value: string) => void;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  getHistoricalOccupiedRooms: (year: number) => number;
  getForecastOccupiedRooms: (year: number) => number;
  formatPercent: (value: number, decimals?: number) => string;
}

const OccupancySection: React.FC<OccupancySectionProps> = ({
  historicalYears,
  forecastYears,
  roomsKeys,
  historicalData,
  occupancyForecast,
  handleOccupancyChange,
  occupancyForecastMethod,
  setOccupancyForecastMethod,
  occupancyYoYGrowth,
  handleOccupancyYoYChange,
  calculateOccupancyFromYoY,
  getAvailableRooms,
  getHistoricalOccupiedRooms,
  getForecastOccupiedRooms,
  formatPercent
}) => {
  // Helper function to calculate index percentages
  const calculateIndex = (numerator: number, denominator: number): string => {
    if (denominator === 0) return "0.0%";
    return `${((numerator / denominator) * 100).toFixed(1)}%`;
  };

  // Calculate YoY growth for forecast years
  const calculateForecastYoY = (year: number, index: number): React.ReactElement => {
    if (index === 0) {
      // First forecast year - compare with last historical year (2024)
      const lastHistoricalOccupancy = historicalData.occupancy[2024] || 0;
      const currentOccupancy = occupancyForecastMethod === "Occupancy" 
        ? parseFloat(occupancyForecast[year]) || 0
        : calculateOccupancyFromYoY(year);
      const yoyValue = ((currentOccupancy - lastHistoricalOccupancy) / lastHistoricalOccupancy) * 100;
      return formatYoYWithColor(yoyValue);
    } else {
      // Subsequent years - compare with previous forecast year
      const prevYear = forecastYears[index - 1];
      const prevOccupancy = occupancyForecastMethod === "Occupancy" 
        ? parseFloat(occupancyForecast[prevYear]) || 0
        : calculateOccupancyFromYoY(prevYear);
      const currentOccupancy = occupancyForecastMethod === "Occupancy" 
        ? parseFloat(occupancyForecast[year]) || 0
        : calculateOccupancyFromYoY(year);
      const yoyValue = ((currentOccupancy - prevOccupancy) / prevOccupancy) * 100;
      return formatYoYWithColor(yoyValue);
    }
  };

  return (
    <>
      {/* Occupancy Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Occupancy</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Market Occupancy */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Market (Hotel Horizons / LARC)</span>}
        historicalData={historicalYears.map(year => {
          const data = marketOccupancyData[year as keyof typeof marketOccupancyData];
          return data ? `${data.toFixed(1)}%` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Market Occupancy YoY */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => {
          const yoyValue = getMarketOccupancyYoY(year, index, historicalYears);
          return formatYoYWithColor(yoyValue);
        })}
        forecastData={forecastYears.map(() => formatYoYWithColor(0))}
      />

      {/* Comp Set Occupancy */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Comp Set (STR / Trend Report)</span>}
        historicalData={historicalYears.map(year => {
          const data = compSetOccupancyData[year as keyof typeof compSetOccupancyData];
          return data ? `${data.toFixed(1)}%` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Comp Set Occupancy YoY */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => {
          const yoyValue = getCompSetOccupancyYoY(year, index, historicalYears);
          return formatYoYWithColor(yoyValue);
        })}
        forecastData={forecastYears.map(() => formatYoYWithColor(0))}
      />

      {/* Subject Property Occupancy with Dropdown */}
      <MetricRow
        label={
          <div className="flex items-center gap-2">
            <span>&nbsp;&nbsp;&nbsp;Subject Property</span>
            <Select value={occupancyForecastMethod} onValueChange={setOccupancyForecastMethod}>
              <SelectTrigger className="w-32 h-6 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                <SelectItem value="Occupancy" className="text-xs">Occupancy</SelectItem>
                <SelectItem value="YoY Growth" className="text-xs">YoY Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
        historicalData={historicalYears.map(year => formatPercent(historicalData.occupancy[year] || 0))}
        forecastData={forecastYears.map(year => {
          if (occupancyForecastMethod === "Occupancy") {
            return "";
          } else {
            return formatPercent(calculateOccupancyFromYoY(year));
          }
        })}
        isEditable={occupancyForecastMethod === "Occupancy"}
        editableData={occupancyForecast}
        onEditableChange={handleOccupancyChange}
        forecastYears={forecastYears}
      />

      {/* Subject Property Occupancy YoY */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => {
          const yoyValue = getHistoricalOccupancyYoY(year, index, historicalYears, historicalData.occupancy);
          return formatYoYWithColor(yoyValue);
        })}
        forecastData={forecastYears.map((year, index) => {
          if (occupancyForecastMethod === "YoY Growth") {
            return "";
          } else {
            return calculateForecastYoY(year, index);
          }
        })}
        isEditable={occupancyForecastMethod === "YoY Growth"}
        editableData={occupancyYoYGrowth}
        onEditableChange={handleOccupancyYoYChange}
        forecastYears={forecastYears}
        isYoYRow={true}
      />

      {/* Index Calculations */}
      {/* Comp Set Index to Market */}
      <MetricRow
        label={<span className="italic">&nbsp;&nbsp;&nbsp;Comp Set Index to Market</span>}
        historicalData={historicalYears.map(year => {
          const market = marketOccupancyData[year as keyof typeof marketOccupancyData];
          const compSet = compSetOccupancyData[year as keyof typeof compSetOccupancyData];
          return market && compSet ? calculateIndex(compSet, market) : "-";
        })}
        forecastData={forecastYears.map(() => "0.0%")}
      />

      {/* Property Index to Comp Set */}
      <MetricRow
        label={<span className="italic">&nbsp;&nbsp;&nbsp;Property Index to Comp Set</span>}
        historicalData={historicalYears.map(year => {
          const compSet = compSetOccupancyData[year as keyof typeof compSetOccupancyData];
          const property = historicalData.occupancy[year];
          return compSet && property ? calculateIndex(property, compSet) : "-";
        })}
        forecastData={forecastYears.map(() => "0.0%")}
      />

      {/* Property Index to Market */}
      <MetricRow
        label={<span className="italic">&nbsp;&nbsp;&nbsp;Property Index to Market</span>}
        historicalData={historicalYears.map(year => {
          const market = marketOccupancyData[year as keyof typeof marketOccupancyData];
          const property = historicalData.occupancy[year];
          return market && property ? calculateIndex(property, market) : "-";
        })}
        forecastData={forecastYears.map(() => "0.0%")}
      />

      {/* Rooms/Keys - moved to end */}
      <MetricRow
        label="Rooms/Keys"
        historicalData={historicalYears.map(() => roomsKeys)}
        forecastData={forecastYears.map(() => roomsKeys)}
      />

      {/* Occupied Rooms - moved to end */}
      <MetricRow
        label="Occupied Rooms"
        historicalData={historicalYears.map(year => getHistoricalOccupiedRooms(year).toLocaleString())}
        forecastData={forecastYears.map(year => getForecastOccupiedRooms(year).toLocaleString())}
      />
    </>
  );
};

export default OccupancySection;
