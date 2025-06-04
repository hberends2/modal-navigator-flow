import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import PropertyDetailsModal from "../components/modals/PropertyDetailsModal";
import AcquisitionModal from "../components/modals/AcquisitionModal";
import FinancingModal from "../components/modals/FinancingModal";
import DispositionModal from "../components/modals/DispositionModal";
import CapsModal from "../components/modals/CapsModal";
import InflationAssumptionsModal from "../components/modals/InflationAssumptionsModal";
import PenetrationAnalysisModal from "../components/modals/PenetrationAnalysisModal";
import OperatingRevenueModal from "../components/modals/OperatingRevenueModal";
import DepartmentalExpensesModal from "../components/modals/DepartmentalExpensesModal";
import ManagementAndFranchiseFeesModal from "../components/modals/ManagementAndFranchiseFeesModal";
import UndistributedExpensesModal from "../components/modals/UndistributedExpensesModal";
import UndistributedExpensesSecondModal from "../components/modals/UndistributedExpensesSecondModal";
import NonOperatingExpensesModal from "../components/modals/NonOperatingExpensesModal";
import FFEReserveModal from "../components/modals/FFEReserveModal";
import GrowthAssumptionsModal from "../components/modals/GrowthAssumptionsModal";
import { usePropertyData } from "../hooks/usePropertyData";
import { Property } from "../types/PropertyTypes";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const { properties } = usePropertyData();
  const location = useLocation();
  const navigate = useNavigate();
  // Flag to track if we've already processed the location state
  const processedLocationState = useRef(false);

  // Add debug logging for component lifecycle and route state
  useEffect(() => {
    console.log("Index component mounted or updated");
    console.log("Current route:", location.pathname);
    console.log("Active modal:", activeModal);
    console.log("Location state:", location.state);
    console.log("Processed location state:", processedLocationState.current);

    // Only process location state if we haven't already and we have state to process
    if (location.state && location.state.openModal && !processedLocationState.current) {
      console.log("Opening modal from navigation state:", location.state.openModal);
      
      // Handle special case for subjectOccupancy - navigate to dedicated page
      if (location.state.openModal === "subjectOccupancy") {
        console.log("Redirecting to subject occupancy page");
        const navigationState: any = { tab: "forecast" };
        
        // Include property ID if available
        if (location.state.propertyId) {
          navigationState.propertyId = location.state.propertyId;
        }
        
        // Navigate to the subject occupancy page
        navigate('/subject-occupancy', { state: navigationState });
        return;
      }
      
      // For other modals, open them as before
      setActiveModal(location.state.openModal);
      
      // Check if a property ID was passed
      if (location.state.propertyId && properties.length > 0) {
        const property = properties.find(p => p.id === location.state.propertyId) || null;
        setActiveProperty(property);
        console.log("Setting active property:", property);
      }
      
      // Mark that we've processed this state
      processedLocationState.current = true;
      
      // Clear location state to prevent reopening on updates
      window.history.replaceState({}, document.title);
    } else if (location.pathname === "/" && activeModal === null && !processedLocationState.current) {
      console.log("Index page loaded without active modal");
    }
    
    return () => {
      console.log("Index component will unmount");
    };
  }, [location, activeModal, properties, navigate]);

  // Reset the processed flag when location actually changes
  useEffect(() => {
    // Only reset when we get a genuine new navigation with state
    if (location.state && location.state.timestamp) {
      console.log("New navigation detected, resetting processed flag");
      processedLocationState.current = false;
    }
  }, [location.key]);

  const openModal = (modalName: string, propertyId?: string) => {
    console.log("Opening modal:", modalName);
    
    // If the modal is subject occupancy, redirect to the dedicated page
    if (modalName === "subjectOccupancy") {
      console.log("Redirecting to subject occupancy page");
      const navigationState: any = { tab: "forecast" };
      
      // Include property ID if available
      if (propertyId) {
        navigationState.propertyId = propertyId;
      }
      
      navigate('/subject-occupancy', { state: navigationState });
      return;
    }
    
    // Clear any existing navigation state before setting new modal
    window.history.replaceState({}, document.title);
    
    // If a property ID is provided, set the active property
    if (propertyId && properties.length > 0) {
      const property = properties.find(p => p.id === propertyId) || null;
      setActiveProperty(property);
    }
    
    setActiveModal(modalName);
  };

  const closeModal = () => {
    console.log("Closing modal, was:", activeModal);
    
    // Clear navigation state before closing modal
    window.history.replaceState({}, document.title);
    
    setActiveModal(null);
    setActiveProperty(null);
  };

  const handleNext = (currentModal: string) => {
    console.log("Handle next from modal:", currentModal);
    // Logic to determine the next modal to open
    const modalOrder = [
      "propertyDetails", 
      "acquisition", 
      "financing", 
      "disposition", 
      "caps", 
      "inflationAssumptions",
      // "subjectOccupancy" removed from modal order
      "penetrationAnalysis", 
      "operatingRevenue",
      "growthAssumptions",
      "departmentalExpenses", 
      "managementAndFranchiseFees", 
      "undistributedExpenses", 
      "undistributedExpensesSecond", 
      "nonOperatingExpenses", 
      "ffeReserve"
    ];
    
    const currentIndex = modalOrder.indexOf(currentModal);
    console.log("Current index in modal order:", currentIndex);
    
    if (currentIndex < modalOrder.length - 1) {
      // Clear navigation state before changing modal
      window.history.replaceState({}, document.title);
      
      const nextModal = modalOrder[currentIndex + 1];
      console.log("Next modal will be:", nextModal);
      setActiveModal(nextModal);
    } else {
      // Clear navigation state before closing modal
      window.history.replaceState({}, document.title);
      
      console.log("Reached end of modal sequence, closing");
      setActiveModal(null);
      setActiveProperty(null);
    }
  };

  // Debug render
  console.log("Rendering Index with activeModal:", activeModal);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onItemClick={openModal} />
      
      <div className="flex-1 p-6 overflow-auto">
        {activeModal === null && (
          <div className="text-center mt-20">
            <h1 className="text-3xl font-bold text-gray-700">InnVestAI Dashboard</h1>
            <p className="text-lg text-gray-500 mt-4">Select an option from the sidebar to get started</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {activeModal === "propertyDetails" && <PropertyDetailsModal onClose={closeModal} onNext={() => handleNext("propertyDetails")} />}
      {activeModal === "acquisition" && <AcquisitionModal onClose={closeModal} onNext={() => handleNext("acquisition")} />}
      {activeModal === "financing" && <FinancingModal onClose={closeModal} onNext={() => handleNext("financing")} />}
      {activeModal === "disposition" && <DispositionModal onClose={closeModal} onNext={() => handleNext("disposition")} />}
      {activeModal === "caps" && <CapsModal onClose={closeModal} onNext={() => handleNext("caps")} />}
      {activeModal === "inflationAssumptions" && <InflationAssumptionsModal onClose={closeModal} onNext={() => handleNext("inflationAssumptions")} />}
      {activeModal === "penetrationAnalysis" && <PenetrationAnalysisModal onClose={closeModal} onNext={() => handleNext("penetrationAnalysis")} />}
      {activeModal === "operatingRevenue" && <OperatingRevenueModal onClose={closeModal} onNext={() => handleNext("operatingRevenue")} />}
      {activeModal === "growthAssumptions" && <GrowthAssumptionsModal onClose={closeModal} onNext={() => handleNext("growthAssumptions")} />}
      {activeModal === "departmentalExpenses" && <DepartmentalExpensesModal onClose={closeModal} onNext={() => handleNext("departmentalExpenses")} />}
      {activeModal === "managementAndFranchiseFees" && <ManagementAndFranchiseFeesModal onClose={closeModal} onNext={() => handleNext("managementAndFranchiseFees")} />}
      {activeModal === "undistributedExpenses" && <UndistributedExpensesModal onClose={closeModal} onNext={() => handleNext("undistributedExpenses")} />}
      {activeModal === "undistributedExpensesSecond" && <UndistributedExpensesSecondModal onClose={closeModal} onNext={() => handleNext("undistributedExpensesSecond")} />}
      {activeModal === "nonOperatingExpenses" && <NonOperatingExpensesModal onClose={closeModal} onNext={() => handleNext("nonOperatingExpenses")} />}
      {activeModal === "ffeReserve" && <FFEReserveModal onClose={closeModal} onNext={() => handleNext("ffeReserve")} />}
    </div>
  );
};

export default Index;