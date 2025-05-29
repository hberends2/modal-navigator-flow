
import React from "react";
import { Table, TableBody } from "../ui/table";
import RevenueTableHeaders from "./RevenueTableHeaders";
import MetricRow from "./MetricRow";
import RevPARSection from "./RevPARSection";
import ADRSection from "./ADRSection";
import { getHistoricalOccupiedRooms, getForecastOccupiedRooms, getHistoricalADR, getForecastADR } from "./revenueCalculations";

interface RevenueTableProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    roomsRevenue: Record<number, number>;
    revpar: Record<number, number>;
    revparYoY: Record<number, number>;
    occupancy: Record<number, number>;
  };
  revparGrowthType: string;
  setRevparGrowthType: (value: string) => void;
  flatRevparGrowth: string;
  setFlatRevparGrowth: (value: string) => void;
  yearlyRevparGrowth: Record<number, string>;
  handleYearlyRevparChange: (year: number, value: string) => void;
  occupancyForecast: Record<number, string>;
  handleOccupancyChange: (year: number, value: string) => void;
  getAvailableRooms: (year: number) => number;
  getForecastRevpar: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
}

const RevenueTable: React.FC<RevenueTableProps> = ({
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  revparGrowthType,
  setRevparGrowthType,
  flatRevparGrowth,
  setFlatRevparGrowth,
  yearlyRevparGrowth,
  handleYearlyRevparChange,
  occupancyForecast,
  handleOccupancyChange,
  getAvailableRooms,
  getForecastRevpar,
  getForecastRoomsRevenue,
  formatCurrency,
  formatPercent
}) => {
  // Helper functions for calculations
  const getHistoricalOccupiedRoomsForYear = (year: number) => {
    return getHistoricalOccupiedRooms(year, getAvailableRooms, historicalData.occupancy[year]);
  };

  const getForecastOccupiedRoomsForYear = (year: number) => {
    return getForecastOccupiedRooms(year, getAvailableRooms, occupancyForecast[year]);
  };

  const getHistoricalADRForYear = (year: number) => {
    const roomsRevenue = historicalData.roomsRevenue[year];
    const occupiedRooms = getHistoricalOccupiedRoomsForYear(year);
    return getHistoricalADR(year, roomsRevenue, occupiedRooms);
  };

  const getForecastADRForYear = (year: number) => {
    const roomsRevenue = getForecastRoomsRevenue(year);
    const occupiedRooms = getForecastOccupiedRoomsForYear(year);
    return getForecastADR(roomsRevenue, occupiedRooms);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="overflow-x-auto">
        <Table>
          <RevenueTableHeaders />
          <TableBody>
            {/* Rooms/Keys */}
            <MetricRow
              label="Rooms/Keys"
              historicalData={historicalYears.map(() => roomsKeys)}
              forecastData={forecastYears.map(() => roomsKeys)}
            />

            {/* Occupancy - moved to be directly below Rooms/Keys */}
            <MetricRow
              label="Occupancy"
              historicalData={historicalYears.map(year => formatPercent(historicalData.occupancy[year]))}
              forecastData={forecastYears.map(() => "")}
              isEditable={true}
              editableData={occupancyForecast}
              onEditableChange={handleOccupancyChange}
              forecastYears={forecastYears}
            />

            {/* Occupied Rooms */}
            <MetricRow
              label="Occupied Rooms"
              historicalData={historicalYears.map(year => getHistoricalOccupiedRoomsForYear(year).toLocaleString())}
              forecastData={forecastYears.map(year => getForecastOccupiedRoomsForYear(year).toLocaleString())}
            />

            {/* Rooms Revenue */}
            <MetricRow
              label="Rooms Revenue"
              historicalData={historicalYears.map(year => formatCurrency(historicalData.roomsRevenue[year]))}
              forecastData={forecastYears.map(year => formatCurrency(getForecastRoomsRevenue(year)))}
            />

            {/* RevPAR Section */}
            <RevPARSection
              historicalYears={historicalYears}
              forecastYears={forecastYears}
              historicalData={historicalData}
              revparGrowthType={revparGrowthType}
              setRevparGrowthType={setRevparGrowthType}
              flatRevparGrowth={flatRevparGrowth}
              setFlatRevparGrowth={setFlatRevparGrowth}
              yearlyRevparGrowth={yearlyRevparGrowth}
              handleYearlyRevparChange={handleYearlyRevparChange}
              getForecastRevpar={getForecastRevpar}
            />

            {/* ADR Section */}
            <ADRSection
              historicalYears={historicalYears}
              forecastYears={forecastYears}
              getHistoricalADR={getHistoricalADRForYear}
              getForecastADR={getForecastADRForYear}
            />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RevenueTable;
