
import { usePropertyOperations } from "./database/usePropertyOperations";
import { useOccupancyOperations } from "./database/useOccupancyOperations";

export const useDatabase = () => {
  const propertyOps = usePropertyOperations();
  const occupancyOps = useOccupancyOperations();

  // Combine loading states
  const loading = propertyOps.loading || occupancyOps.loading;

  return {
    // Property operations
    saveProperty: propertyOps.saveProperty,
    deleteProperty: propertyOps.deleteProperty,
    getProperties: propertyOps.getProperties,
    
    // Occupancy operations
    saveOccupancyData: occupancyOps.saveOccupancyData,
    
    // Combined loading state
    loading
  };
};
