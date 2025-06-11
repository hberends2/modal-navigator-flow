
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
  expenseForecastMethod: string;
  roomsExpenseInput: Record<number, string>;
  fbExpenseInput: Record<number, string>;
  resortFeeExpenseInput: Record<number, string>;
  otherOperatedExpenseInput: Record<number, string>;
  miscellaneousExpenseInput: Record<number, string>;
  allocatedExpenseInput: Record<number, string>;
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
  setExpenseForecastMethod: (value: string) => void;
  handleRoomsExpenseChange: (year: number, value: string) => void;
  handleRoomsExpenseBlur: (year: number, value: string) => void;
  handleFbExpenseChange: (year: number, value: string) => void;
  handleFbExpenseBlur: (year: number, value: string) => void;
  handleResortFeeExpenseChange: (year: number, value: string) => void;
  handleResortFeeExpenseBlur: (year: number, value: string) => void;
  handleOtherOperatedExpenseChange: (year: number, value: string) => void;
  handleOtherOperatedExpenseBlur: (year: number, value: string) => void;
  handleMiscellaneousExpenseChange: (year: number, value: string) => void;
  handleMiscellaneousExpenseBlur: (year: number, value: string) => void;
  handleAllocatedExpenseChange: (year: number, value: string) => void;
  handleAllocatedExpenseBlur: (year: number, value: string) => void;
}
