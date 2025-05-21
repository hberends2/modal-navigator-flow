
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Property } from "../types/PropertyTypes";
import { initialProperties } from "../data/propertyData";

export const usePropertyData = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const { toast } = useToast();

  const addProperty = (property: Omit<Property, "id">) => {
    const newProperty = { ...property, id: Date.now().toString() };
    setProperties([...properties, newProperty]);
    return newProperty;
  };

  const updateProperty = (property: Property) => {
    setProperties(properties.map(p => p.id === property.id ? property : p));
    return property;
  };

  const deleteProperty = (propertyId: string) => {
    setProperties(properties.filter(property => property.id !== propertyId));
    toast({
      title: "Property deleted",
      description: "The property has been removed from the list.",
    });
  };

  return {
    properties,
    addProperty,
    updateProperty,
    deleteProperty
  };
};
