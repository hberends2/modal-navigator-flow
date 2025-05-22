
// This file now provides mock database functionality using localStorage
// instead of connecting to Supabase

// Helper to get data from localStorage with type safety
export const getLocalData = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.error(`Error retrieving data for key ${key}:`, e);
    return defaultValue;
  }
};

// Helper to save data to localStorage
export const setLocalData = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving data for key ${key}:`, e);
  }
};

// Constants for storage keys
export const STORAGE_KEYS = {
  PROPERTIES: 'app_properties',
  OCCUPANCY_DATA: 'app_occupancy_data'
};

// No longer need Supabase credentials
export const hasValidSupabaseCredentials = () => {
  return true; // Always return true since we're not using Supabase
};
