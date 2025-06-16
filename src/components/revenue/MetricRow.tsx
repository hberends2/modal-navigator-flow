
import React from "react";
import { TableRow, TableCell } from "../ui/table";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface MetricRowProps {
  label: React.ReactNode;
  historicalData: (string | number | React.ReactNode)[];
  forecastData: (string | number | React.ReactNode)[];
  isSectionHeader?: boolean;
  isEditable?: boolean;
  editableData?: Record<number, string>;
  onEditableChange?: (year: number, value: string) => void;
  onEditableBlur?: (year: number, value: string) => void;
  forecastYears?: number[];
  isYoYRow?: boolean;
  isTwoRowMetric?: boolean;
  metricText?: string;
  controls?: React.ReactNode;
  isGrowthRow?: boolean;
  adrGrowthType?: string;
  yearlyAdrGrowth?: Record<number, string>;
  handleYearlyAdrChange?: (year: number, value: string) => void;
  handleYearlyAdrBlur?: (year: number, value: string) => void;
  isUserInputRow?: boolean;
  isFbInputRow?: boolean;
  isIndented?: boolean;
  id?: string;
  className?: string;
}

const MetricRow: React.FC<MetricRowProps> = ({
  label,
  historicalData,
  forecastData,
  isSectionHeader = false,
  isEditable = false,
  editableData,
  onEditableChange,
  onEditableBlur,
  forecastYears = [],
  isYoYRow = false,
  isTwoRowMetric = false,
  metricText,
  controls,
  isGrowthRow = false,
  adrGrowthType,
  yearlyAdrGrowth,
  handleYearlyAdrChange,
  handleYearlyAdrBlur,
  isUserInputRow = false,
  isFbInputRow = false,
  isIndented = false,
  id,
  className,
}) => {
  const handleInputChange = (year: number, value: string) => {
    if (onEditableChange) {
      onEditableChange(year, value);
    }
  };

  const handleInputBlur = (year: number, value: string) => {
    if (onEditableBlur) {
      onEditableBlur(year, value);
    }
  };

  const getRowClassName = () => {
    if (isSectionHeader) return "bg-gray-100 border-t-2 border-gray-300";
    if (isUserInputRow && isFbInputRow) return "bg-yellow-50"; // Pale yellow background for F&B input
    if (isUserInputRow) return "bg-yellow-50";
    return "";
  };

  const getLabelClassName = () => {
    let baseClass = `px-2 py-1 bg-white sticky left-0 z-10 w-48 ${isSectionHeader ? 'font-bold' : ''}`;
    if (isIndented) {
      baseClass += " pl-6"; // Add left padding for indentation
    }
    return baseClass;
  };

  if (isTwoRowMetric) {
    return (
      <TableRow id={id} className={cn(getRowClassName(), className)}>
        <TableCell className="px-2 py-1 align-top bg-white sticky left-0 z-10 w-48">
          <div className="flex flex-col justify-center h-full space-y-1">
            <div className="text-xs font-medium">{metricText}</div>
            {controls && <div className="flex items-center">{controls}</div>}
          </div>
        </TableCell>
        {historicalData.map((data, index) => (
          <TableCell key={`hist-${index}`} className="text-center text-xs py-1 px-1 min-w-[80px]">
            {data}
          </TableCell>
        ))}
        {forecastData.map((data, index) => {
          const year = forecastYears[index];
          if (isGrowthRow && adrGrowthType === "yearly" && year && handleYearlyAdrChange && handleYearlyAdrBlur && yearlyAdrGrowth) {
            return (
              <TableCell key={`forecast-${index}`} className="text-center text-xs py-1 px-1 min-w-[80px]">
                <div className="relative w-16 mx-auto">
                  <Input
                    type="text"
                    value={yearlyAdrGrowth[year] || ""}
                    onChange={(e) => handleYearlyAdrChange(year, e.target.value)}
                    onBlur={(e) => handleYearlyAdrBlur(year, e.target.value)}
                    className="text-center text-xs h-6 py-0 text-blue-600 pr-4"
                  />
                  <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
                </div>
              </TableCell>
            );
          }
          if (isEditable && year && onEditableChange && onEditableBlur && editableData) {
            return (
              <TableCell key={`forecast-${index}`} className="text-center text-xs py-1 px-1 min-w-[80px]">
                <div className="relative w-16 mx-auto">
                  <Input
                    type="text"
                    value={editableData[year] || ""}
                    onChange={(e) => handleInputChange(year, e.target.value)}
                    onBlur={(e) => handleInputBlur(year, e.target.value)}
                    className={`text-center text-xs h-6 py-0 text-right ${
                      isFbInputRow ? 'text-blue-600 bg-yellow-50' : 'text-blue-600'
                    } ${isYoYRow ? 'pr-4' : 'pr-1'}`}
                  />
                  {isYoYRow && <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>}
                </div>
              </TableCell>
            );
          }
          return (
            <TableCell key={`forecast-${index}`} className="text-center text-xs py-1 px-1 min-w-[80px]">
              {data}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }

  return (
    <TableRow id={id} className={cn(getRowClassName(), className)}>
      <TableCell className={getLabelClassName()}>
        <span className="text-xs">{label}</span>
      </TableCell>
      {historicalData.map((data, index) => (
        <TableCell key={`hist-${index}`} className="text-center text-xs py-1 px-1 min-w-[80px]">
          {data}
        </TableCell>
      ))}
      {forecastData.map((data, index) => {
        const year = forecastYears[index];
        if (isEditable && year && onEditableChange && onEditableBlur && editableData) {
          return (
            <TableCell key={`forecast-${index}`} className="text-center text-xs py-1 px-1 min-w-[80px]">
              <div className="relative w-16 mx-auto">
                <Input
                  type="text"
                  value={editableData[year] || ""}
                  onChange={(e) => handleInputChange(year, e.target.value)}
                  onBlur={(e) => handleInputBlur(year, e.target.value)}
                  className={`text-center text-xs h-6 py-0 text-right ${
                    isFbInputRow ? 'text-blue-600 bg-yellow-50' : 'text-blue-600'
                  } ${isYoYRow ? 'pr-4' : 'pr-1'}`}
                />
                {isYoYRow && <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>}
              </div>
            </TableCell>
          );
        }
        return (
          <TableCell key={`forecast-${index}`} className="text-center text-xs py-1 px-1 min-w-[80px]">
            {data}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default MetricRow;
