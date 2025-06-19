
import React from "react";
import NonOperatingExpensesSection from "../NonOperatingExpensesSection";
import TotalExpenseSection from "../TotalExpenseSection";
import EBITDASection from "../EBITDASection";
import ReserveForReplacementSection from "../ReserveForReplacementSection";
import NetOperatingIncomeSection from "../NetOperatingIncomeSection";
import { useExpenseCalculations } from "../ExpenseCalculationsProvider";
import { historicalExpenseData } from "../ExpenseData";

interface FinalExpensesSectionsProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  managementFeesExpenseInput: Record<number, string>;
  handleManagementFeesExpenseChange: (year: number, value: string) => void;
  handleManagementFeesExpenseBlur: (year: number, value: string) => void;
  realEstateTaxesExpenseInput: Record<number, string>;
  handleRealEstateTaxesExpenseChange: (year: number, value: string) => void;
  handleRealEstateTaxesExpenseBlur: (year: number, value: string) => void;
  insuranceExpenseInput: Record<number, string>;
  handleInsuranceExpenseChange: (year: number, value: string) => void;
  handleInsuranceExpenseBlur: (year: number, value: string) => void;
  otherNonOpExpenseInput: Record<number, string>;
  handleOtherNonOpExpenseChange: (year: number, value: string) => void;
  handleOtherNonOpExpenseBlur: (year: number, value: string) => void;
  reserveForReplacementInput: Record<number, string>;
  handleReserveForReplacementChange: (year: number, value: string) => void;
  handleReserveForReplacementBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  helpers: any;
}

const FinalExpensesSections: React.FC<FinalExpensesSectionsProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  managementFeesExpenseInput,
  handleManagementFeesExpenseChange,
  handleManagementFeesExpenseBlur,
  realEstateTaxesExpenseInput,
  handleRealEstateTaxesExpenseChange,
  handleRealEstateTaxesExpenseBlur,
  insuranceExpenseInput,
  handleInsuranceExpenseChange,
  handleInsuranceExpenseBlur,
  otherNonOpExpenseInput,
  handleOtherNonOpExpenseChange,
  handleOtherNonOpExpenseBlur,
  reserveForReplacementInput,
  handleReserveForReplacementChange,
  handleReserveForReplacementBlur,
  formatCurrency,
  helpers
}) => {
  const { 
    calculations, 
    calculateTotalExpense, 
    getTotalHistoricalExpense 
  }= useExpenseCalculations();

  return (
    <>
      <NonOperatingExpensesSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseForecastMethod={expenseForecastMethod}
        managementFeesExpenseInput={managementFeesExpenseInput}
        handleManagementFeesExpenseChange={handleManagementFeesExpenseChange}
        handleManagementFeesExpenseBlur={handleManagementFeesExpenseBlur}
        realEstateTaxesExpenseInput={realEstateTaxesExpenseInput}
        handleRealEstateTaxesExpenseChange={handleRealEstateTaxesExpenseChange}
        handleRealEstateTaxesExpenseBlur={handleRealEstateTaxesExpenseBlur}
        insuranceExpenseInput={insuranceExpenseInput}
        handleInsuranceExpenseChange={handleInsuranceExpenseChange}
        handleInsuranceExpenseBlur={handleInsuranceExpenseBlur}
        otherNonOpExpenseInput={otherNonOpExpenseInput}
        handleOtherNonOpExpenseChange={handleOtherNonOpExpenseChange}
        handleOtherNonOpExpenseBlur={handleOtherNonOpExpenseBlur}
        formatCurrency={formatCurrency}
        calculateNonOpExpense={calculations.calculateNonOpExpense}
        historicalExpenseData={historicalExpenseData}
        getHistoricalNonOpExpenseData={calculations.getHistoricalNonOpExpenseData}
        helpers={helpers}
      />

      <TotalExpenseSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        formatCurrency={formatCurrency}
        calculateTotalExpense={calculateTotalExpense}
        getTotalHistoricalExpense={getTotalHistoricalExpense}
      />

      <EBITDASection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        formatCurrency={formatCurrency}
        helpers={helpers}
      />

      <ReserveForReplacementSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        reserveForReplacementInput={reserveForReplacementInput}
        handleReserveForReplacementChange={handleReserveForReplacementChange}
        handleReserveForReplacementBlur={handleReserveForReplacementBlur}
        formatCurrency={formatCurrency}
      />

      <NetOperatingIncomeSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        reserveForReplacementInput={reserveForReplacementInput}
        formatCurrency={formatCurrency}
        helpers={helpers}
      />
    </>
  );
};

export default FinalExpensesSections;
