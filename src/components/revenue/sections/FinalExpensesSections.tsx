import React from "react";
import MetricRow from "../MetricRow";
import { CalculationHelpers } from "../RevenueTableHelpers";

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
  formatPercent: (value: number, decimals?: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  helpers: CalculationHelpers;
}

const FinalExpensesSections: React.FC<FinalExpensesSectionsProps> = (props) => {
  const {
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
    formatPercent,
    calculateExpense,
    historicalExpenseData,
    helpers
  } = props;

  const getHistoricalExpenseData = (year: number, expenseType: string): string => {
    const totalExpense = historicalExpenseData[expenseType][year] || 0;

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
      <tr id="other-non-operating-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Other Non-Operating Expense</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      <MetricRow
        label={`Management Fees (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'managementFees'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={managementFeesExpenseInput}
        onEditableChange={handleManagementFeesExpenseChange}
        onEditableBlur={handleManagementFeesExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Management Fees</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(historicalExpenseData.managementFees[year] || 0)}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateExpense(year, managementFeesExpenseInput[year], 'managementFees'))}
          </span>
        ))}
        isIndented={true}
      />

      <MetricRow
        label={`Real Estate Taxes (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'realEstateTaxes'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={realEstateTaxesExpenseInput}
        onEditableChange={handleRealEstateTaxesExpenseChange}
        onEditableBlur={handleRealEstateTaxesExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Real Estate Taxes</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(historicalExpenseData.realEstateTaxes[year] || 0)}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateExpense(year, realEstateTaxesExpenseInput[year], 'realEstateTaxes'))}
          </span>
        ))}
        isIndented={true}
      />

      <MetricRow
        label={`Insurance (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'insurance'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={insuranceExpenseInput}
        onEditableChange={handleInsuranceExpenseChange}
        onEditableBlur={handleInsuranceExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Insurance</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(historicalExpenseData.insurance[year] || 0)}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateExpense(year, insuranceExpenseInput[year], 'insurance'))}
          </span>
        ))}
        isIndented={true}
      />

      <MetricRow
        label={`Other Non-Op Expense (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'otherNonOp'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={otherNonOpExpenseInput}
        onEditableChange={handleOtherNonOpExpenseChange}
        onEditableBlur={handleOtherNonOpExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Other Non-Op Expense</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(historicalExpenseData.otherNonOp[year] || 0)}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateExpense(year, otherNonOpExpenseInput[year], 'otherNonOp'))}
          </span>
        ))}
        isIndented={true}
      />

      <MetricRow
        label={`Reserve for Replacement (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => getHistoricalExpenseData(year, 'reserveForReplacement'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={reserveForReplacementInput}
        onEditableChange={handleReserveForReplacementChange}
        onEditableBlur={handleReserveForReplacementBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Reserve for Replacement</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(historicalExpenseData.reserveForReplacement[year] || 0)}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateExpense(year, reserveForReplacementInput[year], 'reserveForReplacement'))}
          </span>
        ))}
        isIndented={true}
      />
    </>
  );
};

export default FinalExpensesSections;
