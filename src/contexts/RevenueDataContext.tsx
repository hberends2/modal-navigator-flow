
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RevenueData {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    roomsRevenue: Record<number, number>;
    revpar: Record<number, number>;
    revparYoY: Record<number, number>;
    occupancy: Record<number, number>;
  };
  occupancyForecast: Record<number, string>;
  getAvailableRooms: (year: number) => number;
}

interface RevenueDataContextType {
  revenueData: RevenueData | null;
  setRevenueData: (data: RevenueData) => void;
}

const RevenueDataContext = createContext<RevenueDataContextType | undefined>(undefined);

export const RevenueDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);

  return (
    <RevenueDataContext.Provider value={{ revenueData, setRevenueData }}>
      {children}
    </RevenueDataContext.Provider>
  );
};

export const useRevenueData = () => {
  const context = useContext(RevenueDataContext);
  if (context === undefined) {
    throw new Error('useRevenueData must be used within a RevenueDataProvider');
  }
  return context;
};
