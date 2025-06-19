import React from "react";
import MetricRow from "./MetricRow";

interface OtherOperatedExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  fbExpenseInput: Record<number, string>;
  handleFbExpenseChange: (year: number, value: string) => void;
  handleFbExpenseBlur: (year: number, value: string) => void;
  otherOperatedExpenseInput: Record<number, string>;
  handleOtherOperatedExpenseChange: (year: number, value: string) => void;
  handleOtherOperatedExpenseBlur: (year: number, value: string) => void;
  miscellaneousExpenseInput: Record<number, string>;
  handleMiscellaneousExpenseChange: (year: number, value: string) => void;
  handleMiscellaneousExpenseBlur: (year: number, value: string) => void;
  allocatedExpenseInput: Record<number, string>;
  handleAllocatedExpenseChange: (year: number, value: string) => void;
  handleAllocatedExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  calculateTotalOtherOperatedExpense: (year: number) => number;
  getTotalHistoricalOtherOperatedExpense: (year: number) => number;
  historicalExpenseData: any;
  helpers: any;
}

const OtherOperatedExpenseSection: React.FC<OtherOperatedExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  fbExpenseInput,
  handleFbExpenseChange,
  handleFbExpenseBlur,
  otherOperatedExpenseInput,
  handleOtherOperatedExpenseChange,
  handleOtherOperatedExpenseBlur,
  miscellaneousExpenseInput,
  handleMiscellaneousExpenseChange,
  handleMiscellaneousExpenseBlur,
  allocatedExpenseInput,
  handleAllocatedExpenseChange,
  handleAllocatedExpenseBlur,
  formatCurrency,
  formatPercent,
  calculateExpense,
  calculateTotalOtherOperatedExpense,
  getTotalHistoricalOtherOperatedExpense,
  historicalExpenseData,
  helpers
}) => {
  const getHistoricalExpenseData = (year: number, expenseType: string): string => {
    const totalExpense = historicalExpenseData[expenseType][year] || 0;
    
    if (expenseForecastMethod === "ADR") {
      const occupiedRooms = helpers.getHistoricalOccupiedRoomsForYear(year);
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else {
      // % of Revenue
      const totalRevenue = helpers.calculateTotalRevenue(year, true);
      const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
      return percentage.toFixed(1);
    }
  };

  return (
    <>
      <tr id="other-operated-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Other Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Food & Beverage Expense */}
      <tr id="fb-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Food & Beverage Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label={`Food & Beverage Expense (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'fb'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={fbExpenseInput}
        onEditableChange={handleFbExpenseChange}
        onEditableBlur={handleFbExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isFbInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Food & Beverage Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.fb[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, fbExpenseInput[year], 'fb')))}
        isIndented={true}
      />

      {/* Other Operated Expense */}
      <tr id="other-operated-expense-item-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Other Operated Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label={`Other Operated Expense (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'otherOperated'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={otherOperatedExpenseInput}
        onEditableChange={handleOtherOperatedExpenseChange}
        onEditableBlur={handleOtherOperatedExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Other Operated Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.otherOperated[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, otherOperatedExpenseInput[year], 'otherOperated')))}
        isIndented={true}
      />

      {/* Miscellaneous Expense */}
      <tr id="miscellaneous-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Miscellaneous Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label={`Miscellaneous Expense (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'miscellaneous'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={miscellaneousExpenseInput}
        onEditableChange={handleMiscellaneousExpenseChange}
        onEditableBlur={handleMiscellaneousExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Miscellaneous Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.miscellaneous[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, miscellaneousExpenseInput[year], 'miscellaneous')))}
        isIndented={true}
      />

      {/* Allocated Expense */}
      <tr id="allocated-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Allocated Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label={`Allocated Expense (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'allocated'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={allocatedExpenseInput}
        onEditableChange={handleAllocatedExpenseChange}
        onEditableBlur={handleAllocatedExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Allocated Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.allocated[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, allocatedExpenseInput[year], 'allocated')))}
        isIndented={true}
      />

      {/* Total Other Operated Expense Row */}
      <MetricRow
        label={<span className="font-medium">Total Other Operated Expense</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(getTotalHistoricalOtherOperatedExpense(year))
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateTotalOtherOperatedExpense(year))
        )}
      />
    </>
  );
};

export default OtherOperatedExpenseSection;
