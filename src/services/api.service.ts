// src/services/api.service.ts

import { API_URL } from '../config';
import type { Activity } from '../types/activity.types'; // Adjust path as needed

// Define the shape of the filters our function will accept
interface ActivityFilters {
    search?: string;
    type?: string | 'all';
}

export const fetchActivities = async (filters: ActivityFilters): Promise<Activity[]> => {
    // 1. Create a URLSearchParams object to build the query string
    const params = new URLSearchParams();

    // 2. Conditionally add filters to the params
    if (filters.search) {
        params.append('search', filters.search);
    }
    if (filters.type && filters.type !== 'all') {
        params.append('type', filters.type);
    }

    // 3. Build the final URL
    const url = `${API_URL}/activities?${params.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch activities:', error);
        return []; // Return an empty array on error
    }
};