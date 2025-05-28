
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PropertyDetailsModal from "../components/modals/PropertyDetailsModal";

const PropertyDetails = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleItemClick = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar onItemClick={handleItemClick} />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Property Details</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <PropertyDetailsModal 
              onClose={closeModal} 
              onNext={() => {}} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;
