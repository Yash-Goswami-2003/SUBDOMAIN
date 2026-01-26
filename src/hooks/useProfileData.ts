import { useState, useEffect } from 'react';
import { ApiResponseSchema, PortfolioData } from '../schemas/portfolio';

const API_URL = 'https://api.jsonbin.io/v3/b/6976a3b843b1c97be949dc44';

interface UseProfileDataReturn {
    data: PortfolioData | null;
    loading: boolean;
    error: string | null;
}

export function useProfileData(): UseProfileDataReturn {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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

                setData(result.data.record);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}
