
import React from "react";
import UndistributedExpensesSection from "../UndistributedExpensesSection";
import GrossOperatingProfitSection from "../GrossOperatingProfitSection";
import { useExpenseCalculations } from "../ExpenseCalculationsProvider";
import { historicalExpenseData } from "../ExpenseData";

interface UndistributedExpensesSectionsProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
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
  formatCurrency: (value: number) => string;
}

const UndistributedExpensesSections: React.FC<UndistributedExpensesSectionsProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
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
  formatCurrency
}) => {
  const { calculations } = useExpenseCalculations();

  return (
    <>
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

      <GrossOperatingProfitSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        formatCurrency={formatCurrency}
      />
    </>
  );
};

export default UndistributedExpensesSections;
