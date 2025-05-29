
import React from "react";
import MetricRow from "./MetricRow";
import { marketOccupancyData, compSetOccupancyData } from "./revenueData";
import { getMarketOccupancyYoY, getCompSetOccupancyYoY, getHistoricalOccupancyYoY, formatYoYWithColor } from "./revenueCalculations";

interface OccupancySectionProps {
  historicalYears: number[];
  forecastYears: number[];
  roomsKeys: number;
  historicalData: {
    occupancy: Record<number, number>;
  };
  occupancyForecast: Record<number, string>;
  handleOccupancyChange: (year: number, value: string) => void;
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

  return (
    <>
      {/* Occupancy Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Occupancy</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
      />

      {/* Rooms/Keys */}
      <MetricRow
        label="Rooms/Keys"
        historicalData={historicalYears.map(() => roomsKeys)}
        forecastData={forecastYears.map(() => roomsKeys)}
      />

      {/* Occupied Rooms */}
      <MetricRow
        label="Occupied Rooms"
        historicalData={historicalYears.map(year => getHistoricalOccupiedRooms(year).toLocaleString())}
        forecastData={forecastYears.map(year => getForecastOccupiedRooms(year).toLocaleString())}
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

      {/* Subject Property Occupancy */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Occupancy</span>}
        historicalData={historicalYears.map(year => formatPercent(historicalData.occupancy[year] || 0))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
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
        forecastData={forecastYears.map(() => formatYoYWithColor(0))}
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
    </>
  );
};

export default OccupancySection;
