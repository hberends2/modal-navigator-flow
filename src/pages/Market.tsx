
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { PlusSquare, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import PropertyFormModal from "../components/modals/PropertyFormModal";

// Define property data type
interface Property {
  id: string;
  strCode: string;
  name: string;
  city: string;
  state: string;
  zipCode: string;
  class: string;
  affDate: string;
  openDate: string;
  rooms: number;
  chgInRms: string;
  chgInRms1: string;
  chgInRms2: string;
  chgInRms3: string;
}

const Market: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      strCode: "2983",
      name: "Holiday Inn Express North Palm Beach Oceanview",
      city: "Juno Beach",
      state: "FL",
      zipCode: "33408",
      class: "Upper Midscale Class",
      affDate: "Jan 1994",
      openDate: "Jun 1981",
      rooms: 108,
      chgInRms: "",
      chgInRms1: "",
      chgInRms2: "",
      chgInRms3: "",
    },
    {
      id: "2",
      strCode: "24667",
      name: "Hampton Inn Jupiter Juno Beach",
      city: "Juno Beach",
      state: "FL",
      zipCode: "33408",
      class: "Upper Midscale Class",
      affDate: "Feb 1995",
      openDate: "Feb 1995",
      rooms: 89,
      chgInRms: "",
      chgInRms1: "",
      chgInRms2: "",
      chgInRms3: "",
    },
    {
      id: "3",
      strCode: "58387",
      name: "Hilton Garden Inn Palm Beach Gardens",
      city: "Palm Beach Gardens",
      state: "FL",
      zipCode: "33410",
      class: "Upscale Class",
      affDate: "Dec 2020",
      openDate: "Dec 2008",
      rooms: 180,
      chgInRms: "Y",
      chgInRms1: "+128 (Jun'14)",
      chgInRms2: "",
      chgInRms3: "",
    },
    {
      id: "4",
      strCode: "62976",
      name: "Courtyard Palm Beach Jupiter",
      city: "Jupiter",
      state: "FL",
      zipCode: "33458",
      class: "Upscale Class",
      affDate: "Jun 2014",
      openDate: "Jun 2014",
      rooms: 128,
      chgInRms: "",
      chgInRms1: "",
      chgInRms2: "",
      chgInRms3: "",
    },
  ]);

  // Calculate total rooms
  const totalRooms = properties.reduce((sum, property) => sum + property.rooms, 0);
  
  // Open modal for adding new property
  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };
  
  // Open modal for editing existing property
  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };
  
  // Handle adding or updating properties
  const handleSaveProperty = (property: Property) => {
    if (editingProperty) {
      // Update existing property
      setProperties(properties.map(p => p.id === property.id ? property : p));
    } else {
      // Add new property
      setProperties([...properties, { ...property, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onItemClick={() => {}} />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Market Analysis</h1>
          <Button onClick={handleAddProperty} className="flex items-center gap-2">
            <PlusSquare className="h-5 w-5" />
            <span>Add Property</span>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Market Property Listing</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">STR Code</TableHead>
                  <TableHead className="min-w-[200px]">Name of Establishment</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Zip Code</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Aff Date</TableHead>
                  <TableHead>Open Date</TableHead>
                  <TableHead className="text-right">Rooms</TableHead>
                  <TableHead>Chg in Rms</TableHead>
                  <TableHead>Chg in Rms 1</TableHead>
                  <TableHead>Chg in Rms 2</TableHead>
                  <TableHead>Chg in Rms 3</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>{property.strCode}</TableCell>
                    <TableCell>{property.name}</TableCell>
                    <TableCell>{property.city}</TableCell>
                    <TableCell>{property.state}</TableCell>
                    <TableCell>{property.zipCode}</TableCell>
                    <TableCell>{property.class}</TableCell>
                    <TableCell>{property.affDate}</TableCell>
                    <TableCell>{property.openDate}</TableCell>
                    <TableCell className="text-right">{property.rooms}</TableCell>
                    <TableCell>{property.chgInRms}</TableCell>
                    <TableCell>{property.chgInRms1}</TableCell>
                    <TableCell>{property.chgInRms2}</TableCell>
                    <TableCell>{property.chgInRms3}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProperty(property)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-medium">
                  <TableCell colSpan={8} className="text-right">Total Properties: {properties.length}</TableCell>
                  <TableCell className="text-right">{totalRooms}</TableCell>
                  <TableCell colSpan={5}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <PropertyFormModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProperty}
          property={editingProperty}
        />
      )}
    </div>
  );
};

export default Market;
