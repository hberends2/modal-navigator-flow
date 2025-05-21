import React, { useState } from "react";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onItemClick: (modalName: string) => void;
}

interface CategoryItem {
  id: string;
  name: string;
  path?: string;
  subCategories?: { id: string; name: string; path?: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["market"]);
  const navigate = useNavigate();

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const handleCategoryClick = (category: CategoryItem) => {
    if (category.path) {
      // If the category has a direct path, navigate to it
      navigate(category.path);
      return;
    }
    
    if (!category.subCategories) {
      // If no subcategories and no path, open the modal
      onItemClick(category.id);
    } else {
      toggleCategory(category.id);
    }
  };

  const handleSubCategoryClick = (subCategoryId: string, path?: string) => {
    if (path) {
      navigate(path);
      return;
    }
    onItemClick(subCategoryId);
  };

  // Moved Summary and Reports to the top
  const topCategories: CategoryItem[] = [
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

  // Remaining categories under "Proforma Development"
  const proformaCategories: CategoryItem[] = [
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
        { id: "penetrationAnalysis", name: "Penetration Analysis" },
        { id: "marketAnalysis", name: "Market Analysis", path: "/market" }
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
    },
    {
      id: "waterfall",
      name: "Waterfall"
      // No subCategories for Waterfall
    }
  ];

  return (
    <div className="w-64 min-h-full bg-gray-100 shadow-md overflow-y-auto flex flex-col">
      <div className="p-4 bg-gray-100 text-gray-800">
        <img 
          src="/lovable-uploads/c5f7ad47-17a3-439d-96a4-ee6584dacdcc.png" 
          alt="InnVestAI Logo" 
          className="h-20 w-auto"
        />
      </div>
      <nav className="mt-2 flex-grow">
        <ul>
          {/* Top-level categories (Summary and Reports) */}
          {topCategories.map((category) => (
            <li key={category.id} className="mb-1">
              <div
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <span className="w-4 mr-2"></span>
                <span className="font-medium">{category.name}</span>
              </div>
            </li>
          ))}
          
          {/* Section divider */}
          <li className="py-2">
            <div className="px-4">
              <div className="border-b border-gray-300"></div>
            </div>
          </li>
          
          {/* Proforma Development heading */}
          <li className="py-2">
            <div className="px-4">
              <p className="font-medium text-gray-800">Proforma Development</p>
            </div>
          </li>

          {/* Proforma development categories */}
          {proformaCategories.map((category) => (
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
                        onClick={() => handleSubCategoryClick(subCategory.id, (subCategory as any).path)}
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
      <div className="p-4 border-t border-gray-200">
        <button 
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          onClick={() => console.log("Logout clicked")}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
