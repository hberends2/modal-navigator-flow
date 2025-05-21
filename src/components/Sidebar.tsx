
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarSection from "./sidebar/SidebarSection";
import SidebarFooter from "./sidebar/SidebarFooter";
import { CategoryItem } from "./sidebar/SidebarCategory";
import { topCategories, proformaCategories } from "./sidebar/sidebarData";

interface SidebarProps {
  onItemClick: (modalName: string) => void;
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
          <SidebarSection
            categories={topCategories}
            expandedCategories={expandedCategories}
            onCategoryClick={handleCategoryClick}
            onSubCategoryClick={handleSubCategoryClick}
          />
          
          {/* Proforma Development section */}
          <SidebarSection
            title="Proforma Development"
            categories={proformaCategories}
            expandedCategories={expandedCategories}
            onCategoryClick={handleCategoryClick}
            onSubCategoryClick={handleSubCategoryClick}
            showDivider={true}
          />
        </ul>
      </nav>
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
