
import React from "react";
import MetricRow from "./MetricRow";

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
  return (
    <div id="undistributed-expenses-section">
      {/* Undistributed Expenses Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Undistributed Expenses</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Property Operations & Maintenance Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Property Operations & Maintenance</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Property Operations & Maintenance Input/Data Rows */}
      <MetricRow
        label={`Property Operations & Maintenance (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'propertyOperations'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={propertyOperationsExpenseInput}
        onEditableChange={handlePropertyOperationsExpenseChange}
        onEditableBlur={handlePropertyOperationsExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Property Operations & Maintenance"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.propertyOperations[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, propertyOperationsExpenseInput[year], 'propertyOperations')))}
        isIndented={true}
      />

      {/* Administrative & General Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Administrative & General</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Administrative & General Input/Data Rows */}
      <MetricRow
        label={`Administrative & General (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'administrativeGeneral'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={administrativeGeneralExpenseInput}
        onEditableChange={handleAdministrativeGeneralExpenseChange}
        onEditableBlur={handleAdministrativeGeneralExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Administrative & General"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.administrativeGeneral[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, administrativeGeneralExpenseInput[year], 'administrativeGeneral')))}
        isIndented={true}
      />

      {/* Info & Tech Services Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Info & Tech Services</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Info & Tech Services Input/Data Rows */}
      <MetricRow
        label={`Info & Tech Services (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'infoTechServices'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={infoTechServicesExpenseInput}
        onEditableChange={handleInfoTechServicesExpenseChange}
        onEditableBlur={handleInfoTechServicesExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Info & Tech Services"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.infoTechServices[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, infoTechServicesExpenseInput[year], 'infoTechServices')))}
        isIndented={true}
      />

      {/* Sales & Marketing Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Sales & Marketing</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Sales & Marketing Input/Data Rows */}
      <MetricRow
        label={`Sales & Marketing (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'salesMarketing'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={salesMarketingExpenseInput}
        onEditableChange={handleSalesMarketingExpenseChange}
        onEditableBlur={handleSalesMarketingExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Sales & Marketing"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.salesMarketing[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, salesMarketingExpenseInput[year], 'salesMarketing')))}
        isIndented={true}
      />

      {/* Utilities Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Utilities</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Utilities Input/Data Rows */}
      <MetricRow
        label={`Utilities (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'utilities'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={utilitiesExpenseInput}
        onEditableChange={handleUtilitiesExpenseChange}
        onEditableBlur={handleUtilitiesExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label="Total Utilities"
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData.utilities[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, utilitiesExpenseInput[year], 'utilities')))}
        isIndented={true}
      />

      {/* Total Undistributed Expense Row */}
      <MetricRow
        label={<span className="font-medium">Total Undistributed Expense</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(calculateTotalUndistributedExpenses(year))
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateTotalUndistributedExpenses(year))
        )}
      />
    </div>
  );
};

export default UndistributedExpensesSection;
