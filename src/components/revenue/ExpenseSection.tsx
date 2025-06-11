import React from "react";
import MetricRow from "./MetricRow";
import ExpenseHeader from "./ExpenseHeader";
import RoomsExpenseSection from "./RoomsExpenseSection";
import OtherOperatedExpenseSection from "./OtherOperatedExpenseSection";

interface ExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  setExpenseForecastMethod: (value: string) => void;
  roomsExpenseInput: Record<number, string>;
  handleRoomsExpenseChange: (year: number, value: string) => void;
  handleRoomsExpenseBlur: (year: number, value: string) => void;
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
  formatPercent: (value: number, decimals?: number) => string;
  helpers: any;
}

const ExpenseSection: React.FC<ExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  setExpenseForecastMethod,
  roomsExpenseInput,
  handleRoomsExpenseChange,
  handleRoomsExpenseBlur,
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
  formatPercent,
  helpers
}) => {
  // Hard-coded historical expense data
  const historicalExpenseData = {
    rooms: { 2021: 2500000, 2022: 2650000, 2023: 2800000, 2024: 2900000 },
    fb: { 2021: 1200000, 2022: 1280000, 2023: 1350000, 2024: 1400000 },
    resortFee: { 2021: 150000, 2022: 160000, 2023: 170000, 2024: 175000 },
    otherOperated: { 2021: 800000, 2022: 850000, 2023: 900000, 2024: 920000 },
    miscellaneous: { 2021: 100000, 2022: 105000, 2023: 110000, 2024: 115000 },
    allocated: { 2021: 600000, 2022: 630000, 2023: 660000, 2024: 680000 }
  };

  const calculateExpense = (year: number, inputValue: string, expenseType: string) => {
    const input = parseFloat(inputValue || "0");
    if (expenseForecastMethod === "ADR") {
      const occupiedRooms = helpers.getForecastOccupiedRoomsForYear(year);
      return input * occupiedRooms;
    } else {
      // % of Revenue
      const totalRevenue = helpers.calculateTotalRevenue(year, false);
      return (input / 100) * totalRevenue;
    }
  };

  const calculateTotalOtherOperatedExpense = (year: number) => {
    const fbExpense = calculateExpense(year, fbExpenseInput[year], 'fb');
    const resortFeeExpense = calculateExpense(year, resortFeeExpenseInput[year], 'resortFee');
    const otherOperatedExpense = calculateExpense(year, otherOperatedExpenseInput[year], 'otherOperated');
    const miscellaneousExpense = calculateExpense(year, miscellaneousExpenseInput[year], 'miscellaneous');
    const allocatedExpense = calculateExpense(year, allocatedExpenseInput[year], 'allocated');
    
    return fbExpense + resortFeeExpense + otherOperatedExpense + miscellaneousExpense + allocatedExpense;
  };

  const calculateTotalExpense = (year: number) => {
    const roomsExpense = calculateExpense(year, roomsExpenseInput[year], 'rooms');
    const totalOtherOperatedExpense = calculateTotalOtherOperatedExpense(year);
    
    return roomsExpense + totalOtherOperatedExpense;
  };

  const getTotalHistoricalOtherOperatedExpense = (year: number) => {
    return (historicalExpenseData.fb[year] || 0) +
           (historicalExpenseData.resortFee[year] || 0) +
           (historicalExpenseData.otherOperated[year] || 0) +
           (historicalExpenseData.miscellaneous[year] || 0) +
           (historicalExpenseData.allocated[year] || 0);
  };

  const getTotalHistoricalExpense = (year: number) => {
    return (historicalExpenseData.rooms[year] || 0) + getTotalHistoricalOtherOperatedExpense(year);
  };

  return (
    <>
      {/* Expense Divider Row */}
      <ExpenseHeader 
        expenseForecastMethod={expenseForecastMethod}
        setExpenseForecastMethod={setExpenseForecastMethod}
      />

      {/* Rooms Expense Section */}
      <RoomsExpenseSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseForecastMethod={expenseForecastMethod}
        roomsExpenseInput={roomsExpenseInput}
        handleRoomsExpenseChange={handleRoomsExpenseChange}
        handleRoomsExpenseBlur={handleRoomsExpenseBlur}
        formatCurrency={formatCurrency}
        calculateExpense={calculateExpense}
        historicalExpenseData={historicalExpenseData}
      />

      {/* Other Operated Expense Section */}
      <OtherOperatedExpenseSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseForecastMethod={expenseForecastMethod}
        fbExpenseInput={fbExpenseInput}
        handleFbExpenseChange={handleFbExpenseChange}
        handleFbExpenseBlur={handleFbExpenseBlur}
        resortFeeExpenseInput={resortFeeExpenseInput}
        handleResortFeeExpenseChange={handleResortFeeExpenseChange}
        handleResortFeeExpenseBlur={handleResortFeeExpenseBlur}
        otherOperatedExpenseInput={otherOperatedExpenseInput}
        handleOtherOperatedExpenseChange={handleOtherOperatedExpenseChange}
        handleOtherOperatedExpenseBlur={handleOtherOperatedExpenseBlur}
        miscellaneousExpenseInput={miscellaneousExpenseInput}
        handleMiscellaneousExpenseChange={handleMiscellaneousExpenseChange}
        handleMiscellaneousExpenseBlur={handleMiscellaneousExpenseBlur}
        allocatedExpenseInput={allocatedExpenseInput}
        handleAllocatedExpenseChange={handleAllocatedExpenseChange}
        handleAllocatedExpenseBlur={handleAllocatedExpenseBlur}
        formatCurrency={formatCurrency}
        calculateExpense={calculateExpense}
        calculateTotalOtherOperatedExpense={calculateTotalOtherOperatedExpense}
        getTotalHistoricalOtherOperatedExpense={getTotalHistoricalOtherOperatedExpense}
        historicalExpenseData={historicalExpenseData}
      />

      {/* Total Expense Section */}
      <tr id="total-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* Total Expense Row */}
      <MetricRow
        label={<span className="font-bold text-base">Total Expense</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold text-base">
            {formatCurrency(getTotalHistoricalExpense(year))}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold text-base">
            {formatCurrency(calculateTotalExpense(year))}
          </span>
        ))}
      />
    </>
  );
};

export default ExpenseSection;
