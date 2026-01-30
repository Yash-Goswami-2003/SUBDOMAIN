'use client';

import { useState, useEffect } from 'react';
import configStore from '@/lib/configStore';

export function useConfig(type) {
    const [data, setData] = useState(configStore.getByType(type));

    useEffect(() => {
        // If the store isn't hydrated yet, fetch it
        if (!configStore.isHydrated) {
            configStore.fetchAll().then(() => {
                setData(configStore.getByType(type));
            });
        }
    }, [type]);

    return data;
}

export function useSingleConfig(type) {
    const [data, setData] = useState(configStore.getSingleByType(type));

    useEffect(() => {
        if (!configStore.isHydrated) {
            configStore.fetchAll().then(() => {
                setData(configStore.getSingleByType(type));
            });
        }
    }, [type]);

    return data;
}
