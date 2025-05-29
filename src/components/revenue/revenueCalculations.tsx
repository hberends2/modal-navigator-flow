import React from 'react';
import { marketRevparData, compSetRevparData, marketADRData, compSetADRData } from './revenueData';

export const getMarketRevparYoY = (year: number, index: number, historicalYears: number[]) => {
  if (index === 0) return 0;
  const currentRevpar = marketRevparData[year as keyof typeof marketRevparData];
  const previousYear = historicalYears[index - 1];
  const previousRevpar = marketRevparData[previousYear as keyof typeof marketRevparData];
  return ((currentRevpar - previousRevpar) / previousRevpar) * 100;
};

export const getCompSetRevparYoY = (year: number, index: number, historicalYears: number[]) => {
  if (index === 0) return 0;
  const currentRevpar = compSetRevparData[year as keyof typeof compSetRevparData];
  const previousYear = historicalYears[index - 1];
  const previousRevpar = compSetRevparData[previousYear as keyof typeof compSetRevparData];
  return ((currentRevpar - previousRevpar) / previousRevpar) * 100;
};

export const getMarketADRYoY = (year: number, index: number, historicalYears: number[]) => {
  if (index === 0) return 0;
  const currentADR = marketADRData[year as keyof typeof marketADRData];
  const previousYear = historicalYears[index - 1];
  const previousADR = marketADRData[previousYear as keyof typeof marketADRData];
  return ((currentADR - previousADR) / previousADR) * 100;
};

export const getCompSetADRYoY = (year: number, index: number, historicalYears: number[]) => {
  if (index === 0) return 0;
  const currentADR = compSetADRData[year as keyof typeof compSetADRData];
  const previousYear = historicalYears[index - 1];
  const previousADR = compSetADRData[previousYear as keyof typeof compSetADRData];
  return ((currentADR - previousADR) / previousADR) * 100;
};

export const getHistoricalOccupiedRooms = (year: number, getAvailableRooms: (year: number) => number, occupancy: number) => {
  const availableRooms = getAvailableRooms(year);
  const occupancyDecimal = occupancy / 100;
  return Math.round(availableRooms * occupancyDecimal);
};

export const getForecastOccupiedRooms = (year: number, getAvailableRooms: (year: number) => number, occupancyForecast: string) => {
  const availableRooms = getAvailableRooms(year);
  const occupancy = parseFloat(occupancyForecast || "0") / 100;
  return Math.round(availableRooms * occupancy);
};

export const getHistoricalADR = (year: number, roomsRevenue: number, occupiedRooms: number) => {
  return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
};

export const getForecastADR = (roomsRevenue: number, occupiedRooms: number) => {
  return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
};

export const getForecastRevparYoY = (year: number, forecastYears: number[], getForecastRevpar: (year: number) => number, lastHistoricalRevpar: number) => {
  const yearIndex = forecastYears.indexOf(year);
  if (yearIndex === 0) {
    const currentRevpar = getForecastRevpar(year);
    return ((currentRevpar - lastHistoricalRevpar) / lastHistoricalRevpar) * 100;
  } else {
    const currentRevpar = getForecastRevpar(year);
    const previousYear = forecastYears[yearIndex - 1];
    const previousRevpar = getForecastRevpar(previousYear);
    return ((currentRevpar - previousRevpar) / previousRevpar) * 100;
  }
};

export const getHistoricalADRYoY = (year: number, index: number, historicalYears: number[], getHistoricalADRValue: (year: number) => number) => {
  if (index === 0) return 0;
  const currentADR = getHistoricalADRValue(year);
  const previousYear = historicalYears[index - 1];
  const previousADR = getHistoricalADRValue(previousYear);
  return ((currentADR - previousADR) / previousADR) * 100;
};

export const getForecastADRYoY = (year: number, forecastYears: number[], getForecastADRValue: (year: number) => number, lastHistoricalADR: number) => {
  const yearIndex = forecastYears.indexOf(year);
  if (yearIndex === 0) {
    const currentADR = getForecastADRValue(year);
    return ((currentADR - lastHistoricalADR) / lastHistoricalADR) * 100;
  } else {
    const currentADR = getForecastADRValue(year);
    const previousYear = forecastYears[yearIndex - 1];
    const previousADR = getForecastADRValue(previousYear);
    return ((currentADR - previousADR) / previousADR) * 100;
  }
};

export const formatYoYWithColor = (value: number) => {
  const color = value >= 0 ? "text-green-600" : "text-red-600";
  return <span className={color}>{value.toFixed(1)}%</span>;
};
