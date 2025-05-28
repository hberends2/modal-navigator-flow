
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
    <div className="w-auto inline-block">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Market</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            {/* Year Headers */}
            <TableRow>
              {marketData.map(data => (
                <TableHead key={data.year} className="text-center bg-blue-50 px-2 min-w-[80px]" colSpan={2}>
                  {data.year}
                </TableHead>
              ))}
              <TableHead className="text-center bg-gray-100 px-2 min-w-[80px]" colSpan={2}>Avg</TableHead>
            </TableRow>
            {/* Metric Headers */}
            <TableRow>
              {marketData.map(data => (
                <React.Fragment key={data.year}>
                  <TableHead className="text-center bg-blue-50 px-2 text-xs min-w-[60px]">Occupancy</TableHead>
                  <TableHead className="text-center bg-blue-50 px-2 text-xs min-w-[60px]">YoY</TableHead>
                </React.Fragment>
              ))}
              <TableHead className="text-center bg-gray-100 px-2 text-xs min-w-[60px]">Occupancy</TableHead>
              <TableHead className="text-center bg-gray-100 px-2 text-xs min-w-[60px]">YoY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {marketData.map((data, index) => (
                <React.Fragment key={data.year}>
                  <TableCell className="p-2 text-xs text-center">{formatPercent(data.occupancy)}</TableCell>
                  <TableCell className="p-2 text-xs text-center">
                    {index > 0 ? formatPercent(data.growthRate / 100) : "-"}
                  </TableCell>
                </React.Fragment>
              ))}
              <TableCell className="p-2 text-xs text-center font-medium">{formatPercent(avgMarketOccupancy)}</TableCell>
              <TableCell className="p-2 text-xs text-center font-medium">{formatPercent(avgMarketGrowthRate / 100)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HorizontalMarketTable;
