
import React from "react";
import MetricRow from "./MetricRow";
import { useExpenseCalculations } from "./ExpenseCalculationsProvider";

interface NetOperatingIncomeSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  reserveForReplacementInput: Record<number, string>;
  formatCurrency: (value: number) => string;
  helpers: any;
}

const NetOperatingIncomeSection: React.FC<NetOperatingIncomeSectionProps> = ({
  historicalYears,
  forecastYears,
  reserveForReplacementInput,
  formatCurrency,
  helpers
}) => {
  const { calculateTotalExpense, getTotalHistoricalExpense } = useExpenseCalculations();

  const getReserveForReplacement = (year: number, isHistorical: boolean) => {
    if (isHistorical) {
      return 1000; // Historical value
    } else {
      // Add null safety check
      if (!reserveForReplacementInput) {
        console.warn('reserveForReplacementInput is undefined, using default value');
        return 0;
      }
      const inputValue = reserveForReplacementInput[year] || "0";
      return parseFloat(inputValue) || 0;
    }
  };

  return (
    <>
      {/* Net Operating Income Section */}
      <tr id="net-operating-income-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* Net Operating Income Row */}
      <MetricRow
        label={<span className="font-bold text-base">Net Operating Income</span>}
        historicalData={historicalYears.map(year => {
          const totalRevenue = helpers.calculateTotalRevenue(year, true);
          const totalExpense = getTotalHistoricalExpense(year);
          const ebitda = totalRevenue - totalExpense;
          const reserve = getReserveForReplacement(year, true);
          const noi = ebitda - reserve;
          return (
            <span className="font-bold text-base">
              {formatCurrency(noi)}
            </span>
          );
        })}
        forecastData={forecastYears.map(year => {
          const totalRevenue = helpers.calculateTotalRevenue(year, false);
          const totalExpense = calculateTotalExpense(year);
          const ebitda = totalRevenue - totalExpense;
          const reserve = getReserveForReplacement(year, false);
          const noi = ebitda - reserve;
          return (
            <span className="font-bold text-base">
              {formatCurrency(noi)}
            </span>
          );
        })}
      />
    </>
  );
};

export default NetOperatingIncomeSection;
