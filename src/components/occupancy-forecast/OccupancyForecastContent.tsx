
import React from "react";
import SubjectPropertyTable from "./SubjectPropertyTable";
import MarketTable from "./MarketTable";
import CompSetTable from "./CompSetTable";
import ForecastMethodSelector from "./ForecastMethodSelector";
import ForecastTable from "./ForecastTable";
import { Property } from "../../types/PropertyTypes";
import { useOccupancyForecast } from "../../hooks/useOccupancyForecast";

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
        <div className="flex flex-row flex-nowrap w-full overflow-x-auto space-x-2">
          {/* Subject Property Table */}
          <div className="w-1/3 min-w-[250px]">
            <SubjectPropertyTable
              historicalData={historicalData}
              historicalGrowthRates={historicalGrowthRates}
              avgHistoricalOccupancy={avgHistoricalOccupancy}
              avgHistoricalGrowthRate={avgHistoricalGrowthRate}
              avgHistoricalOccupiedRooms={avgHistoricalOccupiedRooms}
            />
          </div>
          
          {/* Market Table */}
          <div className="w-1/3 min-w-[220px]">
            <MarketTable
              marketData={marketData}
              avgMarketOccupancy={avgMarketOccupancy}
              avgMarketGrowthRate={avgMarketGrowthRate}
            />
          </div>
          
          {/* Comp Set Table */}
          <div className="w-1/3 min-w-[220px]">
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
      
      {/* Forecast Table Component */}
      <div className="md:w-1/3">
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
