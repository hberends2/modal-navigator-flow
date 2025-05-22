
import React, { useState, useEffect } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import { Property } from "../../types/PropertyTypes";
import { toast } from "../ui/use-toast";
import HistoricalOccupancyTable from "../occupancy-forecast/HistoricalOccupancyTable";
import ForecastMethodSelector from "../occupancy-forecast/ForecastMethodSelector";
import ForecastTable from "../occupancy-forecast/ForecastTable";
import { useDatabase } from "../../hooks/useDatabase";
import { 
  OccupancyData,
  HistoricalData,
  MarketData,
  CompSetData
} from "../occupancy-forecast/types";
import {
  calculateHistoricalGrowthRates,
  calculateAvgHistoricalOccupancy,
  calculateAvgHistoricalGrowthRate,
  calculateAvgHistoricalOccupiedRooms,
  applyGrowthRates
} from "../occupancy-forecast/utils";

interface OccupancyForecastModalProps {
  onClose: () => void;
  onNext: () => void;
  property?: Property | null;
}

const OccupancyForecastModal: React.FC<OccupancyForecastModalProps> = ({
  onClose,
  onNext,
  property
}) => {
  console.log("OccupancyForecastModal - Rendering");
  const { saveOccupancyData, loading } = useDatabase();
  
  // Sample historical data - in a real app, this might come from an API or context
  const historicalData: HistoricalData[] = [
    { year: 2022, occupancy: 0.617, rooms: property?.rooms || 108 },
    { year: 2023, occupancy: 0.655, rooms: property?.rooms || 108 },
    { year: 2024, occupancy: 0.703, rooms: property?.rooms || 108 },
  ];
  
  // Sample market data
  const marketData: MarketData[] = [
    { year: 2022, occupancy: 0.700, growthRate: 0 },
    { year: 2023, occupancy: 0.714, growthRate: 2.0 },
    { year: 2024, occupancy: 0.723, growthRate: 1.3 },
  ];
  
  // Sample comp set data
  const compSetData: CompSetData[] = [
    { year: 2022, occupancy: 0.700, growthRate: 0 },
    { year: 2023, occupancy: 0.714, growthRate: 2.0 },
    { year: 2024, occupancy: 0.723, growthRate: 1.3 },
  ];
  
  // Calculate historical growth rates
  const historicalGrowthRates = calculateHistoricalGrowthRates(historicalData);
  
  // Calculate statistics
  const avgHistoricalOccupancy = calculateAvgHistoricalOccupancy(historicalData);
  const avgHistoricalGrowthRate = calculateAvgHistoricalGrowthRate(historicalGrowthRates);
  const avgHistoricalOccupiedRooms = calculateAvgHistoricalOccupiedRooms(historicalData);
  
  // Calculate market statistics
  const avgMarketOccupancy = marketData.reduce((sum, item) => sum + item.occupancy, 0) / marketData.length;
  const avgMarketGrowthRate = marketData.slice(1).reduce((sum, item) => sum + item.growthRate, 0) / (marketData.length - 1);
  
  // Calculate comp set statistics
  const avgCompSetOccupancy = compSetData.reduce((sum, item) => sum + item.occupancy, 0) / compSetData.length;
  const avgCompSetGrowthRate = compSetData.slice(1).reduce((sum, item) => sum + item.growthRate, 0) / (compSetData.length - 1);
  
  // Forecast years
  const forecastYears = [2025, 2026, 2027, 2028, 2029];
  
  // State for forecast method and values
  const [forecastMethod, setForecastMethod] = useState('direct');
  const [occupancyValues, setOccupancyValues] = useState<OccupancyData[]>(
    forecastYears.map(year => ({ 
      year, 
      occupancy: 0.75, // Default 75%
      growthRate: 2.0  // Default 2%
    }))
  );
  
  // Calculate last historical occupancy
  const lastHistoricalOccupancy = historicalData[historicalData.length - 1].occupancy;
  
  // Update growth rate for a specific year
  function handleGrowthRateChange(index: number, value: string) {
    const newValues = [...occupancyValues];
    newValues[index].growthRate = parseFloat(value);
    
    // When in growth rate mode, immediately update the occupancy based on growth rate
    if (forecastMethod === 'growth') {
      if (index === 0) {
        newValues[index].occupancy = lastHistoricalOccupancy * (1 + newValues[index].growthRate / 100);
      } else {
        newValues[index].occupancy = newValues[index - 1].occupancy * (1 + newValues[index].growthRate / 100);
      }
      
      // Update subsequent years if any
      for (let i = index + 1; i < newValues.length; i++) {
        newValues[i].occupancy = newValues[i - 1].occupancy * (1 + newValues[i].growthRate / 100);
      }
    }
    
    setOccupancyValues(newValues);
  }
  
  // Update occupancy value for a specific year
  function handleOccupancyChange(index: number, value: string) {
    const newValues = [...occupancyValues];
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) return;
    
    newValues[index].occupancy = numValue / 100; // Convert from percentage to decimal
    
    // Calculate implied growth rates
    if (index === 0) {
      // For first forecast year, compare to last historical year
      newValues[index].growthRate = ((newValues[index].occupancy - lastHistoricalOccupancy) / lastHistoricalOccupancy) * 100;
    } else {
      // For other years, compare to previous forecast year
      newValues[index].growthRate = ((newValues[index].occupancy - newValues[index - 1].occupancy) / newValues[index - 1].occupancy) * 100;
    }
    
    setOccupancyValues(newValues);
  }
  
  // When forecast method changes, update calculations if needed
  useEffect(() => {
    if (forecastMethod === 'growth') {
      const updatedValues = applyGrowthRates(occupancyValues, lastHistoricalOccupancy);
      setOccupancyValues(updatedValues);
    }
  }, [forecastMethod]);

  // Handle saving the data
  const handleSave = async () => {
    console.log("Saving occupancy forecast data:", occupancyValues);
    
    // Check if we have a property ID
    if (!property || !property.id) {
      toast({
        title: "Error",
        description: "No property selected for saving forecast data",
        variant: "destructive"
      });
      return;
    }
    
    // Save to database
    const dataToSave = {
      historicalData,
      marketData,
      compSetData,
      occupancyForecast: occupancyValues,
      forecastMethod,
      lastUpdated: new Date().toISOString()
    };
    
    const success = await saveOccupancyData(property.id, dataToSave);
    
    if (success) {
      toast({
        title: "Data saved",
        description: "Subject occupancy forecast data has been saved"
      });
      onClose();
    }
  };

  return (
    <ModalWrapper 
      title="Subject Occupancy Forecast" 
      onClose={onClose} 
      onSave={handleSave}
      onNext={onNext}
      showNext={false}
      showSave={true}
      saveDisabled={loading}
      maxWidth="max-w-5xl" // Updated to a wider max-width to fit the table
    >
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
    </ModalWrapper>
  );
};

export default OccupancyForecastModal;
