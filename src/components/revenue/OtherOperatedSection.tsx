import React from "react";
import MetricRow from "./MetricRow";

interface OtherOperatedSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  otherOperatedPerOccupiedRoom: Record<number, string>;
  handleOtherOperatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleOtherOperatedPerOccupiedRoomBlur: (year: number, value: string) => void;
  getForecastOccupiedRooms: (year: number) => number;
  formatCurrency: (value: number) => string;
}

const OtherOperatedSection: React.FC<OtherOperatedSectionProps> = ({
  historicalYears,
  forecastYears,
  otherOperatedPerOccupiedRoom,
  handleOtherOperatedPerOccupiedRoomChange,
  handleOtherOperatedPerOccupiedRoomBlur,
  getForecastOccupiedRooms,
  formatCurrency
}) => {
  // Calculate Other Operated Revenue for forecast years
  const calculateOtherOperatedRevenue = (year: number): number => {
    const perRoom = parseFloat(otherOperatedPerOccupiedRoom[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  return (
    <>
      {/* Other Operated Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Other Operated</span>}
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
        editableData={otherOperatedPerOccupiedRoom}
        onEditableChange={handleOtherOperatedPerOccupiedRoomChange}
        onEditableBlur={handleOtherOperatedPerOccupiedRoomBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
        isFbInputRow={true}
      />

      {/* Other Operated Revenue Row */}
      <MetricRow
        label="Other Operated Revenue"
        historicalData={historicalYears.map(() => "-")}
        forecastData={forecastYears.map(year => formatCurrency(calculateOtherOperatedRevenue(year)))}
      />
    </>
  );
};

export default OtherOperatedSection;