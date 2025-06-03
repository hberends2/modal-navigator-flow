
export const getAvailableRooms = (year: number, roomsKeys: number): number => {
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const result = roomsKeys * (isLeapYear ? 366 : 365);
  console.log('Available rooms for year', year, ':', result);
  return result;
};

export const calculateOccupancyFromYoY = (
  year: number,
  forecastYears: number[],
  occupancyYoYGrowth: Record<number, string>,
  baseOccupancy: number
): number => {
  const yearIndex = forecastYears.indexOf(year);
  if (yearIndex === 0) {
    // First forecast year - base on 2024 actual occupancy
    const growthRate = parseFloat(occupancyYoYGrowth[year]) || 0;
    return baseOccupancy * (1 + growthRate / 100);
  } else {
    // Subsequent years - base on previous calculated occupancy
    const prevYear = forecastYears[yearIndex - 1];
    const prevOccupancy = calculateOccupancyFromYoY(prevYear, forecastYears, occupancyYoYGrowth, baseOccupancy);
    const growthRate = parseFloat(occupancyYoYGrowth[year]) || 0;
    return prevOccupancy * (1 + growthRate / 100);
  }
};

export const getForecastADR = (
  year: number,
  forecastYears: number[],
  baseADR: number,
  adrGrowthType: string,
  flatAdrGrowth: string,
  yearlyAdrGrowth: Record<number, string>
): number => {
  try {
    console.log('getForecastADR called for year:', year);
    const yearIndex = forecastYears.indexOf(year);
    if (yearIndex === 0) {
      // First forecast year - base on 2024 data
      const growthRate = adrGrowthType === "flat" 
        ? parseFloat(flatAdrGrowth) || 0
        : parseFloat(yearlyAdrGrowth[year]) || 0;
      const result = baseADR * (1 + growthRate / 100);
      console.log('Forecast ADR (first year):', { year, baseADR, growthRate, result });
      return result;
    } else {
      // Subsequent years - base on previous forecast year
      const prevYear = forecastYears[yearIndex - 1];
      const prevADR = getForecastADR(prevYear, forecastYears, baseADR, adrGrowthType, flatAdrGrowth, yearlyAdrGrowth);
      const growthRate = adrGrowthType === "flat"
        ? parseFloat(flatAdrGrowth) || 0
        : parseFloat(yearlyAdrGrowth[year]) || 0;
      const result = prevADR * (1 + growthRate / 100);
      console.log('Forecast ADR (subsequent year):', { year, prevYear, prevADR, growthRate, result });
      return result;
    }
  } catch (error) {
    console.error('Error in getForecastADR:', error);
    return 0;
  }
};

export const getForecastRoomsRevenue = (
  year: number,
  adr: number,
  roomsKeys: number,
  occupancyValue: string
): number => {
  try {
    const availableRooms = getAvailableRooms(year, roomsKeys);
    const occupancyDecimal = parseFloat(occupancyValue) / 100;
    const occupiedRooms = Math.round(availableRooms * occupancyDecimal);
    const result = adr * occupiedRooms;
    console.log('Forecast rooms revenue:', { year, adr, occupiedRooms, result });
    return result;
  } catch (error) {
    console.error('Error in getForecastRoomsRevenue:', error);
    return 0;
  }
};

export const getForecastRevpar = (
  year: number,
  roomsRevenue: number,
  roomsKeys: number
): number => {
  try {
    const availableRooms = getAvailableRooms(year, roomsKeys);
    const result = roomsRevenue / availableRooms;
    console.log('Forecast RevPAR (calculated from revenue):', { year, roomsRevenue, availableRooms, result });
    return result;
  } catch (error) {
    console.error('Error in getForecastRevpar:', error);
    return 0;
  }
};

export const getHistoricalADRForYear = (
  year: number,
  roomsRevenue: number,
  roomsKeys: number,
  occupancy: number
): number => {
  try {
    const availableRooms = getAvailableRooms(year, roomsKeys);
    const occupancyDecimal = occupancy / 100;
    const occupiedRooms = Math.round(availableRooms * occupancyDecimal);
    const result = occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
    console.log('Historical ADR for', year, ':', result);
    return result;
  } catch (error) {
    console.error('Error calculating historical ADR:', error);
    return 0;
  }
};

export const getForecastADRForYear = (
  year: number,
  roomsRevenue: number,
  roomsKeys: number,
  occupancyValue: string
): number => {
  try {
    const availableRooms = getAvailableRooms(year, roomsKeys);
    const occupancyDecimal = parseFloat(occupancyValue) / 100;
    const occupiedRooms = Math.round(availableRooms * occupancyDecimal);
    const result = occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
    console.log('Forecast ADR for', year, ':', result);
    return result;
  } catch (error) {
    console.error('Error calculating forecast ADR:', error);
    return 0;
  }
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};
