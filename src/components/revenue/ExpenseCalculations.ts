
export const createExpenseCalculations = (
  historicalExpenseData: any,
  expenseForecastMethod: string,
  helpers: any
) => {
  const calculateExpense = (year: number, inputValue: string, expenseType: string) => {
    const input = parseFloat(inputValue || "0");
    if (expenseForecastMethod === "POR") {
      // Use the correct helper function name that exists in the helpers object
      const occupiedRooms = helpers.getHistoricalOccupiedRoomsForYear ? 
        helpers.getHistoricalOccupiedRoomsForYear(year) : 
        helpers.getHistoricalOccupiedRooms ? helpers.getHistoricalOccupiedRooms(year) : 0;
      return input * occupiedRooms;
    } else {
      // % of Revenue
      const totalRevenue = helpers.calculateTotalRevenue(year, false);
      return (input / 100) * totalRevenue;
    }
  };

  // New function for non-operating expenses (always % of Revenue)
  const calculateNonOpExpense = (year: number, inputValue: string) => {
    const input = parseFloat(inputValue || "0");
    const totalRevenue = helpers.calculateTotalRevenue(year, false);
    return (input / 100) * totalRevenue;
  };

  const getHistoricalExpenseData = (year: number, expenseType: string): string => {
    const totalExpense = historicalExpenseData[expenseType][year] || 0;
    
    if (expenseForecastMethod === "POR") {
      // Use the correct helper function name that exists
      const occupiedRooms = helpers.getHistoricalOccupiedRoomsForYear ? 
        helpers.getHistoricalOccupiedRoomsForYear(year) : 
        helpers.getHistoricalOccupiedRooms ? helpers.getHistoricalOccupiedRooms(year) : 0;
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else {
      // % of Revenue
      const totalRevenue = helpers.calculateTotalRevenue(year, true);
      const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
      return percentage.toFixed(1);
    }
  };

  // New function for historical non-operating expenses (always % of Revenue)
  const getHistoricalNonOpExpenseData = (year: number, expenseType: string): string => {
    const totalExpense = historicalExpenseData[expenseType]?.[year] || 0;
    const totalRevenue = helpers.calculateTotalRevenue(year, true);
    const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
    return percentage.toFixed(1);
  };

  const calculateTotalOtherOperatedExpense = (year: number, expenseInputs: {
    fbExpenseInput: Record<number, string>;
    otherOperatedExpenseInput: Record<number, string>;
    miscellaneousExpenseInput: Record<number, string>;
    allocatedExpenseInput: Record<number, string>;
  }) => {
    // Check if this is a historical year - if so, use historical data directly
    if (historicalExpenseData.fb[year] !== undefined) {
      return (historicalExpenseData.fb[year] || 0) +
             (historicalExpenseData.otherOperated[year] || 0) +
             (historicalExpenseData.miscellaneous[year] || 0) +
             (historicalExpenseData.allocated[year] || 0);
    } else {
      // For forecast years, calculate from inputs
      const fbExpense = calculateExpense(year, expenseInputs.fbExpenseInput[year], 'fb');
      const otherOperatedExpense = calculateExpense(year, expenseInputs.otherOperatedExpenseInput[year], 'otherOperated');
      const miscellaneousExpense = calculateExpense(year, expenseInputs.miscellaneousExpenseInput[year], 'miscellaneous');
      const allocatedExpense = calculateExpense(year, expenseInputs.allocatedExpenseInput[year], 'allocated');
      
      return fbExpense + otherOperatedExpense + miscellaneousExpense + allocatedExpense;
    }
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
      const propertyOperationsExpense = calculateExpense(year, expenseInputs.propertyOperationsExpenseInput[year] || "0", 'propertyOperations');
      const administrativeGeneralExpense = calculateExpense(year, expenseInputs.administrativeGeneralExpenseInput[year] || "0", 'administrativeGeneral');
      const infoTechServicesExpense = calculateExpense(year, expenseInputs.infoTechServicesExpenseInput[year] || "0", 'infoTechServices');
      const salesMarketingExpense = calculateExpense(year, expenseInputs.salesMarketingExpenseInput[year] || "0", 'salesMarketing');
      const utilitiesExpense = calculateExpense(year, expenseInputs.utilitiesExpenseInput[year] || "0", 'utilities');
      
      return propertyOperationsExpense + administrativeGeneralExpense + infoTechServicesExpense + salesMarketingExpense + utilitiesExpense;
    }
  };

  const calculateTotalNonOperatingExpenses = (year: number, historicalYears: number[], nonOpExpenseInputs: {
    managementFeesExpenseInput?: Record<number, string>;
    realEstateTaxesExpenseInput?: Record<number, string>;
    insuranceExpenseInput?: Record<number, string>;
    otherNonOpExpenseInput?: Record<number, string>;
  }) => {
    if (historicalYears.includes(year)) {
      return (historicalExpenseData.managementFees[year] || 0) +
             (historicalExpenseData.realEstateTaxes[year] || 0) +
             (historicalExpenseData.insurance[year] || 0) +
             (historicalExpenseData.otherNonOp[year] || 0);
    } else {
      // Add null checks and fallbacks for all inputs
      const managementFeesExpense = calculateNonOpExpense(year, nonOpExpenseInputs.managementFeesExpenseInput?.[year] || "0");
      const realEstateTaxesExpense = calculateNonOpExpense(year, nonOpExpenseInputs.realEstateTaxesExpenseInput?.[year] || "0");
      const insuranceExpense = calculateNonOpExpense(year, nonOpExpenseInputs.insuranceExpenseInput?.[year] || "0");
      const otherNonOpExpense = calculateNonOpExpense(year, nonOpExpenseInputs.otherNonOpExpenseInput?.[year] || "0");
      
      return managementFeesExpense + realEstateTaxesExpense + insuranceExpense + otherNonOpExpense;
    }
  };

  const getTotalHistoricalOtherOperatedExpense = (year: number) => {
    return (historicalExpenseData.fb[year] || 0) +
           (historicalExpenseData.otherOperated[year] || 0) +
           (historicalExpenseData.miscellaneous[year] || 0) +
           (historicalExpenseData.allocated[year] || 0);
  };

  return {
    calculateExpense,
    calculateNonOpExpense,
    getHistoricalExpenseData,
    getHistoricalNonOpExpenseData,
    calculateTotalOtherOperatedExpense,
    calculateTotalUndistributedExpenses,
    calculateTotalNonOperatingExpenses,
    getTotalHistoricalOtherOperatedExpense
  };
};
