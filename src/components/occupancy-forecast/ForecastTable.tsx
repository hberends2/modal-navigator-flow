
import React from "react";
import { OccupancyData } from "./types";
import { calculateOccupiedRooms, formatPercent, formatNumber } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface ForecastTableProps {
  forecastMethod: string;
  occupancyValues: OccupancyData[];
  handleOccupancyChange: (index: number, value: string) => void;
  handleGrowthRateChange: (index: number, value: string) => void;
}

const ForecastTable: React.FC<ForecastTableProps> = ({
  forecastMethod,
  occupancyValues,
  handleOccupancyChange,
  handleGrowthRateChange
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Forecast Occupancy</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="w-full">
          {/* Set the container to be approximately 50% of the parent table width */}
          <div className="relative" style={{ maxWidth: '50%' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-base font-bold bg-gray-200" style={{ width: '125px' }}>Year</TableHead>
                  <TableHead className="text-base font-bold bg-gray-200" style={{ width: '200px' }}>Occupancy</TableHead>
                  <TableHead className="text-base font-bold bg-gray-200" style={{ width: '200px' }}>YoY</TableHead>
                  <TableHead className="text-base font-bold bg-gray-200" style={{ width: '200px' }}>
                    <span className="inline-block w-full">Occupied Rooms</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {occupancyValues.map((data, index) => (
                  <TableRow key={data.year}>
                    <TableCell>{data.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {forecastMethod === 'direct' ? (
                          <>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={(data.occupancy * 100).toFixed(1)}
                              onChange={(e) => handleOccupancyChange(index, e.target.value)}
                              className="w-16 p-1 border rounded text-right mr-1 text-blue-600 font-medium"
                            />
                            <span>%</span>
                          </>
                        ) : (
                          <span className="text-gray-800 font-medium">
                            {formatPercent(data.occupancy)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {forecastMethod === 'growth' ? (
                          <>
                            <input
                              type="number"
                              step="0.1"
                              value={data.growthRate.toFixed(1)}
                              onChange={(e) => handleGrowthRateChange(index, e.target.value)}
                              className="w-16 p-1 border rounded text-right mr-1 text-blue-600 font-medium"
                            />
                            <span>%</span>
                          </>
                        ) : (
                          <span className="text-gray-800 font-medium">
                            {data.growthRate.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="break-words">
                        {formatNumber(calculateOccupiedRooms(data.occupancy))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastTable;
