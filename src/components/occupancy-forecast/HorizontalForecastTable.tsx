
import React from "react";
import { OccupancyData } from "./types";
import { calculateOccupiedRooms, formatPercent, formatNumber } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import ForecastMethodSelector from "./ForecastMethodSelector";

interface HorizontalForecastTableProps {
  forecastMethod: string;
  setForecastMethod: (method: string) => void;
  occupancyValues: OccupancyData[];
  handleOccupancyChange: (index: number, value: string) => void;
  handleGrowthRateChange: (index: number, value: string) => void;
}

const HorizontalForecastTable: React.FC<HorizontalForecastTableProps> = ({
  forecastMethod,
  setForecastMethod,
  occupancyValues,
  handleOccupancyChange,
  handleGrowthRateChange
}) => {
  const historicalYears = [2022, 2023, 2024];
  const forecastYears = [2025, 2026, 2027, 2028, 2029];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Forecast Occupancy</h3>
      
      {/* Forecast Method Selector */}
      <div className="mb-4">
        <ForecastMethodSelector 
          forecastMethod={forecastMethod}
          setForecastMethod={setForecastMethod}
        />
      </div>

      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            {/* Period Headers */}
            <TableRow>
              <TableHead className="w-24 px-1"></TableHead>
              <TableHead className="text-center bg-blue-50 px-1" colSpan={historicalYears.length * 2}>Historical</TableHead>
              <TableHead className="text-center bg-green-50 px-1" colSpan={2}>Year 1</TableHead>
              <TableHead className="text-center bg-green-50 px-1" colSpan={2}>Year 2</TableHead>
              <TableHead className="text-center bg-green-50 px-1" colSpan={2}>Year 3</TableHead>
              <TableHead className="text-center bg-green-50 px-1" colSpan={2}>Year 4</TableHead>
              <TableHead className="text-center bg-green-50 px-1" colSpan={2}>Year 5</TableHead>
            </TableRow>
            {/* Year Headers */}
            <TableRow>
              <TableHead className="w-24 px-1">Metric</TableHead>
              {historicalYears.map(year => (
                <React.Fragment key={year}>
                  <TableHead className="text-center bg-blue-50 px-1 text-xs" colSpan={2}>{year}</TableHead>
                </React.Fragment>
              ))}
              {forecastYears.map(year => (
                <React.Fragment key={year}>
                  <TableHead className="text-center bg-green-50 px-1 text-xs" colSpan={2}>{year}</TableHead>
                </React.Fragment>
              ))}
            </TableRow>
            {/* Metric Headers */}
            <TableRow>
              <TableHead className="w-24 px-1"></TableHead>
              {historicalYears.map(year => (
                <React.Fragment key={year}>
                  <TableHead className="text-center bg-blue-50 px-1 text-xs">Occ</TableHead>
                  <TableHead className="text-center bg-blue-50 px-1 text-xs">YoY</TableHead>
                </React.Fragment>
              ))}
              {forecastYears.map(year => (
                <React.Fragment key={year}>
                  <TableHead className="text-center bg-green-50 px-1 text-xs">Occ</TableHead>
                  <TableHead className="text-center bg-green-50 px-1 text-xs">YoY</TableHead>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Occupied Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Occupied</TableCell>
              {/* Historical placeholder data */}
              {historicalYears.map((year, yearIndex) => (
                <React.Fragment key={year}>
                  <TableCell className="p-1 text-xs text-center">-</TableCell>
                  <TableCell className="p-1 text-xs text-center">-</TableCell>
                </React.Fragment>
              ))}
              {/* Forecast data - show occupied rooms in Occ column */}
              {occupancyValues.map((data, index) => (
                <React.Fragment key={data.year}>
                  <TableCell className="p-1 text-xs text-center">
                    {formatNumber(calculateOccupiedRooms(data.occupancy))}
                  </TableCell>
                  <TableCell className="p-1 text-xs text-center">-</TableCell>
                </React.Fragment>
              ))}
            </TableRow>
            
            {/* Inputs Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Inputs</TableCell>
              {/* Historical placeholder data */}
              {historicalYears.map((year, yearIndex) => (
                <React.Fragment key={year}>
                  <TableCell className="p-1 text-xs text-center">-</TableCell>
                  <TableCell className="p-1 text-xs text-center">-</TableCell>
                </React.Fragment>
              ))}
              {/* Forecast data - input cells for Occ and YoY */}
              {occupancyValues.map((data, index) => (
                <React.Fragment key={data.year}>
                  <TableCell className="p-1 text-xs text-center">
                    {forecastMethod === 'direct' ? (
                      <div className="flex items-center justify-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={(data.occupancy * 100).toFixed(1)}
                          onChange={(e) => handleOccupancyChange(index, e.target.value)}
                          className="w-12 p-0.5 border rounded text-right mr-1 text-blue-600 text-xs"
                        />
                        <span>%</span>
                      </div>
                    ) : (
                      <span className="text-gray-800 font-medium">
                        {formatPercent(data.occupancy)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="p-1 text-xs text-center">
                    {forecastMethod === 'growth' ? (
                      <div className="flex items-center justify-center">
                        <input
                          type="number"
                          step="0.1"
                          value={data.growthRate.toFixed(1)}
                          onChange={(e) => handleGrowthRateChange(index, e.target.value)}
                          className="w-12 p-0.5 border rounded text-right mr-1 text-blue-600 text-xs"
                        />
                        <span>%</span>
                      </div>
                    ) : (
                      <span className="text-gray-800 font-medium">
                        {data.growthRate.toFixed(1)}%
                      </span>
                    )}
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HorizontalForecastTable;
