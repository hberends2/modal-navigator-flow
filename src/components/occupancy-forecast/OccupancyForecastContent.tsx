
import React from "react";
import HistoricalOccupancyTable from "./HistoricalOccupancyTable";
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
      {/* Historical Occupancy Table Component */}
      <HistoricalOccupancyTable 
        historicalData={historicalData}
        historicalGrowthRates={historicalGrowthRates}
        avgHistoricalOccupancy={avgHistoricalOccupancy}
        avgHistoricalGrowthRate={avgHistoricalGrowthRate}
        avgHistoricalOccupiedRooms={avgHistoricalOccupiedRooms}
        marketData={marketData}
        avgMarketOccupancy={avgMarketOccupancy}
        avgMarketGrowthRate={avgMarketGrowthRate}
        compSetData={compSetData}
        avgCompSetOccupancy={avgCompSetOccupancy}
        avgCompSetGrowthRate={avgCompSetGrowthRate}
      />
      
      {/* Forecast Method Selector Component */}
      <ForecastMethodSelector 
        forecastMethod={forecastMethod}
        setForecastMethod={setForecastMethod}
      />
      
      {/* Forecast Table Component */}
      <ForecastTable 
        forecastMethod={forecastMethod}
        occupancyValues={occupancyValues}
        handleOccupancyChange={handleOccupancyChange}
        handleGrowthRateChange={handleGrowthRateChange}
      />
      
      {loading && (
        <div className="text-center py-2">
          <p className="text-blue-500">Saving data...</p>
        </div>
      )}
    </>
  );
};

export default OccupancyForecastContent;
