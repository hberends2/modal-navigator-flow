import { CategoryItem } from "./SidebarCategory";

// Top-level categories for main navigation (kept simple without subcategories)
export const mainNavCategories: CategoryItem[] = [
  {
    id: "summary",
    name: "Summary",
    path: "/under-construction"
  },
  {
    id: "reports",
    name: "Reports",
    subCategories: [
      { id: "occupancyReport", name: "Occupancy Report", path: "/subject-occupancy" }
    ]
  },
  {
    id: "propertyDetails",
    name: "Property Details",
    path: "/property-details"
  },
  {
    id: "market",
    name: "Market Analysis",
    path: "/market"
  },
  {
    id: "valuation",
    name: "Valuation",
    path: "/revenue"
  }
];

// Parking lot categories (maintaining existing Category/Sub-Category format)
export const parkingLotCategories: CategoryItem[] = [
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
    id: "marketSection",
    name: "Market",
    subCategories: [
      { id: "inflationAssumptions", name: "Inflation Assumptions" },
      { id: "penetrationAnalysis", name: "Penetration Analysis" }
    ]
  },
  {
    id: "revenueSection",
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
  }
];
