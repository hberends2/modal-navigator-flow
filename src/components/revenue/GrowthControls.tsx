
import React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface GrowthControlsProps {
  revparGrowthType: string;
  setRevparGrowthType: (value: string) => void;
  flatRevparGrowth: string;
  setFlatRevparGrowth: (value: string) => void;
  yearlyRevparGrowth: Record<number, string>;
  handleYearlyRevparChange: (year: number, value: string) => void;
  forecastYears: number[];
}

const GrowthControls: React.FC<GrowthControlsProps> = ({
  revparGrowthType,
  setRevparGrowthType,
  flatRevparGrowth,
  setFlatRevparGrowth,
  yearlyRevparGrowth,
  handleYearlyRevparChange,
  forecastYears
}) => {
  return (
    <div className="flex items-center gap-2">
      <span>RevPAR YoY</span>
      <Select value={revparGrowthType} onValueChange={setRevparGrowthType}>
        <SelectTrigger className="w-32 h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
          <SelectItem value="flat" className="text-left">Flat Growth</SelectItem>
          <SelectItem value="yearly" className="text-left">Yearly Growth</SelectItem>
        </SelectContent>
      </Select>
      {revparGrowthType === "flat" && (
        <div className="relative w-20">
          <Input
            type="text"
            value={flatRevparGrowth}
            onChange={(e) => setFlatRevparGrowth(e.target.value.replace(/[^0-9.-]/g, ""))}
            className="pr-6 text-center h-8 text-blue-600"
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
        </div>
      )}
    </div>
  );
};

export default GrowthControls;
