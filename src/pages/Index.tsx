import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import CategorySelectionModal from "../components/modals/CategorySelectionModal";
import PropertyFormModal from "../components/modals/PropertyFormModal";
import PropertyDetailsModal from "../components/modals/PropertyDetailsModal";
import OccupancyForecastModal from "../components/modals/OccupancyForecastModal";
import OperatingRevenueModal from "../components/modals/OperatingRevenueModal";
import DepartmentalExpensesModal from "../components/modals/DepartmentalExpensesModal";
import UndistributedExpensesModal from "../components/modals/UndistributedExpensesModal";
import UndistributedExpensesSecondModal from "../components/modals/UndistributedExpensesSecondModal";
import NonOperatingExpensesModal from "../components/modals/NonOperatingExpensesModal";
import FFEReserveModal from "../components/modals/FFEReserveModal";
import CapitalExpenseModal from "../components/modals/CapitalExpenseModal";

const Index = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleItemClick = (modalName: string) => {
    console.log("Index - handleItemClick called with:", modalName);
    
    if (modalName === "departmentSelection") {
      setShowCategorySelection(true);
      return;
    }
    
    setActiveModal(modalName);
    setActiveSection(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveSection("");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onItemClick={handleItemClick} activeSection={activeSection} />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome to InnVestAI</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your comprehensive hotel investment analysis platform
            </p>
            
            {/* Add your main content here */}
          </div>
        </main>

        {/* Modals */}
        <CategorySelectionModal 
          open={showCategorySelection}
          onClose={() => setShowCategorySelection(false)}
          onSave={() => setShowCategorySelection(false)}
        />
        
        <PropertyFormModal 
          open={activeModal === "propertyDetails"}
          onClose={closeModal}
          onSave={() => {}}
          property={null}
        />

        <PropertyDetailsModal 
          open={activeModal === "propertyDetailsModal"}
          onClose={closeModal}
          onNext={() => {}}
        />

        <OccupancyForecastModal 
          open={activeModal === "occupancyForecast"}
          onClose={closeModal}
          onNext={() => {}}
        />

        <OperatingRevenueModal 
          open={activeModal === "operatingRevenue"}
          onClose={closeModal}
          onNext={() => {}}
        />

        <DepartmentalExpensesModal 
          open={activeModal === "departmentalExpenses"}
          onClose={closeModal}
          onNext={() => {}}
        />

        <UndistributedExpensesModal 
          open={activeModal === "undistributedExpenses"}
          onClose={closeModal}
          onNext={() => {}}
        />

        <UndistributedExpensesSecondModal 
          open={activeModal === "undistributedExpensesSecond"}
          onClose={closeModal}
          onNext={() => {}}
        />

        <NonOperatingExpensesModal 
          open={activeModal === "nonOperatingExpenses"}
          onClose={closeModal}
          onNext={() => {}}
        />

        <FFEReserveModal 
          open={activeModal === "ffeReserve"}
          onClose={closeModal}
          onNext={() => {}}
        />

        <CapitalExpenseModal 
          open={activeModal === "capitalExpense"}
          onClose={closeModal}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
