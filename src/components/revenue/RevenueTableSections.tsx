
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
import ExpenseSection from "./ExpenseSection";
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
  helpers,
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
  return (
    <TableBody>
      {/* Section anchor for Occupancy */}
      <tr id="occupancy-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
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

      <tr id="adr-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
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

      <tr id="revpar-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <RevPARSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        getForecastRevpar={getForecastRevpar}
      />

      <tr id="rooms-revenue-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <RoomsRevenueSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        getForecastRoomsRevenue={getForecastRoomsRevenue}
        formatCurrency={formatCurrency}
      />

      <tr id="other-operated-revenue-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <MetricRow
        label={<span className="font-bold text-gray-900">Other Operated Revenue</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

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

      <MetricRow
        label={<span className="font-medium">Total Other Operated Revenue</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(helpers.calculateTotalOtherOperatedRevenue(year, true))
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(helpers.calculateTotalOtherOperatedRevenue(year, false))
        )}
      />

      <tr id="total-revenue-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

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

      {/* Expense Section */}
      <ExpenseSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
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
        formatCurrency={formatCurrency}
        formatPercent={formatPercent}
        helpers={helpers}
      />
    </TableBody>
  );
};

export default RevenueTableSections;
