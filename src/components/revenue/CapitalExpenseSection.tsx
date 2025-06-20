
import React from "react";
import MetricRow from "./MetricRow";

interface CapitalExpenseRow {
  id: string;
  description: string;
  year2025: string;
  year2026: string;
  year2027: string;
  year2028: string;
  year2029: string;
}

interface CapitalExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
  capitalExpenseRows?: CapitalExpenseRow[];
}

const CapitalExpenseSection: React.FC<CapitalExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  formatCurrency,
  capitalExpenseRows = []
}) => {
  const formatNumber = (value: string): number => {
    // Remove all non-digit characters and convert to number
    const numericValue = value.replace(/\D/g, "");
    return parseInt(numericValue) || 0;
  };

  const getCapitalExpenseValue = (year: number, rowIndex: number = 0) => {
    if (capitalExpenseRows.length === 0) return 0;
    
    const row = capitalExpenseRows[rowIndex];
    if (!row) return 0;

    switch (year) {
      case 2025:
        return formatNumber(row.year2025);
      case 2026:
        return formatNumber(row.year2026);
      case 2027:
        return formatNumber(row.year2027);
      case 2028:
        return formatNumber(row.year2028);
      case 2029:
        return formatNumber(row.year2029);
      default:
        return 0;
    }
  };

  const getCapitalExpenseDescription = (rowIndex: number = 0) => {
    if (capitalExpenseRows.length === 0) return "";
    const row = capitalExpenseRows[rowIndex];
    return row ? row.description : "";
  };

  return (
    <>
      {/* Capital Expense Section Header */}
      <tr id="capital-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* Capital Expense Header Row */}
      <MetricRow
        label={
          <div className="bg-gray-600 text-white px-2 py-1 text-center font-bold text-sm rounded-sm">
            CAPITAL EXPENSE
          </div>
        }
        historicalData={historicalYears.map(() => (
          <div className="bg-gray-600 h-6"></div>
        ))}
        forecastData={forecastYears.map(() => (
          <div className="bg-gray-600 h-6"></div>
        ))}
        isHeaderRow={true}
      />

      {/* First Capital Expense Row */}
      <MetricRow
        label={
          <span className="text-sm">
            {getCapitalExpenseDescription(0) || "Capital Expense Item"}
          </span>
        }
        historicalData={historicalYears.map(() => (
          <span className="text-sm text-gray-400">-</span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="text-sm">
            {formatCurrency(getCapitalExpenseValue(year, 0))}
          </span>
        ))}
      />
    </>
  );
};

export default CapitalExpenseSection;
