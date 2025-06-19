import React from "react";
import MetricRow from "./MetricRow";
import ExpenseSubSection from "./ExpenseSubSection";

interface UndistributedExpensesSectionProps {
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
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  calculateTotalUndistributedExpenses: (year: number) => number;
  historicalExpenseData: any;
  getHistoricalExpenseData: (year: number, expenseType: string) => string;
}

const UndistributedExpensesSection: React.FC<UndistributedExpensesSectionProps> = ({
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
  formatCurrency,
  calculateExpense,
  calculateTotalUndistributedExpenses,
  historicalExpenseData,
  getHistoricalExpenseData
}) => {
  const commonProps = {
    historicalYears,
    forecastYears,
    expenseForecastMethod,
    formatCurrency,
    calculateExpense,
    historicalExpenseData,
    getHistoricalExpenseData,
  };

  return (
    <>
      {/* Undistributed Expenses Section Header */}
      <MetricRow
        id="undistributed-expenses-section"
        className="scroll-mt-4"
        label={<span className="font-bold text-gray-900">Undistributed Expenses</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <tr id="property-operations-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <ExpenseSubSection
        title="Property Operations & Maintenance"
        expenseType="propertyOperations"
        expenseInput={propertyOperationsExpenseInput}
        handleExpenseChange={handlePropertyOperationsExpenseChange}
        handleExpenseBlur={handlePropertyOperationsExpenseBlur}
        {...commonProps}
      />

      <tr id="administrative-general-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <ExpenseSubSection
        title="Administrative & General"
        expenseType="administrativeGeneral"
        expenseInput={administrativeGeneralExpenseInput}
        handleExpenseChange={handleAdministrativeGeneralExpenseChange}
        handleExpenseBlur={handleAdministrativeGeneralExpenseBlur}
        {...commonProps}
      />

      <tr id="info-tech-services-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <ExpenseSubSection
        title="Info & Tech Services"
        expenseType="infoTechServices"
        expenseInput={infoTechServicesExpenseInput}
        handleExpenseChange={handleInfoTechServicesExpenseChange}
        handleExpenseBlur={handleInfoTechServicesExpenseBlur}
        {...commonProps}
      />

      <tr id="sales-marketing-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <ExpenseSubSection
        title="Sales & Marketing"
        expenseType="salesMarketing"
        expenseInput={salesMarketingExpenseInput}
        handleExpenseChange={handleSalesMarketingExpenseChange}
        handleExpenseBlur={handleSalesMarketingExpenseBlur}
        {...commonProps}
      />

      <tr id="utilities-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <ExpenseSubSection
        title="Utilities"
        expenseType="utilities"
        expenseInput={utilitiesExpenseInput}
        handleExpenseChange={handleUtilitiesExpenseChange}
        handleExpenseBlur={handleUtilitiesExpenseBlur}
        {...commonProps}
      />

      {/* Total Undistributed Expense Row */}
      <MetricRow
        label={<span className="font-bold italic">Total Undistributed Expense</span>}
        historicalData={historicalYears.map(year => 
          <span className="font-bold italic">
            {formatCurrency(calculateTotalUndistributedExpenses(year))}
          </span>
        )}
        forecastData={forecastYears.map(year => 
          <span className="font-bold italic">
            {formatCurrency(calculateTotalUndistributedExpenses(year))}
          </span>
        )}
      />
    </>
  );
};

export default UndistributedExpensesSection;
