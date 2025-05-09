
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface ManagementAndFranchiseFeesModalProps {
  onClose: () => void;
  onNext: () => void;
}

const ManagementAndFranchiseFeesModal: React.FC<ManagementAndFranchiseFeesModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    basicFee: "",
    franchiseFee: "",
    marketingFee: "",
    incentiveFee: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Management & Franchise Fees Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Management & Franchise Fees" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="basicFee"
          label="Basic Fee - % of Total Revenue"
          type="percentage"
          value={formData.basicFee}
          onChange={(value) => handleInputChange("basicFee", value)}
        />
        
        <FormField
          id="franchiseFee"
          label="Franchise Fees - % of F&B Revenue"
          type="percentage"
          value={formData.franchiseFee}
          onChange={(value) => handleInputChange("franchiseFee", value)}
        />
        
        <FormField
          id="marketingFee"
          label="Marketing Fee - % of Room Revenue"
          type="percentage"
          value={formData.marketingFee}
          onChange={(value) => handleInputChange("marketingFee", value)}
        />
        
        <FormField
          id="incentiveFee"
          label="Incentive Management Fee (Amount)"
          type="currency"
          value={formData.incentiveFee}
          onChange={(value) => handleInputChange("incentiveFee", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default ManagementAndFranchiseFeesModal;
