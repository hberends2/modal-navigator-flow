
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";
import Dropdown from "../ui/Dropdown";

interface PropertyDetailsModalProps {
  onClose: () => void;
  onNext: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyAddress: "",
    city: "",
    state: "",
    numberOfRooms: "",
    propertyType: "",
    keyMoney: "",
    versionName: "",
  });

  const [propertyTypeOption, setPropertyTypeOption] = useState("");
  const [keyMoneyOption, setKeyMoneyOption] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    // Check required fields
    const requiredFields = [
      "propertyName",
      "propertyAddress",
      "city",
      "state",
      "numberOfRooms",
      "propertyType",
    ];

    const isFormValid = requiredFields.every(
      (field) => field === "propertyType" 
        ? propertyTypeOption !== "" 
        : formData[field as keyof typeof formData] !== ""
    );

    if (!isFormValid) {
      alert("Please fill out all required fields");
      return;
    }

    console.log("Saving Property Details:", {
      ...formData,
      propertyType: propertyTypeOption,
      keyMoney: keyMoneyOption,
    });
    
    onClose();
  };

  return (
    <ModalWrapper title="Property Details" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="propertyName"
          label="Property Name"
          type="text"
          value={formData.propertyName}
          onChange={(value) => handleInputChange("propertyName", value)}
          required
        />
        
        <FormField
          id="propertyAddress"
          label="Property Address"
          type="text"
          value={formData.propertyAddress}
          onChange={(value) => handleInputChange("propertyAddress", value)}
          required
        />
        
        <FormField
          id="city"
          label="City"
          type="text"
          value={formData.city}
          onChange={(value) => handleInputChange("city", value)}
          required
        />
        
        <FormField
          id="state"
          label="State"
          type="text"
          value={formData.state}
          onChange={(value) => handleInputChange("state", value)}
          required
        />
        
        <FormField
          id="numberOfRooms"
          label="Number of Rooms"
          type="integer"
          value={formData.numberOfRooms}
          onChange={(value) => handleInputChange("numberOfRooms", value)}
          required
        />
        
        <Dropdown
          id="propertyType"
          label="Property Type"
          value={propertyTypeOption}
          onChange={setPropertyTypeOption}
          required
        />
        
        <Dropdown
          id="keyMoney"
          label="Key Money"
          value={keyMoneyOption}
          onChange={setKeyMoneyOption}
        />
        
        <FormField
          id="versionName"
          label="Version Name"
          type="text"
          value={formData.versionName}
          onChange={(value) => handleInputChange("versionName", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default PropertyDetailsModal;
