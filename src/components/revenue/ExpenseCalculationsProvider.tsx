
import React, { createContext, useContext, useMemo } from "react";
import { historicalExpenseData } from "./ExpenseData";
import { createExpenseCalculations } from "./ExpenseCalculations";

interface ExpenseCalculationsContextType {
  calculations: ReturnType<typeof createExpenseCalculations>;
  calculateTotalExpense: (year: number) => number;
  getTotalHistoricalExpense: (year: number) => number;
  calculateGrossOperatingProfit: (year: number) => number;
}

const ExpenseCalculationsContext = createContext<ExpenseCalculationsContextType | null>(null);

interface ExpenseCalculationsProviderProps {
  children: React.ReactNode;
  expenseForecastMethod: string;
  helpers: any;
  historicalYears: number[];
  roomsExpenseInput: Record<number, string>;
  fbExpenseInput: Record<number, string>;
  otherOperatedExpenseInput: Record<number, string>;
  miscellaneousExpenseInput: Record<number, string>;
  allocatedExpenseInput: Record<number, string>;
  propertyOperationsExpenseInput: Record<number, string>;
  administrativeGeneralExpenseInput: Record<number, string>;
  infoTechServicesExpenseInput: Record<number, string>;
  salesMarketingExpenseInput: Record<number, string>;
  utilitiesExpenseInput: Record<number, string>;
  nonOperatingExpenseInput: Record<number, string>;
}

export const ExpenseCalculationsProvider: React.FC<ExpenseCalculationsProviderProps> = ({
  children,
  expenseForecastMethod,
  helpers,
  historicalYears,
  roomsExpenseInput,
  fbExpenseInput,
  otherOperatedExpenseInput,
  miscellaneousExpenseInput,
  allocatedExpenseInput,
  propertyOperationsExpenseInput,
  administrativeGeneralExpenseInput,
  infoTechServicesExpenseInput,
  salesMarketingExpenseInput,
  utilitiesExpenseInput,
  nonOperatingExpenseInput
}) => {
  const calculations = useMemo(() => 
    createExpenseCalculations(historicalExpenseData, expenseForecastMethod, helpers),
    [expenseForecastMethod, helpers]
  );

  const calculateTotalExpense = (year: number) => {
    const roomsExpense = calculations.calculateExpense(year, roomsExpenseInput[year], 'rooms');
    const totalOtherOperatedExpense = calculations.calculateTotalOtherOperatedExpense(year, {
      fbExpenseInput,
      otherOperatedExpenseInput,
      miscellaneousExpenseInput,
      allocatedExpenseInput
    });
    const totalUndistributedExpenses = calculations.calculateTotalUndistributedExpenses(year, historicalYears, {
      propertyOperationsExpenseInput,
      administrativeGeneralExpenseInput,
      infoTechServicesExpenseInput,
      salesMarketingExpenseInput,
      utilitiesExpenseInput
    });
    const totalNonOperatingExpenses = calculations.calculateTotalNonOperatingExpenses(year, historicalYears, nonOperatingExpenseInput);
    
    return roomsExpense + totalOtherOperatedExpense + totalUndistributedExpenses + totalNonOperatingExpenses;
  };

  const getTotalHistoricalExpense = (year: number) => {
    return (historicalExpenseData.rooms[year] || 0) + 
           calculations.getTotalHistoricalOtherOperatedExpense(year) +
           calculations.calculateTotalUndistributedExpenses(year, historicalYears, {
             propertyOperationsExpenseInput,
             administrativeGeneralExpenseInput,
             infoTechServicesExpenseInput,
             salesMarketingExpenseInput,
             utilitiesExpenseInput
           }) +
           (historicalExpenseData.nonOperating[year] || 0);
  };

  const calculateGrossOperatingProfit = (year: number) => {
    const isHistorical = historicalYears.includes(year);
    const totalRevenue = helpers.calculateTotalRevenue(year, isHistorical);
    
    const roomsExpense = isHistorical 
      ? (historicalExpenseData.rooms[year] || 0)
      : calculations.calculateExpense(year, roomsExpenseInput[year], 'rooms');
    
    const totalOtherOperatedExpense = calculations.calculateTotalOtherOperatedExpense(year, {
      fbExpenseInput,
      otherOperatedExpenseInput,
      miscellaneousExpenseInput,
      allocatedExpenseInput
    });
    const totalUndistributedExpenses = calculations.calculateTotalUndistributedExpenses(year, historicalYears, {
      propertyOperationsExpenseInput,
      administrativeGeneralExpenseInput,
      infoTechServicesExpenseInput,
      salesMarketingExpenseInput,
      utilitiesExpenseInput
    });
    
    return totalRevenue - roomsExpense - totalOtherOperatedExpense - totalUndistributedExpenses;
  };

  const contextValue = {
    calculations,
    calculateTotalExpense,
    getTotalHistoricalExpense,
    calculateGrossOperatingProfit
  };

  return (
    <ExpenseCalculationsContext.Provider value={contextValue}>
      {children}
    </ExpenseCalculationsContext.Provider>
  );
};

export const useExpenseCalculations = () => {
  const context = useContext(ExpenseCalculationsContext);
  if (!context) {
    throw new Error('useExpenseCalculations must be used within ExpenseCalculationsProvider');
  }
  return context;
};
