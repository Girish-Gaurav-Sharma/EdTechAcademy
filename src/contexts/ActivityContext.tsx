// src/contexts/ActivityContext.tsx
import React, { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import type { Activity } from '../types/activity.types';
import { useFilters } from './FilterContext';
import { fetchActivities } from '../services/api.service';

interface ActivityContextType {
  filteredActivities: Activity[];
  total: number;
  loading: boolean;
  isInitialLoad: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  favActivities: Activity[];
  toggleFavorite: (activity: Activity) => void;
  isFavorite: (id: string) => boolean;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider = ({ children }: { children: React.ReactNode }) => {
  const { filters } = useFilters();
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [favActivities, setFavActivities] = useState<Activity[]>([])
  const LIMIT = 12;


  useEffect(() => {
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

  const toggleFavorite = useCallback((activity: Activity) => {
    setFavActivities((prev) => {
      const exists = prev.some((a) => a.id === activity.id);
      if (exists) {
        return prev.filter((a) => a.id !== activity.id);
      }
      return [...prev, activity];
    });
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favActivities.some((a) => a.id === id);
  }, [favActivities]);

  const displayActivities = useMemo(() => {
    const favIds = new Set(favActivities.map(a => a.id));
    switch (filters.favoriteFilter) {
      case 'fav':
        return filteredActivities.filter(a => favIds.has(a.id));
      case 'not-fav':
        return filteredActivities.filter(a => !favIds.has(a.id));
      default:
        return filteredActivities;
    }
  }, [filteredActivities, favActivities, filters.favoriteFilter]);

  const value = useMemo(() => ({
    filteredActivities: displayActivities,
    total,
    loading,
    isInitialLoad,
    isLoadingMore,
    hasMore,
    loadMore,
    favActivities,
    toggleFavorite,
    isFavorite,
  }), [displayActivities, total, loading, isInitialLoad, isLoadingMore, hasMore, loadMore, favActivities, toggleFavorite, isFavorite]);

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};