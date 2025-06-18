
export const createExpenseCalculations = (
  historicalExpenseData: any,
  expenseForecastMethod: string,
  helpers: any
) => {
  const calculateExpense = (year: number, inputValue: string, expenseType: string) => {
    const input = parseFloat(inputValue || "0");
    if (expenseForecastMethod === "ADR") {
      const occupiedRooms = helpers.getForecastOccupiedRoomsForYear(year);
      return input * occupiedRooms;
    } else {
      // % of Revenue
      const totalRevenue = helpers.calculateTotalRevenue(year, false);
      return (input / 100) * totalRevenue;
    }
  };

  const getHistoricalExpenseData = (year: number, expenseType: string): string => {
    const totalExpense = historicalExpenseData[expenseType][year] || 0;
    
    if (expenseForecastMethod === "ADR") {
      const occupiedRooms = helpers.getHistoricalOccupiedRoomsForYear(year);
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else {
      // % of Revenue
      const totalRevenue = helpers.calculateTotalRevenue(year, true);
      const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
      return percentage.toFixed(1);
    }
  };

  const calculateTotalOtherOperatedExpense = (year: number, expenseInputs: {
    fbExpenseInput: Record<number, string>;
    resortFeeExpenseInput: Record<number, string>;
    otherOperatedExpenseInput: Record<number, string>;
    miscellaneousExpenseInput: Record<number, string>;
    allocatedExpenseInput: Record<number, string>;
  }) => {
    const fbExpense = calculateExpense(year, expenseInputs.fbExpenseInput[year], 'fb');
    const resortFeeExpense = calculateExpense(year, expenseInputs.resortFeeExpenseInput[year], 'resortFee');
    const otherOperatedExpense = calculateExpense(year, expenseInputs.otherOperatedExpenseInput[year], 'otherOperated');
    const miscellaneousExpense = calculateExpense(year, expenseInputs.miscellaneousExpenseInput[year], 'miscellaneous');
    const allocatedExpense = calculateExpense(year, expenseInputs.allocatedExpenseInput[year], 'allocated');
    
    return fbExpense + resortFeeExpense + otherOperatedExpense + miscellaneousExpense + allocatedExpense;
  };

  const calculateTotalUndistributedExpenses = (year: number, historicalYears: number[], expenseInputs: {
    propertyOperationsExpenseInput: Record<number, string>;
    administrativeGeneralExpenseInput: Record<number, string>;
    infoTechServicesExpenseInput: Record<number, string>;
    salesMarketingExpenseInput: Record<number, string>;
    utilitiesExpenseInput: Record<number, string>;
  }) => {
    if (historicalYears.includes(year)) {
      return (historicalExpenseData.propertyOperations[year] || 0) +
             (historicalExpenseData.administrativeGeneral[year] || 0) +
             (historicalExpenseData.infoTechServices[year] || 0) +
             (historicalExpenseData.salesMarketing[year] || 0) +
             (historicalExpenseData.utilities[year] || 0);
    } else {
      const propertyOperationsExpense = calculateExpense(year, expenseInputs.propertyOperationsExpenseInput[year], 'propertyOperations');
      const administrativeGeneralExpense = calculateExpense(year, expenseInputs.administrativeGeneralExpenseInput[year], 'administrativeGeneral');
      const infoTechServicesExpense = calculateExpense(year, expenseInputs.infoTechServicesExpenseInput[year], 'infoTechServices');
      const salesMarketingExpense = calculateExpense(year, expenseInputs.salesMarketingExpenseInput[year], 'salesMarketing');
      const utilitiesExpense = calculateExpense(year, expenseInputs.utilitiesExpenseInput[year], 'utilities');
      
      return propertyOperationsExpense + administrativeGeneralExpense + infoTechServicesExpense + salesMarketingExpense + utilitiesExpense;
    }
  };

  const calculateTotalNonOperatingExpenses = (year: number, historicalYears: number[], nonOperatingExpenseInput: Record<number, string>) => {
    if (historicalYears.includes(year)) {
      return historicalExpenseData.nonOperating[year] || 0;
    } else {
      return calculateExpense(year, nonOperatingExpenseInput[year], 'nonOperating');
    }
  };

  const getTotalHistoricalOtherOperatedExpense = (year: number) => {
    return (historicalExpenseData.fb[year] || 0) +
           (historicalExpenseData.resortFee[year] || 0) +
           (historicalExpenseData.otherOperated[year] || 0) +
           (historicalExpenseData.miscellaneous[year] || 0) +
           (historicalExpenseData.allocated[year] || 0);
  };

  return {
    calculateExpense,
    getHistoricalExpenseData,
    calculateTotalOtherOperatedExpense,
    calculateTotalUndistributedExpenses,
    calculateTotalNonOperatingExpenses,
    getTotalHistoricalOtherOperatedExpense
  };
};
