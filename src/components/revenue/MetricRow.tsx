
import React, { ReactNode } from "react";
import { TableRow, TableCell } from "../ui/table";

interface MetricRowProps {
  id?: string;
  label: ReactNode;
  historicalData: ReactNode[];
  forecastData: ReactNode[];
  isHeaderRow?: boolean;
  className?: string;
  // Section header props
  isSectionHeader?: boolean;
  // Two-row metric props
  isTwoRowMetric?: boolean;
  metricText?: string;
  controls?: ReactNode;
  // Editable props
  isEditable?: boolean;
  editableData?: Record<number, string>;
  onEditableChange?: (year: number, value: string) => void;
  onEditableBlur?: (year: number, value: string) => void;
  forecastYears?: number[];
  // Styling props
  isIndented?: boolean;
  isYoYRow?: boolean;
  isUserInputRow?: boolean;
  isFbInputRow?: boolean;
  isGrowthRow?: boolean;
  // ADR specific props
  adrGrowthType?: string;
  yearlyAdrGrowth?: Record<number, string>;
  handleYearlyAdrChange?: (year: number, value: string) => void;
  handleYearlyAdrBlur?: (year: number, value: string) => void;
}

const MetricRow: React.FC<MetricRowProps> = ({
  id,
  label,
  historicalData,
  forecastData,
  isHeaderRow = false,
  className = "",
  isSectionHeader = false,
  isTwoRowMetric = false,
  metricText,
  controls,
  isEditable = false,
  editableData = {},
  onEditableChange,
  onEditableBlur,
  forecastYears = [],
  isIndented = false,
  isYoYRow = false,
  isUserInputRow = false,
  isFbInputRow = false,
  isGrowthRow = false,
  adrGrowthType,
  yearlyAdrGrowth = {},
  handleYearlyAdrChange,
  handleYearlyAdrBlur
}) => {
  const baseRowClass = isHeaderRow ? "border-b border-gray-300" : "border-b border-gray-100 hover:bg-gray-50";
  const baseCellClass = isHeaderRow ? "py-1 px-2" : "py-2 px-2";

  // Handle two-row metrics (like ADR Growth Controls)
  if (isTwoRowMetric) {
    return (
      <>
        <TableRow className="border-b border-gray-100" id={id}>
          <TableCell className="font-medium text-left py-2 px-2 bg-white sticky left-0 z-10 w-48">
            <div className="flex items-center justify-between">
              <span>{metricText}</span>
              {controls}
            </div>
          </TableCell>
          {historicalData.map((data, index) => (
            <TableCell 
              key={`hist-${index}`} 
              className="text-center py-2 px-2 min-w-[80px] bg-blue-25"
            >
              {data}
            </TableCell>
          ))}
          {forecastData.map((data, index) => (
            <TableCell 
              key={`forecast-${index}`} 
              className="text-center py-2 px-2 min-w-[80px] bg-green-25"
            >
              {data}
            </TableCell>
          ))}
        </TableRow>
        {/* Render additional rows for yearly growth inputs if needed */}
        {isGrowthRow && adrGrowthType === "yearly" && (
          <TableRow className="border-b border-gray-100 hover:bg-gray-50">
            <TableCell className="font-medium text-left py-2 px-2 bg-white sticky left-0 z-10 w-48">
              {/* Empty label cell for yearly inputs */}
            </TableCell>
            {historicalData.map((_, index) => (
              <TableCell 
                key={`hist-yearly-${index}`} 
                className="text-center py-2 px-2 min-w-[80px] bg-blue-25"
              >
                {/* Empty historical cells */}
              </TableCell>
            ))}
            {forecastYears.map((year, index) => (
              <TableCell 
                key={`forecast-yearly-${index}`} 
                className="text-center py-2 px-2 min-w-[80px] bg-green-25"
              >
                <input
                  type="text"
                  value={yearlyAdrGrowth[year] || ""}
                  onChange={(e) => handleYearlyAdrChange?.(year, e.target.value)}
                  onBlur={(e) => handleYearlyAdrBlur?.(year, e.target.value)}
                  className="w-full text-center border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
                />
              </TableCell>
            ))}
          </TableRow>
        )}
      </>
    );
  }

  return (
    <TableRow className={`${baseRowClass} ${className}`} id={id}>
      <TableCell className={`font-medium text-left ${baseCellClass} bg-white sticky left-0 z-10 w-48`}>
        {label}
      </TableCell>
      {historicalData.map((data, index) => (
        <TableCell 
          key={`hist-${index}`} 
          className={`text-center ${baseCellClass} min-w-[80px] ${isHeaderRow ? 'bg-gray-600' : 'bg-blue-25'}`}
        >
          {data}
        </TableCell>
      ))}
      {forecastData.map((data, index) => {
        const year = forecastYears[index];
        const isEditableCell = isEditable && year;
        
        return (
          <TableCell 
            key={`forecast-${index}`} 
            className={`text-center ${baseCellClass} min-w-[80px] ${isHeaderRow ? 'bg-gray-600' : 'bg-green-25'}`}
          >
            {isEditableCell ? (
              <input
                type="text"
                value={editableData[year] || ""}
                onChange={(e) => onEditableChange?.(year, e.target.value)}
                onBlur={(e) => onEditableBlur?.(year, e.target.value)}
                className="w-full text-center border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
              />
            ) : (
              data
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default MetricRow;
