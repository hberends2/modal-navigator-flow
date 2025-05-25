
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { ArrowLeft } from "lucide-react";

const Revenue = () => {
  const navigate = useNavigate();
  
  // State for growth rate settings
  const [revparGrowthType, setRevparGrowthType] = useState<string>("flat");
  const [flatRevparGrowth, setFlatRevparGrowth] = useState<string>("3.00");
  const [yearlyRevparGrowth, setYearlyRevparGrowth] = useState<Record<number, string>>({
    2025: "3.00",
    2026: "3.00", 
    2027: "3.00",
    2028: "3.00",
    2029: "3.00"
  });
  
  // State for occupancy forecast
  const [occupancyForecast, setOccupancyForecast] = useState<Record<number, string>>({
    2025: "75.0",
    2026: "77.0",
    2027: "78.0", 
    2028: "79.0",
    2029: "80.0"
  });

  // Constants
  const roomsKeys = 108;
  const forecastYears = [2025, 2026, 2027, 2028, 2029];
  const historicalYears = [2021, 2022, 2023, 2024];
  
  // Historical data (from mockup)
  const historicalData = {
    roomsRevenue: {
      2021: 8765432,
      2022: 9234567,
      2023: 9876543,
      2024: 10234567
    },
    revpar: {
      2021: 222.15,
      2022: 234.11,
      2023: 250.42,
      2024: 259.53
    },
    occupancy: {
      2021: 72.5,
      2022: 74.2,
      2023: 76.8,
      2024: 78.1
    }
  };

  // Calculations
  const getAvailableRooms = (year: number) => {
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    return roomsKeys * (isLeapYear ? 366 : 365);
  };

  const getForecastRevpar = (year: number) => {
    const yearIndex = forecastYears.indexOf(year);
    if (yearIndex === 0) {
      // First forecast year - base on 2024 data
      const baseRevpar = historicalData.revpar[2024];
      const growthRate = revparGrowthType === "flat" 
        ? parseFloat(flatRevparGrowth) || 0
        : parseFloat(yearlyRevparGrowth[year]) || 0;
      return baseRevpar * (1 + growthRate / 100);
    } else {
      // Subsequent years - base on previous forecast year
      const prevYear = forecastYears[yearIndex - 1];
      const prevRevpar = getForecastRevpar(prevYear);
      const growthRate = revparGrowthType === "flat"
        ? parseFloat(flatRevparGrowth) || 0
        : parseFloat(yearlyRevparGrowth[year]) || 0;
      return prevRevpar * (1 + growthRate / 100);
    }
  };

  const getForecastRoomsRevenue = (year: number) => {
    const revpar = getForecastRevpar(year);
    const availableRooms = getAvailableRooms(year);
    return revpar * availableRooms;
  };

  const handleYearlyRevparChange = (year: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.-]/g, "");
    setYearlyRevparGrowth(prev => ({
      ...prev,
      [year]: sanitizedValue
    }));
  };

  const handleOccupancyChange = (year: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    setOccupancyForecast(prev => ({
      ...prev,
      [year]: sanitizedValue
    }));
  };

  const handleSave = () => {
    console.log("Saving revenue data:", {
      revparGrowthType,
      flatRevparGrowth,
      yearlyRevparGrowth,
      occupancyForecast
    });
    // TODO: Implement save functionality
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number, decimals: number = 1) => {
    return `${value.toFixed(decimals)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Analysis</h1>
        </div>

        {/* Revenue Table */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48">Metric</TableHead>
                  <TableHead className="text-center bg-blue-50">2021</TableHead>
                  <TableHead className="text-center bg-blue-50">2022</TableHead>
                  <TableHead className="text-center bg-blue-50">2023</TableHead>
                  <TableHead className="text-center bg-blue-50">2024</TableHead>
                  <TableHead className="text-center bg-green-50">2025</TableHead>
                  <TableHead className="text-center bg-green-50">2026</TableHead>
                  <TableHead className="text-center bg-green-50">2027</TableHead>
                  <TableHead className="text-center bg-green-50">2028</TableHead>
                  <TableHead className="text-center bg-green-50">2029</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Rooms/Keys */}
                <TableRow>
                  <TableCell className="font-medium">Rooms/Keys</TableCell>
                  {[...historicalYears, ...forecastYears].map(year => (
                    <TableCell key={year} className="text-center">{roomsKeys}</TableCell>
                  ))}
                </TableRow>

                {/* Available Rooms */}
                <TableRow>
                  <TableCell className="font-medium">Available Rooms</TableCell>
                  {[...historicalYears, ...forecastYears].map(year => (
                    <TableCell key={year} className="text-center">
                      {getAvailableRooms(year).toLocaleString()}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Rooms Revenue */}
                <TableRow>
                  <TableCell className="font-medium">Rooms Revenue</TableCell>
                  {historicalYears.map(year => (
                    <TableCell key={year} className="text-center">
                      {formatCurrency(historicalData.roomsRevenue[year])}
                    </TableCell>
                  ))}
                  {forecastYears.map(year => (
                    <TableCell key={year} className="text-center">
                      {formatCurrency(getForecastRoomsRevenue(year))}
                    </TableCell>
                  ))}
                </TableRow>

                {/* RevPAR */}
                <TableRow>
                  <TableCell className="font-medium">RevPAR</TableCell>
                  {historicalYears.map(year => (
                    <TableCell key={year} className="text-center">
                      ${historicalData.revpar[year].toFixed(2)}
                    </TableCell>
                  ))}
                  {forecastYears.map(year => (
                    <TableCell key={year} className="text-center">
                      ${getForecastRevpar(year).toFixed(2)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* RevPAR YoY Growth */}
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span>RevPAR YoY</span>
                      <Select value={revparGrowthType} onValueChange={setRevparGrowthType}>
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flat">Flat Growth</SelectItem>
                          <SelectItem value="yearly">Yearly Growth</SelectItem>
                        </SelectContent>
                      </Select>
                      {revparGrowthType === "flat" && (
                        <div className="relative w-20">
                          <Input
                            type="text"
                            value={flatRevparGrowth}
                            onChange={(e) => setFlatRevparGrowth(e.target.value.replace(/[^0-9.-]/g, ""))}
                            className="pr-6 text-center h-8"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  {historicalYears.map(year => (
                    <TableCell key={year} className="text-center text-gray-400">-</TableCell>
                  ))}
                  {forecastYears.map(year => (
                    <TableCell key={year} className="text-center">
                      {revparGrowthType === "yearly" ? (
                        <div className="relative w-16 mx-auto">
                          <Input
                            type="text"
                            value={yearlyRevparGrowth[year] || ""}
                            onChange={(e) => handleYearlyRevparChange(year, e.target.value)}
                            className="pr-6 text-center h-8"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
                        </div>
                      ) : (
                        <span className="text-gray-600">{flatRevparGrowth}%</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Occupancy */}
                <TableRow>
                  <TableCell className="font-medium">Occupancy</TableCell>
                  {historicalYears.map(year => (
                    <TableCell key={year} className="text-center">
                      {formatPercent(historicalData.occupancy[year])}
                    </TableCell>
                  ))}
                  {forecastYears.map(year => (
                    <TableCell key={year} className="text-center">
                      <div className="relative w-16 mx-auto">
                        <Input
                          type="text"
                          value={occupancyForecast[year] || ""}
                          onChange={(e) => handleOccupancyChange(year, e.target.value)}
                          className="pr-6 text-center h-8"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="px-8">
            Save Revenue Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
