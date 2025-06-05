import React, { useState, useEffect } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { 
  categories, 
  PrimaryCategory, 
  SubCategory, 
  LineItem, 
  getAllDescendantIds,
  getParentIds
} from "../../data/categoryData";

interface CategorySelectionModalProps {
  onClose: () => void;
  onSave: (selectedItems: Set<string>) => void;
  initialSelections?: Set<string>;
}

const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  onClose,
  onSave,
  initialSelections = new Set()
}) => {
  // State for selected items (primary categories, subcategories, and line items)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(initialSelections));
  
  // State for expanded accordions
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(new Set());

  // Set initial expanded state based on initial selections
  useEffect(() => {
    if (initialSelections.size > 0) {
      const expandedCats = new Set<string>();
      const expandedSubCats = new Set<string>();
      
      // Check each primary category
      categories.forEach(cat => {
        if (initialSelections.has(cat.id)) {
          expandedCats.add(cat.id);
        }
        
        // Check each subcategory
        cat.subCategories.forEach(subCat => {
          if (initialSelections.has(subCat.id)) {
            expandedCats.add(cat.id); // Ensure parent is expanded
            expandedSubCats.add(subCat.id);
          }
          
          // Check each line item
          subCat.lineItems.forEach(lineItem => {
            if (initialSelections.has(lineItem.id)) {
              expandedCats.add(cat.id); // Ensure parent is expanded
              expandedSubCats.add(subCat.id); // Ensure subcategory is expanded
            }
          });
        });
      });
      
      setExpandedCategories(expandedCats);
      setExpandedSubCategories(expandedSubCats);
    }
  }, [initialSelections]);

  // Handle primary category selection - MODIFIED TO NOT CASCADE
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    
    if (checked) {
      // Only add the category itself, not its descendants
      newSelectedItems.add(categoryId);
      
      // Expand this category
      setExpandedCategories(prev => new Set([...prev, categoryId]));
    } else {
      // Only remove the category itself, not its descendants
      newSelectedItems.delete(categoryId);
      
      // Collapse this category
      const newExpandedCategories = new Set(expandedCategories);
      newExpandedCategories.delete(categoryId);
      setExpandedCategories(newExpandedCategories);
    }
    
    setSelectedItems(newSelectedItems);
  };

  // Handle subcategory selection - MODIFIED TO NOT CASCADE
  const handleSubCategoryChange = (subCategoryId: string, parentId: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    
    if (checked) {
      // Only add the subcategory itself, not its descendants or parent
      newSelectedItems.add(subCategoryId);
      
      // Expand this subcategory
      setExpandedSubCategories(prev => new Set([...prev, subCategoryId]));
      // Ensure parent category is also expanded
      setExpandedCategories(prev => new Set([...prev, parentId]));
    } else {
      // Only remove the subcategory itself, not its descendants
      newSelectedItems.delete(subCategoryId);
      
      // Collapse this subcategory
      const newExpandedSubCategories = new Set(expandedSubCategories);
      newExpandedSubCategories.delete(subCategoryId);
      setExpandedSubCategories(newExpandedSubCategories);
    }
    
    setSelectedItems(newSelectedItems);
  };

  // Handle line item selection - MODIFIED TO NOT CASCADE
  const handleLineItemChange = (lineItemId: string, parentIds: string[], checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    
    if (checked) {
      // Only add the line item itself, not its parents
      newSelectedItems.add(lineItemId);
      
      // Ensure parent subcategory and category are expanded (but not selected)
      const [subCategoryId, primaryCategoryId] = parentIds;
      setExpandedSubCategories(prev => new Set([...prev, subCategoryId]));
      setExpandedCategories(prev => new Set([...prev, primaryCategoryId]));
    } else {
      // Only remove the line item itself
      newSelectedItems.delete(lineItemId);
    }
    
    setSelectedItems(newSelectedItems);
  };

  // Handle accordion expansion for primary categories
  const handleCategoryExpand = (categoryId: string, isOpen: boolean) => {
    const newExpandedCategories = new Set(expandedCategories);
    
    if (isOpen) {
      newExpandedCategories.add(categoryId);
    } else {
      newExpandedCategories.delete(categoryId);
    }
    
    setExpandedCategories(newExpandedCategories);
  };

  // Handle accordion expansion for subcategories
  const handleSubCategoryExpand = (subCategoryId: string, isOpen: boolean) => {
    const newExpandedSubCategories = new Set(expandedSubCategories);
    
    if (isOpen) {
      newExpandedSubCategories.add(subCategoryId);
    } else {
      newExpandedSubCategories.delete(subCategoryId);
    }
    
    setExpandedSubCategories(newExpandedSubCategories);
  };

  // Handle save action
  const handleSave = () => {
    onSave(selectedItems);
  };

  return (
    <ModalWrapper 
      title="Department & Item Selection" 
      onClose={onClose} 
      onSave={handleSave}
      onNext={() => {}}
      showNext={false}
      showSave={true}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        <p className="text-sm text-gray-600 mb-4">
          Does this deal include any of the following:
        </p>
        
        {/* Primary Categories */}
        <Accordion 
          type="multiple" 
          value={Array.from(expandedCategories)}
          className="space-y-2"
        >
          {categories.map((category) => (
            <AccordionItem 
              key={category.id} 
              value={category.id}
              className="border rounded-md p-1"
            >
              <div className="flex items-center px-2 py-1">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedItems.has(category.id)}
                  onCheckedChange={(checked) => {
                    handleCategoryChange(category.id, !!checked);
                  }}
                  className="mr-2"
                />
                {/* For "None" option, don't render the AccordionTrigger with chevron */}
                {category.id === "none" ? (
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="text-base font-medium cursor-pointer flex-1 py-0"
                  >
                    {category.name}
                  </Label>
                ) : (
                  <AccordionTrigger 
                    onClick={(e) => {
                      // Prevent default to handle manually
                      e.preventDefault();
                      const newIsOpen = !expandedCategories.has(category.id);
                      handleCategoryExpand(category.id, newIsOpen);
                    }}
                    className="flex-1 hover:no-underline py-0"
                  >
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-base font-medium cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </AccordionTrigger>
                )}
              </div>
              
              {category.id !== "none" && (
                <AccordionContent>
                  <div className="mt-2 ml-6 space-y-1">
                    {/* Subcategories */}
                    {category.subCategories.map((subCategory) => (
                      <Accordion 
                        key={subCategory.id} 
                        type="multiple" 
                        value={Array.from(expandedSubCategories)}
                        className="border-none"
                      >
                        <AccordionItem 
                          value={subCategory.id}
                          className="border-l border-gray-200 pl-2 mb-2"
                        >
                          <div className="flex items-center">
                            <Checkbox
                              id={`subcategory-${subCategory.id}`}
                              checked={selectedItems.has(subCategory.id)}
                              onCheckedChange={(checked) => {
                                handleSubCategoryChange(subCategory.id, category.id, !!checked);
                              }}
                              className="mr-2"
                            />
                            <AccordionTrigger 
                              onClick={(e) => {
                                e.preventDefault();
                                const newIsOpen = !expandedSubCategories.has(subCategory.id);
                                handleSubCategoryExpand(subCategory.id, newIsOpen);
                              }}
                              className="flex-1 hover:no-underline"
                            >
                              <Label
                                htmlFor={`subcategory-${subCategory.id}`}
                                className="font-medium cursor-pointer"
                              >
                                {subCategory.name}
                              </Label>
                            </AccordionTrigger>
                          </div>
                          
                          <AccordionContent>
                            <div className="mt-1 ml-6 space-y-1">
                              {/* Line Items */}
                              {subCategory.lineItems.map((lineItem) => (
                                <div key={lineItem.id} className="flex items-center py-1 border-l border-gray-200 pl-2">
                                  <Checkbox
                                    id={`lineitem-${lineItem.id}`}
                                    checked={selectedItems.has(lineItem.id)}
                                    onCheckedChange={(checked) => {
                                      handleLineItemChange(lineItem.id, [subCategory.id, category.id], !!checked);
                                    }}
                                    className="mr-2"
                                  />
                                  <Label
                                    htmlFor={`lineitem-${lineItem.id}`}
                                    className="cursor-pointer text-sm"
                                  >
                                    {lineItem.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ModalWrapper>
  );
};

export default CategorySelectionModal;