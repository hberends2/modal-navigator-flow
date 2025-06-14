
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
  getHistoricalExpenseData
}) => {
  const calculateTotalNonOperatingExpenses = (year: number) => {
    if (historicalYears.includes(year)) {
      return historicalExpenseData.nonOperating?.[year] || 0;
    } else {
      return calculateExpense(year, nonOperatingExpenseInput[year], 'nonOperating');
    }
  };

  return (
    <>
      {/* Non-Operating Expenses Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Non-Operating</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Non-Operating Expense Input Row */}
      <MetricRow
        label={`Non-Operating (${expenseForecastMethod})`}
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

      {/* Total Non-Operating Row */}
      <MetricRow
        label={<span className="font-medium">Total Non-Operating</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(calculateTotalNonOperatingExpenses(year))
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateTotalNonOperatingExpenses(year))
        )}
      />
    </>
  );
};

export default NonOperatingExpensesSection;
