
import { CategoryItem } from "./SidebarCategory";

export const mainNavCategories: CategoryItem[] = [
  {
    id: "propertyDetails",
    name: "Property Details",
    icon: "📋"
  },
  {
    id: "acquisition",
    name: "Acquisition",
    icon: "🏢"
  },
  {
    id: "financing",
    name: "Financing",
    icon: "💰"
  },
  {
    id: "disposition",
    name: "Disposition",
    icon: "📊"
  },
  {
    id: "caps",
    name: "Caps",
    icon: "🧢"
  },
  {
    id: "inflationAssumptions",
    name: "Inflation Assumptions",
    icon: "📈"
  },
  {
    id: "market",
    name: "Market Analysis",
    icon: "📊",
    path: "/market"
  },
  {
    id: "subjectOccupancy",
    name: "Subject Occupancy",
    icon: "🏨",
    path: "/subject-occupancy"
  },
  {
    id: "penetrationAnalysis",
    name: "Penetration Analysis",
    icon: "🎯"
  },
  {
    id: "revenue",
    name: "Revenue",
    icon: "💵",
    path: "/revenue"
  },
  {
    id: "operatingRevenue",
    name: "Operating Revenue",
    icon: "💸"
  },
  {
    id: "growthAssumptions",
    name: "Growth Assumptions",
    icon: "📊"
  },
  {
    id: "departmentalExpenses",
    name: "Departmental Expenses",
    icon: "💼"
  },
  {
    id: "managementAndFranchiseFees",
    name: "Management & Franchise Fees",
    icon: "🏛️"
  },
  {
    id: "undistributedExpenses",
    name: "Undistributed Expenses",
    icon: "📋"
  },
  {
    id: "undistributedExpensesSecond",
    name: "Undistributed Expenses (Second)",
    icon: "📝"
  },
  {
    id: "nonOperatingExpenses",
    name: "Non-Operating Expenses",
    icon: "⚖️"
  },
  {
    id: "ffeReserve",
    name: "FF&E Reserve",
    icon: "🛠️"
  }
];

export const parkingLotCategories: CategoryItem[] = [
  {
    id: "parkingLot1",
    name: "Parking Lot Item 1",
    icon: "🅿️"
  },
  {
    id: "parkingLot2",
    name: "Parking Lot Item 2",
    icon: "🚗"
  }
];
