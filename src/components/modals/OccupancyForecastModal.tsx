
import React from "react";
import ModalWrapper from "../ui/ModalWrapper";
import { Property } from "../../types/PropertyTypes";
import { toast } from "../ui/use-toast";
import OccupancyForecastContent from "../occupancy-forecast/OccupancyForecastContent";
import { useOccupancyForecast } from "../../hooks/useOccupancyForecast";

interface OccupancyForecastModalProps {
  onClose: () => void;
  onNext: () => void;
  property?: Property | null;
}

const OccupancyForecastModal: React.FC<OccupancyForecastModalProps> = ({
  onClose,
  onNext,
  property
}) => {
  console.log("OccupancyForecastModal - Rendering");
  
  const { handleSave, loading } = useOccupancyForecast(property);
  
  const handleSaveClick = async () => {
    const success = await handleSave();
    if (success) {
      onClose();
    }
  };

  return (
    <ModalWrapper 
      title="Subject Occupancy Forecast" 
      onClose={onClose} 
      onSave={handleSaveClick}
      onNext={onNext}
      showNext={false}
      showSave={true}
      saveDisabled={loading}
      maxWidth="max-w-7xl" // Updated to a much wider max-width to fit all tables side by side
    >
      <OccupancyForecastContent property={property} />
    </ModalWrapper>
  );
};

export default OccupancyForecastModal;
