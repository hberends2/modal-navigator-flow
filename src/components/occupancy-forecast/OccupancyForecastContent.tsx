
import React from "react";
import ReportMarketTable from "./ReportMarketTable";
import ReportCompSetTable from "./ReportCompSetTable";
import ReportSubjectPropertyTable from "./ReportSubjectPropertyTable";
import OccupancyChart from "./OccupancyChart";
import { Property } from "../../types/PropertyTypes";
import { useRevenueData } from "../../contexts/RevenueDataContext";

interface OccupancyForecastContentProps {
  property?: Property | null;
}

const OccupancyForecastContent: React.FC<OccupancyForecastContentProps> = ({
  property
}) => {
  const { revenueData } = useRevenueData();

  // Default historical years if no revenue data
  const historicalYears = revenueData?.historicalYears || [2021, 2022, 2023, 2024];

  // Create chart data from revenue data if available
  const getChartData = () => {
    if (!revenueData) {
      return {
        historicalData: [],
        marketData: [],
        compSetData: [],
        forecastData: []
      };
    }

    const { historicalYears, forecastYears, historicalData, occupancyForecast } = revenueData;

    // Convert historical data to chart format
    const historicalChartData = historicalYears.map(year => ({
      year,
      occupancy: (historicalData.occupancy[year] || 0) / 100,
      rooms: property?.rooms || 108
    }));

    // Convert forecast data to chart format
    const forecastChartData = forecastYears.map(year => ({
      year,
      occupancy: parseFloat(occupancyForecast[year] || "0") / 100,
      growthRate: 0 // Not used in chart
    }));

    return {
      historicalData: historicalChartData,
      marketData: [], // Empty for now, can be populated if needed
      compSetData: [], // Empty for now, can be populated if needed
      forecastData: forecastChartData
    };
  };

  const chartData = getChartData();

  return (
    <>
      {/* Top Section: Market Analysis, Comp Set Analysis, and Chart */}
      <div className="mb-6 flex gap-6">
        <div className="flex flex-col gap-6">
          {/* Market Section */}
          <ReportMarketTable historicalYears={historicalYears} />

          {/* Comp Set Section */}
          <ReportCompSetTable historicalYears={historicalYears} />
        </div>

        {/* Chart Section */}
        <div className="flex-1">
          <OccupancyChart
            historicalData={chartData.historicalData}
            marketData={chartData.marketData}
            compSetData={chartData.compSetData}
            forecastData={chartData.forecastData}
          />
        </div>
      </div>

      {/* Subject Property Section */}
      <div className="mb-6">
        <ReportSubjectPropertyTable />
      </div>
    </>
  );
};

export default OccupancyForecastContent;
