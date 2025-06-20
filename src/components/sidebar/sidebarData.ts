
import { CategoryItem } from "./SidebarCategory";

// Top-level categories for main navigation (reordered to move Summary below Reports)
export const mainNavCategories: CategoryItem[] = [
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
    path: "/revenue",
    subCategories: [
      { id: "occupancy-section", name: "Occupancy" },
      {
        id: "revenue-group",
        name: "Revenue",
        subCategories: [
          { id: "adr-section", name: "ADR" },
          { id: "revpar-section", name: "RevPAR" },
          { id: "rooms-revenue-section", name: "Rooms Revenue" },
          {
            id: "other-revenue-group",
            name: "Other Revenue",
            subCategories: [
              { id: "food-beverage-section", name: "Food & Beverage" },
              { id: "other-operated-section", name: "Other Operated" },
              { id: "miscellaneous-section", name: "Miscellaneous" },
              { id: "allocated-section", name: "Allocated" },
            ],
          },
          { id: "total-revenue-section", name: "Total Revenue" },
        ],
      },
      {
        id: "expense-group",
        name: "Expense",
        subCategories: [
          { id: "rooms-expense-section", name: "Rooms Expense" },
          {
            id: "other-expense-group",
            name: "Other Expense",
            subCategories: [
              { id: "food-beverage-expense-section", name: "Food & Beverage" },
              { id: "other-operated-expense-section", name: "Other Operated" },
              { id: "miscellaneous-expense-section", name: "Miscellaneous" },
              { id: "allocated-expense-section", name: "Allocated" },
            ],
          },
          {
            id: "undistributed-expense-group",
            name: "Undistributed Expense",
            subCategories: [
              { id: "property-operations-expense-section", name: "Property Operations & Maintenance" },
              { id: "administrative-general-expense-section", name: "Administrative & General" },
              { id: "info-tech-services-expense-section", name: "Info & Tech Services" },
              { id: "sales-marketing-expense-section", name: "Sales & Marketing" },
              { id: "utilities-expense-section", name: "Utilities" },
            ],
          },
          {
            id: "non-operating-expense-group",
            name: "Non-Operating Expense",
            subCategories: [
              { id: "management-fees-section", name: "Management Fees" },
              { id: "real-estate-taxes-section", name: "Real Estate Taxes" },
              { id: "insurance-section", name: "Insurance" },
              { id: "other-non-operating-section", name: "Other" },
            ],
          },
          { id: "total-expense-section", name: "Total Expense" },
        ],
      },
      { id: "capital-expense-section", name: "Capital Expense" },
    ],
  },
  {
    id: "reports",
    name: "Reports",
    subCategories: [
      { id: "occupancyReport", name: "Occupancy Report", path: "/subject-occupancy" }
    ]
  },
  {
    id: "summary",
    name: "Summary",
    path: "/under-construction"
  }
  // Department & Item Setup removed from sidebar
];

// Parking lot categories (removed Penetration)
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
    id: "waterfall",
    name: "Waterfall"
  }
];
