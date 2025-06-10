
export interface HistoricalRevenueData {
  roomsRevenue: Record<number, number>;
  occupancy: Record<number, number>;
  fbRevenue: Record<number, number>;
  resortFeeRevenue: Record<number, number>;
  otherOperatedRevenue: Record<number, number>;
  miscellaneousRevenue: Record<number, number>;
  allocatedRevenue: Record<number, number>;
  revpar: Record<number, number>;
  revparYoY: Record<number, number>;
}

export interface RevenueCalculationInputs {
  adrGrowthType: string;
  flatAdrGrowth: string;
  yearlyAdrGrowth: Record<number, string>;
  occupancyForecast: Record<number, string>;
  occupancyForecastMethod: string;
  occupancyYoYGrowth: Record<number, string>;
  fbPerOccupiedRoom: Record<number, string>;
  resortFeePerOccupiedRoom: Record<number, string>;
  otherOperatedPerOccupiedRoom: Record<number, string>;
  miscellaneousPerOccupiedRoom: Record<number, string>;
  allocatedPerOccupiedRoom: Record<number, string>;
}

export interface RevenueCalculationState extends RevenueCalculationInputs {
  setAdrGrowthType: (value: string) => void;
  setFlatAdrGrowth: (value: string) => void;
  handleYearlyAdrChange: (year: number, value: string) => void;
  handleOccupancyChange: (year: number, value: string) => void;
  setOccupancyForecastMethod: (value: string) => void;
  handleOccupancyYoYChange: (year: number, value: string) => void;
  handleOccupancyYoYBlur: (year: number, value: string) => void;
  handleFbPerOccupiedRoomChange: (year: number, value: string) => void;
  handleFbPerOccupiedRoomBlur: (year: number, value: string) => void;
  handleResortFeePerOccupiedRoomChange: (year: number, value: string) => void;
  handleResortFeePerOccupiedRoomBlur: (year: number, value: string) => void;
  handleOtherOperatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleOtherOperatedPerOccupiedRoomBlur: (year: number, value: string) => void;
  handleMiscellaneousPerOccupiedRoomChange: (year: number, value: string) => void;
  handleMiscellaneousPerOccupiedRoomBlur: (year: number, value: string) => void;
  handleAllocatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleAllocatedPerOccupiedRoomBlur: (year: number, value: string) => void;
}
