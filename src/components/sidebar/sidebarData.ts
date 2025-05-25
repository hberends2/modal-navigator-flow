
import { CategoryItem } from "./SidebarCategory";

// Top-level categories (Summary and Reports)
export const topCategories: CategoryItem[] = [
  {
    id: "summary",
    name: "Summary"
    // No subCategories for Summary
  },
  {
    id: "reports",
    name: "Reports"
    // No subCategories for Reports
  }
];

// Proforma development categories
export const proformaCategories: CategoryItem[] = [
  {
    id: "propertyDetails",
    name: "Property Details"
    // No subCategories for Property Details
  },
  {
    id: "investmentAssumptions",
    name: "Investment Assumptions",
    subCategories: [
      { id: "acquisition", name: "Acquisition" },
      { id: "financing", name: "Financing" },
      { id: "disposition", name: "Disposition" }
    ]
  },
  {
    id: "caps",
    name: "Capital Expense",
    subCategories: [
      { id: "caps", name: "Capital Expense" }
    ]
  },
  {
    id: "market",
    name: "Market",
    subCategories: [
      { id: "inflationAssumptions", name: "Inflation Assumptions" },
      { id: "subjectOccupancy", name: "Subject Occupancy" },
      { id: "penetrationAnalysis", name: "Penetration Analysis" },
      { id: "marketAnalysis", name: "Market Analysis", path: "/market" }
    ]
  },
  {
    id: "revenue",
    name: "Revenue",
    subCategories: [
      { id: "operatingRevenue", name: "Operating Revenue" },
      { id: "growthAssumptions", name: "Growth Assumptions" }
    ]
  },
  {
    id: "expense",
    name: "Expense",
    subCategories: [
      { id: "departmentalExpenses", name: "Departmental Expenses" },
      { id: "managementAndFranchiseFees", name: "Management & Franchise Fees" },
      { id: "undistributedExpenses", name: "Undistributed Expenses" },
      { id: "undistributedExpensesSecond", name: "Undistributed Expenses - p2" },
      { id: "nonOperatingExpenses", name: "Non-Operating Expenses" },
      { id: "ffeReserve", name: "FF&E Reserve" }
    ]
  },
  {
    id: "waterfall",
    name: "Waterfall"
    // No subCategories for Waterfall
  }
];
