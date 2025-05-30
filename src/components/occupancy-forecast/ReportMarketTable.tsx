
import React from "react";
import { formatPercent } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { marketOccupancyData } from "../revenue/revenueData";

interface ReportMarketTableProps {
  historicalYears: number[];
}

const ReportMarketTable: React.FC<ReportMarketTableProps> = ({ historicalYears }) => {
  // Calculate average from historical data
  const avgOccupancy = historicalYears.reduce((sum, year) => {
    const data = marketOccupancyData[year as keyof typeof marketOccupancyData];
    return sum + (data || 0);
  }, 0) / historicalYears.length;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">Market Analysis</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Year</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Occupancy</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">YoY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historicalYears.map((year, index) => {
              const occupancy = marketOccupancyData[year as keyof typeof marketOccupancyData] || 0;
              const prevYear = index > 0 ? historicalYears[index - 1] : null;
              const prevOccupancy = prevYear ? marketOccupancyData[prevYear as keyof typeof marketOccupancyData] : null;
              const yoyGrowth = prevOccupancy ? ((occupancy - prevOccupancy) / prevOccupancy) * 100 : null;
              
              return (
                <TableRow key={year}>
                  <TableCell className="p-1 text-xs">{year}</TableCell>
                  <TableCell className="p-1 text-xs">{formatPercent(occupancy / 100)}</TableCell>
                  <TableCell className="p-1 text-xs">
                    {yoyGrowth !== null ? formatPercent(yoyGrowth / 100) : "-"}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className="bg-gray-100">
              <TableCell className="p-1 text-xs font-medium">Avg</TableCell>
              <TableCell className="p-1 text-xs font-medium">{formatPercent(avgOccupancy / 100)}</TableCell>
              <TableCell className="p-1 text-xs font-medium">-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReportMarketTable;
