import React from "react";
import MetricRow from "./MetricRow";
import { getHistoricalOccupiedRooms, calculateHistoricalPerOccupiedRoom } from "../../utils/revenueUtils";

interface AllocatedSectionProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    allocatedRevenue: Record<number, number>;
    occupancy: Record<number, number>;
  };
  allocatedPerOccupiedRoom: Record<number, string>;
  handleAllocatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleAllocatedPerOccupiedRoomBlur: (year: number, value: string) => void;
  getForecastOccupiedRooms: (year: number) => number;
  formatCurrency: (value: number) => string;
}

const AllocatedSection: React.FC<AllocatedSectionProps> = ({
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  allocatedPerOccupiedRoom,
  handleAllocatedPerOccupiedRoomChange,
  handleAllocatedPerOccupiedRoomBlur,
  getForecastOccupiedRooms,
  formatCurrency
}) => {
  // Calculate historical $ per occupied room values
  const getHistoricalPerOccupiedRoom = (year: number): string => {
    const allocatedRevenue = historicalData.allocatedRevenue[year];
    const occupancyPercent = historicalData.occupancy[year];
    
    if (!allocatedRevenue || !occupancyPercent) {
      return "-";
    }
    
    const occupiedRooms = getHistoricalOccupiedRooms(year, roomsKeys, occupancyPercent);
    const perRoom = calculateHistoricalPerOccupiedRoom(allocatedRevenue, occupiedRooms);
    return `$${perRoom}`;
  };

  // Calculate Allocated Revenue for forecast years
  const calculateAllocatedRevenue = (year: number): number => {
    const perRoom = parseFloat(allocatedPerOccupiedRoom[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  // Calculate historical Allocated Revenue (for display purposes)
  const getHistoricalAllocatedRevenue = (year: number): string => {
    const allocatedRevenue = historicalData.allocatedRevenue[year];
    return allocatedRevenue ? formatCurrency(allocatedRevenue) : "-";
  };

  return (
    <>
      {/* Allocated Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Allocated</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* $ / Occupied Room / Year Row */}
      <MetricRow
        label="$ / Occupied Room / Year"
        historicalData={historicalYears.map(year => getHistoricalPerOccupiedRoom(year))}
        forecastData={forecastYears.map(year => "")}
        isEditable={true}
        editableData={allocatedPerOccupiedRoom}
        onEditableChange={handleAllocatedPerOccupiedRoomChange}
        onEditableBlur={handleAllocatedPerOccupiedRoomBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
        isFbInputRow={true}
      />

      {/* Allocated Revenue Row */}
      <MetricRow
        label="Allocated Revenue"
        historicalData={historicalYears.map(year => getHistoricalAllocatedRevenue(year))}
        forecastData={forecastYears.map(year => formatCurrency(calculateAllocatedRevenue(year)))}
      />
    </>
  );
};

export default AllocatedSection;