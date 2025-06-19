
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ExpenseHeaderProps {
  expenseForecastMethod: string;
  setExpenseForecastMethod: (value: string) => void;
}

const ExpenseHeader: React.FC<ExpenseHeaderProps> = ({
  expenseForecastMethod,
  setExpenseForecastMethod
}) => {
  return (
    <tr className="bg-gray-600">
      <td colSpan={10} className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-sm">EXPENSES</span>
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs font-medium">Forecast Method:</span>
            <div className="w-40">
              <Select value={expenseForecastMethod} onValueChange={setExpenseForecastMethod}>
                <SelectTrigger className="h-8 text-xs bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POR">POR</SelectItem>
                  <SelectItem value="% of Revenue">% of Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ExpenseHeader;
