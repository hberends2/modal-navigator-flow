
import React from "react";
import { Button } from "../components/ui/button";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
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
  getForecastADR,
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

  const getForecastADRForYear = (year: number) => 
    getForecastADR(
      year, 
      forecastYears, 
      getHistoricalADRForYear(2024, historicalData.roomsRevenue[2024] || 0, roomsKeys, historicalData.occupancy[2024] || 0),
      revenueCalculations.adrGrowthType, 
      revenueCalculations.flatAdrGrowth, 
      revenueCalculations.yearlyAdrGrowth
    );

  const getForecastRoomsRevenueForYear = (year: number) => {
    const adr = getForecastADRForYear(year);
    const occupancyValue = revenueCalculations.occupancyForecastMethod === "Occupancy" 
      ? revenueCalculations.occupancyForecast[year] || "0"
      : calculateOccupancyFromYoYForYear(year).toString();
    return getForecastRoomsRevenue(year, adr, roomsKeys, occupancyValue);
  };

  const getForecastRevparForYear = (year: number) => {
    const roomsRevenue = getForecastRoomsRevenueForYear(year);
    return getForecastRevpar(year, roomsRevenue, roomsKeys);
  };

  const getHistoricalADRForYearCalculated = (year: number) => 
    getHistoricalADRForYear(
      year, 
      historicalData.roomsRevenue[year] || 0, 
      roomsKeys, 
      historicalData.occupancy[year] || 0
    );

  const getForecastADRForYearCalculated = (year: number) => {
    return getForecastADRForYear(year);
  };

  const handleSave = () => {
    console.log("Saving revenue data:", {
      adrGrowthType: revenueCalculations.adrGrowthType,
      flatAdrGrowth: revenueCalculations.flatAdrGrowth,
      yearlyAdrGrowth: revenueCalculations.yearlyAdrGrowth,
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
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
        <Sidebar onItemClick={handleItemClick} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-2">
            <SidebarTrigger />
          </div>
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
                adrGrowthType={revenueCalculations.adrGrowthType}
                setAdrGrowthType={revenueCalculations.setAdrGrowthType}
                flatAdrGrowth={revenueCalculations.flatAdrGrowth}
                setFlatAdrGrowth={revenueCalculations.setFlatAdrGrowth}
                yearlyAdrGrowth={revenueCalculations.yearlyAdrGrowth}
                handleYearlyAdrChange={revenueCalculations.handleYearlyAdrChange}
                occupancyForecast={revenueCalculations.occupancyForecast}
                handleOccupancyChange={revenueCalculations.handleOccupancyChange}
                occupancyForecastMethod={revenueCalculations.occupancyForecastMethod}
                setOccupancyForecastMethod={revenueCalculations.setOccupancyForecastMethod}
                occupancyYoYGrowth={revenueCalculations.occupancyYoYGrowth}
                handleOccupancyYoYChange={revenueCalculations.handleOccupancyYoYChange}
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
    </SidebarProvider>
  );
};

export default Revenue;
