
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
  expenseForecastMethod: string;
  setExpenseForecastMethod: (value: string) => void;
  roomsExpenseInput: Record<number, string>;
  handleRoomsExpenseChange: (year: number, value: string) => void;
  handleRoomsExpenseBlur: (year: number, value: string) => void;
  fbExpenseInput: Record<number, string>;
  handleFbExpenseChange: (year: number, value: string) => void;
  handleFbExpenseBlur: (year: number, value: string) => void;
  resortFeeExpenseInput: Record<number, string>;
  handleResortFeeExpenseChange: (year: number, value: string) => void;
  handleResortFeeExpenseBlur: (year: number, value: string) => void;
  otherOperatedExpenseInput: Record<number, string>;
  handleOtherOperatedExpenseChange: (year: number, value: string) => void;
  handleOtherOperatedExpenseBlur: (year: number, value: string) => void;
  miscellaneousExpenseInput: Record<number, string>;
  handleMiscellaneousExpenseChange: (year: number, value: string) => void;
  handleMiscellaneousExpenseBlur: (year: number, value: string) => void;
  allocatedExpenseInput: Record<number, string>;
  handleAllocatedExpenseChange: (year: number, value: string) => void;
  handleAllocatedExpenseBlur: (year: number, value: string) => void;
  propertyOperationsExpenseInput: Record<number, string>;
  handlePropertyOperationsExpenseChange: (year: number, value: string) => void;
  handlePropertyOperationsExpenseBlur: (year: number, value: string) => void;
  administrativeGeneralExpenseInput: Record<number, string>;
  handleAdministrativeGeneralExpenseChange: (year: number, value: string) => void;
  handleAdministrativeGeneralExpenseBlur: (year: number, value: string) => void;
  infoTechServicesExpenseInput: Record<number, string>;
  handleInfoTechServicesExpenseChange: (year: number, value: string) => void;
  handleInfoTechServicesExpenseBlur: (year: number, value: string) => void;
  salesMarketingExpenseInput: Record<number, string>;
  handleSalesMarketingExpenseChange: (year: number, value: string) => void;
  handleSalesMarketingExpenseBlur: (year: number, value: string) => void;
  utilitiesExpenseInput: Record<number, string>;
  handleUtilitiesExpenseChange: (year: number, value: string) => void;
  handleUtilitiesExpenseBlur: (year: number, value: string) => void;
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
  formatPercent,
  expenseForecastMethod,
  setExpenseForecastMethod,
  roomsExpenseInput,
  handleRoomsExpenseChange,
  handleRoomsExpenseBlur,
  fbExpenseInput,
  handleFbExpenseChange,
  handleFbExpenseBlur,
  resortFeeExpenseInput,
  handleResortFeeExpenseChange,
  handleResortFeeExpenseBlur,
  otherOperatedExpenseInput,
  handleOtherOperatedExpenseChange,
  handleOtherOperatedExpenseBlur,
  miscellaneousExpenseInput,
  handleMiscellaneousExpenseChange,
  handleMiscellaneousExpenseBlur,
  allocatedExpenseInput,
  handleAllocatedExpenseChange,
  handleAllocatedExpenseBlur,
  propertyOperationsExpenseInput,
  handlePropertyOperationsExpenseChange,
  handlePropertyOperationsExpenseBlur,
  administrativeGeneralExpenseInput,
  handleAdministrativeGeneralExpenseChange,
  handleAdministrativeGeneralExpenseBlur,
  infoTechServicesExpenseInput,
  handleInfoTechServicesExpenseChange,
  handleInfoTechServicesExpenseBlur,
  salesMarketingExpenseInput,
  handleSalesMarketingExpenseChange,
  handleSalesMarketingExpenseBlur,
  utilitiesExpenseInput,
  handleUtilitiesExpenseChange,
  handleUtilitiesExpenseBlur
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
        expenseForecastMethod={expenseForecastMethod}
        setExpenseForecastMethod={setExpenseForecastMethod}
        roomsExpenseInput={roomsExpenseInput}
        handleRoomsExpenseChange={handleRoomsExpenseChange}
        handleRoomsExpenseBlur={handleRoomsExpenseBlur}
        fbExpenseInput={fbExpenseInput}
        handleFbExpenseChange={handleFbExpenseChange}
        handleFbExpenseBlur={handleFbExpenseBlur}
        resortFeeExpenseInput={resortFeeExpenseInput}
        handleResortFeeExpenseChange={handleResortFeeExpenseChange}
        handleResortFeeExpenseBlur={handleResortFeeExpenseBlur}
        otherOperatedExpenseInput={otherOperatedExpenseInput}
        handleOtherOperatedExpenseChange={handleOtherOperatedExpenseChange}
        handleOtherOperatedExpenseBlur={handleOtherOperatedExpenseBlur}
        miscellaneousExpenseInput={miscellaneousExpenseInput}
        handleMiscellaneousExpenseChange={handleMiscellaneousExpenseChange}
        handleMiscellaneousExpenseBlur={handleMiscellaneousExpenseBlur}
        allocatedExpenseInput={allocatedExpenseInput}
        handleAllocatedExpenseChange={handleAllocatedExpenseChange}
        handleAllocatedExpenseBlur={handleAllocatedExpenseBlur}
        propertyOperationsExpenseInput={propertyOperationsExpenseInput}
        handlePropertyOperationsExpenseChange={handlePropertyOperationsExpenseChange}
        handlePropertyOperationsExpenseBlur={handlePropertyOperationsExpenseBlur}
        administrativeGeneralExpenseInput={administrativeGeneralExpenseInput}
        handleAdministrativeGeneralExpenseChange={handleAdministrativeGeneralExpenseChange}
        handleAdministrativeGeneralExpenseBlur={handleAdministrativeGeneralExpenseBlur}
        infoTechServicesExpenseInput={infoTechServicesExpenseInput}
        handleInfoTechServicesExpenseChange={handleInfoTechServicesExpenseChange}
        handleInfoTechServicesExpenseBlur={handleInfoTechServicesExpenseBlur}
        salesMarketingExpenseInput={salesMarketingExpenseInput}
        handleSalesMarketingExpenseChange={handleSalesMarketingExpenseChange}
        handleSalesMarketingExpenseBlur={handleSalesMarketingExpenseBlur}
        utilitiesExpenseInput={utilitiesExpenseInput}
        handleUtilitiesExpenseChange={handleUtilitiesExpenseChange}
        handleUtilitiesExpenseBlur={handleUtilitiesExpenseBlur}
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
