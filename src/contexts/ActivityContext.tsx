// src/contexts/ActivityContext.tsx
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import type { Activity } from '../types/activity.types'; // Import the type
import { useFilters } from './FilterContext'; // Import the filter hook
import { fetchActivities } from '../services/api.service'; // Import our new API service

// 1. Define what this context will provide
interface ActivityContextType {
  filteredActivities: Activity[];
  loading: boolean;
  // We no longer provide 'allActivities' since the server handles it
}

// 2. Create the context
const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

// 3. Create the Provider component
export const ActivityProvider = ({ children }: { children: React.ReactNode }) => {
  const { filters } = useFilters(); // Get the CURRENT filters
  const [loading, setLoading] = useState(true);
  
  // We ONLY need one list now: the list of filtered activities from the server
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);

  // 4. THE NEW CORE LOGIC:
  // This useEffect hook now runs whenever the 'filters' object changes.
  useEffect(() => {
    // Define an async function inside the effect
    const loadActivities = async () => {
      setLoading(true); // Show skeleton loaders
      
      try {
        // --- THIS IS THE FIX ---
        // Map the context's FilterState to the API's ActivityFilters
        const apiFilters = {
          search: filters.searchQuery, // Map searchQuery -> search
          type: filters.selectedType   // Map selectedType -> type
        };
        // -----------------------
        
        // Call our API service with the *mapped* filters object
        const data = await fetchActivities(apiFilters);
        
        // Set the state directly to the pre-filtered results from the server
        setFilteredActivities(data);
        
      } catch (error) {
        console.error("Failed to load activities:", error);
        setFilteredActivities([]); // Set to empty array on error
      } finally {
        setLoading(false); // Hide skeleton loaders
      }
    };

    // Call the function
    loadActivities();
    
  }, [filters]); // The dependency array: This effect re-runs if 'filters' changes

  // 5. Memoize the value to provide
  const value = useMemo(() => ({
    filteredActivities,
    loading,
  }), [filteredActivities, loading]);

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

// 6. Create a custom hook for easy access
export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};