
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface GrowthAssumptionsModalProps {
  onClose: () => void;
  onNext: () => void;
}

const GrowthAssumptionsModal: React.FC<GrowthAssumptionsModalProps> = ({
  onClose,
  onNext
}) => {
  const [growthType, setGrowthType] = useState<string>("");
  const [flatGrowthRate, setFlatGrowthRate] = useState<string>("");
  const [yearlyGrowthRates, setYearlyGrowthRates] = useState<Record<number, string>>({});
  
  // POC values as specified
  const holdPeriod = 5;
  const startYear = 2025;

  const handleSave = () => {
    console.log("Saving growth assumptions:", {
      growthType,
      flatGrowthRate,
      yearlyGrowthRates
    });
    onClose();
  };

  const handleYearlyGrowthChange = (year: number, value: string) => {
    // Allow only numbers and decimal point for percentage
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    setYearlyGrowthRates(prev => ({
      ...prev,
      [year]: sanitizedValue
    }));
  };

  const handleFlatGrowthChange = (value: string) => {
    // Allow only numbers and decimal point for percentage
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    setFlatGrowthRate(sanitizedValue);
  };

  const renderYearlyInputs = () => {
    const inputs = [];
    for (let i = 0; i < holdPeriod; i++) {
      const year = startYear + i;
      inputs.push(
        <div key={year} className="flex items-center space-x-4">
          <Label className="w-16 text-sm font-medium">Year {year}:</Label>
          <div className="relative flex-1">
            <Input
              type="text"
              value={yearlyGrowthRates[year] || ""}
              onChange={(e) => handleYearlyGrowthChange(year, e.target.value)}
              placeholder="0.00"
              className="pr-8"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>
      );
    }
    return inputs;
  };

  return (
    <ModalWrapper
      title="Growth Assumptions"
      onClose={onClose}
      onSave={handleSave}
      onNext={onNext}
      showNext={true}
      showSave={true}
    >
      <div className="space-y-6">
        {/* Growth Type Dropdown */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Growth Type</Label>
          <Select value={growthType} onValueChange={setGrowthType}>
            <SelectTrigger>
              <SelectValue placeholder="Select growth type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flat">Flat Growth</SelectItem>
              <SelectItem value="yearly">Yearly Growth</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional Inputs */}
        {growthType === "flat" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Growth Rate</Label>
            <div className="relative">
              <Input
                type="text"
                value={flatGrowthRate}
                onChange={(e) => handleFlatGrowthChange(e.target.value)}
                placeholder="0.00"
                className="pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
        )}

        {growthType === "yearly" && (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Yearly Growth Rates</Label>
            <div className="space-y-3">
              {renderYearlyInputs()}
            </div>
          </div>
        )}

        {/* Hold Period Info */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Hold Period: {holdPeriod} years (2025-{startYear + holdPeriod - 1})
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default GrowthAssumptionsModal;
