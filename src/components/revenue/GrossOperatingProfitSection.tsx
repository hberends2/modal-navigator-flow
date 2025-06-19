
import React from "react";
import MetricRow from "./MetricRow";
import { useExpenseCalculations } from "./ExpenseCalculationsProvider";

interface GrossOperatingProfitSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
}

const GrossOperatingProfitSection: React.FC<GrossOperatingProfitSectionProps> = ({
  historicalYears,
  forecastYears,
  formatCurrency
}) => {
  const { calculateGrossOperatingProfit } = useExpenseCalculations();

  return (
    <MetricRow
      label={<span className="font-bold text-gray-900">Gross Operating Profit</span>}
      historicalData={historicalYears.map(year => formatCurrency(calculateGrossOperatingProfit(year)))}
      forecastData={forecastYears.map(year => formatCurrency(calculateGrossOperatingProfit(year)))}
      className="border-t border-gray-200"
    />
  );
};

export default GrossOperatingProfitSection;
