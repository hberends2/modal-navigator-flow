
import React from "react";
import RoomsExpenseSection from "../RoomsExpenseSection";
import OtherOperatedExpenseSection from "../OtherOperatedExpenseSection";
import { useExpenseCalculations } from "../ExpenseCalculationsProvider";
import { historicalExpenseData } from "../ExpenseData";

interface OperatingExpensesSectionsProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  roomsExpenseInput: Record<number, string>;
  handleRoomsExpenseChange: (year: number, value: string) => void;
  handleRoomsExpenseBlur: (year: number, value: string) => void;
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
  helpers: any;
}

const OperatingExpensesSections: React.FC<OperatingExpensesSectionsProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  roomsExpenseInput,
  handleRoomsExpenseChange,
  handleRoomsExpenseBlur,
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
  helpers
}) => {
  const { calculations } = useExpenseCalculations();

  return (
    <>
      {/* Rooms Expense Section */}
      <RoomsExpenseSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseForecastMethod={expenseForecastMethod}
        roomsExpenseInput={roomsExpenseInput}
        handleRoomsExpenseChange={handleRoomsExpenseChange}
        handleRoomsExpenseBlur={handleRoomsExpenseBlur}
        formatCurrency={formatCurrency}
        formatPercent={formatPercent}
        calculateExpense={calculations.calculateExpense}
        historicalExpenseData={historicalExpenseData}
        helpers={helpers}
      />

      <OtherOperatedExpenseSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseForecastMethod={expenseForecastMethod}
        fbExpenseInput={fbExpenseInput}
        handleFbExpenseChange={handleFbExpenseChange}
        handleFbExpenseBlur={handleFbExpenseBlur}
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
        formatPercent={formatPercent}
        calculateExpense={calculations.calculateExpense}
        calculateTotalOtherOperatedExpense={(year: number) => calculations.calculateTotalOtherOperatedExpense(year, {
          fbExpenseInput,
          otherOperatedExpenseInput,
          miscellaneousExpenseInput,
          allocatedExpenseInput
        })}
        getTotalHistoricalOtherOperatedExpense={calculations.getTotalHistoricalOtherOperatedExpense}
        historicalExpenseData={historicalExpenseData}
        helpers={helpers}
      />
    </>
  );
};

export default OperatingExpensesSections;
