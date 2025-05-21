
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { PlusSquare } from "lucide-react";
import PropertyFormModal from "../components/modals/PropertyFormModal";
import PropertyTable from "../components/market/PropertyTable";
import { usePropertyData } from "../hooks/usePropertyData";
import { Property } from "../types/PropertyTypes";
import { toast } from "../components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

const Market: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { properties, addProperty, updateProperty, deleteProperty } = usePropertyData();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Log when this component is mounted
  useEffect(() => {
    console.log("Market component mounted or updated");
    console.log("Current route:", location.pathname);
    
    return () => {
      console.log("Market component will unmount");
    };
  }, [location.pathname]);

  // Open modal for adding new property
  const handleAddProperty = () => {
    console.log("Opening add property modal");
    setEditingProperty(null);
    setIsModalOpen(true);
  };
  
  // Open modal for editing existing property
  const handleEditProperty = (property: Property) => {
    console.log("Opening edit property modal for:", property.id);
    setEditingProperty(property);
    setIsModalOpen(true);
  };
  
  // Handle adding or updating properties
  const handleSaveProperty = (property: Property) => {
    if (editingProperty) {
      // Update existing property
      console.log("Updating property:", property.id);
      updateProperty(property);
    } else {
      // Add new property
      console.log("Adding new property");
      addProperty(property);
    }
    setIsModalOpen(false);
  };

  const handleSidebarItemClick = (modalName: string) => {
    console.log("Sidebar item clicked in Market page:", modalName);
    
    // If the modal needs to be opened on the index page, navigate there first
    if (modalName !== "marketAnalysis") {
      console.log("Navigating to Index page to open modal:", modalName);
      navigate('/', { state: { openModal: modalName } });
    } else {
      toast({
        title: "Navigation",
        description: `Already on ${modalName} page`
      });
    }
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
