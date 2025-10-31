// src/contexts/FilterContext.tsx
import React, { createContext, useState, useContext, useMemo } from 'react';
import { ActivityStatus, ActivityType } from '../types/activity.types';

// 1. Define the shape of the filter state
export interface FilterState {
  searchQuery: string;
  selectedType: ActivityType | 'all';
}

// 2. Define what the context will provide
interface FilterContextType {
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: ActivityType | 'all') => void;
}

// 3. Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// 4. Create the Provider component
export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
 const [filters, setFilters] = useState<FilterState>({
  searchQuery: '',
  selectedType: 'all',
});

  // 5. Create memoized functions to update the state
  // We use useMemo to prevent unnecessary re-renders
const actions = useMemo(() => ({
  setSearchQuery: (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  },
  setSelectedType: (type: ActivityType | 'all') => {
    setFilters(prev => ({ ...prev, selectedType: type }));
  },
}), []);

  // 6. Combine the state and actions into the value
  const value = useMemo(() => ({
    filters,
    ...actions,
  }), [filters, actions]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

// 7. Create a custom hook for easy access
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};