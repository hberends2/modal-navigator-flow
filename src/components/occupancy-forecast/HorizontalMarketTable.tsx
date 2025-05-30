
import React from "react";
import { formatPercent } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { marketOccupancyData } from "../revenue/revenueData";

interface HorizontalMarketTableProps {
  historicalYears: number[];
}

const HorizontalMarketTable: React.FC<HorizontalMarketTableProps> = ({ historicalYears }) => {
  // Calculate average from historical data
  const avgOccupancy = historicalYears.reduce((sum, year) => {
    const data = marketOccupancyData[year as keyof typeof marketOccupancyData];
    return sum + (data || 0);
  }, 0) / historicalYears.length;

  // Calculate average YoY growth (excluding first year)
  const avgYoYGrowth = historicalYears.slice(1).reduce((sum, year, index) => {
    const currentYear = historicalYears[index + 1];
    const prevYear = historicalYears[index];
    const currentOccupancy = marketOccupancyData[currentYear as keyof typeof marketOccupancyData] || 0;
    const prevOccupancy = marketOccupancyData[prevYear as keyof typeof marketOccupancyData] || 0;
    const yoyGrowth = prevOccupancy ? ((currentOccupancy - prevOccupancy) / prevOccupancy) * 100 : 0;
    return sum + yoyGrowth;
  }, 0) / (historicalYears.length - 1);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Market Analysis</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            {/* Period Headers */}
            <TableRow>
              <TableHead className="w-24 px-1"></TableHead>
              <TableHead className="text-center bg-blue-50 px-1" colSpan={historicalYears.length}>Historical</TableHead>
              <TableHead className="text-center bg-orange-50 px-1">Average</TableHead>
            </TableRow>
            {/* Year Headers */}
            <TableRow>
              <TableHead className="w-24 px-1">Metric</TableHead>
              {historicalYears.map(year => (
                <TableHead key={year} className="text-center bg-blue-50 px-1 text-xs">{year}</TableHead>
              ))}
              <TableHead className="text-center bg-orange-50 px-1 text-xs">Avg</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Occupancy Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Occupancy</TableCell>
              {historicalYears.map((year) => {
                const occupancy = marketOccupancyData[year as keyof typeof marketOccupancyData] || 0;
                return (
                  <TableCell key={year} className="p-1 text-xs text-center bg-blue-25">
                    <span className="text-gray-700 font-medium">
                      {formatPercent(occupancy / 100)}
                    </span>
                  </TableCell>
                );
              })}
              <TableCell className="p-1 text-xs text-center bg-orange-25">
                <span className="text-gray-700 font-medium">
                  {formatPercent(avgOccupancy / 100)}
                </span>
              </TableCell>
            </TableRow>
            
            {/* YoY Growth Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">YoY</TableCell>
              {historicalYears.map((year, index) => {
                const prevYear = index > 0 ? historicalYears[index - 1] : null;
                const currentOccupancy = marketOccupancyData[year as keyof typeof marketOccupancyData] || 0;
                const prevOccupancy = prevYear ? marketOccupancyData[prevYear as keyof typeof marketOccupancyData] : null;
                const yoyGrowth = prevOccupancy ? ((currentOccupancy - prevOccupancy) / prevOccupancy) * 100 : null;
                
                return (
                  <TableCell key={`yoy-${year}`} className="p-1 text-xs text-center bg-blue-25">
                    <span className="text-gray-700 font-medium">
                      {yoyGrowth !== null ? `${yoyGrowth.toFixed(1)}%` : '-'}
                    </span>
                  </TableCell>
                );
              })}
              <TableCell className="p-1 text-xs text-center bg-orange-25">
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

export default HorizontalMarketTable;
