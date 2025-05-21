
import React from "react";
import { HistoricalData, HistoricalGrowthRate } from "./types";
import { calculateOccupiedRooms, formatPercent } from "./utils";

interface HistoricalOccupancyTableProps {
  historicalData: HistoricalData[];
  historicalGrowthRates: HistoricalGrowthRate[];
  avgHistoricalOccupancy: number;
  avgHistoricalGrowthRate: number;
  avgHistoricalOccupiedRooms: number;
}

const HistoricalOccupancyTable: React.FC<HistoricalOccupancyTableProps> = ({
  historicalData,
  historicalGrowthRates,
  avgHistoricalOccupancy,
  avgHistoricalGrowthRate,
  avgHistoricalOccupiedRooms
}) => {
  return (
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
  );
};

export default HistoricalOccupancyTable;
