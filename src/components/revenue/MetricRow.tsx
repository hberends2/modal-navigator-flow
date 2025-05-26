
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import GrowthControls from "./GrowthControls";

interface MetricRowProps {
  label: string | React.ReactNode;
  historicalData: (string | number)[];
  forecastData: (string | number)[];
  isEditable?: boolean;
  editableData?: Record<number, string>;
  onEditableChange?: (year: number, value: string) => void;
  forecastYears?: number[];
  isGrowthRow?: boolean;
  revparGrowthType?: string;
  setRevparGrowthType?: (value: string) => void;
  flatRevparGrowth?: string;
  setFlatRevparGrowth?: (value: string) => void;
  yearlyRevparGrowth?: Record<number, string>;
  handleYearlyRevparChange?: (year: number, value: string) => void;
}

const MetricRow: React.FC<MetricRowProps> = ({
  label,
  historicalData,
  forecastData,
  isEditable = false,
  editableData,
  onEditableChange,
  forecastYears = [],
  isGrowthRow = false,
  revparGrowthType,
  setRevparGrowthType,
  flatRevparGrowth,
  setFlatRevparGrowth,
  yearlyRevparGrowth,
  handleYearlyRevparChange
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium px-1">{label}</TableCell>
      {historicalData.map((value, index) => (
        <TableCell key={`historical-${index}`} className="text-center px-1">
          {isGrowthRow ? <span className="text-gray-400">-</span> : value}
        </TableCell>
      ))}
      {forecastData.map((value, index) => (
        <TableCell key={`forecast-${index}`} className="text-center px-1">
          {isEditable && editableData && onEditableChange ? (
            <div className="relative w-20 mx-auto">
              <Input
                type="text"
                value={editableData[forecastYears[index]] || ""}
                onChange={(e) => onEditableChange(forecastYears[index], e.target.value)}
                className="pr-6 text-center h-8 text-blue-600 text-sm"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
            </div>
          ) : isGrowthRow && revparGrowthType === "yearly" && yearlyRevparGrowth && handleYearlyRevparChange ? (
            <div className="relative w-16 mx-auto">
              <Input
                type="text"
                value={yearlyRevparGrowth[forecastYears[index]] || ""}
                onChange={(e) => handleYearlyRevparChange(forecastYears[index], e.target.value)}
                className="pr-6 text-center h-8 text-blue-600"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
            </div>
          ) : (
            <span className={isGrowthRow ? "text-gray-600" : ""}>{value}</span>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default MetricRow;
