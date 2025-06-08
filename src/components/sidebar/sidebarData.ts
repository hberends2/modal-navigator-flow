import { CategoryItem } from "./SidebarCategory";

// Top-level categories for main navigation (reordered as requested)
export const mainNavCategories: CategoryItem[] = [
  {
    id: "summary",
    name: "Summary",
    path: "/under-construction"
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
  },
  {
    id: "reports",
    name: "Reports",
    subCategories: [
      { id: "occupancyReport", name: "Occupancy Report", path: "/subject-occupancy" }
    ]
  }
  // Department & Item Setup removed from sidebar
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
    id: "waterfall",
    name: "Waterfall"
  }
];
