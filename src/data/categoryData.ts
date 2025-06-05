import { v4 as uuidv4 } from 'uuid';

// Interfaces for our category data structure
export interface LineItem {
  id: string;
  name: string;
  parentId: string; // Reference to parent subcategory
}

export interface SubCategory {
  id: string;
  name: string;
  parentId: string; // Reference to parent primary category
  lineItems: LineItem[];
}

export interface PrimaryCategory {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

// Initialize mock data for Food & Beverage
export const categories: PrimaryCategory[] = [
  {
    id: "food-beverage",
    name: "Food & Beverage",
    subCategories: [
      {
        id: "banquets-catering-av",
        name: "Banquets & Catering and AV",
        parentId: "food-beverage",
        lineItems: [
          {
            id: "banquets",
            name: "Banquets",
            parentId: "banquets-catering-av",
          },
          {
            id: "catering",
            name: "Catering",
            parentId: "banquets-catering-av",
          },
          {
            id: "audio-visual",
            name: "Audio Visual",
            parentId: "banquets-catering-av",
          }
        ]
      },
      {
        id: "kitchen",
        name: "Kitchen",
        parentId: "food-beverage",
        lineItems: [
          {
            id: "food-prep",
            name: "Food Preparation",
            parentId: "kitchen",
          },
          {
            id: "kitchen-equipment",
            name: "Kitchen Equipment",
            parentId: "kitchen",
          }
        ]
      },
      {
        id: "outlets",
        name: "Outlets",
        parentId: "food-beverage",
        lineItems: [
          {
            id: "restaurant",
            name: "Restaurant",
            parentId: "outlets",
          },
          {
            id: "bar",
            name: "Bar",
            parentId: "outlets",
          },
          {
            id: "lounge",
            name: "Lounge",
            parentId: "outlets",
          }
        ]
      },
      {
        id: "minor-fb",
        name: "Minor F&B",
        parentId: "food-beverage",
        lineItems: [
          {
            id: "coffee-shop",
            name: "Coffee Shop",
            parentId: "minor-fb",
          },
          {
            id: "mini-bar",
            name: "Mini Bar",
            parentId: "minor-fb",
          }
        ]
      }
    ]
  },
  {
    id: "other-operated",
    name: "Other Operated",
    subCategories: [
      {
        id: "other-operated-departments",
        name: "Other Operated Departments",
        parentId: "other-operated",
        lineItems: [
          {
            id: "golf",
            name: "Golf",
            parentId: "other-operated-departments",
          },
          {
            id: "spa",
            name: "Spa",
            parentId: "other-operated-departments",
          },
          {
            id: "retail",
            name: "Retail",
            parentId: "other-operated-departments",
          }
        ]
      }
    ]
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    subCategories: [
      {
        id: "misc-revenue",
        name: "Miscellaneous Revenue",
        parentId: "miscellaneous",
        lineItems: [
          {
            id: "parking",
            name: "Parking",
            parentId: "misc-revenue",
          },
          {
            id: "other-income",
            name: "Other Income",
            parentId: "misc-revenue",
          }
        ]
      }
    ]
  },
  {
    id: "allocated",
    name: "Allocated",
    subCategories: [
      {
        id: "allocated-expenses",
        name: "Allocated Expenses",
        parentId: "allocated",
        lineItems: [
          {
            id: "corporate-allocation",
            name: "Corporate Allocation",
            parentId: "allocated-expenses",
          },
          {
            id: "system-charges",
            name: "System Charges",
            parentId: "allocated-expenses",
          }
        ]
      }
    ]
  }
];

// Helper functions for category operations
export const generateId = (): string => {
  return uuidv4();
};

export const getAllDescendantIds = (
  categoryId: string, 
  categories: PrimaryCategory[]
): string[] => {
  // Find the primary category
  const primaryCategory = categories.find(cat => cat.id === categoryId);
  if (primaryCategory) {
    // Get all subcategory IDs
    const subCategoryIds = primaryCategory.subCategories.map(sub => sub.id);
    
    // Get all line item IDs
    const lineItemIds = primaryCategory.subCategories.flatMap(sub => 
      sub.lineItems.map(item => item.id)
    );
    
    // Return all IDs
    return [categoryId, ...subCategoryIds, ...lineItemIds];
  }
  
  // Check if it's a subcategory
  for (const primary of categories) {
    const subCategory = primary.subCategories.find(sub => sub.id === categoryId);
    if (subCategory) {
      // Get all line item IDs
      const lineItemIds = subCategory.lineItems.map(item => item.id);
      
      // Return all IDs
      return [categoryId, ...lineItemIds];
    }
  }
  
  // If it's just a line item, return only its ID
  return [categoryId];
};

export const getParentIds = (
  itemId: string, 
  categories: PrimaryCategory[]
): string[] => {
  // Check if it's a line item
  for (const primary of categories) {
    for (const sub of primary.subCategories) {
      const lineItem = sub.lineItems.find(item => item.id === itemId);
      if (lineItem) {
        // Return subcategory and primary category IDs
        return [sub.id, primary.id];
      }
    }
  }
  
  // Check if it's a subcategory
  for (const primary of categories) {
    const subCategory = primary.subCategories.find(sub => sub.id === itemId);
    if (subCategory) {
      // Return primary category ID
      return [primary.id];
    }
  }
  
  // If it's a primary category, return empty array
  return [];
};