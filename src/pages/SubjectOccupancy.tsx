
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import OccupancyReportContent from "../components/occupancy-forecast/OccupancyReportContent";

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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Occupancy</h1>
          <OccupancyReportContent />
        </div>
      </main>
    </div>
  );
};

export default SubjectOccupancy;
