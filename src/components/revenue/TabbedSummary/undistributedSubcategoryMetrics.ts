
import { MetricRow, TabbedSummaryProps } from './types';

// Hard-coded historical expense data for undistributed expenses
const historicalUndistributedExpenseData = {
  propertyOperations: { 2021: 1500000, 2022: 1575000, 2023: 1650000, 2024: 1700000 },
  administrativeGeneral: { 2021: 900000, 2022: 945000, 2023: 990000, 2024: 1020000 },
  infoTechServices: { 2021: 300000, 2022: 315000, 2023: 330000, 2024: 340000 },
  salesMarketing: { 2021: 600000, 2022: 630000, 2023: 660000, 2024: 680000 },
  utilities: { 2021: 750000, 2022: 787500, 2023: 825000, 2024: 850000 }
};

const calculateForecastUndistributedExpense = (year: number, expenseType: string) => {
  // For now, return 0 for forecast years since we don't have expense forecast logic in TabbedSummary
  // This would need to be connected to the actual expense calculation logic
  return 0;
};

export const createUndistributedSubcategoryMetrics = (
  props: TabbedSummaryProps,
  allYears: number[]
): MetricRow[] => {
  const { historicalYears, formatCurrency } = props;

  return [
    {
      label: "Property Operations & Maintenance",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalUndistributedExpenseData.propertyOperations[year] || 0);
        } else {
          return formatCurrency(calculateForecastUndistributedExpense(year, 'propertyOperations'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Administrative & General",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalUndistributedExpenseData.administrativeGeneral[year] || 0);
        } else {
          return formatCurrency(calculateForecastUndistributedExpense(year, 'administrativeGeneral'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Info & Tech Services",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalUndistributedExpenseData.infoTechServices[year] || 0);
        } else {
          return formatCurrency(calculateForecastUndistributedExpense(year, 'infoTechServices'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Sales & Marketing",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalUndistributedExpenseData.salesMarketing[year] || 0);
        } else {
          return formatCurrency(calculateForecastUndistributedExpense(year, 'salesMarketing'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Utilities",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalUndistributedExpenseData.utilities[year] || 0);
        } else {
          return formatCurrency(calculateForecastUndistributedExpense(year, 'utilities'));
        }
      }),
      isSubcategory: true
    }
  ];
};
