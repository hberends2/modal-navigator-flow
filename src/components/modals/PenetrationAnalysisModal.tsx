
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";
import Dropdown from "../ui/Dropdown";

interface PenetrationAnalysisModalProps {
  onClose: () => void;
  onNext: () => void;
}

const PenetrationAnalysisModal: React.FC<PenetrationAnalysisModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    compRevenuePerRoom: "",
    compOccupancy: "",
    numRooms: "",
    revenueChange: "",
    marketOccupancyPct: "",
    marketRevParGrowthPct: "",
    sampleHotelOccupancy: "",
    avgRoomRev: "",
  });

  const [compRevenueOption, setCompRevenueOption] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Penetration Analysis Data:", {
      ...formData,
      compRevenuePerRoom: compRevenueOption,
    });
    
    onClose();
  };

  return (
    <ModalWrapper title="Penetration Analysis" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown
          id="compRevenuePerRoom"
          label="Comp Revenue Per Room"
          value={compRevenueOption}
          onChange={setCompRevenueOption}
        />
        
        <FormField
          id="compOccupancy"
          label="Comp Occupancy"
          type="percentage"
          value={formData.compOccupancy}
          onChange={(value) => handleInputChange("compOccupancy", value)}
        />
        
        <FormField
          id="numRooms"
          label="Going Rate of Rooms"
          type="integer"
          value={formData.numRooms}
          onChange={(value) => handleInputChange("numRooms", value)}
        />
        
        <FormField
          id="revenueChange"
          label="Revenue Change"
          type="percentage"
          value={formData.revenueChange}
          onChange={(value) => handleInputChange("revenueChange", value)}
        />
        
        <FormField
          id="marketOccupancyPct"
          label="Market Occupancy Pct"
          type="percentage"
          value={formData.marketOccupancyPct}
          onChange={(value) => handleInputChange("marketOccupancyPct", value)}
        />
        
        <FormField
          id="marketRevParGrowthPct"
          label="Market RevPAR Growth Pct"
          type="percentage"
          value={formData.marketRevParGrowthPct}
          onChange={(value) => handleInputChange("marketRevParGrowthPct", value)}
        />
        
        <FormField
          id="sampleHotelOccupancy"
          label="Sample Hotel Occupancy"
          type="percentage"
          value={formData.sampleHotelOccupancy}
          onChange={(value) => handleInputChange("sampleHotelOccupancy", value)}
        />
        
        <FormField
          id="avgRoomRev"
          label="Ave Room Revenue"
          type="percentage"
          value={formData.avgRoomRev}
          onChange={(value) => handleInputChange("avgRoomRev", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default PenetrationAnalysisModal;
