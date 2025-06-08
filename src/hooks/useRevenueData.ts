
import { useMemo } from 'react';
import { REVENUE_CONFIG } from '../config/revenueConfig';
import { HistoricalRevenueData } from '../types/revenue';
import { getAvailableRooms, calculateRevpar } from '../utils/calculationUtils';

export const useRevenueData = () => {
  const historicalData: HistoricalRevenueData = useMemo(() => {
    const data: HistoricalRevenueData = {
      roomsRevenue: { 2021: 8765432, 2022: 9234567, 2023: 9876543, 2024: 10234567 },
      fbRevenue: { 2021: 1500000, 2022: 1650000, 2023: 1750000, 2024: 1825000 },
      otherOperatedRevenue: { 2021: 750000, 2022: 825000, 2023: 875000, 2024: 920000 },
      miscellaneousRevenue: { 2021: 125000, 2022: 135000, 2023: 145000, 2024: 155000 },
      allocatedRevenue: { 2021: 250000, 2022: 275000, 2023: 295000, 2024: 315000 },
      revpar: {},
      revparYoY: {},
      occupancy: { 2021: 72.5, 2022: 74.2, 2023: 76.8, 2024: 78.1 }
    };

    // Calculate RevPAR
    REVENUE_CONFIG.HISTORICAL_YEARS.forEach(year => {
      const roomsRevenue = data.roomsRevenue[year];
      const availableRooms = getAvailableRooms(year);
      data.revpar[year] = calculateRevpar(roomsRevenue, availableRooms);
    });

    // Calculate RevPAR YoY
    REVENUE_CONFIG.HISTORICAL_YEARS.forEach((year, index) => {
      if (index === 0) {
        data.revparYoY[year] = 0;
      } else {
        const currentRevpar = data.revpar[year];
        const previousYear = REVENUE_CONFIG.HISTORICAL_YEARS[index - 1];
        const previousRevpar = data.revpar[previousYear];
        data.revparYoY[year] = ((currentRevpar - previousRevpar) / previousRevpar) * 100;
      }
    });

    return data;
  }, []);

  return {
    historicalData,
    forecastYears: REVENUE_CONFIG.FORECAST_YEARS,
    historicalYears: REVENUE_CONFIG.HISTORICAL_YEARS,
    roomsKeys: REVENUE_CONFIG.ROOMS_KEYS
  };
};
