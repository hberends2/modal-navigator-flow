
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PropertyDetailsModal from "../components/modals/PropertyDetailsModal";

const PropertyDetails = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showPropertyModal, setShowPropertyModal] = useState(true);
  const navigate = useNavigate();

  const handleItemClick = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handlePropertyModalClose = () => {
    setShowPropertyModal(false);
    // Navigate back to home or previous page when modal is closed
    navigate('/');
  };

  const handlePropertyModalNext = () => {
    // Navigate to next logical page (Subject Occupancy)
    navigate('/subject-occupancy');
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar onItemClick={handleItemClick} />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Property Details</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Configure your property details here.</p>
          </div>
        </div>
      </main>
      
      {showPropertyModal && (
        <PropertyDetailsModal 
          onClose={handlePropertyModalClose} 
          onNext={handlePropertyModalNext} 
        />
      )}
    </div>
  );
};

export default PropertyDetails;
