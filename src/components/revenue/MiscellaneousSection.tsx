import React from "react";
import MetricRow from "./MetricRow";

interface MiscellaneousSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  miscellaneousPerOccupiedRoom: Record<number, string>;
  handleMiscellaneousPerOccupiedRoomChange: (year: number, value: string) => void;
  handleMiscellaneousPerOccupiedRoomBlur: (year: number, value: string) => void;
  getForecastOccupiedRooms: (year: number) => number;
  formatCurrency: (value: number) => string;
}

const MiscellaneousSection: React.FC<MiscellaneousSectionProps> = ({
  historicalYears,
  forecastYears,
  miscellaneousPerOccupiedRoom,
  handleMiscellaneousPerOccupiedRoomChange,
  handleMiscellaneousPerOccupiedRoomBlur,
  getForecastOccupiedRooms,
  formatCurrency
}) => {
  // Calculate Miscellaneous Revenue for forecast years
  const calculateMiscellaneousRevenue = (year: number): number => {
    const perRoom = parseFloat(miscellaneousPerOccupiedRoom[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  return (
    <>
      {/* Miscellaneous Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Miscellaneous</span>}
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
        editableData={miscellaneousPerOccupiedRoom}
        onEditableChange={handleMiscellaneousPerOccupiedRoomChange}
        onEditableBlur={handleMiscellaneousPerOccupiedRoomBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
        isFbInputRow={true}
      />

      {/* Miscellaneous Revenue Row */}
      <MetricRow
        label="Miscellaneous Revenue"
        historicalData={historicalYears.map(() => "-")}
        forecastData={forecastYears.map(year => formatCurrency(calculateMiscellaneousRevenue(year)))}
      />
    </>
  );
};

export default MiscellaneousSection;