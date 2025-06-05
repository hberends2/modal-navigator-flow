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

  // Handle primary category selection
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    
    if (checked) {
      // Add the category and all its descendants
      const descendantIds = getAllDescendantIds(categoryId, categories);
      descendantIds.forEach(id => newSelectedItems.add(id));
      
      // Expand this category
      setExpandedCategories(prev => new Set([...prev, categoryId]));
    } else {
      // Remove the category and all its descendants
      const descendantIds = getAllDescendantIds(categoryId, categories);
      descendantIds.forEach(id => newSelectedItems.delete(id));
      
      // Collapse this category
      const newExpandedCategories = new Set(expandedCategories);
      newExpandedCategories.delete(categoryId);
      setExpandedCategories(newExpandedCategories);
    }
    
    setSelectedItems(newSelectedItems);
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (subCategoryId: string, parentId: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    
    if (checked) {
      // Add the subcategory and all its line items
      const descendantIds = getAllDescendantIds(subCategoryId, categories);
      descendantIds.forEach(id => newSelectedItems.add(id));
      
      // Also select the parent category if not already selected
      newSelectedItems.add(parentId);
      
      // Expand this subcategory
      setExpandedSubCategories(prev => new Set([...prev, subCategoryId]));
      // Ensure parent category is also expanded
      setExpandedCategories(prev => new Set([...prev, parentId]));
    } else {
      // Remove the subcategory and all its line items
      const descendantIds = getAllDescendantIds(subCategoryId, categories);
      descendantIds.forEach(id => newSelectedItems.delete(id));
      
      // Collapse this subcategory
      const newExpandedSubCategories = new Set(expandedSubCategories);
      newExpandedSubCategories.delete(subCategoryId);
      setExpandedSubCategories(newExpandedSubCategories);
      
      // Check if we need to unselect the parent category
      // (if no subcategories of this parent are selected)
      const parentCategory = categories.find(cat => cat.id === parentId);
      if (parentCategory) {
        const anySubCategorySelected = parentCategory.subCategories.some(
          subCat => subCat.id !== subCategoryId && newSelectedItems.has(subCat.id)
        );
        
        if (!anySubCategorySelected) {
          newSelectedItems.delete(parentId);
        }
      }
    }
    
    setSelectedItems(newSelectedItems);
  };

  // Handle line item selection
  const handleLineItemChange = (lineItemId: string, parentIds: string[], checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    
    if (checked) {
      // Add the line item
      newSelectedItems.add(lineItemId);
      
      // Also select all parents if not already selected
      parentIds.forEach(id => newSelectedItems.add(id));
      
      // Ensure parent subcategory and category are expanded
      const [subCategoryId, primaryCategoryId] = parentIds;
      setExpandedSubCategories(prev => new Set([...prev, subCategoryId]));
      setExpandedCategories(prev => new Set([...prev, primaryCategoryId]));
    } else {
      // Remove the line item
      newSelectedItems.delete(lineItemId);
      
      // Check if we need to unselect the parent subcategory
      // (if no line items of this subcategory are selected)
      const [subCategoryId, primaryCategoryId] = parentIds;
      const primaryCategory = categories.find(cat => cat.id === primaryCategoryId);
      if (primaryCategory) {
        const subCategory = primaryCategory.subCategories.find(subCat => subCat.id === subCategoryId);
        if (subCategory) {
          const anyLineItemSelected = subCategory.lineItems.some(
            item => item.id !== lineItemId && newSelectedItems.has(item.id)
          );
          
          if (!anyLineItemSelected) {
            newSelectedItems.delete(subCategoryId);
            
            // Check if we need to unselect the primary category
            const anySubCategorySelected = primaryCategory.subCategories.some(
              subCat => subCat.id !== subCategoryId && newSelectedItems.has(subCat.id)
            );
            
            if (!anySubCategorySelected) {
              newSelectedItems.delete(primaryCategoryId);
            }
          }
        }
      }
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