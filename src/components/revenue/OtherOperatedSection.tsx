import React from "react";
import MetricRow from "./MetricRow";
import { getHistoricalOccupiedRooms, calculateHistoricalPerOccupiedRoom } from "../../utils/revenueUtils";

interface OtherOperatedSectionProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    otherOperatedRevenue: Record<number, number>;
    occupancy: Record<number, number>;
  };
  otherOperatedPerOccupiedRoom: Record<number, string>;
  handleOtherOperatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleOtherOperatedPerOccupiedRoomBlur: (year: number, value: string) => void;
  getForecastOccupiedRooms: (year: number) => number;
  formatCurrency: (value: number) => string;
}

const OtherOperatedSection: React.FC<OtherOperatedSectionProps> = ({
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  otherOperatedPerOccupiedRoom,
  handleOtherOperatedPerOccupiedRoomChange,
  handleOtherOperatedPerOccupiedRoomBlur,
  getForecastOccupiedRooms,
  formatCurrency
}) => {
  // Calculate historical $ per occupied room values
  const getHistoricalPerOccupiedRoom = (year: number): string => {
    const otherOperatedRevenue = historicalData.otherOperatedRevenue[year];
    const occupancyPercent = historicalData.occupancy[year];
    
    if (!otherOperatedRevenue || !occupancyPercent) {
      return "-";
    }
    
    const occupiedRooms = getHistoricalOccupiedRooms(year, roomsKeys, occupancyPercent);
    const perRoom = calculateHistoricalPerOccupiedRoom(otherOperatedRevenue, occupiedRooms);
    return `$${perRoom}`;
  };

  // Calculate Other Operated Revenue for forecast years
  const calculateOtherOperatedRevenue = (year: number): number => {
    const perRoom = parseFloat(otherOperatedPerOccupiedRoom[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  // Calculate historical Other Operated Revenue (for display purposes)
  const getHistoricalOtherOperatedRevenue = (year: number): string => {
    const otherOperatedRevenue = historicalData.otherOperatedRevenue[year];
    return otherOperatedRevenue ? formatCurrency(otherOperatedRevenue) : "-";
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
        historicalData={historicalYears.map(year => getHistoricalPerOccupiedRoom(year))}
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
        historicalData={historicalYears.map(year => getHistoricalOtherOperatedRevenue(year))}
        forecastData={forecastYears.map(year => formatCurrency(calculateOtherOperatedRevenue(year)))}
      />
    </>
  );
};

export default OtherOperatedSection;