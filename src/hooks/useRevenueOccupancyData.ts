
import { useState, useEffect } from "react";

export interface RevenueOccupancyData {
  historicalYears: number[];
  forecastYears: number[];
  marketOccupancy: Record<number, number>;
  marketOccupancyYoY: Record<number, number>;
  compSetOccupancy: Record<number, number>;
  compSetOccupancyYoY: Record<number, number>;
  subjectOccupancy: Record<number, number>;
  subjectOccupancyYoY: Record<number, number>;
}

const STORAGE_KEY = 'revenue_occupancy_data';

export const useRevenueOccupancyData = () => {
  const [data, setData] = useState<RevenueOccupancyData>({
    historicalYears: [2022, 2023, 2024],
    forecastYears: [2025, 2026, 2027, 2028, 2029],
    marketOccupancy: {
      2022: 70.0,
      2023: 71.4, 
      2024: 72.3,
      2025: 75.0,
      2026: 77.0,
      2027: 78.0,
      2028: 79.0,
      2029: 80.0
    },
    marketOccupancyYoY: {
      2023: 2.0,
      2024: 1.3,
      2025: 3.7,
      2026: 2.7,
      2027: 1.3,
      2028: 1.3,
      2029: 1.3
    },
    compSetOccupancy: {
      2022: 70.7,
      2023: 73.2,
      2024: 74.0,
      2025: 75.0,
      2026: 77.0,
      2027: 78.0,
      2028: 79.0,
      2029: 80.0
    },
    compSetOccupancyYoY: {
      2023: 3.5,
      2024: 1.1,
      2025: 1.4,
      2026: 2.7,
      2027: 1.3,
      2928: 1.3,
      2929: 1.3
    },
    subjectOccupancy: {
      2022: 61.7,
      2023: 65.5,
      2024: 70.3,
      2025: 75.0,
      2026: 77.0,
      2027: 78.0,
      2028: 79.0,
      2029: 80.0
    },
    subjectOccupancyYoY: {
      2023: 6.2,
      2024: 7.3,
      2025: 6.7,
      2026: 2.7,
      2027: 1.3,
      2928: 1.3,
      2929: 1.3
    }
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing revenue occupancy data:', error);
      }
    }
  }, []);

  const saveData = (newData: RevenueOccupancyData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  return {
    data,
    saveData
  };
};
