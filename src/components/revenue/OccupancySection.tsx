
import React from "react";
import MetricRow from "./MetricRow";
import GrowthControls from "./GrowthControls";

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
  return (
    <>
      {/* Occupancy Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Occupancy</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Rooms/Keys */}
      <MetricRow
        label="Rooms/Keys"
        historicalData={historicalYears.map(() => roomsKeys.toLocaleString())}
        forecastData={forecastYears.map(() => roomsKeys.toLocaleString())}
      />

      {/* Available Rooms */}
      <MetricRow
        label="Available Rooms"
        historicalData={historicalYears.map(year => getAvailableRooms(year).toLocaleString())}
        forecastData={forecastYears.map(year => getAvailableRooms(year).toLocaleString())}
      />

      {/* Occupied Rooms */}
      <MetricRow
        label="Occupied Rooms"
        historicalData={historicalYears.map(year => getHistoricalOccupiedRooms(year).toLocaleString())}
        forecastData={forecastYears.map(year => getForecastOccupiedRooms(year).toLocaleString())}
      />

      {/* Subject Property Occupancy */}
      <MetricRow
        label={
          <div className="flex items-center gap-2">
            <span>Subject Property Occupancy</span>
            <GrowthControls
              growthType={occupancyForecastMethod}
              setGrowthType={setOccupancyForecastMethod}
              options={[
                { value: "Occupancy", label: "Occupancy" },
                { value: "YoY Growth", label: "YoY Growth" }
              ]}
            />
          </div>
        }
        historicalData={historicalYears.map(year => formatPercent(historicalData.occupancy[year] || 0))}
        forecastData={forecastYears.map(year => {
          if (occupancyForecastMethod === "Occupancy") {
            return formatPercent(parseFloat(occupancyForecast[year] || "0"));
          } else {
            return formatPercent(calculateOccupancyFromYoY(year));
          }
        })}
        isEditable={occupancyForecastMethod === "Occupancy"}
        editableData={occupancyForecast}
        onEditableChange={handleOccupancyChange}
        forecastYears={forecastYears}
      />

      {/* Subject Property Occupancy YoY Growth */}
      <MetricRow
        label="Subject Property Occupancy YoY"
        historicalData={historicalYears.map((year, index) => {
          if (index === 0) return "-";
          const currentOccupancy = historicalData.occupancy[year] || 0;
          const previousYear = historicalYears[index - 1];
          const previousOccupancy = historicalData.occupancy[previousYear] || 0;
          const yoy = ((currentOccupancy - previousOccupancy) / previousOccupancy) * 100;
          return (
            <span className={yoy >= 0 ? "text-green-600" : "text-red-600"}>
              {formatPercent(yoy)}
            </span>
          );
        })}
        forecastData={forecastYears.map((year, index) => {
          if (occupancyForecastMethod === "YoY Growth") {
            const yoyValue = parseFloat(occupancyYoYGrowth[year] || "0");
            return (
              <span className={yoyValue >= 0 ? "text-green-600" : "text-red-600"}>
                {formatPercent(yoyValue)}
              </span>
            );
          } else {
            // Calculate YoY from occupancy values
            let currentOccupancy, previousOccupancy;
            if (index === 0) {
              currentOccupancy = parseFloat(occupancyForecast[year] || "0");
              previousOccupancy = historicalData.occupancy[2024] || 0;
            } else {
              currentOccupancy = parseFloat(occupancyForecast[year] || "0");
              const previousYear = forecastYears[index - 1];
              previousOccupancy = parseFloat(occupancyForecast[previousYear] || "0");
            }
            const yoy = ((currentOccupancy - previousOccupancy) / previousOccupancy) * 100;
            return (
              <span className={yoy >= 0 ? "text-green-600" : "text-red-600"}>
                {formatPercent(yoy)}
              </span>
            );
          }
        })}
        isEditable={occupancyForecastMethod === "YoY Growth"}
        editableData={occupancyYoYGrowth}
        onEditableChange={handleOccupancyYoYChange}
        forecastYears={forecastYears}
        isYoYRow={true}
      />
    </>
  );
};

export default OccupancySection;
