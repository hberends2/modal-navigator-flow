import React from "react";
import MetricRow from "./MetricRow";

interface NonOperatingExpensesSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  nonOperatingExpenseInput: Record<number, string>;
  handleNonOperatingExpenseChange: (year: number, value: string) => void;
  handleNonOperatingExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  getHistoricalExpenseData: (year: number, expenseType: string) => string;
  helpers: any;
}

const NonOperatingExpensesSection: React.FC<NonOperatingExpensesSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  nonOperatingExpenseInput,
  handleNonOperatingExpenseChange,
  handleNonOperatingExpenseBlur,
  formatCurrency,
  calculateExpense,
  historicalExpenseData,
  getHistoricalExpenseData,
  helpers
}) => {
  // Hard-coded historical data for the new subsections
  const historicalNonOperatingData = {
    managementFees: { 2021: 50000, 2022: 52500, 2023: 55000, 2024: 57500 },
    realEstateTaxes: { 2021: 80000, 2022: 84000, 2023: 88000, 2024: 92000 },
    insurance: { 2021: 45000, 2022: 47250, 2023: 49500, 2024: 51750 },
    other: { 2021: 25000, 2022: 26250, 2023: 27500, 2024: 28750 }
  };

  const calculateSubsectionExpense = (year: number, inputValue: string) => {
    const input = parseFloat(inputValue || "0");
    const totalRevenue = helpers.calculateTotalRevenue(year, false);
    return (input / 100) * totalRevenue;
  };

  const getHistoricalPercentage = (year: number, expenseType: string): string => {
    const totalExpense = historicalNonOperatingData[expenseType][year] || 0;
    const totalRevenue = helpers.calculateTotalRevenue(year, true);
    const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
    return percentage.toFixed(1);
  };

  const calculateTotalNonOperatingExpenses = (year: number) => {
    if (historicalYears.includes(year)) {
      return (historicalNonOperatingData.managementFees[year] || 0) +
             (historicalNonOperatingData.realEstateTaxes[year] || 0) +
             (historicalNonOperatingData.insurance[year] || 0) +
             (historicalNonOperatingData.other[year] || 0);
    } else {
      return calculateSubsectionExpense(year, nonOperatingExpenseInput[year] || "0");
    }
  };

  return (
    <>
      {/* Non-Operating Expenses Section Header */}
      <MetricRow
        id="non-operating-expenses-section"
        className="scroll-mt-4"
        label={<span className="font-bold text-gray-900">Non-Operating</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Management Fees Section */}
      <tr id="management-fees-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <MetricRow
        label="Management Fees"
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label="Management Fees (% of Revenue)"
        historicalData={historicalYears.map(year => getHistoricalPercentage(year, 'managementFees'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={nonOperatingExpenseInput}
        onEditableChange={handleNonOperatingExpenseChange}
        onEditableBlur={handleNonOperatingExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={true}
        isUserInputRow={true}
        isIndented={true}
      />

      <MetricRow
        label={<span className="font-medium">Total Management Fees</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(historicalNonOperatingData.managementFees[year] || 0)
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateSubsectionExpense(year, nonOperatingExpenseInput[year]))
        )}
      />

      {/* Real Estate Taxes Section */}
      <tr id="real-estate-taxes-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <MetricRow
        label="Real Estate Taxes"
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label="Real Estate Taxes (% of Revenue)"
        historicalData={historicalYears.map(year => getHistoricalPercentage(year, 'realEstateTaxes'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={nonOperatingExpenseInput}
        onEditableChange={handleNonOperatingExpenseChange}
        onEditableBlur={handleNonOperatingExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={true}
        isUserInputRow={true}
        isIndented={true}
      />

      <MetricRow
        label={<span className="font-medium">Total Real Estate Taxes</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(historicalNonOperatingData.realEstateTaxes[year] || 0)
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateSubsectionExpense(year, nonOperatingExpenseInput[year]))
        )}
      />

      {/* Insurance Section */}
      <tr id="insurance-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <MetricRow
        label="Insurance"
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label="Insurance (% of Revenue)"
        historicalData={historicalYears.map(year => getHistoricalPercentage(year, 'insurance'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={nonOperatingExpenseInput}
        onEditableChange={handleNonOperatingExpenseChange}
        onEditableBlur={handleNonOperatingExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={true}
        isUserInputRow={true}
        isIndented={true}
      />

      <MetricRow
        label={<span className="font-medium">Total Insurance</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(historicalNonOperatingData.insurance[year] || 0)
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateSubsectionExpense(year, nonOperatingExpenseInput[year]))
        )}
      />

      {/* Other Section */}
      <tr id="other-non-operating-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <MetricRow
        label="Other"
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <MetricRow
        label="Other (% of Revenue)"
        historicalData={historicalYears.map(year => getHistoricalPercentage(year, 'other'))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={nonOperatingExpenseInput}
        onEditableChange={handleNonOperatingExpenseChange}
        onEditableBlur={handleNonOperatingExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={true}
        isUserInputRow={true}
        isIndented={true}
      />

      <MetricRow
        label={<span className="font-medium">Total Other</span>}
        historicalData={historicalYears.map(year => 
          formatCurrency(historicalNonOperatingData.other[year] || 0)
        )}
        forecastData={forecastYears.map(year => 
          formatCurrency(calculateSubsectionExpense(year, nonOperatingExpenseInput[year]))
        )}
      />

      {/* Total Non-Operating Row */}
      <MetricRow
        label={<span className="font-bold text-base">Total Non-Operating</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold text-base">
            {formatCurrency(calculateTotalNonOperatingExpenses(year))}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold text-base">
            {formatCurrency(calculateTotalNonOperatingExpenses(year))}
          </span>
        ))}
      />
    </>
  );
};

export default NonOperatingExpensesSection;
