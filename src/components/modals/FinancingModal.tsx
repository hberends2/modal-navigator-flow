
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";
import Dropdown from "../ui/Dropdown";

interface FinancingModalProps {
  onClose: () => void;
  onNext: () => void;
}

const FinancingModal: React.FC<FinancingModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    loanToValue: "",
    amortizationPeriod: "",
    interestRate: "",
    interestOnlyPeriod: "",
    refinanceDate: "",
    loanTerm: "",
    upfrontFee: "",
  });

  const [interestRateOption, setInterestRateOption] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Financing Data:", {
      ...formData,
      interestRate: interestRateOption,
    });
    
    onClose();
  };

  return (
    <ModalWrapper title="Financing" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="loanToValue"
          label="Loan To Value"
          type="percentage"
          value={formData.loanToValue}
          onChange={(value) => handleInputChange("loanToValue", value)}
        />
        
        <FormField
          id="amortizationPeriod"
          label="Amortization Period (Years)"
          type="integer"
          value={formData.amortizationPeriod}
          onChange={(value) => handleInputChange("amortizationPeriod", value)}
        />
        
        <Dropdown
          id="interestRate"
          label="Interest Rate"
          value={interestRateOption}
          onChange={setInterestRateOption}
        />
        
        <FormField
          id="interestOnlyPeriod"
          label="Interest Only Period (Years)"
          type="integer"
          value={formData.interestOnlyPeriod}
          onChange={(value) => handleInputChange("interestOnlyPeriod", value)}
        />
        
        <FormField
          id="refinanceDate"
          label="Refinance Date (percent/Amount)"
          type="percentage"
          value={formData.refinanceDate}
          onChange={(value) => handleInputChange("refinanceDate", value)}
        />
        
        <FormField
          id="loanTerm"
          label="Loan Term"
          type="integer"
          value={formData.loanTerm}
          onChange={(value) => handleInputChange("loanTerm", value)}
        />
        
        <FormField
          id="upfrontFee"
          label="Upfront Fee (percent/Amount)"
          type="percentage"
          value={formData.upfrontFee}
          onChange={(value) => handleInputChange("upfrontFee", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default FinancingModal;
