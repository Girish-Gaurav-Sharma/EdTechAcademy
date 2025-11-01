// src/services/api.service.ts

import { API_URL } from '../config';
import type { Activity } from '../types/activity.types'; 

interface ActivityFilters {
    search?: string;
    type?: string | 'all';
}

interface PaginationOptions {
    limit?: number;
    offset?: number;
}

export interface ActivitiesResponse {
    items: Activity[];
    total: number;
}

export const fetchActivities = async (
    filters: ActivityFilters,
    pagination?: PaginationOptions
): Promise<ActivitiesResponse> => {
    // 1. Create a URLSearchParams object to build the query string
    const params = new URLSearchParams();

    // 2. Conditionally add filters to the params
    if (filters.search) {
        params.append('search', filters.search);
    }
    if (filters.type && filters.type !== 'all') {
        params.append('type', filters.type);
    }

    // 3. Add pagination if provided
    if (pagination?.limit !== undefined) {
        params.append('limit', String(pagination.limit));
    }
    if (pagination?.offset !== undefined) {
        params.append('offset', String(pagination.offset));
    }

    // 4. Build the final URL
    const url = `${API_URL}/activities?${params.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        const json = await response.json();
        const items: Activity[] = Array.isArray(json.items) ? json.items : [];
        const total: number = typeof json.total === 'number' ? json.total : items.length;
        return { items, total };
    } catch (error) {
        console.error('Failed to fetch activities:', error);
        return { items: [], total: 0 }; 
    }
};