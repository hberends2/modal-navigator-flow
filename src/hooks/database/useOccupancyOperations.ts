
import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useToast } from "../use-toast";

export const useOccupancyOperations = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const saveOccupancyData = async (propertyId: string, occupancyData: any) => {
    try {
      setLoading(true);
      
      // First check if data already exists for this property
      const { data: existingData, error: fetchError } = await supabase
        .from('Occupancy_Forecast')
        .select('id')
        .eq('property_id', propertyId);
        
      if (fetchError) throw fetchError;
      
      if (existingData && existingData.length > 0) {
        // Update existing occupancy data
        const { error } = await supabase
          .from('Occupancy_Forecast')
          .update({ 
            forecast_data: occupancyData,
            updated_at: new Date().toISOString() 
          })
          .eq('property_id', propertyId);
          
        if (error) throw error;
      } else {
        // Insert new occupancy data
        const { error } = await supabase
          .from('Occupancy_Forecast')
          .insert({
            property_id: propertyId,
            forecast_data: occupancyData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (error) throw error;
      }
      
      toast({
        title: "Data saved",
        description: "Occupancy forecast data has been saved"
      });
      
      return true;
    } catch (error: any) {
      console.error("Error saving occupancy data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save occupancy data",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saveOccupancyData
  };
};
