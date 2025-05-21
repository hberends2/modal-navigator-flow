
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import PropertyDetailsModal from "../components/modals/PropertyDetailsModal";
import AcquisitionModal from "../components/modals/AcquisitionModal";
import FinancingModal from "../components/modals/FinancingModal";
import DispositionModal from "../components/modals/DispositionModal";
import CapsModal from "../components/modals/CapsModal";
import InflationAssumptionsModal from "../components/modals/InflationAssumptionsModal";
import PenetrationAnalysisModal from "../components/modals/PenetrationAnalysisModal";
import OccupancyForecastModal from "../components/modals/OccupancyForecastModal";
import OperatingRevenueModal from "../components/modals/OperatingRevenueModal";
import DepartmentalExpensesModal from "../components/modals/DepartmentalExpensesModal";
import ManagementAndFranchiseFeesModal from "../components/modals/ManagementAndFranchiseFeesModal";
import UndistributedExpensesModal from "../components/modals/UndistributedExpensesModal";
import UndistributedExpensesSecondModal from "../components/modals/UndistributedExpensesSecondModal";
import NonOperatingExpensesModal from "../components/modals/NonOperatingExpensesModal";
import FFEReserveModal from "../components/modals/FFEReserveModal";
import { useLocation } from "react-router-dom";

const Index = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const location = useLocation();

  // Add debug logging for component lifecycle and route state
  useEffect(() => {
    console.log("Index component mounted or updated");
    console.log("Current route:", location.pathname);
    console.log("Active modal:", activeModal);
    console.log("Location state:", location.state);

    // Check if we have a modal to open from navigation state
    if (location.state && location.state.openModal && activeModal === null) {
      console.log("Opening modal from navigation state:", location.state.openModal);
      setActiveModal(location.state.openModal);
      
      // Clear the location state to prevent reopening on further updates
      window.history.replaceState({}, document.title);
    } else if (location.pathname === "/" && activeModal === null) {
      console.log("Index page loaded without active modal");
    }
    
    return () => {
      console.log("Index component will unmount");
    };
  }, [location, activeModal]);

  const openModal = (modalName: string) => {
    console.log("Opening modal:", modalName);
    setActiveModal(modalName);
  };

  const closeModal = () => {
    console.log("Closing modal, was:", activeModal);
    setActiveModal(null);
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
      "subjectOccupancy",
      "penetrationAnalysis", 
      "operatingRevenue", 
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
      const nextModal = modalOrder[currentIndex + 1];
      console.log("Next modal will be:", nextModal);
      setActiveModal(nextModal);
    } else {
      // If we're at the last modal, we can close it or loop back
      console.log("Reached end of modal sequence, closing");
      setActiveModal(null);
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
      {activeModal === "subjectOccupancy" && <OccupancyForecastModal onClose={closeModal} onNext={() => handleNext("subjectOccupancy")} />}
      {activeModal === "penetrationAnalysis" && <PenetrationAnalysisModal onClose={closeModal} onNext={() => handleNext("penetrationAnalysis")} />}
      {activeModal === "operatingRevenue" && <OperatingRevenueModal onClose={closeModal} onNext={() => handleNext("operatingRevenue")} />}
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
