
import { useState } from 'react';
import { REVENUE_CONFIG } from '../config/revenueConfig';
import { RevenueCalculationState } from '../types/revenue';
import { useInputHandlers } from './useInputHandlers';

const getInitialForecastData = (defaultValue: string = "0") => 
  REVENUE_CONFIG.FORECAST_YEARS.reduce((acc, year) => ({ ...acc, [year]: defaultValue }), {});

export const useRevenueCalculations = (): RevenueCalculationState => {
  const [adrGrowthType, setAdrGrowthType] = useState<string>("flat");
  const [occupancyForecastMethod, setOccupancyForecastMethod] = useState<string>("Occupancy");

  const flatAdr = useInputHandlers({ [0]: REVENUE_CONFIG.DEFAULT_GROWTH_RATES.ADR });
  const yearlyAdr = useInputHandlers(getInitialForecastData(REVENUE_CONFIG.DEFAULT_GROWTH_RATES.ADR));
  const occupancyForecast = useInputHandlers({
    2025: "75.0", 2026: "77.0", 2027: "78.0", 2028: "79.0", 2029: "80.0"
  });
  const occupancyYoY = useInputHandlers({
    2025: "6.7", 2026: "2.7", 2027: "1.3", 2028: "1.3", 2029: "1.3"
  });
  const fbPerRoom = useInputHandlers(getInitialForecastData());
  const otherOperatedPerRoom = useInputHandlers(getInitialForecastData());
  const miscellaneousPerRoom = useInputHandlers(getInitialForecastData());
  const allocatedPerRoom = useInputHandlers(getInitialForecastData());

  return {
    adrGrowthType,
    setAdrGrowthType,
    flatAdrGrowth: flatAdr.values[0] || "0.0",
    setFlatAdrGrowth: (value: string) => flatAdr.handleChange(0, value),
    yearlyAdrGrowth: yearlyAdr.values,
    handleYearlyAdrChange: yearlyAdr.handleChange,
    occupancyForecast: occupancyForecast.values,
    handleOccupancyChange: occupancyForecast.handleChange,
    occupancyForecastMethod,
    setOccupancyForecastMethod,
    occupancyYoYGrowth: occupancyYoY.values,
    handleOccupancyYoYChange: occupancyYoY.handleChange,
    fbPerOccupiedRoom: fbPerRoom.values,
    handleFbPerOccupiedRoomChange: fbPerRoom.handleChange,
    handleFbPerOccupiedRoomBlur: fbPerRoom.handleIntegerBlur,
    otherOperatedPerOccupiedRoom: otherOperatedPerRoom.values,
    handleOtherOperatedPerOccupiedRoomChange: otherOperatedPerRoom.handleChange,
    handleOtherOperatedPerOccupiedRoomBlur: otherOperatedPerRoom.handleIntegerBlur,
    miscellaneousPerOccupiedRoom: miscellaneousPerRoom.values,
    handleMiscellaneousPerOccupiedRoomChange: miscellaneousPerRoom.handleChange,
    handleMiscellaneousPerOccupiedRoomBlur: miscellaneousPerRoom.handleIntegerBlur,
    allocatedPerOccupiedRoom: allocatedPerRoom.values,
    handleAllocatedPerOccupiedRoomChange: allocatedPerRoom.handleChange,
    handleAllocatedPerOccupiedRoomBlur: allocatedPerRoom.handleIntegerBlur
  };
};
