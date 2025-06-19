
import { useState, useEffect } from 'react';
import { REVENUE_CONFIG } from '../config/revenueConfig';
import { RevenueCalculationState } from '../types/revenue';
import { useInputHandlers } from './useInputHandlers';
import { useRevenueOccupancyData } from './useRevenueOccupancyData';

const getInitialForecastData = (defaultValue: string = "0") => 
  REVENUE_CONFIG.FORECAST_YEARS.reduce((acc, year) => ({ ...acc, [year]: defaultValue }), {});

export const useRevenueCalculations = (): RevenueCalculationState => {
  const { data: occupancyData, updateSubjectOccupancy, updateSubjectOccupancyYoY } = useRevenueOccupancyData();
  const [adrGrowthType, setAdrGrowthType] = useState<string>("flat");
  const [occupancyForecastMethod, setOccupancyForecastMethod] = useState<string>("Occupancy");
  const [expenseForecastMethod, setExpenseForecastMethod] = useState<string>("POR");

  const flatAdr = useInputHandlers({ [0]: REVENUE_CONFIG.DEFAULT_GROWTH_RATES.ADR });
  const yearlyAdr = useInputHandlers(getInitialForecastData(REVENUE_CONFIG.DEFAULT_GROWTH_RATES.ADR));
  
  // Initialize occupancy from shared data
  const initialOccupancyForecast = REVENUE_CONFIG.FORECAST_YEARS.reduce((acc, year) => ({
    ...acc,
    [year]: (occupancyData.subjectOccupancy[year] || 0).toString()
  }), {});
  
  const initialOccupancyYoY = REVENUE_CONFIG.FORECAST_YEARS.reduce((acc, year) => ({
    ...acc,
    [year]: (occupancyData.subjectOccupancyYoY[year] || 0).toString()
  }), {});

  const occupancyForecast = useInputHandlers(initialOccupancyForecast);
  const occupancyYoY = useInputHandlers(initialOccupancyYoY);
  
  const fbPerRoom = useInputHandlers(getInitialForecastData());
  const resortFeePerRoom = useInputHandlers(getInitialForecastData());
  const otherOperatedPerRoom = useInputHandlers(getInitialForecastData());
  const miscellaneousPerRoom = useInputHandlers(getInitialForecastData());
  const allocatedPerRoom = useInputHandlers(getInitialForecastData());

  // Expense inputs
  const roomsExpenseInput = useInputHandlers(getInitialForecastData());
  const fbExpenseInput = useInputHandlers(getInitialForecastData());
  const resortFeeExpenseInput = useInputHandlers(getInitialForecastData());
  const otherOperatedExpenseInput = useInputHandlers(getInitialForecastData());
  const miscellaneousExpenseInput = useInputHandlers(getInitialForecastData());
  const allocatedExpenseInput = useInputHandlers(getInitialForecastData());

  // New expense inputs for the five additional sections
  const propertyOperationsExpenseInput = useInputHandlers(getInitialForecastData());
  const administrativeGeneralExpenseInput = useInputHandlers(getInitialForecastData());
  const infoTechServicesExpenseInput = useInputHandlers(getInitialForecastData());
  const salesMarketingExpenseInput = useInputHandlers(getInitialForecastData());
  const utilitiesExpenseInput = useInputHandlers(getInitialForecastData());

  // New individual non-operating expense inputs (all % of Revenue)
  const managementFeesExpenseInput = useInputHandlers(getInitialForecastData("0.0"));
  const realEstateTaxesExpenseInput = useInputHandlers(getInitialForecastData("0.0"));
  const insuranceExpenseInput = useInputHandlers(getInitialForecastData("0.0"));
  const otherNonOpExpenseInput = useInputHandlers(getInitialForecastData("0.0"));

  // New Reserve for Replacement input
  const reserveForReplacementInput = useInputHandlers(getInitialForecastData());

  // Custom handlers that update the local input state without parsing
  const handleOccupancyChange = (year: number, value: string) => {
    occupancyForecast.handleChange(year, value);
  };

  const handleOccupancyBlur = (year: number, value: string) => {
    // Format the value properly and update both local and shared state
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    const formattedValue = isNaN(numValue) ? "0.0" : numValue.toFixed(1);
    
    occupancyForecast.handleChange(year, formattedValue);
    updateSubjectOccupancy({ [year]: parseFloat(formattedValue) || 0 });
  };

  const handleOccupancyYoYChange = (year: number, value: string) => {
    occupancyYoY.handleChange(year, value);
  };

  const handleOccupancyYoYBlur = (year: number, value: string) => {
    // Format the value properly and update both local and shared state
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    const formattedValue = isNaN(numValue) ? "0.0" : numValue.toFixed(1);
    
    occupancyYoY.handleChange(year, formattedValue);
    updateSubjectOccupancyYoY({ [year]: parseFloat(formattedValue) || 0 });
  };

  // Expense blur handlers based on forecast method
  const handleExpenseBlur = (year: number, value: string, handler: any) => {
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    
    let formattedValue: string;
    if (expenseForecastMethod === "POR") {
      // Integer format for POR
      formattedValue = isNaN(numValue) ? "0" : Math.round(numValue).toString();
    } else {
      // Percentage format with 1 decimal place
      formattedValue = isNaN(numValue) ? "0.0" : numValue.toFixed(1);
    }
    
    handler(year, formattedValue);
  };

  // Non-operating expense blur handlers (always percentage)
  const handleNonOpExpenseBlur = (year: number, value: string, handler: any) => {
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    const formattedValue = isNaN(numValue) ? "0.0" : numValue.toFixed(1);
    handler(year, formattedValue);
  };

  // Reserve for Replacement handlers
  const handleReserveForReplacementChange = (year: number, value: string) => {
    reserveForReplacementInput.handleChange(year, value);
  };

  const handleReserveForReplacementBlur = (year: number, value: string) => {
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    const formattedValue = isNaN(numValue) ? "0" : Math.round(numValue).toString();
    reserveForReplacementInput.handleChange(year, formattedValue);
  };

  // Update local state when shared data changes
  useEffect(() => {
    REVENUE_CONFIG.FORECAST_YEARS.forEach(year => {
      const occupancyValue = (occupancyData.subjectOccupancy[year] || 0).toString();
      const yoyValue = (occupancyData.subjectOccupancyYoY[year] || 0).toString();
      
      if (occupancyForecast.values[year] !== occupancyValue) {
        occupancyForecast.handleChange(year, occupancyValue);
      }
      if (occupancyYoY.values[year] !== yoyValue) {
        occupancyYoY.handleChange(year, yoyValue);
      }
    });
  }, [occupancyData.subjectOccupancy, occupancyData.subjectOccupancyYoY]);

  return {
    adrGrowthType,
    setAdrGrowthType,
    flatAdrGrowth: flatAdr.values[0] || "0.0",
    setFlatAdrGrowth: (value: string) => flatAdr.handleChange(0, value),
    yearlyAdrGrowth: yearlyAdr.values,
    handleYearlyAdrChange: yearlyAdr.handleChange,
    occupancyForecast: occupancyForecast.values,
    handleOccupancyChange,
    occupancyForecastMethod,
    setOccupancyForecastMethod,
    occupancyYoYGrowth: occupancyYoY.values,
    handleOccupancyYoYChange,
    handleOccupancyYoYBlur,
    fbPerOccupiedRoom: fbPerRoom.values,
    handleFbPerOccupiedRoomChange: fbPerRoom.handleChange,
    handleFbPerOccupiedRoomBlur: fbPerRoom.handleIntegerBlur,
    resortFeePerOccupiedRoom: resortFeePerRoom.values,
    handleResortFeePerOccupiedRoomChange: resortFeePerRoom.handleChange,
    handleResortFeePerOccupiedRoomBlur: resortFeePerRoom.handleIntegerBlur,
    otherOperatedPerOccupiedRoom: otherOperatedPerRoom.values,
    handleOtherOperatedPerOccupiedRoomChange: otherOperatedPerRoom.handleChange,
    handleOtherOperatedPerOccupiedRoomBlur: otherOperatedPerRoom.handleIntegerBlur,
    miscellaneousPerOccupiedRoom: miscellaneousPerRoom.values,
    handleMiscellaneousPerOccupiedRoomChange: miscellaneousPerRoom.handleChange,
    handleMiscellaneousPerOccupiedRoomBlur: miscellaneousPerRoom.handleIntegerBlur,
    allocatedPerOccupiedRoom: allocatedPerRoom.values,
    handleAllocatedPerOccupiedRoomChange: allocatedPerRoom.handleChange,
    handleAllocatedPerOccupiedRoomBlur: allocatedPerRoom.handleIntegerBlur,
    expenseForecastMethod,
    setExpenseForecastMethod,
    roomsExpenseInput: roomsExpenseInput.values,
    handleRoomsExpenseChange: roomsExpenseInput.handleChange,
    handleRoomsExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, roomsExpenseInput.handleChange),
    fbExpenseInput: fbExpenseInput.values,
    handleFbExpenseChange: fbExpenseInput.handleChange,
    handleFbExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, fbExpenseInput.handleChange),
    resortFeeExpenseInput: resortFeeExpenseInput.values,
    handleResortFeeExpenseChange: resortFeeExpenseInput.handleChange,
    handleResortFeeExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, resortFeeExpenseInput.handleChange),
    otherOperatedExpenseInput: otherOperatedExpenseInput.values,
    handleOtherOperatedExpenseChange: otherOperatedExpenseInput.handleChange,
    handleOtherOperatedExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, otherOperatedExpenseInput.handleChange),
    miscellaneousExpenseInput: miscellaneousExpenseInput.values,
    handleMiscellaneousExpenseChange: miscellaneousExpenseInput.handleChange,
    handleMiscellaneousExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, miscellaneousExpenseInput.handleChange),
    allocatedExpenseInput: allocatedExpenseInput.values,
    handleAllocatedExpenseChange: allocatedExpenseInput.handleChange,
    handleAllocatedExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, allocatedExpenseInput.handleChange),
    // New expense handlers
    propertyOperationsExpenseInput: propertyOperationsExpenseInput.values,
    handlePropertyOperationsExpenseChange: propertyOperationsExpenseInput.handleChange,
    handlePropertyOperationsExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, propertyOperationsExpenseInput.handleChange),
    administrativeGeneralExpenseInput: administrativeGeneralExpenseInput.values,
    handleAdministrativeGeneralExpenseChange: administrativeGeneralExpenseInput.handleChange,
    handleAdministrativeGeneralExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, administrativeGeneralExpenseInput.handleChange),
    infoTechServicesExpenseInput: infoTechServicesExpenseInput.values,
    handleInfoTechServicesExpenseChange: infoTechServicesExpenseInput.handleChange,
    handleInfoTechServicesExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, infoTechServicesExpenseInput.handleChange),
    salesMarketingExpenseInput: salesMarketingExpenseInput.values,
    handleSalesMarketingExpenseChange: salesMarketingExpenseInput.handleChange,
    handleSalesMarketingExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, salesMarketingExpenseInput.handleChange),
    utilitiesExpenseInput: utilitiesExpenseInput.values,
    handleUtilitiesExpenseChange: utilitiesExpenseInput.handleChange,
    handleUtilitiesExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, utilitiesExpenseInput.handleChange),
    // New individual non-operating expense handlers
    managementFeesExpenseInput: managementFeesExpenseInput.values,
    handleManagementFeesExpenseChange: managementFeesExpenseInput.handleChange,
    handleManagementFeesExpenseBlur: (year: number, value: string) => handleNonOpExpenseBlur(year, value, managementFeesExpenseInput.handleChange),
    realEstateTaxesExpenseInput: realEstateTaxesExpenseInput.values,
    handleRealEstateTaxesExpenseChange: realEstateTaxesExpenseInput.handleChange,
    handleRealEstateTaxesExpenseBlur: (year: number, value: string) => handleNonOpExpenseBlur(year, value, realEstateTaxesExpenseInput.handleChange),
    insuranceExpenseInput: insuranceExpenseInput.values,
    handleInsuranceExpenseChange: insuranceExpenseInput.handleChange,
    handleInsuranceExpenseBlur: (year: number, value: string) => handleNonOpExpenseBlur(year, value, insuranceExpenseInput.handleChange),
    otherNonOpExpenseInput: otherNonOpExpenseInput.values,
    handleOtherNonOpExpenseChange: otherNonOpExpenseInput.handleChange,
    handleOtherNonOpExpenseBlur: (year: number, value: string) => handleNonOpExpenseBlur(year, value, otherNonOpExpenseInput.handleChange),
    // New Reserve for Replacement handlers
    reserveForReplacementInput: reserveForReplacementInput.values,
    handleReserveForReplacementChange,
    handleReserveForReplacementBlur
  };
};
