
import React, { useState, useEffect } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import { Property } from "../../types/PropertyTypes";
import { toast } from "../ui/use-toast";

interface OccupancyForecastModalProps {
  onClose: () => void;
  onNext: () => void;
  property?: Property | null;
}

// Define types for our occupancy data
interface OccupancyData {
  year: number;
  occupancy: number;
  growthRate: number;
}

const OccupancyForecastModal: React.FC<OccupancyForecastModalProps> = ({ 
  onClose, 
  onNext,
  property
}) => {
  console.log("OccupancyForecastModal - Rendering");
  
  // Sample historical data - in a real app, this might come from an API or context
  const historicalData = [
    { year: 2022, occupancy: 0.617, rooms: property?.rooms || 108 },
    { year: 2023, occupancy: 0.655, rooms: property?.rooms || 108 },
    { year: 2024, occupancy: 0.703, rooms: property?.rooms || 108 },
  ];
  
  // Calculate historical growth rates
  const historicalGrowthRates = historicalData.slice(1).map((data, index) => {
    const prevOccupancy = historicalData[index].occupancy;
    const currentOccupancy = data.occupancy;
    return {
      year: data.year,
      growthRate: ((currentOccupancy - prevOccupancy) / prevOccupancy) * 100
    };
  });
  
  // Calculate average historical occupancy
  const avgHistoricalOccupancy = historicalData.reduce(
    (sum, data) => sum + data.occupancy, 0
  ) / historicalData.length;
  
  // Calculate average historical growth rate
  const avgHistoricalGrowthRate = historicalGrowthRates.reduce(
    (sum, curr) => sum + curr.growthRate, 0
  ) / historicalGrowthRates.length;
  
  // Calculate average historical occupied rooms
  const avgHistoricalOccupiedRooms = Math.round(
    historicalData.reduce(
      (sum, data) => sum + calculateOccupiedRooms(data.occupancy, data.rooms), 0
    ) / historicalData.length
  );
  
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
  
  // Calculate occupied rooms
  function calculateOccupiedRooms(occupancy: number, totalRooms = property?.rooms || 108) {
    const annualAvailableRooms = totalRooms * 365;
    return Math.round(annualAvailableRooms * occupancy);
  }
  
  // Format percentage for display
  function formatPercent(value: number, decimalPlaces = 1) {
    return (value * 100).toFixed(decimalPlaces) + '%';
  }
  
  // Apply growth rates to recalculate occupancy values
  function applyGrowthRates() {
    const newValues = [...occupancyValues];
    let currentOccupancy = lastHistoricalOccupancy;
    
    newValues.forEach((item, index) => {
      const growthFactor = 1 + (item.growthRate / 100);
      if (index === 0) {
        item.occupancy = currentOccupancy * growthFactor;
      } else {
        item.occupancy = newValues[index - 1].occupancy * growthFactor;
      }
    });
    
    setOccupancyValues(newValues);
  }
  
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
      applyGrowthRates();
    }
  }, [forecastMethod]);

  // Handle saving the data
  const handleSave = () => {
    // In the future, this would save to Supabase
    console.log("Saving occupancy forecast data:", occupancyValues);
    
    toast({
      title: "Data saved",
      description: "Subject occupancy forecast data has been saved"
    });
    
    onClose();
  };

  return (
    <ModalWrapper 
      title="Subject Occupancy Forecast" 
      onClose={onClose} 
      onSave={handleSave}
      onNext={onNext}
      showNext={false}
      showSave={true}
    >
      {/* Historical Reference Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Historical Occupancy Reference</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Occupancy</th>
                  <th className="px-4 py-2">Growth Rate</th>
                  <th className="px-4 py-2">Occupied Rooms</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.map((data, index) => (
                  <tr key={data.year} className="border-b">
                    <td className="px-4 py-2">{data.year}</td>
                    <td className="px-4 py-2">{formatPercent(data.occupancy)}</td>
                    <td className="px-4 py-2">
                      {index > 0 
                        ? formatPercent(historicalGrowthRates[index - 1].growthRate / 100) 
                        : "-"}
                    </td>
                    <td className="px-4 py-2">{calculateOccupiedRooms(data.occupancy, data.rooms)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-medium">Average</td>
                  <td className="px-4 py-2 font-medium">
                    {formatPercent(avgHistoricalOccupancy)}
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {formatPercent(avgHistoricalGrowthRate / 100)}
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {avgHistoricalOccupiedRooms}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Forecast Method Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Forecast Method</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              id="direct-input"
              type="radio"
              name="forecast-method"
              className="h-4 w-4 text-blue-600"
              checked={forecastMethod === 'direct'}
              onChange={() => setForecastMethod('direct')}
            />
            <label htmlFor="direct-input" className="ml-2 text-gray-700">
              Direct Occupancy Input
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="growth-rate"
              type="radio"
              name="forecast-method"
              className="h-4 w-4 text-blue-600"
              checked={forecastMethod === 'growth'}
              onChange={() => setForecastMethod('growth')}
            />
            <label htmlFor="growth-rate" className="ml-2 text-gray-700">
              Growth Rate Based
            </label>
          </div>
        </div>
      </div>
      
      {/* Forecast Input Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Forecast Occupancy</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Occupancy</th>
                  <th className="px-4 py-2">Growth Rate</th>
                  <th className="px-4 py-2">Occupied Rooms</th>
                </tr>
              </thead>
              <tbody>
                {occupancyValues.map((data, index) => (
                  <tr key={data.year} className="border-b">
                    <td className="px-4 py-2">{data.year}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        {forecastMethod === 'direct' ? (
                          <>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={(data.occupancy * 100).toFixed(1)}
                              onChange={(e) => handleOccupancyChange(index, e.target.value)}
                              className="w-16 p-1 border rounded text-right mr-1"
                            />
                            <span>%</span>
                          </>
                        ) : (
                          <span className="text-gray-800 font-medium">
                            {formatPercent(data.occupancy)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        {forecastMethod === 'growth' ? (
                          <>
                            <input
                              type="number"
                              step="0.1"
                              value={data.growthRate.toFixed(1)}
                              onChange={(e) => handleGrowthRateChange(index, e.target.value)}
                              className="w-16 p-1 border rounded text-right mr-1"
                            />
                            <span>%</span>
                          </>
                        ) : (
                          <span className="text-gray-800 font-medium">
                            {data.growthRate.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">{calculateOccupiedRooms(data.occupancy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default OccupancyForecastModal;
