
export interface LineItem {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  lineItems: LineItem[];
}

export interface PrimaryCategory {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export const categories: PrimaryCategory[] = [
  {
    id: "food-beverage",
    name: "Food & Beverage",
    subCategories: [
      {
        id: "restaurant",
        name: "Restaurant",
        lineItems: [
          { id: "fine-dining", name: "Fine Dining" },
          { id: "casual-dining", name: "Casual Dining" },
          { id: "quick-service", name: "Quick Service" }
        ]
      },
      {
        id: "bar-lounge",
        name: "Bar/Lounge",
        lineItems: [
          { id: "cocktail-bar", name: "Cocktail Bar" },
          { id: "sports-bar", name: "Sports Bar" },
          { id: "wine-bar", name: "Wine Bar" }
        ]
      },
      {
        id: "room-service",
        name: "Room Service",
        lineItems: [
          { id: "24-hour-service", name: "24-Hour Service" },
          { id: "limited-hours", name: "Limited Hours" }
        ]
      }
    ]
  },
  {
    id: "other-operated",
    name: "Other Operated",
    subCategories: [
      {
        id: "spa-wellness",
        name: "Spa & Wellness",
        lineItems: [
          { id: "full-service-spa", name: "Full Service Spa" },
          { id: "fitness-center", name: "Fitness Center" },
          { id: "wellness-programs", name: "Wellness Programs" }
        ]
      },
      {
        id: "recreation",
        name: "Recreation",
        lineItems: [
          { id: "golf-course", name: "Golf Course" },
          { id: "tennis-courts", name: "Tennis Courts" },
          { id: "swimming-pools", name: "Swimming Pools" }
        ]
      },
      {
        id: "retail",
        name: "Retail",
        lineItems: [
          { id: "gift-shop", name: "Gift Shop" },
          { id: "convenience-store", name: "Convenience Store" },
          { id: "boutique", name: "Boutique" }
        ]
      }
    ]
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    subCategories: [
      {
        id: "resort-fees",
        name: "Resort Fees",
        lineItems: []
      },
      {
        id: "miscellaneous-income-expense",
        name: "Miscellaneous Income/Expense",
        lineItems: [
          { id: "parking-fees", name: "Parking Fees" },
          { id: "service-charges", name: "Service Charges" },
          { id: "other-income", name: "Other Income" }
        ]
      }
    ]
  },
  {
    id: "allocated",
    name: "Allocated",
    subCategories: [
      {
        id: "property-operations",
        name: "Property Operations & Maintenance",
        lineItems: [
          { id: "maintenance-repairs", name: "Maintenance & Repairs" },
          { id: "housekeeping", name: "Housekeeping" },
          { id: "grounds-maintenance", name: "Grounds Maintenance" }
        ]
      },
      {
        id: "administrative-general",
        name: "Administrative & General",
        lineItems: [
          { id: "front-office", name: "Front Office" },
          { id: "accounting", name: "Accounting" },
          { id: "human-resources", name: "Human Resources" }
        ]
      },
      {
        id: "sales-marketing",
        name: "Sales & Marketing",
        lineItems: [
          { id: "advertising", name: "Advertising" },
          { id: "promotions", name: "Promotions" },
          { id: "sales-team", name: "Sales Team" }
        ]
      }
    ]
  },
  {
    id: "none",
    name: "None",
    subCategories: []
  }
];

// Helper function to get all descendant IDs (subcategories and line items) for a given category
export const getAllDescendantIds = (categoryId: string): string[] => {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  const descendants: string[] = [];
  
  category.subCategories.forEach(subCat => {
    descendants.push(subCat.id);
    subCat.lineItems.forEach(lineItem => {
      descendants.push(lineItem.id);
    });
  });
  
  return descendants;
};

// Helper function to get parent IDs for a given item ID
export const getParentIds = (itemId: string): string[] => {
  for (const category of categories) {
    for (const subCategory of category.subCategories) {
      for (const lineItem of subCategory.lineItems) {
        if (lineItem.id === itemId) {
          return [subCategory.id, category.id];
        }
      }
      if (subCategory.id === itemId) {
        return [category.id];
      }
    }
    if (category.id === itemId) {
      return [];
    }
  }
  return [];
};
