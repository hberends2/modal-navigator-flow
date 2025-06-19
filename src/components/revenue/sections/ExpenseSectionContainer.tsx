import React from "react";
import MetricRow from "../MetricRow";
import { createExpenseCalculations } from "../ExpenseCalculations";
import { CalculationHelpers } from "../RevenueTableHelpers";

interface ExpenseSectionContainerProps {
  historicalYears: number[];
  forecastYears: number[];
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
  nonOperatingExpenseInput: Record<number, string>;
  handleNonOperatingExpenseChange: (year: number, value: string) => void;
  handleNonOperatingExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  helpers: CalculationHelpers;
}

const ExpenseSectionContainer: React.FC<ExpenseSectionContainerProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  setExpenseForecastMethod,
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
  // Historical expense data
  const historicalExpenseData = {
    rooms: { 2021: 1200000, 2022: 1250000, 2023: 1300000, 2024: 1350000 },
    fb: { 2021: 800000, 2022: 840000, 2023: 880000, 2024: 920000 },
    otherOperated: { 2021: 400000, 2022: 420000, 2023: 440000, 2024: 460000 },
    miscellaneous: { 2021: 60000, 2022: 63000, 2023: 66000, 2024: 69000 },
    allocated: { 2021: 150000, 2022: 157500, 2023: 165000, 2024: 172500 },
    propertyOperations: { 2021: 500000, 2022: 525000, 2023: 550000, 2024: 575000 },
    administrativeGeneral: { 2021: 450000, 2022: 472500, 2023: 495000, 2024: 517500 },
    infoTechServices: { 2021: 300000, 2022: 315000, 2023: 330000, 2024: 345000 },
    salesMarketing: { 2021: 600000, 2022: 630000, 2023: 660000, 2024: 690000 },
    utilities: { 2021: 750000, 2022: 787500, 2023: 825000, 2024: 862500 },
    nonOperating: { 2021: 200000, 2022: 210000, 2023: 220000, 2024: 230000 }
  };

  const expenseCalculations = createExpenseCalculations(
    historicalExpenseData,
    expenseForecastMethod,
    helpers
  );

  // Calculate Gross Operating Profit
  const calculateGrossOperatingProfit = (year: number, isHistorical: boolean): number => {
    const totalRevenue = helpers.calculateTotalRevenue(year, isHistorical);
    const totalOtherOperatedExpense = helpers.calculateTotalOtherOperatedRevenue(year, isHistorical);
    
    let totalUndistributedExpense = 0;
    if (isHistorical) {
      totalUndistributedExpense = expenseCalculations.calculateTotalUndistributedExpenses(year, historicalYears, {
        propertyOperationsExpenseInput,
        administrativeGeneralExpenseInput,
        infoTechServicesExpenseInput,
        salesMarketingExpenseInput,
        utilitiesExpenseInput
      });
    } else {
      totalUndistributedExpense = expenseCalculations.calculateTotalUndistributedExpenses(year, historicalYears, {
        propertyOperationsExpenseInput,
        administrativeGeneralExpenseInput,
        infoTechServicesExpenseInput,
        salesMarketingExpenseInput,
        utilitiesExpenseInput
      });
    }
    
    return totalRevenue - totalOtherOperatedExpense - totalUndistributedExpense;
  };

  return (
    <>
      {/* Rooms Expense Row */}
      <MetricRow
        label="Rooms Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'rooms')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={roomsExpenseInput[year] || ""}
                onChange={(e) => handleRoomsExpenseChange(year, e.target.value)}
                onBlur={(e) => handleRoomsExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={roomsExpenseInput}
        onEditableChange={handleRoomsExpenseChange}
        onEditableBlur={handleRoomsExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      {/* Food & Beverage Expense Row */}
      <MetricRow
        label="Food & Beverage Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'fb')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={fbExpenseInput[year] || ""}
                onChange={(e) => handleFbExpenseChange(year, e.target.value)}
                onBlur={(e) => handleFbExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={fbExpenseInput}
        onEditableChange={handleFbExpenseChange}
        onEditableBlur={handleFbExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      {/* Other Operated Expense Row */}
      <MetricRow
        label="Other Operated Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'otherOperated')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={otherOperatedExpenseInput[year] || ""}
                onChange={(e) => handleOtherOperatedExpenseChange(year, e.target.value)}
                onBlur={(e) => handleOtherOperatedExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={otherOperatedExpenseInput}
        onEditableChange={handleOtherOperatedExpenseChange}
        onEditableBlur={handleOtherOperatedExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      {/* Miscellaneous Expense Row */}
      <MetricRow
        label="Miscellaneous Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'miscellaneous')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={miscellaneousExpenseInput[year] || ""}
                onChange={(e) => handleMiscellaneousExpenseChange(year, e.target.value)}
                onBlur={(e) => handleMiscellaneousExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={miscellaneousExpenseInput}
        onEditableChange={handleMiscellaneousExpenseChange}
        onEditableBlur={handleMiscellaneousExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      {/* Allocated Expense Row */}
      <MetricRow
        label="Allocated Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'allocated')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={allocatedExpenseInput[year] || ""}
                onChange={(e) => handleAllocatedExpenseChange(year, e.target.value)}
                onBlur={(e) => handleAllocatedExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={allocatedExpenseInput}
        onEditableChange={handleAllocatedExpenseChange}
        onEditableBlur={handleAllocatedExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      {/* Property Operations Expense Row */}
      <MetricRow
        label="Property Operations Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'propertyOperations')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={propertyOperationsExpenseInput[year] || ""}
                onChange={(e) => handlePropertyOperationsExpenseChange(year, e.target.value)}
                onBlur={(e) => handlePropertyOperationsExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={propertyOperationsExpenseInput}
        onEditableChange={handlePropertyOperationsExpenseChange}
        onEditableBlur={handlePropertyOperationsExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      {/* Administrative & General Expense Row */}
      <MetricRow
        label="Administrative & General Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'administrativeGeneral')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={administrativeGeneralExpenseInput[year] || ""}
                onChange={(e) => handleAdministrativeGeneralExpenseChange(year, e.target.value)}
                onBlur={(e) => handleAdministrativeGeneralExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={administrativeGeneralExpenseInput}
        onEditableChange={handleAdministrativeGeneralExpenseChange}
        onEditableBlur={handleAdministrativeGeneralExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      {/* Info Tech Services Expense Row */}
      <MetricRow
        label="Info Tech Services Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'infoTechServices')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={infoTechServicesExpenseInput[year] || ""}
                onChange={(e) => handleInfoTechServicesExpenseChange(year, e.target.value)}
                onBlur={(e) => handleInfoTechServicesExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={infoTechServicesExpenseInput}
        onEditableChange={handleInfoTechServicesExpenseChange}
        onEditableBlur={handleInfoTechServicesExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      {/* Sales & Marketing Expense Row */}
      <MetricRow
        label="Sales & Marketing Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'salesMarketing')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={salesMarketingExpenseInput[year] || ""}
                onChange={(e) => handleSalesMarketingExpenseChange(year, e.target.value)}
                onBlur={(e) => handleSalesMarketingExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={salesMarketingExpenseInput}
        onEditableChange={handleSalesMarketingExpenseChange}
        onEditableBlur={handleSalesMarketingExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      {/* Utilities Expense Row */}
      <MetricRow
        label="Utilities Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'utilities')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={utilitiesExpenseInput[year] || ""}
                onChange={(e) => handleUtilitiesExpenseChange(year, e.target.value)}
                onBlur={(e) => handleUtilitiesExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={utilitiesExpenseInput}
        onEditableChange={handleUtilitiesExpenseChange}
        onEditableBlur={handleUtilitiesExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />
      
      {/* Total Undistributed Expense Row */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Total Undistributed Expense</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(expenseCalculations.calculateTotalUndistributedExpenses(year, historicalYears, {
            propertyOperationsExpenseInput,
            administrativeGeneralExpenseInput,
            infoTechServicesExpenseInput,
            salesMarketingExpenseInput,
            utilitiesExpenseInput
          }))
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(expenseCalculations.calculateTotalUndistributedExpenses(year, historicalYears, {
            propertyOperationsExpenseInput,
            administrativeGeneralExpenseInput,
            infoTechServicesExpenseInput,
            salesMarketingExpenseInput,
            utilitiesExpenseInput
          }))
        )}
        isSectionHeader={true}
      />

      {/* Gross Operating Profit Row */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Gross Operating Profit</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(calculateGrossOperatingProfit(year, true))
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateGrossOperatingProfit(year, false))
        )}
        isSectionHeader={true}
      />

      {/* Non-Operating Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Non-Operating</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Non-Operating Expense Row */}
      <MetricRow
        label="Non-Operating Expense"
        historicalData={historicalYears.map(year =>
          expenseCalculations.getHistoricalExpenseData(year, 'nonOperating')
        )}
        forecastData={forecastYears.map(year => {
          return (
            <div className="relative w-16 mx-auto">
              <input
                type="text"
                value={nonOperatingExpenseInput[year] || ""}
                onChange={(e) => handleNonOperatingExpenseChange(year, e.target.value)}
                onBlur={(e) => handleNonOperatingExpenseBlur(year, e.target.value)}
                className="text-center text-xs h-6 py-0 text-blue-600 pr-4 w-full"
              />
              {expenseForecastMethod === "Percentage of Revenue" && (
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
              )}
            </div>
          );
        })}
        isEditable={true}
        editableData={nonOperatingExpenseInput}
        onEditableChange={handleNonOperatingExpenseChange}
        onEditableBlur={handleNonOperatingExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />
    </>
  );
};

export default ExpenseSectionContainer;
