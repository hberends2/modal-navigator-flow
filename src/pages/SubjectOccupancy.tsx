
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import OccupancyForecastContent from "../components/occupancy-forecast/OccupancyForecastContent";
import { useRevenueData } from "../contexts/RevenueDataContext";
import { getLocalData, STORAGE_KEYS } from "../hooks/database/supabaseClient";

const SubjectOccupancy = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { setRevenueData } = useRevenueData();

  useEffect(() => {
    // Load data from database when component mounts
    const loadDataFromDatabase = () => {
      const allOccupancyData = getLocalData<Record<string, any>>(STORAGE_KEYS.OCCUPANCY_DATA, {});
      const savedData = allOccupancyData['default-property'];
      
      if (savedData) {
        console.log('Loading revenue data from database:', savedData);
        
        // Create getAvailableRooms function
        const getAvailableRooms = (year: number) => {
          const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
          return savedData.roomsKeys * (isLeapYear ? 366 : 365);
        };
        
        // Set the data in context
        setRevenueData({
          roomsKeys: savedData.roomsKeys,
          historicalYears: savedData.historicalYears,
          forecastYears: savedData.forecastYears,
          historicalData: savedData.historicalData,
          occupancyForecast: savedData.occupancyForecast,
          getAvailableRooms
        });
      } else {
        console.log('No saved revenue data found in database');
      }
    };

    loadDataFromDatabase();
  }, [setRevenueData]);

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
