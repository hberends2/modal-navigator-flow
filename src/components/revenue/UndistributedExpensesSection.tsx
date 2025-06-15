
import React from "react";
import MetricRow from "./MetricRow";

interface UndistributedExpensesSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  undistributedExpenseInput: Record<number, string>;
  handleUndistributedExpenseChange: (year: number, value: string) => void;
  handleUndistributedExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  getHistoricalExpenseData: (year: number, expenseType: string) => string;
}

const UndistributedExpensesSection: React.FC<UndistributedExpensesSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  undistributedExpenseInput,
  handleUndistributedExpenseChange,
  handleUndistributedExpenseBlur,
  formatCurrency,
  calculateExpense,
  historicalExpenseData,
  getHistoricalExpenseData
}) => {
  const calculateTotalUndistributedExpenses = (year: number) => {
    if (historicalYears.includes(year)) {
      return (historicalExpenseData.propertyOperations?.[year] || 0) +
             (historicalExpenseData.administrativeGeneral?.[year] || 0) +
             (historicalExpenseData.infoTechServices?.[year] || 0) +
             (historicalExpenseData.salesMarketing?.[year] || 0) +
             (historicalExpenseData.utilities?.[year] || 0);
    } else {
      return calculateExpense(year, undistributedExpenseInput[year], 'undistributed');
    }
  };

  return (
    <div id="undistributed-expenses-section">
      {/* Undistributed Expenses Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Undistributed</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Undistributed Expense Input Row */}
      <MetricRow
        label={`Undistributed (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'undistributed'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={undistributedExpenseInput}
        onEditableChange={handleUndistributedExpenseChange}
        onEditableBlur={handleUndistributedExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />

      {/* Total Undistributed Row */}
      <MetricRow
        label={<span className="font-medium">Total Undistributed</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(calculateTotalUndistributedExpenses(year))
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateTotalUndistributedExpenses(year))
        )}
      />
    </div>
  );
};

export default UndistributedExpensesSection;
