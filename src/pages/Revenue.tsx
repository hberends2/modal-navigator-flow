
import React from "react";
import { Button } from "../components/ui/button";
import RevenueTable from "../components/revenue/RevenueTable";
import KPICards from "../components/revenue/KPICards";
import FixedSummaryRows from "../components/revenue/FixedSummaryRows";
import Sidebar from "../components/Sidebar";
import { useRevenueCalculations } from "../hooks/useRevenueCalculations";
import { useRevenueData } from "../hooks/useRevenueData";
import { 
  getAvailableRooms, 
  calculateOccupancyFromYoY, 
  getForecastRevpar, 
  getForecastRoomsRevenue,
  getHistoricalADRForYear,
  getForecastADRForYear,
  formatCurrency,
  formatPercent
} from "../utils/revenueUtils";

const Revenue = () => {
  console.log('Revenue component rendering');
  
  const roomsKeys = 108;
  
  // Use custom hooks for state management and data
  const revenueCalculations = useRevenueCalculations();
  const { historicalData, forecastYears, historicalYears } = useRevenueData(roomsKeys);

  // Helper functions that use the current state
  const getAvailableRoomsForYear = (year: number) => getAvailableRooms(year, roomsKeys);
  
  const calculateOccupancyFromYoYForYear = (year: number) => 
    calculateOccupancyFromYoY(
      year, 
      forecastYears, 
      revenueCalculations.occupancyYoYGrowth, 
      historicalData.occupancy[2024] || 0
    );

  const getForecastRevparForYear = (year: number) => 
    getForecastRevpar(
      year, 
      forecastYears, 
      historicalData.revpar[2024], 
      revenueCalculations.revparGrowthType, 
      revenueCalculations.flatRevparGrowth, 
      revenueCalculations.yearlyRevparGrowth
    );

  const getForecastRoomsRevenueForYear = (year: number) => {
    const revpar = getForecastRevparForYear(year);
    return getForecastRoomsRevenue(year, revpar, roomsKeys);
  };

  const getHistoricalADRForYearCalculated = (year: number) => 
    getHistoricalADRForYear(
      year, 
      historicalData.roomsRevenue[year] || 0, 
      roomsKeys, 
      historicalData.occupancy[year] || 0
    );

  const getForecastADRForYearCalculated = (year: number) => {
    const roomsRevenue = getForecastRoomsRevenueForYear(year);
    const occupancyValue = revenueCalculations.occupancyForecastMethod === "Occupancy" 
      ? revenueCalculations.occupancyForecast[year] || "0"
      : calculateOccupancyFromYoYForYear(year).toString();
    return getForecastADRForYear(year, roomsRevenue, roomsKeys, occupancyValue);
  };

  const handleSave = () => {
    console.log("Saving revenue data:", {
      revparGrowthType: revenueCalculations.revparGrowthType,
      flatRevparGrowth: revenueCalculations.flatRevparGrowth,
      yearlyRevparGrowth: revenueCalculations.yearlyRevparGrowth,
      occupancyForecast: revenueCalculations.occupancyForecast,
      occupancyForecastMethod: revenueCalculations.occupancyForecastMethod,
      occupancyYoYGrowth: revenueCalculations.occupancyYoYGrowth
    });
    // TODO: Implement save functionality
  };

  const handleItemClick = (modalName: string) => {
    console.log("Modal clicked:", modalName);
    // TODO: Implement modal functionality
  };

  console.log('About to render Revenue component');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar onItemClick={handleItemClick} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-1 flex flex-col">
          {/* KPI Cards */}
          <KPICards />

          {/* Fixed Summary Rows */}
          <div className="sticky top-0 z-10 bg-gray-50 pb-4">
            <FixedSummaryRows
              roomsKeys={roomsKeys}
              historicalYears={historicalYears}
              forecastYears={forecastYears}
              historicalData={historicalData}
              occupancyForecast={revenueCalculations.occupancyForecast}
              occupancyForecastMethod={revenueCalculations.occupancyForecastMethod}
              calculateOccupancyFromYoY={calculateOccupancyFromYoYForYear}
              getAvailableRooms={getAvailableRoomsForYear}
              getForecastRoomsRevenue={getForecastRoomsRevenueForYear}
              getHistoricalADR={getHistoricalADRForYearCalculated}
              getForecastADR={getForecastADRForYearCalculated}
              getForecastRevpar={getForecastRevparForYear}
              formatCurrency={formatCurrency}
              formatPercent={formatPercent}
            />
          </div>

          {/* Revenue Table - takes remaining space */}
          <div className="flex-1 min-h-0">
            <RevenueTable
              roomsKeys={roomsKeys}
              historicalYears={historicalYears}
              forecastYears={forecastYears}
              historicalData={historicalData}
              {...revenueCalculations}
              calculateOccupancyFromYoY={calculateOccupancyFromYoYForYear}
              getAvailableRooms={getAvailableRoomsForYear}
              getForecastRevpar={getForecastRevparForYear}
              getForecastRoomsRevenue={getForecastRoomsRevenueForYear}
              formatCurrency={formatCurrency}
              formatPercent={formatPercent}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="px-8">
              Save Revenue Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
