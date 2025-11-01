// src/contexts/FilterContext.tsx
import React, { createContext, useState, useContext, useMemo } from 'react';
import { ActivityStatus, ActivityType } from '../types/activity.types';

export interface FilterState {
  searchQuery: string;
  selectedType: ActivityType | 'all';
}

interface FilterContextType {
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: ActivityType | 'all') => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
 const [filters, setFilters] = useState<FilterState>({
  searchQuery: '',
  selectedType: 'all',
});

const actions = useMemo(() => ({
  setSearchQuery: (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  },
  setSelectedType: (type: ActivityType | 'all') => {
    setFilters(prev => ({ ...prev, selectedType: type }));
  },
}), []);

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

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};