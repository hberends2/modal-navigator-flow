
import { MetricRow, TabbedSummaryProps } from './types';

export const createUndistributedSubcategoryMetrics = (
  props: TabbedSummaryProps,
  allYears: number[]
): MetricRow[] => {
  // Return empty array since undistributed subcategories are now handled directly in expenseMetrics
  return [];
};
