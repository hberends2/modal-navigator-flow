
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import OccupancyForecastContent from "../components/occupancy-forecast/OccupancyForecastContent";

const SubjectOccupancy = () => {
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
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Subject Occupancy</h1>
          <OccupancyForecastContent />
        </div>
      </main>
    </div>
  );
};

export default SubjectOccupancy;
