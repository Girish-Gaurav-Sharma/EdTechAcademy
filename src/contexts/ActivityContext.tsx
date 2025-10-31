// src/contexts/ActivityContext.tsx
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { Activity } from '../types/activity.types';
import { mockData } from '../data/mockData'; // Import the master list
import { useFilters } from './FilterContext'; // Import the filter hook

// 1. Define what this context will provide
interface ActivityContextType {
  allActivities: Activity[];
  filteredActivities: Activity[];
  loading: boolean;
}

// 2. Create the context
const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

// 3. Create the Provider component
export const ActivityProvider = ({ children }: { children: React.ReactNode }) => {
  const { filters } = useFilters(); // Get current filters
  const [loading, setLoading] = useState(false); // For future API calls
  
  // 4. Hold the master and filtered lists in state
  const [allActivities] = useState<Activity[]>(mockData); // Master list
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(allActivities);

  // 5. THE CORE LOGIC: This effect re-runs whenever filters change
  useEffect(() => {
    setLoading(true);

    let activities = [...allActivities];

    // Filter by Search Query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      activities = activities.filter(
        a => a.title.toLowerCase().includes(query) || 
             a.description.toLowerCase().includes(query)
      );
    }

    // Filter by Type
    if (filters.selectedType !== 'all') {
      activities = activities.filter(a => a.type === filters.selectedType);
    }

    // Filter by Status
    if (filters.selectedStatus !== 'all') {
      activities = activities.filter(a => a.status === filters.selectedStatus);
    }

    setFilteredActivities(activities);
    setLoading(false);
  }, [filters, allActivities]); // Dependency array: re-run if filters change

  // 6. Memoize the value to provide
  const value = useMemo(() => ({
    allActivities,
    filteredActivities,
    loading,
  }), [allActivities, filteredActivities, loading]);

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

// 7. Create a custom hook for easy access
export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};