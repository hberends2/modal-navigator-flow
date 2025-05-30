
import React from "react";
import HorizontalMarketTable from "./HorizontalMarketTable";
import HorizontalCompSetTable from "./HorizontalCompSetTable";
import ReportSubjectPropertyTable from "./ReportSubjectPropertyTable";
import OccupancyChart from "./OccupancyChart";
import { Property } from "../../types/PropertyTypes";
import { useRevenueData } from "../../contexts/RevenueDataContext";
import { marketOccupancyData, compSetOccupancyData } from "../revenue/revenueData";
import { getLocalData, STORAGE_KEYS } from "../../hooks/database/supabaseClient";

interface OccupancyForecastContentProps {
  property?: Property | null;
}

const OccupancyForecastContent: React.FC<OccupancyForecastContentProps> = ({
  property
}) => {
  const { revenueData } = useRevenueData();

  // Load data from database if context is empty
  const loadedData = React.useMemo(() => {
    if (revenueData) return revenueData;
    
    const allOccupancyData = getLocalData<Record<string, any>>(STORAGE_KEYS.OCCUPANCY_DATA, {});
    const savedData = allOccupancyData['default-property'];
    
    if (savedData) {
      const getAvailableRooms = (year: number) => {
        const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        return savedData.roomsKeys * (isLeapYear ? 366 : 365);
      };
      
      return {
        roomsKeys: savedData.roomsKeys,
        historicalYears: savedData.historicalYears,
        forecastYears: savedData.forecastYears,
        historicalData: savedData.historicalData,
        occupancyForecast: savedData.occupancyForecast,
        getAvailableRooms
      };
    }
    
    return null;
  }, [revenueData]);

  // Default historical years if no data
  const historicalYears = loadedData?.historicalYears || [2021, 2022, 2023, 2024];

  // Create chart data from loaded data
  const getChartData = () => {
    if (!loadedData) {
      return {
        historicalData: [],
        marketData: [],
        compSetData: [],
        forecastData: []
      };
    }

    const { historicalYears, forecastYears, historicalData, occupancyForecast } = loadedData;

    // Convert historical data to chart format
    const historicalChartData = historicalYears.map(year => ({
      year,
      occupancy: (historicalData.occupancy[year] || 0) / 100,
      rooms: property?.rooms || loadedData.roomsKeys || 108
    }));

    // Convert market data to chart format with growth rates
    const marketChartData = historicalYears.map((year, index) => {
      const occupancy = (marketOccupancyData[year as keyof typeof marketOccupancyData] || 0) / 100;
      let growthRate = 0;
      
      if (index > 0) {
        const prevYear = historicalYears[index - 1];
        const prevOccupancy = (marketOccupancyData[prevYear as keyof typeof marketOccupancyData] || 0) / 100;
        if (prevOccupancy > 0) {
          growthRate = ((occupancy - prevOccupancy) / prevOccupancy) * 100;
        }
      }
      
      return {
        year,
        occupancy,
        growthRate
      };
    });

    // Convert comp set data to chart format with growth rates
    const compSetChartData = historicalYears.map((year, index) => {
      const occupancy = (compSetOccupancyData[year as keyof typeof compSetOccupancyData] || 0) / 100;
      let growthRate = 0;
      
      if (index > 0) {
        const prevYear = historicalYears[index - 1];
        const prevOccupancy = (compSetOccupancyData[prevYear as keyof typeof compSetOccupancyData] || 0) / 100;
        if (prevOccupancy > 0) {
          growthRate = ((occupancy - prevOccupancy) / prevOccupancy) * 100;
        }
      }
      
      return {
        year,
        occupancy,
        growthRate
      };
    });

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
