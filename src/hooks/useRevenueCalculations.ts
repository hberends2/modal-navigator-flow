
import { useState } from 'react';

export const useRevenueCalculations = () => {
  // State for ADR growth rate settings (replacing RevPAR growth)
  const [adrGrowthType, setAdrGrowthType] = useState<string>("flat");
  const [flatAdrGrowth, setFlatAdrGrowth] = useState<string>("0.0");
  const [yearlyAdrGrowth, setYearlyAdrGrowth] = useState<Record<number, string>>({
    2025: "0.0",
    2026: "0.0", 
    2027: "0.0",
    2028: "0.0",
    2029: "0.0"
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

  const formatPercentageInput = (value: string): string => {
    const numValue = parseFloat(value.replace(/[^0-9.-]/g, ""));
    return isNaN(numValue) ? "0.0" : numValue.toFixed(1);
  };

  const handleYearlyAdrChange = (year: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.-]/g, "");
    const formattedValue = formatPercentageInput(sanitizedValue);
    setYearlyAdrGrowth(prev => ({
      ...prev,
      [year]: formattedValue
    }));
  };

  const handleFlatAdrChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9.-]/g, "");
    const formattedValue = formatPercentageInput(sanitizedValue);
    setFlatAdrGrowth(formattedValue);
  };

  const handleOccupancyChange = (year: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    const formattedValue = formatPercentageInput(sanitizedValue);
    setOccupancyForecast(prev => ({
      ...prev,
      [year]: formattedValue
    }));
  };

  const handleOccupancyYoYChange = (year: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.-]/g, "");
    const formattedValue = formatPercentageInput(sanitizedValue);
    setOccupancyYoYGrowth(prev => ({
      ...prev,
      [year]: formattedValue
    }));
  };

  return {
    adrGrowthType,
    setAdrGrowthType,
    flatAdrGrowth,
    setFlatAdrGrowth: handleFlatAdrChange,
    yearlyAdrGrowth,
    handleYearlyAdrChange,
    occupancyForecast,
    handleOccupancyChange,
    occupancyForecastMethod,
    setOccupancyForecastMethod,
    occupancyYoYGrowth,
    handleOccupancyYoYChange
  };
};
