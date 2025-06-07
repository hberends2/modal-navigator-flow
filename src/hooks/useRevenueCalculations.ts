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
    2929: "1.3"
  });

  // State for Food & Beverage per occupied room
  const [fbPerOccupiedRoom, setFbPerOccupiedRoom] = useState<Record<number, string>>({
    2025: "0",
    2026: "0",
    2027: "0",
    2028: "0",
    2929: "0"
  });

  const formatPercentageInput = (value: string): string => {
    // Remove any non-numeric characters except decimal point and negative sign
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    return isNaN(numValue) ? "0.0" : numValue.toFixed(1);
  };

  const formatIntegerInput = (value: string): string => {
    // Remove any non-numeric characters except negative sign
    const cleanValue = value.replace(/[^0-9-]/g, "");
    const numValue = parseInt(cleanValue);
    return isNaN(numValue) ? "0" : numValue.toString();
  };

  const handleYearlyAdrChange = (year: number, value: string) => {
    // Allow raw input during typing, don't format immediately
    setYearlyAdrGrowth(prev => ({
      ...prev,
      [year]: value
    }));
  };

  const handleYearlyAdrBlur = (year: number, value: string) => {
    // Format only on blur
    const formattedValue = formatPercentageInput(value);
    setYearlyAdrGrowth(prev => ({
      ...prev,
      [year]: formattedValue
    }));
  };

  const handleFlatAdrChange = (value: string) => {
    // Allow raw input during typing
    setFlatAdrGrowth(value);
  };

  const handleFlatAdrBlur = (value: string) => {
    // Format only on blur
    const formattedValue = formatPercentageInput(value);
    setFlatAdrGrowth(formattedValue);
  };

  const handleOccupancyChange = (year: number, value: string) => {
    // Allow raw input during typing
    setOccupancyForecast(prev => ({
      ...prev,
      [year]: value
    }));
  };

  const handleOccupancyBlur = (year: number, value: string) => {
    // Format only on blur
    const formattedValue = formatPercentageInput(value);
    setOccupancyForecast(prev => ({
      ...prev,
      [year]: formattedValue
    }));
  };

  const handleOccupancyYoYChange = (year: number, value: string) => {
    // Allow raw input during typing
    setOccupancyYoYGrowth(prev => ({
      ...prev,
      [year]: value
    }));
  };

  const handleOccupancyYoYBlur = (year: number, value: string) => {
    // Format only on blur
    const formattedValue = formatPercentageInput(value);
    setOccupancyYoYGrowth(prev => ({
      ...prev,
      [year]: formattedValue
    }));
  };

  const handleFbPerOccupiedRoomChange = (year: number, value: string) => {
    // Allow raw input during typing
    setFbPerOccupiedRoom(prev => ({
      ...prev,
      [year]: value
    }));
  };

  const handleFbPerOccupiedRoomBlur = (year: number, value: string) => {
    // Format only on blur
    const formattedValue = formatIntegerInput(value);
    setFbPerOccupiedRoom(prev => ({
      ...prev,
      [year]: formattedValue
    }));
  };

  return {
    adrGrowthType,
    setAdrGrowthType,
    flatAdrGrowth,
    setFlatAdrGrowth: handleFlatAdrChange,
    handleFlatAdrBlur,
    yearlyAdrGrowth,
    handleYearlyAdrChange,
    handleYearlyAdrBlur,
    occupancyForecast,
    handleOccupancyChange,
    handleOccupancyBlur,
    occupancyForecastMethod,
    setOccupancyForecastMethod,
    occupancyYoYGrowth,
    handleOccupancyYoYChange,
    handleOccupancyYoYBlur,
    fbPerOccupiedRoom,
    handleFbPerOccupiedRoomChange,
    handleFbPerOccupiedRoomBlur
  };
};