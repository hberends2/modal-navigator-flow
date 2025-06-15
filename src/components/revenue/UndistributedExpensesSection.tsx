
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
        label={<span className="font-bold text-gray-900">Undistributed</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Property Operations Input Row */}
      <MetricRow
        label={`Property Operations (${expenseForecastMethod})`}
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

      {/* Administrative & General Input Row */}
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

      {/* Info Tech Services Input Row */}
      <MetricRow
        label={`Info Tech Services (${expenseForecastMethod})`}
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

      {/* Sales & Marketing Input Row */}
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

      {/* Utilities Input Row */}
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

      {/* Total Undistributed Row */}
      <MetricRow
        label={<span className="font-medium">Total Undistributed</span>}
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
