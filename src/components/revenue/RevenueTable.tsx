
import React from "react";
import { Table, TableBody } from "../ui/table";
import RevenueTableHeaders from "./RevenueTableHeaders";
import MetricRow from "./MetricRow";
import GrowthControls from "./GrowthControls";

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
  // Helper functions for new calculations
  const getHistoricalOccupiedRooms = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancy = historicalData.occupancy[year] / 100; // Convert percentage to decimal
    return Math.round(availableRooms * occupancy);
  };

  const getForecastOccupiedRooms = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancy = parseFloat(occupancyForecast[year] || "0") / 100; // Convert percentage to decimal
    return Math.round(availableRooms * occupancy);
  };

  const getHistoricalADR = (year: number) => {
    const roomsRevenue = historicalData.roomsRevenue[year];
    const occupiedRooms = getHistoricalOccupiedRooms(year);
    return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
  };

  const getForecastADR = (year: number) => {
    const roomsRevenue = getForecastRoomsRevenue(year);
    const occupiedRooms = getForecastOccupiedRooms(year);
    return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
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
              historicalData={historicalYears.map(year => getHistoricalOccupiedRooms(year).toLocaleString())}
              forecastData={forecastYears.map(year => getForecastOccupiedRooms(year).toLocaleString())}
            />

            {/* Rooms Revenue */}
            <MetricRow
              label="Rooms Revenue"
              historicalData={historicalYears.map(year => formatCurrency(historicalData.roomsRevenue[year]))}
              forecastData={forecastYears.map(year => formatCurrency(getForecastRoomsRevenue(year)))}
            />

            {/* RevPAR */}
            <MetricRow
              label="RevPAR"
              historicalData={historicalYears.map(year => `$${historicalData.revpar[year].toFixed(2)}`)}
              forecastData={forecastYears.map(year => `$${getForecastRevpar(year).toFixed(2)}`)}
            />

            {/* RevPAR YoY Growth */}
            <MetricRow
              label={
                <GrowthControls
                  revparGrowthType={revparGrowthType}
                  setRevparGrowthType={setRevparGrowthType}
                  flatRevparGrowth={flatRevparGrowth}
                  setFlatRevparGrowth={setFlatRevparGrowth}
                  yearlyRevparGrowth={yearlyRevparGrowth}
                  handleYearlyRevparChange={handleYearlyRevparChange}
                  forecastYears={forecastYears}
                />
              }
              historicalData={historicalYears.map((year, index) => 
                index === 0 ? "-" : `${historicalData.revparYoY[year].toFixed(1)}%`
              )}
              forecastData={forecastYears.map(year => 
                revparGrowthType === "yearly" ? "" : `${parseFloat(flatRevparGrowth).toFixed(1)}%`
              )}
              isGrowthRow={true}
              revparGrowthType={revparGrowthType}
              yearlyRevparGrowth={yearlyRevparGrowth}
              handleYearlyRevparChange={handleYearlyRevparChange}
              forecastYears={forecastYears}
            />

            {/* ADR */}
            <MetricRow
              label="ADR"
              historicalData={historicalYears.map(year => `$${getHistoricalADR(year).toFixed(2)}`)}
              forecastData={forecastYears.map(year => `$${getForecastADR(year).toFixed(2)}`)}
            />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RevenueTable;
