
import React from "react";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import RevenueTable from "../components/revenue/RevenueTable";
import KPICards from "../components/revenue/KPICards";
import TabbedSummary from "../components/revenue/TabbedSummary";
import AppSidebar from "../components/AppSidebar";
import { useRevenueCalculations } from "../hooks/useRevenueCalculations";
import { useRevenueData } from "../hooks/useRevenueData";
import { 
  getAvailableRooms, 
  calculateOccupancyFromYoY, 
  calculateForecastADR, 
  calculateRoomsRevenue, 
  calculateRevpar,
  calculateHistoricalADR,
  formatCurrency, 
  formatPercent 
} from "../utils/calculationUtils";

const Revenue = () => {
  const revenueCalculations = useRevenueCalculations();
  const { historicalData, forecastYears, historicalYears, roomsKeys } = useRevenueData();

  // Helper functions with proper error handling
  const getAvailableRoomsForYear = (year: number) => getAvailableRooms(year);
  
  const calculateOccupancyFromYoYForYear = (year: number) => 
    calculateOccupancyFromYoY(year, revenueCalculations.occupancyYoYGrowth, historicalData.occupancy[2024] || 0);
  
  const getForecastADRForYear = (year: number) => {
    const baseADR = calculateHistoricalADR(
      historicalData.roomsRevenue[2024] || 0, 
      Math.round(getAvailableRooms(2024) * (historicalData.occupancy[2024] || 0) / 100)
    );
    return calculateForecastADR(
      year, 
      baseADR, 
      revenueCalculations.adrGrowthType, 
      revenueCalculations.flatAdrGrowth, 
      revenueCalculations.yearlyAdrGrowth
    );
  };
  
  const getForecastRoomsRevenueForYear = (year: number) => {
    const adr = getForecastADRForYear(year);
    const occupancyValue = revenueCalculations.occupancyForecastMethod === "Occupancy" 
      ? parseFloat(revenueCalculations.occupancyForecast[year] || "0")
      : calculateOccupancyFromYoYForYear(year);
    const occupiedRooms = Math.round(getAvailableRooms(year) * occupancyValue / 100);
    return calculateRoomsRevenue(adr, occupiedRooms);
  };
  
  const getForecastRevparForYear = (year: number) => {
    const roomsRevenue = getForecastRoomsRevenueForYear(year);
    return calculateRevpar(roomsRevenue, getAvailableRooms(year));
  };
  
  const getHistoricalADRForYearCalculated = (year: number) => {
    const roomsRevenue = historicalData.roomsRevenue[year] || 0;
    const occupiedRooms = Math.round(getAvailableRooms(year) * (historicalData.occupancy[year] || 0) / 100);
    return calculateHistoricalADR(roomsRevenue, occupiedRooms);
  };

  const handleItemClick = (modalName: string) => {
    console.log("Modal clicked:", modalName);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
        <AppSidebar onItemClick={handleItemClick} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-2 border-b bg-white">
            <SidebarTrigger />
          </div>
          <div className="p-6 flex-1 flex flex-col overflow-hidden">
            <KPICards />

            <div className="sticky top-0 z-10 bg-gray-50 pb-2">
              <TabbedSummary
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
                getForecastADR={getForecastADRForYear}
                getForecastRevpar={getForecastRevparForYear}
                fbPerOccupiedRoom={revenueCalculations.fbPerOccupiedRoom}
                otherOperatedPerOccupiedRoom={revenueCalculations.otherOperatedPerOccupiedRoom}
                miscellaneousPerOccupiedRoom={revenueCalculations.miscellaneousPerOccupiedRoom}
                allocatedPerOccupiedRoom={revenueCalculations.allocatedPerOccupiedRoom}
                formatCurrency={formatCurrency}
                formatPercent={formatPercent}
              />
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
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
                fbPerOccupiedRoom={revenueCalculations.fbPerOccupiedRoom} 
                handleFbPerOccupiedRoomChange={revenueCalculations.handleFbPerOccupiedRoomChange} 
                handleFbPerOccupiedRoomBlur={revenueCalculations.handleFbPerOccupiedRoomBlur}
                otherOperatedPerOccupiedRoom={revenueCalculations.otherOperatedPerOccupiedRoom}
                handleOtherOperatedPerOccupiedRoomChange={revenueCalculations.handleOtherOperatedPerOccupiedRoomChange}
                handleOtherOperatedPerOccupiedRoomBlur={revenueCalculations.handleOtherOperatedPerOccupiedRoomBlur}
                miscellaneousPerOccupiedRoom={revenueCalculations.miscellaneousPerOccupiedRoom}
                handleMiscellaneousPerOccupiedRoomChange={revenueCalculations.handleMiscellaneousPerOccupiedRoomChange}
                handleMiscellaneousPerOccupiedRoomBlur={revenueCalculations.handleMiscellaneousPerOccupiedRoomBlur}
                allocatedPerOccupiedRoom={revenueCalculations.allocatedPerOccupiedRoom}
                handleAllocatedPerOccupiedRoomChange={revenueCalculations.handleAllocatedPerOccupiedRoomChange}
                handleAllocatedPerOccupiedRoomBlur={revenueCalculations.handleAllocatedPerOccupiedRoomBlur}
                formatCurrency={formatCurrency} 
                formatPercent={formatPercent} 
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Revenue;
