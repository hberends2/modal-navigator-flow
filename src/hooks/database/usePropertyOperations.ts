
import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useToast } from "../use-toast";
import { Property } from "../../types/PropertyTypes";

export const usePropertyOperations = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const saveProperty = async (property: Property) => {
    try {
      setLoading(true);
      
      // Check if property already exists
      if (property.id) {
        // Update existing property
        const { error } = await supabase
          .from('Property_Details')
          .update({
            propName: property.name,
            propAddress: property.strCode,
            city: property.city,
            state: property.state,
            zipCode: property.zipCode,
            propType: property.class,
            roomsKeys: property.rooms,
            updated_at: new Date().toISOString()
          })
          .eq('id', property.id);
          
        if (error) throw error;
        
        toast({
          title: "Property updated",
          description: "Property details have been saved to the database"
        });
      } else {
        // Insert new property
        const { data, error } = await supabase
          .from('Property_Details')
          .insert({
            propName: property.name,
            propAddress: property.strCode,
            city: property.city,
            state: property.state,
            zipCode: property.zipCode || '',
            propType: property.class,
            roomsKeys: property.rooms,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select('id')
          .single();
          
        if (error) throw error;
        
        toast({
          title: "Property created",
          description: "New property has been added to the database"
        });
        
        return { ...property, id: data.id };
      }
      
      return property;
      
    } catch (error: any) {
      console.error("Error saving property:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save property",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('Property_Details')
        .delete()
        .eq('id', propertyId);
        
      if (error) throw error;
      
      toast({
        title: "Property deleted",
        description: "Property has been removed from the database"
      });
      
      return true;
    } catch (error: any) {
      console.error("Error deleting property:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete property",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getProperties = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('Property_Details')
        .select('*');
        
      if (error) throw error;
      
      // Transform database records to Property type
      const properties: Property[] = data.map(record => ({
        id: record.id,
        name: record.propName,
        strCode: record.propAddress,
        city: record.city,
        state: record.state,
        zipCode: record.zipCode || '',
        class: record.propType,
        rooms: record.roomsKeys,
        affDate: '',  // These fields may not be in the database schema
        openDate: '',
        chgInRms: '',
        chgInRms1: '',
        chgInRms2: '',
        chgInRms3: ''
      }));
      
      return properties;
    } catch (error: any) {
      console.error("Error fetching properties:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load properties",
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saveProperty,
    deleteProperty,
    getProperties
  };
};
