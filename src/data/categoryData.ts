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
    id: "none",
    name: "None",
    subCategories: []
  },
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
            id: "audio-visual",
            name: "Audio Visual",
            parentId: "banquets-catering-av",
          },
          {
            id: "banquets",
            name: "Banquets",
            parentId: "banquets-catering-av",
          },
          {
            id: "catering",
            name: "Catering",
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
      },
      {
        id: "outlets",
        name: "Outlets",
        parentId: "food-beverage",
        lineItems: [
          {
            id: "bar",
            name: "Bar",
            parentId: "outlets",
          },
          {
            id: "lounge",
            name: "Lounge",
            parentId: "outlets",
          },
          {
            id: "restaurant",
            name: "Restaurant",
            parentId: "outlets",
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
        id: "casino",
        name: "Casino",
        parentId: "other-operated",
        lineItems: [
          {
            id: "casino-ops",
            name: "Casino",
            parentId: "casino",
          }
        ]
      },
      {
        id: "farms-vineyards",
        name: "Farms and Vineyards",
        parentId: "other-operated",
        lineItems: [
          {
            id: "vineyard",
            name: "Vineyard",
            parentId: "farms-vineyards",
          }
        ]
      },
      {
        id: "golf",
        name: "Golf",
        parentId: "other-operated",
        lineItems: [
          {
            id: "golf-ops",
            name: "Golf",
            parentId: "golf",
          },
          {
            id: "golf-pro-shop",
            name: "Golf Pro Shop",
            parentId: "golf",
          }
        ]
      },
      {
        id: "marina",
        name: "Marina",
        parentId: "other-operated",
        lineItems: [
          {
            id: "marina-ops",
            name: "Marina",
            parentId: "marina",
          }
        ]
      },
      {
        id: "membership",
        name: "Membership",
        parentId: "other-operated",
        lineItems: [
          {
            id: "membership-services",
            name: "Membership Services",
            parentId: "membership",
          }
        ]
      },
      {
        id: "minor-operated-departments",
        name: "Minor Operated Departments",
        parentId: "other-operated",
        lineItems: [
          {
            id: "other-minor-ops",
            name: "Other Minor Ops",
            parentId: "minor-operated-departments",
          },
          {
            id: "telecommunications",
            name: "Telecommunications",
            parentId: "minor-operated-departments",
          }
        ]
      },
      {
        id: "parking-transportation",
        name: "Parking and Transportation",
        parentId: "other-operated",
        lineItems: [
          {
            id: "parking-garage",
            name: "Parking/Garage",
            parentId: "parking-transportation",
          },
          {
            id: "transportation",
            name: "Transportation",
            parentId: "parking-transportation",
          }
        ]
      },
      {
        id: "racquet-court-sports",
        name: "Racquet and Court Sports",
        parentId: "other-operated",
        lineItems: [
          {
            id: "tennis-pickleball",
            name: "Tennis and Pickleball",
            parentId: "racquet-court-sports",
          }
        ]
      },
      {
        id: "recreation",
        name: "Recreation",
        parentId: "other-operated",
        lineItems: [
          {
            id: "activity-center",
            name: "Activity Center",
            parentId: "recreation",
          },
          {
            id: "central-recreation",
            name: "Central Recreation",
            parentId: "recreation",
          },
          {
            id: "kids-club",
            name: "Kids Club",
            parentId: "recreation",
          }
        ]
      },
      {
        id: "retail",
        name: "Retail",
        parentId: "other-operated",
        lineItems: [
          {
            id: "gift-shop",
            name: "Gift Shop",
            parentId: "retail",
          }
        ]
      },
      {
        id: "spa-fitness",
        name: "Spa and Fitness",
        parentId: "other-operated",
        lineItems: [
          {
            id: "fitness-center",
            name: "Fitness Center",
            parentId: "spa-fitness",
          },
          {
            id: "health-club",
            name: "Health Club",
            parentId: "spa-fitness",
          },
          {
            id: "salon",
            name: "Salon",
            parentId: "spa-fitness",
          },
          {
            id: "spa",
            name: "Spa",
            parentId: "spa-fitness",
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
        id: "misc-income-expense",
        name: "Miscellaneous Income/Expense",
        parentId: "miscellaneous",
        lineItems: [
          {
            id: "misc-income-expense-item",
            name: "Miscellaneous Income/Expense",
            parentId: "misc-income-expense",
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
        name: "Allocated",
        parentId: "allocated",
        lineItems: [
          {
            id: "employee-dining",
            name: "Employee Dining",
            parentId: "allocated-expenses",
          },
          {
            id: "in-house-laundry",
            name: "In House Laundry",
            parentId: "allocated-expenses",
          },
          {
            id: "other-allocated",
            name: "Other Allocated",
            parentId: "allocated-expenses",
          },
          {
            id: "payroll-benefits",
            name: "Payroll Tax and Employee Benefits",
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