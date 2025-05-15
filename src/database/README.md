
# Database Schema for Property Management System

This database schema represents a comprehensive property management system with 13 interconnected tables. The Property_Details table serves as the primary table that all other tables reference via foreign keys.

## Key Features

- **Property_Details**: The primary table containing basic property information
- **Foreign Key Relationships**: All tables reference the Property_Details table via property_id
- **Data Types**: Carefully chosen types based on the specified format requirements
- **Timestamps**: All tables include created_at and updated_at fields for record tracking
- **Indexes**: Added for optimizing join performance

## Table Relationships

```
Property_Details
 ├── Acquisition
 ├── Financing
 ├── Disposition
 ├── CapEx
 ├── Inflation_Assumptions
 ├── Penetration
 ├── Operating_Revenue
 ├── Dept_Expense
 ├── Fees (Management & Franchise)
 ├── Undist_Expense
 ├── NonOp_Expense
 └── FFE_Reserve
```

## Implementation Notes

1. All tables include an auto-incrementing primary key (id)
2. All tables include a reference to the Property_Details table (property_id)
3. Numeric fields use NUMERIC(10, 2) for percentage values to allow for precision
4. All tables include created_at and updated_at timestamp fields
5. Indexes have been added to optimize join performance
