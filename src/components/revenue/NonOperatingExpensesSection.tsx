import React from "react";
import MetricRow from "./MetricRow";

interface NonOperatingExpensesSectionProps {
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
  formatCurrency: (value: number) => string;
  calculateNonOpExpense: (year: number, inputValue: string) => number;
  historicalExpenseData: any;
  getHistoricalNonOpExpenseData: (year: number, expenseType: string) => string;
  helpers: any;
}

const NonOperatingExpensesSection: React.FC<NonOperatingExpensesSectionProps> = ({
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
  formatCurrency,
  calculateNonOpExpense,
  historicalExpenseData,
  getHistoricalNonOpExpenseData,
  helpers
}) => {
  const calculateTotalNonOperatingExpenses = (year: number) => {
    if (historicalYears.includes(year)) {
      return (historicalExpenseData.managementFees[year] || 0) +
             (historicalExpenseData.realEstateTaxes[year] || 0) +
             (historicalExpenseData.insurance[year] || 0) +
             (historicalExpenseData.otherNonOp[year] || 0);
    } else {
      const managementFees = calculateNonOpExpense(year, managementFeesExpenseInput[year]);
      const realEstateTaxes = calculateNonOpExpense(year, realEstateTaxesExpenseInput[year]);
      const insurance = calculateNonOpExpense(year, insuranceExpenseInput[year]);
      const otherNonOp = calculateNonOpExpense(year, otherNonOpExpenseInput[year]);
      
      return managementFees + realEstateTaxes + insurance + otherNonOp;
    }
  };

  return (
    <>
      <tr id="non-operating-expenses-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Other Non-Operating Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Management Fees */}
      <MetricRow
        label="Management Fees (% of Revenue)"
        historicalData={historicalYears.map(year => getHistoricalNonOpExpenseData(year, 'managementFees') + "%")}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={managementFeesExpenseInput}
        onEditableChange={handleManagementFeesExpenseChange}
        onEditableBlur={handleManagementFeesExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={true}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label=""
        historicalData={historicalYears.map(year => 
          formatCurrency(historicalExpenseData.managementFees[year] || 0)
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateNonOpExpense(year, managementFeesExpenseInput[year]))
        )}
        isIndented={true}
      />

      {/* Real Estate Taxes */}
      <MetricRow
        label="Real Estate Taxes (% of Revenue)"
        historicalData={historicalYears.map(year => getHistoricalNonOpExpenseData(year, 'realEstateTaxes') + "%")}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={realEstateTaxesExpenseInput}
        onEditableChange={handleRealEstateTaxesExpenseChange}
        onEditableBlur={handleRealEstateTaxesExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={true}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label=""
        historicalData={historicalYears.map(year => 
          formatCurrency(historicalExpenseData.realEstateTaxes[year] || 0)
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateNonOpExpense(year, realEstateTaxesExpenseInput[year]))
        )}
        isIndented={true}
      />

      {/* Insurance */}
      <MetricRow
        label="Insurance (% of Revenue)"
        historicalData={historicalYears.map(year => getHistoricalNonOpExpenseData(year, 'insurance') + "%")}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={insuranceExpenseInput}
        onEditableChange={handleInsuranceExpenseChange}
        onEditableBlur={handleInsuranceExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={true}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label=""
        historicalData={historicalYears.map(year => 
          formatCurrency(historicalExpenseData.insurance[year] || 0)
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateNonOpExpense(year, insuranceExpenseInput[year]))
        )}
        isIndented={true}
      />

      {/* Other */}
      <MetricRow
        label="Other (% of Revenue)"
        historicalData={historicalYears.map(year => getHistoricalNonOpExpenseData(year, 'otherNonOp') + "%")}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={otherNonOpExpenseInput}
        onEditableChange={handleOtherNonOpExpenseChange}
        onEditableBlur={handleOtherNonOpExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={true}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label=""
        historicalData={historicalYears.map(year => 
          formatCurrency(historicalExpenseData.otherNonOp[year] || 0)
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateNonOpExpense(year, otherNonOpExpenseInput[year]))
        )}
        isIndented={true}
      />

      {/* Total Other Non-Operating Expense */}
      <MetricRow
        label={<span className="font-bold italic">Total Other Non-Operating Expense</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateTotalNonOperatingExpenses(year))}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateTotalNonOperatingExpenses(year))}
          </span>
        ))}
        isIndented={true}
      />
    </>
  );
};

export default NonOperatingExpensesSection;
