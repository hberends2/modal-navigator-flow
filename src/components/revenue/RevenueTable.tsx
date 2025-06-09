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

  // Helper functions for calculations with safety checks
  const getHistoricalOccupiedRoomsForYear = (year: number) => {
    try {
      if (!getAvailableRooms || !historicalData?.occupancy) return 0;
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
      if (!getAvailableRooms || !occupancyForecast || !calculateOccupancyFromYoY) return 0;
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
      if (!historicalData?.roomsRevenue) return 0;
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
      if (!getForecastRoomsRevenue) return 0;
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

  // Calculate Other Operated Revenue for forecast years with safety checks
  const calculateForecastOtherOperatedRevenue = (year: number, perRoomData: Record<number, string>) => {
    try {
      if (!perRoomData) return 0;
      const perRoom = parseFloat(perRoomData[year] || "0");
      const occupiedRooms = getForecastOccupiedRoomsForYear(year);
      return perRoom * occupiedRooms;
    } catch (error) {
      console.error('Error calculating forecast other operated revenue:', error);
      return 0;
    }
  };

  // Calculate Total Other Operated Revenue with safety checks
  const calculateTotalOtherOperatedRevenue = (year: number, isHistorical: boolean) => {
    try {
      if (isHistorical) {
        if (!historicalData) return 0;
        const fbRevenue = historicalData.fbRevenue?.[year] || 0;
        const otherOperatedRevenue = historicalData.otherOperatedRevenue?.[year] || 0;
        const miscellaneousRevenue = historicalData.miscellaneousRevenue?.[year] || 0;
        const allocatedRevenue = historicalData.allocatedRevenue?.[year] || 0;
        return fbRevenue + otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
      } else {
        const fbRevenue = calculateForecastOtherOperatedRevenue(year, fbPerOccupiedRoom);
        const otherOperatedRevenue = calculateForecastOtherOperatedRevenue(year, otherOperatedPerOccupiedRoom);
        const miscellaneousRevenue = calculateForecastOtherOperatedRevenue(year, miscellaneousPerOccupiedRoom);
        const allocatedRevenue = calculateForecastOtherOperatedRevenue(year, allocatedPerOccupiedRoom);
        return fbRevenue + otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
      }
    } catch (error) {
      console.error('Error calculating total other operated revenue:', error);
      return 0;
    }
  };

  // Calculate Total Revenue with safety checks
  const calculateTotalRevenue = (year: number, isHistorical: boolean) => {
    try {
      const roomsRevenue = isHistorical ? 
        (historicalData?.roomsRevenue?.[year] || 0) : 
        (getForecastRoomsRevenue ? getForecastRoomsRevenue(year) : 0);
      const totalOtherOperatedRevenue = calculateTotalOtherOperatedRevenue(year, isHistorical);
      return roomsRevenue + totalOtherOperatedRevenue;
    } catch (error) {
      console.error('Error calculating total revenue:', error);
      return 0;
    }
  };

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

  try {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-2 h-full overflow-hidden">
        <ScrollArea className="h-full w-full" id="revenue-scroll-area">
          <Table className="relative">
            <RevenueTableHeaders />
            <TableBody>
              {/* Section anchor for Occupancy */}
              <tr id="occupancy-section" className="scroll-mt-4">
                <td colSpan={10} className="h-0 p-0"></td>
              </tr>
              
              {/* Occupancy Section */}
              <OccupancySection
                historicalYears={safeHistoricalYears}
                forecastYears={safeForecastYears}
                roomsKeys={roomsKeys}
                historicalData={historicalData}
                occupancyForecast={occupancyForecast}
                handleOccupancyChange={handleOccupancyChange}
                handleOccupancyBlur={(year, value) => {
                  // The blur handler is now properly implemented in useRevenueCalculations
                  // We don't need to duplicate the logic here - just pass it through
                  console.log('Occupancy blur event passed through:', year, value);
                }}
                occupancyForecastMethod={occupancyForecastMethod}
                setOccupancyForecastMethod={setOccupancyForecastMethod}
                occupancyYoYGrowth={occupancyYoYGrowth}
                handleOccupancyYoYChange={handleOccupancyYoYChange}
                handleOccupancyYoYBlur={(year, value) => {
                  // The blur handler is now properly implemented in useRevenueCalculations
                  // We don't need to duplicate the logic here - just pass it through
                  console.log('Occupancy YoY blur event passed through:', year, value);
                }}
                calculateOccupancyFromYoY={calculateOccupancyFromYoY}
                getAvailableRooms={getAvailableRooms}
                getHistoricalOccupiedRooms={getHistoricalOccupiedRoomsForYear}
                getForecastOccupiedRooms={getForecastOccupiedRoomsForYear}
                formatPercent={formatPercent}
              />

              {/* Section anchor for ADR */}
              <tr id="adr-section" className="scroll-mt-4">
                <td colSpan={10} className="h-0 p-0"></td>
              </tr>
              
              {/* ADR Section */}
              <ADRSection
                historicalYears={safeHistoricalYears}
                forecastYears={safeForecastYears}
                getHistoricalADR={getHistoricalADRForYear}
                getForecastADR={getForecastADRForYear}
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
                historicalYears={safeHistoricalYears}
                forecastYears={safeForecastYears}
                historicalData={historicalData}
                getForecastRevpar={getForecastRevpar}
              />

              {/* Section anchor for Rooms Revenue */}
              <tr id="rooms-revenue-section" className="scroll-mt-4">
                <td colSpan={10} className="h-0 p-0"></td>
              </tr>
              
              {/* Rooms Revenue Section */}
              <RoomsRevenueSection
                historicalYears={safeHistoricalYears}
                forecastYears={safeForecastYears}
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
                historicalData={safeHistoricalYears.map(() => "")}
                forecastData={safeForecastYears.map(() => "")}
                isSectionHeader={true}
              />

              {/* Food & Beverage Section (Indented) */}
              <FoodBeverageSection
                roomsKeys={roomsKeys}
                historicalYears={safeHistoricalYears}
                forecastYears={safeForecastYears}
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
                historicalYears={safeHistoricalYears}
                forecastYears={safeForecastYears}
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
                historicalYears={safeHistoricalYears}
                forecastYears={safeForecastYears}
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
                historicalYears={safeHistoricalYears}
                forecastYears={safeForecastYears}
                historicalData={historicalData}
                allocatedPerOccupiedRoom={allocatedPerOccupiedRoom}
                handleAllocatedPerOccupiedRoomChange={handleAllocatedPerOccupiedRoomChange}
                handleAllocatedPerOccupiedRoomBlur={handleAllocatedPerOccupiedRoomBlur}
                getForecastOccupiedRooms={getForecastOccupiedRoomsForYear}
                formatCurrency={formatCurrency}
                isIndented={true}
              />

              {/* Total Other Operated Revenue Row */}
              <MetricRow
                label={<span className="font-medium">Total Other Operated Revenue</span>}
                historicalData={safeHistoricalYears.map(year => 
                  formatCurrency(calculateTotalOtherOperatedRevenue(year, true))
                )}
                forecastData={safeForecastYears.map(year => 
                  formatCurrency(calculateTotalOtherOperatedRevenue(year, false))
                )}
              />

              {/* Section anchor for Total Revenue */}
              <tr id="total-revenue-section" className="scroll-mt-4">
                <td colSpan={10} className="h-0 p-0"></td>
              </tr>

              {/* Total Revenue Row */}
              <MetricRow
                label={<span className="font-bold text-base">Total Revenue</span>}
                historicalData={safeHistoricalYears.map(year => (
                  <span className="font-bold text-base">
                    {formatCurrency(calculateTotalRevenue(year, true))}
                  </span>
                ))}
                forecastData={safeForecastYears.map(year => (
                  <span className="font-bold text-base">
                    {formatCurrency(calculateTotalRevenue(year, false))}
                  </span>
                ))}
              />
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
