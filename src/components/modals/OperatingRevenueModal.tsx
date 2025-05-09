
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface OperatingRevenueModalProps {
  onClose: () => void;
  onNext: () => void;
}

const OperatingRevenueModal: React.FC<OperatingRevenueModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    foodBeverageRevenue: "",
    alFoodAndBeverage: "",
    otherOperatedRevenue: "",
    telecomRevenue: "",
    rentalsAndOtherIncome: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Operating Revenue Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Operating Revenue" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="foodBeverageRevenue"
          label="Food & Beverage Revenue"
          type="currency"
          value={formData.foodBeverageRevenue}
          onChange={(value) => handleInputChange("foodBeverageRevenue", value)}
        />
        
        <FormField
          id="alFoodAndBeverage"
          label="A&L Food & Beverage"
          type="currency"
          value={formData.alFoodAndBeverage}
          onChange={(value) => handleInputChange("alFoodAndBeverage", value)}
        />
        
        <FormField
          id="otherOperatedRevenue"
          label="Other Operated Revenue (POR)"
          type="currency"
          value={formData.otherOperatedRevenue}
          onChange={(value) => handleInputChange("otherOperatedRevenue", value)}
        />
        
        <FormField
          id="telecomRevenue"
          label="Telecom Revenue"
          type="currency"
          value={formData.telecomRevenue}
          onChange={(value) => handleInputChange("telecomRevenue", value)}
        />
        
        <FormField
          id="rentalsAndOtherIncome"
          label="Rentals & Other Income (Net) (POR)"
          type="currency"
          value={formData.rentalsAndOtherIncome}
          onChange={(value) => handleInputChange("rentalsAndOtherIncome", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default OperatingRevenueModal;
