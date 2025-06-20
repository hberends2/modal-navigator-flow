
import React from "react";
import MetricRow from "../MetricRow";
import RoomsExpenseSection from "../RoomsExpenseSection";
import OtherOperatedExpenseSection from "../OtherOperatedExpenseSection";
import UndistributedExpensesSections from "./UndistributedExpensesSections";
import FinalExpensesSections from "./FinalExpensesSections";
import { CalculationHelpers } from "../RevenueTableHelpers";

interface ExpenseSectionContainerProps {
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  expenseForecastMethod: string;
  setExpenseForecastMethod: (value: string) => void;
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
  helpers: CalculationHelpers;
}

const ExpenseSectionContainer: React.FC<ExpenseSectionContainerProps> = (props) => {
  const calculateExpense = (year: number, inputValue: string, expenseType: string): number => {
    let expenseValue: number = parseFloat(inputValue || "0");

    if (props.expenseForecastMethod === "POR") {
      const occupiedRooms = props.helpers.getForecastOccupiedRoomsForYear(year);
      return expenseValue * occupiedRooms;
    } else {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, false);
      return (expenseValue / 100) * totalRevenue;
    }
  };

  const historicalExpenseData = {
    rooms: props.historicalData.roomsExpense || {},
    fb: props.historicalData.fbExpense || {},
    otherOperated: props.historicalData.otherOperatedExpense || {},
    miscellaneous: props.historicalData.miscellaneousExpense || {},
    allocated: props.historicalData.allocatedExpense || {},
    propertyOperations: props.historicalData.propertyOperationsExpense || {},
    administrativeGeneral: props.historicalData.administrativeGeneralExpense || {},
    infoTechServices: props.historicalData.infoTechServicesExpense || {},
    salesMarketing: props.historicalData.salesMarketingExpense || {},
    utilities: props.historicalData.utilitiesExpense || {},
    managementFees: props.historicalData.managementFeesExpense || {},
    realEstateTaxes: props.historicalData.realEstateTaxesExpense || {},
    insurance: props.historicalData.insuranceExpense || {},
    otherNonOp: props.historicalData.otherNonOperatingExpense || {},
    reserveForReplacement: props.historicalData.reserveForReplacement || {}
  };

  return (
    <>
      <RoomsExpenseSection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        expenseForecastMethod={props.expenseForecastMethod}
        roomsExpenseInput={props.roomsExpenseInput}
        handleRoomsExpenseChange={props.handleRoomsExpenseChange}
        handleRoomsExpenseBlur={props.handleRoomsExpenseBlur}
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        calculateExpense={calculateExpense}
        historicalExpenseData={historicalExpenseData}
        helpers={props.helpers}
      />

      {/* Other Expense Section Header */}
      <tr id="other-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <MetricRow
        label={<span className="font-bold text-gray-900">Other Expense</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      <OtherOperatedExpenseSection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        expenseForecastMethod={props.expenseForecastMethod}
        fbExpenseInput={props.fbExpenseInput}
        handleFbExpenseChange={props.handleFbExpenseChange}
        handleFbExpenseBlur={props.handleFbExpenseBlur}
        otherOperatedExpenseInput={props.otherOperatedExpenseInput}
        handleOtherOperatedExpenseChange={props.handleOtherOperatedExpenseChange}
        handleOtherOperatedExpenseBlur={props.handleOtherOperatedExpenseBlur}
        miscellaneousExpenseInput={props.miscellaneousExpenseInput}
        handleMiscellaneousExpenseChange={props.handleMiscellaneousExpenseChange}
        handleMiscellaneousExpenseBlur={props.handleMiscellaneousExpenseBlur}
        allocatedExpenseInput={props.allocatedExpenseInput}
        handleAllocatedExpenseChange={props.handleAllocatedExpenseChange}
        handleAllocatedExpenseBlur={props.handleAllocatedExpenseBlur}
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        calculateExpense={calculateExpense}
        historicalExpenseData={historicalExpenseData}
        helpers={props.helpers}
      />

      <UndistributedExpensesSections
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        expenseForecastMethod={props.expenseForecastMethod}
        propertyOperationsExpenseInput={props.propertyOperationsExpenseInput}
        handlePropertyOperationsExpenseChange={props.handlePropertyOperationsExpenseChange}
        handlePropertyOperationsExpenseBlur={props.handlePropertyOperationsExpenseBlur}
        administrativeGeneralExpenseInput={props.administrativeGeneralExpenseInput}
        handleAdministrativeGeneralExpenseChange={props.handleAdministrativeGeneralExpenseChange}
        handleAdministrativeGeneralExpenseBlur={props.handleAdministrativeGeneralExpenseBlur}
        infoTechServicesExpenseInput={props.infoTechServicesExpenseInput}
        handleInfoTechServicesExpenseChange={props.handleInfoTechServicesExpenseChange}
        handleInfoTechServicesExpenseBlur={props.handleInfoTechServicesExpenseBlur}
        salesMarketingExpenseInput={props.salesMarketingExpenseInput}
        handleSalesMarketingExpenseChange={props.handleSalesMarketingExpenseChange}
        handleSalesMarketingExpenseBlur={props.handleSalesMarketingExpenseBlur}
        utilitiesExpenseInput={props.utilitiesExpenseInput}
        handleUtilitiesExpenseChange={props.handleUtilitiesExpenseChange}
        handleUtilitiesExpenseBlur={props.handleUtilitiesExpenseBlur}
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        calculateExpense={calculateExpense}
        historicalExpenseData={historicalExpenseData}
        helpers={props.helpers}
      />

      <FinalExpensesSections
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        expenseForecastMethod={props.expenseForecastMethod}
        managementFeesExpenseInput={props.managementFeesExpenseInput}
        handleManagementFeesExpenseChange={props.handleManagementFeesExpenseChange}
        handleManagementFeesExpenseBlur={props.handleManagementFeesExpenseBlur}
        realEstateTaxesExpenseInput={props.realEstateTaxesExpenseInput}
        handleRealEstateTaxesExpenseChange={props.handleRealEstateTaxesExpenseChange}
        handleRealEstateTaxesExpenseBlur={props.handleRealEstateTaxesExpenseBlur}
        insuranceExpenseInput={props.insuranceExpenseInput}
        handleInsuranceExpenseChange={props.handleInsuranceExpenseChange}
        handleInsuranceExpenseBlur={props.handleInsuranceExpenseBlur}
        otherNonOpExpenseInput={props.otherNonOpExpenseInput}
        handleOtherNonOpExpenseChange={props.handleOtherNonOpExpenseChange}
        handleOtherNonOpExpenseBlur={props.handleOtherNonOpExpenseBlur}
        reserveForReplacementInput={props.reserveForReplacementInput}
        handleReserveForReplacementChange={props.handleReserveForReplacementChange}
        handleReserveForReplacementBlur={props.handleReserveForReplacementBlur}
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        calculateExpense={calculateExpense}
        historicalExpenseData={historicalExpenseData}
        helpers={props.helpers}
      />
    </>
  );
};

export default ExpenseSectionContainer;
