'use client';

import { createContext, useContext } from 'react';

const TenantContext = createContext(null);

export function TenantProvider({ children, tenant, tenantData }) {
  return (
    <TenantContext.Provider value={{ tenant, tenantData }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}
