
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
  formatPercent: (value: number, decimals?: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  helpers: any;
}

const RoomsExpenseSection: React.FC<RoomsExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  roomsExpenseInput,
  handleRoomsExpenseChange,
  handleRoomsExpenseBlur,
  formatCurrency,
  formatPercent,
  calculateExpense,
  historicalExpenseData,
  helpers
}) => {
  const getHistoricalExpenseData = (year: number): string => {
    const totalExpense = historicalExpenseData.rooms[year] || 0;
    
    if (expenseForecastMethod === "POR") {
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
        label={`Rooms Expense (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year))}
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
        label={<span className="font-bold italic">Total Rooms Expense</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(historicalExpenseData.rooms[year] || 0)}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateExpense(year, roomsExpenseInput[year], 'rooms'))}
          </span>
        ))}
        isIndented={true}
      />
    </>
  );
};

export default RoomsExpenseSection;
