
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface AcquisitionModalProps {
  onClose: () => void;
  onNext: () => void;
}

const AcquisitionModal: React.FC<AcquisitionModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    acquisitionCostsPerc: "",
    acquisitionMonth: "",
    acquisitionYear: "",
    hold: "",
    stabilized: "",
    purchasePrice: "",
    capRate: "",
  });

  const months = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleMonthChange = (value: string) => {
    setFormData({
      ...formData,
      acquisitionMonth: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Acquisition Data:", formData);
    
    onClose();
  };

  return (
    <ModalWrapper title="Acquisition" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="acquisitionCostsPerc"
          label="Acquisition Costs (Inc. Under Fees)"
          type="percentage"
          value={formData.acquisitionCostsPerc}
          onChange={(value) => handleInputChange("acquisitionCostsPerc", value)}
        />
        
        <div className="mb-4">
          <label htmlFor="acquisitionMonth" className="block mb-1 font-medium">
            Acquisition Month
          </label>
          <Select value={formData.acquisitionMonth} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <FormField
          id="acquisitionYear"
          label="Acquisition Year"
          type="integer"
          value={formData.acquisitionYear}
          onChange={(value) => handleInputChange("acquisitionYear", value)}
        />
        
        <FormField
          id="hold"
          label="Hold Period (Years)"
          type="integer"
          value={formData.hold}
          onChange={(value) => handleInputChange("hold", value)}
        />
        
        <FormField
          id="stabilized"
          label="Stabilized Period (Years)"
          type="integer"
          value={formData.stabilized}
          onChange={(value) => handleInputChange("stabilized", value)}
        />
        
        <FormField
          id="purchasePrice"
          label="Purchase Price (should be calculated?)"
          type="currency"
          value={formData.purchasePrice}
          onChange={(value) => handleInputChange("purchasePrice", value)}
        />
        
        <FormField
          id="capRate"
          label="Cap Rate"
          type="percentage"
          value={formData.capRate}
          onChange={(value) => handleInputChange("capRate", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default AcquisitionModal;
