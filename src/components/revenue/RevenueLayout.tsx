
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import RevenueTable from "./RevenueTable";
import TabbedSummary from "./TabbedSummary";
import { CalculationHelpers } from "./RevenueTableHelpers";
import { RevenueCalculationState } from "../../types/revenue";

interface RevenueLayoutProps {
  activeSection: string;
  handleItemClick: (section: string) => void;
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  revenueCalculations: RevenueCalculationState;
  helpers: CalculationHelpers;
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
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-3">
            <TabbedSummary
              historicalYears={historicalYears}
              forecastYears={forecastYears}
              roomsKeys={roomsKeys}
              helpers={helpers}
              revenueCalculations={revenueCalculations}
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
