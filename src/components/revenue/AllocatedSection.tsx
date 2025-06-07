import React from "react";
import MetricRow from "./MetricRow";

interface AllocatedSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  allocatedPerOccupiedRoom: Record<number, string>;
  handleAllocatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleAllocatedPerOccupiedRoomBlur: (year: number, value: string) => void;
  getForecastOccupiedRooms: (year: number) => number;
  formatCurrency: (value: number) => string;
}

const AllocatedSection: React.FC<AllocatedSectionProps> = ({
  historicalYears,
  forecastYears,
  allocatedPerOccupiedRoom,
  handleAllocatedPerOccupiedRoomChange,
  handleAllocatedPerOccupiedRoomBlur,
  getForecastOccupiedRooms,
  formatCurrency
}) => {
  // Calculate Allocated Revenue for forecast years
  const calculateAllocatedRevenue = (year: number): number => {
    const perRoom = parseFloat(allocatedPerOccupiedRoom[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
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
        historicalData={historicalYears.map(() => "-")}
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
        historicalData={historicalYears.map(() => "-")}
        forecastData={forecastYears.map(year => formatCurrency(calculateAllocatedRevenue(year)))}
      />
    </>
  );
};

export default AllocatedSection;