
import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import RevenueTable from "./RevenueTable";
import KPICards from "./KPICards";
import TabbedSummary from "./TabbedSummary";
import AppSidebar from "../AppSidebar";
import { formatCurrency, formatPercent } from "../../utils/calculationUtils";

interface RevenueLayoutProps {
  activeSection: string | null;
  handleItemClick: (modalName: string) => void;
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  revenueCalculations: any;
  helpers: any;
}

const RevenueLayout: React.FC<RevenueLayoutProps> = ({
  activeSection,
  handleItemClick,
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  revenueCalculations,
  helpers
}) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
        <AppSidebar onItemClick={handleItemClick} activeSection={activeSection} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-2 border-b bg-white">
            <SidebarTrigger />
          </div>
          <div className="p-6 flex-1 flex flex-col overflow-hidden">
            <KPICards />

            <div className="sticky top-0 z-10 bg-gray-50 pb-0">
              <TabbedSummary
                roomsKeys={roomsKeys}
                historicalYears={historicalYears}
                forecastYears={forecastYears}
                historicalData={historicalData}
                occupancyForecast={revenueCalculations.occupancyForecast}
                occupancyForecastMethod={revenueCalculations.occupancyForecastMethod}
                calculateOccupancyFromYoY={helpers.calculateOccupancyFromYoYForYear}
                getAvailableRooms={helpers.getAvailableRoomsForYear}
                getForecastRoomsRevenue={helpers.getForecastRoomsRevenueForYear}
                getHistoricalADR={helpers.getHistoricalADRForYearCalculated}
                getForecastADR={helpers.getForecastADRForYear}
                getForecastRevpar={helpers.getForecastRevparForYear}
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
                calculateOccupancyFromYoY={helpers.calculateOccupancyFromYoYForYear} 
                getAvailableRooms={helpers.getAvailableRoomsForYear} 
                getForecastRevpar={helpers.getForecastRevparForYear} 
                getForecastRoomsRevenue={helpers.getForecastRoomsRevenueForYear} 
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

export default RevenueLayout;
