
import { usePropertyOperations } from "./database/usePropertyOperations";
import { useOccupancyOperations } from "./database/useOccupancyOperations";
import { hasValidSupabaseCredentials } from "./database/supabaseClient";
import { toast } from "./use-toast";
import { useEffect } from "react";

export const useDatabase = () => {
  const propertyOps = usePropertyOperations();
  const occupancyOps = useOccupancyOperations();

  // Check for valid credentials on first load
  useEffect(() => {
    if (!hasValidSupabaseCredentials()) {
      toast({
        title: "Development Mode",
        description: "Running with mock Supabase credentials. Some database operations will not work.",
        variant: "destructive"
      });
    }
  }, []);

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
    loading,
    
    // Credentials status
    hasValidCredentials: hasValidSupabaseCredentials()
  };
};
