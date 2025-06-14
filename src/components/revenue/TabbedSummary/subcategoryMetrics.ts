
import { MetricRow, TabbedSummaryProps } from './types';
import { createHelpers } from './helpers';

// Hard-coded historical expense data (matching ExpenseSection.tsx)
const historicalExpenseData = {
  fb: { 2021: 1200000, 2022: 1280000, 2023: 1350000, 2024: 1400000 },
  resortFee: { 2021: 150000, 2022: 160000, 2023: 170000, 2024: 175000 },
  otherOperated: { 2021: 800000, 2022: 850000, 2023: 900000, 2024: 920000 },
  miscellaneous: { 2021: 100000, 2022: 105000, 2023: 110000, 2024: 115000 },
  allocated: { 2021: 600000, 2022: 630000, 2023: 660000, 2024: 680000 }
};

const calculateForecastExpense = (year: number, expenseType: string) => {
  // For now, return 0 for forecast years since we don't have expense forecast logic in TabbedSummary
  return 0;
};

export const createSubcategoryMetrics = (
  props: TabbedSummaryProps,
  allYears: number[]
): MetricRow[] => {
  const { historicalYears, formatCurrency } = props;
  const helpers = createHelpers(props);

  return [
    {
      label: "Food & Beverage Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.fbRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.fbPerOccupiedRoom));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Resort Fee Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.resortFeeRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.resortFeePerOccupiedRoom));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Other Operated Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.otherOperatedRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.otherOperatedPerOccupiedRoom));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Miscellaneous Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.miscellaneousRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.miscellaneousPerOccupiedRoom));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Allocated Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.allocatedRevenue[year] || 0);
        } else {
          return formatCurrency(helpers.calculateForecastRevenue(year, props.allocatedPerOccupiedRoom));
        }
      }),
      isSubcategory: true
    }
  ];
};

export const createExpenseSubcategoryMetrics = (
  props: TabbedSummaryProps,
  allYears: number[]
): MetricRow[] => {
  const { historicalYears, formatCurrency } = props;

  return [
    {
      label: "Food & Beverage Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.fb[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'fb'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Resort Fee Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.resortFee[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'resortFee'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Other Operated Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.otherOperated[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'otherOperated'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Miscellaneous Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.miscellaneous[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'miscellaneous'));
        }
      }),
      isSubcategory: true
    },
    {
      label: "Allocated Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.allocated[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'allocated'));
        }
      }),
      isSubcategory: true
    }
  ];
};
