
import React, { useState, useEffect } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";
import Dropdown from "../ui/Dropdown";

interface Property {
  id: string;
  strCode: string;
  name: string;
  city: string;
  state: string;
  zipCode: string;
  class: string;
  affDate: string;
  openDate: string;
  rooms: number;
  chgInRms: string;
  chgInRms1: string;
  chgInRms2: string;
  chgInRms3: string;
}

interface PropertyFormModalProps {
  onClose: () => void;
  onSave: (property: Property) => void;
  property: Property | null;
}

const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  onClose,
  onSave,
  property
}) => {
  const isEditing = !!property;
  
  const [formData, setFormData] = useState<Omit<Property, 'id'>>({
    strCode: "",
    name: "",
    city: "",
    state: "",
    zipCode: "",
    class: "",
    affDate: "",
    openDate: "",
    rooms: 0,
    chgInRms: "",
    chgInRms1: "",
    chgInRms2: "",
    chgInRms3: ""
  });

  const [classOption, setClassOption] = useState("");
  
  useEffect(() => {
    // If we're editing, populate form with existing data
    if (property) {
      setFormData({
        strCode: property.strCode,
        name: property.name,
        city: property.city,
        state: property.state,
        zipCode: property.zipCode,
        class: property.class,
        affDate: property.affDate,
        openDate: property.openDate,
        rooms: property.rooms,
        chgInRms: property.chgInRms,
        chgInRms1: property.chgInRms1,
        chgInRms2: property.chgInRms2,
        chgInRms3: property.chgInRms3
      });
      setClassOption(property.class);
    }
  }, [property]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ["strCode", "name", "city", "state", "zipCode", "class", "rooms"];
    const isFormValid = requiredFields.every(
      field => field === "class" 
        ? classOption !== ""
        : formData[field as keyof typeof formData] !== ""
    );

    if (!isFormValid) {
      alert("Please fill out all required fields");
      return;
    }

    onSave({
      id: property?.id || "",
      ...formData,
      class: classOption,
      rooms: Number(formData.rooms)
    });
  };

  return (
    <ModalWrapper 
      title={isEditing ? "Edit Property" : "Add Property"} 
      onClose={onClose} 
      onSave={handleSave}
      onNext={() => {}}
      showNext={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="strCode"
          label="STR Code"
          type="text"
          value={formData.strCode}
          onChange={(value) => handleInputChange("strCode", value)}
          required
        />
        
        <FormField
          id="name"
          label="Name of Establishment"
          type="text"
          value={formData.name}
          onChange={(value) => handleInputChange("name", value)}
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
          id="zipCode"
          label="Zip Code"
          type="text"
          value={formData.zipCode}
          onChange={(value) => handleInputChange("zipCode", value)}
          required
        />
        
        <Dropdown
          id="class"
          label="Class"
          value={classOption}
          onChange={setClassOption}
          required
        />
        
        <FormField
          id="affDate"
          label="Aff Date"
          type="text"
          value={formData.affDate}
          onChange={(value) => handleInputChange("affDate", value)}
        />
        
        <FormField
          id="openDate"
          label="Open Date"
          type="text"
          value={formData.openDate}
          onChange={(value) => handleInputChange("openDate", value)}
        />
        
        <FormField
          id="rooms"
          label="Rooms"
          type="integer"
          value={formData.rooms.toString()}
          onChange={(value) => handleInputChange("rooms", parseInt(value) || 0)}
          required
        />
        
        <FormField
          id="chgInRms"
          label="Chg in Rms"
          type="text"
          value={formData.chgInRms}
          onChange={(value) => handleInputChange("chgInRms", value)}
        />
        
        <FormField
          id="chgInRms1"
          label="Chg in Rms 1"
          type="text"
          value={formData.chgInRms1}
          onChange={(value) => handleInputChange("chgInRms1", value)}
        />
        
        <FormField
          id="chgInRms2"
          label="Chg in Rms 2"
          type="text"
          value={formData.chgInRms2}
          onChange={(value) => handleInputChange("chgInRms2", value)}
        />
        
        <FormField
          id="chgInRms3"
          label="Chg in Rms 3"
          type="text"
          value={formData.chgInRms3}
          onChange={(value) => handleInputChange("chgInRms3", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default PropertyFormModal;
