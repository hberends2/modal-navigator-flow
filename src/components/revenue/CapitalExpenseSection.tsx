
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import MetricRow from "./MetricRow";

interface CapitalExpenseRow {
  id: string;
  description: string;
  year2025: string;
  year2026: string;
  year2027: string;
  year2028: string;
  year2029: string;
}

interface CapitalExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
  capitalExpenseRows?: CapitalExpenseRow[];
}

const CapitalExpenseSection: React.FC<CapitalExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  formatCurrency,
  capitalExpenseRows = []
}) => {
  // Initialize with one default row if none provided
  const [rows, setRows] = useState<CapitalExpenseRow[]>(
    capitalExpenseRows.length > 0 
      ? capitalExpenseRows 
      : [{
          id: '1',
          description: '',
          year2025: '0',
          year2026: '0',
          year2027: '0',
          year2028: '0',
          year2029: '0'
        }]
  );

  const formatNumberInput = (value: string): string => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, "");
    // Convert to number and add commas
    const number = parseInt(numericValue) || 0;
    return number.toLocaleString();
  };

  const parseNumberFromInput = (value: string): number => {
    // Remove commas and convert to number
    const numericValue = value.replace(/,/g, "");
    return parseInt(numericValue) || 0;
  };

  const handleDescriptionChange = (rowId: string, value: string) => {
    setRows(prev => prev.map(row => 
      row.id === rowId ? { ...row, description: value } : row
    ));
  };

  const handleValueChange = (rowId: string, year: number, value: string) => {
    const yearKey = `year${year}` as keyof CapitalExpenseRow;
    setRows(prev => prev.map(row => 
      row.id === rowId ? { ...row, [yearKey]: value } : row
    ));
  };

  const handleValueBlur = (rowId: string, year: number, value: string) => {
    const formattedValue = formatNumberInput(value);
    const yearKey = `year${year}` as keyof CapitalExpenseRow;
    setRows(prev => prev.map(row => 
      row.id === rowId ? { ...row, [yearKey]: formattedValue } : row
    ));
  };

  const addNewRow = () => {
    const newId = (Math.max(...rows.map(r => parseInt(r.id))) + 1).toString();
    const newRow: CapitalExpenseRow = {
      id: newId,
      description: '',
      year2025: '0',
      year2026: '0',
      year2027: '0',
      year2028: '0',
      year2029: '0'
    };
    setRows(prev => [...prev, newRow]);
  };

  const getRowValue = (row: CapitalExpenseRow, year: number): string => {
    switch (year) {
      case 2025: return row.year2025;
      case 2026: return row.year2026;
      case 2027: return row.year2027;
      case 2028: return row.year2028;
      case 2029: return row.year2029;
      default: return '0';
    }
  };

  return (
    <>
      {/* Capital Expense Section Header */}
      <tr id="capital-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* Capital Expense Header Row */}
      <MetricRow
        label={
          <div className="bg-gray-600 text-white px-2 py-1 text-center font-bold text-sm rounded-sm w-full">
            CAPITAL EXPENSE
          </div>
        }
        historicalData={historicalYears.map(() => (
          <div className="bg-gray-600 h-6 w-full"></div>
        ))}
        forecastData={forecastYears.map(() => (
          <div className="bg-gray-600 h-6 w-full"></div>
        ))}
        isHeaderRow={true}
      />

      {/* Capital Expense Rows */}
      {rows.map((row, index) => (
        <MetricRow
          key={row.id}
          label={
            <input
              type="text"
              value={row.description}
              onChange={(e) => handleDescriptionChange(row.id, e.target.value)}
              className="w-full text-sm bg-yellow-50 text-blue-600 border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-2 py-1 mr-4"
              placeholder="Enter capital expense description"
            />
          }
          historicalData={historicalYears.map(() => (
            <span className="text-sm text-gray-400">-</span>
          ))}
          forecastData={forecastYears.map(year => (
            <input
              key={`${row.id}-${year}`}
              type="text"
              value={getRowValue(row, year)}
              onChange={(e) => handleValueChange(row.id, year, e.target.value)}
              onBlur={(e) => handleValueBlur(row.id, year, e.target.value)}
              className="w-full text-center text-sm bg-yellow-50 text-blue-600 border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
              placeholder="0"
            />
          ))}
        />
      ))}

      {/* Add New Item Button Row */}
      <tr>
        <td className="py-2 px-2">
          <Button
            onClick={addNewRow}
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-normal"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Item
          </Button>
        </td>
        {historicalYears.map((_, index) => (
          <td key={`hist-empty-${index}`} className="py-2"></td>
        ))}
        {forecastYears.map((_, index) => (
          <td key={`forecast-empty-${index}`} className="py-2"></td>
        ))}
      </tr>
    </>
  );
};

export default CapitalExpenseSection;
