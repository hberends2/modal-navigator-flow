
import React, { ReactNode } from "react";
import { TableRow, TableCell } from "../ui/table";

interface MetricRowProps {
  label: ReactNode;
  historicalData: ReactNode[];
  forecastData: ReactNode[];
  isHeaderRow?: boolean;
  className?: string;
}

const MetricRow: React.FC<MetricRowProps> = ({
  label,
  historicalData,
  forecastData,
  isHeaderRow = false,
  className = ""
}) => {
  const baseRowClass = isHeaderRow ? "border-b border-gray-300" : "border-b border-gray-100 hover:bg-gray-50";
  const baseCellClass = isHeaderRow ? "py-1 px-2" : "py-2 px-2";

  return (
    <TableRow className={`${baseRowClass} ${className}`}>
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
      {forecastData.map((data, index) => (
        <TableCell 
          key={`forecast-${index}`} 
          className={`text-center ${baseCellClass} min-w-[80px] ${isHeaderRow ? 'bg-gray-600' : 'bg-green-25'}`}
        >
          {data}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default MetricRow;
