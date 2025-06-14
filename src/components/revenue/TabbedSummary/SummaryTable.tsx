
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
  // Function to render all rows including subcategories in the correct position
  const renderTableRows = () => {
    const rows: React.ReactNode[] = [];
    
    metrics.forEach((metric, index) => {
      // Add the main metric row
      rows.push(
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
      );
      
      // If this is the collapsible "Total Other Operated" row and it's expanded, add subcategories
      if (metric.isCollapsible && isOtherOperatedExpanded && 
          ((activeTab === "revenue" && typeof metric.label === 'object') || 
           (activeTab === "expense" && typeof metric.label === 'object'))) {
        subcategoryMetrics.forEach((subMetric, subIndex) => {
          rows.push(
            <TableRow key={`sub-${subIndex}`} className="h-6">
              <TableCell className="font-medium text-xs py-0.5 pl-8">
                {subMetric.label}
              </TableCell>
              {subMetric.data.map((value, yearIndex) => {
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
          );
        });
      }
    });
    
    return rows;
  };

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
          {renderTableRows()}
        </TableBody>
      </Table>
    </div>
  );
};

export default SummaryTable;
