
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";
import Dropdown from "../ui/Dropdown";
import ThumbnailUpload from "../ui/ThumbnailUpload";

interface PropertyDetailsModalProps {
  onClose: () => void;
  onNext: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    propertyName: "",
    censusId: "",
    propertyAddress: "",
    city: "",
    state: "",
    numberOfRooms: "",
    propertyType: "",
    versionName: "",
    status: "",
    brand: "",
    management: "",
    zipCode: "",
  });

  const [propertyTypeOption, setPropertyTypeOption] = useState("");
  const [statusOption, setStatusOption] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Property type options
  const propertyTypeOptions = [
    "Full Service",
    "Select Service",
    "Convention",
    "Extended Stay",
    "All Inclusive"
  ];

  // Status options (keeping as placeholders)
  const statusOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
  
  // All 50 US states with 2-letter abbreviations, sorted alphabetically
  const stateOptions = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleThumbnailChange = (file: File | null) => {
    setThumbnailFile(file);
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
      "status", // Added status as a required field
    ];

    const isFormValid = requiredFields.every(
      (field) => field === "propertyType" 
        ? propertyTypeOption !== "" 
        : field === "status"
          ? statusOption !== ""
          : formData[field as keyof typeof formData] !== ""
    );

    if (!isFormValid) {
      alert("Please fill out all required fields");
      return;
    }

    console.log("Saving Property Details:", {
      ...formData,
      propertyType: propertyTypeOption,
      status: statusOption,
      thumbnail: thumbnailFile,
    });
    
    onClose();
  };

  return (
    <ModalWrapper 
      title="Property Details" 
      onClose={onClose} 
      onSave={handleSave} 
      onNext={onNext}
      showSave={false}
    >
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
          id="censusId"
          label="Census ID"
          type="integer"
          value={formData.censusId}
          onChange={(value) => handleInputChange("censusId", value)}
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
        
        <div className="flex gap-4">
          <div className="w-1/2">
            <Dropdown
              id="state"
              label="State"
              value={formData.state}
              onChange={(value) => handleInputChange("state", value)}
              options={stateOptions}
              required
            />
          </div>
          <div className="w-1/2">
            <FormField
              id="zipCode"
              label="Zip Code"
              type="integer"
              value={formData.zipCode}
              onChange={(value) => handleInputChange("zipCode", value)}
              required
            />
          </div>
        </div>
        
        <FormField
          id="numberOfRooms"
          label="Rooms / Keys"
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
          options={propertyTypeOptions}
          required
        />
        
        <Dropdown
          id="status"
          label="Status"
          value={statusOption}
          onChange={setStatusOption}
          options={statusOptions}
          required
        />

        <FormField
          id="brand"
          label="Brand"
          type="text"
          value={formData.brand}
          onChange={(value) => handleInputChange("brand", value)}
        />
        
        <FormField
          id="management"
          label="Management"
          type="text"
          value={formData.management}
          onChange={(value) => handleInputChange("management", value)}
        />
        
        <FormField
          id="versionName"
          label="Version Name"
          type="text"
          value={formData.versionName}
          onChange={(value) => handleInputChange("versionName", value)}
        />

        <ThumbnailUpload
          onFileSelect={handleThumbnailChange}
          value={thumbnailFile}
        />
      </div>
    </ModalWrapper>
  );
};

export default PropertyDetailsModal;
