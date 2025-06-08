import React from "react";
import { Table, TableBody } from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
import RevenueTableHeaders from "./RevenueTableHeaders";
import OccupancySection from "./OccupancySection";
import RoomsRevenueSection from "./RoomsRevenueSection";
import FoodBeverageSection from "./FoodBeverageSection";
import OtherOperatedSection from "./OtherOperatedSection";
import MiscellaneousSection from "./MiscellaneousSection";
import AllocatedSection from "./AllocatedSection";
import RevPARSection from "./RevPARSection";
import ADRSection from "./ADRSection";
import MetricRow from "./MetricRow";
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
    fbRevenue: Record<number, number>;
    otherOperatedRevenue: Record<number, number>;
    miscellaneousRevenue: Record<number, number>;
    allocatedRevenue: Record<number, number>;
  };
  adrGrowthType: string;
  setAdrGrowthType: (value: string) => void;
  flatAdrGrowth: string;
  setFlatAdrGrowth: (value: string) => void;
  yearlyAdrGrowth: Record<number, string>;
  handleYearlyAdrChange: (year: number, value: string) => void;
  occupancyForecast: Record<number, string>;
  handleOccupancyChange: (year: number, value: string) => void;
  occupancyForecastMethod: string;
  setOccupancyForecastMethod: (value: string) => void;
  occupancyYoYGrowth: Record<number, string>;
  handleOccupancyYoYChange: (year: number, value: string) => void;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  getForecastRevpar: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  fbPerOccupiedRoom: Record<number, string>;
  handleFbPerOccupiedRoomChange: (year: number, value: string) => void;
  handleFbPerOccupiedRoomBlur: (year: number, value: string) => void;
  otherOperatedPerOccupiedRoom: Record<number, string>;
  handleOtherOperatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleOtherOperatedPerOccupiedRoomBlur: (year: number, value: string) => void;
  miscellaneousPerOccupiedRoom: Record<number, string>;
  handleMiscellaneousPerOccupiedRoomChange: (year: number, value: string) => void;
  handleMiscellaneousPerOccupiedRoomBlur: (year: number, value: string) => void;
  allocatedPerOccupiedRoom: Record<number, string>;
  handleAllocatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleAllocatedPerOccupiedRoomBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
}

const RevenueTable: React.FC<RevenueTableProps> = ({
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  adrGrowthType,
  setAdrGrowthType,
  flatAdrGrowth,
  setFlatAdrGrowth,
  yearlyAdrGrowth,
  handleYearlyAdrChange,
  occupancyForecast,
  handleOccupancyChange,
  occupancyForecastMethod,
  setOccupancyForecastMethod,
  occupancyYoYGrowth,
  handleOccupancyYoYChange,
  calculateOccupancyFromYoY,
  getAvailableRooms,
  getForecastRevpar,
  getForecastRoomsRevenue,
  fbPerOccupiedRoom,
  handleFbPerOccupiedRoomChange,
  handleFbPerOccupiedRoomBlur,
  otherOperatedPerOccupiedRoom,
  handleOtherOperatedPerOccupiedRoomChange,
  handleOtherOperatedPerOccupiedRoomBlur,
  miscellaneousPerOccupiedRoom,
  handleMiscellaneousPerOccupiedRoomChange,
  handleMiscellaneousPerOccupiedRoomBlur,
  allocatedPerOccupiedRoom,
  handleAllocatedPerOccupiedRoomChange,
  handleAllocatedPerOccupiedRoomBlur,
  formatCurrency,
  formatPercent
}) => {
  console.log('RevenueTable rendering with props:', {
    roomsKeys,
    historicalYears,
    forecastYears,
    adrGrowthType,
    occupancyForecastMethod
  });

  // Helper functions for calculations
  const getHistoricalOccupiedRoomsForYear = (year: number) => {
    try {
      const result = getHistoricalOccupiedRooms(year, getAvailableRooms, historicalData.occupancy[year] || 0);
      console.log('Historical occupied rooms for', year, ':', result);
      return result;
    } catch (error) {
      console.error('Error calculating historical occupied rooms:', error);
      return 0;
    }
  };

  const getForecastOccupiedRoomsForYear = (year: number) => {
    try {
      const occupancyValue = occupancyForecastMethod === "Occupancy" 
        ? occupancyForecast[year] || "0"
        : calculateOccupancyFromYoY(year).toString();
      const result = getForecastOccupiedRooms(year, getAvailableRooms, occupancyValue);
      console.log('Forecast occupied rooms for', year, ':', result);
      return result;
    } catch (error) {
      console.error('Error calculating forecast occupied rooms:', error);
      return 0;
    }
  };

  const getHistoricalADRForYear = (year: number) => {
    try {
      const roomsRevenue = historicalData.roomsRevenue[year] || 0;
      const occupiedRooms = getHistoricalOccupiedRoomsForYear(year);
      const result = getHistoricalADR(year, roomsRevenue, occupiedRooms);
      console.log('Historical ADR for', year, ':', result);
      return result;
    } catch (error) {
      console.error('Error calculating historical ADR:', error);
      return 0;
    }
  };

  const getForecastADRForYear = (year: number) => {
    try {
      const roomsRevenue = getForecastRoomsRevenue(year);
      const occupiedRooms = getForecastOccupiedRoomsForYear(year);
      const result = getForecastADR(roomsRevenue, occupiedRooms);
      console.log('Forecast ADR for', year, ':', result);
      return result;
    } catch (error) {
      console.error('Error calculating forecast ADR:', error);
      return 0;
    }
  };

  try {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-2 h-full overflow-hidden">
        <ScrollArea className="h-full w-full\" id="revenue-scroll-area">
          <Table>
            <RevenueTableHeaders />
            <TableBody>
              {/* Occupancy Section */}
              <div id="occupancy-section" className="scroll-mt-4">
                <OccupancySection
                  historicalYears={historicalYears}
                  forecastYears={forecastYears}
                  roomsKeys={roomsKeys}
                  historicalData={historicalData}
                  occupancyForecast={occupancyForecast}
                  handleOccupancyChange={handleOccupancyChange}
                  handleOccupancyBlur={(year, value) => {
                    // This will be handled by the revenue calculations hook
                    console.log('Occupancy blur event:', year, value);
                  }}
                  occupancyForecastMethod={occupancyForecastMethod}
                  setOccupancyForecastMethod={setOccupancyForecastMethod}
                  occupancyYoYGrowth={occupancyYoYGrowth}
                  handleOccupancyYoYChange={handleOccupancyYoYChange}
                  handleOccupancyYoYBlur={(year, value) => {
                    // This will be handled by the revenue calculations hook
                    console.log('Occupancy YoY blur event:', year, value);
                  }}
                  calculateOccupancyFromYoY={calculateOccupancyFromYoY}
                  getAvailableRooms={getAvailableRooms}
                  getHistoricalOccupiedRooms={getHistoricalOccupiedRoomsForYear}
                  getForecastOccupiedRooms={getForecastOccupiedRoomsForYear}
                  formatPercent={formatPercent}
                />
              </div>

              {/* ADR Section */}
              <div id="adr-section" className="scroll-mt-4">
                <ADRSection
                  historicalYears={historicalYears}
                  forecastYears={forecastYears}
                  getHistoricalADR={getHistoricalADRForYear}
                  getForecastADR={getForecastADRForYear}
                  adrGrowthType={adrGrowthType}
                  setAdrGrowthType={setAdrGrowthType}
                  flatAdrGrowth={flatAdrGrowth}
                  setFlatAdrGrowth={setFlatAdrGrowth}
                  handleFlatAdrBlur={(value) => {
                    // This will be handled by the revenue calculations hook
                    console.log('Flat ADR blur event:', value);
                  }}
                  yearlyAdrGrowth={yearlyAdrGrowth}
                  handleYearlyAdrChange={handleYearlyAdrChange}
                  handleYearlyAdrBlur={(year, value) => {
                    // This will be handled by the revenue calculations hook
                    console.log('Yearly ADR blur event:', year, value);
                  }}
                />
              </div>

              {/* RevPAR Section */}
              <div id="revpar-section" className="scroll-mt-4">
                <RevPARSection
                  historicalYears={historicalYears}
                  forecastYears={forecastYears}
                  historicalData={historicalData}
                  getForecastRevpar={getForecastRevpar}
                />
              </div>

              {/* Rooms Revenue Section */}
              <div id="rooms-revenue-section" className="scroll-mt-4">
                <RoomsRevenueSection
                  historicalYears={historicalYears}
                  forecastYears={forecastYears}
                  historicalData={historicalData}
                  getForecastRoomsRevenue={getForecastRoomsRevenue}
                  formatCurrency={formatCurrency}
                />
              </div>

              {/* Other Operated Revenue Section Header */}
              <div id="other-operated-revenue-section" className="scroll-mt-4">
                <MetricRow
                  label={<span className="font-bold text-gray-900">Other Operated Revenue</span>}
                  historicalData={historicalYears.map(() => "")}
                  forecastData={forecastYears.map(() => "")}
                  isSectionHeader={true}
                />

                {/* Food & Beverage Section (Indented) */}
                <FoodBeverageSection
                  roomsKeys={roomsKeys}
                  historicalYears={historicalYears}
                  forecastYears={forecastYears}
                  historicalData={historicalData}
                  fbPerOccupiedRoom={fbPerOccupiedRoom}
                  handleFbPerOccupiedRoomChange={handleFbPerOccupiedRoomChange}
                  handleFbPerOccupiedRoomBlur={handleFbPerOccupiedRoomBlur}
                  getForecastOccupiedRooms={getForecastOccupiedRoomsForYear}
                  formatCurrency={formatCurrency}
                  isIndented={true}
                />

                {/* Other Operated Section (Indented) */}
                <OtherOperatedSection
                  roomsKeys={roomsKeys}
                  historicalYears={historicalYears}
                  forecastYears={forecastYears}
                  historicalData={historicalData}
                  otherOperatedPerOccupiedRoom={otherOperatedPerOccupiedRoom}
                  handleOtherOperatedPerOccupiedRoomChange={handleOtherOperatedPerOccupiedRoomChange}
                  handleOtherOperatedPerOccupiedRoomBlur={handleOtherOperatedPerOccupiedRoomBlur}
                  getForecastOccupiedRooms={getForecastOccupiedRoomsForYear}
                  formatCurrency={formatCurrency}
                  isIndented={true}
                />

                {/* Miscellaneous Section (Indented) */}
                <MiscellaneousSection
                  roomsKeys={roomsKeys}
                  historicalYears={historicalYears}
                  forecastYears={forecastYears}
                  historicalData={historicalData}
                  miscellaneousPerOccupiedRoom={miscellaneousPerOccupiedRoom}
                  handleMiscellaneousPerOccupiedRoomChange={handleMiscellaneousPerOccupiedRoomChange}
                  handleMiscellaneousPerOccupiedRoomBlur={handleMiscellaneousPerOccupiedRoomBlur}
                  getForecastOccupiedRooms={getForecastOccupiedRoomsForYear}
                  formatCurrency={formatCurrency}
                  isIndented={true}
                />

                {/* Allocated Section (Indented) */}
                <AllocatedSection
                  roomsKeys={roomsKeys}
                  historicalYears={historicalYears}
                  forecastYears={forecastYears}
                  historicalData={historicalData}
                  allocatedPerOccupiedRoom={allocatedPerOccupiedRoom}
                  handleAllocatedPerOccupiedRoomChange={handleAllocatedPerOccupiedRoomChange}
                  handleAllocatedPerOccupiedRoomBlur={handleAllocatedPerOccupiedRoomBlur}
                  getForecastOccupiedRooms={getForecastOccupiedRoomsForYear}
                  formatCurrency={formatCurrency}
                  isIndented={true}
                />
              </div>
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    );
  } catch (error) {
    console.error('Error rendering RevenueTable:', error);
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-2">
        <div className="text-red-600">
          Error loading revenue table. Please check the console for details.
        </div>
      </div>
    );
  }
};

export default RevenueTable;