
import React from "react";
import HorizontalMarketTable from "./HorizontalMarketTable";
import HorizontalCompSetTable from "./HorizontalCompSetTable";
import ReportSubjectPropertyTable from "./ReportSubjectPropertyTable";
import OccupancyChart from "./OccupancyChart";
import { Property } from "../../types/PropertyTypes";
import { useRevenueData } from "../../contexts/RevenueDataContext";
import { marketOccupancyData, compSetOccupancyData } from "../revenue/revenueData";

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

    // Convert market data to chart format
    const marketChartData = historicalYears.map(year => ({
      year,
      occupancy: (marketOccupancyData[year as keyof typeof marketOccupancyData] || 0) / 100
    }));

    // Convert comp set data to chart format
    const compSetChartData = historicalYears.map(year => ({
      year,
      occupancy: (compSetOccupancyData[year as keyof typeof compSetOccupancyData] || 0) / 100
    }));

    // Convert forecast data to chart format
    const forecastChartData = forecastYears.map(year => ({
      year,
      occupancy: parseFloat(occupancyForecast[year] || "0") / 100,
      growthRate: 0 // Not used in chart
    }));

    return {
      historicalData: historicalChartData,
      marketData: marketChartData,
      compSetData: compSetChartData,
      forecastData: forecastChartData
    };
  };

  const chartData = getChartData();

  return (
    <div className="space-y-6">
      {/* Market Analysis table - full width */}
      <div className="w-full">
        <HorizontalMarketTable historicalYears={historicalYears} />
      </div>

      {/* Comp Set Analysis table - full width */}
      <div className="w-full">
        <HorizontalCompSetTable historicalYears={historicalYears} />
      </div>

      {/* Chart Section */}
      <div className="w-full">
        <OccupancyChart
          historicalData={chartData.historicalData}
          marketData={chartData.marketData}
          compSetData={chartData.compSetData}
          forecastData={chartData.forecastData}
        />
      </div>

      {/* Subject Property Section */}
      <div className="w-full">
        <ReportSubjectPropertyTable />
      </div>
    </div>
  );
};

export default OccupancyForecastContent;
