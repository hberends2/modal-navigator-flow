
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface NonOperatingExpensesModalProps {
  onClose: () => void;
  onNext: () => void;
}

const NonOperatingExpensesModal: React.FC<NonOperatingExpensesModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    groundRent: "",
    buildingInsurance: "",
    propertyInsurance: "",
    lesseeImprovements: "",
    leasehold: "",
    propertyTaxes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Non-Operating Expenses Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Non-Operating Expenses" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="groundRent"
          label="Ground Rent - % of Total Revenue"
          type="percentage"
          value={formData.groundRent}
          onChange={(value) => handleInputChange("groundRent", value)}
        />
        
        <FormField
          id="buildingInsurance"
          label="Building Insurance (Amount)"
          type="currency"
          value={formData.buildingInsurance}
          onChange={(value) => handleInputChange("buildingInsurance", value)}
        />
        
        <FormField
          id="propertyInsurance"
          label="Property Insurance (Amount)"
          type="currency"
          value={formData.propertyInsurance}
          onChange={(value) => handleInputChange("propertyInsurance", value)}
        />
        
        <FormField
          id="lesseeImprovements"
          label="Lessee Improvements (Amount)"
          type="currency"
          value={formData.lesseeImprovements}
          onChange={(value) => handleInputChange("lesseeImprovements", value)}
        />
        
        <FormField
          id="leasehold"
          label="Leasehold Improvement - % of Total Revenue"
          type="percentage"
          value={formData.leasehold}
          onChange={(value) => handleInputChange("leasehold", value)}
        />
        
        <FormField
          id="propertyTaxes"
          label="Property Taxes (Amount)"
          type="currency"
          value={formData.propertyTaxes}
          onChange={(value) => handleInputChange("propertyTaxes", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default NonOperatingExpensesModal;
