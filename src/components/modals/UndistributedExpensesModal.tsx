
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface UndistributedExpensesModalProps {
  onClose: () => void;
  onNext: () => void;
}

const UndistributedExpensesModal: React.FC<UndistributedExpensesModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    generalAdmin: "",
    itSystems: "",
    security: "",
    marketing: "",
    propertyTax: "",
    propertyInsurance: "",
    utilities: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Undistributed Expenses Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Undistributed Expenses" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="generalAdmin"
          label="General & Admin Expense (Amount)"
          type="currency"
          value={formData.generalAdmin}
          onChange={(value) => handleInputChange("generalAdmin", value)}
        />
        
        <FormField
          id="itSystems"
          label="IT & Systems Expense POR"
          type="currency"
          value={formData.itSystems}
          onChange={(value) => handleInputChange("itSystems", value)}
        />
        
        <FormField
          id="security"
          label="Security - % of Total Revenue"
          type="percentage"
          value={formData.security}
          onChange={(value) => handleInputChange("security", value)}
        />
        
        <FormField
          id="marketing"
          label="Info & Telecom (Amount)"
          type="currency"
          value={formData.marketing}
          onChange={(value) => handleInputChange("marketing", value)}
        />
        
        <FormField
          id="propertyTax"
          label="Property Operations & Maintenance POR"
          type="currency"
          value={formData.propertyTax}
          onChange={(value) => handleInputChange("propertyTax", value)}
        />
        
        <FormField
          id="propertyInsurance"
          label="Property Operations & Maintenance - % of Total Revenue"
          type="percentage"
          value={formData.propertyInsurance}
          onChange={(value) => handleInputChange("propertyInsurance", value)}
        />
        
        <FormField
          id="utilities"
          label="Sales & Marketing Expense - % of Total Revenue"
          type="percentage"
          value={formData.utilities}
          onChange={(value) => handleInputChange("utilities", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default UndistributedExpensesModal;
