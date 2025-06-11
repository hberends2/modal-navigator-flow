
import React from "react";
import MetricRow from "./MetricRow";

interface RoomsExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  roomsExpenseInput: Record<number, string>;
  handleRoomsExpenseChange: (year: number, value: string) => void;
  handleRoomsExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
}

const RoomsExpenseSection: React.FC<RoomsExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  roomsExpenseInput,
  handleRoomsExpenseChange,
  handleRoomsExpenseBlur,
  formatCurrency,
  calculateExpense,
  historicalExpenseData
}) => {
  return (
    <>
      <tr id="rooms-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Rooms Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label="Rooms Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.rooms[year] || 0))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={roomsExpenseInput}
        onEditableChange={handleRoomsExpenseChange}
        onEditableBlur={handleRoomsExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Rooms Expense"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.rooms[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, roomsExpenseInput[year], 'rooms')))}
        isIndented={true}
      />
    </>
  );
};

export default RoomsExpenseSection;
