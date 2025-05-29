
import React from "react";
import { MarketData } from "./types";
import { formatPercent } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface HorizontalMarketTableProps {
  marketData: MarketData[];
  avgMarketOccupancy: number;
  avgMarketGrowthRate: number;
}

const HorizontalMarketTable: React.FC<HorizontalMarketTableProps> = ({
  marketData,
  avgMarketOccupancy,
  avgMarketGrowthRate
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Market Analysis</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            {/* Period Headers */}
            <TableRow>
              <TableHead className="w-24 px-1"></TableHead>
              <TableHead className="text-center bg-blue-50 px-1" colSpan={3}>Historical</TableHead>
              <TableHead className="text-center bg-orange-50 px-1">Average</TableHead>
            </TableRow>
            {/* Year Headers */}
            <TableRow>
              <TableHead className="w-24 px-1">Metric</TableHead>
              <TableHead className="text-center bg-blue-50 px-1 text-xs">2022</TableHead>
              <TableHead className="text-center bg-blue-50 px-1 text-xs">2023</TableHead>
              <TableHead className="text-center bg-blue-50 px-1 text-xs">2024</TableHead>
              <TableHead className="text-center bg-orange-50 px-1 text-xs">Avg</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Occupancy Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Occupancy</TableCell>
              {marketData.map((data) => (
                <TableCell key={data.year} className="p-1 text-xs text-center bg-blue-25">
                  <span className="text-gray-700 font-medium">
                    {formatPercent(data.occupancy)}
                  </span>
                </TableCell>
              ))}
              <TableCell className="p-1 text-xs text-center bg-orange-25">
                <span className="text-gray-700 font-medium">
                  {formatPercent(avgMarketOccupancy)}
                </span>
              </TableCell>
            </TableRow>
            
            {/* YoY Growth Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">YoY</TableCell>
              {marketData.map((data) => (
                <TableCell key={`yoy-${data.year}`} className="p-1 text-xs text-center bg-blue-25">
                  <span className="text-gray-700 font-medium">
                    {data.year === 2022 ? '-' : `${data.growthRate.toFixed(1)}%`}
                  </span>
                </TableCell>
              ))}
              <TableCell className="p-1 text-xs text-center bg-orange-25">
                <span className="text-gray-700 font-medium">
                  {avgMarketGrowthRate.toFixed(1)}%
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
