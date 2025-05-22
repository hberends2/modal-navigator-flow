
import React from "react";
import { CompSetData } from "./types";
import { formatPercent } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface CompSetTableProps {
  compSetData: CompSetData[];
  avgCompSetOccupancy: number;
  avgCompSetGrowthRate: number;
}

const CompSetTable: React.FC<CompSetTableProps> = ({
  compSetData,
  avgCompSetOccupancy,
  avgCompSetGrowthRate
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Comp Set</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-200 text-base font-bold">Year</TableHead>
              <TableHead className="bg-gray-200 text-base font-bold">Occupancy</TableHead>
              <TableHead className="bg-gray-200 text-base font-bold">YoY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compSetData.map((data, index) => (
              <TableRow key={data.year}>
                <TableCell>{data.year}</TableCell>
                <TableCell>{formatPercent(data.occupancy)}</TableCell>
                <TableCell>
                  {index > 0 ? formatPercent(data.growthRate / 100) : "-"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-100">
              <TableCell className="font-medium">Average</TableCell>
              <TableCell className="font-medium">{formatPercent(avgCompSetOccupancy)}</TableCell>
              <TableCell className="font-medium">{formatPercent(avgCompSetGrowthRate / 100)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompSetTable;
