import { useMemo } from 'react';
import { getAvailableRooms } from '../utils/revenueUtils';

export const useRevenueData = (roomsKeys: number) => {
  const forecastYears = [2025, 2026, 2027, 2028, 2029];
  const historicalYears = [2021, 2022, 2023, 2024];
  
  console.log('Revenue data setup:', { roomsKeys, forecastYears, historicalYears });
  
  // Historical data (from mockup)
  const historicalData = useMemo(() => {
    const data = {
      roomsRevenue: {
        2021: 8765432,
        2022: 9234567,
        2023: 9876543,
        2024: 10234567
      },
      // Add historical ancillary revenue data (mock data for POC)
      fbRevenue: {
        2021: 1500000,  // Mock F&B revenue
        2022: 1650000,
        2023: 1750000,
        2024: 1825000
      },
      otherOperatedRevenue: {
        2021: 750000,   // Mock Other Operated revenue
        2022: 825000,
        2023: 875000,
        2024: 920000
      },
      miscellaneousRevenue: {
        2021: 125000,   // Mock Miscellaneous revenue
        2022: 135000,
        2023: 145000,
        2024: 155000
      },
      allocatedRevenue: {
        2021: 250000,   // Mock Allocated revenue
        2022: 275000,
        2023: 295000,
        2024: 315000
      },
      revpar: {} as Record<number, number>,
      revparYoY: {} as Record<number, number>,
      occupancy: {
        2021: 72.5,
        2022: 74.2,
        2023: 76.8,
        2024: 78.1
      }
    };

    console.log('Initial historical data:', data);

    // Calculate historical RevPAR
    try {
      historicalYears.forEach(year => {
        const roomsRevenue = data.roomsRevenue[year];
        const availableRooms = getAvailableRooms(year, roomsKeys);
        data.revpar[year] = roomsRevenue / availableRooms;
        console.log(`RevPAR for ${year}:`, data.revpar[year]);
      });
    } catch (error) {
      console.error('Error calculating historical RevPAR:', error);
    }

    // Calculate historical RevPAR YoY growth (skip first year)
    try {
      historicalYears.forEach((year, index) => {
        if (index === 0) {
          // First year - no previous year to compare
          data.revparYoY[year] = 0;
        } else {
          const currentRevpar = data.revpar[year];
          const previousYear = historicalYears[index - 1];
          const previousRevpar = data.revpar[previousYear];
          data.revparYoY[year] = ((currentRevpar - previousRevpar) / previousRevpar) * 100;
          console.log(`RevPAR YoY for ${year}:`, data.revparYoY[year]);
        }
      });
    } catch (error) {
      console.error('Error calculating historical RevPAR YoY:', error);
    }

    return data;
  }, [roomsKeys, historicalYears]);

  return {
    historicalData,
    forecastYears,
    historicalYears
  };
};