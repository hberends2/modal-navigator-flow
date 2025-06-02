
import { useState } from 'react';

export const useRevenueCalculations = () => {
  // State for growth rate settings
  const [revparGrowthType, setRevparGrowthType] = useState<string>("flat");
  const [flatRevparGrowth, setFlatRevparGrowth] = useState<string>("3.0");
  const [yearlyRevparGrowth, setYearlyRevparGrowth] = useState<Record<number, string>>({
    2025: "3.0",
    2026: "3.0", 
    2027: "3.0",
    2028: "3.0",
    2029: "3.0"
  });
  
  // State for occupancy forecast
  const [occupancyForecast, setOccupancyForecast] = useState<Record<number, string>>({
    2025: "75.0",
    2026: "77.0",
    2027: "78.0", 
    2028: "79.0",
    2029: "80.0"
  });

  // State for occupancy forecasting method and YoY growth inputs
  const [occupancyForecastMethod, setOccupancyForecastMethod] = useState<string>("Occupancy");
  const [occupancyYoYGrowth, setOccupancyYoYGrowth] = useState<Record<number, string>>({
    2025: "6.7",
    2026: "2.7",
    2027: "1.3",
    2028: "1.3",
    2029: "1.3"
  });

  const handleYearlyRevparChange = (year: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.-]/g, "");
    setYearlyRevparGrowth(prev => ({
      ...prev,
      [year]: sanitizedValue
    }));
  };

  const handleOccupancyChange = (year: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    setOccupancyForecast(prev => ({
      ...prev,
      [year]: sanitizedValue
    }));
  };

  const handleOccupancyYoYChange = (year: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.-]/g, "");
    setOccupancyYoYGrowth(prev => ({
      ...prev,
      [year]: sanitizedValue
    }));
  };

  return {
    revparGrowthType,
    setRevparGrowthType,
    flatRevparGrowth,
    setFlatRevparGrowth,
    yearlyRevparGrowth,
    handleYearlyRevparChange,
    occupancyForecast,
    handleOccupancyChange,
    occupancyForecastMethod,
    setOccupancyForecastMethod,
    occupancyYoYGrowth,
    handleOccupancyYoYChange
  };
};
