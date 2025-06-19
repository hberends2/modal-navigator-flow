
import React from "react";
import MetricRow from "./MetricRow";

interface NonOperatingExpensesSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  nonOperatingExpenseInput: Record<number, string>;
  handleNonOperatingExpenseChange: (year: number, value: string) => void;
  handleNonOperatingExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  getHistoricalExpenseData: (year: number, expenseType: string) => string;
  helpers: any;
}

const NonOperatingExpensesSection: React.FC<NonOperatingExpensesSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  nonOperatingExpenseInput,
  handleNonOperatingExpenseChange,
  handleNonOperatingExpenseBlur,
  formatCurrency,
  calculateExpense,
  historicalExpenseData,
  getHistoricalExpenseData,
  helpers
}) => {
  return (
    <>
      <tr id="non-operating-expenses-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Other Non-Operating Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label={`Other Non-Operating Expense (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'nonOperating'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={nonOperatingExpenseInput}
        onEditableChange={handleNonOperatingExpenseChange}
        onEditableBlur={handleNonOperatingExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Other Non-Operating Expense</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(historicalExpenseData.nonOperating[year] || 0)}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateExpense(year, nonOperatingExpenseInput[year], 'nonOperating'))}
          </span>
        ))}
        isIndented={true}
      />
    </>
  );
};

export default NonOperatingExpensesSection;
