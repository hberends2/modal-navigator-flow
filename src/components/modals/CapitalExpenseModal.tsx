
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface CapitalExpenseRow {
  id: string;
  description: string;
  year2025: string;
  year2026: string;
  year2027: string;
  year2028: string;
  year2029: string;
}

interface CapitalExpenseModalProps {
  open: boolean;
  onClose: () => void;
}

const CapitalExpenseModal: React.FC<CapitalExpenseModalProps> = ({
  open,
  onClose,
}) => {
  const [rows, setRows] = useState<CapitalExpenseRow[]>([
    {
      id: "1",
      description: "",
      year2025: "",
      year2026: "",
      year2027: "",
      year2028: "",
      year2029: "",
    },
  ]);

  const formatNumber = (value: string): string => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, "");
    
    // Add commas for thousands
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (
    rowId: string,
    field: keyof CapitalExpenseRow,
    value: string
  ) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          if (field === "description") {
            return { ...row, [field]: value };
          } else {
            // Format numeric fields
            return { ...row, [field]: formatNumber(value) };
          }
        }
        return row;
      })
    );
  };

  const addNewRow = () => {
    const newId = (rows.length + 1).toString();
    setRows((prevRows) => [
      ...prevRows,
      {
        id: newId,
        description: "",
        year2025: "",
        year2026: "",
        year2027: "",
        year2028: "",
        year2029: "",
      },
    ]);
  };

  const handleSave = () => {
    // TODO: Save to database in future implementation
    console.log("Saving Capital Expense data:", rows);
    onClose();
  };

  const isRowComplete = (row: CapitalExpenseRow): boolean => {
    return row.description.trim() !== "";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Capital Expense</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-x-auto p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                  2025
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                  2026
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                  2027
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                  2028
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                  2029
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <React.Fragment key={row.id}>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) =>
                          handleInputChange(row.id, "description", e.target.value)
                        }
                        className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter description..."
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={row.year2025}
                        onChange={(e) =>
                          handleInputChange(row.id, "year2025", e.target.value)
                        }
                        className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-right"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={row.year2026}
                        onChange={(e) =>
                          handleInputChange(row.id, "year2026", e.target.value)
                        }
                        className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-right"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={row.year2027}
                        onChange={(e) =>
                          handleInputChange(row.id, "year2027", e.target.value)
                        }
                        className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-right"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={row.year2028}
                        onChange={(e) =>
                          handleInputChange(row.id, "year2028", e.target.value)
                        }
                        className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-right"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={row.year2029}
                        onChange={(e) =>
                          handleInputChange(row.id, "year2029", e.target.value)
                        }
                        className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-right"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                  {isRowComplete(row) && index === rows.length - 1 && (
                    <tr>
                      <td colSpan={6} className="text-center py-2">
                        <button
                          onClick={addNewRow}
                          className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                          title="Add new row"
                        >
                          <Plus size={16} />
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CapitalExpenseModal;
