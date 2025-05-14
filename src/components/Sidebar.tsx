
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SidebarProps {
  onItemClick: (modalName: string) => void;
}

interface CategoryItem {
  id: string;
  name: string;
  subCategories?: { id: string; name: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const handleCategoryClick = (category: CategoryItem) => {
    if (!category.subCategories) {
      // If no subcategories, open the modal directly
      onItemClick(category.id);
    } else {
      toggleCategory(category.id);
    }
  };

  const categories: CategoryItem[] = [
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
        { id: "penetrationAnalysis", name: "Penetration Analysis" }
      ]
    },
    {
      id: "revenue",
      name: "Revenue",
      subCategories: [
        { id: "operatingRevenue", name: "Operating Revenue" }
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
    }
  ];

  return (
    <div className="w-64 min-h-full bg-gray-100 shadow-md overflow-y-auto">
      <div className="p-4 bg-gray-800 text-white">
        <img 
          src="/lovable-uploads/c5f7ad47-17a3-439d-96a4-ee6584dacdcc.png" 
          alt="InnVestAI Logo" 
          className="h-8 w-auto"
        />
      </div>
      <nav className="mt-2">
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-1">
              <div
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                {category.subCategories ? (
                  expandedCategories.includes(category.id) ? (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2" />
                  )
                ) : (
                  <span className="w-4 mr-2"></span>
                )}
                <span className="font-medium">{category.name}</span>
              </div>
              
              {category.subCategories && expandedCategories.includes(category.id) && (
                <ul className="pl-8 bg-gray-50">
                  {category.subCategories.map((subCategory) => (
                    <li key={subCategory.id}>
                      <div
                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                        onClick={() => onItemClick(subCategory.id)}
                      >
                        {subCategory.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
