
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import RevenueTable from "./RevenueTable";
import TabbedSummary from "./TabbedSummary";
import { RevenueCalculationState } from "../../types/revenue";

interface RevenueLayoutProps {
  activeSection: string;
  handleItemClick: (section: string) => void;
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  revenueCalculations: RevenueCalculationState;
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
    <div className="flex flex-col h-full bg-gray-50 w-full">
      <div className="flex-1 overflow-hidden">
        <ScrollArea id="revenue-scroll-area" className="h-full">
          <div className="p-6 space-y-0.75">
            <TabbedSummary
              historicalYears={historicalYears}
              forecastYears={forecastYears}
              roomsKeys={roomsKeys}
              historicalData={historicalData}
              occupancyForecast={revenueCalculations.occupancyForecast}
              occupancyForecastMethod={revenueCalculations.occupancyForecastMethod}
              calculateOccupancyFromYoY={helpers.calculateOccupancyFromYoY}
              getAvailableRooms={helpers.getAvailableRooms}
              getHistoricalADR={helpers.getHistoricalADR}
              getForecastADR={helpers.getForecastADR}
              getForecastRevpar={helpers.getForecastRevpar}
              getForecastRoomsRevenue={helpers.getForecastRoomsRevenue}
              fbPerOccupiedRoom={revenueCalculations.fbPerOccupiedRoom}
              resortFeePerOccupiedRoom={revenueCalculations.resortFeePerOccupiedRoom}
              otherOperatedPerOccupiedRoom={revenueCalculations.otherOperatedPerOccupiedRoom}
              miscellaneousPerOccupiedRoom={revenueCalculations.miscellaneousPerOccupiedRoom}
              allocatedPerOccupiedRoom={revenueCalculations.allocatedPerOccupiedRoom}
              formatCurrency={helpers.formatCurrency}
              formatPercent={helpers.formatPercent}
            />
            
            <RevenueTable
              roomsKeys={roomsKeys}
              historicalYears={historicalYears}
              forecastYears={forecastYears}
              historicalData={historicalData}
              {...revenueCalculations}
              getAvailableRooms={helpers.getAvailableRooms}
              getForecastRevpar={helpers.getForecastRevpar}
              getForecastRoomsRevenue={helpers.getForecastRoomsRevenue}
              calculateOccupancyFromYoY={helpers.calculateOccupancyFromYoY}
              formatCurrency={helpers.formatCurrency}
              formatPercent={helpers.formatPercent}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RevenueLayout;
