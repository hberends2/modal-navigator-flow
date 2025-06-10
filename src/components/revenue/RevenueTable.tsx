
import React from "react";
import RevenueTableContainer from "./RevenueTableContainer";
import { createCalculationHelpers } from "./RevenueTableHelpers";

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
    resortFeeRevenue: Record<number, number>;
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
  resortFeePerOccupiedRoom: Record<number, string>;
  handleResortFeePerOccupiedRoomChange: (year: number, value: string) => void;
  handleResortFeePerOccupiedRoomBlur: (year: number, value: string) => void;
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
  roomsKeys = 108,
  historicalYears = [],
  forecastYears = [],
  historicalData,
  adrGrowthType,
  setAdrGrowthType,
  flatAdrGrowth,
  setFlatAdrGrowth,
  yearlyAdrGrowth = {},
  handleYearlyAdrChange,
  occupancyForecast = {},
  handleOccupancyChange,
  occupancyForecastMethod,
  setOccupancyForecastMethod,
  occupancyYoYGrowth = {},
  handleOccupancyYoYChange,
  calculateOccupancyFromYoY,
  getAvailableRooms,
  getForecastRevpar,
  getForecastRoomsRevenue,
  fbPerOccupiedRoom = {},
  handleFbPerOccupiedRoomChange,
  handleFbPerOccupiedRoomBlur,
  resortFeePerOccupiedRoom = {},
  handleResortFeePerOccupiedRoomChange,
  handleResortFeePerOccupiedRoomBlur,
  otherOperatedPerOccupiedRoom = {},
  handleOtherOperatedPerOccupiedRoomChange,
  handleOtherOperatedPerOccupiedRoomBlur,
  miscellaneousPerOccupiedRoom = {},
  handleMiscellaneousPerOccupiedRoomChange,
  handleMiscellaneousPerOccupiedRoomBlur,
  allocatedPerOccupiedRoom = {},
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

  // Ensure we have valid arrays to prevent indexOf errors
  const safeHistoricalYears = Array.isArray(historicalYears) ? historicalYears : [];
  const safeForecastYears = Array.isArray(forecastYears) ? forecastYears : [];

  // Early return if critical props are missing
  if (!historicalData || !formatCurrency || !formatPercent) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-2">
        <div className="text-gray-600">
          Loading revenue table...
        </div>
      </div>
    );
  }

  // Create calculation helpers
  const helpers = createCalculationHelpers(
    getAvailableRooms,
    historicalData,
    occupancyForecast,
    occupancyForecastMethod,
    calculateOccupancyFromYoY,
    getForecastRoomsRevenue,
    fbPerOccupiedRoom,
    resortFeePerOccupiedRoom,
    otherOperatedPerOccupiedRoom,
    miscellaneousPerOccupiedRoom,
    allocatedPerOccupiedRoom
  );

  try {
    return (
      <RevenueTableContainer
        historicalYears={safeHistoricalYears}
        forecastYears={safeForecastYears}
        roomsKeys={roomsKeys}
        historicalData={historicalData}
        occupancyForecast={occupancyForecast}
        handleOccupancyChange={handleOccupancyChange}
        occupancyForecastMethod={occupancyForecastMethod}
        setOccupancyForecastMethod={setOccupancyForecastMethod}
        occupancyYoYGrowth={occupancyYoYGrowth}
        handleOccupancyYoYChange={handleOccupancyYoYChange}
        calculateOccupancyFromYoY={calculateOccupancyFromYoY}
        getAvailableRooms={getAvailableRooms}
        adrGrowthType={adrGrowthType}
        setAdrGrowthType={setAdrGrowthType}
        flatAdrGrowth={flatAdrGrowth}
        setFlatAdrGrowth={setFlatAdrGrowth}
        yearlyAdrGrowth={yearlyAdrGrowth}
        handleYearlyAdrChange={handleYearlyAdrChange}
        getForecastRevpar={getForecastRevpar}
        getForecastRoomsRevenue={getForecastRoomsRevenue}
        fbPerOccupiedRoom={fbPerOccupiedRoom}
        handleFbPerOccupiedRoomChange={handleFbPerOccupiedRoomChange}
        handleFbPerOccupiedRoomBlur={handleFbPerOccupiedRoomBlur}
        resortFeePerOccupiedRoom={resortFeePerOccupiedRoom}
        handleResortFeePerOccupiedRoomChange={handleResortFeePerOccupiedRoomChange}
        handleResortFeePerOccupiedRoomBlur={handleResortFeePerOccupiedRoomBlur}
        otherOperatedPerOccupiedRoom={otherOperatedPerOccupiedRoom}
        handleOtherOperatedPerOccupiedRoomChange={handleOtherOperatedPerOccupiedRoomChange}
        handleOtherOperatedPerOccupiedRoomBlur={handleOtherOperatedPerOccupiedRoomBlur}
        miscellaneousPerOccupiedRoom={miscellaneousPerOccupiedRoom}
        handleMiscellaneousPerOccupiedRoomChange={handleMiscellaneousPerOccupiedRoomChange}
        handleMiscellaneousPerOccupiedRoomBlur={handleMiscellaneousPerOccupiedRoomBlur}
        allocatedPerOccupiedRoom={allocatedPerOccupiedRoom}
        handleAllocatedPerOccupiedRoomChange={handleAllocatedPerOccupiedRoomChange}
        handleAllocatedPerOccupiedRoomBlur={handleAllocatedPerOccupiedRoomBlur}
        formatCurrency={formatCurrency}
        formatPercent={formatPercent}
        helpers={helpers}
      />
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
