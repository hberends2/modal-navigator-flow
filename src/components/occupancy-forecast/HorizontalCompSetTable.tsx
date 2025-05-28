
import React from "react";
import { CompSetData } from "./types";
import { formatPercent } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface HorizontalCompSetTableProps {
  compSetData: CompSetData[];
  avgCompSetOccupancy: number;
  avgCompSetGrowthRate: number;
}

const HorizontalCompSetTable: React.FC<HorizontalCompSetTableProps> = ({
  compSetData,
  avgCompSetOccupancy,
  avgCompSetGrowthRate
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Comp Set</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            {/* Year Headers */}
            <TableRow>
              <TableHead className="w-24 px-1"></TableHead>
              {compSetData.map(data => (
                <TableHead key={data.year} className="text-center bg-blue-50 px-1" colSpan={2}>
                  {data.year}
                </TableHead>
              ))}
              <TableHead className="text-center bg-gray-100 px-1" colSpan={2}>Avg</TableHead>
            </TableRow>
            {/* Metric Headers */}
            <TableRow>
              <TableHead className="w-24 px-1">Metric</TableHead>
              {compSetData.map(data => (
                <React.Fragment key={data.year}>
                  <TableHead className="text-center bg-blue-50 px-1 text-xs">Occupancy</TableHead>
                  <TableHead className="text-center bg-blue-50 px-1 text-xs">YoY</TableHead>
                </React.Fragment>
              ))}
              <TableHead className="text-center bg-gray-100 px-1 text-xs">Occupancy</TableHead>
              <TableHead className="text-center bg-gray-100 px-1 text-xs">YoY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Values</TableCell>
              {compSetData.map((data, index) => (
                <React.Fragment key={data.year}>
                  <TableCell className="p-1 text-xs text-center">{formatPercent(data.occupancy)}</TableCell>
                  <TableCell className="p-1 text-xs text-center">
                    {index > 0 ? formatPercent(data.growthRate / 100) : "-"}
                  </TableCell>
                </React.Fragment>
              ))}
              <TableCell className="p-1 text-xs text-center font-medium">{formatPercent(avgCompSetOccupancy)}</TableCell>
              <TableCell className="p-1 text-xs text-center font-medium">{formatPercent(avgCompSetGrowthRate / 100)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HorizontalCompSetTable;
