'use client';

import { useEffect, useRef } from 'react';
import configStore from '@/lib/configStore';

export default function ConfigProvider({ initialData, children }) {
    const initialized = useRef(false);

    if (!initialized.current) {
        configStore.hydrate(initialData);
        initialized.current = true;
    }

    return (
        <>
            {children}
        </>
    );
}
