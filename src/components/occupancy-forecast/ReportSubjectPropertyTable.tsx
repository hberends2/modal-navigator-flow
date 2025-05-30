
import React from "react";
import { formatPercent, formatNumber, calculateOccupiedRooms } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { useRevenueData } from "../../contexts/RevenueDataContext";

const ReportSubjectPropertyTable: React.FC = () => {
  const { revenueData } = useRevenueData();

  if (!revenueData) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Subject Property</h3>
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-center text-gray-500">No revenue data available. Please visit the Revenue page first.</p>
        </div>
      </div>
    );
  }

  const { historicalYears, forecastYears, historicalData, occupancyForecast, roomsKeys } = revenueData;

  // Calculate averages for historical data only
  const avgHistoricalOccupancy = historicalYears.reduce((sum, year) => {
    return sum + (historicalData.occupancy[year] || 0);
  }, 0) / historicalYears.length;

  const avgHistoricalOccupiedRooms = historicalYears.reduce((sum, year) => {
    const occupancy = historicalData.occupancy[year] || 0;
    return sum + calculateOccupiedRooms(occupancy / 100, roomsKeys);
  }, 0) / historicalYears.length;

  // Calculate average YoY growth for all years
  const allYears = [...historicalYears, ...forecastYears];
  const avgYoYGrowth = allYears.slice(1).reduce((sum, year, index) => {
    const currentYear = allYears[index + 1];
    const prevYear = allYears[index];
    
    const currentOccupancy = historicalYears.includes(currentYear)
      ? historicalData.occupancy[currentYear] || 0
      : parseFloat(occupancyForecast[currentYear] || "0");
    
    const prevOccupancy = historicalYears.includes(prevYear)
      ? historicalData.occupancy[prevYear] || 0
      : parseFloat(occupancyForecast[prevYear] || "0");
    
    const yoyGrowth = prevOccupancy ? ((currentOccupancy - prevOccupancy) / prevOccupancy) * 100 : 0;
    return sum + yoyGrowth;
  }, 0) / (allYears.length - 1);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Subject Property</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            {/* Period Headers */}
            <TableRow>
              <TableHead className="w-20 px-2"></TableHead>
              <TableHead className="text-center bg-blue-50 px-1" colSpan={historicalYears.length}>Historical</TableHead>
              <TableHead className="text-center bg-green-50 px-1" colSpan={forecastYears.length}>Forecast</TableHead>
              <TableHead className="text-center bg-orange-50 px-1">Average</TableHead>
            </TableRow>
            {/* Year Headers */}
            <TableRow>
              <TableHead className="w-20 px-2 text-xs">Metric</TableHead>
              {historicalYears.map(year => (
                <TableHead key={year} className="text-center bg-blue-50 px-1 text-xs w-16">{year}</TableHead>
              ))}
              {forecastYears.map(year => (
                <TableHead key={year} className="text-center bg-green-50 px-1 text-xs w-16">{year}</TableHead>
              ))}
              <TableHead className="text-center bg-orange-50 px-1 text-xs w-16">Avg</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Occupied Rooms Row */}
            <TableRow>
              <TableCell className="px-2 py-1 text-xs font-medium">Occupied</TableCell>
              {/* Historical data */}
              {historicalYears.map((year) => {
                const occupancy = historicalData.occupancy[year] || 0;
                const occupiedRooms = calculateOccupiedRooms(occupancy / 100, roomsKeys);
                return (
                  <TableCell key={year} className="px-1 py-1 text-xs text-center bg-blue-25 w-16">
                    <span className="text-gray-700 font-medium">
                      {formatNumber(occupiedRooms)}
                    </span>
                  </TableCell>
                );
              })}
              {/* Forecast data */}
              {forecastYears.map((year) => {
                const occupancy = parseFloat(occupancyForecast[year] || "0");
                const occupiedRooms = calculateOccupiedRooms(occupancy / 100, roomsKeys);
                return (
                  <TableCell key={year} className="px-1 py-1 text-xs text-center bg-green-25 w-16">
                    <span className="text-gray-700 font-medium">
                      {formatNumber(occupiedRooms)}
                    </span>
                  </TableCell>
                );
              })}
              <TableCell className="px-1 py-1 text-xs text-center bg-orange-25 w-16">
                <span className="text-gray-700 font-medium">
                  {formatNumber(avgHistoricalOccupiedRooms)}
                </span>
              </TableCell>
            </TableRow>

            {/* Occupancy Row */}
            <TableRow>
              <TableCell className="px-2 py-1 text-xs font-medium">Occupancy</TableCell>
              {/* Historical data */}
              {historicalYears.map((year) => {
                const occupancy = historicalData.occupancy[year] || 0;
                return (
                  <TableCell key={year} className="px-1 py-1 text-xs text-center bg-blue-25 w-16">
                    <span className="text-gray-700 font-medium">
                      {formatPercent(occupancy / 100)}
                    </span>
                  </TableCell>
                );
              })}
              {/* Forecast data */}
              {forecastYears.map((year) => {
                const occupancy = parseFloat(occupancyForecast[year] || "0");
                return (
                  <TableCell key={year} className="px-1 py-1 text-xs text-center bg-green-25 w-16">
                    <span className="text-gray-700 font-medium">
                      {formatPercent(occupancy / 100)}
                    </span>
                  </TableCell>
                );
              })}
              <TableCell className="px-1 py-1 text-xs text-center bg-orange-25 w-16">
                <span className="text-gray-700 font-medium">
                  {formatPercent(avgHistoricalOccupancy / 100)}
                </span>
              </TableCell>
            </TableRow>
            
            {/* YoY Growth Row */}
            <TableRow>
              <TableCell className="px-2 py-1 text-xs font-medium">YoY</TableCell>
              {/* Historical data */}
              {historicalYears.map((year, index) => {
                const prevYear = index > 0 ? historicalYears[index - 1] : null;
                const currentOccupancy = historicalData.occupancy[year] || 0;
                const prevOccupancy = prevYear ? historicalData.occupancy[prevYear] : null;
                const yoyGrowth = prevOccupancy ? ((currentOccupancy - prevOccupancy) / prevOccupancy) * 100 : null;
                
                return (
                  <TableCell key={`yoy-${year}`} className="px-1 py-1 text-xs text-center bg-blue-25 w-16">
                    <span className="text-gray-700 font-medium">
                      {yoyGrowth !== null ? `${yoyGrowth.toFixed(1)}%` : '-'}
                    </span>
                  </TableCell>
                );
              })}
              {/* Forecast data */}
              {forecastYears.map((year, index) => {
                const prevYear = index > 0 ? forecastYears[index - 1] : historicalYears[historicalYears.length - 1];
                const currentOccupancy = parseFloat(occupancyForecast[year] || "0");
                const prevOccupancy = historicalYears.includes(prevYear)
                  ? historicalData.occupancy[prevYear] || 0
                  : parseFloat(occupancyForecast[prevYear] || "0");
                const yoyGrowth = prevOccupancy ? ((currentOccupancy - prevOccupancy) / prevOccupancy) * 100 : null;
                
                return (
                  <TableCell key={`yoy-${year}`} className="px-1 py-1 text-xs text-center bg-green-25 w-16">
                    <span className="text-gray-700 font-medium">
                      {yoyGrowth !== null ? `${yoyGrowth.toFixed(1)}%` : '-'}
                    </span>
                  </TableCell>
                );
              })}
              <TableCell className="px-1 py-1 text-xs text-center bg-orange-25 w-16">
                <span className="text-gray-700 font-medium">
                  {avgYoYGrowth.toFixed(1)}%
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReportSubjectPropertyTable;
