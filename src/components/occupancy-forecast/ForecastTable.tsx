
import React from "react";
import { OccupancyData } from "./types";
import { calculateOccupiedRooms, formatPercent } from "./utils";

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
              {occupancyValues.map((data, index) => (
                <tr key={data.year} className="border-b">
                  <td className="px-4 py-2">{data.year}</td>
                  <td className="px-4 py-2">
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
                            className="w-16 p-1 border rounded text-right mr-1"
                          />
                          <span>%</span>
                        </>
                      ) : (
                        <span className="text-gray-800 font-medium">
                          {formatPercent(data.occupancy)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      {forecastMethod === 'growth' ? (
                        <>
                          <input
                            type="number"
                            step="0.1"
                            value={data.growthRate.toFixed(1)}
                            onChange={(e) => handleGrowthRateChange(index, e.target.value)}
                            className="w-16 p-1 border rounded text-right mr-1"
                          />
                          <span>%</span>
                        </>
                      ) : (
                        <span className="text-gray-800 font-medium">
                          {data.growthRate.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">{calculateOccupiedRooms(data.occupancy)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ForecastTable;
