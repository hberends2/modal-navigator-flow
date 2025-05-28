
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import RevenueTable from "../components/revenue/RevenueTable";
import Sidebar from "../components/Sidebar";

const Revenue = () => {
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

  // Constants
  const roomsKeys = 108;
  const forecastYears = [2025, 2026, 2027, 2028, 2029];
  const historicalYears = [2021, 2022, 2023, 2024];
  
  // Function definitions (moved before usage)
  const getAvailableRooms = (year: number) => {
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    return roomsKeys * (isLeapYear ? 366 : 365);
  };
  
  // Historical data (from mockup)
  const historicalData = {
    roomsRevenue: {
      2021: 8765432,
      2022: 9234567,
      2023: 9876543,
      2024: 10234567
    },
    revpar: {} as Record<number, number>, // Will be calculated
    revparYoY: {} as Record<number, number>, // Will be calculated
    occupancy: {
      2021: 72.5,
      2022: 74.2,
      2023: 76.8,
      2024: 78.1
    }
  };

  // Calculate historical RevPAR
  historicalYears.forEach(year => {
    const roomsRevenue = historicalData.roomsRevenue[year];
    const availableRooms = getAvailableRooms(year);
    historicalData.revpar[year] = roomsRevenue / availableRooms;
  });

  // Calculate historical RevPAR YoY growth (skip first year)
  historicalYears.forEach((year, index) => {
    if (index === 0) {
      // First year - no previous year to compare
      historicalData.revparYoY[year] = 0; // or could be null/undefined
    } else {
      const currentRevpar = historicalData.revpar[year];
      const previousYear = historicalYears[index - 1];
      const previousRevpar = historicalData.revpar[previousYear];
      historicalData.revparYoY[year] = ((currentRevpar - previousRevpar) / previousRevpar) * 100;
    }
  });

  const getForecastRevpar = (year: number) => {
    const yearIndex = forecastYears.indexOf(year);
    if (yearIndex === 0) {
      // First forecast year - base on 2024 data
      const baseRevpar = historicalData.revpar[2024];
      const growthRate = revparGrowthType === "flat" 
        ? parseFloat(flatRevparGrowth) || 0
        : parseFloat(yearlyRevparGrowth[year]) || 0;
      return baseRevpar * (1 + growthRate / 100);
    } else {
      // Subsequent years - base on previous forecast year
      const prevYear = forecastYears[yearIndex - 1];
      const prevRevpar = getForecastRevpar(prevYear);
      const growthRate = revparGrowthType === "flat"
        ? parseFloat(flatRevparGrowth) || 0
        : parseFloat(yearlyRevparGrowth[year]) || 0;
      return prevRevpar * (1 + growthRate / 100);
    }
  };

  const getForecastRoomsRevenue = (year: number) => {
    const revpar = getForecastRevpar(year);
    const availableRooms = getAvailableRooms(year);
    return revpar * availableRooms;
  };

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

  const handleSave = () => {
    console.log("Saving revenue data:", {
      revparGrowthType,
      flatRevparGrowth,
      yearlyRevparGrowth,
      occupancyForecast
    });
    // TODO: Implement save functionality
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number, decimals: number = 1) => {
    return `${value.toFixed(decimals)}%`;
  };

  const handleItemClick = (modalName: string) => {
    console.log("Modal clicked:", modalName);
    // TODO: Implement modal functionality
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onItemClick={handleItemClick} />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Revenue Analysis</h1>
          </div>

          {/* Revenue Table */}
          <RevenueTable
            roomsKeys={roomsKeys}
            historicalYears={historicalYears}
            forecastYears={forecastYears}
            historicalData={historicalData}
            revparGrowthType={revparGrowthType}
            setRevparGrowthType={setRevparGrowthType}
            flatRevparGrowth={flatRevparGrowth}
            setFlatRevparGrowth={setFlatRevparGrowth}
            yearlyRevparGrowth={yearlyRevparGrowth}
            handleYearlyRevparChange={handleYearlyRevparChange}
            occupancyForecast={occupancyForecast}
            handleOccupancyChange={handleOccupancyChange}
            getAvailableRooms={getAvailableRooms}
            getForecastRevpar={getForecastRevpar}
            getForecastRoomsRevenue={getForecastRoomsRevenue}
            formatCurrency={formatCurrency}
            formatPercent={formatPercent}
          />

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="px-8">
              Save Revenue Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
