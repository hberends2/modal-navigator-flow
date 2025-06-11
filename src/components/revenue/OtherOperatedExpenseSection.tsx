import React from "react";
import MetricRow from "./MetricRow";

interface OtherOperatedExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  fbExpenseInput: Record<number, string>;
  handleFbExpenseChange: (year: number, value: string) => void;
  handleFbExpenseBlur: (year: number, value: string) => void;
  resortFeeExpenseInput: Record<number, string>;
  handleResortFeeExpenseChange: (year: number, value: string) => void;
  handleResortFeeExpenseBlur: (year: number, value: string) => void;
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
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  calculateTotalOtherOperatedExpense: (year: number) => number;
  getTotalHistoricalOtherOperatedExpense: (year: number) => number;
  historicalExpenseData: any;
}

const OtherOperatedExpenseSection: React.FC<OtherOperatedExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  fbExpenseInput,
  handleFbExpenseChange,
  handleFbExpenseBlur,
  resortFeeExpenseInput,
  handleResortFeeExpenseChange,
  handleResortFeeExpenseBlur,
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
  calculateExpense,
  calculateTotalOtherOperatedExpense,
  getTotalHistoricalOtherOperatedExpense,
  historicalExpenseData
}) => {
  return (
    <>
      <tr id="other-operated-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Other Operated Expense</span>}
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
        label="Food & Beverage Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.fb[year] || 0))}
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

      {/* Resort Fee Expense */}
      <tr id="resort-fee-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Resort Fee Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label="Resort Fee Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.resortFee[year] || 0))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={resortFeeExpenseInput}
        onEditableChange={handleResortFeeExpenseChange}
        onEditableBlur={handleResortFeeExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Resort Fee Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.resortFee[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, resortFeeExpenseInput[year], 'resortFee')))}
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
        label="Other Operated Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.otherOperated[year] || 0))}
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
        label="Miscellaneous Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.miscellaneous[year] || 0))}
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
        label="Allocated Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.allocated[year] || 0))}
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
