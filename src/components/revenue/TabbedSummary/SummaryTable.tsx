
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { MetricRow } from "./types";

interface SummaryTableProps {
  metrics: MetricRow[];
  historicalYears: number[];
  forecastYears: number[];
  activeTab: string;
  isOtherOperatedExpanded: boolean;
  subcategoryMetrics: MetricRow[];
}

const SummaryTable: React.FC<SummaryTableProps> = ({
  metrics,
  historicalYears,
  forecastYears,
  activeTab,
  isOtherOperatedExpanded,
  subcategoryMetrics
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-80 font-semibold text-xs">Metric</TableHead>
            {historicalYears.map(year => (
              <TableHead key={year} className="text-center font-semibold bg-blue-50 text-xs w-20">
                {year}
              </TableHead>
            ))}
            {forecastYears.map(year => (
              <TableHead key={year} className="text-center font-semibold bg-green-50 text-xs w-20">
                {year}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric, index) => (
            <TableRow key={index} className="h-6">
              <TableCell className={`font-medium text-xs py-0.5 ${metric.isSubcategory ? 'pl-8' : ''}`}>
                {metric.label}
              </TableCell>
              {metric.data.map((value, yearIndex) => {
                const isHistorical = yearIndex < historicalYears.length;
                return (
                  <TableCell 
                    key={yearIndex} 
                    className={`text-center text-xs py-0.5 w-20 ${isHistorical ? 'bg-blue-25' : 'bg-green-25'}`}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          {(activeTab === "revenue" || activeTab === "expense") && isOtherOperatedExpanded && subcategoryMetrics.map((metric, index) => (
            <TableRow key={`sub-${index}`} className="h-6">
              <TableCell className="font-medium text-xs py-0.5 pl-8">
                {metric.label}
              </TableCell>
              {metric.data.map((value, yearIndex) => {
                const isHistorical = yearIndex < historicalYears.length;
                return (
                  <TableCell 
                    key={yearIndex} 
                    className={`text-center text-xs py-0.5 w-20 ${isHistorical ? 'bg-blue-25' : 'bg-green-25'}`}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SummaryTable;
