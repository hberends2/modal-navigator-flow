import React from "react";
import MetricRow from "./MetricRow";

interface FoodBeverageSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  fbPerOccupiedRoom: Record<number, string>;
  handleFbPerOccupiedRoomChange: (year: number, value: string) => void;
  handleFbPerOccupiedRoomBlur: (year: number, value: string) => void;
  getForecastOccupiedRooms: (year: number) => number;
  formatCurrency: (value: number) => string;
}

const FoodBeverageSection: React.FC<FoodBeverageSectionProps> = ({
  historicalYears,
  forecastYears,
  fbPerOccupiedRoom,
  handleFbPerOccupiedRoomChange,
  handleFbPerOccupiedRoomBlur,
  getForecastOccupiedRooms,
  formatCurrency
}) => {
  // Calculate F&B Revenue for forecast years
  const calculateFbRevenue = (year: number): number => {
    const perRoom = parseFloat(fbPerOccupiedRoom[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  return (
    <>
      {/* Food & Beverage Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Food & Beverage</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* $ / Occupied Room Row */}
      <MetricRow
        label="$ / Occupied Room"
        historicalData={historicalYears.map(() => "-")}
        forecastData={forecastYears.map(year => "")}
        isEditable={true}
        editableData={fbPerOccupiedRoom}
        onEditableChange={handleFbPerOccupiedRoomChange}
        onEditableBlur={handleFbPerOccupiedRoomBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
        isFbInputRow={true}
      />

      {/* F&B Revenue Row */}
      <MetricRow
        label="F&B Revenue"
        historicalData={historicalYears.map(() => "-")}
        forecastData={forecastYears.map(year => formatCurrency(calculateFbRevenue(year)))}
      />
    </>
  );
};

export default FoodBeverageSection;