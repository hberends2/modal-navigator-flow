
import React from "react";
import SubjectPropertyTable from "./SubjectPropertyTable";
import MarketTable from "./MarketTable";
import CompSetTable from "./CompSetTable";
import ForecastMethodSelector from "./ForecastMethodSelector";
import ForecastTable from "./ForecastTable";
import { Property } from "../../types/PropertyTypes";
import { useOccupancyForecast } from "../../hooks/useOccupancyForecast";
import { Separator } from "../ui/separator";

interface OccupancyForecastContentProps {
  property?: Property | null;
}

const OccupancyForecastContent: React.FC<OccupancyForecastContentProps> = ({
  property
}) => {
  const {
    historicalData,
    historicalGrowthRates,
    avgHistoricalOccupancy,
    avgHistoricalGrowthRate,
    avgHistoricalOccupiedRooms,
    marketData,
    avgMarketOccupancy,
    avgMarketGrowthRate,
    compSetData,
    avgCompSetOccupancy,
    avgCompSetGrowthRate,
    forecastMethod,
    setForecastMethod,
    occupancyValues,
    handleOccupancyChange,
    handleGrowthRateChange,
    loading
  } = useOccupancyForecast(property);

  return (
    <>
      {/* Historical Occupancy Reference Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Historical Occupancy Reference</h3>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Subject Property Table - Takes more width */}
          <div className="md:w-1/2">
            <SubjectPropertyTable
              historicalData={historicalData}
              historicalGrowthRates={historicalGrowthRates}
              avgHistoricalOccupancy={avgHistoricalOccupancy}
              avgHistoricalGrowthRate={avgHistoricalGrowthRate}
              avgHistoricalOccupiedRooms={avgHistoricalOccupiedRooms}
            />
          </div>
          
          {/* Vertical Separator */}
          <div className="hidden md:block">
            <Separator orientation="vertical" className="h-full" />
          </div>
          
          {/* Market and Comp Set Tables Container */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {/* Market Table */}
            <MarketTable
              marketData={marketData}
              avgMarketOccupancy={avgMarketOccupancy}
              avgMarketGrowthRate={avgMarketGrowthRate}
            />
            
            {/* Comp Set Table */}
            <CompSetTable
              compSetData={compSetData}
              avgCompSetOccupancy={avgCompSetOccupancy}
              avgCompSetGrowthRate={avgCompSetGrowthRate}
            />
          </div>
        </div>
      </div>
      
      {/* Forecast Method Selector Component */}
      <ForecastMethodSelector 
        forecastMethod={forecastMethod}
        setForecastMethod={setForecastMethod}
      />
      
      {/* Forecast Table Component - Maintained width consistent with Subject Property table */}
      <div className="md:w-1/2">
        <ForecastTable 
          forecastMethod={forecastMethod}
          occupancyValues={occupancyValues}
          handleOccupancyChange={handleOccupancyChange}
          handleGrowthRateChange={handleGrowthRateChange}
        />
      </div>
      
      {loading && (
        <div className="text-center py-2">
          <p className="text-blue-500">Saving data...</p>
        </div>
      )}
    </>
  );
};

export default OccupancyForecastContent;
