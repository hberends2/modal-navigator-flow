
import React from 'react';
import { marketRevparData, compSetRevparData, marketADRData, compSetADRData } from './revenueData';

export const getMarketRevparYoY = (year: number, index: number, historicalYears: number[]) => {
  console.log('getMarketRevparYoY called:', { year, index, historicalYears });
  if (index === 0) return 0;
  const currentRevpar = marketRevparData[year as keyof typeof marketRevparData];
  const previousYear = historicalYears[index - 1];
  const previousRevpar = marketRevparData[previousYear as keyof typeof marketRevparData];
  if (!currentRevpar || !previousRevpar) {
    console.warn('Missing revpar data:', { year, currentRevpar, previousYear, previousRevpar });
    return 0;
  }
  const result = ((currentRevpar - previousRevpar) / previousRevpar) * 100;
  console.log('Market RevPAR YoY result:', result);
  return result;
};

export const getCompSetRevparYoY = (year: number, index: number, historicalYears: number[]) => {
  console.log('getCompSetRevparYoY called:', { year, index, historicalYears });
  if (index === 0) return 0;
  const currentRevpar = compSetRevparData[year as keyof typeof compSetRevparData];
  const previousYear = historicalYears[index - 1];
  const previousRevpar = compSetRevparData[previousYear as keyof typeof compSetRevparData];
  if (!currentRevpar || !previousRevpar) {
    console.warn('Missing comp set revpar data:', { year, currentRevpar, previousYear, previousRevpar });
    return 0;
  }
  const result = ((currentRevpar - previousRevpar) / previousRevpar) * 100;
  console.log('Comp Set RevPAR YoY result:', result);
  return result;
};

export const getMarketADRYoY = (year: number, index: number, historicalYears: number[]) => {
  console.log('getMarketADRYoY called:', { year, index, historicalYears });
  if (index === 0) return 0;
  const currentADR = marketADRData[year as keyof typeof marketADRData];
  const previousYear = historicalYears[index - 1];
  const previousADR = marketADRData[previousYear as keyof typeof marketADRData];
  if (!currentADR || !previousADR) {
    console.warn('Missing ADR data:', { year, currentADR, previousYear, previousADR });
    return 0;
  }
  const result = ((currentADR - previousADR) / previousADR) * 100;
  console.log('Market ADR YoY result:', result);
  return result;
};

export const getCompSetADRYoY = (year: number, index: number, historicalYears: number[]) => {
  console.log('getCompSetADRYoY called:', { year, index, historicalYears });
  if (index === 0) return 0;
  const currentADR = compSetADRData[year as keyof typeof compSetADRData];
  const previousYear = historicalYears[index - 1];
  const previousADR = compSetADRData[previousYear as keyof typeof compSetADRData];
  if (!currentADR || !previousADR) {
    console.warn('Missing comp set ADR data:', { year, currentADR, previousYear, previousADR });
    return 0;
  }
  const result = ((currentADR - previousADR) / previousADR) * 100;
  console.log('Comp Set ADR YoY result:', result);
  return result;
};

export const getHistoricalOccupiedRooms = (year: number, getAvailableRooms: (year: number) => number, occupancy: number) => {
  console.log('getHistoricalOccupiedRooms called:', { year, occupancy });
  const availableRooms = getAvailableRooms(year);
  const occupancyDecimal = occupancy / 100;
  const result = Math.round(availableRooms * occupancyDecimal);
  console.log('Historical occupied rooms result:', result);
  return result;
};

export const getForecastOccupiedRooms = (year: number, getAvailableRooms: (year: number) => number, occupancyForecast: string) => {
  console.log('getForecastOccupiedRooms called:', { year, occupancyForecast });
  const availableRooms = getAvailableRooms(year);
  const occupancy = parseFloat(occupancyForecast || "0") / 100;
  const result = Math.round(availableRooms * occupancy);
  console.log('Forecast occupied rooms result:', result);
  return result;
};

export const getHistoricalADR = (year: number, roomsRevenue: number, occupiedRooms: number) => {
  console.log('getHistoricalADR called:', { year, roomsRevenue, occupiedRooms });
  const result = occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
  console.log('Historical ADR result:', result);
  return result;
};

export const getForecastADR = (roomsRevenue: number, occupiedRooms: number) => {
  console.log('getForecastADR called:', { roomsRevenue, occupiedRooms });
  const result = occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
  console.log('Forecast ADR result:', result);
  return result;
};

export const getForecastRevparYoY = (year: number, forecastYears: number[], getForecastRevpar: (year: number) => number, lastHistoricalRevpar: number) => {
  console.log('getForecastRevparYoY called:', { year, forecastYears, lastHistoricalRevpar });
  const yearIndex = forecastYears.indexOf(year);
  if (yearIndex === 0) {
    const currentRevpar = getForecastRevpar(year);
    const result = ((currentRevpar - lastHistoricalRevpar) / lastHistoricalRevpar) * 100;
    console.log('Forecast RevPAR YoY result (first year):', result);
    return result;
  } else {
    const currentRevpar = getForecastRevpar(year);
    const previousYear = forecastYears[yearIndex - 1];
    const previousRevpar = getForecastRevpar(previousYear);
    const result = ((currentRevpar - previousRevpar) / previousRevpar) * 100;
    console.log('Forecast RevPAR YoY result:', result);
    return result;
  }
};

export const getHistoricalADRYoY = (year: number, index: number, historicalYears: number[], getHistoricalADRValue: (year: number) => number) => {
  console.log('getHistoricalADRYoY called:', { year, index, historicalYears });
  if (index === 0) return 0;
  const currentADR = getHistoricalADRValue(year);
  const previousYear = historicalYears[index - 1];
  const previousADR = getHistoricalADRValue(previousYear);
  if (previousADR === 0) {
    console.warn('Previous ADR is zero, cannot calculate YoY');
    return 0;
  }
  const result = ((currentADR - previousADR) / previousADR) * 100;
  console.log('Historical ADR YoY result:', result);
  return result;
};

export const getForecastADRYoY = (year: number, forecastYears: number[], getForecastADRValue: (year: number) => number, lastHistoricalADR: number) => {
  console.log('getForecastADRYoY called:', { year, forecastYears, lastHistoricalADR });
  const yearIndex = forecastYears.indexOf(year);
  if (yearIndex === 0) {
    const currentADR = getForecastADRValue(year);
    const result = ((currentADR - lastHistoricalADR) / lastHistoricalADR) * 100;
    console.log('Forecast ADR YoY result (first year):', result);
    return result;
  } else {
    const currentADR = getForecastADRValue(year);
    const previousYear = forecastYears[yearIndex - 1];
    const previousADR = getForecastADRValue(previousYear);
    const result = ((currentADR - previousADR) / previousADR) * 100;
    console.log('Forecast ADR YoY result:', result);
    return result;
  }
};

export const formatYoYWithColor = (value: number) => {
  console.log('formatYoYWithColor called with value:', value);
  if (isNaN(value) || !isFinite(value)) {
    console.warn('Invalid value passed to formatYoYWithColor:', value);
    return <span className="text-gray-500">-</span>;
  }
  const color = value >= 0 ? "text-green-600" : "text-red-600";
  return <span className={color}>{value.toFixed(1)}%</span>;
};
