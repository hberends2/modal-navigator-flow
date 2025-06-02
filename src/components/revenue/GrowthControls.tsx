
import React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface GrowthControlsProps {
  currentGrowthType: string;
  setGrowthType: (value: string) => void;
  options: { value: string; label: string; }[];
}

const GrowthControls: React.FC<GrowthControlsProps> = ({
  currentGrowthType,
  setGrowthType,
  options
}) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={currentGrowthType} onValueChange={setGrowthType}>
        <SelectTrigger className="w-32 h-auto min-h-[32px] py-1 [&>span]:whitespace-normal [&>span]:leading-tight">
          <SelectValue className="whitespace-normal text-left leading-tight" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-left whitespace-normal">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GrowthControls;
