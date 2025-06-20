import React from "react";
import MetricRow from "../MetricRow";
import { CalculationHelpers } from "../RevenueTableHelpers";

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
  formatPercent: (value: number, decimals?: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  helpers: CalculationHelpers;
}

const UndistributedExpensesSections: React.FC<UndistributedExpensesSectionsProps> = (props) => {
  return (
    <>
      <tr id="undistributed-expenses-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Undistributed Expenses</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      <MetricRow
        label={`Property Operations & Maintenance (${props.expenseForecastMethod})`}
        historicalData={props.historicalYears.map(year => props.historicalExpenseData.propertyOperations[year] || '')}
        forecastData={props.forecastYears.map(() => "")}
        isEditable={true}
        editableData={props.propertyOperationsExpenseInput}
        onEditableChange={props.handlePropertyOperationsExpenseChange}
        onEditableBlur={props.handlePropertyOperationsExpenseBlur}
        forecastYears={props.forecastYears}
        isYoYRow={props.expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Property Operations & Maintenance</span>}
        historicalData={props.historicalYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.historicalExpenseData.propertyOperations[year] || 0)}
          </span>
        ))}
        forecastData={props.forecastYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.calculateExpense(year, props.propertyOperationsExpenseInput[year], 'propertyOperations'))}
          </span>
        ))}
        isIndented={true}
      />

      <MetricRow
        label={`Administrative & General (${props.expenseForecastMethod})`}
        historicalData={props.historicalYears.map(year => props.historicalExpenseData.administrativeGeneral[year] || '')}
        forecastData={props.forecastYears.map(() => "")}
        isEditable={true}
        editableData={props.administrativeGeneralExpenseInput}
        onEditableChange={props.handleAdministrativeGeneralExpenseChange}
        onEditableBlur={props.handleAdministrativeGeneralExpenseBlur}
        forecastYears={props.forecastYears}
        isYoYRow={props.expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Administrative & General</span>}
        historicalData={props.historicalYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.historicalExpenseData.administrativeGeneral[year] || 0)}
          </span>
        ))}
        forecastData={props.forecastYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.calculateExpense(year, props.administrativeGeneralExpenseInput[year], 'administrativeGeneral'))}
          </span>
        ))}
        isIndented={true}
      />

      <MetricRow
        label={`Info & Tech Services (${props.expenseForecastMethod})`}
        historicalData={props.historicalYears.map(year => props.historicalExpenseData.infoTechServices[year] || '')}
        forecastData={props.forecastYears.map(() => "")}
        isEditable={true}
        editableData={props.infoTechServicesExpenseInput}
        onEditableChange={props.handleInfoTechServicesExpenseChange}
        onEditableBlur={props.handleInfoTechServicesExpenseBlur}
        forecastYears={props.forecastYears}
        isYoYRow={props.expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Info & Tech Services</span>}
        historicalData={props.historicalYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.historicalExpenseData.infoTechServices[year] || 0)}
          </span>
        ))}
        forecastData={props.forecastYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.calculateExpense(year, props.infoTechServicesExpenseInput[year], 'infoTechServices'))}
          </span>
        ))}
        isIndented={true}
      />

      <MetricRow
        label={`Sales & Marketing (${props.expenseForecastMethod})`}
        historicalData={props.historicalYears.map(year => props.historicalExpenseData.salesMarketing[year] || '')}
        forecastData={props.forecastYears.map(() => "")}
        isEditable={true}
        editableData={props.salesMarketingExpenseInput}
        onEditableChange={props.handleSalesMarketingExpenseChange}
        onEditableBlur={props.handleSalesMarketingExpenseBlur}
        forecastYears={props.forecastYears}
        isYoYRow={props.expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Sales & Marketing</span>}
        historicalData={props.historicalYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.historicalExpenseData.salesMarketing[year] || 0)}
          </span>
        ))}
        forecastData={props.forecastYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.calculateExpense(year, props.salesMarketingExpenseInput[year], 'salesMarketing'))}
          </span>
        ))}
        isIndented={true}
      />

      <MetricRow
        label={`Utilities (${props.expenseForecastMethod})`}
        historicalData={props.historicalYears.map(year => props.historicalExpenseData.utilities[year] || '')}
        forecastData={props.forecastYears.map(() => "")}
        isEditable={true}
        editableData={props.utilitiesExpenseInput}
        onEditableChange={props.handleUtilitiesExpenseChange}
        onEditableBlur={props.handleUtilitiesExpenseBlur}
        forecastYears={props.forecastYears}
        isYoYRow={props.expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={<span className="font-bold italic">Total Utilities</span>}
        historicalData={props.historicalYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.historicalExpenseData.utilities[year] || 0)}
          </span>
        ))}
        forecastData={props.forecastYears.map(year => (
          <span className="font-bold italic">
            {props.formatCurrency(props.calculateExpense(year, props.utilitiesExpenseInput[year], 'utilities'))}
          </span>
        ))}
        isIndented={true}
      />
    </>
  );
};

export default UndistributedExpensesSections;
