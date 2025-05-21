
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { PlusSquare } from "lucide-react";
import PropertyFormModal from "../components/modals/PropertyFormModal";
import PropertyTable from "../components/market/PropertyTable";
import { usePropertyData } from "../hooks/usePropertyData";
import { Property } from "../types/PropertyTypes";
import { toast } from "../components/ui/use-toast";

const Market: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { properties, addProperty, updateProperty, deleteProperty } = usePropertyData();
  
  // Open modal for adding new property
  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };
  
  // Open modal for editing existing property
  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };
  
  // Handle adding or updating properties
  const handleSaveProperty = (property: Property) => {
    if (editingProperty) {
      // Update existing property
      updateProperty(property);
    } else {
      // Add new property
      addProperty(property);
    }
    setIsModalOpen(false);
  };

  const handleSidebarItemClick = (modalName: string) => {
    toast({
      title: "Navigation",
      description: `Navigating to ${modalName}`
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onItemClick={handleSidebarItemClick} />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Market Analysis</h1>
          <Button onClick={handleAddProperty} className="flex items-center gap-2">
            <PlusSquare className="h-5 w-5" />
            <span>Add Property</span>
          </Button>
        </div>

        <PropertyTable 
          properties={properties}
          onEdit={handleEditProperty}
          onDelete={deleteProperty}
        />
      </div>

      {isModalOpen && (
        <PropertyFormModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProperty}
          property={editingProperty}
        />
      )}
    </div>
  );
};

export default Market;
