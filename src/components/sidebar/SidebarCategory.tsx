
import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SubCategory {
  id: string;
  name: string;
  path?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  path?: string;
  subCategories?: SubCategory[];
}

interface SidebarCategoryProps {
  category: CategoryItem;
  expandedCategories: string[];
  onCategoryClick: (category: CategoryItem) => void;
  onSubCategoryClick: (subCategoryId: string, path?: string) => void;
}

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  category,
  expandedCategories,
  onCategoryClick,
  onSubCategoryClick,
}) => {
  const isExpanded = expandedCategories.includes(category.id);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCategoryClick(category);
  };

  const handleSubCategoryClick = (subCategoryId: string, path?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onSubCategoryClick(subCategoryId, path);
  };

  return (
    <li className="mb-1">
      <div
        className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
        onClick={handleCategoryClick}
      >
        {category.subCategories ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 mr-2" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-2" />
          )
        ) : (
          <span className="w-4 mr-2"></span>
        )}
        <span className="font-medium">{category.name}</span>
      </div>
      
      {category.subCategories && isExpanded && (
        <ul className="pl-8 bg-gray-50">
          {category.subCategories.map((subCategory) => (
            <li key={subCategory.id}>
              <div
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={handleSubCategoryClick(subCategory.id, subCategory.path)}
              >
                {subCategory.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarCategory;
