
import React from "react";
import Sidebar from "../components/Sidebar";
import OccupancyForecastContent from "../components/occupancy-forecast/OccupancyForecastContent";
import { usePropertyData } from "../hooks/usePropertyData";

const SubjectOccupancy = () => {
  const { properties } = usePropertyData();
  // For now, use the first property or null - this could be enhanced to select a specific property
  const activeProperty = properties.length > 0 ? properties[0] : null;

  const openModal = (modalName: string) => {
    console.log("Modal functionality not implemented on this page:", modalName);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onItemClick={openModal} />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Subject Occupancy Forecast</h1>
          
          <OccupancyForecastContent property={activeProperty} />
        </div>
      </div>
    </div>
  );
};

export default SubjectOccupancy;
