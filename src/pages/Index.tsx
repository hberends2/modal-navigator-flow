
import React, { useState } from "react";
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

const Index = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleNext = (currentModal: string) => {
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
    if (currentIndex < modalOrder.length - 1) {
      setActiveModal(modalOrder[currentIndex + 1]);
    } else {
      // If we're at the last modal, we can close it or loop back
      setActiveModal(null);
    }
  };

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
