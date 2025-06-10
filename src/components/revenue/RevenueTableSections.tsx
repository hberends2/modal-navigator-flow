import React from "react";
import { TableBody } from "../ui/table";
import OccupancySection from "./OccupancySection";
import ADRSection from "./ADRSection";
import RevPARSection from "./RevPARSection";
import RoomsRevenueSection from "./RoomsRevenueSection";
import FoodBeverageSection from "./FoodBeverageSection";
import ResortFeeSection from "./ResortFeeSection";
import OtherOperatedSection from "./OtherOperatedSection";
import MiscellaneousSection from "./MiscellaneousSection";
import AllocatedSection from "./AllocatedSection";
import MetricRow from "./MetricRow";
import { CalculationHelpers } from "./RevenueTableHelpers";

interface RevenueTableSectionsProps {
  historicalYears: number[];
  forecastYears: number[];
  roomsKeys: number;
  historicalData: any;
  occupancyForecast: Record<number, string>;
  handleOccupancyChange: (year: number, value: string) => void;
  occupancyForecastMethod: string;
  setOccupancyForecastMethod: (value: string) => void;
  occupancyYoYGrowth: Record<number, string>;
  handleOccupancyYoYChange: (year: number, value: string) => void;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  adrGrowthType: string;
  setAdrGrowthType: (value: string) => void;
  flatAdrGrowth: string;
  setFlatAdrGrowth: (value: string) => void;
  yearlyAdrGrowth: Record<number, string>;
  handleYearlyAdrChange: (year: number, value: string) => void;
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
  helpers: CalculationHelpers;
}

const RevenueTableSections: React.FC<RevenueTableSectionsProps> = ({
  historicalYears,
  forecastYears,
  roomsKeys,
  historicalData,
  occupancyForecast,
  handleOccupancyChange,
  occupancyForecastMethod,
  setOccupancyForecastMethod,
  occupancyYoYGrowth,
  handleOccupancyYoYChange,
  calculateOccupancyFromYoY,
  getAvailableRooms,
  adrGrowthType,
  setAdrGrowthType,
  flatAdrGrowth,
  setFlatAdrGrowth,
  yearlyAdrGrowth,
  handleYearlyAdrChange,
  getForecastRevpar,
  getForecastRoomsRevenue,
  fbPerOccupiedRoom,
  handleFbPerOccupiedRoomChange,
  handleFbPerOccupiedRoomBlur,
  resortFeePerOccupiedRoom,
  handleResortFeePerOccupiedRoomChange,
  handleResortFeePerOccupiedRoomBlur,
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
  formatPercent,
  helpers
}) => {
  return (
    <TableBody>
      {/* Section anchor for Occupancy */}
      <tr id="occupancy-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      {/* Occupancy Section */}
      <OccupancySection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        roomsKeys={roomsKeys}
        historicalData={historicalData}
        occupancyForecast={occupancyForecast}
        handleOccupancyChange={handleOccupancyChange}
        handleOccupancyBlur={(year, value) => {
          console.log('Occupancy blur event passed through:', year, value);
        }}
        occupancyForecastMethod={occupancyForecastMethod}
        setOccupancyForecastMethod={setOccupancyForecastMethod}
        occupancyYoYGrowth={occupancyYoYGrowth}
        handleOccupancyYoYChange={handleOccupancyYoYChange}
        handleOccupancyYoYBlur={(year, value) => {
          console.log('Occupancy YoY blur event passed through:', year, value);
        }}
        calculateOccupancyFromYoY={calculateOccupancyFromYoY}
        getAvailableRooms={getAvailableRooms}
        getHistoricalOccupiedRooms={helpers.getHistoricalOccupiedRoomsForYear}
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
        formatPercent={formatPercent}
      />

      {/* Section anchor for ADR */}
      <tr id="adr-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      {/* ADR Section */}
      <ADRSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        getHistoricalADR={helpers.getHistoricalADRForYear}
        getForecastADR={helpers.getForecastADRForYear}
        adrGrowthType={adrGrowthType}
        setAdrGrowthType={setAdrGrowthType}
        flatAdrGrowth={flatAdrGrowth}
        setFlatAdrGrowth={setFlatAdrGrowth}
        handleFlatAdrBlur={(value) => {
          console.log('Flat ADR blur event:', value);
        }}
        yearlyAdrGrowth={yearlyAdrGrowth}
        handleYearlyAdrChange={handleYearlyAdrChange}
        handleYearlyAdrBlur={(year, value) => {
          console.log('Yearly ADR blur event:', year, value);
        }}
      />

      {/* Section anchor for RevPAR */}
      <tr id="revpar-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      {/* RevPAR Section */}
      <RevPARSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        getForecastRevpar={getForecastRevpar}
      />

      {/* Section anchor for Rooms Revenue */}
      <tr id="rooms-revenue-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      {/* Rooms Revenue Section */}
      <RoomsRevenueSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        getForecastRoomsRevenue={getForecastRoomsRevenue}
        formatCurrency={formatCurrency}
      />

      {/* Section anchor for Other Operated Revenue */}
      <tr id="other-operated-revenue-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      {/* Other Operated Revenue Section Header */}
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
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
        formatCurrency={formatCurrency}
        isIndented={true}
      />

      {/* Resort Fee Section (Indented) */}
      <ResortFeeSection
        roomsKeys={roomsKeys}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        resortFeePerOccupiedRoom={resortFeePerOccupiedRoom}
        handleResortFeePerOccupiedRoomChange={handleResortFeePerOccupiedRoomChange}
        handleResortFeePerOccupiedRoomBlur={handleResortFeePerOccupiedRoomBlur}
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
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
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
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
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
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
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
        formatCurrency={formatCurrency}
        isIndented={true}
      />

      {/* Total Other Operated Revenue Row */}
      <MetricRow
        label={<span className="font-medium">Total Other Operated Revenue</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(helpers.calculateTotalOtherOperatedRevenue(year, true))
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(helpers.calculateTotalOtherOperatedRevenue(year, false))
        )}
      />

      {/* Section anchor for Total Revenue */}
      <tr id="total-revenue-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* Total Revenue Row */}
      <MetricRow
        label={<span className="font-bold text-base">Total Revenue</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold text-base">
            {formatCurrency(helpers.calculateTotalRevenue(year, true))}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold text-base">
            {formatCurrency(helpers.calculateTotalRevenue(year, false))}
          </span>
        ))}
      />
    </TableBody>
  );
};

export default RevenueTableSections;
