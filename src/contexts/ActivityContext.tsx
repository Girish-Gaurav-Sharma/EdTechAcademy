// src/contexts/ActivityContext.tsx
import React, { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import type { Activity } from '../types/activity.types'; // Import the type
import { useFilters } from './FilterContext'; // Import the filter hook
import { fetchActivities } from '../services/api.service'; // Import our new API service

// 1. Define what this context will provide
interface ActivityContextType {
  filteredActivities: Activity[];
  total: number;
  loading: boolean;
  isInitialLoad: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

// 2. Create the context
const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

// 3. Create the Provider component
export const ActivityProvider = ({ children }: { children: React.ReactNode }) => {
  const { filters } = useFilters(); // Get the CURRENT filters
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const LIMIT = 12;

  // 4. THE NEW CORE LOGIC:
  // This useEffect hook now runs whenever the 'filters' object changes.
  useEffect(() => {
    // Reset and load first page whenever filters change
    const loadFirstPage = async () => {
      setLoading(true);
      setOffset(0);
      try {
        const apiFilters = {
          search: filters.searchQuery,
          type: filters.selectedType,
        };
        const { items, total } = await fetchActivities(apiFilters, { limit: LIMIT, offset: 0 });
        setFilteredActivities(items);
        setTotal(total);
        setOffset(items.length);
      } catch (error) {
        console.error('Failed to load activities:', error);
        setFilteredActivities([]);
        setTotal(0);
        setOffset(0);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    loadFirstPage();
  }, [filters]);

  const hasMore = filteredActivities.length < total;

  const loadMore = useCallback(async () => {
    if (isLoadingMore || loading || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const apiFilters = {
        search: filters.searchQuery,
        type: filters.selectedType,
      };
      const { items } = await fetchActivities(apiFilters, { limit: LIMIT, offset });
      setFilteredActivities(prev => [...prev, ...items]);
      setOffset(prev => prev + items.length);
    } catch (error) {
      console.error('Failed to load more activities:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [filters, isLoadingMore, loading, hasMore, offset]);

  // 5. Memoize the value to provide
  const value = useMemo(() => ({
    filteredActivities,
    total,
    loading,
    isInitialLoad,
    isLoadingMore,
    hasMore,
    loadMore,
  }), [filteredActivities, total, loading, isInitialLoad, isLoadingMore, hasMore, loadMore]);

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