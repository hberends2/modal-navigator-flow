
import React from "react";
import HorizontalMarketTable from "./HorizontalMarketTable";
import HorizontalCompSetTable from "./HorizontalCompSetTable";
import HorizontalForecastTable from "./HorizontalForecastTable";
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
      {/* Market Section */}
      <div className="mb-6">
        <HorizontalMarketTable
          marketData={marketData}
          avgMarketOccupancy={avgMarketOccupancy}
          avgMarketGrowthRate={avgMarketGrowthRate}
        />
      </div>

      {/* Comp Set Section */}
      <div className="mb-6">
        <HorizontalCompSetTable
          compSetData={compSetData}
          avgCompSetOccupancy={avgCompSetOccupancy}
          avgCompSetGrowthRate={avgCompSetGrowthRate}
        />
      </div>

      {/* Forecast Occupancy Section */}
      <div className="mb-6">
        <HorizontalForecastTable
          forecastMethod={forecastMethod}
          setForecastMethod={setForecastMethod}
          occupancyValues={occupancyValues}
          historicalData={historicalData}
          historicalGrowthRates={historicalGrowthRates}
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
