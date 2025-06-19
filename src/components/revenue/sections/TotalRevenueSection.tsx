
import React from "react";
import MetricRow from "../MetricRow";
import { CalculationHelpers } from "../RevenueTableHelpers";

interface TotalRevenueSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
  helpers: CalculationHelpers;
}

const TotalRevenueSection: React.FC<TotalRevenueSectionProps> = ({
  historicalYears,
  forecastYears,
  formatCurrency,
  helpers
}) => {
  return (
    <>
      <tr id="total-revenue-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-sm">Total Revenue</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold text-sm">
            {formatCurrency(helpers.calculateTotalRevenue(year, true))}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold text-sm">
            {formatCurrency(helpers.calculateTotalRevenue(year, false))}
          </span>
        ))}
      />
    </>
  );
};

export default TotalRevenueSection;
