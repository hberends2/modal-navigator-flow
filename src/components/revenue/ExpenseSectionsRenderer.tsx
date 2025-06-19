import React from "react";
import RoomsExpenseSection from "./RoomsExpenseSection";
import OtherOperatedExpenseSection from "./OtherOperatedExpenseSection";
import UndistributedExpensesSection from "./UndistributedExpensesSection";
import NonOperatingExpensesSection from "./NonOperatingExpensesSection";
import TotalExpenseSection from "./TotalExpenseSection";
import GrossOperatingProfitSection from "./GrossOperatingProfitSection";
import { historicalExpenseData } from "./ExpenseData";
import { useExpenseCalculations } from "./ExpenseCalculationsProvider";

interface ExpenseSectionsRendererProps {
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
  propertyOperationsExpenseInput: Record<number, string>;
  handlePropertyOperationsExpenseChange: (year: number, value: string) => void;
  handlePropertyOperationsExpenseBlur: (year: number, value: string) => void;
  administrativeGeneralExpenseInput: Record<number, string>;
  handleAdministrativeGeneralExpenseChange: (year: number, value: string) => void;
  handleAdministrativeGeneralExpenseBlur: (year: number, value: string) => void;
  infoTechServicesExpenseInput: Record<number, string>;
  handleInfoTechServicesExpenseChange: (year: number, value: string) => void;
  handleInfoTechServicesExpenseBlur: (year: number, value: string) => void;
  salesMarketingExpenseInput: Record<number, string>;
  handleSalesMarketingExpenseChange: (year: number, value: string) => void;
  handleSalesMarketingExpenseBlur: (year: number, value: string) => void;
  utilitiesExpenseInput: Record<number, string>;
  handleUtilitiesExpenseChange: (year: number, value: string) => void;
  handleUtilitiesExpenseBlur: (year: number, value: string) => void;
  nonOperatingExpenseInput: Record<number, string>;
  handleNonOperatingExpenseChange: (year: number, value: string) => void;
  handleNonOperatingExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  helpers: any;
}

const ExpenseSectionsRenderer: React.FC<ExpenseSectionsRendererProps> = ({
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
  propertyOperationsExpenseInput,
  handlePropertyOperationsExpenseChange,
  handlePropertyOperationsExpenseBlur,
  administrativeGeneralExpenseInput,
  handleAdministrativeGeneralExpenseChange,
  handleAdministrativeGeneralExpenseBlur,
  infoTechServicesExpenseInput,
  handleInfoTechServicesExpenseChange,
  handleInfoTechServicesExpenseBlur,
  salesMarketingExpenseInput,
  handleSalesMarketingExpenseChange,
  handleSalesMarketingExpenseBlur,
  utilitiesExpenseInput,
  handleUtilitiesExpenseChange,
  handleUtilitiesExpenseBlur,
  nonOperatingExpenseInput,
  handleNonOperatingExpenseChange,
  handleNonOperatingExpenseBlur,
  formatCurrency,
  formatPercent,
  helpers
}) => {
  const { 
    calculations, 
    calculateTotalExpense, 
    getTotalHistoricalExpense 
  } = useExpenseCalculations();

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

      {/* Other Operated Expense Section */}
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

      {/* Undistributed Expenses Section */}
      <UndistributedExpensesSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseForecastMethod={expenseForecastMethod}
        propertyOperationsExpenseInput={propertyOperationsExpenseInput}
        handlePropertyOperationsExpenseChange={handlePropertyOperationsExpenseChange}
        handlePropertyOperationsExpenseBlur={handlePropertyOperationsExpenseBlur}
        administrativeGeneralExpenseInput={administrativeGeneralExpenseInput}
        handleAdministrativeGeneralExpenseChange={handleAdministrativeGeneralExpenseChange}
        handleAdministrativeGeneralExpenseBlur={handleAdministrativeGeneralExpenseBlur}
        infoTechServicesExpenseInput={infoTechServicesExpenseInput}
        handleInfoTechServicesExpenseChange={handleInfoTechServicesExpenseChange}
        handleInfoTechServicesExpenseBlur={handleInfoTechServicesExpenseBlur}
        salesMarketingExpenseInput={salesMarketingExpenseInput}
        handleSalesMarketingExpenseChange={handleSalesMarketingExpenseChange}
        handleSalesMarketingExpenseBlur={handleSalesMarketingExpenseBlur}
        utilitiesExpenseInput={utilitiesExpenseInput}
        handleUtilitiesExpenseChange={handleUtilitiesExpenseChange}
        handleUtilitiesExpenseBlur={handleUtilitiesExpenseBlur}
        formatCurrency={formatCurrency}
        calculateExpense={calculations.calculateExpense}
        calculateTotalUndistributedExpenses={(year: number) => calculations.calculateTotalUndistributedExpenses(year, historicalYears, {
          propertyOperationsExpenseInput,
          administrativeGeneralExpenseInput,
          infoTechServicesExpenseInput,
          salesMarketingExpenseInput,
          utilitiesExpenseInput
        })}
        historicalExpenseData={historicalExpenseData}
        getHistoricalExpenseData={calculations.getHistoricalExpenseData}
      />

      {/* Gross Operating Profit Row */}
      <GrossOperatingProfitSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        formatCurrency={formatCurrency}
      />

      {/* Non-Operating Expenses Section */}
      <NonOperatingExpensesSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseForecastMethod={expenseForecastMethod}
        nonOperatingExpenseInput={nonOperatingExpenseInput}
        handleNonOperatingExpenseChange={handleNonOperatingExpenseChange}
        handleNonOperatingExpenseBlur={handleNonOperatingExpenseBlur}
        formatCurrency={formatCurrency}
        calculateExpense={calculations.calculateExpense}
        historicalExpenseData={historicalExpenseData}
        getHistoricalExpenseData={calculations.getHistoricalExpenseData}
        helpers={helpers}
      />

      {/* Total Expense Section */}
      <TotalExpenseSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        formatCurrency={formatCurrency}
        calculateTotalExpense={calculateTotalExpense}
        getTotalHistoricalExpense={getTotalHistoricalExpense}
      />
    </>
  );
};

export default ExpenseSectionsRenderer;
