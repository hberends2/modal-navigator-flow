
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface DepartmentalExpensesModalProps {
  onClose: () => void;
  onNext: () => void;
}

const DepartmentalExpensesModal: React.FC<DepartmentalExpensesModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    fabExpense: "",
    otherOperatedExpense: "",
    telecoms: "",
    administrative: "",
    sales: "",
    property: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Departmental Expenses Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Departmental Expenses" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="fabExpense"
          label="F&B Expense (POR)"
          type="currency"
          value={formData.fabExpense}
          onChange={(value) => handleInputChange("fabExpense", value)}
        />
        
        <FormField
          id="otherOperatedExpense"
          label="Other Operated Expense - % of Other Operated Revenue"
          type="percentage"
          value={formData.otherOperatedExpense}
          onChange={(value) => handleInputChange("otherOperatedExpense", value)}
        />
        
        <FormField
          id="telecoms"
          label="Telecoms - % of F&B Revenue"
          type="percentage"
          value={formData.telecoms}
          onChange={(value) => handleInputChange("telecoms", value)}
        />
        
        <FormField
          id="administrative"
          label="Administrative - % of Room Revenue"
          type="percentage"
          value={formData.administrative}
          onChange={(value) => handleInputChange("administrative", value)}
        />
        
        <FormField
          id="sales"
          label="Sales - % of Room Revenue"
          type="percentage"
          value={formData.sales}
          onChange={(value) => handleInputChange("sales", value)}
        />
        
        <FormField
          id="property"
          label="Property Ops & Maintenance (POR)"
          type="currency"
          value={formData.property}
          onChange={(value) => handleInputChange("property", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default DepartmentalExpensesModal;
