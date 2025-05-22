
import React from "react";
import { HistoricalData, HistoricalGrowthRate } from "./types";
import { formatPercent, formatNumber, calculateOccupiedRooms } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface SubjectPropertyTableProps {
  historicalData: HistoricalData[];
  historicalGrowthRates: HistoricalGrowthRate[];
  avgHistoricalOccupancy: number;
  avgHistoricalGrowthRate: number;
  avgHistoricalOccupiedRooms: number;
}

const SubjectPropertyTable: React.FC<SubjectPropertyTableProps> = ({
  historicalData,
  historicalGrowthRates,
  avgHistoricalOccupancy,
  avgHistoricalGrowthRate,
  avgHistoricalOccupiedRooms
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Subject Property</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-200 text-base font-bold">Year</TableHead>
              <TableHead className="bg-gray-200 text-base font-bold">Occupancy</TableHead>
              <TableHead className="bg-gray-200 text-base font-bold">YoY</TableHead>
              <TableHead className="bg-gray-200 text-base font-bold">Occupied Rooms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historicalData.map((data, index) => (
              <TableRow key={data.year}>
                <TableCell>{data.year}</TableCell>
                <TableCell>{formatPercent(data.occupancy)}</TableCell>
                <TableCell>
                  {index > 0 
                    ? formatPercent(historicalGrowthRates[index - 1].growthRate / 100) 
                    : "-"}
                </TableCell>
                <TableCell>{formatNumber(calculateOccupiedRooms(data.occupancy, data.rooms))}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-100">
              <TableCell className="font-medium">Average</TableCell>
              <TableCell className="font-medium">{formatPercent(avgHistoricalOccupancy)}</TableCell>
              <TableCell className="font-medium">{formatPercent(avgHistoricalGrowthRate / 100)}</TableCell>
              <TableCell className="font-medium">{formatNumber(avgHistoricalOccupiedRooms)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubjectPropertyTable;
