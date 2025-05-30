
import React from "react";
import { formatPercent, formatNumber, calculateOccupiedRooms } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { useRevenueData } from "../../contexts/RevenueDataContext";

const ReportSubjectPropertyTable: React.FC = () => {
  const { revenueData } = useRevenueData();

  if (!revenueData) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">Subject Property</h3>
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-center text-gray-500">No revenue data available. Please visit the Revenue page first.</p>
        </div>
      </div>
    );
  }

  const { historicalYears, forecastYears, historicalData, occupancyForecast, roomsKeys } = revenueData;
  const allYears = [...historicalYears, ...forecastYears];

  // Calculate averages for historical data only
  const avgHistoricalOccupancy = historicalYears.reduce((sum, year) => {
    return sum + (historicalData.occupancy[year] || 0);
  }, 0) / historicalYears.length;

  const avgHistoricalOccupiedRooms = historicalYears.reduce((sum, year) => {
    const occupancy = historicalData.occupancy[year] || 0;
    return sum + calculateOccupiedRooms(occupancy / 100, roomsKeys);
  }, 0) / historicalYears.length;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">Subject Property</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Year</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Occupancy</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">YoY</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Occ Rooms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allYears.map((year, index) => {
              const isHistorical = historicalYears.includes(year);
              const occupancy = isHistorical 
                ? historicalData.occupancy[year] || 0
                : parseFloat(occupancyForecast[year] || "0");
              
              // Calculate YoY growth
              let yoyGrowth: number | null = null;
              if (index > 0) {
                const prevYear = allYears[index - 1];
                const prevOccupancy = historicalYears.includes(prevYear)
                  ? historicalData.occupancy[prevYear] || 0
                  : parseFloat(occupancyForecast[prevYear] || "0");
                yoyGrowth = ((occupancy - prevOccupancy) / prevOccupancy) * 100;
              }

              const occupiedRooms = calculateOccupiedRooms(occupancy / 100, roomsKeys);

              return (
                <TableRow key={year}>
                  <TableCell className="p-1 text-xs">{year}</TableCell>
                  <TableCell className="p-1 text-xs">{formatPercent(occupancy / 100)}</TableCell>
                  <TableCell className="p-1 text-xs">
                    {yoyGrowth !== null ? formatPercent(yoyGrowth / 100) : "-"}
                  </TableCell>
                  <TableCell className="p-1 text-xs">{formatNumber(occupiedRooms)}</TableCell>
                </TableRow>
              );
            })}
            <TableRow className="bg-gray-100">
              <TableCell className="p-1 text-xs font-medium">Avg</TableCell>
              <TableCell className="p-1 text-xs font-medium">{formatPercent(avgHistoricalOccupancy / 100)}</TableCell>
              <TableCell className="p-1 text-xs font-medium">-</TableCell>
              <TableCell className="p-1 text-xs font-medium">{formatNumber(avgHistoricalOccupiedRooms)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReportSubjectPropertyTable;
