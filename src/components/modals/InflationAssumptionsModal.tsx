
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface InflationAssumptionsModalProps {
  onClose: () => void;
  onNext: () => void;
}

const InflationAssumptionsModal: React.FC<InflationAssumptionsModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    insuranceInflationRate: "",
    propertyInflationRate: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Inflation Assumptions Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Inflation Assumptions" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="insuranceInflationRate"
          label="Insurance Inflation Rate"
          type="percentage"
          value={formData.insuranceInflationRate}
          onChange={(value) => handleInputChange("insuranceInflationRate", value)}
        />
        
        <FormField
          id="propertyInflationRate"
          label="Property Inflation Rate"
          type="percentage"
          value={formData.propertyInflationRate}
          onChange={(value) => handleInputChange("propertyInflationRate", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default InflationAssumptionsModal;
