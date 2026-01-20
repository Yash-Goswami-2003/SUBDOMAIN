'use client';

import { useTenant } from '@/context/TenantContext';

export default function TenantBadge() {
  const { tenant, tenantData } = useTenant();

  return (
    <div style={{
      display: 'inline-block',
      backgroundColor: tenantData.color || '#999',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '12px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap'
    }}>
      {tenantData.logo} {tenant.toUpperCase()}
    </div>
  );
}
