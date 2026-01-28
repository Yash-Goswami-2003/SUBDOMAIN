'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ApiResponseSchema } from '../schemas/portfolio';

const ProfileDataContext = createContext(null);

const API_URL = 'https://api.jsonbin.io/v3/b/6976a3b843b1c97be949dc44';

// Simple in-memory cache
let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function ProfileDataProvider({ children }) {
    const [data, setData] = useState(cachedData);
    const [loading, setLoading] = useState(!cachedData);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Check if we have valid cached data
            if (cachedData && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
                setData(cachedData);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }

                const json = await response.json();
                const result = ApiResponseSchema.safeParse(json);

                if (!result.success) {
                    console.error('Validation Error:', result.error);
                    throw new Error('Data validation failed');
                }

                // Update cache
                cachedData = result.data.record;
                cacheTimestamp = Date.now();

                setData(cachedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        data,
        loading,
        error,
        refetch: async () => {
            cachedData = null;
            cacheTimestamp = null;
            setLoading(true);
            setError(null);
            // Re-trigger fetch by resetting state
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const json = await response.json();
                const result = ApiResponseSchema.safeParse(json);
                if (!result.success) {
                    throw new Error('Data validation failed');
                }
                cachedData = result.data.record;
                cacheTimestamp = Date.now();
                setData(cachedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }
    }), [data, loading, error]);

    return (
        <ProfileDataContext.Provider value={value}>
            {children}
        </ProfileDataContext.Provider>
    );
}

export function useProfileData() {
    const context = useContext(ProfileDataContext);
    if (!context) {
        throw new Error('useProfileData must be used within ProfileDataProvider');
    }
    return context;
}
